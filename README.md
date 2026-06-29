# Everything Kerala (എവരിതിങ് കേരള) 🌴

A premium, modern digital hub showcasing Kerala's digital ecosystem, popular tourism landmarks, and live Malayalam news broadcasts. Built by Keralites, for Keralites.

---

## 🚀 Key Features

### 1. 📱 Community Apps Directory
- **66+ Curated Regional Apps**: A comprehensive, alphabetically sorted list of digital products, services, and utilities built specifically for Kerala.
- **Dynamic Search & Filtering**: Fast, client-side search to filter apps by name, category, or description in real time.
- **Responsive Grid**: Sleek cards with title overflow protection, standardized category badges, and direct external links.

### 2. 🗺️ Interactive Landmarks Map
- **Full-Viewport Explorer**: A native-app-like map interface occupying the entire screen below the header.
- **22 Popular Attractions**: Pinpoints major tourist spots across all 14 districts, covering Hill Stations, Beaches, Backwaters, Heritage & Forts, and Wildlife & Nature.
- **Custom Kerala Outline**: Fetches and overlays the official state boundary of Kerala in bold brand green with a soft green tint, clearly distinguishing the state on the map.
- **Floating Collapsible Sidebar**: An elegant glassmorphic sidebar containing search, custom interactive legend toggles (with custom category emojis), and a clickable list that pans, zooms, and opens popups.
- **Reliable Pin Clicks**: Uses pointer-event bubbling to ensure markers and popups open instantly and reliably.

### 3. 📺 Live Malayalam News Hub
- **Unified Streaming Dashboard**: Watch major Malayalam news networks live in a cinema-style dark UI.
- **Dynamic Live Player**: A large, responsive 16:9 player that lets you switch channels instantly.
- **Autoplay Live Feeds**: Uses the official YouTube channel ID embedding format (`/embed/live_stream?channel=CHANNEL_ID`) to automatically stream whatever is currently live on that network.
- **8 Major Channels Included**:
  - Asianet News
  - 24 News
  - Manorama News
  - Mathrubhumi News
  - Reporter TV
  - MediaOne TV
  - Janam TV
  - Kairali News

### 4. 🎨 Premium Aesthetics & Typography
- **Google Fonts Integration**: Uses `Plus Jakarta Sans` for clean, modern interface text and `Cormorant Garamond` for elegant serif headings.
- **Tailwind CSS v4**: Configured with custom theme colors, smooth gradients, and glassmorphic panels.
- **Fluid Layouts**: No dividing borders; instead, clean white cards, subtle shadows, and micro-animations are used for a premium feel.

---

## 🛠️ Technology Stack

- **Core Framework**: [React Router v7](https://reactrouter.com/) (Full-stack React)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vanilla CSS theme config)
- **Runtime & Package Manager**: [Bun](https://bun.sh/) (Fast JS/TS bundler and package manager)
- **Mapping Engine**: [Leaflet.js](https://leafletjs.com/) (Interactive maps with CartoDB Voyager tiles)
- **Video Player**: YouTube Embed API

---

## 📂 Codebase Structure

```text
├── app/
│   ├── components/       # Shared UI components (Header, Footer)
│   ├── home/             # Homepage, Community Apps directory
│   ├── map/              # Full-screen MapViewPage and Leaflet integration
│   ├── news/             # Live News Hub page and channel data
│   ├── routes/           # React Router route entry points (home, map, news)
│   ├── app.css           # Global Tailwind v4 styles and custom @theme variables
│   ├── root.tsx          # App shell, HTML layout, and global font/leaflet loading
│   └── routes.ts         # Route path declarations
├── data/
│   └── apps.json         # JSON database containing the 66 community apps
├── public/               # Static assets (logos, images, mockups)
├── README.md             # This documentation
└── package.json          # Dependency declarations
```

---

## ⚡ Getting Started

### Installation

Install dependencies using **Bun**:

```bash
bun install
```

### Development

Start the local development server with Hot Module Replacement (HMR):

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

### Production Build

Create an optimized production bundle:

```bash
bun run build
```

---

*Made with ❤️ for Kerala.*
