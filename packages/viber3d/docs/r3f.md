<page>
  <title>Introduction - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/getting-started/introduction</url>
  <content>React-three-fiber is a React renderer for three.js.

Summary
-------

Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can participate in [React](https://react.dev/)'s ecosystem.

    npm install three @types/three @react-three/fiber
    

[

Does it have limitations?
-------------------------

](#does-it-have-limitations?)

None. Everything that works in Threejs will work here without exception.

[

Is it slower than plain Threejs?
--------------------------------

](#is-it-slower-than-plain-threejs?)

No. There is no overhead. Components render outside of React. It outperforms Threejs in scale due to React's scheduling abilities.

[

Can it keep up with frequent feature updates to Threejs?
--------------------------------------------------------

](#can-it-keep-up-with-frequent-feature-updates-to-threejs?)

Yes. It merely expresses Threejs in JSX, `<mesh />` dynamically turns into `new THREE.Mesh()`. If a new Threejs version adds, removes or changes features, it will be available to you instantly without depending on updates to this library.

[

What does it look like?
-----------------------

](#what-does-it-look-like?)

Let's make a re-usable component that has its own state, reacts to user-input and participates in the render-loop:

import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const \[hovered, setHover\] = useState(false)
  const \[active, setActive\] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) \=> (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref\={meshRef}
      scale\={active ? 1.5 : 1}
      onClick\={(event) \=> setActive(!active)}
      onPointerOver\={(event) \=> setHover(true)}
      onPointerOut\={(event) \=> setHover(false)}\>
      <boxGeometry args\={\[1, 1, 1\]} />
      <meshStandardMaterial color\={hovered ? 'hotpink' : 'orange'} />
    </mesh\>
  )
}

createRoot(document.getElementById('root')).render(
  <Canvas\>
    <ambientLight intensity\={Math.PI / 2} />
    <spotLight position\={\[10, 10, 10\]} angle\={0.15} penumbra\={1} decay\={0} intensity\={Math.PI} />
    <pointLight position\={\[\-10, -10, -10\]} decay\={0} intensity\={Math.PI} />
    <Box position\={\[\-1.2, 0, 0\]} />
    <Box position\={\[1.2, 0, 0\]} />
  </Canvas\>,
)

Show TypeScript example

import \* as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import './styles.css'

function Box(props: ThreeElements\['mesh'\]) {
const meshRef = useRef<THREE.Mesh>(null!)
const \[hovered, setHover\] = useState(false)
const \[active, setActive\] = useState(false)
useFrame((state, delta) \=> (meshRef.current.rotation.x += delta))
return (
  <mesh
    {...props}
    ref\={meshRef}
    scale\={active ? 1.5 : 1}
    onClick\={(event) \=> setActive(!active)}
    onPointerOver\={(event) \=> setHover(true)}
    onPointerOut\={(event) \=> setHover(false)}\>
    <boxGeometry args\={\[1, 1, 1\]} />
    <meshStandardMaterial color\={hovered ? 'hotpink' : '#2f74c0'} />
  </mesh\>
)
}

createRoot(document.getElementById('root')).render(
<Canvas\>
  <ambientLight intensity\={Math.PI / 2} />
  <spotLight position\={\[10, 10, 10\]} angle\={0.15} penumbra\={1} decay\={0} intensity\={Math.PI} />
  <pointLight position\={\[\-10, -10, -10\]} decay\={0} intensity\={Math.PI} />
  <Box position\={\[\-1.2, 0, 0\]} />
  <Box position\={\[1.2, 0, 0\]} />
</Canvas\>,
)

Show React Native example

For installation instructions see [react native installation instructions](https://r3f.docs.pmnd.rs/getting-started/installation#react-native).

    import React, { useRef, useState } from 'react'
    import { Canvas, useFrame } from '@react-three/fiber/native'
    
    function Box(props) {
      const meshRef = useRef(null)
      const [hovered, setHover] = useState(false)
      const [active, setActive] = useState(false)
      useFrame((state, delta) => (meshRef.current.rotation.x += delta))
      return (
        <mesh
          {...props}
          ref={meshRef}
          scale={active ? 1.5 : 1}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
      )
    }
    
    export default function App() {
      return (
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      )
    }
[

First steps
-----------

](#first-steps)

You need to be versed in both React and Threejs before rushing into this. If you are unsure about React consult the official [React docs](https://react.dev/learn), especially [the section about hooks](https://react.dev/reference/react). As for Threejs, make sure you at least glance over the following links:

1.  Make sure you have a [basic grasp of Threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). Keep that site open.
2.  When you know what a scene is, a camera, mesh, geometry, material, fork the [demo above](https://github.com/pmndrs/react-three-fiber#what-does-it-look-like).
3.  [Look up](https://threejs.org/docs/index.html#api/en/objects/Mesh) the JSX elements that you see (mesh, ambientLight, etc), _all_ threejs exports are native to three-fiber.
4.  Try changing some values, scroll through our [API](https://r3f.docs.pmnd.rs/api/canvas) to see what the various settings and hooks do.

Some helpful material:

*   [Threejs-docs](https://threejs.org/docs) and [examples](https://threejs.org/examples)
*   [Discover Threejs](https://discoverthreejs.com/), especially the [Tips and Tricks](https://discoverthreejs.com/tips-and-tricks) chapter for best practices
*   [Bruno Simons Threejs Jouney](https://threejs-journey.com/), arguably the best learning resource, now includes a full [R3F chapter](https://threejs-journey.com/lessons/what-are-react-and-react-three-fiber)

[](https://threejs-journey.com/)[

Eco system
----------

](#eco-system)

There is a vibrant and extensive eco system around three-fiber, full of libraries, helpers and abstractions.

*   [`@react-three/drei`](https://github.com/pmndrs/drei) – useful helpers, this is an eco system in itself
*   [`@react-three/gltfjsx`](https://github.com/pmndrs/gltfjsx) – turns GLTFs into JSX components
*   [`@react-three/postprocessing`](https://github.com/pmndrs/react-postprocessing) – post-processing effects
*   [`@react-three/test-renderer`](https://github.com/pmndrs/react-three-fiber/tree/master/packages/test-renderer) – for unit tests in node
*   [`@react-three/flex`](https://github.com/pmndrs/react-three-flex) – flexbox for react-three-fiber
*   [`@react-three/xr`](https://github.com/pmndrs/react-xr) – VR/AR controllers and events
*   [`@react-three/csg`](https://github.com/pmndrs/react-three-csg) – constructive solid geometry
*   [`@react-three/rapier`](https://github.com/pmndrs/react-three-rapier) – 3D physics using Rapier
*   [`@react-three/cannon`](https://github.com/pmndrs/use-cannon) – 3D physics using Cannon
*   [`@react-three/p2`](https://github.com/pmndrs/use-p2) – 2D physics using P2
*   [`@react-three/a11y`](https://github.com/pmndrs/react-three-a11y) – real a11y for your scene
*   [`@react-three/gpu-pathtracer`](https://github.com/pmndrs/react-three-gpu-pathtracer) – realistic path tracing
*   [`create-r3f-app next`](https://github.com/pmndrs/react-three-next) – nextjs starter
*   [`lamina`](https://github.com/pmndrs/lamina) – layer based shader materials
*   [`zustand`](https://github.com/pmndrs/zustand) – flux based state management
*   [`jotai`](https://github.com/pmndrs/jotai) – atoms based state management
*   [`valtio`](https://github.com/pmndrs/valtio) – proxy based state management
*   [`react-spring`](https://github.com/pmndrs/react-spring) – a spring-physics-based animation library
*   [`framer-motion-3d`](https://www.framer.com/docs/three-introduction/) – framer motion, a popular animation library
*   [`use-gesture`](https://github.com/pmndrs/react-use-gesture) – mouse/touch gestures
*   [`leva`](https://github.com/pmndrs/leva) – create GUI controls in seconds
*   [`maath`](https://github.com/pmndrs/maath) – a kitchen sink for math helpers
*   [`miniplex`](https://github.com/hmans/miniplex) – ECS (entity management system)
*   [`composer-suite`](https://github.com/hmans/composer-suite) – composing shaders, particles, effects and game mechanics

[

How to contribute
-----------------

](#how-to-contribute)

If you like this project, please consider helping out. All contributions are welcome as well as donations to [Opencollective](https://opencollective.com/react-three-fiber), or in crypto `BTC: 36fuguTPxGCNnYZSRdgdh6Ea94brCAjMbH`, `ETH: 0x6E3f79Ea1d0dcedeb33D3fC6c34d2B1f156F2682`.

[

Backers
-------

](#backers)

Thank you to all our backers! 🙏

[](https://opencollective.com/react-three-fiber#backers)[

Contributors
------------

](#contributors)

This project exists thanks to all the people who contribute.

[](https://github.com/pmndrs/react-three-fiber/graphs/contributors)</content>
</page>

<page>
  <title>Canvas - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/canvas</url>
  <content>The Canvas object is your portal into three.js

The `Canvas` object is where you start to define your React Three Fiber Scene.

    import React from 'react'
    import { Canvas } from '@react-three/fiber'
    
    const App = () => (
      <Canvas>
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    )
    

[

Properties
----------

](#properties)

| Prop | Description | Default |
| --- | --- | --- |
| children | three.js JSX elements or regular components |  |
| fallback | optional DOM JSX elements or regular components in case GL is not supported |  |
| gl | Props that go into the default renderer. Accepts sync/async callback with default props `gl={defaults => new Renderer({ ...defaults })}` | `{}` |
| camera | Props that go into the default camera, or your own `THREE.Camera` | `{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] }` |
| scene | Props that go into the default scene, or your own `THREE.Scene` | `{}` |
| shadows | Props that go into `gl.shadowMap`, can be set true for `PCFsoft` or one of the following: 'basic', 'percentage', 'soft', 'variance' | `false` |
| raycaster | Props that go into the default raycaster | `{}` |
| frameloop | Render mode: always, demand, never | `always` |
| resize | Resize config, see react-use-measure's options | `{ scroll: true, debounce: { scroll: 50, resize: 0 } }` |
| orthographic | Creates an orthographic camera | `false` |
| dpr | Pixel-ratio, use `window.devicePixelRatio`, or automatic: \[min, max\] | `[1, 2]` |
| legacy | Enables THREE.ColorManagement in three r139 or later | `false` |
| linear | Switch off automatic sRGB color space and gamma correction | `false` |
| events | Configuration for the event manager, as a function of state | `import { events } from "@react-three/fiber"` |
| eventSource | The source where events are being subscribed to, HTMLElement | `React.RefObject<HTMLElement>`, `gl.domElement.parentNode` |
| eventPrefix | The event prefix that is cast into canvas pointer x/y events | `offset` |
| flat | Use `THREE.NoToneMapping` instead of `THREE.ACESFilmicToneMapping` | `false` |
| onCreated | Callback after the canvas has rendered (but not yet committed) | `(state) => {}` |
| onPointerMissed | Response for pointer clicks that have missed any target | `(event) => {}` |

[

Defaults
--------

](#defaults)

Canvas uses [createRoot](#createroot) which will create a translucent `THREE.WebGLRenderer` with the following constructor args:

*   antialias=true
*   alpha=true
*   powerPreference="high-performance"

and with the following properties:

*   outputColorSpace = THREE.SRGBColorSpace
*   toneMapping = THREE.ACESFilmicToneMapping

It will also create the following scene internals:

*   A `THREE.Perspective` camera
*   A `THREE.Orthographic` cam if `orthographic` is true
*   A `THREE.PCFSoftShadowMap` if `shadows` is true
*   A `THREE.Scene` (into which all the JSX is rendered) and a `THREE.Raycaster`

In recent versions of threejs, `THREE.ColorManagement.enabled` will be set to `true` to enable automatic conversion of colors according to the renderer's configured color space. R3F will handle texture color space conversion. For more on this topic, see [https://threejs.org/docs/#manual/en/introduction/Color-management](https://threejs.org/docs/#manual/en/introduction/Color-management).

[

Errors and fallbacks
--------------------

](#errors-and-fallbacks)

On some systems WebGL may not be supported, you can provide a fallback component that will be rendered instead of the canvas:

    <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
      <mesh />
    </Canvas>
    

You should also safeguard the canvas against WebGL context crashes, for instance if users have the GPU disabled or GPU drivers are faulty.

    import { useErrorBoundary } from 'use-error-boundary'
    
    function App() {
      const { ErrorBoundary, didCatch, error } = useErrorBoundary()
      return didCatch ? (
        <div>{error.message}</div>
      ) : (
        <ErrorBoundary>
          <Canvas>
            <mesh />
          </Canvas>
        </ErrorBoundary>
      )
    }
    

Ideally, and if possible, your fallback is a seamless, visual replacement for what the canvas would have otherwise rendered.

[

WebGPU
------

](#webgpu)

Recent Three.js now includes a WebGPU renderer. While still a work in progress and not fully backward-compatible with all of Three's features, the renderer requires an async initialization method. R3F streamlines this by allowing the gl prop to return a promise.

    import * as THREE from 'three/webgpu'
    import * as TSL from 'three/tsl'
    import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
    
    declare module '@react-three/fiber' {
      interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
    }
    
    extend(THREE as any)
    
    export default () => (
      <Canvas
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any)
          await renderer.init()
          return renderer
        }}>
          <mesh>
            <meshBasicNodeMaterial />
            <boxGeometry />
          </mesh>
      </Canvas>
    )
    

[

Custom Canvas
-------------

](#custom-canvas)

R3F can render to a root, similar to how `react-dom` and all the other React renderers work. This allows you to shave off `react-dom` (~40kb), `react-use-measure` (~3kb) and, if you don't need them, `pointer-events` (~7kb) (you need to explicitly import `events` and add them to the config otherwise).

Roots have the same options and properties as `Canvas`, but you are responsible for resizing it. It requires an existing DOM `<canvas>` object into which it renders.

[

### CreateRoot

](#createroot)

Creates a root targeting a canvas, rendering JSX.

    import * as THREE from 'three'
    import { extend, createRoot, events } from '@react-three/fiber'
    
    // Register the THREE namespace as native JSX elements.
    // See below for notes on tree-shaking
    extend(THREE)
    
    // Create a react root
    const root = createRoot(document.querySelector('canvas'))
    
    async function app() {
      // Configure the root, inject events optionally, set camera, etc
      // This *must* be called before render, and it must be awaited
      await root.configure({ events, camera: { position: [0, 0, 50] } })
    
      // createRoot by design is not responsive, you have to take care of resize yourself
      window.addEventListener('resize', () => {
        root.configure({ size: { width: window.innerWidth, height: window.innerHeight } })
      })
    
      // Trigger resize
      window.dispatchEvent(new Event('resize'))
    
      // Render entry point
      root.render(<App />)
    
      // Unmount and dispose of memory
      // root.unmount()
    }
    
    app()
    

[

Tree-shaking
------------

](#tree-shaking)

New with v8, the underlying reconciler no longer pulls in the THREE namespace automatically.

This enables a granular catalogue which also enables tree-shaking via the `extend` API:

    import { extend, createRoot } from '@react-three/fiber'
    import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'
    
    extend({ Mesh, BoxGeometry, MeshStandardMaterial })
    
    createRoot(canvas).render(
      <>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </>,
    )
    

There's an [official babel plugin](https://github.com/pmndrs/react-three-babel) which will do this for you automatically:

    // In:
    
    import { createRoot } from '@react-three/fiber'
    
    createRoot(canvasNode).render(
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>,
    )
    
    // Out:
    
    import { createRoot, extend } from '@react-three/fiber'
    import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from 'three'
    
    extend({
      Mesh: _Mesh,
      BoxGeometry: _BoxGeometry,
      MeshStandardMaterial: _MeshStandardMaterial,
    })
    
    createRoot(canvasNode).render(
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>,
    )</content>
</page>

<page>
  <title>Installation - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/getting-started/installation#react-native</url>
  <content>Learn how to install react-three-fiber

    npm install three @react-three/fiber
    

> Fiber is compatible with React v18.0.0+ and works with ReactDOM and React Native.

Getting started with React Three Fiber is not nearly as hard as you might have thought, but various frameworks may require particular attention.

We've put together guides for getting started with each popular framework:

*   Vite.js
*   Next.js
*   CDN w/o build tools
*   React Native

If you just want to give it a try, fork this [example on codesandbox](https://codesandbox.io/s/rrppl0y8l4?file=/src/App.js)!

[

Vite.js
-------

](#vite.js)

`vite` will also work out of the box.

    # Create app
    npm create vite my-app
    
    # Select react as framework
    
    # Install dependencies
    cd my-app
    npm install three @react-three/fiber
    
    # Start development server
    npm run dev
    

[

Next.js
-------

](#next.js)

It should work out of the box but you will encounter untranspiled add-ons in the three.js ecosystem, in that case,

[

### Next.js 13.1 or latest version

](#next.js-13.1-or-latest-version)

You need to add three to `transpilePackages` property in `next.config.js`:

    transpilePackages: ['three'],
    

[

### Next.js 13.0 or oldest version

](#next.js-13.0-or-oldest-version)

You can install the `next-transpile-modules` module:

    npm install next-transpile-modules --save-dev
    

then, add this to your `next.config.js`

    const withTM = require('next-transpile-modules')(['three'])
    module.exports = withTM()
    

Make sure to check out our [official next.js starter](https://github.com/pmndrs/react-three-next), too!

[](#without-build-tools)

You can use React Three Fiber with browser-ready ES Modules from [esm.sh](https://esm.sh/) and a JSX-like syntax powered by [htm](https://github.com/developit/htm).

    import ReactDOM from 'https://esm.sh/react-dom'
    import React, { useRef, useState } from 'https://esm.sh/react'
    import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'
    import htm from 'https://esm.sh/htm'
    
    const html = htm.bind(React.createElement)
    ReactDOM.render(html`<${Canvas}>...<//>`, document.getElementById('root'))
    

Full example

    import ReactDOM from 'https://esm.sh/react-dom'
    import React, { useRef, useState } from 'https://esm.sh/react'
    import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber'
    import htm from 'https://esm.sh/htm'
    
    const html = htm.bind(React.createElement)
    
    function Box(props) {
      const meshRef = useRef()
      const [hovered, setHover] = useState(false)
      const [active, setActive] = useState(false)
      useFrame(() => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01))
      return html` <mesh
        ...${props}
        ref=${meshRef}
        scale=${active ? 1.5 : 1}
        onClick=${() => setActive(!active)}
        onPointerOver=${() => setHover(true)}
        onPointerOut=${() => setHover(false)}
      >
        <boxGeometry args=${[1, 1, 1]} />
        <meshStandardMaterial color=${hovered ? 'hotpink' : 'orange'} />
      </mesh>`
    }
    
    ReactDOM.render(
      html` <${Canvas}>
        <ambientLight />
        <pointLight position=${[10, 10, 10]} />
        <${Box} position=${[-1.2, 0, 0]} />
        <${Box} position=${[1.2, 0, 0]} />
      <//>`,
      document.getElementById('root'),
    )
[

React Native
------------

](#react-native)

R3F v8 adds support for react-native and can be imported from `@react-three/fiber/native`. We use `expo-gl` and `expo-asset` under the hood for WebGL2 bindings and ensuring interplay between Metro and three.js loaders.

To get started, create an app via `expo` or `react-native`:

    # Create a managed/bare app
    npx create-expo-app
    cd my-app
    
    # or
    
    # Create and link bare app
    npx react-native init my-app
    npx install-expo-modules@latest
    cd my-app
    

Then install dependencies (for manual installation or migration, see [expo modules installation](https://docs.expo.dev/bare/installing-expo-modules)):

    # Automatically install
    expo install expo-gl
    
    # Install NPM dependencies
    npm install three @react-three/fiber
    

Some configuration may be required to tell the Metro bundler about your assets if you use `useLoader` or Drei abstractions like `useGLTF` and `useTexture`:

    // metro.config.js
    module.exports = {
      resolver: {
        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
        assetExts: ['glb', 'gltf', 'png', 'jpg'],
      },
    }
    

R3F's API is completely x-platform, so you can use [events](https://r3f.docs.pmnd.rs/api/events) and [hooks](https://r3f.docs.pmnd.rs/api/hooks) just as you would on the web.

Make sure to import from `@react-three/fiber/native` or `@react-three/drei/native` for correct IntelliSense and platform-specific abstractions.

    import { Suspense } from 'react'
    import { Canvas } from '@react-three/fiber/native'
    import { useGLTF } from '@react-three/drei/native'
    import modelPath from './path/to/model.glb'
    
    function Model(props) {
      const gltf = useGLTF(modelPath)
      return <primitive {...props} object={gltf.scene} />
    }
    
    export default function App() {
      return (
        <Canvas>
          <ambientLight />
          <Suspense>
            <Model />
          </Suspense>
        </Canvas>
      )
    }</content>
</page>

<page>
  <title>Examples - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/getting-started/examples</url>
  <content>*   [](https://codesandbox.io/s/5w35n6)
    
    ###### SSGI spheres with rapier physics
    
    ssgirapier
    
*   [](https://codesandbox.io/s/gwthnh)
    
    ###### Thunder clouds
    
    clouds
    
*   [](https://codesandbox.io/s/2y73c6)
    
    ###### MotionPathControls
    
    motion-pathclouds
    
*   [](https://codesandbox.io/s/ykfpwf)
    
    ###### Room with soft shadows
    
    causticseffectssoft-shadows
    
*   [](https://codesandbox.io/s/yggpw5)
    
    ###### Volumetric light, Godray
    
    godraysreflections
    
*   [](https://codesandbox.io/s/9m4tpc)
    
    ###### Enter portals
    
    portals
    
*   [](https://codesandbox.io/s/qvk72r)
    
    ###### Pass through portals
    
    portals
    
*   [](https://codesandbox.io/s/drc6qg)
    
    ###### Magic box
    
    portals
    
*   [](https://codesandbox.io/s/hmbn1l)
    
    ###### Video cookies
    
    videocookiescaustics
    
*   [](https://codesandbox.io/s/dq6wwe)
    
    ###### glass flower
    
    glasstransmissionbloom
    
*   [](https://codesandbox.io/s/dc5fjy)
    
    ###### Cards
    
    cardsimage
    
*   [](https://codesandbox.io/s/3ywzzx)
    
    ###### Diamond ring
    
    refraction
    
*   [](https://codesandbox.io/s/lx2h8)
    
    ###### Image Gallery
    
    reflectionsannotations
    
*   [](https://codesandbox.io/s/l4klb)
    
    ###### Horizontal tiles
    
    scrollcontrols
    
*   [](https://codesandbox.io/s/zxpv7)
    
    ###### BestServedBold Christmas Baubles
    
    physics
    
*   [](https://codesandbox.io/s/0n9it)
    
    ###### The three graces
    
    htmlannotations
    
*   [](https://codesandbox.io/s/imn42)
    
    ###### Frosted glass
    
    frostedglasstransmission
    
*   [](https://codesandbox.io/s/pbwi6i)
    
    ###### GLTFJSX 400kb drone
    
    gltfjsxeffectsbloomsoft-shadows
    
*   [](https://codesandbox.io/s/fslt99)
    
    ###### Starwars
    
    effectsreflectionsssrbloom
    
*   [](https://codesandbox.io/s/2qfxj4)
    
    ###### Bruno Simons 20k challenge
    
    rapierphysicssoft-shadows
    
*   [](https://codesandbox.io/s/2n98yj)
    
    ###### Scrollcontrols and lens refraction
    
    scrollrefractionlens
    
*   [](https://codesandbox.io/s/e662p3)
    
    ###### Building dynamic envmaps
    
    effectsbloomreflections
    
*   [](https://codesandbox.io/s/j3ycvl)
    
    ###### Nextjs prism
    
    effectsbloom
    
*   [](https://codesandbox.io/s/lwo219)
    
    ###### Building live envmaps
    
    customenvironments
    
*   [](https://codesandbox.io/s/qxjoj)
    
    ###### Shoe configurator
    
    gltfjsxconfigurator
    
*   [](https://codesandbox.io/s/dvokj)
    
    ###### Audio analyser
    
    audioanalyser
    
*   [](https://codesandbox.io/s/bfplr)
    
    ###### Ground reflections and video textures
    
    groundreflectionsvideo-texture
    
*   [](https://codesandbox.io/s/ni6v4)
    
    ###### ThreeJS Journey Portal
    
    bruno-simonthreejs-journey
    
*   [](https://codesandbox.io/s/9keg6)
    
    ###### Mixing HTML and WebGL w/ occlusion
    
    htmliframe
    
*   [](https://codesandbox.io/s/f79ucc)
    
    ###### Interactive spline scene + live HTML
    
    splinetooliframe
    
*   [](https://codesandbox.io/s/zqrreo)
    
    ###### Diamond refraction
    
    refraction
    
*   [](https://codesandbox.io/s/4gy946)
    
    ###### Diamond ring
    
    refractioninstanced
    
*   [](https://codesandbox.io/s/q48jgy)
    
    ###### Envmap ground projection
    
    ground-projected-env
    
*   [](https://codesandbox.io/s/ju368j)
    
    ###### Spline glass shapes
    
    splinetooltransmission
    
*   [](https://codesandbox.io/s/mlgzsc)
    
    ###### CSG bunny, useGroups
    
    transmissioncsg
    
*   [](https://codesandbox.io/s/y52tmt)
    
    ###### CSG house
    
    csg
    
*   [](https://codesandbox.io/s/hg3ejl)
    
    ###### GLTF Animations tied to scroll
    
    scrollanimationeffectstiltshift
    
*   [](https://codesandbox.io/s/ssbdsw)
    
    ###### Object clump
    
    physicseffectsn8ao
    
*   [](https://codesandbox.io/s/024uom)
    
    ###### HTML Input fields
    
    htmlinput
    
*   [](https://codesandbox.io/s/gsm1y)
    
    ###### UseIntersect and scrollcontrols
    
    scroll
    
*   [](https://codesandbox.io/s/x8gvs)
    
    ###### Infinite scroll
    
    scroll
    
*   [](https://codesandbox.io/s/yjhzv)
    
    ###### Scrollcontrols with minimap
    
    scroll
    
*   [](https://codesandbox.io/s/qpfgyp)
    
    ###### Instanced particles + Effects
    
    effectsparticles
    
*   [](https://codesandbox.io/s/62o18n)
    
    ###### Dbismut furniture
    
    cross-fadetransitions
    
*   [](https://codesandbox.io/s/8j36ok)
    
    ###### Portal shapes
    
    transmissionportalsphysics
    
*   [](https://codesandbox.io/s/n7jf0f)
    
    ###### Aquarium
    
    transmissionportals
    
*   [](https://codesandbox.io/s/ik11ln)
    
    ###### Portals
    
    portalsblend
    
*   [](https://codesandbox.io/s/lxvqek)
    
    ###### Inter, epoxy resin
    
*   [](https://codesandbox.io/s/if9crg)
    
    ###### Stage presets, gltfjsx
    
*   [](https://codesandbox.io/s/xzi6ps)
    
    ###### React EllipseCurve
    
*   [](https://codesandbox.io/s/qvb1vk)
    
    ###### Iridescent decals
    
*   [](https://codesandbox.io/s/hxcc1x)
    
    ###### Baking soft shadows
    
*   [](https://codesandbox.io/s/8pbw1f)
    
    ###### SSR Test
    
*   [](https://codesandbox.io/s/mw0dtc)
    
    ###### CSG operations + Rapier physics
    
*   [](https://codesandbox.io/s/8flefh)
    
    ###### Faucets, select highlight
    
*   [](https://codesandbox.io/s/7e9y1b)
    
    ###### Rapier physics
    
*   [](https://codesandbox.io/s/whnhyr)
    
    ###### bloom hdr workflow, GLTF
    
*   [](https://codesandbox.io/s/0c5hv9)
    
    ###### Ground projected envmaps + lamina
    
*   [](https://codesandbox.io/s/0fqow2)
    
    ###### Basic ballpit
    
*   [](https://codesandbox.io/s/2ij9u)
    
    ###### Backdrop and cables
    
*   [](https://codesandbox.io/s/42glz0)
    
    ###### Clones
    
*   [](https://codesandbox.io/s/ledhe1)
    
    ###### lamina 1.x
    
*   [](https://codesandbox.io/s/nurp5t)
    
    ###### React-pp outlines
    
*   [](https://codesandbox.io/s/2csbr1)
    
    ###### Gatsby stars
    
*   [](https://codesandbox.io/s/go0b4w)
    
    ###### Pmndrs + Vercel
    
*   [](https://codesandbox.io/s/s006f)
    
    ###### Sport hall
    
*   [](https://codesandbox.io/s/l900i)
    
    ###### Night train
    
*   [](https://codesandbox.io/s/qyz5r)
    
    ###### Bouncy watch
    
*   [](https://codesandbox.io/s/kv7tv)
    
    ###### Transparent aesop bottles
    
*   [](https://codesandbox.io/s/ls503)
    
    ###### Raycast cycling
    
*   [](https://codesandbox.io/s/n60qg)
    
    ###### Landing page.
    
*   [](https://codesandbox.io/s/4jr4p)
    
    ###### Scrollcontrols + GLTF
    
*   [](https://codesandbox.io/s/kud9p)
    
    ###### Merged Instance
    
*   [](https://codesandbox.io/s/zgsyn)
    
    ###### GPGPU Curl-noise + DOF
    
*   [](https://codesandbox.io/s/i6t0j)
    
    ###### Hi-key bubbles
    
*   [](https://codesandbox.io/s/h8o2d)
    
    ###### Floating, instanced shoes.
    
*   [](https://codesandbox.io/s/wu51m)
    
    ###### Simple audio analyser
    
*   [](https://codesandbox.io/s/tu24h)
    
    ###### Camera Scroll
    
*   [](https://codesandbox.io/s/jz9l97qn89)
    
    ###### Springy boxes
    
*   [](https://codesandbox.io/s/prb9t)
    
    ###### Floating diamonds
    
*   [](https://codesandbox.io/s/pecl6)
    
    ###### GLTF Animations
    
*   [](https://codesandbox.io/s/sbf2i)
    
    ###### Sparks and effects
    
*   [](https://codesandbox.io/s/t4l0f)
    
    ###### Camera shake
    
*   [](https://codesandbox.io/s/wdzv4)
    
    ###### Ragdoll physics
    
*   [](https://codesandbox.io/s/6hi1y)
    
    ###### React-spring animations
    
*   [](https://codesandbox.io/s/1sccp)
    
    ###### Mount transitions
    
*   [](https://codesandbox.io/s/q23sw)
    
    ###### Floating laptop
    
*   [](https://codesandbox.io/s/gpioq)
    
    ###### Zustand site
    
*   [](https://codesandbox.io/s/3rjsl)
    
    ###### Cell fracture
    
*   [](https://codesandbox.io/s/4j2q2)
    
    ###### Router transitions
    
*   [](https://codesandbox.io/s/dh2jc)
    
    ###### Soft shadows
    
*   [](https://codesandbox.io/s/gkfhr)
    
    ###### Lulaby city
    
*   [](https://codesandbox.io/s/0buje)
    
    ###### Viking ship
    
*   [](https://codesandbox.io/s/5oufp)
    
    ###### Wobbling sphere
    
*   [](https://codesandbox.io/s/f1ixt)
    
    ###### Moksha
    
*   [](https://codesandbox.io/s/7psew)
    
    ###### Flexbox/Yoga in Webgl
    
*   [](https://codesandbox.io/s/vl221)
    
    ###### Confetti
    
*   [](https://codesandbox.io/s/oep9o)
    
    ###### Learn with Jason
    
*   [](https://codesandbox.io/s/tx1pq)
    
    ###### Volumetric spotlight</content>
</page>

<page>
  <title>Your first scene - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/getting-started/your-first-scene</url>
  <content>This guide will help you setup your first React Three Fiber scene and introduce you to its core concepts.

This tutorial will assume some React knowledge.

[

Setting up the Canvas
---------------------

](#setting-up-the-canvas)

We'll start by importing the `<Canvas />` component from `@react-three/fiber` and putting it in our React tree.

    import { createRoot } from 'react-dom/client'
    import { Canvas } from '@react-three/fiber'
    
    function App() {
      return (
        <div id="canvas-container">
          <Canvas />
        </div>
      )
    }
    
    createRoot(document.getElementById('root')).render(<App />)
    

The Canvas component does some important setup work behind the scenes:

*   It sets up a **Scene** and a **Camera**, the basic building blocks necessary for rendering
*   It renders our scene every frame, you do not need a traditional render-loop

Canvas is responsive to fit the parent node, so you can control how big it is by changing the parents width and height, in this case #canvas-container.

[

Adding a Mesh Component
-----------------------

](#adding-a-mesh-component)

To actually see something in our scene, we'll add a lowercase `<mesh />` native element, which is the direct equivalent to new THREE.Mesh().

Note that we don't need to import anything, All three.js objects will be treated as native JSX elements, just like you can just write <div /> or <span /> in regular ReactDOM. The general rule is that Fiber components are available under the camel-case version of their name in three.js.

A [`Mesh`](https://threejs.org/docs/#api/en/objects/Mesh) is a basic scene object in three.js, and it's used to hold the geometry and the material needed to represent a shape in 3D space. We'll create a new mesh using a **BoxGeometry** and a **MeshStandardMaterial** which [automatically attach](https://r3f.docs.pmnd.rs/api/objects#attach) to their parent.

    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
    

Let's pause for a moment to understand exactly what is happening here. The code we just wrote is the equivalent to this three.js code:

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    document.querySelector('#canvas-container').appendChild(renderer.domElement)
    
    const mesh = new THREE.Mesh()
    mesh.geometry = new THREE.BoxGeometry()
    mesh.material = new THREE.MeshStandardMaterial()
    
    scene.add(mesh)
    
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    
    animate()
    

[

### Constructor arguments

](#constructor-arguments)

According to the [docs for `BoxGeometry`](https://threejs.org/docs/#api/en/geometries/BoxGeometry) we can optionally pass three arguments for: width, length and depth:

    new THREE.BoxGeometry(2, 2, 2)
    

In order to do this in Fiber we use the `args` prop, which _always_ takes an array whose items represent the constructor arguments.

    <boxGeometry args={[2, 2, 2]} />
    

Note that every time you change args, the object must be re-constructed!

[

Adding lights
-------------

](#adding-lights)

Next, we will add some lights to our scene, by putting these components into our canvas.

    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
    

[

### Props

](#props)

This introduces us to the last fundamental concept of Fiber, how React `props` work on three.js objects. When you set any prop on a Fiber component, it will set the property of the same name on the three.js instance.

Let's focus on our `ambientLight`, whose [documentation](https://threejs.org/docs/#api/en/lights/AmbientLight) tells us that we can optionally construct it with a color, but it can also receive props.

    <ambientLight intensity={0.1} />
    

Which is the equivalent to:

    const light = new THREE.AmbientLight()
    light.intensity = 0.1
    

[

### Shortcuts

](#shortcuts)

There are a few shortcuts for props that have a `.set()` method (colors, vectors, etc).

    const light = new THREE.DirectionalLight()
    light.position.set(0, 0, 5)
    light.color.set('red')
    

Which is the same as the following in JSX:

    <directionalLight position={[0, 0, 5]} color="red" />
    

Please refer to the API for [a deeper explanation](https://r3f.docs.pmnd.rs/api/objects).

[

The result
----------

](#the-result)

import { Canvas } from "@react-three/fiber";

export default function App() {
return (
    <Canvas\>
      <mesh\>
        <boxGeometry args\={\[2, 2, 2\]} />
        <meshPhongMaterial />
      </mesh\>
      <ambientLight intensity\={0.1} />
      <directionalLight position\={\[0, 0, 5\]} color\="red" />
    </Canvas\>
);
}</content>
</page>

<page>
  <title>Scaling performance - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/advanced/scaling-performance</url>
  <content>This is a short primer on how to scale performance.

Running WebGL can be quite expensive depending on how powerful your devices are. In order to mitigate this, especially if you want to make your application available to a broad variety of devices, including weaker options, you should look into performance optimizations. This article goes through a couple of them.

[

On-demand rendering
-------------------

](#on-demand-rendering)

three.js apps usually run in a game-loop that executes 60 times a second, React Three Fiber is no different. This is perfectly fine when your scene has _constantly_ moving parts in it. This is what generally drains batteries the most and makes fans spin up.

But if the moving parts in your scene are allowed to come to rest, then it would be wasteful to keep rendering. In such cases you can opt into on-demand rendering, which will only render when necessary. This saves battery and keeps noisy fans in check.

Open the sandbox below in a full screen and look into dev tools, you will see that it is completely idle when nothing is going on. It renders only when you move the model.

[](https://codesandbox.io/s/wvgxp)

###### Color grading

All you need to do is set the canvas `frameloop` prop to `demand`. It will render frames whenever it detects prop changes throughout the component tree.

    <Canvas frameloop="demand">
    

[

### Triggering manual frames

](#triggering-manual-frames)

One major caveat is that if anything in the tree _mutates_ props, then React cannot be aware of it and the display would be stale. For instance, camera controls just grab into the camera and mutate its values. Here you can use React Three Fiber's `invalidate` function to trigger frames manually.

    function Controls() {
      const orbitControlsRef = useRef()
      const { invalidate, camera, gl } = useThree()
      useEffect(() => {
        orbitControlsRef.current.addEventListener('change', invalidate)
        return () => orbitControlsRef.current.removeEventListener('change', invalidate)
      }, [])
      return <orbitControls ref={orbitControlsRef} args={[camera, gl.domElement]} />
    

Drei's controls do this automatically for you.

Generally you can call invalidate whenever you need to render:

Calling `invalidate()` will not render immediately, it merely requests a new frame to be rendered out. Calling invalidate multiple times will not render multiple times. Think of it as a flag to tell the system that something has changed.

[

### Sync animations with on-demand-rendering and invalidate

](#sync-animations-with-on-demand-rendering-and-invalidate)

Since `invalidate()` is only a flag that schedules render, you might bump into syncing issues when you run animations that are synchronous (as in, they start immediately). By the time fiber renders the first frame the animation has already progressed which leads to a visible jump. In such cases you should pre-emptively schedule a render and then start the animation in the next frame.

    <mesh
      onClick={() => {
        // Pre-emptively schedule a render
        invalidate()
        // Wait for the next frame to start the animation
        requestAnimationFrame(() => controls.dolly(1, true))
      }}
    

[

Re-using geometries and materials
---------------------------------

](#re-using-geometries-and-materials)

Each geometry and material means additional overhead for the GPU. You should try to re-use resources if you know they will repeat.

You could do this globally:

    const red = new THREE.MeshLambertMaterial({ color: "red" })
    const sphere = new THREE.SphereGeometry(1, 28, 28)
    
    function Scene() {
      return (
        <>
          <mesh geometry={sphere} material={red} />
          <mesh position={[1, 2, 3]} geometry={sphere} material={red} />
    

If you create a material or color in global space - outside of React Three Fiber's `Canvas` context - you should enable [ColorManagement](https://threejs.org/docs/#manual/en/introduction/Color-management) in three.js. This will allow certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically, producing correct colors in all cases.

    import * as THREE from 'three'
    
    // r150
    THREE.ColorManagement.enabled = true
    
    // r139-r149
    THREE.ColorManagement.legacyMode = false
    

[

### Caching with `useLoader`

](#caching-with-useloader)

Every resource that is loaded with useLoader is cached automatically!

If you access a resource via useLoader with the same URL, throughout the component tree, then you will always refer to the same asset and thereby re-use it. This is especially useful if you run your GLTF assets through [GLTFJSX](https://github.com/pmndrs/gltfjsx) because it links up geometries and materials and thereby creates re-usable models.

[](https://codesandbox.io/s/dix1y)

###### Re-using GLTFs

    function Shoe(props) {
      const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
      return (
        <group {...props} dispose={null}>
          <mesh geometry={nodes.shoe.geometry} material={materials.canvas} />
        </group>
      )
    }
    
    <Shoe position={[1, 2, 3]} />
    <Shoe position={[4, 5, 6]} />
    

[

Instancing
----------

](#instancing)

Each mesh is a draw call, you should be mindful of how many of these you employ: no more than 1000 as the very maximum, and optimally a few hundred or less. You can win performance back by reducing draw calls, for example by instancing repeating objects. This way you can have hundreds of thousands of objects in a single draw call.

[](https://codesandbox.io/s/h873k)

###### Instances

Setting up instancing is not so hard, consult [the three.js docs](https://threejs.org/docs/#api/en/objects/InstancedMesh) if you need help.

    function Instances({ count = 100000, temp = new THREE.Object3D() }) {
      const instancedMeshRef = useRef()
      useEffect(() => {
        // Set positions
        for (let i = 0; i < count; i++) {
          temp.position.set(Math.random(), Math.random(), Math.random())
          temp.updateMatrix()
          instancedMeshRef.current.setMatrixAt(i, temp.matrix)
        }
        // Update the instance
        instancedMeshRef.current.instanceMatrix.needsUpdate = true
      }, [])
      return (
        <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
          <boxGeometry />
          <meshPhongMaterial />
        </instancedMesh>
      )
    }
    

[

Level of detail
---------------

](#level-of-detail)

Sometimes it can be beneficial to reduce the quality of an object the further it is away from the camera. Why would you display it full resolution if it is barely visible. This can be a good strategy to reduce the overall vertex-count which means less work for the GPU.

Scroll in and out to see the effect:

[](https://codesandbox.io/s/12nmp)

###### Re-using geometry and level of detail

There is a small component in Drei called `<Detailed />` which sets up LOD without boilerplate. You load or prepare a couple of resolution stages, as many as you like, and then give them the same amount of distances from the camera, starting from highest quality to lowest.

    import { Detailed, useGLTF } from '@react-three/drei'
    
    function Model() {
      const [low, mid, high] = useGLTF(["/low.glb", "/mid.glb", "/high.glb"])
      return (
        <Detailed distances={[0, 10, 20]}>
          <mesh geometry={high} />
          <mesh geometry={mid} />
          <mesh geometry={low} />
        <Detailed/>
      )
    }
    

[

Nested loading
--------------

](#nested-loading)

Nested loading means that lesser textures and models are loaded first, higher-resolution later.

The following sandbox goes through three loading stages:

*   A loading indicator
*   Low quality
*   High quality

[](https://codesandbox.io/s/7duy8)

###### Progressive loading states with suspense

And this is how easy it is to achieve it, you can nest suspense and even use it as a fallback:

    function App() {
      return (
        <Suspense fallback={<span>loading...</span>}>
          <Canvas>
            <Suspense fallback={<Model url="/low-quality.glb" />}>
              <Model url="/high-quality.glb" />
            </Suspense>
          </Canvas>
        </Suspense>
      )
    }
    
    function Model({ url }) {
      const { scene } = useGLTF(url)
      return <primitive object={scene} />
    }
    

[

Performance monitoring
----------------------

](#performance-monitoring)

Drei has a new component [PerformanceMonitor](https://github.com/pmndrs/drei#performancemonitor) that allows you to monitor, and adapt to, device performance. This component will collect the average fps (frames per second) over time. If after a couple of iterations the averages are below or above a threshold it will trigger onIncline and onDecline callbacks that allow you to respond. Typically you would reduce the quality of your scene, the resolution, effects, the amount of stuff to render, or, increase it if you have enough framerate to fill.

Since this would normally cause ping-ponging between the two callbacks you define upper and lower framerate bounds, as long as you stay within that margin nothing will trigger. Ideally your app should find its way into that margin by gradually altering quality.

A simple example for regulating the resolution. It starts out with 1.5, if the system falls below the bounds it goes to 1, if it's fast enough it goes to 2.

    function App() {
      const [dpr, setDpr] = useState(1.5)
      return (
        <Canvas dpr={dpr}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} >
    

You can also use the onChange callback to get notified when the average changes in whichever direction. This allows you to make gradual changes. It gives you a factor between 0 and 1, which is increased by incline and decreased by decline. The factor is initially 0.5 by default.

    import round from 'lodash/round'
    
    const [dpr, setDpr] = useState(1)
    return (
     <Canvas dpr={dpr}>
      <PerformanceMonitor onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}>
    

If you still experience flip flops despite the bounds you can define a limit of flipflops. If it is met onFallback will be triggered which typically sets a lowest possible baseline for the app. After the fallback has been called PerformanceMonitor will shut down.

    <PerformanceMonitor flipflops={3} onFallback={() => setDpr(1)}>
    

PerformanceMonitor can also have children, if you wrap your app in it you get to use usePerformanceMonitor which allows individual components down the nested tree to respond to performance changes on their own.

    ;<PerformanceMonitor>
      <Effects />
    </PerformanceMonitor>
    
    function Effects() {
      usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
      // ...
    }
    

[

Movement regression
-------------------

](#movement-regression)

Websites like Sketchfab make sure the scene is always fluid, running at 60 fps, and responsive, no matter which device is being used or how expensive a loaded model is. They do this by regressing movement, where effects, textures, shadows will slightly reduce quality until still-stand

The following sandbox uses expensive lights and post-processing. In order for it to run relatively smooth it will scale the pixel ratio on movement and also skip heavy post-processing effects like ambient occlusion.

[](https://codesandbox.io/s/pz0q6)

###### Performance scaling

When you inspect the state model you will notice an object called `performance`.

    performance: {
      current: 1,
      min: 0.1,
      max: 1,
      debounce: 200,
      regress: () => void,
    },
    

*   `current`: Performance factor alternates between min and max
*   `min`: Performance lower bound (should be less than 1)
*   `max`: Performance upper bound (no higher than 1)
*   `debounce`: Debounce timeout until it goes to upper bound (1) again
*   `regress()`: Function that temporarily regresses performance

You can define defaults like so:

    <Canvas performance={{ min: 0.5 }}>...</Canvas>
    

[

### This is how you can put the system into regression

](#this-is-how-you-can-put-the-system-into-regression)

The only thing you have to do is call `regress()`. When exactly you do that, that is up to you, but it could be when the mouse moves, or the scene is moving, for instance when controls fire their change-event.

Say you are using controls, then the following code puts the system in regress when they are active:

    const regress = useThree((state) => state.performance.regress)
    useEffect(() => {
      controls.current?.addEventListener('change', regress)
    

[

### This is how you can respond to it

](#this-is-how-you-can-respond-to-it)

Mere calls to `regress()` will not change or affect anything!

Your app has to opt into performance scaling by listening to the performance `current`! The number itself will tell you what to do. 1 (max) means everything is ok, the default. Less than 1 (min) means a regression is requested and the number itself tells you how far you should go when scaling down.

For instance, you could simply multiply `current` with the pixelratio to cut down on resolution. If you have defined `min: 0.5` that would mean it will half the resolution for at least 200ms (delay) when regress is called. It can be used for anything else, too: switching off lights when `current < 1`, using lower-res textures, skip post-processing effects, etc. You could of course also animate/lerp these changes.

Here is a small prototype component that scales the pixel ratio:

    function AdaptivePixelRatio() {
      const current = useThree((state) => state.performance.current)
      const setPixelRatio = useThree((state) => state.setDpr)
      useEffect(() => {
        setPixelRatio(window.devicePixelRatio * current)
      }, [current])
      return null
    }
    

Drop this component into the scene, combine it with the code above that calls `regress()`, and you have adaptive resolution:

There are pre-made components for this already in the [Drei library](https://github.com/pmndrs/drei/#performance).

[

Enable concurrency
------------------

](#enable-concurrency)

React 18 introduces concurrent scheduling, specifically time slicing via `startTransition` and `useTransition`. This will virtualize the component graph, which then allows you to prioritise components and actions. Think of how a virtual list avoids scaling issues because it only renders as many items as the screen can take, it is not affected by the amount of items it has to render, be it 10 or 100.000.000.

React 18 functions very similar to this, it can potentially defer load and heavy tasks in ways that would be hard or impossible to achieve in a vanilla application. It thereby holds on to a stable framerate even in the most demanding situations.

The following benchmark shows how powerful concurrency can be: [https://github.com/drcmda/scheduler-test](https://github.com/drcmda/scheduler-test)

It simulates heavy load by creating hundreds of THREE.TextGeometry instances (510 to be exact). This class, like many others in three.js, is expensive and takes a while to construct. If all 510 instances are created the same time **it will cause approximately 1.5 seconds of pure jank** (Apple M1), the tab would normally freeze. It runs in an interval and **will execute every 2 seconds**.

|  | Distributed | At-once |
| --- | --- | --- |
| three.js | ~20fps | ~5fps |
| React | ~60fps | ~60fps |

For more on how to use this API, see [use startTransition for expensive ops](https://r3f.docs.pmnd.rs/advanced/pitfalls#use-starttransition-for-expensive-ops).</content>
</page>

<page>
  <title>v9 Migration Guide - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide</url>
  <content>Changes and new features with v9 and React 19

This is a compatibility release for React 19, which brings further performance, stability, and type improvements. You can check out the React 19 changelog [here](https://react.dev/blog/2024/04/25/react-19).

We would like to express our gratitude to the community for their continued support, as well as to all our contributors, including the React team at Meta and Vercel, for ensuring this upgrade went smoothly. 🎉

This release contains breaking changes when using Strict Mode, which can highlight bugs during development. See [StrictMode](#strictmode).

[

Features
--------

](#features)[

### useLoader Accepts Loader Instance

](#useloader-accepts-loader-instance)

`useLoader` now supports re-use of external loader instances for more controlled pooling and setup.

    import { GLTFLoader } from 'three/addons'
    import { useLoader } from '@react-three/fiber'
    
    function Model() {
      const gltf = useLoader(GLTFLoader, '/path/to/model.glb')
      // ...
    }
    
    // or,
    
    const loader = new GLTFLoader()
    function Model() {
      const gltf = useLoader(loader, '/path/to/model.glb')
      // ...
    }
    

[

### Factory extend Signature

](#factory-extend-signature)

`extend` can now produce a component when a three.js class is passed to it individually instead of a catalog of named classes. This is backwards compatible and reduces TypeScript boilerplate and JSX collisions. We recommend libraries migrate to this signature so internal components don't clash with user-land declarations.

    import { OrbitControls } from 'three/addons'
    import { type ThreeElement, type ThreeElements } from '@react-three/fiber'
    
    declare module '@react-three/fiber' {
      interface ThreeElements {
        orbitControls: ThreeElement<typeof OrbitControls>
      }
    }
    
    extend({ OrbitControls })
    
    <orbitControls args={[camera, gl.domElement]}>
    
    // or,
    
    const Controls = extend(OrbitControls)
    <Controls args={[camera, gl.domElement]} />
    

[

### Async GL prop

](#async-gl-prop)

The Canvas GL prop accepts constructor parameters, properties, or a renderer instance via a callback. The callback now passes constructor parameters instead of just a canvas reference.

    <Canvas
      gl={{ reverseDepthBuffer: true }}
    - gl={(canvas) => new WebGLRenderer({ canvas })}
    + gl={(props) => new WebGLRenderer(props)}
    >
    

Further, a callback passed to GL can now return a promise for async constructors like `WebGPURenderer` (see [WebGPU](#webgpu)).

    <Canvas
      gl={async (props) => {
        // ...
        return renderer
      }}
    >
    

[

WebGPU
------

](#webgpu)

Recent Three.js now includes a WebGPU renderer. While still a work in progress and not fully backward-compatible with all of Three's features, the renderer requires an async initialization method. R3F streamlines this by allowing the gl prop to return a promise.

    import * as THREE from 'three/webgpu'
    import * as TSL from 'three/tsl'
    import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
    
    declare module '@react-three/fiber' {
      interface ThreeElements extends ThreeToJSXElements<typeof THREE> {}
    }
    
    extend(THREE as any)
    
    export default () => (
      <Canvas
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any)
          await renderer.init()
          return renderer
        }}>
          <mesh>
            <meshBasicNodeMaterial />
            <boxGeometry />
          </mesh>
      </Canvas>
    )
    

[

Fixes
-----

](#fixes)[

### Color Management of Textures

](#color-management-of-textures)

Automatic sRGB conversion of texture props has been removed. Color textures are now handled automatically for built-in materials, aligning with vanilla Three.js behavior. This prevents issues where data textures (e.g., normals or displacement) become corrupted or non-linear. For custom materials or shaders, annotate color textures with `texture.colorSpace = THREE.SRGBColorSpace` or `texture-colorSpace={THREE.SRGBColorSpace}` in JSX.

For more details, see [https://threejs.org/docs/#manual/en/introduction/Color-management](https://threejs.org/docs/#manual/en/introduction/Color-management).

[

### Suspense and Side-Effects

](#suspense-and-side-effects)

The handling of Suspense and fallback content has improved in React and R3F. Side-effects like attach and constructor effects (e.g., controls adding event listeners) no longer fire repeatedly without proper cleanup during suspension.

    import { ThreeElement, useThree } from '@react-three/fiber'
    import { OrbitControls } from 'three/addons'
    
    declare module '@react-three/fiber' {
      interface ThreeElements {
        OrbitControls: ThreeElement<typeof OrbitControls>
      }
    }
    
    extend({ OrbitControls })
    
    function Controls() {
      const camera = useThree((state) => state.camera)
      const gl = useThree((state) => state.gl)
    
      // Will only initialize when tree is connected to screen
      return <orbitControls args={[camera, gl.domElement]}>
    }
    
    <Suspense>
      <Controls />
      <AsyncComponent />
    </Suspense>
    

[

### Swapping with args and primitives

](#swapping-with-args-and-primitives)

Swapping elements when changing the `args` or primitive `object` prop has been improved for structured children like arrays or iterators (React supports both, including async iterators). Previously, primitives sharing an object could update out of order or be removed from the scene along with their children.

See: [https://github.com/pmndrs/react-three-fiber/pull/3272](https://github.com/pmndrs/react-three-fiber/pull/3272)

[

TypeScript Changes
------------------

](#typescript-changes)[

### Props renamed to CanvasProps

](#props-renamed-to-canvasprops)

Canvas `Props` is now called `CanvasProps` for clarity. These were aliased in v8 for forward compatibility, but `Props` is removed with v9.

    -function Canvas(props: Props)
    +function Canvas(props: CanvasProps)
    

[

### Dynamic JSX Types

](#dynamic-jsx-types)

Since R3F's creation, JSX types had to be maintained in accordance with additions to three core API. Although missing or future types could be ignored or resilient for forward and backwards compatibility, this was a major maintenance burden for us and those extending three. Furthermore, libraries which wrap or bind to the known catalog of elements (e.g. React Spring `<animated.mesh />`) had no way of knowing which elements belonged to a renderer.

Since v8, we've added a catalog of known elements to a `ThreeElements` interface, and with v9 automatically map three API to JSX types. As types are now dynamically mapped, hardcoded exports like `MeshProps` have been removed, and can be accessed as `ThreeElements['mesh']`. Helper types like `Color` or `Vector3` remain to reflect the JSX `MathType` API for shorthand expression.

    -import { MeshProps } from '@react-three/fiber'
    -type Props = MeshProps
    
    +import { ThreeElements } from '@react-three/fiber'
    +type Props = ThreeElements['mesh']
    

[

### Node Helpers

](#node-helpers)

Specialized `Node` type helpers for extending JSX (`Node`, `Object3DNode`, `BufferGeometryNode`, `MaterialNode`, `LightNode`) are removed and combined into 'ThreeElement', which accepts a single type representing the extended element instance.

    import { type ThreeElement } from '@react-three/fiber'
    
    declare module '@react-three/fiber' {
      interface ThreeElements {
        customElement: ThreeElement<typeof CustomElement>
      }
    }
    
    extend({ CustomElement })
    

[

### ThreeElements

](#threeelements)

`ThreeElements` was added as an interface since v8.1.0 and is the current way of declaring or accessing JSX within R3F since React's depreciation of `global` JSX (see [https://react.dev/blog/2024/04/25/react-19-upgrade-guide#the-jsx-namespace-in-typescript](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#the-jsx-namespace-in-typescript)). All JSX types belonging to R3F are accessible from `ThreeElements`.

    -import { type Node } from '@react-three/fiber'
    -
    -declare global {
    -  namespace JSX {
    -    interface IntrinsicElements {
    -      customElement: Node<CustomElement, typeof CustomElement>
    -    }
    -  }
    -}
    -
    -extend({ CustomElement })
    
    +import { type ThreeElement } from '@react-three/fiber'
    +
    +declare module '@react-three/fiber' {
    +  interface ThreeElements {
    +    customElement: ThreeElement<typeof CustomElement>
    +  }
    +}
    +
    +extend({ CustomElement })
    

[

Testing
-------

](#testing)[

### StrictMode

](#strictmode)

`StrictMode` is now correctly inherited from a parent renderer like react-dom. Previously, `<StrictMode />` mounted in another root such as react-dom would not affect the R3F canvas, so it had to be redeclared within the canvas as well.

    <StrictMode>
      <Canvas>
    -    <StrictMode>
    -      // ...
    -    </StrictMode>
    +    // ...
      </Canvas>
    </StrictMode>
    

Keep in mind, this change may affect the behavior of your application. If you encounter anything that worked before and fails now, profile it first in dev and then production. If it works in prod then strict mode has flushed out a side-effect in your code.

[

### Act

](#act)

`act` is now exported from React itself and can be used for all renderers. It will return the contents of a passed async callback like before and recursively flush async effects to synchronously test React output.

    import { act } from 'react'
    import { createRoot } from '@react-three/fiber'
    
    const store = await act(async () => createRoot(canvas).render(<App />))
    console.log(store.getState())</content>
</page>

<page>
  <title>Objects, properties and constructor arguments - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/objects</url>
  <content>All the effective ways of using React Three Fiber

[

Declaring objects
-----------------

](#declaring-objects)

You can use [three.js's entire object catalogue and all properties](https://threejs.org/docs). When in doubt, always consult the docs.

❌ You could lay out an object like this:

    <mesh
      visible
      userData={{ hello: 'world' }}
      position={new THREE.Vector3(1, 2, 3)}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      geometry={new THREE.SphereGeometry(1, 16, 16)}
      material={new THREE.MeshBasicMaterial({ color: new THREE.Color('hotpink'), transparent: true })}
    />
    

✅ The problem is that all of these properties will always be re-created. Instead, you should define properties declaratively.

    <mesh visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="hotpink" transparent />
    </mesh>
    

[

Constructor arguments
---------------------

](#constructor-arguments)

In three.js objects are classes that are instantiated. These classes can receive one-time constructor arguments (`new THREE.SphereGeometry(1, 32)`), and properties (`someObject.visible = true`). In React Three Fiber, constructor arguments are always passed as an array via `args`. If args change later on, the object must naturally get reconstructed from scratch!

    <sphereGeometry args={[1, 32]} />
    

[

Shortcuts
---------

](#shortcuts)[

### Set

](#set)

All properties whose underlying object has a `.set()` method can directly receive the same arguments that `set` would otherwise take. For example [`THREE.Color.set`](https://threejs.org/docs/#api/en/math/Color.set) can take a color string, so instead of `color={new THREE.Color('hotpink')}` you can simply write `color="hotpink"`. Some `set` methods take multiple arguments, for instance [`THREE.Vector3`](https://threejs.org/docs/#api/en/math/Vector3.set), give it an array in that case `position={[100, 0, 0]}`.

    <mesh position={[1, 2, 3]} />
      <meshStandardMaterial color="hotpink" />
    

If you do link up an existing object to a property, for instance a THREE.Vector3() to a position, be aware that this will end up copying the object in most cases as it calls .copy() on the target. This only applies to objects that expose both .set() and .copy() (Vectors, Eulers, Matrix, ...). If you link up an existing material or geometry on the other hand, it will overwrite, because more these objects do not have a .set() method.

[

### SetScalar

](#setscalar)

Properties that have a `setScalar` method (for instance `Vector3`) can be set like so:

    // Translates to <mesh scale={[1, 1, 1]} />
    <mesh scale={1} />
    

[

Piercing into nested properties
-------------------------------

](#piercing-into-nested-properties)

If you want to reach into nested attributes (for instance: `mesh.rotation.x`), just use dash-case.

    <mesh rotation-x={1} material-uniforms-resolution-value={[512, 512]} />
    

[

Dealing with non-scene objects
------------------------------

](#dealing-with-non-scene-objects)

You can put non-Object3D primitives (geometries, materials, etc) into the render tree as well. They take the same properties and constructor arguments they normally would.

You might be wondering why you would want to put something in the "scene" that normally would not be part of it, in a vanilla three.js app at least. For the same reason you declare any object: it becomes managed, reactive and auto-disposes. These objects are not technically part of the scene, but they "attach" to a parent which is.

[

### Attach

](#attach)

Use `attach` to bind objects to their parent. If you unmount the attached object it will be taken off its parent automatically.

The following attaches a material to the `material` property of a mesh and a geometry to the `geometry` property:

    <mesh>
      <meshBasicMaterial attach="material" />
      <boxGeometry attach="geometry" />
    

All objects extending `THREE.Material` receive `attach="material"`, and all objects extending `THREE.BufferGeometry` receive `attach="geometry"`. You do not have to type it out!

    <mesh>
      <meshBasicMaterial />
      <boxGeometry />
    

You can also deeply nest attach through piercing. The following adds a buffer-attribute to `geometry.attributes.position` and then adds the buffer geometry to `mesh.geometry`.

    <mesh>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[v, 3]} />
    

[

#### More examples

](#more-examples)

    // Attach bar to foo.a
    <foo>
      <bar attach="a" />
    
    // Attach bar to foo.a.b and foo.a.b.c (nested object attach)
    <foo>
      <bar attach="a-b" />
      <bar attach="a-b-c" />
    
    // Attach bar to foo.a[0] and foo.a[1] (array attach is just object attach)
    <foo>
      <bar attach="a-0" />
      <bar attach="a-1" />
    
    // Attach bar to foo via explicit add/remove functions
    <foo>
      <bar attach={(parent, self) => {
        parent.add(self)
        return () => parent.remove(self)
      }} />
    
    // The same as a one liner
    <foo>
      <bar attach={(parent, self) => (parent.add(self), () => parent.remove(self))} />
    

[

#### Real-world use-cases:

](#real-world-use-cases:)

Attaching to nested objects, for instance a shadow-camera:

    - <directionalLight
    -   castShadow
    -   position={[2.5, 8, 5]}
    -   shadow-mapSize={[1024, 1024]}
    -   shadow-camera-far={50}
    -   shadow-camera-left={-10}
    -   shadow-camera-right={10}
    -   shadow-camera-top={10}
    -   shadow-camera-bottom={-10}
    - />
    + <directionalLight castShadow position={[2.5, 8, 5]} shadow-mapSize={[1024, 1024]}>
    +   <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
    + </directionalLight>
    

Arrays must have explicit order, for instance multi-materials:

    <mesh>
      {colors.map((color, index) => <meshBasicMaterial key={index} attach={`material-${index}`} color={color} />}
    </mesh>
    

[

Putting already existing objects into the scene-graph
-----------------------------------------------------

](#putting-already-existing-objects-into-the-scene-graph)

You can use the `primitive` placeholder for that. You can still give it properties or attach nodes to it. Never add the same object multiple times, this is not allowed in three.js! Primitives will not dispose of the object they carry on unmount, you are responsible for disposing of it!

    const mesh = new THREE.Mesh(geometry, material)
    
    function Component() {
      return <primitive object={mesh} position={[10, 0, 0]} />
    

Scene objects can only ever be added once in Threejs. If you attempt to add one and the same object in two places Threejs will remove the first instance automatically. This will also happen with primitive! If you want to re-use an existing object, you must clone it first.

[

Using 3rd-party objects declaratively
-------------------------------------

](#using-3rd-party-objects-declaratively)

The `extend` function extends React Three Fiber's catalogue of JSX elements. Components added this way can then be referenced in the scene-graph using camel casing similar to other primitives.

    import { extend } from '@react-three/fiber'
    import { OrbitControls, TransformControls } from 'three-stdlib'
    extend({ OrbitControls, TransformControls })
    
    // ...
    return (
      <>
        <orbitControls />
        <transformControls />
    

If you're using TypeScript, you'll also need to [extend the JSX namespace](https://r3f.docs.pmnd.rs/tutorials/typescript#extending-jsx-intrinsic-elements).

[

Disposal
--------

](#disposal)

Freeing resources is a [manual chore in `three.js`](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects), but React is aware of object-lifecycles, hence React Three Fiber will attempt to free resources for you by calling `object.dispose()`, if present, on all unmounted objects.

If you manage assets by yourself, globally or in a cache, this may _not_ be what you want. You can switch it off by placing `dispose={null}` onto meshes, materials, etc, or even on parent containers like groups, it is now valid for the entire tree.

    const globalGeometry = new THREE.BoxGeometry()
    const globalMaterial = new THREE.MeshBasicMaterial()
    
    function Mesh() {
      return (
        <group dispose={null}>
          <mesh geometry={globalGeometry} material={globalMaterial} /></content>
</page>

<page>
  <title>Hooks - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/hooks</url>
  <content>Hooks are the heart of react-three-fiber

Hooks allow you to tie or request specific information to your component. For instance, components that want to participate in the renderloop can use `useFrame`, components that need to be informed of three.js specifics can use `useThree` and so on. All hooks clean up after themselves once the component unmounts.

Hooks can only be used inside the Canvas element because they rely on context!

❌ You cannot expect something like this to work:

    import { useThree } from '@react-three/fiber'
    
    function App() {
      const { size } = useThree() // This will just crash
      return (
        <Canvas>
          <mesh>
    

✅ Do this instead:

    function Foo() {
      const { size } = useThree()
      ...
    }
    
    function App() {
      return (
        <Canvas>
          <Foo />
    

[

`useThree`
----------

](#usethree)

This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on. It also gives you the current size of the canvas in screen and viewport coordinates.

    import { useThree } from '@react-three/fiber'
    
    function Foo() {
      const state = useThree()
    

The hook is reactive, if you resize the browser for instance, you get fresh measurements, same applies to any of the state objects that may change.

[

### `state` properties

](#state-properties)

| Prop | Description | Type |
| --- | --- | --- |
| `gl` | Renderer | `THREE.WebGLRenderer` |
| `scene` | Scene | `THREE.Scene` |
| `camera` | Camera | `THREE.PerspectiveCamera` |
| `raycaster` | Default raycaster | `THREE.Raycaster` |
| `pointer` | Contains updated, normalized, centric pointer coordinates | `THREE.Vector2` |
| `mouse` | Note: this is deprecated, use `pointer` instead! Normalized event coordinates | `THREE.Vector2` |
| `clock` | Running system clock | `THREE.Clock` |
| `linear` | True when the colorspace is linear | `boolean` |
| `flat` | True when no tonemapping is used | `boolean` |
| `legacy` | Disables global color management via `THREE.ColorManagement` | `boolean` |
| `frameloop` | Render mode: always, demand, never | `always`, `demand`, `never` |
| `performance` | System regression | `{ current: number, min: number, max: number, debounce: number, regress: () => void }` |
| `size` | Canvas size in pixels | `{ width: number, height: number, top: number, left: number }` |
| `viewport` | Canvas viewport size in three.js units. Note: This is different from [`gl.getViewport`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.getViewport) which returns the drawbuffer size | `{ width: number, height: number, initialDpr: number, dpr: number, factor: number, distance: number, aspect: number, getCurrentViewport: (camera?: Camera, target?: THREE.Vector3, size?: Size) => Viewport }` |
| `xr` | XR interface, manages WebXR rendering | `{ connect: () => void, disconnect: () => void }` |
| `set` | Allows you to set any state property | `(state: SetState<RootState>) => void` |
| `get` | Allows you to retrieve any state property non-reactively | `() => GetState<RootState>` |
| `invalidate` | Request a new render, given that `frameloop === 'demand'` | `() => void` |
| `advance` | Advance one tick, given that `frameloop === 'never'` | `(timestamp: number, runGlobalEffects?: boolean) => void` |
| `setSize` | Resize the canvas | `(width: number, height: number, top?: number, left?: number) => void` |
| `setDpr` | Set the pixel-ratio | `(dpr: number) => void` |
| `setFrameloop` | Shortcut to set the current render mode | `(frameloop?: 'always', 'demand', 'never') => void` |
| `setEvents` | Shortcut to setting the event layer | `(events: Partial<EventManager<any>>) => void` |
| `onPointerMissed` | Response for pointer clicks that have missed a target | `() => void` |
| `events` | Pointer-event handling | `{ connected: TargetNode, handlers: Events, connect: (target: TargetNode) => void, disconnect: () => void }` |

[

### Selector

](#selector)

You can also select properties, this allows you to avoid needless re-render for components that are interested only in particulars. Reactivity does not include deeper three.js internals!

    // Will only trigger re-render when the default camera is exchanged
    const camera = useThree((state) => state.camera)
    // Will only re-render on resize changes
    const viewport = useThree((state) => state.viewport)
    // ❌ You cannot expect reactivity from three.js internals!
    const zoom = useThree((state) => state.camera.zoom)
    

[

### Reading state from outside of the component cycle

](#reading-state-from-outside-of-the-component-cycle)

    function Foo() {
      const get = useThree((state) => state.get)
      ...
      get() // Get fresh state from anywhere you want
    

[

### Exchanging defaults

](#exchanging-defaults)

    function Foo() {
      const set = useThree((state) => state.set)
      ...
      useEffect(() => {
        set({ camera: new THREE.OrthographicCamera(...) })
      }, [])
    

[

`useFrame`
----------

](#useframe)

This hook allows you to execute code on every rendered frame, like running effects, updating controls, and so on. You receive the state (same as `useThree`) and a clock delta. Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the render-loop.

    import { useFrame } from '@react-three/fiber'
    
    function Foo() {
      useFrame((state, delta, xrFrame) => {
        // This function runs at the native refresh rate inside of a shared render-loop
      })
    

Be careful about what you do inside useFrame! You should never setState in there! Your calculations should be slim and you should mind all the commonly known pitfalls when dealing with loops in general, like re-use of variables, etc.

[

### Taking over the render-loop

](#taking-over-the-render-loop)

If you need more control you may pass a numerical `renderPriority` value. This will cause React Three Fiber to disable automatic rendering altogether. It will now be your responsibility to render, which is useful when you're working with effect composers, heads-up displays, etc.

    function Render() {
      // Takes over the render-loop, the user has the responsibility to render
      useFrame(({ gl, scene, camera }) => {
        gl.render(scene, camera)
      }, 1)
    
    function RenderOnTop() {
      // This will execute *after* Render's useframe
      useFrame(({ gl, ... }) => {
        gl.render(...)
      }, 2)
    

Callbacks will be executed in order of ascending priority values (lowest first, highest last.), similar to the DOM's z-order.

[

### Negative indices

](#negative-indices)

Using negative indices will **not take over the render loop**, but it can be useful if you really must order the sequence of useFrames across the component tree.

    function A() {
      // This will execute first
      useFrame(() => ..., -2)
    
    function B() {
      // This useFrame will execute *after* A's
      useFrame(() => ..., -1)
    

[

`useLoader`
-----------

](#useloader)

This hook loads assets and suspends for easier fallback- and error-handling. It can take any three.js loader as its first argument: GLTFLoader, OBJLoader, TextureLoader, FontLoader, etc. It is based on [React.Suspense](https://react.dev/reference/react/Suspense), so fallback-handling and [error-handling](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) happen at the parental level.

    import { Suspense } from 'react'
    import { useLoader } from '@react-three/fiber'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    
    function Model() {
      const result = useLoader(GLTFLoader, '/model.glb')
      // You don't need to check for the presence of the result, when we're here
      // the result is guaranteed to be present since useLoader suspends the component
      return <primitive object={result.scene} />
    }
    
    function App() {
      return (
        <Suspense fallback={<FallbackComponent /> /* or null */}>
          <Model />
        </Suspense>
      )
    }
    

Assets loaded with useLoader are cached by default. The urls given serve as cache-keys. This allows you to re-use loaded data everywhere in the component tree.

Be very careful with mutating or disposing of loaded assets, especially when you plan to re-use them. Refer to the automatic disposal section in the API.

[

### Loader extensions

](#loader-extensions)

You can provide a callback as the third argument if you need to configure your loader:

    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
    
    useLoader(GLTFLoader, url, (loader) => {
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco-gltf/')
      loader.setDRACOLoader(dracoLoader)
    })
    

[

### Loading multiple assets at once

](#loading-multiple-assets-at-once)

It can also make multiple requests in parallel:

    const [bumpMap, specMap, normalMap] = useLoader(TextureLoader, [url1, url2, url2])
    

[

### Loading status

](#loading-status)

You can get the loading status from a callback you provide as the fourth argument. Though consider alternatives like THREE.DefaultLoadingManager or better yet, [Drei's](https://github.com/pmndrs/drei) loading helpers.

    useLoader(loader, url, extensions, (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    })
    

[

### Special treatment of GLTFLoaders and all loaders that return a scene prop

](#special-treatment-of-gltfloaders-and-all-loaders-that-return-a-scene-prop)

If a `result.scene` prop is found the hook will automatically create a object & material collection: `{ nodes, materials }`. This lets you build immutable scene graphs selectively. You can also specifically alter the data without having to traverse it. [GLTFJSX](https://github.com/pmndrs/gltfjsx) specifically relies on this data.

    const { nodes, materials } = useLoader(GLTFLoader, url)
    

[

### Pre-loading assets

](#pre-loading-assets)

You can pre-load assets in global space so that models can be loaded in anticipation before they're mounted in the component tree.

    useLoader.preload(GLTFLoader, '/model.glb' /* extensions */)
    

[

`useGraph`
----------

](#usegraph)

Convenience hook which creates a memoized, named object/material collection from any [`Object3D`](https://threejs.org/docs/#api/en/core/Object3D).

    import { useLoader, useGraph } from '@react-three/fiber'
    
    function Model(url) {
      const scene = useLoader(OBJLoader, url)
      const { nodes, materials } = useGraph(scene)
      return <mesh geometry={nodes.robot.geometry} material={materials.metal} />
    }</content>
</page>

<page>
  <title>Events - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/events</url>
  <content>All the events you can hook up to

`three.js` objects that implement their own `raycast` method (meshes, lines, etc) can be interacted with by declaring events on them. We support pointer events, clicks and wheel-scroll. Events contain the browser event as well as the `three.js` event data (object, point, distance, etc). You may want to [polyfill](https://github.com/jquery/PEP) them, if that's a concern.

Additionally, there's a special `onUpdate` that is called every time the object gets fresh props, which is good for things like `self => (self.verticesNeedUpdate = true)`.

Also notice the `onPointerMissed` on the canvas element, which fires on clicks that haven't hit _any_ meshes.

    <mesh
      onClick={(e) => console.log('click')}
      onContextMenu={(e) => console.log('context menu')}
      onDoubleClick={(e) => console.log('double click')}
      onWheel={(e) => console.log('wheel spins')}
      onPointerUp={(e) => console.log('up')}
      onPointerDown={(e) => console.log('down')}
      onPointerOver={(e) => console.log('over')}
      onPointerOut={(e) => console.log('out')}
      onPointerEnter={(e) => console.log('enter')} // see note 1
      onPointerLeave={(e) => console.log('leave')} // see note 1
      onPointerMove={(e) => console.log('move')}
      onPointerMissed={() => console.log('missed')}
      onUpdate={(self) => console.log('props have been updated')}
    />
    

[

### Event data

](#event-data)

    ({
      ...DomEvent                   // All the original event data
      ...Intersection                 // All of Three's intersection data - see note 2
      intersections: Intersection[]    // The first intersection of each intersected object
      object: Object3D              // The object that was actually hit
      eventObject: Object3D         // The object that registered the event
      unprojectedPoint: Vector3     // Camera-unprojected point
      ray: Ray                      // The ray that was used to strike the object
      camera: Camera                // The camera that was used in the raycaster
      sourceEvent: DomEvent         // A reference to the host event
      delta: number                 // Distance between mouse down and mouse up event in pixels
    }) => ...
    

[

### How the event-system works, bubbling and capture

](#how-the-event-system-works,-bubbling-and-capture)

*   `pointerenter` and `pointerleave` events work exactly the same as pointerover and pointerout.
*   `pointerenter` and `pointerleave` semantics are not implemented.

Some events (such as `pointerout`) happen when there is no intersection between `eventObject` and the ray. When this happens, the event will contain intersection data from a previous event with this object.

[

### Event propagation (bubbling)

](#event-propagation-\(bubbling\))

Propagation works a bit differently to the DOM because objects can occlude each other in 3D. The `intersections` array in the event includes all objects intersecting the ray, not just the nearest. Only the first intersection with each object is included. The event is first delivered to the object nearest the camera, and then bubbles up through its ancestors like in the DOM. After that, it is delivered to the next nearest object, and then its ancestors, and so on. This means objects are transparent to pointer events by default, even if the object handles the event.

`event.stopPropagation()` doesn't just stop this event from bubbling up, it also stops it from being delivered to farther objects (objects behind this one). All other objects, nearer or farther, no longer count as being hit while the pointer is over this object. If they were previously delivered pointerover events, they will immediately be delivered pointerout events. If you want an object to block pointer events from objects behind it, it needs to have an event handler as follows:

    onPointerOver={e => {
      e.stopPropagation()
      // ...
    }}
    

even if you don't want this object to respond to the pointer event. If you do want to handle the event as well as using `stopPropagation()`, remember that the pointerout events will happen **during** the `stopPropagation()` call. You probably want your other event handling to happen after this.

[

### Pointer capture

](#pointer-capture)

Because events go to all intersected objects, capturing the pointer also works differently. In the DOM, the capturing object **replaces** the hit test, but in React Three Fiber, the capturing object is **added** to the hit test result: if the capturing object was not hit, then all of the hit objects (and their ancestors) get the event first, followed by the capturing object and its ancestors. The capturing object can also use `event.stopPropagation()` so that objects that really were hit get pointerout events.

Note that you can access the `setPointerCapture` and `releasePointerCapture` methods **only** via `event.target`: they don't get added to the `Object3D` instances in the scene graph.

`setPointerCapture` and `releasePointerCapture` take a `pointerId` parameter like in the DOM, but for now they don't have support for multiple active pointers. PRs are welcome!

    onPointerDown={e => {
      // Only the mesh closest to the camera will be processed
      e.stopPropagation()
      // You may optionally capture the target
      e.target.setPointerCapture(e.pointerId)
    }}
    onPointerUp={e => {
      e.stopPropagation()
      // Optionally release capture
      e.target.releasePointerCapture(e.pointerId)
    }}
    

[

### Customizing the event settings

](#customizing-the-event-settings)

For some advanced usage it's possible to customize the setting of the event manager globally with the `events` prop on `<Canvas/>`:

    import { Canvas, events } from '@react-three/fiber'
    
    const eventManagerFactory: Parameters<typeof Canvas>[0]['events'] = (state) => ({
      // Default configuration
      ...events(state),
    
      // Determines if the event layer is active
      enabled: true,
    
      // Event layer priority, higher prioritized layers come first and may stop(-propagate) lower layer
      priority: 1,
    
      // The filter can re-order or re-structure the intersections
      filter: (items: THREE.Intersection[], state: RootState) => items,
    
      // The compute defines how pointer events are translated into the raycaster and pointer vector2
      compute: (event: DomEvent, state: RootState, previous?: RootState) => {
        state.pointer.set((event.offsetX / state.size.width) * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1)
        state.raycaster.setFromCamera(state.pointer, state.camera)
      },
    
      // Find more configuration default on ./packages/fiber/src/web/events.ts
      // And type definitions in ./packages/fiber/src/core/events.ts
    })
    
    function App() {
      return (
        <Canvas events={eventManagerFactory}>
    }
    

[

### Using a different target element

](#using-a-different-target-element)

There are cases in which you may want to connect the event handlers to another DOM element instead of the canvas. This is usually done to have events on a shared parent, which allows both the canvas, and dom overlays to receive events.

You can either use the event manager:

    const events => useThree(state => state.events)
    useEffect(() => {
      state.events.connect(domNode)
    

Or, the `eventSource` shortcut on the canvas (DOM only), which accepts dom-nodes and React.RefObjects to dom-nodes.

    function App() {
      const target = useRef()
      return (
        <div ref={target}>
          <Canvas eventSource={target.current}>
    

[

### Using a different prefix (DOM only)

](#using-a-different-prefix-\(dom-only\))

By default Fiber will use offsetX/offsetY to set up the raycaster. You can change this with the `eventPrefix` shortcut.

    function App() {
      return (
        <Canvas eventPrefix="client">
    

[

### Allow raycast without user interaction

](#allow-raycast-without-user-interaction)

By default Fiber will only raycast when the user is interacting with the canvas. If, for instance, the camera moves a hoverable object underneath the cursor it will not trigger a hover event. If this is wanted behaviour you can force a raycast by executing `update()`, call it whenever necessary.

    const events => useThree(state => state.events)
    useEffect(() => {
      // Will trigger a onPointerMove with the last-known pointer event
      state.events.update()
    

You can abstract this into more complex logic.

    function RaycastWhenCameraMoves() {
      const matrix = new THREE.Matrix4()
      useFrame((state) => {
        // Act only when the camera has moved
        if (!matrix.equals(state.camera.matrixWorld)) {
          state.events.update()
          matrix.copy(state.camera.matrixWorld)
        }
      })
    }</content>
</page>

<page>
  <title>Additional Exports - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/additional-exports</url>
  <content>| export | usage |
| --- | --- |
| `addEffect` | Adds a global render callback which is called each frame |
| `addAfterEffect` | Adds a global after-render callback which is called each frame |
| `addTail` | Adds a global callback which is called when rendering stops |
| `buildGraph` | Collects nodes and materials from a THREE.Object3D |
| `flushGlobalEffects` | Flushes global render-effects for when manually driving a loop |
| `flushSync` | Force React to flush any updates synchronously and immediately |
| `invalidate` | Forces view global invalidation |
| `advance` | Advances the frameloop (given that it's set to 'never') |
| `extend` | Extends the native-object catalogue |
| `createPortal` | Creates a portal (it's a React feature for re-parenting) |
| `createRoot` | Creates a root that can render three JSX into a canvas |
| `events` | Dom pointer-event system |
| `applyProps` | `applyProps(element, props)` sets element properties, |
| `act` | usage with react-testing |
| `useInstanceHandle` | Exposes react-internal local state from `instance.__r3f` |
|  |  |</content>
</page>

<page>
  <title>TypeScript - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/typescript</url>
  <content>Common scenarios and how to approach them with TypeScript

[

Typing with `useRef`
--------------------

](#typing-with-useref)

React's `useRef` won't automatically infer types despite pointing it to a typed ref.

You can type the ref yourself by passing a type through `useRef`'s generics:

    import { useRef, useEffect } from 'react'
    import { Mesh } from 'three'
    
    function Box(props) {
      const meshRef = useRef<Mesh>(null!)
    
      useEffect(() => {
        console.log(Boolean(meshRef.current))
      }, [])
    
      return (
        <mesh {...props} ref={meshRef}>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      )
    }
    

The exclamation mark is a non-null assertion that will let TS know that `ref.current` is defined when we access it in effects, useFrame et al. You do not need to check against null, the element is assumed to exist.

[

Accessing typed three-elements
------------------------------

](#accessing-typed-three-elements)

Whenever you want to spread props or type components that rely on three elements, you can use the `ThreeElements` interface to extract the mesh, group, or any other three element, including custom elements.

    import { ThreeElements } from '@react-three/fiber'
    
    type FooProps = ThreeElements['mesh'] & { bar: boolean }
    
    function Foo({ bar, ...props}: FooProps) {
      useEffect(() => {
        console.log(bar)
      }, [bar])
      return <mesh {...props} />
    }
    

[

Extend usage
------------

](#extend-usage)

react-three-fiber can also accept third-party elements and extend them into its internal catalogue.

    import { useRef, useEffect } from 'react'
    import { GridHelper } from 'three'
    import { extend } from '@react-three/fiber'
    
    // Create our custom element
    class CustomElement extends GridHelper {}
    
    // Extend so the reconciler will learn about it
    extend({ CustomElement })
    
    <customElement />
    

The catalogue teaches the underlying reconciler how to create fibers for these elements and treat them within the scene.

You can then declaratively create custom elements with primitives, but TypeScript won't know about them nor their props.

    // error: 'customElement' does not exist on type 'JSX.IntrinsicElements'
    
    <customElement />
    

[

### Extending ThreeElements

](#extending-threeelements)

To define our element in JSX, we'll use the `ThreeElement` interface to extend `ThreeElements`. This interface describes three.js classes that are available in the R3F catalog and can be used as native elements.

    import { useRef, useEffect } from 'react'
    import { GridHelper } from 'three'
    import { extend, ThreeElement } from '@react-three/fiber'
    
    // Create our custom element
    class CustomElement extends GridHelper {}
    
    // Extend so the reconciler will learn about it
    extend({ CustomElement })
    
    // Add types to ThreeElements elements so primitives pick up on it
    declare module '@react-three/fiber' {
      interface ThreeElements {
        customElement: ThreeElement<typeof CustomElement>
      }
    }
    
    // react-three-fiber will create your custom component and TypeScript will understand it
    <customComponent />
    

You can shorten element definition by using the `extend` factory signature, which will automatically extend the element locally. This will also prevent namespace bleeding.

    // Create our custom element
    class CustomElement extends GridHelper {}
    
    // Extend so the reconciler will learn about it, types will be inferred
    const Element = extend(CustomElement)
    
    // react-three-fiber will create your custom component and TypeScript will understand it
    <Element />
    

[

Extending three default elements
--------------------------------

](#extending-three-default-elements)

If you open your own root instead of using `<Canvas>`, you can extend the default elements with `extend`. But keep in mind that the `* as THREE` namespace contains classes, functions, numbers, strings. At the moment we suggest you use `any` or `@ts-ignore` unless you extract the exact classes you need (`extend({ Mesh, Group, ... })`).

    import * as THREE from 'three'
    import { extend, createRoot, events } from '@react-three/fiber'
    
    // Register the THREE namespace as native JSX elements.
    extend(THREE as any)
    
    // Create a react root
    const root = createRoot(document.querySelector('canvas'))
    

[

Exported types
--------------

](#exported-types)

react-three-fiber is extensible and exports types for its internals, such as render props, canvas props, and events:

    // Event raycaster intersection
    Intersection
    
    // `useFrame` internal subscription and render callback
    Subscription
    RenderCallback
    
    // `useThree`'s returned internal state
    RootState
    Performance
    Dpr
    Size
    Viewport
    Camera
    
    // Canvas props
    CanvasProps
    
    // Supported events
    Events
    
    // Event manager signature (is completely modular)
    EventManager
    
    // Wraps a platform event as it's passed through the event manager
    ThreeEvent</content>
</page>

<page>
  <title>Testing - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/api/testing</url>
  <content>How to handle unit tests

Like with every other application testing is an important factor when it comes to releasing an application into the wild and when it comes to React Three Fiber we can use React Three Test Renderer to achieve this.

We will be testing the [sandbox](https://codesandbox.io/s/98ppy) we created in [events and interactions](https://r3f.docs.pmnd.rs/api/events-and-interaction).

[

How to test React Three Fiber
-----------------------------

](#how-to-test-react-three-fiber)

Let's start by installing the React Three Test Renderer:

    npm install @react-three/test-renderer --save-dev
    

Afterwards, if you are using Create React App you can just add a file that ends in `.test.js` and start writing your code, because React Three Test Renderer is testing library agnostic, so it works with libraries such as `jest`, `jasmine` etc.

Let's create an `App.test.js` and set up all our test cases:

    import ReactThreeTestRenderer from '@react-three/test-renderer'
    import { MyRotatingBox } from './App'
    
    test('mesh to have two children', async () => {
      const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
    })
    
    test('click event makes box bigger', async () => {
      const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
    })
    

In here we created three tests and in each we made sure we created the renderer by using the `create` function.

Let's start with the first test and make sure our mesh has two children, the material and cube.

We can start by getting the scene and it's children from the test instance we just created like so:

    const meshChildren = renderer.scene.children
    

If you log this mesh out you can see that it returns an array of one element since that's all we have in the scene.

Using this we can make sure to get that first child and use the `allChildren` property on it like so:

    const meshChildren = renderer.scene.children[0].allChildren
    

There is also one property called `children` but this one is meant to be used for things like groups as this one does not return the geometry and the materials, for that we need `allChildren`.

Now to create our assertion:

    expect(meshChildren.length).toBe(2)
    

Our first test case looks like this:

    test('mesh to have two children', async () => {
      const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
      const mesh = renderer.scene.children[0].allChildren
      expect(mesh.length).toBe(2)
    })
    

[

Testing interactions
--------------------

](#testing-interactions)

Now that we have gotten the first test out of the way we can test our interaction and make sure that when we click on the mesh it does indeed update the scale.

We can do that by utilizing the `fireEvent` method existing in a test instance.

We know we can get the mesh with:

    const mesh = renderer.scene.children[0]
    

Since we already have that we can fire an event in it like so:

    await renderer.fireEvent(mesh, 'click')
    

With that done, all that's left to do is the tree demonstration of our scene and make sure the scale prop on our mesh has updated:

    expect(mesh.props.scale).toBe(1.5)
    

In the end our test looks something like this:

    test('click event makes box bigger', async () => {
      const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
      const mesh = renderer.scene.children[0]
      expect(mesh.props.scale).toBe(1)
      await renderer.fireEvent(mesh, 'click')
      expect(mesh.props.scale).toBe(1.5)
    })
    

If you want to learn more about React Three Test Renderer you can checkout the repo and their docs:

*   [Repo](https://github.com/pmndrs/react-three-fiber/blob/master/packages/test-renderer)
*   [React Three Test Renderer API](https://github.com/pmndrs/react-three-fiber/blob/master/packages/test-renderer/markdown/rttr.md#create)
*   [React Three Test Instance API](https://github.com/pmndrs/react-three-fiber/blob/master/packages/test-renderer/markdown/rttr-instance.md)

[

Exercises
---------

](#exercises)

*   Check the color of the Box we created
*   Check the rotation using the `advanceFrames` method.

[](https://codesandbox.io/s/hqut4)

###### testing</content>
</page>

<page>
  <title>Performance pitfalls - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/advanced/pitfalls#use-starttransition-for-expensive-ops</url>
  <content>Performance 1x1

[

Tips and Tricks
---------------

](#tips-and-tricks)

This is a good overview: [https://discoverthreejs.com/tips-and-tricks](https://discoverthreejs.com/tips-and-tricks)

The most important gotcha in three.js is that creating objects can be expensive, think twice before you mount/unmount things! Every material or light that you put into the scene has to compile, every geometry you create will be processed. Share materials and geometries if you can, either in global scope or locally:

    const geom = useMemo(() => new BoxGeometry(), [])
    const mat = useMemo(() => new MeshBasicMaterial(), [])
    return items.map(i => <mesh geometry={geom} material={mat} ...
    

Try to use [instancing](https://codesandbox.io/s/r3f-instanced-colors-8fo01) as much as you can when you need to display many objects of a similar type!

[

Avoid setState in loops
-----------------------

](#avoid-setstate-in-loops)

TLDR, don't, mutate inside `useFrame`!

*   Threejs has a render-loop, it does not work like the DOM does. **Fast updates are carried out in `useFrame` by mutation**. `useFrame` is your per-component render-loop.
    
*   It is not enough to set values in succession, _you need frame deltas_. Instead of `position.x += 0.1` consider `position.x += delta` or your project will run at different speeds depending on the end-users system. Many updates in threejs need to be paired with update flags (`.needsUpdate = true`), or imperative functions (`.updateProjectionMatrix()`).
    
*   You might be tempted to setState inside `useFrame` but there is no reason to. You would only complicate something as simple as an update by routing it through React's scheduler, triggering component render etc.
    

[

### ❌ `setState` in loops is bad

](#❌-setstate-in-loops-is-bad)

    useEffect(() => {
      const interval = setInterval(() => setX((x) => x + 0.1), 1)
      return () => clearInterval(interval)
    }, [])
    

[

### ❌ `setState` in useFrame is bad

](#❌-setstate-in-useframe-is-bad)

    const [x, setX] = useState(0)
    useFrame(() => setX((x) => x + 0.1))
    return <mesh position-x={x} />
    

[

### ❌ `setState` in fast events is bad

](#❌-setstate-in-fast-events-is-bad)

    <mesh onPointerMove={(e) => setX((x) => e.point.x)} />
    

[

### ✅ Instead, just mutate, use deltas

](#✅-instead,-just-mutate,-use-deltas)

In general you should prefer useFrame. Consider mutating props safe as long as the component is the only entity that mutates. Use deltas instead of fixed values so that your app is refresh-rate independent and runs at the same speed everywhere!

    const meshRef = useRef()
    useFrame((state, delta) => (meshRef.current.position.x += delta))
    return <mesh ref={meshRef} />
    

Same goes for events, use references.

    <mesh onPointerMove={(e) => (ref.current.position.x = e.point.x)} />
    

If you must use intervals, use references as well, but keep in mind that this is not refresh-rate independent.

    useEffect(() => {
      const interval = setInterval(() => ref.current.position.x += 0.1, 1)
      return () => clearInterval(interval)
    }, [])
    

[

Handle animations in loops
--------------------------

](#handle-animations-in-loops)

The frame loop is where you should place your animations. For instance using lerp, or damp.

[

### ✅ Use `lerp` + `useFrame`

](#✅-use-lerp-+-useframe)

    function Signal({ active }) {
      const meshRef = useRef()
      useFrame((state, delta) => {
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, active ? 100 : 0, 0.1)
      })
      return <mesh ref={meshRef} />
    

[

### ✅ Or react-spring

](#✅-or-react-spring)

Or, use animation libraries. React-spring has its own frame-loop and animates outside of React. Framer-motion is another popular alternative.

    import { a, useSpring } from '@react-spring/three'
    
    function Signal({ active }) {
      const { x } = useSpring({ x: active ? 100 : 0 })
      return <a.mesh position-x={x} />
    

[

Do not bind to fast state reactively
------------------------------------

](#do-not-bind-to-fast-state-reactively)

Using state-managers and selective state is fine, but not for updates that happen rapidly for the same reason as above.

[

### ❌ Don't bind reactive fast-state

](#❌-don't-bind-reactive-fast-state)

    import { useSelector } from 'react-redux'
    
    // Assuming that x gets animated inside the store 60fps
    const x = useSelector((state) => state.x)
    return <mesh position-x={x} />
    

[

### ✅ Fetch state directly

](#✅-fetch-state-directly)

For instance using [Zustand](https://github.com/pmndrs/zustand) (same in Redux et al).

    useFrame(() => (ref.current.position.x = api.getState().x))
    return <mesh ref={ref} />
    

[

Don't mount indiscriminately
----------------------------

](#don't-mount-indiscriminately)

In threejs it is very common to not re-mount at all, see the ["disposing of things"](https://discoverthreejs.com/tips-and-tricks/) section in discover-three. This is because buffers and materials get re-initialized/compiled, which can be expensive.

[

### ❌ Avoid mounting runtime

](#❌-avoid-mounting-runtime)

    {
      stage === 1 && <Stage1 />
    }
    {
      stage === 2 && <Stage2 />
    }
    {
      stage === 3 && <Stage3 />
    }
    

[

### ✅ Consider using visibility instead

](#✅-consider-using-visibility-instead)

    <Stage1 visible={stage === 1} />
    <Stage2 visible={stage === 2} />
    <Stage3 visible={stage === 3} />
    
    function Stage1(props) {
      return (
        <group {...props}>
          ...
    

[

### ✅ Use `startTransition` for expensive ops

](#✅-use-starttransition-for-expensive-ops)

React 18 introduces the `startTransition` and `useTransition` APIs to defer and schedule work and state updates. Use these to de-prioritize expensive operations.

Since version 8 of Fiber canvases use concurrent mode by default, which means React will schedule and defer expensive operations. You don't need to do anything, but you can play around with the [experimental scheduler](https://github.com/drcmda/scheduler-test) and see if marking ops with a lesser priority makes a difference.

    import { useTransition } from 'react'
    import { Points } from '@react-three/drei'
    
    const [isPending, startTransition] = useTransition()
    const [radius, setRadius] = useState(1)
    const positions = calculatePositions(radius)
    const colors = calculateColors(radius)
    const sizes = calculateSizes(radius)
    
    <Points
      positions={positions}
      colors={colors}
      sizes={sizes}
      onPointerOut={() => {
        startTransition(() => {
          setRadius(prev => prev + 1)
        })
      }}
    >
      <meshBasicMaterial vertexColors />
    </Points>
    

[

Don't re-create objects in loops
--------------------------------

](#don't-re-create-objects-in-loops)

Try to avoid creating too much effort for the garbage collector, re-pool objects when you can!

[

### ❌ Bad news for the GC

](#❌-bad-news-for-the-gc)

This creates a new vector 60 times a second, which allocates memory and forces the GC to eventually kick in.

    useFrame(() => {
      ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
    })
    

[

### ✅ Better re-use object

](#✅-better-re-use-object)

Set up re-used objects in global or local space, now the GC will be silent.

    function Foo(props)
      const vec = new THREE.Vector()
      useFrame(() => {
        ref.current.position.lerp(vec.set(x, y, z), 0.1)
      })
    

[

`useLoader` instead of plain loaders
------------------------------------

](#useloader-instead-of-plain-loaders)

Threejs loaders give you the ability to load async assets (models, textures, etc), but if you do not re-use assets it can quickly become problematic.

[

### ❌ No re-use is bad for perf

](#❌-no-re-use-is-bad-for-perf)

This re-fetches, re-parses for every component instance.

    function Component() {
      const [texture, set] = useState()
      useEffect(() => void new TextureLoader().load(url, set), [])
      return texture ? (
        <mesh>
          <sphereGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>
      ) : null
    }
    

Instead use useLoader, which caches assets and makes them available throughout the scene.

[

### ✅ Cache and re-use objects

](#✅-cache-and-re-use-objects)

    function Component() {
      const texture = useLoader(TextureLoader, url)
      return (
        <mesh>
          <sphereGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>
      )
    }
    

Regarding GLTF's try to use [GLTFJSX](https://github.com/pmndrs/gltfjsx) as much as you can, this will create immutable JSX graphs which allow you to even re-use full models.</content>
</page>

<page>
  <title>Events and Interaction - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/events-and-interaction</url>
  <content>Let's make our meshes react to user input.

This tutorial will assume some React knowledge, and will be based on [this starter codesandbox](https://codesandbox.io/s/getting-started-01-12q81?from-embed), so just fork it and follow along!

After we have our continuous loop running the next step would be to allow our mesh to react to user interaction, so in this part let's attach a click handler to the cube and make it bigger on click.

[

User Interaction
----------------

](#user-interaction)

Any Object3D that has a raycast method can receive a large number of events, for instance a mesh:

    <mesh
      onClick={(e) => console.log('click')}
      onContextMenu={(e) => console.log('context menu')}
      onDoubleClick={(e) => console.log('double click')}
      onWheel={(e) => console.log('wheel spins')}
      onPointerUp={(e) => console.log('up')}
      onPointerDown={(e) => console.log('down')}
      onPointerOver={(e) => console.log('over')}
      onPointerOut={(e) => console.log('out')}
      onPointerEnter={(e) => console.log('enter')}
      onPointerLeave={(e) => console.log('leave')}
      onPointerMove={(e) => console.log('move')}
      onPointerMissed={() => console.log('missed')}
      onUpdate={(self) => console.log('props have been updated')}
    />
    

From this we can see that what we need to do is use the old `onClick` event we use on any DOM element to react to a user clicking the mesh.

Let's add it then:

    <mesh onClick={() => alert('Hellooo')}>
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
    

We did it! We created the most boring interaction in the story of 3D and we made an alert show up. Now let's make it actually animate our mesh.

Let's start by setting some state to check if the mesh is active:

    const [active, setActive] = useState(false)
    

After we have this we can set the scale with a ternary operator like so:

    <mesh scale={active ? 1.5 : 1} onClick={() => setActive(!active)}>
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
    

If you try to click on your mesh now, it scales up and down. We just made our first interactive 3D mesh!

What we did in this chapter was:

*   Attached a click handler to our mesh
*   Added some state to track if the mesh is currently active
*   Changed the scale based on that state

[](https://codesandbox.io/s/98ppy)

###### interaction

**Exercises**

*   Change other props of the mesh like the `position` or even the `color` of the material.
*   Use `onPointerOver` and `onPointerOut` to change the props of the mesh on hover events.

[

Next steps
----------

](#next-steps)

We just made our mesh react to user interaction but it looks pretty bland without any transition, right? In the next chapter let's integrate `react-spring` into our project to make this into an actual animation.</content>
</page>

<page>
  <title>Loading Models - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/loading-models</url>
  <content>3D Software to the web!

> All the models in this page were created by Sara Vieira and are freely available to download from any of the sandboxes.

There are many types of 3D model extensions, in this page we will focus on loading the three most common ones: `GLTF`, `FBX` and `OBJ`. All of these will use the `useLoader` function but in slightly different ways.

This whole section will assume you have placed your models in the public folder or in a place in your application where you can import them easily.

[

Loading GLTF models
-------------------

](#loading-gltf-models)

Starting with the open standard and the one that has more support in React Three Fiber we will load a `.gltf` model.

Let's start by importing the two things we need:

    import { useLoader } from '@react-three/fiber'
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    

With this we can create a Model component and place it in our scene like so:

    function Scene() {
      const gltf = useLoader(GLTFLoader, '/Poimandres.gltf')
      return <primitive object={gltf.scene} />
    }
    

You can play with the sandbox and see how it looks here after I added an HDRI background:

[](https://codesandbox.io/s/6etx1)

###### GLTFLoader

[

### Loading GLTF models as JSX Components

](#loading-gltf-models-as-jsx-components)

Here comes the really fancy part, you can transform these models into React components and then use them as you would any React component.

To do this, grab your `GLTF` model and head over to [https://gltf.pmnd.rs/](https://gltf.pmnd.rs/) and drop your `GLTF`, after that you should see something like:

Let's now copy the code and move it over to `Model.js`:

    /*
    Auto-generated by: https://github.com/pmndrs/gltfjsx
    */
    
    import React, { useRef } from 'react'
    import { useGLTF } from '@react-three/drei'
    
    export default function Model(props) {
      const groupRef = useRef()
      const { nodes, materials } = useGLTF('/Poimandres.gltf')
      return (
        <group ref={groupRef} {...props} dispose={null}>
          <mesh castShadow receiveShadow geometry={nodes.Curve007_1.geometry} material={materials['Material.001']} />
          <mesh castShadow receiveShadow geometry={nodes.Curve007_2.geometry} material={materials['Material.002']} />
        </group>
      )
    }
    
    useGLTF.preload('/Poimandres.gltf')
    

Now we can import our model like we would import any React component and use it in our app:

    import { Suspense } from 'react'
    import { Canvas } from '@react-three/fiber'
    import { Environment } from '@react-three/drei'
    
    import Model from './Model'
    
    export default function App() {
      return (
        <div className="App">
          <Canvas>
            <Suspense fallback={null}>
              <Model />
              <Environment preset="sunset" background />
            </Suspense>
          </Canvas>
        </div>
      )
    }
    

You can play with the sandbox here:

[](https://codesandbox.io/s/vbnbf)

###### gltfjsx

[

Loading OBJ models
------------------

](#loading-obj-models)

In this case, we will use the trusted `useLoader` hook but in combination with `three.js` `OBJLoader`.

    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
    import { useLoader } from '@react-three/fiber'
    

With these imported let's get the mesh into our scene:

    function Scene() {
      const obj = useLoader(OBJLoader, '/Poimandres.obj')
      return <primitive object={obj} />
    }
    

And here we go, we have an OBJ model showing on the web! Pretty cool ah?

You can play with the sandbox here:

[](https://codesandbox.io/s/51zks)

###### OBJLoader

[

Loading FBX models
------------------

](#loading-fbx-models)

Let's again use the trusted `useLoader` but this time with the `FBXLoader` that comes from `three.js`

    import { useLoader } from '@react-three/fiber'
    import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
    

To create our scene we can get the FBX as a return value of the useLoader by passing the `FBXloader` and the location of our file like so:

    function Scene() {
      const fbx = useLoader(FBXLoader, '/Poimandres.fbx')
      return <primitive object={fbx} />
    }
    

You can play with the sandbox here:

[](https://codesandbox.io/s/ssrfg)

###### FBXLoader

[

### Loading FBX models using `useFBX`

](#loading-fbx-models-using-usefbx)

[@react-three/drei](https://github.com/pmndrs/drei) exports a very useful helper when it comes to loading FBX models and it's called `useFBX`, in this case there is no need to import anything from `three.js` as it is all done behind the scenes and we can just pass the location of the file to `useFBX` like so:

    function Scene() {
      const fbx = useFBX('/Poimandres.fbx')
      return <primitive object={fbx} />
    }
    

You can play with the sandbox here:

[](https://codesandbox.io/s/m6p73)

###### useFBX

[

Showing a loader
----------------

](#showing-a-loader)

If your model is big and takes a while to load, it's always good to show a small loader of how much is already is loaded and again [@react-three/drei](https://github.com/pmndrs/drei) is here to help with `Html` and `useProgress`.

*   `Html` allows you place plain ol' HTML in your canvas and render it like you would a normal DOM element.
*   `useProgress` is a hook that gives you a bunch of information about the loading status of your model.

With these two things, we can create a very bare-bones loading component like so:

    import { Html, useProgress } from '@react-three/drei'
    
    function Loader() {
      const { progress } = useProgress()
      return <Html center>{progress} % loaded</Html>
    }
    

We can then wrap our model in it using `Suspense` like so:

    export default function App() {
      return (
        <Canvas>
          <Suspense fallback={<Loader />}>
            <Model />
          </Suspense>
        </Canvas>
      )
    }
    

The hook returns much more than just the progress so there is a lot you can do there to give the user more information about the loading status of the application. You can play with all of them in this sandbox:

[](https://codesandbox.io/s/nn2m7)

###### GLTFLoader - Loading</content>
</page>

<page>
  <title>Loading Textures - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/loading-textures</url>
  <content>Let's load some fancy textures.

> All textures used in this chapter were downloaded from [cc0textures](https://cc0textures.com/).

[

Using `TextureLoader` and `useLoader`
-------------------------------------

](#using-textureloader-and-useloader)

To load the textures we will use the `TextureLoader` from three.js in combination with `useLoader` that will allow us to pass the location of the texture and get the map back.

It's better to explain with code, let's say you downloaded [this texture](https://cc0textures.com/view?id=PavingStones092) and placed it in the public folder of your site, to get the color map from it you could do:

    const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
    

Let's then with this information create a small scene where we can use this texture:

    import { Suspense } from 'react'
    import { Canvas, useLoader } from '@react-three/fiber'
    import { TextureLoader } from 'three'
    
    function Scene() {
      const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
      return (
        <>
          <ambientLight intensity={0.2} />
          <directionalLight />
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial />
          </mesh>
        </>
      )
    }
    
    export default function App() {
      return (
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      )
    }
    

If everything went according to plan, you should now be able to apply this texture to the sphere like so:

    <meshStandardMaterial map={colorMap} />
    

Awesome! That works but we have a lot more textures to import and do we have to create a different useLoader for each of them?

That's the great part! You don't, the second argument is an array where you can pass all the textures you have and the maps will be returned and ready to use:

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      'PavingStones092_1K_Color.jpg',
      'PavingStones092_1K_Displacement.jpg',
      'PavingStones092_1K_Normal.jpg',
      'PavingStones092_1K_Roughness.jpg',
      'PavingStones092_1K_AmbientOcclusion.jpg',
    ])
    

Now we can place them in our mesh like so:

    <meshStandardMaterial
      map={colorMap}
      displacementMap={displacementMap}
      normalMap={normalMap}
      roughnessMap={roughnessMap}
      aoMap={aoMap}
    />
    

The displacement will probably be too much, usually setting it to 0.2 will make it look good. Our final code would look something like:

    function Scene() {
      const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        'PavingStones092_1K_Color.jpg',
        'PavingStones092_1K_Displacement.jpg',
        'PavingStones092_1K_Normal.jpg',
        'PavingStones092_1K_Roughness.jpg',
        'PavingStones092_1K_AmbientOcclusion.jpg',
      ])
      return (
        <mesh>
          {/* Width and height segments for displacementMap */}
          <sphereGeometry args={[1, 100, 100]} />
          <meshStandardMaterial
            displacementScale={0.2}
            map={colorMap}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
          />
        </mesh>
      )
    }
    

[

Using `useTexture`
------------------

](#using-usetexture)

Another way to import these is using `useTexture` from [`@react-three/drei`](https://github.com/pmndrs/drei), that will make it slightly easier and there is no need to import the `TextureLoader`, our code would look like:

    import { useTexture } from "@react-three/drei"
    
    ...
    
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
      'PavingStones092_1K_Color.jpg',
      'PavingStones092_1K_Displacement.jpg',
      'PavingStones092_1K_Normal.jpg',
      'PavingStones092_1K_Roughness.jpg',
      'PavingStones092_1K_AmbientOcclusion.jpg',
    ])
    

You can also use object-notation which is the most convenient:

    const props = useTexture({
      map: 'PavingStones092_1K_Color.jpg',
      displacementMap: 'PavingStones092_1K_Displacement.jpg',
      normalMap: 'PavingStones092_1K_Normal.jpg',
      roughnessMap: 'PavingStones092_1K_Roughness.jpg',
      aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
    })
    
    return (
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial {...props} />
      </mesh>
    )
    

You can play with the sandbox and see how it looks:

[](https://codesandbox.io/s/rusfd)

###### TextureLoader</content>
</page>

<page>
  <title>Basic Animations - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/basic-animations</url>
  <content>This guide will help you understand refs, useFrame and how to make basic animations with Fiber

This tutorial will assume some React knowledge, and will be based on [this starter codesandbox](https://codesandbox.io/s/getting-started-01-12q81?from-embed), so just fork it and follow along!

We will build a really small, continuous animation loop, that will be the basic building block of more advanced animations later on.

[

`useFrame`
----------

](#useframe)

`useFrame` is a Fiber hook that lets you execute code on every frame of Fiber's render loop. This can have a lot of uses, but we will focus on building an animation with it.

It's important to remember that **Fiber hooks can only be called inside a `<Canvas />` parent**!

    import { useFrame } from '@react-three/fiber'
    
    function MyAnimatedBox() {
      useFrame(() => {
        console.log("Hey, I'm executing every frame!")
      })
      return (
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="royalblue" />
        </mesh>
      )
    }
    

This loop is the basic building block of our animation, the callback we pass to `useFrame` will be executed every frame and it will be passed an object containing the state of our Fiber scene:

For example, we can extract time information from the `clock` parameter, to know how much time has elapsed in our application, and use that time to animate a value:

    useFrame(({ clock }) => {
      const a = clock.elapsedTime
      console.log(a) // the value will be 0 at scene initialization and grow each frame
    })
    

`clock` is a [three.js Clock](https://threejs.org/docs/#api/en/core/Clock) object, from which we are getting the total elapsed time, which will be key for our animations.

[

Animating with Refs
-------------------

](#animating-with-refs)

It would be tempting to just update the state of our component via `setState` and let it change the `mesh` via props, but going through state isn't ideal, when dealing with continuous updates, commonly know as transient updates. Instead, we want to **directly mutate our mesh each frame**. First, we'll have to get a `reference` to it, via the `useRef` React hook:

    import React from 'react'
    
    function MyAnimatedBox() {
      const myMesh = React.useRef()
      return (
        <mesh ref={myMesh}>
          <boxGeometry />
          <meshBasicMaterial color="royalblue" />
        </mesh>
      )
    }
    

`myMesh` will now hold a reference to the actual three.js object, which we can now freely mutate in `useFrame`, without having to worry about React:

    useFrame(({ clock }) => {
      myMesh.current.rotation.x = clock.elapsedTime
    })
    

Let's have a closer look:

*   We are destructuring `clock` from the argument passed to `useFrame`, which we know is the state of our Fiber scene.
*   We are accessing the `rotation.x` property of `myMesh.current` object, which is a reference to our mesh object
*   We are assigning our time-dependent value `a` to the `rotation` on the `x` axis, meaning our object will now infinitely rotate between -1 and 1 radians around the x axis!

[](https://codesandbox.io/s/29gxw)

###### getting-started-01 (forked)

**Exercises**

*   Try `Math.sin(clock.elapsedTime)` and see how your animation changes

[

Next steps
----------

](#next-steps)

Now that you understand the basic technique for animating in Fiber, [learn how event works](https://r3f.docs.pmnd.rs/tutorials/events-and-interaction)!

If you want to go deeper into animations, check these out:

*   [Animating with React Spring](https://r3f.docs.pmnd.rs/tutorials/using-with-react-spring)</content>
</page>

<page>
  <title>How does it work? - React Three Fiber</title>
  <url>https://r3f.docs.pmnd.rs/tutorials/how-it-works</url>
  <content>This is an advanced guide on the inner workings of Fiber, if you are just getting started, take a look at our introduction!

React Three Fiber is a React [renderer](https://reactjs.org/docs/codebase-overview.html#renderers) for **three.js**.

This means that each Fiber component will effectively create a new THREE object that will be added to a `scene`. Understanding how this works is not necessarily needed to use Fiber, but it will better arm you to deal with anything that you might need in your projects, reading other people's Fiber code and even help you contribute.

Let's take a small React example:

    import { Canvas } from '@react-three/fiber'
    
    function MyApp() {
      return (
        <Canvas>
          <group>
            <mesh>
              <meshNormalMaterial />
              <boxGeometry args={[2, 2, 2]} />
            </mesh>
          </group>
        </Canvas>
      )
    }
    

In three.js, this is equivalent to:

    import * as THREE from 'three'
    
    const scene = new THREE.Scene() // <Canvas>
    
    const group = new THREE.Group() // <group>
    
    const mesh = new THREE.Mesh() // <mesh />
    const material = new THREE.MeshNormalMaterial() // <meshNormalMaterial />
    const geometry = new THREE.BoxGeometry(2, 2, 2) // <boxGeometry />
    
    mesh.material = material
    mesh.geometry = geometry
    
    group.add(mesh)
    scene.add(group)
    

Our `Canvas` element will create a new scene, and Fiber will instantiate new objects for each component and correctly compose them together in a scene graph!

Additionally, Fiber will:

*   Setup a new perspective camera at \[0, 0, 0\] and set it as default
*   Setup a **render loop** with automatic render to screen
*   Setup pointer events via raycasting on all meshes with `onPointer` props
*   Setup tone mapping
*   Automatically handle window resize

**Let's break this down!**

[

Creating THREE objects
----------------------

](#creating-three-objects)

In three.js, we can create new object using the classic JS API:

    const myBox = new THREE.BoxGeometry(1, 2, 3)
    

Object creation is handled transparently by the Fiber renderer, the name of the constructor `BoxGeometry` is equivalent to the camel case component `<boxGeometry />`, while the constructor arguments - in our example `[1, 2, 3]` - are passed via the `args` prop:

    <boxGeometry args={[1, 2, 3]} />
    

Note that the object will be created only when first adding the component to the React tree!

[

The `attach` props
------------------

](#the-attach-props)

Fiber always tries to correctly infer the relationship between components and their parents, for example:

    <group>
      <mesh />
    </group>
    

Here, we always know that a group can only have children, so Fiber just calls the `add` method on the group:

For meshes and other three.js objects, rules can be different. Looking at the three.js documentation, we can see how a `THREE.Mesh` object is constructed using a `material` and a `geometry`.

With the `attach` prop, we can precisely tell the renderer what property to attach each component to:

    <mesh>
      <meshNormalMaterial attach="material" />
      <boxGeometry attach="geometry" />
    </mesh>
    

This will _explicitly_ tell Fiber to render like this:

    mesh.material = new THREE.MeshNormalMaterial()
    mesh.geometry = new THREE.BoxGeometry()
    

As you can see, the `attach` prop is telling Fiber to set the parent's `material` property to a reference to our `<meshNormalMaterial />` object.

Note that while we used geometry and material for this example, Fiber also infers the attach property from the constructor name, so anything with `material` or `geometry` will automatically get attached to the correct property of its parent.

[

Props
-----

](#props)

With Fiber, you can pass any three.js property as a React property, and it will be assigned to the constructed object:

    <meshBasicMaterial color="red" />
    

is equivalent to:

    const material = new THREE.MeshBasicMaterial()
    material.color = 'red'
    

Fiber will check the type of the property value and either:

*   assign the new value directly
*   if the value is an object with a `set` method, call that
*   construct a new object if needed.
*   convert between formats

    <mesh scale={[1, 2, 3]} />
    

is equivalent to:

    const mesh = new THREE.Mesh()
    mesh.scale = new THREE.Vector3(1, 2, 3)
    
    // on update, it will instead `set()` the vector
    mesh.scale.set(3, 4, 5)
    

[

Pointer Events
--------------

](#pointer-events)

[Pointer Events](https://r3f.docs.pmnd.rs/api/events) are transparently handled by Fiber. On startup, it will create a [raycaster](https://threejs.org/docs/#api/en/core/Raycaster) for mouse picking.

Every object with `onPointer` props will be added to the array of objects checked every frame by the raycaster:

    <mesh onPointerDown={console.log}>...</mesh>
    

The ray's `origin` and `direction` are updated every time the mouse moves on the `<Canvas />` element or the window is resized. Fiber also handles camera switching, meaning that the raycaster will always use the currently active camera.

When using the `raycast` prop, the object will instead be picked using a custom ray:

    import { useCamera } from '@react-three/drei'
    
    return <mesh raycast={useCamera(anotherCamera)} />
    

[

Render Loop
-----------

](#render-loop)

By default, Fiber will setup a render loop that renders the default `scene` from the default `camera` to a [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer).

The loop is setup using [setAnimationLoop](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setAnimationLoop), which will execute its callback every time a new frame is renderable. This is what will happen every render:

1.  All global before effects are executed
2.  Clock delta is saved - implying all `useFrame` calls will share the same `delta`
3.  `useFrame` callbacks are executed in order
4.  `renderer.render(scene, camera)` is called, effectively rendering the scene to screen
5.  All global after effects are executed</content>
</page>