/**
 * FreeJ2ME Manager — CheerpJ Edition
 * Runs the FreeJ2ME J2ME emulator directly in the browser using CheerpJ 3.0.
 * No compilation or WASM files needed — CheerpJ loads a full JVM from its CDN.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
    interface Window {
        cheerpjInit: (options?: any) => Promise<void>;
        cheerpjCreateDisplay: (width: number, height: number, container: HTMLElement) => void;
        cheerpjRunJar: (path: string, ...args: string[]) => Promise<number>;
        cheerpjRunMain: (className: string, classPath: string, ...args: string[]) => Promise<number>;
        cheerpjSendMessage: (type: string, payload: any) => void;
    }
}

/**
 * Dynamically loads the CheerpJ 3.0 loader script from CDN.
 */
const loadCheerpJScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined' && typeof window.cheerpjInit === 'function') {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cjrtnc.leaningtech.com/3.0/cj3loader.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load CheerpJ runtime from CDN.'));
        document.head.appendChild(script);
    });
};

// CheerpJ can only be initialized ONCE per page load — track it at module level.
let cheerpjInitPromise: Promise<void> | null = null;

const ensureCheerpJInit = (container: HTMLElement): Promise<void> => {
    if (!cheerpjInitPromise) {
        cheerpjInitPromise = (async () => {
            await loadCheerpJScript();
            await window.cheerpjInit({
                enablePreciseAppletThreading: true,
                overrideAppletSize: true,
            });
            const displayWidth = 960;
            const displayHeight = 1280;
            window.cheerpjCreateDisplay(displayWidth, displayHeight, container);
        })();
    }
    return cheerpjInitPromise;
};

export class FreeJ2MEManager {
    private initialized = false;
    private onReadyCallback: (() => void) | null = null;
    private onErrorCallback: ((error: string) => void) | null = null;

    public onReady(callback: () => void) {
        this.onReadyCallback = callback;
    }

    public onError(callback: (error: string) => void) {
        this.onErrorCallback = callback;
    }

    private containerWidth: number = 240;
    private containerHeight: number = 320;

    /**
     * Initialize CheerpJ and create the display.
     * Uses a module-level promise so cheerpjInit is called exactly once per page.
     */
    public async init(container: HTMLElement) {
        try {
            if (this.initialized) return;

            console.log('[FreeJ2MEManager] Initializing CheerpJ runtime...');
            await ensureCheerpJInit(container);

            this.initialized = true;
            console.log('[FreeJ2MEManager] CheerpJ ready.');
        } catch (error) {
            console.error('[FreeJ2MEManager] Initialization failed:', error);
            if (this.onErrorCallback) this.onErrorCallback('Failed to initialize CheerpJ runtime.');
        }
    }

    /**
     * Load and run a J2ME game JAR through FreeJ2ME.
     * CheerpJ maps files served by the web server under /app/.
     * So public/wasm/freej2me.jar → /app/wasm/freej2me.jar
     * And public/games/DiamondRush.jar → /app/games/DiamondRush.jar
     *
     * The standard FreeJ2ME AWT build has Main-Class set in manifest.
     * Arguments: [jarPath, width, height, scaleFactor]
     */
    public async loadJar(jarPath: string) {
        try {
            if (!this.initialized) {
                throw new Error('CheerpJ not initialized.');
            }

            const freej2mePath = '/app/wasm/freej2me.jar';
            // FreeJ2ME's MobilePlatform.loadJar creates new URL(path),
            // so we must pass a full HTTP URL, not a CheerpJ /app/ path
            const gamePath = window.location.origin + jarPath;

            console.log(`[FreeJ2MEManager] Running FreeJ2ME with game: ${gamePath}`);

            // Signal ready right before starting the game
            if (this.onReadyCallback) this.onReadyCallback();

            // Run FreeJ2ME JAR with arguments: [jarPath, width, height, scale]
            // We use 240x320 with scale 4 (960x1280) for high quality.
            await window.cheerpjRunJar(
                freej2mePath,
                gamePath,
                "240",
                "320",
                "4"
            );
        } catch (error: any) {
            console.error('[FreeJ2MEManager] Load error:', error);
            if (this.onErrorCallback) this.onErrorCallback(error.message || String(error));
        }
    }

    /**
     * Send a key event direct to the Java emulator via the simulateKey bridge.
     */
    public async sendKeyDown(keyCode: number) {
        if (!this.initialized) return;
        // Map browser keys to Java AWT keycodes if necessary, 
        // but here we expect Java AWT codes as input.
        try {
            // Using cheerpjRunMain with a zero-length CP to call the bridge
            await window.cheerpjRunMain("org.recompile.freej2me.FreeJ2ME", "", "simulateKey", String(keyCode), "true");
        } catch (e) {
            console.warn('[FreeJ2MEManager] Failed to send key down:', e);
        }
    }

    public async sendKeyUp(keyCode: number) {
        if (!this.initialized) return;
        try {
            await window.cheerpjRunMain("org.recompile.freej2me.FreeJ2ME", "", "simulateKey", String(keyCode), "false");
        } catch (e) {
            console.warn('[FreeJ2MEManager] Failed to send key up:', e);
        }
    }

    public terminate() {
        this.initialized = false;
    }
}
