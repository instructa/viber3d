# viber3d

![viber3d banner](/public/images/banner.png)
<p>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat&colorA=18181B&colorB=28CF8D" alt="License">
  <a href="https://github.com/instructa/viber3d/stargazers"><img src="https://img.shields.io/github/stars/instructa/viber3d.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Stars"></a>
</p>

**viber3D** - a modern starter kit for 3D browser games.

---

## Features

- 🔥 **React 19** - Latest React features including concurrent rendering
- 🎮 **React Three Fiber** - Declarative Three.js in React
- 🧰 **Drei** - Useful helpers for React Three Fiber
- 🏎️ **Vite** - Lightning-fast development server and build tool
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Works on all devices
- 🧠 **State Management** - Zustand for simple state management
- 🔋 **Physics** - React Three Rapier for physics simulations
- 📏 **TypeScript** - Type safety for your project
- 🤖 **Cursor AI Integration** - Predefined `.cursor/rules` for enhanced AI assistance
- 🧩 **Entity Component System** - Flexible and performant game architecture via koota library

## Getting Started

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download)
- A package manager (pnpm, npm, yarn, bun)

## Quick Install

1. Create a new **viber3d** project:
```bash
npx viber3d@latest init
```

2. Open in Cursor

3. Run your project
```bash
npm run dev
# or
pnpm run dev
```

4. Open your browser and visit `http://localhost:5173` to see your app in action 🥳

## Publish

5. Build your project
```
npm run build
```

6. Deploy on a live server! 🌎

## Documentation

viber3D comes with comprehensive documentation to help you get started:

- **Core Concepts** - Learn about the fundamental architecture and patterns
- **ECS Overview** - Detailed guide to the Entity Component System architecture
- **Tutorials** - Step-by-step guides for common game development tasks

Visit the [documentation site](/docs/viber3d-docs) to learn more.

## AI Code Editor Integration

### Cursor AI

viber3d comes with predefined `.cursor/rules` to enhance your development experience when using Cursor AI:

- **Code Style Rules** - Ensures AI-generated code follows project conventions
- **Component Structure** - Guides AI to create components that match the project architecture
- **Three.js Best Practices** - Helps AI generate optimized 3D code
- **Documentation Standards** - Ensures consistent documentation in AI-generated code

These rules help maintain code quality and consistency when using AI assistance, making it easier to integrate AI-generated code into your project.

#### Other

| AI Tool           | How to Include Prompts                                                                                                                                                                                                                 |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **GitHub Copilot**| Create a `.github/copilot-instructions.md` file in your repository's root directory and add natural language instructions in Markdown format. These instructions will guide Copilot's behavior across your project. More information is available in the [GitHub Copilot documentation](https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot). |
| **Windsurf**      | Add a .windsurfrules file into the project root. [Windsurf Getting Started Guide](https://docs.codeium.com/windsurf/getting-started). |
| **Cline**         | 1. Click Cline extension settings 2. Find "Custom Instructions" field 3. Add your instructions  [Cline GitHub repository](https://cline.bot/faq). |

## CLI Options

```bash
npx viber3d@latest [project-name] [options]

Options:
  --cwd, -c             The working directory. Defaults to the current directory
  --name                Project name
  --force, -f           Override existing directory
  --install             Skip installing dependencies (default: true)
  --gitInit             Initialize git repository
  --packageManager      Package manager choice (npm, pnpm, yarn)
  --yes, -y             Skip confirmation prompt (default: false)
  --defaults, -d        Use default configuration (default: false)
  --silent, -s          Mute output (default: false)
  --help, -h            Display help for command
```

## Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Drei Documentation](https://github.com/pmndrs/drei)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

For detailed contribution guidelines, development workflow, and coding standards, please see our [CONTRIBUTE.md](CONTRIBUTE.md) document.


#### Recommended VS Code Extensions

We recommend installing the following VS Code extensions for the best development experience:

- **Activitus Bar**: Provides a convenient way to start/stop the development server directly from the VS Code activity bar
- **ESLint**: For code linting
- **Prettier**: For code formatting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Links

- X/Twitter: [@kregenrek](https://x.com/kregenrek)
- Bluesky: [@kevinkern.dev](https://bsky.app/profile/kevinkern.dev)

## Courses
- Learn Cursor AI: [Ultimate Cursor Course](https://www.instructa.ai/en/cursor-ai)
- Learn to build software with AI: [instructa.ai](https://www.instructa.ai)

## See my other projects:

* [AI Prompts](https://github.com/instructa/ai-prompts/blob/main/README.md) - Curated AI Prompts for Cursor AI, Cline, Windsurf and Github Copilot
* [codefetch](https://github.com/regenrek/codefetch) - Turn code into Markdown for LLMs with one simple terminal command
* [aidex](https://github.com/regenrek/aidex) A CLI tool that provides detailed information about AI language models, helping developers choose the right model for their needs.
* [codetie](https://github.com/codetie-ai/codetie) - XCode CLI

## Credits

Viber3D stands on the shoulders of giants:

- **[Koota](https://github.com/krispya/koota)** - The ECS library that powers our game architecture
- **[React Three Fiber](https://github.com/pmndrs/react-three-fiber)** - React renderer for Three.js
- **[Three.js](https://threejs.org/)** - The core 3D library
- **[Nuxt](https://nuxt.com/)** & **[UnJS](https://unjs.io/)** - Powering our docs + build system

See our [full credits page](/docs/viber3d-docs/content/7.credits) for more details.

## Demo

Try out Viber3D with our live demo: [viber3d-spacewars.kevinkern.dev](https://viber3d-spacewars.kevinkern.dev/)
