# Diamond Rush Web Arcade (Revival)

![Diamond Rush Badge](https://img.shields.io/badge/Emulator-CheerpJ%203.0-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20React%2019-black?style=for-the-badge)

A high-fidelity web reconstruction of the legendary J2ME classic **Diamond Rush**. This project leverages modern web technologies to bridge the gap between legacy mobile gaming and the modern browser.

## 🕹️ Game Mechanics & Technology

### The Core: CheerpJ 3.0
The emulator runs on **CheerpJ 3.0**, a powerful WebAssembly-based JVM that executes original Java bytecode directly in the browser environment. Unlike traditional emulators, this requires no server-side processing or plugins.

### The Bridge: FreeJ2ME
We use a specialized build of the **FreeJ2ME** framework, acting as the interface between the J2ME environment and the browser's AWT/Canvas layer.

### Neural Link Pad & Controls
Optimized for both desktop and mobile:
- **Neural Link Pad**: An immersive on-screen controller for touch interaction.
- **Keyboard Matrix**: Full mapping for high-speed desktop play.
  - `Arrows`: Movement Matrix
  - `Enter`: Primary Action / OK
  - `Q / W`: Softkeys (Options / Back)
  - `Z / X`: Star (*) / Pound (#)

## 🛠️ Project Architecture

- **Next.js 16 (App Router)**: Modern React framework for the interface.
- **Tailwind CSS 4**: For the premium, glassmorphism-inspired UI.
- **WASM Pipeline**: Optimized for low latency and consistent frame rates (Capped at 20 FPS).
- **CRT Filter**: An optional visual filter for that authentic 2000s handheld aesthetic.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dan-delion-source/Diamond-Rush-Web-APP-Revival-.git
   cd Diamond-Rush-Web-APP-Revival-
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize Emulator Assets**
   Ensure the J2ME JAR files are located in `/public/games/` and the emulator JAR is in `/public/wasm/`.

4. **Launch Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Arcade**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Legal Notice
This project is an educational reconstruction. All rights to the original "Diamond Rush" game belong to its respective publishers and developers. No commercial use is intended.

---
*Created with ❤️ by dandadan*
