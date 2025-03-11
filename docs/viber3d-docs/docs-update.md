Below is an **updated documentation set** that includes all the previously shown Viber3D docs (with the gameloop mention, etc.), **plus** a new section on **Cursor Rules**.  

You can place this new Cursor Rules page wherever makes sense in your docs hierarchy—an example might be at `docs/viber3d-docs/content/6.cursor-rules.md`. The page references the `.mdc` rule files in `.cursor/rules` and explains how Cursor Rules work, how they’re used, and the benefits they bring.

---

# 1. Updated Documentation Pages

Below are the docs reflecting your current starter structure, using `gameloop.ts` and referencing the new `.cursor/rules/*.mdc` files where appropriate.

## `docs/viber3d-docs/content/1.getting-started/1.index.md`

```md
---
title: Introduction
description: Welcome to Viber3D - A Modern 3D Game Starter Kit for the Web
navigation.icon: i-lucide-house
---

Welcome to **Viber3D**, a powerful and modern 3D game starter kit designed for creating immersive web-based games and interactive experiences. Built with performance and developer experience in mind, Viber3D provides all the tools you need to bring your game ideas to life.

## Key Features

Viber3D comes packed with features to help you create amazing 3D games:

::card-group

::card
---
title: Physics Engine
icon: i-lucide-box
---
Built-in physics engine for realistic object interactions and collisions
::

::card
---
title: Game Systems
icon: i-lucide-gamepad-2
---
Comprehensive systems for input handling, audio, networking, and more
::

::card
---
title: Component Architecture
icon: i-lucide-component
---
Flexible ECS-based design for building complex game objects
::

::card
---
title: Performance
icon: i-lucide-zap
---
Optimized for modern browsers with efficient rendering and resource management
::

::card
---
title: TypeScript Support
icon: i-lucide-code
---
Full TypeScript support for type-safe development
::

::card
---
title: Asset Management
icon: i-lucide-image
---
Powerful asset loading and management system for 3D models, textures, and audio
::

::

## Core Concepts

Viber3D is built around these core ideas:

- **Entity Component System (ECS)**: A flexible, data-focused architecture (via [koota](https://www.npmjs.com/package/koota))  
- **Scene Management** for organizing your 3D worlds  
- **Asset Pipeline** for loading 3D models and more  
- **Input System** for keyboard/mouse/touch  
- **Physics System** for realistic interactions  
- **Rendering Pipeline** with React Three Fiber and post-processing  
- **Audio System** with spatial audio support  
- **Networking** for multiplayer (optional)  
- **Development Tools** for debugging and performance insights  

Ready to dive in? Continue to the [Installation](/getting-started/installation) guide to start building!

```

---

## `docs/viber3d-docs/content/1.getting-started/2.installation.md`

```md
---
title: Installation
description: Get started with Viber3D game starter kit.
navigation.icon: i-lucide-download
---

## Requirements

- Node.js 16.x or later
- A modern web browser with WebGL support
- npm, yarn, or pnpm package manager

## Installation

To create a new Viber3D project:

```bash
npx viber3d@latest init
```

::video{src="https://a.storyblok.com/f/316774/x/0c8b8d92f8/install_viber_3d_720.mp4?cv=1741718543080" poster="" controls}
::

## Next Steps

1. [Usage Guide](/getting-started/usage) — Learn the basics  
2. [Core Concepts](/core-concepts) — Understand the ECS approach  
3. [Systems Docs](/systems) — Check out built-in systems  
4. [GitHub Discussions](https://github.com/instructa/viber3d/discussions) — Community support

```

---

## `docs/viber3d-docs/content/1.getting-started/3.project-structure.md`

```md
---
title: Project Structure
description: Understanding the Viber3D project structure
navigation.icon: i-lucide-folder-tree
---

# Project Structure

Below is an example project structure for **Viber3D**:

```bash
viber3d/
├── src
│   ├── assets/                # 3D models, textures, images, sounds
│   ├── components/            # React components for rendering 3D objects/UI
│   ├── systems/               # ECS systems for game logic
│   ├── traits/                # ECS traits (components) describing entity data
│   ├── utils/                 # Utility modules (math, hashing, sorting)
│   ├── actions.ts             # Central actions (spawning entities, etc.)
│   ├── Game.tsx               # Main game scene component
│   ├── gameloop.ts            # ECS update loop (renamed from frameloop)
│   ├── main.tsx               # React root
│   ├── startup.tsx            # Startup logic (spawn camera/player, intervals)
│   ├── styles.css             # Your global or Tailwind CSS
│   ├── vite-env.d.ts          # Vite's TS definition
│   └── world.ts               # Creates the ECS world, adds Time, SpatialHashMap
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── index.html                 # Basic HTML page with root div
```

## Key Directories

- **`src/assets`**: Textures, models (`.glb`), sounds, etc.  
- **`src/components`**: React components that render ECS entities in Three.js.  
- **`src/systems`**: ECS systems that handle logic each frame (e.g. movement, collisions).  
- **`src/traits`**: ECS traits holding entity data (like position, velocity, health).  
- **`src/utils`**: Reusable utility functions (spatial hashing, math, etc.).

## Key Files

- **`actions.ts`**: Helpers for spawning or modifying entities (e.g. `spawnPlayer`).  
- **`Game.tsx`**: Main game component containing your `<Canvas>`, lights, and top-level setup.  
- **`gameloop.ts`**: The main ECS loop that runs every frame.  
- **`startup.tsx`**: Called when the game loads, spawning a camera, player, etc.  
- **`world.ts`**: Defines the ECS world, including default traits like `Time` and `SpatialHashMap`.

```

---

## `docs/viber3d-docs/content/1.getting-started/3.usage.md`

```md
---
title: Usage
description: Learn the basics of creating games with Viber3D.
navigation.icon: i-lucide-sliders
---

Below is a quick overview of how to develop with **Viber3D**:

## ECS Basics

### Creating the World

```ts
// world.ts
import { createWorld } from 'koota';
import { Time, SpatialHashMap } from './traits';

export const world = createWorld(Time, SpatialHashMap);
```

### Spawning Entities

```ts
// actions.ts
export const actions = createActions((world) => ({
  spawnPlayer: () => {
    return world.spawn(IsPlayer, Transform);
  },
}));
```

### Writing Systems

```ts
// systems/move-entities.ts
export function moveEntities(world: World) {
  const { delta } = world.get(Time)!;
  world.query(Transform, Movement).updateEach(([transform, movement]) => {
    transform.position.addScaledVector(movement.velocity, delta);
  });
}
```

### React Components

```tsx
// components/player-renderer.tsx
function PlayerRenderer() {
  const player = useQueryFirst(IsPlayer, Transform);
  if (!player) return null;
  return <HifiPlayerView entity={player} />;
}
```

## Bringing It Together

1. **Create** a `<Canvas>` in `Game.tsx`.
2. **Run** your systems in `gameloop.ts` via `useFrame`.
3. **Render** ECS data in components (like `PlayerRenderer`).
4. **Startup** spawns your camera, player, etc.

**Next**: Explore the [Core Concepts](/core-concepts) in more depth or check out the [Systems](/systems) documentation.
```

---

## `docs/viber3d-docs/content/3.development/1.running-dev-server.md`

```md
---
title: Development Server
description: This guide explains how to run and work with the Viber3D development server.
---

## Starting the Dev Server

```bash
npm run dev
```

- Starts local development (default: [http://localhost:5173](http://localhost:5173))
- Enables hot module replacement (HMR)

## Accessing Your Game

- Open [http://localhost:5173](http://localhost:5173)
- Check your 3D scene
- Edits auto-reload (HMR)

## Troubleshooting

- Check terminal for errors
- Verify port availability
- Ensure all dependencies installed
- Clear browser cache if needed
```

---

## `docs/viber3d-docs/content/3.development/2.production-build.md`

```md
---
title: Production Build
description: Learn how to create optimized production builds for your Viber3D game.
---

## Production Build

```bash
npm run build
```

Outputs to `dist/`, with code minification, asset optimization, etc.

## Testing

```bash
npm run preview
```

Serves on [http://localhost:4173](http://localhost:4173) by default.

## Deployment

- Deploy `dist/` to Netlify, Vercel, or static hosting
- No server runtime required
```

---

## `docs/viber3d-docs/content/4.core-concepts/1.ecs-overview.md`

```md
---
title: ECS Overview
description: Viber3D uses an Entity Component System (ECS) architecture through the koota library.
---

## What is ECS?

ECS is a data-driven pattern:
- **Entities**: The "things" in your game
- **Traits**: Data describing entities
- **Systems**: Logic that updates matching entities

## Why ECS?

1. **Flexibility**: Compose entities from small traits  
2. **Performance**: Data-oriented iteration  
3. **Maintainability**: Clear separation of data vs. logic

## ECS in Viber3D

```ts
export const Position = trait({ x: 0, y: 0, z: 0 });
world.spawn(Position, Health({ amount: 100 }));
```

## Best Practices

- Keep traits purely data
- Keep systems small, single-purpose
- Use queries efficiently
```

---

## `docs/viber3d-docs/content/4.core-concepts/2.entities.md`

```md
# Working with Entities

Entities are fundamental objects in your game. They can have any number of traits.

## Creating Entities

```ts
world.spawn(Transform(), Health({ amount: 100 }), IsPlayer());
```

## Entity Actions

```ts
export function spawnPlayer(world: World, position: THREE.Vector3) {
  return world.spawn(Transform({ position }), IsPlayer(), Health({ amount: 100 }));
}
```

## Querying Entities

```ts
const player = world.queryFirst(IsPlayer);
const enemies = world.query(IsEnemy, Health);
```

## Removing Entities

```ts
world.remove(entity);

world.query(IsTemporary).removeAll();
```

## Lifecycle

1. Creation
2. Updates (systems)
3. Cleanup (destroy when not needed)
```

---

## `docs/viber3d-docs/content/4.core-concepts/3.traits.md`

```md
# Understanding Traits

Traits store data about entities.

## Defining Traits

```ts
export const Health = trait({
  amount: 100
});

export const Transform = trait({
  position: () => new THREE.Vector3(),
  rotation: () => new THREE.Euler(),
});
```

## Working with Traits

```ts
const health = entity.get(Health);
health.amount -= 10;
```

## Best Practices

- Keep them data-only
- Use factory functions for complex objects
- Avoid logic in traits
```

---

## `docs/viber3d-docs/content/4.core-concepts/4.systems.md`

```md
# Systems in Viber3D

Systems run every frame to update entity data.

## Creating Systems

```ts
export function movementSystem(world: World) {
  world.query(Transform, Movement).updateEach(([transform, movement]) => {
    // ...
  });
}
```

## System Organization

Typically placed in `src/systems/*.ts`.  
`gameloop.ts` orchestrates them:

```ts
useFrame(() => {
  moveEntities(world);
  collideBullets(world);
});
```

## Best Practices

- Keep them pure (no side effects outside ECS)
- Query only the traits needed
- Use delta time for motion
```

---

## `docs/viber3d-docs/content/4.core-concepts/5.components.md`

```md
# React Components in Viber3D

### Basic Example

```tsx
import { useQueryFirst } from 'koota/react';
import { Transform, IsPlayer } from '../traits';

function PlayerRenderer() {
  const player = useQueryFirst(IsPlayer, Transform);
  if (!player) return null;

  return (
    <group>
      {/* Render the player visually */}
    </group>
  );
}
```

## ECS Hooks

- `useQuery` / `useQueryFirst` for entity lookups
- `useTraitValue`, `useTraitEffect` for reactive data access

## Best Practices

- **No** ECS logic in components  
- Keep them purely visual  
- Use `useFrame` only for purely visual animations
```

---

## `docs/viber3d-docs/content/5.systems/1.systems-overview.md`

```md
# Systems Overview

Common system categories:

1. **Time** (update-time.ts)
2. **Input** (poll-input.ts, apply-input.ts)
3. **Movement** (move-entities.ts, apply-force.ts, limit-speed.ts)
4. **Camera** (camera-follow-player.ts)
5. **Collision** (to be implemented as needed)
6. **AI** or other logic systems

In `gameloop.ts`, you might do:

```ts
useFrame(() => {
  updateTime(world);
  pollInput(world);
  applyInput(world);
  moveEntities(world);
  // ...
});
```
```

---

# 2. **New Page: Cursor Rules**

Below is a **new** page discussing Cursor Rules (`.mdc` files). You can add it to your docs at something like `docs/viber3d-docs/content/6.cursor-rules.md`.

```md
---
title: Using Cursor Rules in Viber3D
description: A detailed explanation of Cursor Rules and .mdc files
---

# Cursor Rules in Viber3D

**Cursor Rules** are a feature of the [Cursor AI coding assistant](https://www.cursor.dev/) that let you define project-specific guidelines for code generation. By storing these guidelines in `.mdc` (Markdown Cursor) files, you can ensure the AI consistently follows your coding styles, ECS patterns, and architecture rules—particularly useful in Viber3D or any ECS-based React project.

## Introduction

When building a 3D game or any application, it’s crucial to maintain consistent styles and best practices. **Cursor Rules** provide a centralized way to instruct the AI about your project’s needs:

- ECS architecture guidelines  
- React Three Fiber best practices  
- Trait naming conventions  
- System structure (pure functions, minimal side effects)  
- Directory layouts (e.g., `src/components`, `src/systems`, etc.)  

This is especially handy if multiple developers or AI instances are collaborating on the same codebase.

## What Are Cursor Rules?

Cursor Rules come in two varieties:

1. **Global Rules**: Applied to all projects on your machine via Cursor’s global settings.  
2. **Project Rules**: Kept in `.cursor/rules/*.mdc` within your project. These are more specific to your current codebase or framework (e.g. “Use ECS with Koota,” “Use `useTraitEffect` for trait-based triggers,” etc.).

**.mdc** stands for **Markdown Cursor**, indicating these rules are written as Markdown with some extra front matter for metadata (like `description:` and `globs:`).

### Example MDC File

```md
---
description: React Component Rules
globs: *.tsx
---

# React Component Guidelines
- Use functional components
- Implement ECS data flow with Koota (no direct game logic in components)
- Keep all game logic in systems, not `useFrame`
```

## Project Rules and .mdc Files

In your **Viber3D** game, you’ll see a `.cursor/rules` directory containing `.mdc` files, for example:

```bash
.cursor/
└── rules/
    ├── base.mdc
    ├── components.mdc
    ├── systems.mdc
    ├── traits.mdc
    └── utils.mdc
```

Each file has:

- **Front matter**: fields like `description` and `globs`.  
- **Markdown content**: sets out the code style, architecture, or other guidelines.  

When Cursor AI processes your code, if your open file matches a `.mdc` rule’s `globs` (e.g. `*.ts`, `src/components/**/*.tsx`), it automatically includes that rule’s content into the conversation context. As a result, the AI’s suggestions will better align with your instructions.

### Typical Fields

- **`description:`** Summarizes what the rule is about.  
- **`globs:`** Indicates which files or directories it applies to (`src/components/**/*.tsx`, `*.md`, etc.).  
- **`alwaysApply:`** (Optional) If set true, the rule is always used.  
- Then a Markdown body explaining your guidelines, best practices, do’s/don’ts, or code examples.

## How They’re Used in Viber3D

In a typical Viber3D project:

1. **ECS Systems** need certain constraints: pure functions, minimal side effects, delta-based movement, etc.  
2. **React Components** should avoid game logic (only visuals).  
3. **Traits** should remain small and data-focused.  
4. **Directory Structure** might follow the pattern `src/{components, systems, traits, utils}`.  

All these guidelines can go into `.mdc` files. For instance:

- **`base.mdc`** might state overarching ECS + R3F principles.  
- **`components.mdc`** can specify that “Components must not contain ECS logic” and “Use `useTraitEffect` only for visual triggers.”  
- **`systems.mdc`** can define how you structure your system files (`export const functionName = (world: World) => { ... }`).  
- **`traits.mdc`** can detail how to define `trait({ ... })` objects for data.  
- **`utils.mdc`** might outline your best practices for math or utility modules.

During development, whenever you open or modify a file that matches the rule’s glob pattern, Cursor AI automatically includes those rules. As you ask for code suggestions or expansions, the AI will do so in alignment with your `.mdc` definitions.

## Creating or Editing Cursor Rules

1. **Open the Command Palette** (`Cmd+Shift+P` on macOS) and choose “New Cursor Rule.”  
2. **Name your file** and specify the `globs`.  
3. **Write** the guidelines in the Markdown body. Provide bullet points, code samples, or detailed instructions.  
4. **Commit** it to version control so your team shares the same rules.  

You can also edit existing `.mdc` files in `.cursor/rules` at any time.

## Benefits of Cursor Rules

1. **Consistency**: The AI’s code suggestions remain consistent with your ECS architecture, naming conventions, or React style.  
2. **Productivity**: Faster code generation that needs fewer manual fixes.  
3. **Team Alignment**: Everyone on the project sees the same `.mdc` rules, ensuring uniform coding standards.  
4. **Reduced Errors**: By embedding best practices (e.g. “do not mix ECS logic in React components”), you reduce logic bugs.  

## Example Use Cases

- **Framework-Specific**: Mandating SolidJS or React patterns for `*.tsx`.  
- **Auto-Generated Files**: Telling Cursor not to modify `.proto` or `.glb` files.  
- **Folder-Specific**: For `src/systems/**/*.ts`, always mention a “pure system, no side effects” approach.  
- **UI Patterns**: Ensuring usage of Tailwind classes for styling, or restricting inline styles.

## Best Practices

- Keep rules **clear** and **concise**.  
- Provide **code examples** in the markdown.  
- Use **`globs`** to apply the rule only where relevant.  
- Keep them up to date as your team’s conventions evolve.  

## Conclusion

Cursor Rules—and the `.mdc` files that store them—offer a powerful way to guide the Cursor AI so it consistently follows your Viber3D game’s coding patterns. Whether you’re enforcing ECS best practices, React Three Fiber do’s and don’ts, or file-based architecture rules, well-crafted `.mdc` rules can greatly improve your development flow.

```

---

## Additional Notes

- You can maintain **global** Cursor rules (for personal preferences across all projects) in Cursor’s general settings.
- When migrating from older `.cursorrules` approaches, place your new `.mdc` files in `.cursor/rules/`.  
- The `.mdc` approach is more modular and easier to manage on a per-file or per-folder basis.

**Enjoy your improved ECS workflow with consistent, AI-assisted code generation using Cursor Rules!**