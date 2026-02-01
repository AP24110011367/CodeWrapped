# 🚀 CodeWrapped 2026

![CodeWrapped Banner](public/readme_assets/banner.png)

> **Spotify Wrapped, but for your GitHub Code.**  
> Uncover your coding personality, top languages, and contribution streaks in a stunning Cyberpunk-themed video experience.

---

## 🌌 Overview

**CodeWrapped** transforms your year of code into a dynamic, shareable video story. Built with **Remotion** and **React**, it analyzes your GitHub data to generate a personalized recap featuring your:
*   🏆 **Top Languages** (visualized as planets)
*   🔥 **Longest Streak** & Total Contributions
*   📅 **Productivity Peak Hours**
*   🐱 **Coding Personality** (Cyber Cat)

All wrapped in a **Neon Synthwave** aesthetic with high-energy beats.

## ✨ Features

*   **🎨 Cyberpunk Aesthetic**: A complete visual overhaul with neon gradients, deep space backgrounds, and a futuristic "Cyber Cat" mascot.
*   **🎵 Dynamic Audio**: Randomly selects from 5 custom high-energy Synthwave tracks every time you visit.
*   **⚡ Local Rendering Engine**: No external cloud costs! Renders videos directly on your server/machine using `@remotion/renderer`.
*   **📱 Mobile Ready**: Responsive design ensuring your stats look great on any device.
*   **🔗 Social Sharing**: Optimized for sharing link cards on X (Twitter), LinkedIn, and Instagram.

## 🛠️ Tech Stack

*   **Framework**: [Remotion](https://www.remotion.dev/) (React-based Video)
*   **Frontend**: React, Vite, Tailwind-style CSS
*   **Backend**: Node.js, Express (for API & Rendering)
*   **Data**: GitHub GraphQL API
*   **Assets**: Custom AI-Generated 2026 Assets

## 🚀 Getting Started

### Prerequisites
*   Node.js v18+
*   A GitHub Personal Access Token (for fetching data)

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/codewrapped.git
    cd codewrapped
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment**
    Create a `.env` file in the root directory:
    ```env
    GITHUB_TOKEN=your_github_token_here
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:8080` to see the app!

## 📸 Visuals

| The Mascot | The Vibe |
| :---: | :---: |
| ![Cyber Cat](public/readme_assets/mascot.png) | *Neon Space Vibes* |

## 🎧 Audio Experience

The app features a curated selection of Indian movie tracks. The music logic is designed to be **fresh every time**, ensuring no two replays feel exactly the same.

## 🤝 Contributing

Contributions are welcome! If you have a better Music tracks or a cool new visualization:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<p align="center">
  Built with ❤️ by Praneeth Meda • 2026 Edition
</p>
