# viber3d

<p>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat&colorA=18181B&colorB=28CF8D" alt="License">
</p>

CLI tool to create a new **viber3D** project - a modern starter kit for 3D browser games.

## Usage

```bash
# Create a new viber3d project
npx viber3d@latest init

# Or specify a project name
npx viber3d@latest init myGame
```

## Features

- 🔥 **React 19** with concurrent rendering
- 🎮 **React Three Fiber** for declarative Three.js
- 🏎️ **Vite** for fast development
- 🎨 **TailwindCSS** for styling
- 🧠 **Zustand** for state management
- 🔋 **Physics** with React Three Rapier
- 📏 **TypeScript** for type safety
- 🤖 **AI Integration** with predefined rules

## CLI Options

```bash
npx viber3d@latest init [project-name] [options]

Options:
  --cwd, -c             Working directory (default: current)
  --name                Project name
  --force, -f           Override existing directory
  --install             Skip installing dependencies (default: true)
  --gitInit             Initialize git repository
  --packageManager      Package manager (npm, pnpm, yarn)
  --yes, -y             Skip confirmation prompt
  --defaults, -d        Use default configuration
  --silent, -s          Mute output
  --help, -h            Display help
```

## Links

- GitHub: [viber3d](https://github.com/instructa/viber3d)
- Author: [Kevin Kern](https://x.com/kregenrek)
