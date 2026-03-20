# 🌌 Gemini Orb Nexus

Welcome to **Gemini Orb Nexus**, a high-performance React 19 application that bridges the gap between generative AI and immersive user interfaces. Built with Vite, Tailwind CSS, and Framer Motion, this platform serves as a hub for AI-driven mini-applications powered by Google Gemini.

## ✨ Features

- **🎙️ Audio Orb Visualizer**: A dynamic, motion-powered audio component (`AudioOrb.tsx`) that visualizes AI interactions and voice feedback.
- **🤖 Gemini Integration**: Seamless connection to Google's GenAI SDK for advanced natural language processing and multimodal capabilities.
- **📱 Mini-App Ecosystem**: A modular container system (`MiniAppContainer.tsx`) and drawer (`AppDrawer.tsx`) that allows for quick switching between different AI utilities.
- **⚡ Modern Tech Stack**: Powered by React 19, Vite 6, and Framer Motion for buttery-smooth 60fps animations.
- **🎨 Tailwind Styling**: Utility-first CSS for a sleek, dark-themed, and responsive interface.

## 🛠️ Project Structure

```text
├── src/
│   ├── components/       # UI Components (AudioOrb, AppDrawer, MiniAppContainer)
│   ├── services/         # API logic (Gemini SDK initialization)
│   ├── miniApps.tsx      # Configuration for the mini-app ecosystem
│   ├── App.tsx           # Main application shell
│   └── main.tsx          # Application entry point
├── .env.example          # Template for API keys
└── vite.config.ts        # Vite configuration with Tailwind integration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher.
- **Google AI API Key**: You will need a Gemini API key from the [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/gemini-orb-nexus.git
   cd gemini-orb-nexus
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example env file and add your Gemini API key:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add: `VITE_GEMINI_API_KEY=your_key_here`

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🧩 Extending the Nexus

You can add your own mini-apps by modifying the `src/miniApps.tsx` file. Simply define a new component and register it in the array to see it appear in the App Drawer.

## 📄 License

MIT © [Your Name/Organization]