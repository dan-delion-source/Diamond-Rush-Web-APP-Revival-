import { useEffect, useState, useRef, RefObject } from 'react';
import { FreeJ2MEManager } from '@/emulator/FreeJ2MEManager';

export interface EmulatorState {
    isLoading: boolean;
    isReady: boolean;
    error: string | null;
}

/**
 * React hook to manage the FreeJ2ME emulator lifecycle via CheerpJ.
 * CheerpJ renders the Java AWT output directly into the container div,
 * and handles keyboard input automatically through its AWT bridge.
 */
export const useEmulator = (jarUrl: string, containerRef: RefObject<HTMLDivElement | null>) => {
    const [state, setState] = useState<EmulatorState>({
        isLoading: true,
        isReady: false,
        error: null,
    });

    const managerRef = useRef<FreeJ2MEManager | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const manager = new FreeJ2MEManager();
        managerRef.current = manager;

        manager.onReady(() => {
            setState(prev => ({ ...prev, isLoading: false, isReady: true }));
        });

        manager.onError((error: string) => {
            setState(prev => ({ ...prev, isLoading: false, error }));
        });

        const handleKeyDown = (e: KeyboardEvent) => {
            const awtCode = mapKeyToAWT(e.key);
            if (awtCode !== 0) {
                e.preventDefault();
                manager.sendKeyDown(awtCode);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const awtCode = mapKeyToAWT(e.key);
            if (awtCode !== 0) {
                e.preventDefault();
                manager.sendKeyUp(awtCode);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const startEmulator = async () => {
            await manager.init(container);
            await manager.loadJar(jarUrl);
        };

        startEmulator();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            manager.terminate();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jarUrl]);

    return { ...state, manager: managerRef.current };
};

/**
 * Maps browser KeyboardEvent.key to Java AWT KeyEvent codes.
 */
export const mapKeyToAWT = (key: string): number => {
    switch (key) {
        case 'ArrowUp': return 38;
        case 'ArrowDown': return 40;
        case 'ArrowLeft': return 37;
        case 'ArrowRight': return 39;
        case 'Enter': return 10;
        case 'Escape': return 27;
        case ' ': return 32;
        case 'z':
        case 'Z': return 90; // VK_Z
        case 'x':
        case 'X': return 88; // VK_X
        case 'q':
        case 'Q': return 81; // VK_Q
        case 'w':
        case 'W': return 87; // VK_W
        case '0': return 48;
        case '1': return 49;
        case '2': return 50;
        case '3': return 51;
        case '4': return 52;
        case '5': return 53;
        case '6': return 54;
        case '7': return 55;
        case '8': return 56;
        case '9': return 57;
        default: return 0;
    }
};
