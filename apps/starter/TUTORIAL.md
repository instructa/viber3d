# Understanding the Entity Component System (ECS) in Starfighter 3.0

This tutorial will walk you through the core concepts of our game architecture, focusing on the Entity Component System (ECS) and how it's used to create and manage game objects like the player ship.

## Table of Contents
1. [What is ECS?](#what-is-ecs)
2. [Core Components](#core-components)
3. [The Player Entity](#the-player-entity)
4. [Step by Step: Creating a Game Object](#step-by-step-creating-a-game-object)

## What is ECS?

Entity Component System is an architectural pattern that's particularly well-suited for game development. Instead of using traditional object-oriented inheritance, it uses composition to build game objects.

The three main parts are:
- **Entities**: Simple IDs that group components together
- **Components**: Pure data containers (called Traits in our system)
- **Systems**: Logic that operates on entities with specific components

### Why ECS?
- 🎮 Better performance for games
- 🧩 More flexible than inheritance
- 🔄 Easier to add/remove features
- 🎯 Clear separation of data and logic

## Core Components

Let's look at the essential components (Traits) we use:

```typescript
import { IsPlayer, Transform, Ref } from '../traits';

// IsPlayer: Marks an entity as the player
// Transform: Stores position, rotation, and scale
// Ref: Links the entity to a Three.js 3D object
```

### Transform Component
```typescript
// Example of Transform data
{
    position: Vector3, // x, y, z position in 3D space
    rotation: Euler,  // x, y, z rotation
    scale: Vector3    // x, y, z scale
}
```

## The Player Entity

Here's how we create a player in our game:

```typescript
export function PlayerView({ entity }: { entity: Entity }) {
    const { scene } = useGLTF(src);  // Load 3D model
    
    const setInitial = useCallback((group: THREE.Group | null) => {
        if (!group || !entity) return;
        
        // Step 1: Link the 3D object
        entity.add(Ref(group));
        
        // Step 2: Set initial transform
        entity.set(Transform, {
            position: group.position,
            rotation: group.rotation,
            scale: group.scale,
        });
    }, [entity]);

    return (
        <group ref={setInitial}>
            <primitive object={scene} />
        </group>
    );
}
```

## Step by Step: Creating a Game Object

1. **Create the Entity**
   ```typescript
   // This happens in your game initialization
   const playerEntity = world.create();
   playerEntity.add(IsPlayer);
   ```

2. **Add Visual Representation**
   ```typescript
   // In PlayerView component
   const { scene } = useGLTF(src);
   ```

3. **Link Entity to 3D Object**
   ```typescript
   entity.add(Ref(group));
   ```

4. **Set Initial Transform**
   ```typescript
   entity.set(Transform, {
       position: group.position,
       rotation: group.rotation,
       scale: group.scale,
   });
   ```

5. **Query and Render**
   ```typescript
   // Find and render the player
   const player = useQueryFirst(IsPlayer, Transform);
   return player ? <PlayerView entity={player} /> : null;
   ```

## Best Practices

1. **Component Composition**
   - Keep components small and focused
   - Only store data in components, no logic
   - Use multiple components instead of complex ones

2. **System Design**
   - Systems should be single-purpose
   - Query only the components you need
   - Clean up resources when entities are destroyed

3. **Performance Tips**
   - Use queries efficiently
   - Avoid querying every frame if possible
   - Use the Ref component to cache Three.js objects

## Common Patterns

### Adding Features to Entities
To add new features to game objects, create new components instead of modifying existing ones:

```typescript
// Adding health system
entity.set(Health, { current: 100, max: 100 });

// Adding weapon system
entity.set(Weapon, { damage: 10, fireRate: 0.5 });
```

### Querying Entities
```typescript
// Find all entities with both Health and Transform
const entities = useQuery([Health, Transform]);

// Find first player entity
const player = useQueryFirst(IsPlayer);
```

## Next Steps

1. Try creating a new component for your game object
2. Implement a simple system that operates on your components
3. Experiment with different component combinations
4. Learn about reactive queries and how they update your game

Remember: The power of ECS comes from its simplicity and composability. Start small and add components as needed! 