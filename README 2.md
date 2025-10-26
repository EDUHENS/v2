# Next.js + Vite + Tailwind CSS + TypeScript

A modern React application built with Next.js, Vite, Tailwind CSS, and TypeScript.

## Features

- ⚡ **Vite** - Lightning fast build tool and development server
- 🎨 **Tailwind CSS** - Utility-first CSS framework (configured without PostCSS)
- 📘 **TypeScript** - Type-safe JavaScript
- ⚛️ **React 18** - Latest React features
- 🔧 **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Tailwind CSS Configuration

This project uses Tailwind CSS configured without PostCSS. The configuration is in `tailwind.config.js` and the styles are imported in `src/index.css`.

## Development

The project uses Vite for fast development and building. Tailwind CSS is configured to work directly with Vite without requiring PostCSS.
