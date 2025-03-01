<page>
  <title>Introduction - Drei</title>
  <url>https://drei.docs.pmnd.rs/getting-started/introduction</url>
  <content>If you make a component that is generic enough to be useful to others, think about [CONTRIBUTING](https://drei.docs.pmnd.rs/getting-started/CONTRIBUTING)!

    import { PerspectiveCamera, PositionalAudio, ... } from '@react-three/drei'
    

    import { PerspectiveCamera, PositionalAudio, ... } from '@react-three/drei/native'
    

The `native` route of the library **does not** export `Html` or `Loader`. The default export of the library is `web` which **does** export `Html` and `Loader`.</content>
</page>

<page>
  <title>Clone - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/clone</url>
  <content>*   [](https://codesandbox.io/s/42glz0)
    
    ###### Clones
    

Declarative abstraction around THREE.Object3D.clone. This is useful when you want to create a shallow copy of an existing fragment (and Object3D, Groups, etc) into your scene, for instance a group from a loaded GLTF. This clone is now re-usable, but it will still refer to the original geometries and materials.

    <Clone
      /** Any pre-existing THREE.Object3D (groups, meshes, ...), or an array of objects */
      object: THREE.Object3D | THREE.Object3D[]
      /** Children will be placed within the object, or within the group that holds arrayed objects */
      children?: React.ReactNode
      /** Can clone materials and/or geometries deeply (default: false) */
      deep?: boolean | 'materialsOnly' | 'geometriesOnly'
      /** The property keys it will shallow-clone (material, geometry, visible, ...) */
      keys?: string[]
      /** Can either spread over props or fill in JSX children, applies to every mesh within */
      inject?: MeshProps | React.ReactNode | ((object: THREE.Object3D) => React.ReactNode)
      /** Short access castShadow, applied to every mesh within */
      castShadow?: boolean
      /** Short access receiveShadow, applied to every mesh within */
      receiveShadow?: boolean
    />
    

You create a shallow clone by passing a pre-existing object to the `object` prop.

    const { nodes } = useGLTF(url)
    return (
      <Clone object={nodes.table} />
    

Or, multiple objects:

    <Clone object={[nodes.foo, nodes.bar]} />
    

You can dynamically insert objects, these will apply to anything that isn't a group or a plain object3d (meshes, lines, etc):

    <Clone object={nodes.table} inject={<meshStandardMaterial color="green" />} />
    

Or make inserts conditional:

    <Clone object={nodes.table} inject={
      {(object) => (object.name === 'table' ? <meshStandardMaterial color="green" /> : null)}
    } /></content>
</page>

<page>
  <title>AsciiRenderer - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/ascii-renderer</url>
  <content>*   [](https://codesandbox.io/s/vq9wsl)
    
    ###### ASCII renderer transparent
    

Abstraction of three's [AsciiEffect](https://threejs.org/examples/?q=as#webgl_effects_ascii). It creates a DOM layer on top of the canvas and renders the scene as ascii characters.

    type AsciiRendererProps = {
      /** Render index, default: 1 */
      renderIndex?: number
      /** CSS background color (can be "transparent"), default: black */
      bgColor?: string
      /** CSS character color, default: white */
      fgColor?: string
      /** Characters, default: ' .:-+*=%@#' */
      characters?: string
      /** Invert character, default: true */
      invert?: boolean
      /** Colorize output (very expensive!), default: false */
      color?: boolean
      /** Level of detail, default: 0.15 */
      resolution?: number
    }
    

    <Canvas>
      <AsciiRenderer /></content>
</page>

<page>
  <title>Billboard - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/billboard</url>
  <content>Adds a `<group />` that always faces the camera.

    <Billboard
      follow={true}
      lockX={false}
      lockY={false}
      lockZ={false} // Lock the rotation on the z axis (default=false)
    >
      <Text fontSize={1}>I'm a billboard</Text>
    </Billboard></content>
</page>

<page>
  <title>ComputedAttribute - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/computed-attribute</url>
  <content>Create and attach an attribute declaratively.

    <sphereGeometry>
      <ComputedAttribute
        // attribute will be added to the geometry with this name
        name="my-attribute-name"
        compute={(geometry) => {
          // ...someLogic;
          return new THREE.BufferAttribute([1, 2, 3], 1)
        }}
        // you can pass any BufferAttribute prop to this component, eg.
        usage={THREE.StaticReadUsage}
      />
    </sphereGeometry></content>
</page>

<page>
  <title>Edges - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/edges</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

*   [](https://codesandbox.io/s/ny3p4)
    
    ###### Multi-select & edges
    

Abstracts [THREE.EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry). It pulls the geometry automatically from its parent, optionally you can ungroup it and give it a `geometry` prop. You can give it children, for instance a custom material. Edges is based on `<Line>` and supports all of its props.

    <mesh>
      <boxGeometry />
      <meshBasicMaterial />
      <Edges
        linewidth={4}
        scale={1.1}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color="white"
      />
    </mesh>
    

[src/core/Edges.tsx](https://github.com/pmndrs/drei/tree/master/src/core/Edges.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/abstractions/edges.mdx)

Previous

[Decal](https://drei.docs.pmnd.rs/abstractions/decal)

Next

[Effects](https://drei.docs.pmnd.rs/abstractions/effects)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
    *   [AsciiRenderer](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    *   [Billboard](https://drei.docs.pmnd.rs/abstractions/billboard)
    *   [Clone](https://drei.docs.pmnd.rs/abstractions/clone)
    *   [ComputedAttribute](https://drei.docs.pmnd.rs/abstractions/computed-attribute)
    *   [Decal](https://drei.docs.pmnd.rs/abstractions/decal)
    *   [Edges](https://drei.docs.pmnd.rs/abstractions/edges)
    *   [Effects](https://drei.docs.pmnd.rs/abstractions/effects)
    *   [GradientTexture](https://drei.docs.pmnd.rs/abstractions/gradient-texture)
    *   [Image](https://drei.docs.pmnd.rs/abstractions/image)
    *   [MarchingCubes](https://drei.docs.pmnd.rs/abstractions/marching-cubes)
    *   [Outlines](https://drei.docs.pmnd.rs/abstractions/outlines)
    *   [PositionalAudio](https://drei.docs.pmnd.rs/abstractions/positional-audio)
    *   [Sampler](https://drei.docs.pmnd.rs/abstractions/sampler)
    *   [ScreenSizer](https://drei.docs.pmnd.rs/abstractions/screen-sizer)
    *   [ScreenSpace](https://drei.docs.pmnd.rs/abstractions/screen-space)
    *   [Splat](https://drei.docs.pmnd.rs/abstractions/splat)
    *   [Svg](https://drei.docs.pmnd.rs/abstractions/svg)
    *   [Text](https://drei.docs.pmnd.rs/abstractions/text)
    *   [Text3D](https://drei.docs.pmnd.rs/abstractions/text3d)
    *   [Trail](https://drei.docs.pmnd.rs/abstractions/trail)
    *   [useAnimations](https://drei.docs.pmnd.rs/abstractions/use-animations)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>Decal - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/decal</url>
  <content>*   [](https://codesandbox.io/s/ymb5d9)
    
    ###### Using decals
    

Abstraction around Three's `DecalGeometry`. It will use the its parent `mesh` as the decal surface by default.

The decal box has to intersect the surface, otherwise it will not be visible. if you do not specifiy a rotation it will look at the parents center point. You can also pass a single number as the rotation which allows you to spin it.

    <mesh>
      <sphereGeometry />
      <meshBasicMaterial />
      <Decal
        debug // Makes "bounding box" of the decal visible
        position={[0, 0, 0]} // Position of the decal
        rotation={[0, 0, 0]} // Rotation of the decal (can be a vector or a degree in radians)
        scale={1} // Scale of the decal
      >
        <meshBasicMaterial
          map={texture}
          polygonOffset
          polygonOffsetFactor={-1} // The material should take precedence over the original
        />
      </Decal>
    </mesh>
    

If you do not specify a material it will create a transparent meshBasicMaterial with a polygonOffsetFactor of -10.

    <mesh>
      <sphereGeometry />
      <meshBasicMaterial />
      <Decal map={texture} />
    </mesh>
    

If declarative composition is not possible, use the `mesh` prop to define the surface the decal must attach to.

    <Decal mesh={ref}>
      <meshBasicMaterial map={texture} polygonOffset polygonOffsetFactor={-1} />
    </Decal></content>
</page>

<page>
  <title>Effects - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/effects</url>
  <content>Abstraction around threes own [EffectComposer](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer). By default it will prepend a render-pass and a gammacorrection-pass. Children are cloned, `attach` is given to them automatically. You can only use passes or effects in there.

By default it creates a render target with HalfFloatType, RGBAFormat. You can change all of this to your liking, inspect the types.

    import { SSAOPass } from "three-stdlib"
    
    extend({ SSAOPass })
    
    <Effects multisamping={8} renderIndex={1} disableGamma={false} disableRenderPass={false} disableRender={false}>
      <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} />
    </Effects></content>
</page>

<page>
  <title>GradientTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/gradient-texture</url>
  <content>*   [](https://codesandbox.io/s/l03yb)
    
    ###### Gradient textures
    

A declarative THREE.Texture which attaches to "map" by default. You can use this to create gradient backgrounds.

    <mesh>
      <planeGeometry />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 1]} // As many stops as you want
          colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
          size={1024} // Size is optional, default = 1024
        />
      </meshBasicMaterial>
    </mesh>
    

Radial gradient.

    import { GradientTexture, GradientType } from './GradientTexture'
    ;<mesh>
      <planeGeometry />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 0.5, 1]} // As many stops as you want
          colors={['aquamarine', 'hotpink', 'yellow']} // Colors need to match the number of stops
          size={1024} // Size (height) is optional, default = 1024
          width={1024} // Width of the canvas producing the texture, default = 16
          type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
          innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
          outerCircleRadius={'auto'} // Optional, the radius of the outer circle of the gradient, default = auto
        />
      </meshBasicMaterial>
    </mesh></content>
</page>

<page>
  <title>Image - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/image</url>
  <content>*   [](https://codesandbox.io/s/9s2wd9)
    
    ###### Cards with border radius
    
*   [](https://codesandbox.io/s/l4klb)
    
    ###### Horizontal tiles
    
*   [](https://codesandbox.io/s/gsm1y)
    
    ###### UseIntersect and scrollcontrols
    
*   [](https://codesandbox.io/s/x8gvs)
    
    ###### Infinite scroll
    
*   [](https://codesandbox.io/s/yjhzv)
    
    ###### Scrollcontrols with minimap
    

A shader-based image component with auto-cover (similar to css/background: cover).

    export type ImageProps = Omit<ThreeElements['mesh'], 'scale'> & {
      segments?: number
      scale?: number | [number, number]
      color?: Color
      zoom?: number
      radius?: number
      grayscale?: number
      toneMapped?: boolean
      transparent?: boolean
      opacity?: number
      side?: THREE.Side
    }
    

    function Foo() {
      const ref = useRef()
      useFrame(() => {
        ref.current.material.radius = ... // between 0 and 1
        ref.current.material.zoom = ... // 1 and higher
        ref.current.material.grayscale = ... // between 0 and 1
        ref.current.material.color.set(...) // mix-in color
      })
      return <Image ref={ref} url="/file.jpg" />
    }
    

To make the material transparent:

    <Image url="/file.jpg" transparent opacity={0.5} />
    

You can have custom planes, for instance a rounded-corner plane.

    import { extend } from '@react-three/fiber'
    import { Image } from '@react-three/drei'
    import { easing, geometry } from 'maath'
    
    extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })
    
    <Image url="/file.jpg">
      <roundedPlaneGeometry args={[1, 2, 0.15]} />
    </Image></content>
</page>

<page>
  <title>MarchingCubes - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/marching-cubes</url>
  <content>An abstraction for threes [MarchingCubes](https://threejs.org/examples/#webgl_marchingcubes)

    <MarchingCubes resolution={50} maxPolyCount={20000} enableUvs={false} enableColors={true}>
      <MarchingCube strength={0.5} subtract={12} color={new Color('#f0f')} position={[0.5, 0.5, 0.5]} />
    
      <MarchingPlane planeType="y" strength={0.5} subtract={12} />
    </MarchingCubes></content>
</page>

<page>
  <title>Outlines - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/outlines</url>
  <content>*   [](https://codesandbox.io/s/2gh6jf)
    
    ###### Outlines
    

An ornamental component that extracts the geometry from its parent and displays an [inverted-hull outline](https://bnpr.gitbook.io/bnpr/outline/inverse-hull-method). Supported parents are `<mesh>`, `<skinnedMesh>` and `<instancedMesh>`.

    type OutlinesProps = ThreeElements['group'] & {
      /** Outline color, default: black */
      color: ReactThreeFiber.Color
      /** Line thickness is independent of zoom, default: false */
      screenspace: boolean
      /** Outline opacity, default: 1 */
      opacity: number
      /** Outline transparency, default: false */
      transparent: boolean
      /** Outline thickness, default 0.05 */
      thickness: number
      /** Geometry crease angle (0 === no crease), default: Math.PI */
      angle: number
      /** Clipping planes, default: null (no clipping) works the same as clipping planes on any material */
      clippingPlanes: THREE.Plane[] | null
    }
    

    <mesh>
      <boxGeometry />
      <meshBasicMaterial />
      <Outlines thickness={0.05} color="hotpink" />
    </mesh></content>
</page>

<page>
  <title>PositionalAudio - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/positional-audio</url>
  <content>*   [](https://codesandbox.io/s/gkfhr)
    
    ###### Lulaby city
    

A wrapper around [THREE.PositionalAudio](https://threejs.org/docs/#api/en/audio/PositionalAudio). Add this to groups or meshes to tie them to a sound that plays when the camera comes near.

    <PositionalAudio
      url="/sound.mp3"
      distance={1}
      loop
      {...props} // All THREE.PositionalAudio props are valid
    /></content>
</page>

<page>
  <title>Sampler - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/sampler</url>
  <content>*   [](https://codesandbox.io/s/ehflx3)
    
    ###### r3f-fairly-realistic-grass
    
*   [](https://codesandbox.io/s/ehflx3)
    
    ###### r3f-fairly-realistic-grass
    
*   [](https://codesandbox.io/s/k6rcp2)
    
    ###### r3f⚡ meshsurfacesampler-component (forked)
    

Declarative abstraction around MeshSurfaceSampler & InstancedMesh. It samples points from the passed mesh and transforms an InstancedMesh's matrix to distribute instances on the points.

Check the demos & code for more.

You can either pass a Mesh and InstancedMesh as children:

    // This simple example scatters 1000 spheres on the surface of the sphere mesh.
    <Sampler
      weight={'normal'} // the name of the attribute to be used as sampling weight
      transform={transformPoint} // a function that transforms each instance given a sample. See the examples for more.
      count={16} // Number of samples
    >
      <mesh>
        <sphereGeometry args={[2]} />
      </mesh>
    
      <instancedMesh args={[null, null, 1_000]}>
        <sphereGeometry args={[0.1]} />
      </instancedMesh>
    </Sampler>
    

or use refs when you can't compose declaratively:

    const { nodes } = useGLTF('my/mesh/url')
    const mesh = useRef(nodes)
    const instances = useRef()
    
    return <>
      <instancedMesh args={[null, null, 1_000]}>
        <sphereGeometry args={[0.1]}>
      </instancedMesh>
    
      <Sampler mesh={mesh} instances={instances}>
    </></content>
</page>

<page>
  <title>ScreenSizer - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/screen-sizer</url>
  <content>Adds a `<object3D />` that scales objects to screen space.

    <ScreenSizer
      scale={1} // scale factor
    >
      <Box
        args={[100, 100, 100]} // will render roughly as a 100px box
      />
    </ScreenSizer></content>
</page>

<page>
  <title>ScreenSpace - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/screen-space</url>
  <content>Adds a `<group />` that aligns objects to screen space.

    <ScreenSpace
      depth={1} // Distance from camera
    >
      <Box>I'm in screen space</Box>
    </ScreenSpace></content>
</page>

<page>
  <title>Splat - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/splat</url>
  <content>*   [](https://codesandbox.io/s/qp4jmf)
    
    ###### Splats
    

A declarative abstraction around [antimatter15/splat](https://github.com/antimatter15/splat). It supports re-use, multiple splats with correct depth sorting, splats can move and behave as a regular object3d's, supports alphahash & alphatest, and stream-loading.

    type SplatProps = {
      /** Url towards a *.splat file, no support for *.ply */
      src: string
      /** Whether to use tone mapping, default: false */
      toneMapped?: boolean
      /** Alpha test value, , default: 0 */
      alphaTest?: number
      /** Whether to use alpha hashing, default: false */
      alphaHash?: boolean
      /** Chunk size for lazy loading, prevents chokings the worker, default: 25000 (25kb) */
      chunkSize?: number
    } & ThreeElements['mesh']
    

    <Splat src="https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat" />
    

In order to depth sort multiple splats correectly you can either use alphaTest, for instance with a low value. But keep in mind that this can show a slight outline under some viewing conditions.

    <Splat alphaTest={0.1} src="foo.splat" />
    <Splat alphaTest={0.1} src="bar.splat" />
    

You can also use alphaHash, but this can be slower and create some noise, you would typically get rid of the noise in postprocessing with a TAA pass. You don't have to use alphaHash on all splats.

    <Splat alphaHash src="foo.splat" /></content>
</page>

<page>
  <title>Svg - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/svg</url>
  <content>Wrapper around the `three` [svg loader](https://threejs.org/examples/?q=sv#webgl_loader_svg) demo.

Accepts an SVG url or svg raw data.

    <Svg src={urlOrRawSvgString} /></content>
</page>

<page>
  <title>Text - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/text</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

*   [](https://codesandbox.io/s/yup2o)
    
    ###### Spherical word-cloud
    

Hi-quality text rendering w/ signed distance fields (SDF) and antialiasing, using [troika-3d-text](https://github.com/protectwise/troika/tree/master/packages/troika-3d-text). All of troikas props are valid! Text is suspense-based!

    <Text color="black" anchorX="center" anchorY="middle">
      hello world!
    </Text>
    

Text will suspend while loading the font data, but in order to completely avoid FOUC you can pass the characters it needs to render.

    <Text font={fontUrl} characters="abcdefghijklmnopqrstuvwxyz0123456789!">
      hello world!
    </Text>
    

[src/core/Text.tsx](https://github.com/pmndrs/drei/tree/master/src/core/Text.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/abstractions/text.mdx)

Previous

[Svg](https://drei.docs.pmnd.rs/abstractions/svg)

Next

[Text3D](https://drei.docs.pmnd.rs/abstractions/text3d)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
    *   [AsciiRenderer](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    *   [Billboard](https://drei.docs.pmnd.rs/abstractions/billboard)
    *   [Clone](https://drei.docs.pmnd.rs/abstractions/clone)
    *   [ComputedAttribute](https://drei.docs.pmnd.rs/abstractions/computed-attribute)
    *   [Decal](https://drei.docs.pmnd.rs/abstractions/decal)
    *   [Edges](https://drei.docs.pmnd.rs/abstractions/edges)
    *   [Effects](https://drei.docs.pmnd.rs/abstractions/effects)
    *   [GradientTexture](https://drei.docs.pmnd.rs/abstractions/gradient-texture)
    *   [Image](https://drei.docs.pmnd.rs/abstractions/image)
    *   [MarchingCubes](https://drei.docs.pmnd.rs/abstractions/marching-cubes)
    *   [Outlines](https://drei.docs.pmnd.rs/abstractions/outlines)
    *   [PositionalAudio](https://drei.docs.pmnd.rs/abstractions/positional-audio)
    *   [Sampler](https://drei.docs.pmnd.rs/abstractions/sampler)
    *   [ScreenSizer](https://drei.docs.pmnd.rs/abstractions/screen-sizer)
    *   [ScreenSpace](https://drei.docs.pmnd.rs/abstractions/screen-space)
    *   [Splat](https://drei.docs.pmnd.rs/abstractions/splat)
    *   [Svg](https://drei.docs.pmnd.rs/abstractions/svg)
    *   [Text](https://drei.docs.pmnd.rs/abstractions/text)
    *   [Text3D](https://drei.docs.pmnd.rs/abstractions/text3d)
    *   [Trail](https://drei.docs.pmnd.rs/abstractions/trail)
    *   [useAnimations](https://drei.docs.pmnd.rs/abstractions/use-animations)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>Text3D - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/text3d</url>
  <content>*   [](https://codesandbox.io/s/x6obrb)
    
    ###### Text3D alignment
    

Render 3D text using ThreeJS's `TextGeometry`.

Text3D will suspend while loading the font data. Text3D requires fonts in JSON format generated through [typeface.json](http://gero3.github.io/facetype.js), either as a path to a JSON file or a JSON object. If you face display issues try checking "Reverse font direction" in the typeface tool.

    <Text3D font={fontUrl} {...textOptions}>
      Hello world!
      <meshNormalMaterial />
    </Text3D>
    

You can use any material. `textOptions` are options you'd pass to the `TextGeometry` constructor. Find more information about available options [here](https://threejs.org/docs/index.html?q=textg#examples/en/geometries/TextGeometry).

You can align the text using the `<Center>` component.

    <Center top left>
      <Text3D>hello</Text3D>
    </Center>
    

It adds three properties that do not exist in the original `TextGeometry`, `lineHeight`, `letterSpacing` and smooth. LetterSpacing is a factor that is `1` by default. LineHeight is in threejs units and `0` by default. Smooth merges vertices with a tolerance and calls computeVertexNormals.

    <Text3D smooth={1} lineHeight={0.5} letterSpacing={-0.025}>{`hello\nworld`}</Text3D></content>
</page>

<page>
  <title>Trail - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/trail</url>
  <content>A declarative, `three.MeshLine` based Trails implementation. You can attach it to any mesh and it will give it a beautiful trail.

Props defined below with their default values.

    <Trail
      width={0.2} // Width of the line
      color={'hotpink'} // Color of the line
      length={1} // Length of the line
      decay={1} // How fast the line fades away
      local={false} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={1} // Number of frames to wait before next calculation
      target={undefined} // Optional target. This object will produce the trail.
      attenuation={(width) => width} // A function to define the width in each point along it.
    >
      {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>
    
      {/* You can optionally define a custom meshLineMaterial to use. */}
      {/* <meshLineMaterial color={"red"} /> */}
    </Trail>
    

👉 Inspired by [TheSpite's Codevember 2021 #9](https://spite.github.io/codevember-2021/9/)</content>
</page>

<page>
  <title>useAnimations - Drei</title>
  <url>https://drei.docs.pmnd.rs/abstractions/use-animations</url>
  <content>*   [](https://codesandbox.io/s/pecl6)
    
    ###### GLTF Animations
    

A hook that abstracts [AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer).

    const { nodes, materials, animations } = useGLTF(url)
    const { ref, mixer, names, actions, clips } = useAnimations(animations)
    useEffect(() => {
      actions?.jump.play()
    })
    return (
      <mesh ref={ref} />
    

The hook can also take a pre-existing root (which can be a plain object3d or a reference to one):

    const { scene, animations } = useGLTF(url)
    const { actions } = useAnimations(animations, scene)
    return <primitive object={scene} /></content>
</page>

<page>
  <title>CubeCamera - Drei</title>
  <url>https://drei.docs.pmnd.rs/cameras/cube-camera</url>
  <content>A [THREE.CubeCamera](https://threejs.org/docs/#api/en/cameras/CubeCamera) that returns its texture as a render-prop. It makes children invisible while rendering to the internal buffer so that they are not included in the reflection.

    type Props = ThreeElements['group'] & {
      /** Number of frames to render, Infinity */
      frames?: number
      /** Resolution of the FBO, 256 */
      resolution?: number
      /** Camera near, 0.1 */
      near?: number
      /** Camera far, 1000 */
      far?: number
      /** Custom environment map that is temporarily set as the scenes background */
      envMap?: THREE.Texture
      /** Custom fog that is temporarily set as the scenes fog */
      fog?: Fog | FogExp2
      /** The contents of CubeCamera will be hidden when filming the cube */
      children: (tex: Texture) => React.ReactNode
    }
    

Using the `frames` prop you can control if this camera renders indefinitely or statically (a given number of times). If you have two static objects in the scene, make it `frames={2}` for instance, so that both objects get to "see" one another in the reflections, which takes multiple renders. If you have moving objects, unset the prop and use a smaller `resolution` instead.

    <CubeCamera>
      {(texture) => (
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial envMap={texture} />
        </mesh>
      )}
    </CubeCamera></content>
</page>

<page>
  <title>OrthographicCamera - Drei</title>
  <url>https://drei.docs.pmnd.rs/cameras/orthographic-camera</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

A responsive [THREE.OrthographicCamera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera) that can set itself as the default.

    <OrthographicCamera makeDefault {...props}>
      <mesh />
    </OrthographicCamera>
    

You can use the OrthographicCamera to film contents into a RenderTarget, it has the same API as PerspectiveCamera.

    <OrthographicCamera position={[0, 0, 10]}>
      {(texture) => (
        <mesh geometry={plane}>
          <meshBasicMaterial map={texture} />
        </mesh>
      )}
    </OrthographicCamera>
    

[src/core/OrthographicCamera.tsx](https://github.com/pmndrs/drei/tree/master/src/core/OrthographicCamera.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/cameras/orthographic-camera.mdx)

Previous

[CubeCamera](https://drei.docs.pmnd.rs/cameras/cube-camera)

Next

[PerspectiveCamera](https://drei.docs.pmnd.rs/cameras/perspective-camera)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
    *   [CubeCamera](https://drei.docs.pmnd.rs/cameras/cube-camera)
    *   [OrthographicCamera](https://drei.docs.pmnd.rs/cameras/orthographic-camera)
    *   [PerspectiveCamera](https://drei.docs.pmnd.rs/cameras/perspective-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>PerspectiveCamera - Drei</title>
  <url>https://drei.docs.pmnd.rs/cameras/perspective-camera</url>
  <content>    type Props = Omit<ThreeElements['perspectiveCamera'], 'children'> & {
      /** Registers the camera as the system default, fiber will start rendering with it */
      makeDefault?: boolean
      /** Making it manual will stop responsiveness and you have to calculate aspect ratio yourself. */
      manual?: boolean
      /** The contents will either follow the camera, or be hidden when filming if you pass a function */
      children?: React.ReactNode | ((texture: THREE.Texture) => React.ReactNode)
      /** Number of frames to render, 0 */
      frames?: number
      /** Resolution of the FBO, 256 */
      resolution?: number
      /** Optional environment map for functional use */
      envMap?: THREE.Texture
    }
    

A responsive [THREE.PerspectiveCamera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera) that can set itself as the default.

    <PerspectiveCamera makeDefault {...props} />
    <mesh />
    

You can also give it children, which will now occupy the same position as the camera and follow along as it moves.

    <PerspectiveCamera makeDefault {...props}>
      <mesh />
    </PerspectiveCamera>
    

You can also drive it manually, it won't be responsive and you have to calculate aspect ratio yourself.

    <PerspectiveCamera manual aspect={...} onUpdate={(c) => c.updateProjectionMatrix()}>
    

You can use the PerspectiveCamera to film contents into a RenderTarget, similar to CubeCamera. As a child you must provide a render-function which receives the texture as its first argument. The result of that function will _not follow the camera_, instead it will be set invisible while the FBO renders so as to avoid issues where the meshes that receive the texture are interrering.

    <PerspectiveCamera position={[0, 0, 10]}>
      {(texture) => (
        <mesh geometry={plane}>
          <meshBasicMaterial map={texture} />
        </mesh>
      )}
    </PerspectiveCamera></content>
</page>

<page>
  <title>CameraControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/camera-controls</url>
  <content>*   [](https://codesandbox.io/s/sew669)
    
    ###### CameraControls - basic
    

This is an implementation of the [camera-controls](https://github.com/yomotsu/camera-controls) library.

    type CameraControlsProps = {
      /** The camera to control, default to the state's `camera` */
      camera?: PerspectiveCamera | OrthographicCamera
      /** DOM element to connect to, default to the state's `gl` renderer */
      domElement?: HTMLElement
      /** Reference this CameraControls instance as state's `controls` */
      makeDefault?: boolean
      /** Events callbacks, see: https://github.com/yomotsu/camera-controls#events */
      onStart?: (e?: { type: 'controlstart' }) => void
      onEnd?: (e?: { type: 'controlend' }) => void
      onChange?: (e?: { type: 'update' }) => void
    }</content>
</page>

<page>
  <title>FaceControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/face-controls</url>
  <content>Summary
-------

The camera follows your (detected) face.

*   [](https://codesandbox.io/s/jfx2t6)
    
    ###### FaceControls (forked)
    
*   [](https://codesandbox.io/s/zhjbhy)
    
    ###### FaceControls - AF (forked)
    

Prerequisite: wrap into a [`FaceLandmarker`](https://drei.docs.pmnd.rs/misc/face-landmarker) provider

    <FaceLandmarker>...</FaceLandmarker>
    

    export type FaceControlsProps = {
      /** The camera to be controlled */
      camera?: THREE.Camera
      /** VideoTexture or WebcamVideoTexture options */
      videoTexture: VideoTextureProps
      /** Disable the automatic face-detection => you should provide `faceLandmarkerResult` yourself in this case */
      manualDetect?: boolean
      /** FaceLandmarker result */
      faceLandmarkerResult?: FaceLandmarkerResult
      /** Disable the rAF camera position/rotation update */
      manualUpdate?: boolean
      /** Reference this FaceControls instance as state's `controls` */
      makeDefault?: boolean
      /** Approximate time to reach the target. A smaller value will reach the target faster. */
      smoothTime?: number
      /** Apply position offset extracted from `facialTransformationMatrix` */
      offset?: boolean
      /** Offset sensitivity factor, less is more sensible */
      offsetScalar?: number
      /** Enable eye-tracking */
      eyes?: boolean
      /** Force Facemesh's `origin` to be the middle of the 2 eyes */
      eyesAsOrigin?: boolean
      /** Constant depth of the Facemesh */
      depth?: number
      /** Enable debug mode */
      debug?: boolean
      /** Facemesh options, default: undefined */
      facemesh?: FacemeshProps
    }
    
    export type FaceControlsApi = THREE.EventDispatcher & {
      /** Compute the target for the camera */
      computeTarget: () => THREE.Object3D
      /** Update camera's position/rotation to the `target` */
      update: (delta: number, target?: THREE.Object3D) => void
      /** <Facemesh> ref api */
      facemeshApiRef: RefObject<FacemeshApi>
    }
    

[

Breaking changes
----------------

](#breaking-changes)[

### 9.120.0

](#9.120.0)`FaceControls` was [simplified](https://github.com/pmndrs/drei/pull/2242).

Following props were deleted:

*   `autostart`: now use `videoTexture.start`
*   `webcam`: instead of `webcam: false`, you can now [`manualDetect`](http://localhost:6006/?path=/story/controls-facecontrols--face-controls-st-2)
*   `webcamVideoTextureSrc`: now use `videoTexture.src` (or instantiate your own video-texture[1](#user-content-fn-1) outside)
*   `onVideoFrame`: now use `videoTexture.onVideoFrame` (or instantiate your own video-texture[1](#user-content-fn-1) outside)

Following api methods/fields were deleted:

*   `detect`: you can now [`manualDetect`](http://localhost:6006/?path=/story/controls-facecontrols--face-controls-st-2) outside and pass `faceLandmarkerResult`
*   `webcamApiRef`: if you need `videoTextureRef`, instantiate your own video-texture[1](#user-content-fn-1) outside
*   `play`/`pause`: same, if you need the `video` object, instantiate your own video-texture[1](#user-content-fn-1) outside

[](#footnote-label)

1.  `<VideoTexture>` or `<WebcamVideoTexture>` [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3) [↩4](#user-content-fnref-1-4)</content>
</page>

<page>
  <title>Controls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/introduction</url>
  <content>If available controls have damping enabled by default, they manage their own updates, remove themselves on unmount, are compatible with the `frameloop="demand"` canvas-flag. They inherit all props from their underlying [THREE.Controls](https://threejs.org/docs/index.html?q=controls#api/en/extras/Controls). They are the first effects to run before all other useFrames, to ensure that other components may mutate the camera on top of them.

[Some controls](https://github.com/search?q=repo%3Apmndrs%2Fdrei+language%3ATSX+path%3A%2F%5Esrc%5C%2F.*Controls%5C.tsx%2F+makeDefault&type=code) allow you to set `makeDefault`, similar to, for instance, `PerspectiveCamera`. This will set [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/api/hooks#usethree)'s `controls` field in the root store. This can make it easier in situations where you want controls to be known and other parts of the app could respond to it. Some drei controls already take it into account, like `CameraShake`, `Gizmo` and `TransformControls`.

    <CameraControls makeDefault />
    

    const controls = useThree((state) => state.controls)
    

Drei currently exports `OrbitControls` [](https://drei.vercel.app/?path=/story/controls-orbitcontrols--orbit-controls-story), `MapControls` [](https://drei.vercel.app/?path=/story/controls-mapcontrols--map-controls-st), `TrackballControls`, `ArcballControls`, `FlyControls`, `DeviceOrientationControls`, `PointerLockControls` [](https://drei.vercel.app/?path=/story/controls-pointerlockcontrols--pointer-lock-controls-scene-st), `FirstPersonControls` [](https://drei.vercel.app/?path=/story/controls-firstpersoncontrols--first-person-controls-story)`CameraControls` [](https://drei.vercel.app/?path=/story/controls-cameracontrols--camera-controls-story)`FaceControls` [](https://drei.vercel.app/?path=/story/controls-facecontrols)and other [`*Controls`](https://github.com/search?q=repo%3Apmndrs%2Fdrei+language%3ATSX+path%3A%2F%5Esrc%5C%2F.*Controls%5C.tsx%2F&type=code)

Some controls drive an object, not a camera, eg: `PresentationControls`.

But all controls involving a camera, react to the default one. If you have a `<PerspectiveCamera makeDefault />` in your scene, they will control it. If you need to inject an imperative camera or one that isn't the default, use the `camera` prop: `<OrbitControls camera={MyCamera} />`.

`PointerLockControls` additionally supports a `selector` prop, which enables the binding of `click` event handlers for control activation to other elements than `document` (e.g. a 'Click here to play' button). All elements matching the `selector` prop will activate the controls. It will also center raycast events by default, so regular onPointerOver/etc events on meshes will continue to work.</content>
</page>

<page>
  <title>KeyboardControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/keyboard-controls</url>
  <content>*   [](https://codesandbox.io/s/vkgi6)
    
    ###### Minecraft
    

A rudimentary keyboard controller which distributes your defined data-model to the `useKeyboard` hook. It's a rather simple way to get started with keyboard input.

    type KeyboardControlsState<T extends string = string> = { [K in T]: boolean }
    
    type KeyboardControlsEntry<T extends string = string> = {
      /** Name of the action */
      name: T
      /** The keys that define it, you can use either event.key, or event.code */
      keys: string[]
      /** If the event receives the keyup event, true by default */
      up?: boolean
    }
    
    type KeyboardControlsProps = {
      /** A map of named keys */
      map: KeyboardControlsEntry[]
      /** All children will be able to useKeyboardControls */
      children: React.ReactNode
      /** Optional onchange event */
      onChange: (name: string, pressed: boolean, state: KeyboardControlsState) => void
      /** Optional event source */
      domElement?: HTMLElement
    }
    

You start by wrapping your app, or scene, into `<KeyboardControls>`.

    enum Controls {
      forward = 'forward',
      back = 'back',
      left = 'left',
      right = 'right',
      jump = 'jump',
    }
    function App() {
      const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
      ], [])
      return (
        <KeyboardControls map={map}>
          <App />
        </KeyboardControls>
    

You can either respond to input reactively, it uses zustand (with the `subscribeWithSelector` middleware) so all the rules apply:

    function Foo() {
      const forwardPressed = useKeyboardControls<Controls>(state => state.forward)
    

Or transiently, either by `subscribe`, which is a function which returns a function to unsubscribe, so you can pair it with useEffect for cleanup, or `get`, which fetches fresh state non-reactively.

    function Foo() {
      const [sub, get] = useKeyboardControls<Controls>()
    
      useEffect(() => {
        return sub(
          (state) => state.forward,
          (pressed) => {
            console.log('forward', pressed)
          }
        )
      }, [])
    
      useFrame(() => {
        // Fetch fresh data from store
        const pressed = get().back
      })
    }</content>
</page>

<page>
  <title>MotionPathControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/motion-path-controls</url>
  <content>*   [](https://codesandbox.io/s/2y73c6)
    
    ###### MotionPathControls
    

Motion path controls, it takes a path of bezier curves or catmull-rom curves as input and animates the passed `object` along that path. It can be configured to look upon an external object for staging or presentation purposes by adding a `focusObject` property (ref).

    type MotionPathProps = ThreeElements['group'] & {
      /** An optional array of THREE curves */
      curves?: THREE.Curve<THREE.Vector3>[]
      /** Show debug helpers */
      debug?: boolean
      /** Color of debug helpers */
      debugColor?: THREE.ColorRepresentation
      /** The target object that is moved, default: null (the default camera) */
      object?: React.RefObject<THREE.Object3D>
      /** An object where the target looks towards, can also be a vector, default: null */
      focus?: [x: number, y: number, z: number] | React.RefObject<THREE.Object3D>
      /** Should the target object loop back to the start when reaching the end, default: true */
      loop?: boolean
      /** Position between 0 (start) and end (1), if this is not set useMotion().current must be used, default: null */
      offset?: number
      /** Optionally smooth the curve, default: false */
      smooth?: boolean | number
      /** Damping tolerance, default: 0.00001 */
      eps?: number
      /** Damping factor for movement along the curve, default: 0.1 */
      damping?: number
      /** Damping factor for lookAt, default: 0.1 */
      focusDamping?: number
      /** Damping maximum speed, default: Infinity */
      maxSpeed?: number
    }
    

You can use MotionPathControls with declarative curves.

    function App() {
      const poi = useRef()
      return (
        <group>
          <MotionPathControls offset={0} focus={poi} damping={0.2}>
            <cubicBezierCurve3 v0={[-5, -5, 0]} v1={[-10, 0, 0]} v2={[0, 3, 0]} v3={[6, 3, 0]} />
            <cubicBezierCurve3 v0={[6, 3, 0]} v1={[10, 5, 5]} v2={[5, 5, 5]} v3={[5, 5, 5]} />
          </MotionPathControls>
          <Box args={[1, 1, 1]} ref={poi}/>
    

Or with imperative curves.

    <MotionPathControls
      offset={0}
      focus={poi}
      damping={0.2}
      curves={[
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(-5, -5, 0),
          new THREE.Vector3(-10, 0, 0),
          new THREE.Vector3(0, 3, 0),
          new THREE.Vector3(6, 3, 0)
        ),
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(6, 3, 0),
          new THREE.Vector3(10, 5, 5),
          new THREE.Vector3(5, 3, 5),
          new THREE.Vector3(5, 5, 5)
        ),
      ]}
    />
    

You can exert full control with the `useMotion` hook, it allows you to define the current position along the path for instance, or define your own lookAt. Keep in mind that MotionPathControls will still these values unless you set damping and focusDamping to 0. Then you can also employ your own easing.

    type MotionState = {
      /** The user-defined, mutable, current goal position along the curve, it may be >1 or <0 */
      current: number
      /** The combined curve */
      path: THREE.CurvePath<THREE.Vector3>
      /** The focus object */
      focus: React.RefObject<THREE.Object3D<THREE.Event>> | [x: number, y: number, z: number] | undefined
      /** The target object that is moved along the curve */
      object: React.RefObject<THREE.Object3D<THREE.Event>>
      /** The automated, 0-1 normalised and damped current goal position along curve */
      offset: number
      /** The current point on the curve */
      point: THREE.Vector3
      /** The current tangent on the curve */
      tangent: THREE.Vector3
      /** The next point on the curve */
      next: THREE.Vector3
    }
    
    const state: MotionState = useMotion()
    

    function Loop() {
      const motion = useMotion()
      useFrame((state, delta) => {
        // Set the current position along the curve, you can increment indiscriminately for a loop
        motion.current += delta
        // Look ahead on the curve
        motion.object.current.lookAt(motion.next)
      })
    }
    
    <MotionPathControls>
      <cubicBezierCurve3 v0={[-5, -5, 0]} v1={[-10, 0, 0]} v2={[0, 3, 0]} v3={[6, 3, 0]} />
      <Loop />
    

You can also use the MotionPathControls's reference to control the motion state in the `motion` property.

    const motionPathRef = useRef<MotionPathRef>(null!)
    const motionPathObject = useRef<Mesh>(null!)
    
    useFrame(() => {
      if (motionPathRef.current) {
        motionPathRef.current.motion.current += 0.01
      }
    })
    
    <MotionPathControls
      ref={motionPathRef}
      object={motionPathObject}
      curves={[
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(-5, -5, 0),
          new THREE.Vector3(-10, 0, 0),
          new THREE.Vector3(0, 3, 0),
          new THREE.Vector3(6, 3, 0)
        ),
        new THREE.CubicBezierCurve3(
          new THREE.Vector3(6, 3, 0),
          new THREE.Vector3(10, 5, 5),
          new THREE.Vector3(5, 3, 5),
          new THREE.Vector3(5, 5, 5)
        ),
      ]}
    />
      <mesh ref={motionPathObject}>
        <planeGeometry args={[10, 10, 1, 1]} />
      </mesh>
    </MotionPathControls></content>
</page>

<page>
  <title>PresentationControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/presentation-controls</url>
  <content>*   [](https://codesandbox.io/s/kheke)
*   [](https://codesandbox.io/s/qyz5r)
    
    ###### Bouncy watch
    

Semi-OrbitControls with spring-physics, polar zoom and snap-back, for presentational purposes. These controls do not turn the camera but will spin their contents. They will not suddenly come to rest when they reach limits like OrbitControls do, but rather smoothly anticipate stopping position.

    <PresentationControls
      enabled={true} // the controls can be disabled by setting this to false
      global={false} // Spin globally or by dragging the model
      cursor={true} // Whether to toggle cursor style on drag
      snap={false} // Snap-back to center (can also be a spring config)
      speed={1} // Speed factor
      zoom={1} // Zoom factor when half the polar-max is reached
      rotation={[0, 0, 0]} // Default rotation
      polar={[0, Math.PI / 2]} // Vertical limits
      azimuth={[-Infinity, Infinity]} // Horizontal limits
      config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
      domElement={events.connected} // The DOM element events for this controller will attach to
    >
      <mesh />
    </PresentationControls></content>
</page>

<page>
  <title>ScrollControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/controls/scroll-controls</url>
  <content>*   [](https://codesandbox.io/s/l4klb)
    
    ###### Horizontal tiles
    
*   [](https://codesandbox.io/s/4m0d0)
*   [](https://codesandbox.io/s/gsm1y)
    
    ###### UseIntersect and scrollcontrols
    
*   [](https://codesandbox.io/s/x8gvs)
    
    ###### Infinite scroll
    
*   [](https://codesandbox.io/s/yjhzv)
    
    ###### Scrollcontrols with minimap
    
*   [](https://codesandbox.io/s/4jr4p)
    
    ###### Scrollcontrols + GLTF
    

    type ScrollControlsProps = {
      /** Precision, default 0.00001 */
      eps?: number
      /** Horizontal scroll, default false (vertical) */
      horizontal?: boolean
      /** Infinite scroll, default false (experimental!) */
      infinite?: boolean
      /** Defines the length of the scroll area, each page is height:100%, default 1 */
      pages?: number
      /** A factor that increases scroll bar travel, default 1 */
      distance?: number
      /** Friction in seconds, default: 0.2 (1/5 second) */
      damping?: number
      /** maxSpeed optionally allows you to clamp the maximum speed. If damping is 0.2s and looks OK
       *  going between, say, page 1 and 2, but not for pages far apart as it'll move very rapid,
       *  then a maxSpeed of e.g. 0.1 which will clamp the speed to 0.1 units per second, it may now
       *  take much longer than damping to reach the target if it is far away. Default: Infinity */
      maxSpeed?: number
      /** If true attaches the scroll container before the canvas */
      prepend?: boolean
      enabled?: boolean
      style?: React.CSSProperties
      children: React.ReactNode
    }
    

Scroll controls create an HTML scroll container in front of the canvas. Everything you drop into the `<Scroll>` component will be affected.

You can listen and react to scroll with the `useScroll` hook which gives you useful data like the current scroll `offset`, `delta` and functions for range finding: `range`, `curve` and `visible`. The latter functions are especially useful if you want to react to the scroll offset, for instance if you wanted to fade things in and out if they are in or out of view.

    ;<ScrollControls pages={3} damping={0.1}>
      {/* Canvas contents in here will *not* scroll, but receive useScroll! */}
      <SomeModel />
      <Scroll>
        {/* Canvas contents in here will scroll along */}
        <Foo position={[0, 0, 0]} />
        <Foo position={[0, viewport.height, 0]} />
        <Foo position={[0, viewport.height * 1, 0]} />
      </Scroll>
      <Scroll html>
        {/* DOM contents in here will scroll along */}
        <h1>html in here (optional)</h1>
        <h1 style={{ top: '100vh' }}>second page</h1>
        <h1 style={{ top: '200vh' }}>third page</h1>
      </Scroll>
    </ScrollControls>
    
    function Foo(props) {
      const ref = useRef()
      const data = useScroll()
      useFrame(() => {
        // data.offset = current scroll position, between 0 and 1, dampened
        // data.delta = current delta, between 0 and 1, dampened
    
        // Will be 0 when the scrollbar is at the starting position,
        // then increase to 1 until 1 / 3 of the scroll distance is reached
        const a = data.range(0, 1 / 3)
        // Will start increasing when 1 / 3 of the scroll distance is reached,
        // and reach 1 when it reaches 2 / 3rds.
        const b = data.range(1 / 3, 1 / 3)
        // Same as above but with a margin of 0.1 on both ends
        const c = data.range(1 / 3, 1 / 3, 0.1)
        // Will move between 0-1-0 for the selected range
        const d = data.curve(1 / 3, 1 / 3)
        // Same as above, but with a margin of 0.1 on both ends
        const e = data.curve(1 / 3, 1 / 3, 0.1)
        // Returns true if the offset is in range and false if it isn't
        const f = data.visible(2 / 3, 1 / 3)
        // The visible function can also receive a margin
        const g = data.visible(2 / 3, 1 / 3, 0.1)
      })
      return <mesh ref={ref} {...props} />
    }</content>
</page>

<page>
  <title>DragControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/drag-controls</url>
  <content>You can use DragControls to make objects draggable in your scene. It supports locking the drag to specific axes, setting drag limits, and custom drag start, drag, and drag end events.

    type DragControlsProps = {
      /** If autoTransform is true, automatically apply the local transform on drag, true */
      autoTransform?: boolean
      /** The matrix to control */
      matrix?: THREE.Matrix4
      /** Lock the drag to a specific axis */
      axisLock?: 'x' | 'y' | 'z'
      /** Limits */
      dragLimits?: [[number, number] | undefined, [number, number] | undefined, [number, number] | undefined]
      /** Hover event */
      onHover?: (hovering: boolean) => void
      /** Drag start event */
      onDragStart?: (origin: THREE.Vector3) => void
      /** Drag event */
      onDrag?: (
        localMatrix: THREE.Matrix4,
        deltaLocalMatrix: THREE.Matrix4,
        worldMatrix: THREE.Matrix4,
        deltaWorldMatrix: THREE.Matrix4
      ) => void
      /** Drag end event */
      onDragEnd?: () => void
      children: React.ReactNode
    }
    

    <DragControls>
      <mesh />
    </DragControls>
    

You can utilize DragControls as a controlled component by toggling `autoTransform` off, which then requires you to manage the matrix transformation manually. Alternatively, keeping `autoTransform` enabled allows you to apply the matrix to external objects, enabling DragControls to manage objects that are not directly parented within it.

    const matrix = new THREE.Matrix4()
    return (
      <DragControls
        ref={ref}
        matrix={matrix}
        autoTransform={false}
        onDrag={(localMatrix) => matrix.copy(localMatrix)}</content>
</page>

<page>
  <title>GizmoHelper - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/gizmo-helper</url>
  <content>Used by widgets that visualize and control camera position.

Two example gizmos are included: GizmoViewport and GizmoViewcube, and `useGizmoContext` makes it easy to create your own.

Make sure to set the `makeDefault` prop on your controls, in that case you do not have to define the onTarget and onUpdate props.

    <GizmoHelper
      alignment="bottom-right" // widget alignment within scene
      margin={[80, 80]} // widget margins (X, Y)
      onUpdate={/* called during camera animation  */}
      onTarget={/* return current camera target (e.g. from orbit controls) to center animation */}
      renderPriority={/* use renderPriority to prevent the helper from disappearing if there is another useFrame(..., 1)*/}
    >
      <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      {/* alternative: <GizmoViewcube /> */}
    </GizmoHelper></content>
</page>

<page>
  <title>Grid - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/grid</url>
  <content>*   [](https://codesandbox.io/s/19uq2u)
    
    ###### Grid component
    

A y-up oriented, shader-based grid implementation.

    export type GridMaterialType = {
      /** Cell size, default: 0.5 */
      cellSize?: number
      /** Cell thickness, default: 0.5 */
      cellThickness?: number
      /** Cell color, default: black */
      cellColor?: THREE.ColorRepresentation
      /** Section size, default: 1 */
      sectionSize?: number
      /** Section thickness, default: 1 */
      sectionThickness?: number
      /** Section color, default: #2080ff */
      sectionColor?: THREE.ColorRepresentation
      /** Follow camera, default: false */
      followCamera?: boolean
      /** Display the grid infinitely, default: false */
      infiniteGrid?: boolean
      /** Fade distance, default: 100 */
      fadeDistance?: number
      /** Fade strength, default: 1 */
      fadeStrength?: number
      /** Fade from camera (1) or origin (0), or somewhere in between, default: camera */
      fadeFrom?: number
    }
    
    export type GridProps = GridMaterialType & {
      /** Default plane-geometry arguments */
      args?: ConstructorParameters<typeof THREE.PlaneGeometry>
    }</content>
</page>

<page>
  <title>Helper / useHelper - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/helper-use-helper</url>
  <content>A hook for a quick way to add helpers to existing nodes in the scene. It handles removal of the helper on unmount and auto-updates it by default.

    const mesh = useRef()
    useHelper(mesh, BoxHelper, 'cyan')
    useHelper(condition && mesh, BoxHelper, 'red') // you can pass false instead of the object ref to hide the helper
    
    <mesh ref={mesh} ... />
    

or with `Helper`:

    <mesh>
      <boxGeometry />
      <meshBasicMaterial />
    
      <Helper type={BoxHelper} args={['royalblue']} />
      <Helper type={VertexNormalsHelper} args={[1, 0xff0000]} />
    </mesh></content>
</page>

<page>
  <title>PivotControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/pivot-controls</url>
  <content>*   [](https://codesandbox.io/s/om2ff8)
    
    ###### object gizmo controls
    

Controls for rotating and translating objects. These controls will stick to the object the transform and by offsetting or anchoring it forms a pivot. This control has HTML annotations for some transforms and supports `[tab]` for rounded values while dragging.

    type PivotControlsProps = {
      /** Enables/disables the control, true */
      enabled?: boolean
      /** Scale of the gizmo, 1 */
      scale?: number
      /** Width of the gizmo lines, this is a THREE.Line2 prop, 2.5 */
      lineWidth?: number
      /** If fixed is true is remains constant in size, scale is now in pixels, false */
      fixed?: boolean
      /** Pivot does not act as a group, it won't shift contents but can offset in position */
      offset?: [number, number, number]
      /** Starting rotation */
      rotation?: [number, number, number]
      /** Starting matrix */
      matrix?: THREE.Matrix4
      /** Anchor point, like BBAnchor, each axis can be between -1/0/+1 */
      anchor?: [number, number, number]
      /** If autoTransform is true, automatically apply the local transform on drag, true */
      autoTransform?: boolean
      /** Allows you to switch individual axes off */
      activeAxes?: [boolean, boolean, boolean]
      /** Allows you to disable translation via axes arrows */
      disableAxes?: boolean
      /** Allows you to disable translation via axes planes */
      disableSliders?: boolean
      /** Allows you to disable rotation */
      disableRotations?: boolean
      /** Allows you to disable scaling */
      disableScaling?: boolean
      /** RGB colors */
      axisColors?: [string | number, string | number, string | number]
      /** Color of the hovered item */
      hoveredColor?: string | number
      /** HTML value annotations, default: false */
      annotations?: boolean
      /** CSS Classname applied to the HTML annotations */
      annotationsClass?: string
      /** Drag start event */
      onDragStart?: () => void
      /** Drag event */
      onDrag?: (l: THREE.Matrix4, deltaL: THREE.Matrix4, w: THREE.Matrix4, deltaW: THREE.Matrix4) => void
      /** Drag end event */
      onDragEnd?: () => void
      /** Set this to false if you want the gizmo to be visible through faces */
      depthTest?: boolean
      opacity?: number
      visible?: boolean
      userData?: { [key: string]: any }
      children?: React.ReactNode
    }
    

    <PivotControls>
      <mesh />
    </PivotControls>
    

You can use Pivot as a controlled component, switch `autoTransform` off in that case and now you are responsible for applying the matrix transform yourself. You can also leave `autoTransform` on and apply the matrix to foreign objects, in that case Pivot will be able to control objects that are not parented within.

    const matrix = new THREE.Matrix4()
    return (
      <PivotControls
        ref={ref}
        matrix={matrix}
        autoTransform={false}
        onDrag={({ matrix: matrix_ }) => matrix.copy(matrix_)}</content>
</page>

<page>
  <title>TransformControls - Drei</title>
  <url>https://drei.docs.pmnd.rs/gizmos/transform-controls</url>
  <content>*   [](https://codesandbox.io/s/btsbj)
    
    ###### TransformControls and makeDefault
    

An abstraction around [THREE.TransformControls](https://threejs.org/docs/#examples/en/controls/TransformControls).

You can wrap objects which then receive a transform gizmo.

    <TransformControls mode="translate">
      <mesh />
    </TransformControls>
    

You could also reference the object which might make it easier to exchange the target. Now the object does not have to be part of the same sub-graph. References can be plain objects or React.RefObjects.

    <TransformControls object={mesh} mode="translate" />
    <mesh ref={mesh} />
    

If you are using other controls (Orbit, Trackball, etc), you will notice how they interfere, dragging one will affect the other. Default-controls will temporarily be disabled automatically when the user is pulling on the transform gizmo.

    <TransformControls mode="translate" />
    <OrbitControls makeDefault /></content>
</page>

<page>
  <title>CubeTexture / useCubeTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture</url>
  <content>A convenience hook that uses `useLoader` and `CubeTextureLoader`

    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: 'cube/' })</content>
</page>

<page>
  <title>Fbx / useFBX - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/fbx-use-fbx</url>
  <content>A convenience hook that uses `useLoader` and `FBXLoader`:

    useFBX(url)
    
    function SuzanneFBX() {
      let fbx = useFBX('suzanne/suzanne.fbx')
      return <primitive object={fbx} />
    }</content>
</page>

<page>
  <title>Gltf / useGLTF - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/gltf-use-gltf</url>
  <content>Summary
-------

A convenience hook that uses [`useLoader`](https://r3f.docs.pmnd.rs/api/hooks#useloader) and [`GLTFLoader`](https://threejs.org/docs/#examples/en/loaders/GLTFLoader).

[

`useGLTF` hook
--------------

](#usegltf-hook)

    useGLTF<T extends string | string[]>(
      path: T,
      useDraco?: boolean | string = true,
      useMeshOpt: boolean = true,
      extendLoader?: (loader: GLTFLoader) => void
    ): T extends any[] ? (GLTF & ObjectMap)[] : GLTF & ObjectMap
    

`GLTF`, `ObjectMap` and `GLTFLoader` being defined as follows:

*   [`GLTF`](https://github.com/pmndrs/three-stdlib/blob/9d656b26c80e2c356df0d016ba7fddc55da50577/src/loaders/GLTFLoader.d.ts#L25C1-L40C2):
    
        export interface GLTF {
          animations: AnimationClip[]
          scene: Group
          scenes: Group[]
          cameras: Camera[]
          asset: {
            copyright?: string
            generator?: string
            version?: string
            minVersion?: string
            extensions?: any
            extras?: any
          }
          parser: GLTFParser
          userData: any
        }
        
    
*   [`ObjectMap`](https://github.com/pmndrs/react-three-fiber/blob/818e383b0a06ac02b8b96fa5437bb198736ea23d/packages/fiber/src/core/utils.ts#L93) being:
    
        type ObjectMap = {
          nodes: {
            [name: string]: THREE.Object3D
          }
          materials: {
            [name: string]: THREE.Material
          }
        }
        
    
*   [`GLTFLoader`](https://github.com/pmndrs/three-stdlib/blob/9d656b26c80e2c356df0d016ba7fddc55da50577/src/loaders/GLTFLoader.d.ts#L42) defined here
    

[

### Basic

](#basic)

    const gltf = useGLTF(url)
    

You can also preload a model:

[

### draco (decompression)

](#draco-\(decompression\))

It defaults to CDN loaded draco binaries (`https://www.gstatic.com/draco/v1/decoders/`) which are only loaded for compressed models.

But you can also use your own draco binaries by passing a path:

    useGLTF(url, '/draco-gltf')
    

If you want to use your own draco decoder globally, you can pass it through:

    useGLTF.setDecoderPath(path)
    

If you are using the CDN loaded draco binaries, you can get a small speedup in loading time by prefetching them.

You can accomplish this by adding two `<link>` tags to your `<head>` tag, as below. The version in those URLs must exactly match what [useGLTF](https://drei.docs.pmnd.rs/loaders/src/core/useGLTF.tsx#L18) uses for this to work. If you're using create-react-app, `public/index.html` file contains the `<head>` tag.

    <link
      rel="prefetch"
      crossorigin="anonymous"
      href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_wasm_wrapper.js"
    />
    <link
      rel="prefetch"
      crossorigin="anonymous"
      href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_decoder.wasm"
    />
    

It is recommended that you check your browser's network tab to confirm that the correct URLs are being used, and that the files do get loaded from the prefetch cache on subsequent requests.

[

### `extendLoader`

](#extendloader)

If for example your model [`facecap.glb`](https://github.com/mrdoob/three.js/blob/master/examples/models/gltf/facecap.glb) needs KTX2 textures, you can `extendLoader`:

    import { KTX2Loader } from 'three-stdlib'
    const ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.168.0/examples/jsm/libs/basis/')
    
    // ...
    
    const { gl } = useThree()
    useGLTF('facecap.glb', true, true, (loader) => {
      loader.setKTX2Loader(ktx2Loader.detectSupport(gl))
    })
    

[

`Gltf` component
----------------

](#gltf-component)

A `Gltf` component is also provided.

It takes the same props as `useGLTF` (except `src` which cannot be an array):

    <Gltf src={url} />
    <Gltf src={url} useDraco='/draco-gltf' ... /></content>
</page>

<page>
  <title>Ktx2 / useKTX2 - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/ktx2-use-ktx2</url>
  <content>A convenience hook that uses `useLoader` and `KTX2Loader`

    const texture = useKTX2(url)
    const [texture1, texture2] = useKTX2([texture1, texture2])
    
    return <meshStandardMaterial map={texture} /></content>
</page>

<page>
  <title>Loader - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/loader</url>
  <content>*   [](https://codesandbox.io/s/0buje)
    
    ###### Viking ship
    

A quick and easy loading overlay component that you can drop on top of your canvas. It's intended to "hide" the whole app, so if you have multiple suspense wrappers in your application, you should use multiple loaders. It will show an animated loadingbar and a percentage.

    <Canvas>
      <Suspense fallback={null}>
        <AsyncModels />
      </Suspense>
    </Canvas>
    <Loader />
    

You can override styles, too.

    <Loader
      containerStyles={...container} // Flex layout styles
      innerStyles={...inner} // Inner container styles
      barStyles={...bar} // Loading-bar styles
      dataStyles={...data} // Text styles
      dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
      initialState={(active) => active} // Initial black out state
    ></content>
</page>

<page>
  <title>Progress / useProgress - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/progress-use-progress</url>
  <content>A convenience hook that wraps `THREE.DefaultLoadingManager`'s progress status.

    function Loader() {
      const { active, progress, errors, item, loaded, total } = useProgress()
      return <Html center>{progress} % loaded</Html>
    }
    
    return (
      <Suspense fallback={<Loader />}>
        <AsyncModels />
      </Suspense>
    )
    

If you don't want your progress component to re-render on all changes you can be specific as to what you need, for instance if the component is supposed to collect errors only. Look into [zustand](https://github.com/react-spring/zustand) for more info about selectors.

    const errors = useProgress((state) => state.errors)
    

👉 Note that your loading component does not have to be a suspense fallback. You can use it anywhere, even in your dom tree, for instance for overlays.</content>
</page>

<page>
  <title>ScreenVideoTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/screen-video-texture</url>
  <content>Summary
-------

Create a video texture from [`getDisplayMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia)

    export type ScreenVideoTextureProps = Omit<VideoTextureProps, 'src'> & {
      options?: DisplayMediaStreamOptions
    }
    

    <ScreenVideoTexture>
      {(texture) => <meshBasicMaterial map={texture} />}
    

or exposed via `ref`:

    const textureRef = useRef()
    <ScreenVideoTexture ref={textureRef} /></content>
</page>

<page>
  <title>Texture / useTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/texture-use-texture</url>
  <content>A convenience hook that uses `useLoader` and `TextureLoader`

    const texture = useTexture(url)
    const [texture1, texture2] = useTexture([texture1, texture2])
    

You can also use key: url objects:

    const props = useTexture({
      metalnessMap: url1,
      map: url2,
    })
    return <meshStandardMaterial {...props} /></content>
</page>

<page>
  <title>TrailTexture / useTrailTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/trail-texture-use-trail-texture</url>
  <content>*   [](https://codesandbox.io/s/fj1qlg)
    
    ###### useTrailTexture
    

This hook returns a `THREE.Texture` with a pointer trail which can be used in shaders to control displacement among other things, and a movement callback `event => void` which reads from `event.uv`.

    type TrailConfig = {
      /** texture size (default: 256x256) */
      size?: number
      /** Max age (ms) of trail points (default: 750) */
      maxAge?: number
      /** Trail radius (default: 0.3) */
      radius?: number
      /** Canvas trail opacity (default: 0.2) */
      intensity?: number
      /** Add points in between slow pointer events (default: 0) */
      interpolate?: number
      /** Moving average of pointer force (default: 0) */
      smoothing?: number
      /** Minimum pointer force (default: 0.3) */
      minForce?: number
      /** Blend mode (default: 'screen') */
      blend?: CanvasRenderingContext2D['globalCompositeOperation']
      /** Easing (default: easeCircOut) */
      ease?: (t: number) => number
    }
    

    const [texture, onMove] = useTrailTexture(config)
    return (
      <mesh onPointerMove={onMove}>
        <meshStandardMaterial displacementMap={texture} /></content>
</page>

<page>
  <title>useFont - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/use-font</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

Uses THREE.FontLoader to load a font and returns a `THREE.Font` object. It also accepts a JSON object as a parameter. You can use this to preload or share a font across multiple components.

    const font = useFont('/fonts/helvetiker_regular.typeface.json')
    return <Text3D font={font} />
    

In order to preload you do this:

    useFont.preload('/fonts/helvetiker_regular.typeface.json')
    

[src/core/useFont.tsx](https://github.com/pmndrs/drei/tree/master/src/core/useFont.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/loaders/use-font.mdx)

Previous

[TrailTexture / useTrailTexture](https://drei.docs.pmnd.rs/loaders/trail-texture-use-trail-texture)

Next

[useSpriteLoader](https://drei.docs.pmnd.rs/loaders/use-sprite-loader)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
    *   [CubeTexture / useCubeTexture](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    *   [Fbx / useFBX](https://drei.docs.pmnd.rs/loaders/fbx-use-fbx)
    *   [Gltf / useGLTF](https://drei.docs.pmnd.rs/loaders/gltf-use-gltf)
    *   [Ktx2 / useKTX2](https://drei.docs.pmnd.rs/loaders/ktx2-use-ktx2)
    *   [Loader](https://drei.docs.pmnd.rs/loaders/loader)
    *   [Progress / useProgress](https://drei.docs.pmnd.rs/loaders/progress-use-progress)
    *   [ScreenVideoTexture](https://drei.docs.pmnd.rs/loaders/screen-video-texture)
    *   [Texture / useTexture](https://drei.docs.pmnd.rs/loaders/texture-use-texture)
    *   [TrailTexture / useTrailTexture](https://drei.docs.pmnd.rs/loaders/trail-texture-use-trail-texture)
    *   [useFont](https://drei.docs.pmnd.rs/loaders/use-font)
    *   [useSpriteLoader](https://drei.docs.pmnd.rs/loaders/use-sprite-loader)
    *   [VideoTexture / useVideoTexture](https://drei.docs.pmnd.rs/loaders/video-texture-use-video-texture)
    *   [WebcamVideoTexture](https://drei.docs.pmnd.rs/loaders/webcam-video-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>useSpriteLoader - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/use-sprite-loader</url>
  <content>Loads texture and JSON files with multiple or single animations and parses them into appropriate format. These assets can be used by multiple SpriteAnimator components to save memory and loading times.

Returns: `{spriteTexture:Texture, spriteData:{any[], object}, aspect:Vector3}`

*   spriteTexture: The ThreeJS Texture
*   spriteData: A collection of the sprite frames, and some meta information (width, height)
*   aspect: Information about the aspect ratio of the sprite sheet

    type Props = {
      /** The texture url to load the sprite frames from */
      input?: Url | null
      /** The JSON data describing the position of the frames within the texture (optional) */
      json?: string | null
      /** The animation names into which the frames will be divided into (optional) */
      animationNames?: string[] | null
      /** The number of frames on a standalone (no JSON data) spritesheet (optional)*/
      numberOfFrames?: number | null
      /** The callback to call when all textures and data have been loaded and parsed */
      onLoad?: (texture: Texture, textureData?: any) => void
      /** Allows the configuration of the canvas options */
      canvasRenderingContext2DSettings?: CanvasRenderingContext2DSettings
    }
    

    const { spriteObj } = useSpriteLoader(
      'multiasset.png',
      'multiasset.json',
    
      ['orange', 'Idle Blinking', '_Bat'],
      null
    )
    
    <SpriteAnimator
      position={[4.5, 0.5, 0.1]}
      autoPlay={true}
      loop={true}
      scale={5}
      frameName={'_Bat'}
      animationNames={['_Bat']}
      spriteDataset={spriteObj}
      alphaTest={0.01}
      asSprite={false}
    />
    
    <SpriteAnimator
      position={[5.5, 0.5, 5.8]}
      autoPlay={true}
      loop={true}
      scale={5}
      frameName={'Idle Blinking'}
      animationNames={['Idle Blinking']}
      spriteDataset={spriteObj}
      alphaTest={0.01}
      asSprite={false}
    /></content>
</page>

<page>
  <title>VideoTexture / useVideoTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/video-texture-use-video-texture</url>
  <content>*   [](https://codesandbox.io/s/39hg8)
    
    ###### Video textures
    
*   [](https://codesandbox.io/s/2cemck)
    
    ###### useVideoTexture - url and mediaStream
    

Summary
-------

A convenience hook that returns a `THREE.VideoTexture` and integrates loading into suspense.

By default it falls back until the `loadedmetadata` event. Then it starts playing the video, which, if the video is muted, is allowed in the browser without user interaction.

    export function useVideoTexture(
      srcOrSrcObject: HTMLVideoElement['src' | 'srcObject'],
      {
        unsuspend = 'loadedmetadata',
        start = true,
        hls = {},
        crossOrigin = 'anonymous',
        muted = true,
        loop = true,
        playsInline = true,
        onVideoFrame,
        ...videoProps
      }: {
        unsuspend?: keyof HTMLVideoElementEventMap
        start?: boolean
        hls?: Parameters<typeof getHls>[0]
        onVideoFrame: VideoFrameRequestCallback
      } & Partial<Omit<HTMLVideoElement, 'children' | 'src' | 'srcObject'>> = {}
    )
    

    const texture = useVideoTexture("/video.mp4")
    return (
      <mesh>
        <meshBasicMaterial map={texture} toneMapped={false} />
    

[](#mediastream)

It also accepts a [`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) from eg. [`.getDisplayMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) or [`.getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia):

    const [stream, setStream] = useState<MediaStream | null>(null)
    
    return (
      <mesh onClick={async () => setStream(await navigator.mediaDevices.getDisplayMedia({ video: true }))}>
        <React.Suspense fallback={<meshBasicMaterial wireframe />}>
          <VideoMaterial src={stream} />
        </React.Suspense>
    

    function VideoMaterial({ src }) {
      const texture = useVideoTexture(src)
    
      return <meshBasicMaterial map={texture} toneMapped={false} />
    }
    

NB: It's important to wrap `VideoMaterial` into `React.Suspense` since, `useVideoTexture(src)` here will be suspended until the user shares its screen.

[

HLS
---

](#hls)

`useVideoTexture` supports `.m3u8` HLS manifest via [hls.js](https://github.com/video-dev/hls.js):

    const texture = useVideoTexture('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
    

You can pass [`hls` config](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning):

    const texture = useVideoTexture('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', {
      hls: { abrEwmaFastLive: 1.0, abrEwmaSlowLive: 3.0, enableWorker: true },
    })
    

[

`requestVideoFrameCallback` (rVFC)
----------------------------------

](#requestvideoframecallback-\(rvfc\))

`useVideoTexture` supports [`requestVideoFrameCallback`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback):

    useVideoTexture(src, {
      onVideoFrame: (now, metadata) => {}
    })
    

[

`<VideoTexture>` Component
--------------------------

](#<videotexture>-component)

    export type VideoTextureProps = {
      children?: (texture: THREE.VideoTexture) => React.ReactNode
      src: UseVideoTextureParams[0]
    } & UseVideoTextureParams[1]
    

You can access the texture via children's render prop:

    <VideoTexture src="/video.mp4">
      {(texture) => <meshBasicMaterial map={texture} />}
    

or exposed via `ref`:

    const textureRef = useRef()
    <VideoTexture ref={textureRef} src="/video.mp4" /></content>
</page>

<page>
  <title>WebcamVideoTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/loaders/webcam-video-texture</url>
  <content>Summary
-------

Create a video texture from [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

    export type WebcamVideoTextureProps = Omit<VideoTextureProps, 'src'> & {
      constraints?: MediaStreamConstraints
    }
    

    <WebcamVideoTexture>
      {(texture) => <meshBasicMaterial map={texture} />}
    

or exposed via `ref`:

    const textureRef = useRef()
    <WebcamVideoTexture ref={textureRef} /></content>
</page>

<page>
  <title>CubeCamera / useCubeCamera - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera</url>
  <content>Creates a [`THREE.CubeCamera`](https://threejs.org/docs/#api/en/cameras/CubeCamera) that renders into a `fbo` renderTarget and that you can `update()`.

    export function useCubeCamera({
      /** Resolution of the FBO, 256 */
      resolution?: number
      /** Camera near, 0.1 */
      near?: number
      /** Camera far, 1000 */
      far?: number
      /** Custom environment map that is temporarily set as the scenes background */
      envMap?: THREE.Texture
      /** Custom fog that is temporarily set as the scenes fog */
      fog?: Fog | FogExp2
    })
    

    const { fbo, camera, update } = useCubeCamera()</content>
</page>

<page>
  <title>CycleRaycast - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/cycle-raycast</url>
  <content>*   [](https://codesandbox.io/s/ls503)
    
    ###### Raycast cycling
    

This component allows you to cycle through all objects underneath the cursor with optional visual feedback. This can be useful for non-trivial selection, CAD data, housing, everything that has layers. It does this by changing the raycasters filter function and then refreshing the raycaster.

For this to work properly your event handler have to call `event.stopPropagation()`, for instance in `onPointerOver` or `onClick`, only one element can be selective for cycling to make sense.

    <CycleRaycast
      preventDefault={true} // Call event.preventDefault() (default: true)
      scroll={true} // Wheel events (default: true)
      keyCode={9} // Keyboard events (default: 9 [Tab])
      onChanged={(objects, cycle) => console.log(objects, cycle)} // Optional onChanged event
    /></content>
</page>

<page>
  <title>DetectGPU / useDetectGPU - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/detect-gpu-use-detect-gpu</url>
  <content>This hook uses [DetectGPU by @TimvanScherpenzeel](https://github.com/TimvanScherpenzeel/detect-gpu), wrapped into suspense, to determine what tier should be assigned to the user's GPU.

👉 This hook CAN be used outside the @react-three/fiber `Canvas`.

    function App() {
      const GPUTier = useDetectGPU()
      // show a fallback for mobile or lowest tier GPUs
      return (
        {(GPUTier.tier === 0 || GPUTier.isMobile) ? <Fallback /> : <Canvas>...</Canvas>
    
    <Suspense fallback={null}>
      <App /></content>
</page>

<page>
  <title>Example - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/example</url>
  <content>Note

Solely for [`CONTRIBUTING`](https://drei.docs.pmnd.rs/misc/CONTRIBUTING#example) purposes

A "counter" example.

    <Example font="/Inter_Bold.json" />
    

    type ExampleProps = {
      font: string
      color?: Color
      debug?: boolean
      bevelSize?: number
    }
    

Ref-api:

    const api = useRef<ExampleApi>()
    
    <Example ref={api} font="/Inter_Bold.json" />
    

    type ExampleApi = {
      incr: (x?: number) => void
      decr: (x?: number) => void
    }
    

[src/core/Example.tsx](https://github.com/pmndrs/drei/tree/master/src/core/Example.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/misc/example.mdx)

Previous

[DetectGPU / useDetectGPU](https://drei.docs.pmnd.rs/misc/detect-gpu-use-detect-gpu)

Next

[FaceLandmarker](https://drei.docs.pmnd.rs/misc/face-landmarker)</content>
</page>

<page>
  <title>FaceLandmarker - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/face-landmarker</url>
  <content>A @mediapipe/tasks-vision [`FaceLandmarker`](https://developers.google.com/mediapipe/api/solutions/js/tasks-vision.facelandmarker) provider, as well as a `useFaceLandmarker` hook.

    <FaceLandmarker>{/* ... */}</FaceLandmarker>
    

It will instanciate a FaceLandmarker object with the following defaults:

    {
      basePath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@x.y.z/wasm", // x.y.z will value the @mediapipe/tasks-vision version, eg: 0.10.2
      options: {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        outputFacialTransformationMatrixes: true,
      }
    }
    

You can override defaults, like for example self-host tasks-vision's `wasm/` and `face_landmarker.task` model in you `public/` directory:

    $ ln -s ../node_modules/@mediapipe/tasks-vision/wasm/ public/tasks-vision-wasm
    $ curl https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task -o public/face_landmarker.task
    

    import { FaceLandmarkerDefaults } from '@react-three/drei'
    
    const visionBasePath = new URL("/tasks-vision-wasm", import.meta.url).toString()
    const modelAssetPath = new URL("/face_landmarker.task", import.meta.url).toString()
    
    const faceLandmarkerOptions = { ...FaceLandmarkerDefaults.options };
    faceLandmarkerOptions.baseOptions.modelAssetPath = modelAssetPath;
    
    <FaceLandmarker basePath={visionBasePath} options={faceLandmarkerOptions}>
    

[

instance
--------

](#instance)

You can get the FaceLandmarker instance through `ref`:

    const faceLandmarkerRef = useRef<ComponentRef<typeof FaceLandmarker>>(null)
    
    <FaceLandmarker ref={faceLandmarkerRef}>
      {/* ... */}
    </FaceLandmarker>
    

or using `useFaceLandmarker()` from a descendant component:

    const faceLandmarker = useFaceLandmarker()</content>
</page>

<page>
  <title>Fbo / useFBO - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/fbo-use-fbo</url>
  <content>Creates a `THREE.WebGLRenderTarget`.

    type FBOSettings = {
      /** Defines the count of MSAA samples. Can only be used with WebGL 2. Default: 0 */
      samples?: number
      /** If set, the scene depth will be rendered into buffer.depthTexture. Default: false */
      depth?: boolean
    } & THREE.RenderTargetOptions
    
    export function useFBO(
      /** Width in pixels, or settings (will render fullscreen by default) */
      width?: number | FBOSettings,
      /** Height in pixels */
      height?: number,
      /**Settings */
      settings?: FBOSettings
    ): THREE.WebGLRenderTarget {
    

    const target = useFBO({ stencilBuffer: false })
    

The rendertarget is automatically disposed when unmounted.</content>
</page>

<page>
  <title>Html - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/html</url>
  <content>*   [](https://codesandbox.io/s/0n9it)
    
    ###### The three graces
    
*   [](https://codesandbox.io/s/qyz5r)
    
    ###### Bouncy watch
    
*   [](https://codesandbox.io/s/9keg6)
    
    ###### Mixing HTML and WebGL w/ occlusion
    
*   [](https://codesandbox.io/s/6oei7)
    
    ###### HTML Markers
    
*   [](https://codesandbox.io/s/wp9mkp)
    
    ###### Occluded HTML (forked)
    

Allows you to tie HTML content to any object of your scene. It will be projected to the objects whereabouts automatically.

    <Html
      as='div' // Wrapping element (default: 'div')
      wrapperClass // The className of the wrapping element (default: undefined)
      prepend // Project content behind the canvas (default: false)
      center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
      fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
      distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
      zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
      portal={domnodeRef} // Reference to target container (default=undefined)
      transform // If true, applies matrix3d transformations (default=false)
      sprite // Renders as sprite, but only in transform mode (default=false)
      calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
      occlude={[ref]} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
      onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
      {...groupProps} // All THREE.Group props are valid
      {...divProps} // All HTMLDivElement props are valid
    >
      <h1>hello</h1>
      <Grid cols={4}>world</Grid>
    </Html>
    

Html can hide behind geometry using the `occlude` prop.

When the Html object hides it sets the opacity prop on the innermost div. If you want to animate or control the transition yourself then you can use `onOcclude`.

    const [hidden, set] = useState()
    
    <Html
      occlude
      onOcclude={set}
      style={{
        transition: 'all 0.5s',
        opacity: hidden ? 0 : 1,
        transform: `scale(${hidden ? 0.5 : 1})`
      }}
    />
    

**Blending occlusion**

Html can hide behind geometry as if it was part of the 3D scene using this mode. It can be enabled by using `"blending"` as the `occlude` prop.

    // Enable real occlusion
    <Html occlude="blending" />
    

You can also give HTML material properties using the `material` prop.

    <Html
      occlude
      material={
        <meshPhysicalMaterial
          side={DoubleSide} // Required
          opacity={0.1} // Degree of influence of lighting on the HTML
          ... // Any other material properties
        />
      }
    />
    

Enable shadows using the `castShadow` and `recieveShadow` prop.

> Note: Shadows only work with a custom material. Shadows will not work with `meshBasicMaterial` and `shaderMaterial` by default.

    <Html
      occlude
      castShadow // Make HTML cast a shadow
      receiveShadow // Make HTML receive shadows
      material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} />}
    />
    

> Note: Html 'blending' mode only correctly occludes rectangular HTML elements by default. Use the `geometry` prop to swap the backing geometry to a custom one if your Html has a different shape.

If transform mode is enabled, the dimensions of the rendered html will depend on the position relative to the camera, the camera fov and the distanceFactor. For example, an Html component placed at (0,0,0) and with a distanceFactor of 10, rendered inside a scene with a perspective camera positioned at (0,0,2.45) and a FOV of 75, will have the same dimensions as a "plain" html element like in [this example](https://codesandbox.io/s/drei-html-magic-number-6mzt6m).

A caveat of transform mode is that on some devices and browsers, the rendered html may appear blurry, as discussed in [#859](https://github.com/pmndrs/drei/issues/859). The issue can be at least mitigated by scaling down the Html parent and scaling up the html children:

    <Html transform scale={0.5}>
      <div style={{ transform: 'scale(2)' }}>Some text</div>
    </Html></content>
</page>

<page>
  <title>Select - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/select</url>
  <content>*   [](https://codesandbox.io/s/ny3p4)
    
    ###### Multi-select & edges
    

    type Props = {
      /** Allow multi select, default: false */
      multiple?: boolean
      /** Allow box select, default: false */
      box?: boolean
      /** Custom CSS border: default: '1px solid #55aaff' */
      border?: string
      /** Curom CSS color, default: 'rgba(75, 160, 255, 0.1)' */
      backgroundColor?: string
      /** Callback for selection changes */
      onChange?: (selected: THREE.Object3D[]) => void
      /** Callback for selection changes once the pointer is up */
      onChangePointerUp?: (selected: THREE.Object3D[]) => void
      /** Optional filter for filtering the selection */
      filter?: (selected: THREE.Object3D[]) => THREE.Object3D[]
    }
    

This component allows you to select/unselect objects by clicking on them. It keeps track of the currently selected objects and can select multiple objects (with the shift key). Nested components can request the current selection (which is always an array) with the `useSelect` hook. With the `box` prop it will let you shift-box-select objects by holding and draging the cursor over multiple objects. Optionally you can filter the selected items as well as define in which shape they are stored by defining the `filter` prop.

    <Select box multiple onChange={console.log} filter={items => items}>
      <Foo />
      <Bar />
    </Select>
    
    function Foo() {
      const selected = useSelect()</content>
</page>

<page>
  <title>Sprite Animator - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/sprite-animator</url>
  <content>    export type SpriteAnimatorProps = {
      /** The start frame of the animation */
      startFrame?: number
    
      /** The end frame of the animation */
      endFrame?: number
    
      /** The desired frames per second of the animation. If set to 0 or negative, animation will be static */
      fps?: number
    
      /** The animation names of the spritesheet (if the spritesheet -with JSON- contains more animation sequences) */
      animationNames?: Array<string>
    
      /** The frame identifier to use, must be one of animationNames */
      frameName?: string
    
      /** The URL of the texture JSON (if using JSON-Array or JSON-Hash) */
      textureDataURL?: string
    
      /** The URL of the texture image */
      textureImageURL?: string
    
      /** Whether or not the animation should loop */
      loop?: boolean
    
      /** The number of frames of the animation (required if using plain spritesheet without JSON) */
      numberOfFrames?: number
    
      /** Animation auto-start when all assets are loaded */
      autoPlay?: boolean
    
      /** Event callback when the animation starts or restarts */
      onStart?: (data: AnimationEventData) => void
    
      /** Event callback when the animation ends */
      onEnd?: (data: AnimationEventData) => void
    
      /** Event callback when the animation completes a loop cycle */
      onLoopEnd?: (data: AnimationEventData) => void
    
      /** Event callback fired on each frame change */
      onFrame?: (data: AnimationEventData) => void
    
      /** @deprecated Use pause={false} instead. Control when the animation runs */
      play?: boolean
    
      /** Control when the animation pauses */
      pause?: boolean
    
      /** Whether or not the Sprite should flip sides on the x-axis */
      flipX?: boolean
    
      /** Sets the alpha value to be used when running an alpha test
       * @default 0.0
       */
      alphaTest?: number
    
      /** Displays the texture on a Billboard component always facing the camera.
       * @default false
       */
      asSprite?: boolean
    
      /** Allows for manual update of the sprite animation e.g: via ScrollControls.
       * Value should be between 0 and 1
       */
      offset?: number
    
      /** Allows the sprite animation to start from the end towards the start */
      playBackwards?: boolean
    
      /** Allows the animation to be paused after it ended so it can be restarted on demand via autoPlay */
      resetOnEnd?: boolean
    
      /** Array of Vector3-like positions for creating multiple instances of the sprite */
      instanceItems?: (THREE.Vector3 | [number, number, number])[]
    
      /** The maximum number of instances to render (for buffer size calculation)
       * @default 1
       */
      maxItems?: number
    
      /** Pre-parsed sprite data, usually from useSpriteLoader */
      spriteDataset?: {
        spriteTexture: THREE.Texture
        spriteData: SpriteData
      }
    
      /** Configuration options for the canvas context when loading textures */
      canvasRenderingContext2DSettings?: CanvasRenderingContext2DSettings
    
      /** Controls whether frame positions are rounded for precise pixel alignment.
       * Enable this if you notice slight texture bleeding between frames.
       * @default false
       */
      roundFramePosition?: boolean
    
      /** Additional properties to be passed to both mesh and instance components.
       * Only includes safe properties that work across both types.
       * @example { frustumCulled: false, renderOrder: 1 }
       * @see https://threejs.org/docs/#api/en/core/Object3D
       */
      meshProps?: CommonMeshProps
    } & GroupProps
    

The SpriteAnimator component provided by drei is a powerful tool for animating sprites in a simple and efficient manner. It allows you to create sprite animations by cycling through a sequence of frames from a spritesheet image and JSON data.

Notes:

*   The SpriteAnimator component internally uses the useFrame hook from react-three-fiber (r3f) for efficient frame updates and rendering.
*   The sprites (without a JSON file) should contain equal size frames
*   Trimming of spritesheet frames is not yet supported
*   Internally uses the `useSpriteLoader` or can use data from it directly (which is the recommended way of loading assets)

    <SpriteAnimator
      position={[-3.5, -2.0, 2.5]}
      startFrame={0}
      meshProps={{ frustumCulled: false, scale: 2.5 }}
      autoPlay={true}
      loop={true}
      numberOfFrames={16}
      textureImageURL={'./alien.png'}
    />
    

Load sprite textures via `useSpriteLoader`

    const { spriteObj: statics } = useSpriteLoader('/statics.png', '/statics.json', ['heart', 'skull', 'sword'], null)
    
    <SpriteAnimator
      position={[2, 2.8, 0.01]}
      fps={0}
      meshProps={{ frustumCulled: false, scale: 2.5 }}
      autoPlay={true}
      loop={true}
      flipX={false}
      startFrame={0}
      frameName={'sword'}
      spriteDataset={statics}
      asSprite={false}
      alphaTest={0.01}
    />
    
    

`ScrollControls` example

    ;<ScrollControls damping={0.2} maxSpeed={0.5} pages={2}>
      <SpriteAnimator
        position={[0.0, -1.5, -1.5]}
        startFrame={0}
        onEnd={doSomethingOnEnd}
        onStart={doSomethingOnStart}
        autoPlay={true}
        textureImageURL={'sprite.png'}
        textureDataURL={'sprite.json'}
      >
        <FireScroll />
      </SpriteAnimator>
    </ScrollControls>
    
    function FireScroll() {
      const sprite = useSpriteAnimator()
      const scroll = useScroll()
      const ref = React.useRef()
      useFrame(() => {
        if (sprite && scroll) {
          sprite.current = scroll.offset
        }
      })
    
      return null
    }</content>
</page>

<page>
  <title>StatsGl - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/stats-gl</url>
  <content>Adds [stats-gl](https://github.com/RenaudRohlinger/stats-gl/) to document.body. It takes over the render-loop!

    <StatsGl className="stats" {...props} /></content>
</page>

<page>
  <title>Stats - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/stats</url>
  <content>Adds [stats](https://github.com/mrdoob/stats.js/) to document.body. It takes over the render-loop!

    <Stats showPanel={0} className="stats" {...props} />
    

You can choose to mount Stats to a different DOM Element - for example, for custom styling:

    const node = useRef(document.createElement('div'))
    
    useEffect(() => {
      node.current.id = 'test'
      document.body.appendChild(node.current)
    
      return () => document.body.removeChild(node.current)
    }, [])
    
    return <Stats parent={parent} /></content>
</page>

<page>
  <title>Trail / useTrail - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/trail-use-trail</url>
  <content>A hook to obtain an array of points that make up a [Trail](#trail). You can use this array to drive your own `MeshLine` or make a trail out of anything you please.

Note: The hook returns a ref (`RefObject<Vector3[]>`) this means updates to it will not trigger a re-draw, thus keeping this cheap.

    const points = useTrail(
      target, // Required target object. This object will produce the trail.
      {
        length, // Length of the line
        decay, // How fast the line fades away
        local, // Wether to use the target's world or local positions
        stride, // Min distance between previous and current point
        interval, // Number of frames to wait before next calculation
      }
    )
    
    // To use...
    useFrame(() => {
      meshLineRef.current.position.setPoints(points.current)
    })</content>
</page>

<page>
  <title>useAspect - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-aspect</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

This hook calculates aspect ratios (for now only what in css would be `image-size: cover` is supported). You can use it to make an image fill the screen. It is responsive and adapts to viewport resize. Just give the hook the image bounds in pixels. It returns an array: `[width, height, 1]`.

    const scale = useAspect(
      1024,                     // Pixel-width
      512,                      // Pixel-height
      1                         // Optional scaling factor
    )
    return (
      <mesh scale={scale}>
        <planeGeometry />
        <meshBasicMaterial map={imageTexture} />
    

[src/core/useAspect.tsx](https://github.com/pmndrs/drei/tree/master/src/core/useAspect.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/misc/use-aspect.mdx)

Previous

[Trail / useTrail](https://drei.docs.pmnd.rs/misc/trail-use-trail)

Next

[useBoxProjectedEnv](https://drei.docs.pmnd.rs/misc/use-box-projected-env)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
    *   [CubeCamera / useCubeCamera](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    *   [CycleRaycast](https://drei.docs.pmnd.rs/misc/cycle-raycast)
    *   [DetectGPU / useDetectGPU](https://drei.docs.pmnd.rs/misc/detect-gpu-use-detect-gpu)
    *   [Example](https://drei.docs.pmnd.rs/misc/example)
    *   [FaceLandmarker](https://drei.docs.pmnd.rs/misc/face-landmarker)
    *   [Fbo / useFBO](https://drei.docs.pmnd.rs/misc/fbo-use-fbo)
    *   [Html](https://drei.docs.pmnd.rs/misc/html)
    *   [Select](https://drei.docs.pmnd.rs/misc/select)
    *   [Sprite Animator](https://drei.docs.pmnd.rs/misc/sprite-animator)
    *   [StatsGl](https://drei.docs.pmnd.rs/misc/stats-gl)
    *   [Stats](https://drei.docs.pmnd.rs/misc/stats)
    *   [Trail / useTrail](https://drei.docs.pmnd.rs/misc/trail-use-trail)
    *   [useAspect](https://drei.docs.pmnd.rs/misc/use-aspect)
    *   [useBoxProjectedEnv](https://drei.docs.pmnd.rs/misc/use-box-projected-env)
    *   [useCamera](https://drei.docs.pmnd.rs/misc/use-camera)
    *   [useContextBridge](https://drei.docs.pmnd.rs/misc/use-context-bridge)
    *   [useCursor](https://drei.docs.pmnd.rs/misc/use-cursor)
    *   [useDepthBuffer](https://drei.docs.pmnd.rs/misc/use-depth-buffer)
    *   [useIntersect](https://drei.docs.pmnd.rs/misc/use-intersect)
    *   [useSurfaceSampler](https://drei.docs.pmnd.rs/misc/use-surface-sampler)
    *   [Wireframe](https://drei.docs.pmnd.rs/misc/wireframe)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>useCamera - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-camera</url>
  <content>*   [](https://codesandbox.io/s/py4db)
    
    ###### Viewcube
    

A hook for the rare case when you are using non-default cameras for heads-up-displays or portals, and you need events/raytracing to function properly (raycasting uses the default camera otherwise).

    <mesh raycast={useCamera(customCamera)} /></content>
</page>

<page>
  <title>useBoxProjectedEnv - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-box-projected-env</url>
  <content>*   [](https://codesandbox.io/s/s006f)
    
    ###### Sport hall
    

The cheapest possible way of getting reflections in threejs. This will box-project the current environment map onto a plane. It returns an object that you need to spread over its material. The spread object contains a ref, onBeforeCompile and customProgramCacheKey. If you combine it with drei/CubeCamera you can "film" a single frame of the environment and feed it to the material, thereby getting realistic reflections at no cost. Align it with the position and scale properties.

    const projection = useBoxProjectedEnv(
      [0, 0, 0], // Position
      [1, 1, 1] // Scale
    )
    
    <CubeCamera frames={1}>
      {(texture) => (
        <mesh>
          <planeGeometry />
          <meshStandardMaterial envMap={texture} {...projection} />
        </mesh>
      )}
    </CubeCamera></content>
</page>

<page>
  <title>useContextBridge - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-context-bridge</url>
  <content>Allows you to forward contexts provided above the `<Canvas />` to be consumed from within the `<Canvas />` normally

    function SceneWrapper() {
      // bridge any number of contexts
      // Note: These contexts must be provided by something above this SceneWrapper component
      //       You cannot render the providers for these contexts inside this component
      const ContextBridge = useContextBridge(ThemeContext, GreetingContext)
      return (
        <Canvas>
          <ContextBridge>
            <Scene />
          </ContextBridge>
        </Canvas>
      )
    }
    
    function Scene() {
      // we can now consume a context within the Canvas
      const theme = React.useContext(ThemeContext)
      const greeting = React.useContext(GreetingContext)
      return (
        //...
      )
    }</content>
</page>

<page>
  <title>useCursor - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-cursor</url>
  <content>A small hook that sets the css body cursor according to the hover state of a mesh, so that you can give the user visual feedback when the mouse enters a shape. Arguments 1 and 2 determine the style, the defaults are: onPointerOver = 'pointer', onPointerOut = 'auto'.

    const [hovered, set] = useState()
    useCursor(hovered, /*'pointer', 'auto', document.body*/)
    return (
      <mesh onPointerOver={() => set(true)} onPointerOut={() => set(false)}></content>
</page>

<page>
  <title>useDepthBuffer - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-depth-buffer</url>
  <content>*   [](https://codesandbox.io/s/tx1pq)
    
    ###### Volumetric spotlight
    

Renders the scene into a depth-buffer. Often effects depend on it and this allows you to render a single buffer and share it, which minimizes the performance impact. It returns the buffer's `depthTexture`.

Since this is a rather expensive effect you can limit the amount of frames it renders when your objects are static. For instance making it render only once by setting `frames: 1`.

    const depthBuffer = useDepthBuffer({
      size: 256, // Size of the FBO, 256 by default
      frames: Infinity, // How many frames it renders, Infinity by default
    })
    return <SomethingThatNeedsADepthBuffer depthBuffer={depthBuffer} /></content>
</page>

<page>
  <title>useIntersect - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-intersect</url>
  <content>*   [](https://codesandbox.io/s/gsm1y)
    
    ###### UseIntersect and scrollcontrols
    

A very cheap frustum check that gives you a reference you can observe in order to know if the object has entered the view or is outside of it. This relies on [THREE.Object3D.onBeforeRender](https://threejs.org/docs/#api/en/core/Object3D.onBeforeRender) so it only works on objects that are effectively rendered, like meshes, lines, sprites. It won't work on groups, object3d's, bones, etc.

    const ref = useIntersect((visible) => console.log('object is visible', visible))
    return <mesh ref={ref} />
    

[src/core/useIntersect.tsx](https://github.com/pmndrs/drei/tree/master/src/core/useIntersect.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/misc/use-intersect.mdx)

Previous

[useDepthBuffer](https://drei.docs.pmnd.rs/misc/use-depth-buffer)

Next

[useSurfaceSampler](https://drei.docs.pmnd.rs/misc/use-surface-sampler)</content>
</page>

<page>
  <title>useSurfaceSampler - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/use-surface-sampler</url>
  <content>A hook to obtain the result of the [`<Sampler />`](#sampler) as a buffer. Useful for driving anything other than `InstancedMesh` via the Sampler.

    const buffer = useSurfaceSampler(
      mesh, // Mesh to sample
      count, // [Optional] Number of samples (default: 16)
      transform, // [Optional] Transformation function. Same as in `<Sampler />`
      weight, // [Optional] Same as in `<Sampler />`
      instancedMesh // [Optional] Instanced mesh to scatter
    )</content>
</page>

<page>
  <title>Wireframe - Drei</title>
  <url>https://drei.docs.pmnd.rs/misc/wireframe</url>
  <content>*   [](https://codesandbox.io/s/2572o5)
    
    ###### drei-wireframe-configurator
    

Renders an Antialiased, shader based wireframe on or around a geometry.

    <mesh>
      <geometry />
      <material />
    
      <Wireframe /> // Will apply wireframe on top of existing material on this mesh
    </mesh>
    
    // OR
    <Wireframe
      geometry={geometry | geometryRef} // Will create the wireframe based on input geometry.
    
      // Other props
      simplify={false} // Remove some edges from wireframes
      fill={"#00ff00"} // Color of the inside of the wireframe
      fillMix={0} // Mix between the base color and the Wireframe 'fill'. 0 = base; 1 = wireframe
      fillOpacity={0.25} // Opacity of the inner fill
      stroke={"#ff0000"} // Color of the stroke
      strokeOpacity={1} // Opacity of the stroke
      thickness={0.05} // Thinkness of the lines
      colorBackfaces={false} // Whether to draw lines that are facing away from the camera
      backfaceStroke={"#0000ff"} // Color of the lines that are facing away from the camera
      dashInvert={true} // Invert the dashes
      dash={false} // Whether to draw lines as dashes
      dashRepeats={4} // Number of dashes in one seqment
      dashLength={0.5} // Length of each dash
      squeeze={false} // Narrow the centers of each line segment
      squeezeMin={0.2} // Smallest width to squueze to
      squeezeMax={1} // Largest width to squeeze from
    /></content>
</page>

<page>
  <title>AdaptiveDpr - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/adaptive-dpr</url>
  <content>[dreiDrei](https://drei.docs.pmnd.rs/).[docs](https://docs.pmnd.rs/)

[](https://github.com/pmndrs/drei)[](https://discord.com/channels/740090768164651008/741751532592038022)

Drop this component into your scene and it will cut the pixel-ratio on regress according to the canvas's performance min/max settings. This allows you to temporarily reduce visual quality in exchange for more performance, for instance when the camera moves (look into drei's controls regress flag). Optionally, you can set the canvas to a pixelated filter, which would be even faster.

    <AdaptiveDpr pixelated />
    

[src/core/AdaptiveDpr.tsx](https://github.com/pmndrs/drei/tree/master/src/core/AdaptiveDpr.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/performances/adaptive-dpr.mdx)

Previous

[CurveModifier](https://drei.docs.pmnd.rs/modifiers/curve-modifier)

Next

[AdaptiveEvents](https://drei.docs.pmnd.rs/performances/adaptive-events)

*   [getting started](https://drei.docs.pmnd.rs/getting-started/introduction)
    
*   [abstractions](https://drei.docs.pmnd.rs/abstractions/ascii-renderer)
    
*   [cameras](https://drei.docs.pmnd.rs/cameras/cube-camera)
    
*   [controls](https://drei.docs.pmnd.rs/controls/introduction)
    
*   [gizmos](https://drei.docs.pmnd.rs/gizmos/drag-controls)
    
*   [loaders](https://drei.docs.pmnd.rs/loaders/cube-texture-use-cube-texture)
    
*   [misc](https://drei.docs.pmnd.rs/misc/cube-camera-use-cube-camera)
    
*   [modifiers](https://drei.docs.pmnd.rs/modifiers/curve-modifier)
    
*   [performances](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    
    *   [AdaptiveDpr](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    *   [AdaptiveEvents](https://drei.docs.pmnd.rs/performances/adaptive-events)
    *   [BakeShadows](https://drei.docs.pmnd.rs/performances/bake-shadows)
    *   [Bvh](https://drei.docs.pmnd.rs/performances/bvh)
    *   [Detailed](https://drei.docs.pmnd.rs/performances/detailed)
    *   [Instances](https://drei.docs.pmnd.rs/performances/instances)
    *   [Merged](https://drei.docs.pmnd.rs/performances/merged)
    *   [meshBounds](https://drei.docs.pmnd.rs/performances/mesh-bounds)
    *   [PerformanceMonitor](https://drei.docs.pmnd.rs/performances/performance-monitor)
    *   [Points](https://drei.docs.pmnd.rs/performances/points)
    *   [Preload](https://drei.docs.pmnd.rs/performances/preload)
    *   [Segments](https://drei.docs.pmnd.rs/performances/segments)
    
*   [portals](https://drei.docs.pmnd.rs/portals/fisheye)
    
*   [shaders](https://drei.docs.pmnd.rs/shaders/mesh-discard-material)
    
*   [shapes](https://drei.docs.pmnd.rs/shapes/catmull-rom-line)
    
*   [staging](https://drei.docs.pmnd.rs/staging/accumulative-shadows)</content>
</page>

<page>
  <title>CurveModifier - Drei</title>
  <url>https://drei.docs.pmnd.rs/modifiers/curve-modifier</url>
  <content>Given a curve will replace the children of this component with a mesh that move along said curve calling the property `moveAlongCurve` or modifying the `uniforms.pathOffset` value on the passed ref. Uses [three's Curve Modifier](https://threejs.org/examples/#webgl_modifier_curve)

    const curveRef = useRef<CurveModifierRef>()
    const scroll = useScroll()
    
    const curve = React.useMemo(() => new THREE.CatmullRomCurve3([...handlePos], true, 'centripetal'), [handlePos])
    
    useFrame(() => {
      if (curveRef.current) {
        // Move continuously along the curve
        curveRef.current.moveAlongCurve(0.001)
        
        // Move along the curve using the scrollbar
        curveRef.current.uniforms.pathOffset.value = scroll.offset
      }
    })
    
    return (
      <CurveModifier ref={curveRef} curve={curve}>
        <mesh>
          <boxGeometry args={[10, 10]} />
        </mesh>
      </CurveModifier>
    )
    

[

Reference api
-------------

](#reference-api)

    type CurveModifierRef = {
      curveArray: Curve<any>[];
      curveLengthArray: number[];
      object3D: TMesh;
      splineTexure: DataTexture;
      uniforms: CurveModifierUniforms;
      updateCurve<TCurve extends Curve<any>>(index: number, curve: TCurve): void;
      moveAlongCurve(amount: number): void;
    }
    
    type CurveModifierUniforms = {
      spineTexture: IUniform<DataTexture>;
      pathOffset: INumericUniform;
      pathSegment: INumericUniform;
      spineOffset: INumericUniform;
      spineLength: INumericUniform;
      flow: INumericUniform;
    }</content>
</page>

<page>
  <title>AdaptiveEvents - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/adaptive-events</url>
  <content>Drop this component into your scene and it will switch off the raycaster while the system is in regress.</content>
</page>

<page>
  <title>BakeShadows - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/bake-shadows</url>
  <content>Sets `gl.shadowMap.autoUpdate` to `false` while mounted and requests a single `gl.shadowMap.needsUpdate = true` afterwards. This freezes all shadow maps the moment this component comes in, which makes shadows performant again (with the downside that they are now static). Mount this component in lock-step with your models, for instance by dropping it into the same suspense boundary of a model that loads.

    <Canvas>
      <Suspense fallback={null}>
        <Model />
        <BakeShadows />
    

*   *   [AdaptiveDpr](https://drei.docs.pmnd.rs/performances/adaptive-dpr)
    *   [AdaptiveEvents](https://drei.docs.pmnd.rs/performances/adaptive-events)
    *   [BakeShadows](https://drei.docs.pmnd.rs/performances/bake-shadows)
    *   [Bvh](https://drei.docs.pmnd.rs/performances/bvh)
    *   [Detailed](https://drei.docs.pmnd.rs/performances/detailed)
    *   [Instances](https://drei.docs.pmnd.rs/performances/instances)
    *   [Merged](https://drei.docs.pmnd.rs/performances/merged)
    *   [meshBounds](https://drei.docs.pmnd.rs/performances/mesh-bounds)
    *   [PerformanceMonitor](https://drei.docs.pmnd.rs/performances/performance-monitor)
    *   [Points](https://drei.docs.pmnd.rs/performances/points)
    *   [Preload](https://drei.docs.pmnd.rs/performances/preload)
    *   [Segments](https://drei.docs.pmnd.rs/performances/segments)</content>
</page>

<page>
  <title>Bvh - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/bvh</url>
  <content>An abstraction around [gkjohnson/three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) to speed up raycasting exponentially. Use this component to wrap your scene, a sub-graph, a model or single mesh, and it will automatically compute boundsTree and assign acceleratedRaycast. This component is side-effect free, once unmounted or disabled it will revert to the original raycast.

    export interface BVHOptions {
      /** Split strategy, default: SAH (slowest to construct, fastest runtime, least memory) */
      splitStrategy?: 'CENTER' | 'AVERAGE' | 'SAH'
      /** Print out warnings encountered during tree construction, default: false */
      verbose?: boolean
      /** If true then the bounding box for the geometry is set once the BVH has been constructed, default: true */
      setBoundingBox?: boolean
      /** The maximum depth to allow the tree to build to, default: 40 */
      maxDepth?: number
      /** The number of triangles to aim for in a leaf node, default: 10 */
      maxLeafTris?: number
      /** If false then an index buffer is created if it does not exist and is rearranged */
      /** to hold the bvh structure. If false then a separate buffer is created to store the */
      /** structure and the index buffer (or lack thereof) is retained. This can be used */
      /** when the existing index layout is important or groups are being used so a */
      /** single BVH hierarchy can be created to improve performance. */
      /** default: false */
      /** Note: This setting is experimental */
      indirect?: boolean
    }
    
    export type BvhProps = BVHOptions &
      ThreeElements['group'] & {
        /**Enabled, default: true */
        enabled?: boolean
        /** Use .raycastFirst to retrieve hits which is generally faster, default: false */
        firstHitOnly?: boolean
      }
    

    <Canvas>
      <Bvh firstHitOnly>
        <Scene />
      </Bvh>
    </Canvas></content>
</page>

<page>
  <title>Detailed - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/detailed</url>
  <content>*   [](https://codesandbox.io/s/12nmp)
    
    ###### Re-using geometry and level of detail
    

A wrapper around [THREE.LOD](https://threejs.org/docs/#api/en/objects/LOD) (Level of detail).

    <Detailed distances={[0, 10, 20]} {...props}>
      <mesh geometry={highDetail} />
      <mesh geometry={mediumDetail} />
      <mesh geometry={lowDetail} />
    </Detailed></content>
</page>

<page>
  <title>Instances - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/instances</url>
  <content>*   [](https://codesandbox.io/s/h8o2d)
    
    ###### Floating, instanced shoes.
    
*   [](https://codesandbox.io/s/i6t0j)
    
    ###### Hi-key bubbles
    

A wrapper around [THREE.InstancedMesh](https://threejs.org/docs/#api/en/objects/InstancedMesh). This allows you to define hundreds of thousands of objects in a single draw call, but declaratively!

    <Instances
      limit={1000} // Optional: max amount of items (for calculating buffer size)
      range={1000} // Optional: draw-range
    >
      <boxGeometry />
      <meshStandardMaterial />
      <Instance
        color="red"
        scale={2}
        position={[1, 2, 3]}
        rotation={[Math.PI / 3, 0, 0]}
        onClick={onClick} ... />
      // As many as you want, make them conditional, mount/unmount them, lazy load them, etc ...
    </Instances>
    

You can nest Instances and use relative coordinates!

    <group position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
      <Instance />
    </group>
    

Instances can also receive non-instanced objects, for instance annotations!

    <Instance>
      <Html>hello from the dom</Html>
    </Instance>
    

You can define events on them!

    <Instance onClick={...} onPointerOver={...} />
    

If you need nested, multiple instances in the same parent graph, it would normally not work because an `<Instance>` is directly paired to its nearest `<Instances>` provider. You can use the global `createInstances` helper for such cases, it creates dedicated instances-instance pairs. The first return value is the provider, the second the instance component. Both take the same properties as `<Instances>` and `<Instance>`.

    const [CubeInstances, Cube] = createInstances()
    const [SphereInstances, Sphere] = createInstances()
    
    function App() {
      return (
        <>
          <CubeInstances>
            <boxGeometry />
            <meshStandardMaterial />
            <SphereInstances>
              <sphereGeometry />
              <meshLambertMaterial />
              <Cube position={[1, 2, 3]} />
              <Sphere position={[4, 5, 6]} />
            </SphereInstances>
          </CubeInstances>
        </>
      )
    }
    

If your custom materials need instanced attributes you can create them using the `InstancedAttribute` component. It will automatically create the buffer and update it when the component changes. The `defaultValue` can have any stride, from single floats to arrays.

    <Instances ref={ref} limit={20}>
      <boxGeometry />
      <someSpecialMaterial />
      <InstancedAttribute name="foo" defaultValue={1} />
      <Instance position={[-1.2, 0, 0]} foo={10} />
    </Instances>
    

    # vertex
    attribute float foo;
    varying float vFoo;
    void main() {
      ...
      vFoo = foo;
    
    # fragment
    varying float vFoo;
    void main() {
      ...
    

👉 Note: While creating instances declaratively keeps all the power of components with reduced draw calls, it comes at the cost of CPU overhead. For cases like foliage where you want no CPU overhead with thousands of intances you should use THREE.InstancedMesh such as in this [example](https://codesandbox.io/s/grass-shader-5xho4?file=/src/Grass.js).

[

### Typed Instances

](#typed-instances)

When you need to declare custom attributes for your instances, you can use the `createInstances` helper to type its attributes.

    interface SphereAttributes {
      myCustomAttribute: number
    }
    
    const [SphereInstances, Sphere] = createInstances<SphereAttributes>()
    
    function App() {
      return (
        <>
          <SphereInstances>
            <InstancedAttribute name="myCustomAttribute" defaultValue={1} />
            <sphereGeometry />
            <shaderMaterial
              // will recienve myCustomAttribute as an attribute
              vertexShader={`
                  attribute float myCustomAttribute;
                  void main() {
                    ...
                  }
                `}
            />
            <Sphere
              position={[4, 5, 6]}
              myCustomAttribute={1} // typed
            />
          </SphereInstances>
        </>
      )
    }</content>
</page>

<page>
  <title>Merged - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/merged</url>
  <content>*   [](https://codesandbox.io/s/l900i)
    
    ###### Night train
    

This creates instances for existing meshes and allows you to use them cheaply in the same scene graph. Each type will cost you exactly one draw call, no matter how many you use. `meshes` has to be a collection of pre-existing THREE.Mesh objects.

    <Merged meshes={[box, sphere]}>
      {(Box, Sphere) => (
        <>
          <Box position={[-2, -2, 0]} color="red" />
          <Box position={[-3, -3, 0]} color="tomato" />
          <Sphere scale={0.7} position={[2, 1, 0]} color="green" />
          <Sphere scale={0.7} position={[3, 2, 0]} color="teal" />
        </>
      )}
    </Merged>
    

You may also use object notation, which is good for loaded models.

    function Model({ url }) {
      const { nodes } = useGLTF(url)
      return (
        <Merged meshes={nodes}>
          {({ Screw, Filter, Pipe }) => (
            <>
              <Screw />
              <Filter position={[1, 2, 3]} />
              <Pipe position={[4, 5, 6]} />
            </>
          )}
        </Merged>
      )
    }</content>
</page>

<page>
  <title>meshBounds - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/mesh-bounds</url>
  <content>A very fast, but often good-enough bounds-only raycast for meshes. You can use this if performance has precedence over pointer precision.

    <mesh raycast={meshBounds} /></content>
</page>

<page>
  <title>PerformanceMonitor - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/performance-monitor</url>
  <content>This component will collect the average fps (frames per second) over time. If after a couple of iterations the averages are below or above a threshold it will trigger onIncline and onDecline callbacks that allow you to respond. Typically you would reduce the quality of your scene, the resolution, effects, the amount of stuff to render, or, increase it if you have enough framerate to fill.

Since this would normally cause ping-ponging between the two callbacks you define upper and lower framerate bounds, as long as you stay within that margin nothing will trigger. Ideally your app should find its way into that margin by gradually altering quality.

    type PerformanceMonitorProps = {
      /** How much time in milliseconds to collect an average fps, 250 */
      ms?: number
      /** How many interations of averages to collect, 10 */
      iterations?: number
      /** The percentage of iterations that are matched against the lower and upper bounds, 0.75 */
      threshold?: number
      /** A function that receive the max device refreshrate to determine lower and upper bounds which create a margin where neither incline nor decline should happen, (refreshrate) => (refreshrate > 90 ? [50, 90] : [50, 60]) */
      bounds: (refreshrate: number) => [lower: number, upper: number]
      /** How many times it can inline or decline before onFallback is called, Infinity */
      flipflops?: number
      /** The factor increases and decreases between 0-1, this prop sets the initial value, 0.5 */
      factor?: number
      /** The step that gets added or subtracted to or from the factor on each incline/decline, 0.1 */
      step?: number
      /** When performance is higher than the upper bound (good!) */
      onIncline?: (api: PerformanceMonitorApi) => void
      /** When performance is lower than the upper bound (bad!) */
      onDecline?: (api: PerformanceMonitorApi) => void
      /** Incline and decline will change the factor, this will trigger when that happened */
      onChange?: (api: PerformanceMonitorApi) => void
      /** Called after when the number of flipflops is reached, it indicates instability, use the function to set a fixed baseline */
      onFallback?: (api: PerformanceMonitorApi) => void
      /** Children may use the usePerformanceMonitor hook */
      children?: React.ReactNode
    }
    

All callbacks give you the following data:

    type PerformanceMonitorApi = {
      /** Current fps */
      fps: number
      /** Current performance factor, between 0 and 1 */
      factor: number
      /** Current highest fps, you can use this to determine device refresh rate */
      refreshrate: number
      /** Fps samples taken over time  */
      frames: number[]
      /** Averages of frames taken over n iterations   */
      averages: number[]
    }
    

A simple example for regulating the resolution. It starts out with 1.5, if the system falls below the bounds it goes to 1, if it's fast enough it goes to 2.

    function App() {
      const [dpr, setDpr] = useState(1.5)
      return (
        <Canvas dpr={dpr}>
          <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
    

You can also use the `onChange` callback to get notified when the average changes in whichever direction. This allows you to make gradual changes. It gives you a `factor` between 0 and 1, which is increased by incline and decreased by decline. The `factor` is initially 0.5 by default. If your app starts with lowest defaults and gradually increases quality set `factor` to 0. If it starts with highest defaults and decreases quality, set it to 1. If it starts in the middle and can either increase or decrease, set it to 0.5.

The following starts at the highest dpr (2) and clamps the gradual dpr between 0.5 at the lowest and 2 at the highest. If the app is in trouble it will reduce `factor` by `step` until it is either 0 or the app has found its sweet spot above that.

    const [dpr, setDpr] = useState(2)
    return (
     <Canvas dpr={dpr}>
      <PerformanceMonitor factor={1} onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor, 1))} />
    

If you still experience flip flops despite the bounds you can define a limit of `flipflops`. If it is met `onFallback` will be triggered which typically sets a lowest possible baseline for the app. After the fallback has been called PerformanceMonitor will shut down.

    <PerformanceMonitor flipflops={3} onFallback={() => setDpr(1)} />
    

PerformanceMonitor can also have children, if you wrap your app in it you get to use `usePerformanceMonitor` which allows individual components down the nested tree to respond to performance changes on their own.

    ;<PerformanceMonitor>
      <Effects />
    </PerformanceMonitor>
    
    function Effects() {
      usePerformanceMonitor({ onIncline, onDecline, onFallback, onChange })
      // ...
    }</content>
</page>

<page>
  <title>Points - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/points</url>
  <content>A wrapper around [THREE.Points](https://threejs.org/docs/#api/en/objects/Points). It has the same api and properties as Instances.

    <Points
      limit={1000} // Optional: max amount of items (for calculating buffer size)
      range={1000} // Optional: draw-range
    >
      <pointsMaterial vertexColors />
      <Point position={[1, 2, 3]} color="red" onClick={onClick} onPointerOver={onPointerOver} ... />
      // As many as you want, make them conditional, mount/unmount them, lazy load them, etc ...
    </Points>
    

If you just want to use buffers for position, color and size, you can use the alternative API:

    <Points positions={positionsBuffer} colors={colorsBuffer} sizes={sizesBuffer}>
      <pointsMaterial />
    </Points></content>
</page>

<page>
  <title>Preload - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/preload</url>
  <content>The WebGLRenderer will compile materials only when they hit the frustrum, which can cause jank. This component precompiles the scene using [gl.compile](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.compile) which makes sure that your app is responsive from the get go.

By default gl.compile will only preload visible objects, if you supply the `all` prop, it will circumvent that. With the `scene` and `camera` props you could also use it in portals.

    <Canvas>
      <Suspense fallback={null}>
        <Model />
        <Preload all />
    

[src/core/Preload.tsx](https://github.com/pmndrs/drei/tree/master/src/core/Preload.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/performances/preload.mdx)

Previous

[Points](https://drei.docs.pmnd.rs/performances/points)

Next

[Segments](https://drei.docs.pmnd.rs/performances/segments)</content>
</page>

<page>
  <title>Segments - Drei</title>
  <url>https://drei.docs.pmnd.rs/performances/segments</url>
  <content>A wrapper around [THREE.LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments). This allows you to use thousands of segments under the same geometry.

[

Prop based:
-----------

](#prop-based:)

    <Segments
      limit={1000}
      lineWidth={1.0}
      // All THREE.LineMaterial props are valid
      {...materialProps}
    >
      <Segment start={[0, 0, 0]} end={[0, 10, 0]} color="red" />
      <Segment start={[0, 0, 0]} end={[0, 10, 10]} color={[1, 0, 1]} />
    </Segments>
    

[

Ref based (for fast updates):
-----------------------------

](#ref-based-\(for-fast-updates\):)

    const ref = useRef()
    
    // E.g. to change segment position each frame.
    useFrame(() => {
      ref.current.start.set(0,0,0)
      ref.current.end.set(10,10,0)
      ref.current.color.setRGB(0,0,0)
    })
    // ...
    <Segments
      limit={1000}
      lineWidth={1.0}
    >
      <Segment ref={ref} />
    </Segments></content>
</page>

<page>
  <title>Fisheye - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/fisheye</url>
  <content>*   [](https://codesandbox.io/s/7qytdw)
    
    ###### ThreeJS Journey Lv 1 Fisheye
    

    export type FisheyeProps = ThreeElements['mesh'] & {
      /** Zoom factor, 0..1, 0 */
      zoom?: number
      /** Number of segments, 64 */
      segments?: number
      /** Cubemap resolution (for each of the 6 takes), null === full screen resolution, default: 896 */
      resolution?: number
      /** Children will be projected into the fisheye */
      children: React.ReactNode
      /** Optional render priority, defaults to 1 */
      renderPriority?: number
    }
    

This component will take over system rendering. It portals its children into a cubemap which is then projected onto a sphere. The sphere is rendered out on the screen, filling it. You can lower the resolution to increase performance. Six renders per frame are necessary to construct a full fisheye view, and since each facet of the cubemap only takes a portion of the screen full resolution is not necessary. You can also reduce the amount of segments (resulting in edgier rounds).

    <Canvas camera={{ position: [0, 0, 5] }}>
      <Fisheye>
        <YourScene />
      </Fisheye>
      <OrbitControls /></content>
</page>

<page>
  <title>Hud - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/hud</url>
  <content>*   [](https://codesandbox.io/s/py4db)
    
    ###### Viewcube
    

Renders a heads-up-display (HUD). Each HUD is a scene on top of the previous. That scene is inside a React `createPortal` and is completely isolated, you can have your own cameras in there, environments, etc. The first HUD (`renderpriotity === 1`) will clear the scene and render the default scene, it needs to be the first to execute! Make sure to be explicit about the `renderpriority` of your HUDs.

    type HudProps = {
      /** Any React node */
      children: React.ReactNode
      /** Render priority, default: 1 */
      renderPriority?: number
    }
    

    {
      /* Renders on top of the default scene with a perspective camera */
    }
    ;<Hud>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <mesh>
        <ringGeometry />
      </mesh>
    </Hud>
    
    {
      /* Renders on top of the previous HUD with an orthographic camera */
    }
    ;<Hud renderPriority={2}>
      <OrthographicCamera makeDefault position={[0, 0, 10]} />
      <mesh>
        <boxGeometry />
      </mesh>
    </Hud></content>
</page>

<page>
  <title>Mask - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/mask</url>
  <content>*   [](https://codesandbox.io/s/7n2yru)
    
    ###### Inverted stencil buffer
    
*   [](https://codesandbox.io/s/z3f2mw)
    
    ###### Stencil mask
    

Masks use the stencil buffer to cut out areas of the screen. This is usually cheaper as it doesn't require double renders or createPortal.

    <Mask
      /** Each mask must have an id, you can have compound masks referring to the same id */
      id: number
      /** If colors of the masks own material will leak through, default: false */
      colorWrite?: boolean
      /** If depth  of the masks own material will leak through, default: false */
      depthWrite?: boolean
    />
    

First you need to define a mask, give it the shape that you want.

    <Mask id={1}>
      <planeGeometry />
      <meshBasicMaterial />
    </Mask>
    

Now refer to it with the `useMask` hook and the same id, your content will now be masked out by the geometry defined above.

    const stencil = useMask(1)
    return (
      <mesh>
        <torusKnotGeometry />
        <meshStandardMaterial {...stencil} />
    

You can build compound masks with multiple shapes by re-using an id. You can also use the mask as a normal mesh by providing `colorWrite` and `depthWrite` props.

    <Mask position={[-1, 0, 0]} id={1}>
      <planeGeometry />
      <meshBasicMaterial />
    </Mask>
    <Mask colorWrite depthWrite position={[1, 0, 0]} id={1}>
      <circleGeometry />
      <meshBasicMaterial />
    </Mask>
    

Invert masks individually by providing a 2nd boolean argument to the `useMask` hook.

    const stencil = useMask(1, true)</content>
</page>

<page>
  <title>MeshPortalMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/mesh-portal-material</url>
  <content>*   [](https://codesandbox.io/s/9m4tpc)
    
    ###### Enter portals
    
*   [](https://codesandbox.io/s/qvk72r)
    
    ###### Pass through portals
    
*   [](https://codesandbox.io/s/drc6qg)
    
    ###### Magic box
    
*   [](https://codesandbox.io/s/ik11ln)
    
    ###### Portals
    

    export type PortalProps = ThreeElements['shaderMaterial'] & {
      /** Mix the portals own scene with the world scene, 0 = world scene render,
       *  0.5 = both scenes render, 1 = portal scene renders, defaults to 0 */
      blend?: number
      /** Edge fade blur, 0 = no blur (default) */
      blur?: number
      /** SDF resolution, the smaller the faster is the start-up time (default: 512) */
      resolution?: number
      /** By default portals use relative coordinates, contents are affects by the local matrix transform */
      worldUnits?: boolean
      /** Optional event priority, defaults to 0 */
      eventPriority?: number
      /** Optional render priority, defaults to 0 */
      renderPriority?: number
      /** Optionally diable events inside the portal, defaults to false */
      events?: boolean
    }
    

A material that creates a portal into another scene. It is drawn onto the geometry of the mesh that it is applied to. It uses RenderTexture internally, but counteracts the perspective shift of the texture surface, the portals contents are thereby masked by it but otherwise in the same position as if they were in the original scene.

    <mesh {...props}>
      <planeGeometry />
      <MeshPortalMaterial>
        <mesh>
          <sphereGeometry />
        </mesh>
      </MeshPortalMaterial>
    </mesh>
    

You can optionally fade or blur the edges of the portal by providing a `blur` prop, do not forget to make the material transparent in that case. It uses SDF flood-fill to determine the shape, you can thereby blur any geometry.

    <MeshPortalMaterial transparent blur={0.5}>
    

It is also possible to _enter_ the portal. If blend is 0 your scene will render as usual, if blend is higher it will start to blend the root scene and the portal scene, if blend is 1 it will only render the portal scene. If you put a ref on the material you can transition entering the portal, for instance lerping blend if the camera is close, or on click.

    <MeshPortalMaterial blend={1}></content>
</page>

<page>
  <title>RenderCubeTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/render-cube-texture</url>
  <content>This component allows you to render a live scene into a cubetexture which you can then apply to a material, for instance as an environment map (via the envMap property). The contents of it run inside a portal and are separate from the rest of the canvas, therefore you can have events in there, environment maps, etc.

    export type RenderCubeTextureProps = Omit<ThreeElements['texture'], 'rotation'> & {
      /** Optional stencil buffer, defaults to false */
      stencilBuffer?: boolean
      /** Optional depth buffer, defaults to true */
      depthBuffer?: boolean
      /** Optional generate mipmaps, defaults to false */
      generateMipmaps?: boolean
      /** Optional render priority, defaults to 0 */
      renderPriority?: number
      /** Optional event priority, defaults to 0 */
      eventPriority?: number
      /** Optional frame count, defaults to Infinity. If you set it to 1, it would only render a single frame, etc */
      frames?: number
      /** Optional event compute, defaults to undefined */
      compute?: ComputeFunction
      /** Flip cubemap, see https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLCubeRenderTarget.js */
      flip?: boolean
      /** Cubemap resolution (for each of the 6 takes), null === full screen resolution, default: 896 */
      resolution?: number
      /** Children will be rendered into a portal */
      children: React.ReactNode
      near?: number
      far?: number
      position?: ReactThreeFiber.Vector3
      rotation?: ReactThreeFiber.Euler
      scale?: ReactThreeFiber.Vector3
      quaternion?: ReactThreeFiber.Quaternion
      matrix?: ReactThreeFiber.Matrix4
      matrixAutoUpdate?: boolean
    }
    
    export type RenderCubeTextureApi = {
      scene: THREE.Scene
      fbo: THREE.WebGLCubeRenderTarget
      camera: THREE.CubeCamera
    }
    

    const api = useRef<RenderCubeTextureApi>(null!)
    // ...
    <mesh ref={api}>
      <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial>
          <RenderCubeTexture attach="envMap" flip>
            <mesh /></content>
</page>

<page>
  <title>RenderTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/render-texture</url>
  <content>*   [](https://codesandbox.io/s/0z8i2c)
    
    ###### drei/RenderTexture
    

This component allows you to render a live scene into a texture which you can then apply to a material. The contents of it run inside a portal and are separate from the rest of the canvas, therefore you can have events in there, environment maps, etc.

    type Props = ThreeElements['texture'] & {
      /** Optional width of the texture, defaults to viewport bounds */
      width?: number
      /** Optional height of the texture, defaults to viewport bounds */
      height?: number
      /** Optional fbo samples */
      samples?: number
      /** Optional stencil buffer, defaults to false */
      stencilBuffer?: boolean
      /** Optional depth buffer, defaults to true */
      depthBuffer?: boolean
      /** Optional generate mipmaps, defaults to false */
      generateMipmaps?: boolean
      /** Optional render priority, defaults to 0 */
      renderPriority?: number
      /** Optional event priority, defaults to 0 */
      eventPriority?: number
      /** Optional frame count, defaults to Infinity. If you set it to 1, it would only render a single frame, etc */
      frames?: number
      /** Optional event compute, defaults to undefined */
      compute?: (event: any, state: any, previous: any) => false | undefined
      /** Children will be rendered into a portal */
      children: React.ReactNode
    }
    

    <mesh>
      <planeGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map">
          <mesh /></content>
</page>

<page>
  <title>View - Drei</title>
  <url>https://drei.docs.pmnd.rs/portals/view</url>
  <content>*   [](https://codesandbox.io/s/v5i9wl)
    
    ###### View skissor #2
    
*   [](https://codesandbox.io/s/r9w2ob)
    
    ###### Multiple views with uniform controls
    
*   [](https://codesandbox.io/s/bp6tmc)
    
    ###### View tracking
    
*   [](https://codesandbox.io/s/1wmlew)
    
    ###### View skissor
    

Views use gl.scissor to cut the viewport into segments. You tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to have multiple views with a single, performant canvas. These views will follow their tracking elements, scroll along, resize, etc.

It is advisable to re-connect the event system to a parent that contains both the canvas and the html content. This ensures that both are accessible/selectable and even allows you to mount controls or other deeper integrations into your view.

> Note that `@react-three/fiber` newer than `^8.1.0` is required for `View` to work correctly if the canvas/react three fiber root is not fullscreen. A warning will be logged if drei is used with older versions of `@react-three/fiber`.

    export type ViewProps = {
      /** Root element type, default: div */
      as?: string
      /** CSS id prop */
      id?: string
      /** CSS classname prop */
      className?: string
      /** CSS style prop */
      style?: React.CSSProperties
      /** If the view is visible or not, default: true */
      visible?: boolean
      /** Views take over the render loop, optional render index (1 by default) */
      index?: number
      /** If you know your view is always at the same place set this to 1 to avoid needless getBoundingClientRect overhead */
      frames?: number
      /** The scene to render, if you leave this undefined it will render the default scene */
      children?: React.ReactNode
      /** The tracking element, the view will be cut according to its whereabouts
       * @deprecated You can use inline Views now, see: https://github.com/pmndrs/drei/pull/1784
       */
      track?: React.RefObject<HTMLElement>
    }
    
    export type ViewportProps = { Port: () => React.ReactNode } & React.ForwardRefExoticComponent<
      ViewProps & React.RefAttributes<HTMLElement | THREE.Group>
    >
    

You can define as many views as you like, directly mix them into your dom graph, right where you want them to appear. `View` is an unstyled HTML DOM element (by default a div, and it takes the same properties as one). Use `View.Port` inside the canvas to output them. The canvas should ideally fill the entire screen with absolute positioning, underneath HTML or on top of it, as you prefer.

    return (
      <main ref={container}>
        <h1>Html content here</h1>
        <View style={{ width: 200, height: 200 }}>
          <mesh geometry={foo} />
          <OrbitControls />
        </View>
        <View className="canvas-view">
          <mesh geometry={bar} />
          <CameraControls />
        </View>
        <Canvas eventSource={container}>
          <View.Port />
        </Canvas>
      </main>
    )</content>
</page>

<page>
  <title>MeshDiscardMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-discard-material</url>
  <content>A material that renders nothing. In comparison to `<mesh visible={false}` it can be used to hide objects from the scene while still displays shadows and children.

    <mesh castShadow>
      <torusKnotGeonetry />
      <MeshDiscardMaterial />
      {/* Shadows and edges will show, but the model itself won't */}
      <Edges /></content>
</page>

<page>
  <title>MeshDistortMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-distort-material</url>
  <content>*   [](https://codesandbox.io/s/l03yb)
    
    ###### Gradient textures
    

This material makes your geometry distort following simplex noise.

    <mesh>
      <boxGeometry />
      <MeshDistortMaterial distort={1} speed={10} />
    </mesh></content>
</page>

<page>
  <title>MeshReflectorMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-reflector-material</url>
  <content>*   [](https://codesandbox.io/s/lx2h8)
    
    ###### Image Gallery
    
*   [](https://codesandbox.io/s/l900i)
    
    ###### Night train
    

Easily add reflections and/or blur to any mesh. It takes surface roughness into account for a more realistic effect. This material extends from [THREE.MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) and accepts all its props.

    <mesh>
      <planeGeometry />
      <MeshReflectorMaterial
        blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
        mixBlur={0} // How much blur mixes with surface roughness (default = 1)
        mixStrength={1} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        distortion={1} // Amount of distortion based on the distortionMap texture
        distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh></content>
</page>

<page>
  <title>MeshRefractionMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-refraction-material</url>
  <content>*   [](https://codesandbox.io/s/zqrreo)
    
    ###### Diamond refraction
    

A convincing Glass/Diamond refraction material.

    type MeshRefractionMaterialProps = ThreeElements['shaderMaterial'] & {
      /** Environment map */
      envMap: THREE.CubeTexture | THREE.Texture
      /** Number of ray-cast bounces, it can be expensive to have too many, 2 */
      bounces?: number
      /** Refraction index, 2.4 */
      ior?: number
      /** Fresnel (strip light), 0 */
      fresnel?: number
      /** RGB shift intensity, can be expensive, 0 */
      aberrationStrength?: number
      /** Color, white */
      color?: ReactThreeFiber.Color
      /** If this is on it uses fewer ray casts for the RGB shift sacrificing physical accuracy, true */
      fastChroma?: boolean
    }
    

If you want it to reflect other objects in the scene you best pair it with a cube-camera.

    <CubeCamera>
      {(texture) => (
        <mesh geometry={diamondGeometry} {...props}>
          <MeshRefractionMaterial envMap={texture} />
        </mesh>
      )}
    </CubeCamera>
    

Otherwise just pass it an environment map.

    const texture = useLoader(RGBELoader, "/textures/royal_esplanade_1k.hdr")
    return (
      <mesh geometry={diamondGeometry} {...props}>
        <MeshRefractionMaterial envMap={texture} /></content>
</page>

<page>
  <title>MeshTransmissionMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-transmission-material</url>
  <content>*   [](https://codesandbox.io/s/hmgdjq)
    
    ###### MeshTransmissionMaterial
    

An improved THREE.MeshPhysicalMaterial. It acts like a normal PhysicalMaterial in terms of transmission support, thickness, ior, roughness, etc., but has chromatic aberration, noise-based roughness blur, (primitive) anisotropic blur support, and unlike the original it can "see" other transmissive or transparent objects which leads to improved visuals.

Although it should be faster than MPM keep in mind that it can still be expensive as it causes an additional render pass of the scene. Low samples and low resolution will make it faster. If you use roughness consider using a tiny resolution, for instance 32x32 pixels, it will still look good but perform much faster.

For performance and visual reasons the host mesh gets removed from the render-stack temporarily. If you have other objects that you don't want to see reflected in the material just add them to the parent mesh as children.

    type MeshTransmissionMaterialProps = ThreeElements['meshPhysicalMaterial'] & {
      /* Transmission, default: 1 */
      transmission?: number
      /* Thickness (refraction), default: 0 */
      thickness?: number
      /** Backside thickness (when backside is true), default: 0 */
      backsideThickness?: number
      /* Roughness (blur), default: 0 */
      roughness?: number
      /* Chromatic aberration, default: 0.03 */
      chromaticAberration?: number
      /* Anisotropy, default: 0.1 */
      anisotropicBlur?: number
      /* Distortion, default: 0 */
      distortion?: number
      /* Distortion scale, default: 0.5 */
      distortionScale?: number
      /* Temporal distortion (speed of movement), default: 0.0 */
      temporalDistortion?: number
      /** The scene rendered into a texture (use it to share a texture between materials), default: null  */
      buffer?: THREE.Texture
      /** transmissionSampler, you can use the threejs transmission sampler texture that is
       *  generated once for all transmissive materials. The upside is that it can be faster if you
       *  use multiple MeshPhysical and Transmission materials, the downside is that transmissive materials
       *  using this can't see other transparent or transmissive objects nor do you have control over the
       *  buffer and its resolution, default: false */
      transmissionSampler?: boolean
      /** Render the backside of the material (more cost, better results), default: false */
      backside?: boolean
      /** Resolution of the local buffer, default: undefined (fullscreen) */
      resolution?: number
      /** Resolution of the local buffer for backfaces, default: undefined (fullscreen) */
      backsideResolution?: number
      /** Refraction samples, default: 6 */
      samples?: number
      /** Buffer scene background (can be a texture, a cubetexture or a color), default: null */
      background?: THREE.Texture
    }
    

    return (
      <mesh geometry={geometry} {...props}>
        <MeshTransmissionMaterial />
    

If each material rendering the scene on its own is too expensive you can share a buffer texture. Either by enabling `transmissionSampler` which would use the threejs-internal buffer that MeshPhysicalMaterials use. This might be faster, the downside is that no transmissive material can "see" other transparent or transmissive objects.

    <mesh geometry={torus}>
      <MeshTransmissionMaterial transmissionSampler />
    </mesh>
    <mesh geometry={sphere}>
      <MeshTransmissionMaterial transmissionSampler />
    </mesh>
    

Or, by passing a texture to `buffer` manually, for instance using useFBO.

    const buffer = useFBO()
    useFrame((state) => {
      state.gl.setRenderTarget(buffer)
      state.gl.render(state.scene, state.camera)
      state.gl.setRenderTarget(null)
    })
    return (
      <>
        <mesh geometry={torus}>
          <MeshTransmissionMaterial buffer={buffer.texture} />
        </mesh>
        <mesh geometry={sphere}>
          <MeshTransmissionMaterial buffer={buffer.texture} />
        </mesh>
    

Or a PerspectiveCamera.

    <PerspectiveCamera makeDefault fov={75} position={[10, 0, 15]} resolution={1024}>
      {(texture) => (
        <>
          <mesh geometry={torus}>
            <MeshTransmissionMaterial buffer={texture} />
          </mesh>
          <mesh geometry={sphere}>
            <MeshTransmissionMaterial buffer={texture} />
          </mesh>
        </>
      )}
    

This would mimic the default MeshPhysicalMaterial behaviour, these materials won't "see" one another, but at least they would pick up on everything else, including transmissive or transparent objects.</content>
</page>

<page>
  <title>MeshWobbleMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/mesh-wobble-material</url>
  <content>This material makes your geometry wobble and wave around. It was taken from the [threejs-examples](https://threejs.org/examples/#webgl_materials_modified) and adapted into a self-contained material.

    <mesh>
      <boxGeometry />
      <MeshWobbleMaterial factor={1} speed={10} />
    </mesh></content>
</page>

<page>
  <title>PointMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/point-material</url>
  <content>*   [](https://codesandbox.io/s/eq7sc)
    
    ###### r3f points
    

Antialiased round dots. It takes the same props as regular [THREE.PointsMaterial](https://threejs.org/docs/index.html?q=PointsMaterial#api/en/materials/PointsMaterial) on which it is based.

    <points>
      <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false} />
    </points></content>
</page>

<page>
  <title>shaderMaterial - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/shader-material</url>
  <content>*   [](https://codesandbox.io/s/ni6v4)
    
    ###### ThreeJS Journey Portal
    

Creates a THREE.ShaderMaterial for you with easier handling of uniforms, which are automatically declared as setter/getters on the object and allowed as constructor arguments.

    import { extend } from '@react-three/fiber'
    
    const ColorShiftMaterial = shaderMaterial(
      { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
      // vertex shader
      /*glsl*/`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      // fragment shader
      /*glsl*/`
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
        }
      `
    )
    
    // declaratively
    extend({ ColorShiftMaterial })
    ...
    <mesh>
      <colorShiftMaterial color="hotpink" time={1} />
    </mesh>
    
    // imperatively, all uniforms are available as setter/getters and constructor args
    const material = new ColorShiftMaterial({ color: new THREE.Color("hotpink") })
    material.time = 1
    

`shaderMaterial` attaches a unique `key` property to the prototype class. If you wire it to Reacts own `key` property, you can enable hot-reload.

    import { ColorShiftMaterial } from './ColorShiftMaterial'
    
    extend({ ColorShiftMaterial })
    
    // in your component
    <colorShiftMaterial key={ColorShiftMaterial.key} color="hotpink" time={1} /></content>
</page>

<page>
  <title>SoftShadows - Drei</title>
  <url>https://drei.docs.pmnd.rs/shaders/soft-shadows</url>
  <content>*   [](https://codesandbox.io/s/ykfpwf)
    
    ###### Room with soft shadows
    
*   [](https://codesandbox.io/s/dh2jc)
    
    ###### Soft shadows
    

    type SoftShadowsProps = {
      /** Size of the light source (the larger the softer the light), default: 25 */
      size?: number
      /** Number of samples (more samples less noise but more expensive), default: 10 */
      samples?: number
      /** Depth focus, use it to shift the focal point (where the shadow is the sharpest), default: 0 (the beginning) */
      focus?: number
    }
    

Injects percent closer soft shadows (pcss) into threes shader chunk. Mounting and unmounting this component will lead to all shaders being be re-compiled, although it will only cause overhead if SoftShadows is mounted after the scene has already rendered, if it mounts with everything else in your scene shaders will compile naturally.</content>
</page>

<page>
  <title>CatmullRomLine - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/catmull-rom-line</url>
  <content>Renders a THREE.Line2 using THREE.CatmullRomCurve3 for interpolation.

    <CatmullRomLine
      points={[[0, 0, 0], ...]}       // Array of Points
      closed={false}                  // Default
      curveType="centripetal"         // One of "centripetal" (default), "chordal", or "catmullrom"
      tension={0.5}                   // Default (only applies to "catmullrom" curveType)
      color="black"                   // Default
      lineWidth={1}                   // In pixels (default)
      dashed={false}                  // Default
      vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
      {...lineProps}                  // All THREE.Line2 props are valid
      {...materialProps}              // All THREE.LineMaterial props are valid
    /></content>
</page>

<page>
  <title>CubicBezierLine - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/cubic-bezier-line</url>
  <content>Renders a THREE.Line2 using THREE.CubicBezierCurve3 for interpolation.

    <CubicBezierLine
      start={[0, 0, 0]}               // Starting point
      end={[10, 0, 10]}               // Ending point
      midA={[5, 0, 0]}                // First control point
      midB={[0, 0, 5]}                // Second control point
      color="black"                   // Default
      lineWidth={1}                   // In pixels (default)
      dashed={false}                  // Default
      vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
      {...lineProps}                  // All THREE.Line2 props are valid
      {...materialProps}              // All THREE.LineMaterial props are valid
    /></content>
</page>

<page>
  <title>Facemesh - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/facemesh</url>
  <content>Renders an oriented [MediaPipe face mesh](https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js#handle_and_display_results):

    const faceLandmarkerResult = {
        "faceLandmarks": [
          [
            { "x": 0.5760777592658997, "y": 0.8639070391654968, "z": -0.030997956171631813 },
            { "x": 0.572094738483429, "y": 0.7886289358139038, "z": -0.07189624011516571 },
            // ...
          ],
          // ...
        ],
        "faceBlendshapes": [
          // ...
        ],
        "facialTransformationMatrixes": [
          // ...
        ]
      },
    }
    const points = faceLandmarkerResult.faceLandmarks[0]
    
    <Facemesh points={points} />
    

    export type FacemeshProps = {
      /** an array of 468+ keypoints as returned by google/mediapipe tasks-vision, default: a sample face */
      points?: MediaPipePoints
      /** @deprecated an face object as returned by tensorflow/tfjs-models face-landmarks-detection */
      face?: MediaPipeFaceMesh
      /** constant width of the mesh, default: undefined */
      width?: number
      /** or constant height of the mesh, default: undefined */
      height?: number
      /** or constant depth of the mesh, default: 1 */
      depth?: number
      /** a landmarks tri supposed to be vertical, default: [159, 386, 200] (see: https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection#mediapipe-facemesh-keypoints) */
      verticalTri?: [number, number, number]
      /** a landmark index (to get the position from) or a vec3 to be the origin of the mesh. default: undefined (ie. the bbox center) */
      origin?: number | THREE.Vector3
      /** A facial transformation matrix, as returned by FaceLandmarkerResult.facialTransformationMatrixes (see: https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js#handle_and_display_results) */
      facialTransformationMatrix?: (typeof FacemeshDatas.SAMPLE_FACELANDMARKER_RESULT.facialTransformationMatrixes)[0]
      /** Apply position offset extracted from `facialTransformationMatrix` */
      offset?: boolean
      /** Offset sensitivity factor, less is more sensible */
      offsetScalar?: number
      /** Fface blendshapes, as returned by FaceLandmarkerResult.faceBlendshapes (see: https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js#handle_and_display_results) */
      faceBlendshapes?: (typeof FacemeshDatas.SAMPLE_FACELANDMARKER_RESULT.faceBlendshapes)[0]
      /** whether to enable eyes (nb. `faceBlendshapes` is required for), default: true */
      eyes?: boolean
      /** Force `origin` to be the middle of the 2 eyes (nb. `eyes` is required for), default: false */
      eyesAsOrigin?: boolean
      /** debug mode, default: false */
      debug?: boolean
    }
    

Ref-api:

    const api = useRef<FacemeshApi>()
    
    <Facemesh ref={api} points={points} />
    

    type FacemeshApi = {
      meshRef: React.RefObject<THREE.Mesh>
      outerRef: React.RefObject<THREE.Group>
      eyeRightRef: React.RefObject<FacemeshEyeApi>
      eyeLeftRef: React.RefObject<FacemeshEyeApi>
    }
    

You can for example get face mesh world direction:

    api.meshRef.current.localToWorld(new THREE.Vector3(0, 0, -1))
    

or get L/R iris direction:

    api.eyeRightRef.current.irisDirRef.current.localToWorld(new THREE.Vector3(0, 0, -1))</content>
</page>

<page>
  <title>Line - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/line</url>
  <content>Renders a THREE.Line2 or THREE.LineSegments2 (depending on the value of `segments`).

    <Line
      points={[[0, 0, 0], ...]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
      color="black"                   // Default
      lineWidth={1}                   // In pixels (default)
      segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
      dashed={false}                  // Default
      vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
      {...lineProps}                  // All THREE.Line2 props are valid
      {...materialProps}              // All THREE.LineMaterial props are valid
    /></content>
</page>

<page>
  <title>Mesh - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/mesh</url>
  <content>Short-cuts for a [mesh](https://threejs.org/docs/#api/en/objects/Mesh) with a [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry).

    <Box
      args={[1, 1, 1]}                // Args for the buffer geometry
      {...meshProps}                  // All THREE.Mesh props are valid
    />
    
    // Plane with buffer geometry args
    <Plane args={[2, 2]} />
    
    // Box with color set on the default MeshBasicMaterial
    <Box material-color="hotpink" />
    
    // Sphere with a MeshStandardMaterial
    <Sphere>
      <meshStandardMaterial color="hotpink" />
    </Sphere></content>
</page>

<page>
  <title>QuadraticBezierLine - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/quadratic-bezier-line</url>
  <content>*   [](https://codesandbox.io/s/2ij9u)
    
    ###### Backdrop and cables
    

Renders a THREE.Line2 using THREE.QuadraticBezierCurve3 for interpolation.

    <QuadraticBezierLine
      start={[0, 0, 0]}               // Starting point, can be an array or a vec3
      end={[10, 0, 10]}               // Ending point, can be an array or a vec3
      mid={[5, 0, 5]}                 // Optional control point, can be an array or a vec3
      color="black"                   // Default
      lineWidth={1}                   // In pixels (default)
      dashed={false}                  // Default
      vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
      {...lineProps}                  // All THREE.Line2 props are valid
      {...materialProps}              // All THREE.LineMaterial props are valid
    />
    

You can also update the line runtime.

    const ref = useRef()
    useFrame((state) => {
      ref.current.setPoints(
        [0, 0, 0],
        [10, 0, 0],
        // [5, 0, 0] // Optional: mid-point
      )
    }, [])
    return <QuadraticBezierLine ref={ref} />
    }</content>
</page>

<page>
  <title>RoundedBox - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/rounded-box</url>
  <content>A box buffer geometry with rounded corners, done with extrusion.

    <RoundedBox
      args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
      radius={0.05} // Radius of the rounded corners. Default is 0.05
      smoothness={4} // The number of curve segments. Default is 4
      bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
      creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      {...meshProps} // All THREE.Mesh props are valid
    >
      <meshPhongMaterial color="#f3f3f3" wireframe />
    </RoundedBox></content>
</page>

<page>
  <title>ScreenQuad - Drei</title>
  <url>https://drei.docs.pmnd.rs/shapes/screen-quad</url>
  <content>    <ScreenQuad>
      <myMaterial />
    </ScreenQuad></content>
</page>

<page>
  <title>AccumulativeShadows - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/accumulative-shadows</url>
  <content>*   [](https://codesandbox.io/s/hxcc1x)
    
    ###### Baking soft shadows
    

A planar, Y-up oriented shadow-catcher that can accumulate into soft shadows and has zero performance impact after all frames have accumulated. It can be temporal, it will accumulate over time, or instantaneous, which might be expensive depending on how many frames you render.

You must pair it with lightsources (and scene objects!) that cast shadows, which go into the children slot. Best use it with the `RandomizedLight` component, which jiggles a set of lights around, creating realistic raycast-like shadows and ambient occlusion.

    type AccumulativeShadowsProps = ThreeElements['group'] & {
      /** How many frames it can render, more yields cleaner results but takes more time, 40 */
      frames?: number
      /** If frames === Infinity blend controls the refresh ratio, 100 */
      blend?: number
      /** Can limit the amount of frames rendered if frames === Infinity, usually to get some performance back once a movable scene has settled, Infinity */
      limit?: number
      /** Scale of the plane,  */
      scale?: number
      /** Temporal accumulates shadows over time which is more performant but has a visual regression over instant results, false  */
      temporal?: false
      /** Opacity of the plane, 1 */
      opacity?: number
      /** Discards alpha pixels, 0.65 */
      alphaTest?: number
      /** Shadow color, black */
      color?: string
      /** Colorblend, how much colors turn to black, 0 is black, 2 */
      colorBlend?: number
      /** Buffer resolution, 1024 */
      resolution?: number
      /** Children should be randomized lights shining from different angles to emulate raycasting */
      children?: React.ReactNode
    }
    

    <AccumulativeShadows temporal frames={100} scale={10}>
      <RandomizedLight amount={8} position={[5, 5, -10]} />
    </AccumulativeShadows>
    

[

Reference api
-------------

](#reference-api)

    interface AccumulativeContext {
      /** Returns the plane geometry onto which the shadow is cast */
      getMesh: () => THREE.Mesh<THREE.PlaneGeometry, SoftShadowMaterialProps & THREE.ShaderMaterial>
      /** Resets the buffers, starting from scratch */
      reset: () => void
      /** Updates the lightmap for a number of frames accumulartively */
      update: (frames?: number) => void
      /** Allows children to subscribe. AccumulativeShadows will call child.update() in its own update function */
      setLights: React.Dispatch<React.SetStateAction<AccumulativeLightContext[]>>
    }</content>
</page>

<page>
  <title>Backdrop - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/backdrop</url>
  <content>*   [](https://codesandbox.io/s/8yfnd)
    
    ###### LGL Raytracer (forked)
    

A curved plane, like a studio backdrop. This is for presentational purposes, to break up light and shadows more interestingly.

    <Backdrop
      floor={0.25} // Stretches the floor segment, 0.25 by default
      segments={20} // Mesh-resolution, 20 by default
    >
      <meshStandardMaterial color="#353540" />
    </Backdrop></content>
</page>

<page>
  <title>BBAnchor - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/bb-anchor</url>
  <content>A component using AABB (Axis-aligned bounding boxes) to offset children position by specified multipliers (`anchor` property) on each axis. You can use this component to change children positioning in regard of the parent's bounding box, eg. pinning [Html](#html) component to one of the parent's corners. Multipliers determine the offset value based on the `AABB`'s size:

    childrenAnchor = boundingBoxPosition + (boundingBoxSize * anchor / 2)
    

    <BBAnchor
      anchor // THREE.Vector3 or [number, number, number]
      {...groupProps} // All THREE.Group props are valid
    >
      {children}
    </BBAnchor>
    

For instance, one could want the Html component to be pinned to `positive x`, `positive y`, and `positive z` corner of a [Box](#shapes) object:

    <Box>
      <BBAnchor anchor={[1, 1, 1]}>
        <Html center>
          <span>Hello world!</span>
        </Html>
      </BBAnchor>
    </Box></content>
</page>

<page>
  <title>Bounds - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/bounds</url>
  <content>*   [](https://codesandbox.io/s/rz2g0)
    
    ###### Bounds and makeDefault
    
*   [](https://codesandbox.io/s/42glz0)
    
    ###### Clones
    

Calculates a boundary box and centers the camera accordingly. If you are using camera controls, make sure to pass them the `makeDefault` prop. `fit` fits the current view on first render. `clip` sets the cameras near/far planes. `observe` will trigger on window resize. To control the damping animation, use `maxDuration` to set the animation length in seconds, and `interpolateFunc` to define how the animation changes over time (should be an increasing function in \[0, 1\] interval, `interpolateFunc(0) === 0`, `interpolateFunc(1) === 1`).

    const interpolateFunc = (t: number) => 1 - Math.exp(-5 * t) + 0.007 * t // Matches the default Bounds behavior
    const interpolateFunc1 = (t: number) => -t * t * t + 2 * t * t          // Start smoothly, finish linearly
    const interpolateFunc2 = (t: number) => -t * t * t + t * t + t          // Start linearly, finish smoothly
    
    <Bounds fit clip observe margin={1.2} maxDuration={1} interpolateFunc={interpolateFunc}>
      <mesh />
    </Bounds>
    

The Bounds component also acts as a context provider, use the `useBounds` hook to refresh the bounds, fit the camera, clip near/far planes, go to camera orientations or focus objects. `refresh(object?: THREE.Object3D | THREE.Box3)` will recalculate bounds, since this can be expensive only call it when you know the view has changed. `reset` centers the view. `moveTo` changes the camera position. `lookAt` changes the camera orientation, with the respect to up-vector, if specified. `clip` sets the cameras near/far planes. `fit` centers the view for non-orthographic cameras (same as reset) or zooms the view for orthographic cameras.

    function Foo() {
      const bounds = useBounds()
      useEffect(() => {
        // Calculate scene bounds
        bounds.refresh().clip().fit()
    
        // Or, focus a specific object or box3
        // bounds.refresh(ref.current).clip().fit()
        // bounds.refresh(new THREE.Box3()).clip().fit()
    
        // Or, move the camera to a specific position, and change its orientation
        // bounds.moveTo([0, 10, 10]).lookAt({ target: [5, 5, 0], up: [0, -1, 0] })
    
        // For orthographic cameras, reset has to be used to center the view (fit would only change its zoom to match the bounding box)
        // bounds.refresh().reset().clip().fit()
      }, [...])
    }
    
    <Bounds>
      <Foo />
    </Bounds></content>
</page>

<page>
  <title>CameraShake - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/camera-shake</url>
  <content>*   [](https://codesandbox.io/s/t4l0f)
    
    ###### Camera shake
    
*   [](https://codesandbox.io/s/0ycwe)
    
    ###### Staging and CameraShake
    

A component for applying a configurable camera shake effect. Currently only supports rotational camera shake. Pass a ref to recieve the `ShakeController` API.

If you use shake in combination with controls make sure to set the `makeDefault` prop on your controls, in that case you do not have to pass them via the `controls` prop.

    const config = {
      maxYaw: 0.1, // Max amount camera can yaw in either direction
      maxPitch: 0.1, // Max amount camera can pitch in either direction
      maxRoll: 0.1, // Max amount camera can roll in either direction
      yawFrequency: 0.1, // Frequency of the yaw rotation
      pitchFrequency: 0.1, // Frequency of the pitch rotation
      rollFrequency: 0.1, // Frequency of the roll rotation
      intensity: 1, // initial intensity of the shake
      decay: false, // should the intensity decay over time
      decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
      controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
    }
    
    <CameraShake {...config} />
    

    interface ShakeController {
      getIntensity: () => number
      setIntensity: (val: number) => void
    }</content>
</page>

<page>
  <title>Caustics - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/caustics</url>
  <content>*   [](https://codesandbox.io/s/szj6p7)
    
    ###### Caustics
    
*   [](https://codesandbox.io/s/g7wbe0)
    
    ###### Sandbox Caustics
    

Caustics are swirls of light that appear when light passes through transmissive surfaces. This component uses a raymarching technique to project caustics onto a catcher plane. It is based on [github/N8python/caustics](https://github.com/N8python/caustics).

    type CausticsProps = ThreeElements['group'] & {
      /** How many frames it will render, set it to Infinity for runtime, default: 1 */
      frames?: number
      /** Enables visual cues to help you stage your scene, default: false */
      debug?: boolean
      /** Will display caustics only and skip the models, default: false */
      causticsOnly: boolean
      /** Will include back faces and enable the backsideIOR prop, default: false */
      backside: boolean
      /** The IOR refraction index, default: 1.1 */
      ior?: number
      /** The IOR refraction index for back faces (only available when backside is enabled), default: 1.1 */
      backsideIOR?: number
      /** The texel size, default: 0.3125 */
      worldRadius?: number
      /** Intensity of the prjected caustics, default: 0.05 */
      intensity?: number
      /** Caustics color, default: white */
      color?: ReactThreeFiber.Color
      /** Buffer resolution, default: 2048 */
      resolution?: number
      /** Camera position, it will point towards the contents bounds center, default: [5, 5, 5] */
      lightSource?: [x: number, y: number, z: number] | React.RefObject<THREE.Object3D>
    }
    

It will create a transparent plane that blends the caustics of the objects it receives into your scene. It will only render once and not take resources any longer!

Make sure to use the `debug` flag to help you stage your contents. Like ContactShadows and AccumulativeShadows the plane faces Y up. It is recommended to use [leva](https://github.com/pmndrs/leva) to configue the props above as some can be micro fractional depending on the models (intensity, worldRadius, ior and backsideIOR especially).

    <Caustics debug backside lightSource={[2.5, 5, -2.5]}>
      <Bottle />
      <WineGlass>
    </Caustics>
    

Sometimes you want to combine caustics for even better visuals, or if you want to emulate multiple lightsources. Use the `causticsOnly` flag in such cases and it will use the model inside only for calculations. Since all loaders in Fiber should be cached there is no expense or memory overhead doing this.

    <Caustics backside lightSource={[2.5, 5, -2.5]} >
      <WineGlass />
    </Caustics>
    <Caustics causticsOnly backside lightSource={[-2.5, 5, 2.5]} ior={0.79} worldRadius={0.0124}>
      <WineGlass />
    </Caustics>
    

The light source can either be defined by prop or by reference. Use the latter if you want to control the light source, for instance in order to move or animate it. Runtime caustics with frames set to `Infinity`, a low resolution and no backside can be feasible.

    const lightSource = useRef()
    
    <Caustics frames={Infinity} resolution={256} lightSource={lightSource} >
      <WineGlass />
    </Caustics>
    <object3d ref={lightSource} position={[2.5, 5, -2.5]} /></content>
</page>

<page>
  <title>Center - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/center</url>
  <content>*   [](https://codesandbox.io/s/x6obrb)
    
    ###### Text3D alignment
    
*   [](https://codesandbox.io/s/v8s9ij)
    
    ###### Text3D alignment, new props
    

Calculates a boundary box and centers its children accordingly.

    export type Props = ThreeElements['group'] & {
      top?: boolean
      right?: boolean
      bottom?: boolean
      left?: boolean
      front?: boolean
      back?: boolean
      /** Disable all axes */
      disable?: boolean
      /** Disable x-axis centering */
      disableX?: boolean
      /** Disable y-axis centering */
      disableY?: boolean
      /** Disable z-axis centering */
      disableZ?: boolean
      /** Precision, defaults to true, see https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
      precise?: boolean
      /** Callback, fires in the useLayoutEffect phase, after measurement */
      onCentered?: (props: OnCenterCallbackProps) => void
    }
    

    type OnCenterCallbackProps = {
      /** The next parent above <Center> */
      parent: THREE.Object3D
      /** The outmost container group of the <Center> component */
      container: THREE.Object3D
      width: number
      height: number
      depth: number
      boundingBox: THREE.Box3
      boundingSphere: THREE.Sphere
      center: THREE.Vector3
      verticalAlignment: number
      horizontalAlignment: number
      depthAlignment: number
    }
    

    <Center top left>
      <mesh />
    </Center>
    

Optionally you can define `onCentered` which calls you back when contents have been measured. This would allow you to easily scale to fit. The following for instance fits a model to screen height.

    function ScaledModel() {
      const viewport = useThree((state) => state.viewport)
      return (
        <Center onCentered={({ container, height }) => container.scale.setScalar(viewport.height / height)}>
          <Model />
        </Center></content>
</page>

<page>
  <title>Cloud - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/cloud</url>
  <content>*   [](https://codesandbox.io/s/gwthnh)
    
    ###### Thunder clouds
    
*   [](https://codesandbox.io/s/mbfzf)
    
    ###### Clouds
    

Particle based cloud.

    type CloudsProps = ThreeElements['group'] & {
      /** Optional cloud texture, points to a default hosted on rawcdn.githack */
      texture?: string
      /** Maximum number of segments, default: 200 (make this tight to save memory!) */
      limit?: number
      /** How many segments it renders, default: undefined (all) */
      range?: number
      /** Which material it will override, default: MeshLambertMaterial */
      material?: typeof Material
      /** Frustum culling, default: true */
      frustumCulled?: boolean
    }
    
    type CloudProps = ThreeElements['group'] & {
      /** A seeded random will show the same cloud consistently, default: Math.random() */
      seed?: number
      /** How many segments or particles the cloud will have, default: 20 */
      segments?: number
      /** The box3 bounds of the cloud, default: [5, 1, 1] */
      bounds?: ReactThreeFiber.Vector3
      /** How to arrange segment volume inside the bounds, default: inside (cloud are smaller at the edges) */
      concentrate?: 'random' | 'inside' | 'outside'
      /** The general scale of the segments */
      scale?: ReactThreeFiber.Vector3
      /** The volume/thickness of the segments, default: 6 */
      volume?: number
      /** The smallest volume when distributing clouds, default: 0.25 */
      smallestVolume?: number
      /** An optional function that allows you to distribute points and volumes (overriding all settings), default: null
       *  Both point and volume are factors, point x/y/z can be between -1 and 1, volume between 0 and 1 */
      distribute?: (cloud: CloudState, index: number) => { point: Vector3; volume?: number }
      /** Growth factor for animated clouds (speed > 0), default: 4 */
      growth?: number
      /** Animation factor, default: 0 */
      speed?: number
      /** Camera distance until the segments will fade, default: 10 */
      fade?: number
      /** Opacity, default: 1 */
      opacity?: number
      /** Color, default: white */
      color?: ReactThreeFiber.Color
    }
    

Use the `<Clouds>` provider to glob all clouds into a single, instanced draw call.

    <Clouds material={THREE.MeshBasicMaterial}>
      <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" />
      <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} />
    </Clouds></content>
</page>

<page>
  <title>ContactShadows - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/contact-shadows</url>
  <content>*   [](https://codesandbox.io/s/qxjoj)
    
    ###### Shoe configurator
    

A [contact shadow](https://threejs.org/examples/#webgl_shadow_contact) implementation, facing upwards (positive Y) by default. `scale` can be a positive number or a 2D array `[x: number, y: number]`.

    <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
    

Since this is a rather expensive effect you can limit the amount of frames it renders when your objects are static. For instance making it render only once:

    <ContactShadows frames={1} />
    

[src/core/ContactShadows.tsx](https://github.com/pmndrs/drei/tree/master/src/core/ContactShadows.tsx)

[Edit this page](https://github.com/pmndrs/drei/edit/master/docs/staging/contact-shadows.mdx)

Previous

[Cloud](https://drei.docs.pmnd.rs/staging/cloud)

Next

[Environment](https://drei.docs.pmnd.rs/staging/environment)</content>
</page>

<page>
  <title>Environment - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/environment</url>
  <content>*   [](https://codesandbox.io/s/t4l0f)
    
    ###### Camera shake
    
*   [](https://codesandbox.io/s/mih0lx)
    
    ###### Lamina environment maps
    
*   [](https://codesandbox.io/s/e662p3)
    
    ###### Building dynamic envmaps
    
*   [](https://codesandbox.io/s/lwo219)
    
    ###### Building live envmaps
    
*   [](https://codesandbox.io/s/q48jgy)
    
    ###### Envmap ground projection
    
*   [](https://codesandbox.io/s/0c5hv9)
    
    ###### Ground projected envmaps + lamina
    

Sets up a global cubemap, which affects the default `scene.environment`, and optionally `scene.background`, unless a custom scene has been passed. A selection of [presets](https://drei.docs.pmnd.rs/staging/src/helpers/environment-assets.ts) from [HDRI Haven](https://hdrihaven.com/) are available for convenience.

    <Environment
      background={false} // can be true, false or "only" (which only sets the background) (default: false)
      backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
      backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
      backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
      environmentIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
      environmentRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
      files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
      path="/"
      preset={null}
      scene={undefined} // adds the ability to pass a custom THREE.Scene, can also be a ref
      encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding (default: THREE.sRGBEncoding for an array of files and THREE.LinearEncoding for a single texture)
    />
    

The simplest way to use it is to provide a preset (linking towards common HDRI Haven assets hosted on github). 👉 Note: `preset` property is not meant to be used in production environments and may fail as it relies on CDNs.

Current presets are

*   apartment: 'lebombo\_1k.hdr'
*   city: 'potsdamer\_platz\_1k.hdr'
*   dawn: 'kiara\_1\_dawn\_1k.hdr'
*   forest: 'forest\_slope\_1k.hdr'
*   lobby: 'st\_fagans\_interior\_1k.hdr'
*   night: 'dikhololo\_night\_1k.hdr'
*   park: 'rooitou\_park\_1k.hdr'
*   studio: 'studio\_small\_03\_1k.hdr'
*   sunset: 'venice\_sunset\_1k.hdr'
*   warehouse: 'empty\_warehouse\_01\_1k.hdr'

    <Environment preset="city" />
    

Otherwise use the files property. It will use RGBELoader for \_.hdr, EXRLoader for \_.exr, HDRJPGLoader for [gainmap](https://github.com/MONOGRID/gainmap-js) \_.jpg, GainMapLoader for gainmap \_.webp, CubeTextureLoader for an array of images. Of all these, gainmap has the smallest footprint.

    <Environment files="file.hdr" />
    <Environment files="file.exr" />
    <Environment files="file.jpg" />
    <Environment files={['file.webp', 'file-gainmap.webp', 'file.json']} />
    <Environment files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']} />
    

You can also use [@pmndrs/assets](https://github.com/pmndrs/assets) to easily self host common assets. Always use dynamic imports to avoid making this part of your main bundle.

    import { suspend } from 'suspend-react'
    const city = import('@pmndrs/assets/hdri/city.exr').then((module) => module.default)
    
    <Environment files={suspend(city)} />
    

If you already have a cube texture you can pass it directly:

    <CubeCamera>{(texture) => <Environment map={texture} />}</CubeCamera>
    

If you provide children you can even render a custom environment. It will render the contents into an off-buffer and film a single frame with a cube camera (whose props you can configure: near=1, far=1000, resolution=256).

    <Environment background near={1} far={1000} resolution={256}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </Environment>
    

You can even mix a generic HDRI environment into a custom one with either the `preset` or the `files` prop.

    return (
      <Environment background near={1} far={1000} resolution={256} preset="warehouse">
        <mesh />
    

Declarative environment content can also animate with the `frames` prop, the envmap can be live. Give it a low resolution and this will happen at little cost

    return (
      <Environment frames={Infinity} resolution={256}>
        <Float>
          <mesh />
        </Float>
    

Environment can also be ground projected, that is, put your model on the "ground" within the environment map.

You can provide optional options to configure this projecion.

    <Environment
      ground={{
        height: 15, // Height of the camera that was used to create the env map (Default: 15)
        radius: 60, // Radius of the world. (Default 60)
        scale: 1000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
      }}
    /></content>
</page>

<page>
  <title>Float - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/float</url>
  <content>*   [](https://codesandbox.io/s/2ij9u)
    
    ###### Backdrop and cables
    

This component makes its contents float or hover.

    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh />
    </Float>
    

If you have your frameloop set to `demand`, you can set `autoInvalidate` to `true`. This will ensure the animation will render while it is enabled.

    <Canvas frameloop="demand">
      <Float autoInvalidate>
        <mesh />
      </Float>
    </Canvas></content>
</page>

<page>
  <title>Lightformer - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/lightformer</url>
  <content>*   [](https://codesandbox.io/s/lwo219)
    
    ###### Building live envmaps
    

This component draws flat rectangles, circles or rings, mimicking the look of a light-former. You can set the output `intensity`, which will effect emissiveness once you put it into an HDRI `<Environment>`, where it mostly belong. It will act like a real light without the expense, you can have as many as you want.

    <Environment>
      <Lightformer
        form="rect" // circle | ring | rect (optional, default = rect)
        intensity={1} // power level (optional = 1)
        color="white" // (optional = white)
        scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
        target={[0, 0, 0]} // Target position (optional = undefined)
      /></content>
</page>

<page>
  <title>NormalTexture / useNormalTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/normal-texture-use-normal-texture</url>
  <content>Loads normal textures from this repository: [https://github.com/emmelleppi/normal-maps](https://github.com/emmelleppi/normal-maps)

👉 Note: `useNormalTexture` hook is not meant to be used in production environments as it relies on third-party CDN.

    const [normalMap, url] = useNormalTexture(
      1, // index of the normal texture - https://github.com/emmelleppi/normal-maps/blob/master/normals.json
      // second argument is texture attributes
      {
        offset: [0, 0],
        repeat: [normRepeat, normRepeat],
        anisotropy: 8
      }
    )
    
    return (
      ...
      <meshStandardMaterial normalMap={normalMap} />
      ...
    )</content>
</page>

<page>
  <title>MatcapTexture / useMatcapTexture - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/matcap-texture-use-matcap-texture</url>
  <content>Loads matcap textures from this repository: [https://github.com/emmelleppi/matcaps](https://github.com/emmelleppi/matcaps)

(It is a fork of this repository: [https://github.com/nidorx/matcaps](https://github.com/nidorx/matcaps))

👉 Note: `useMatcapTexture` hook is not meant to be used in production environments as it relies on third-party CDN.

    const [matcap, url] = useMatcapTexture(
     0, // index of the matcap texture https://github.com/emmelleppi/matcaps/blob/master/matcap-list.json
     1024 // size of the texture ( 64, 128, 256, 512, 1024 )
    )
    
    return (
     ...
     <meshMatcapMaterial matcap={matcap} />
     ...
    )
    

👉 You can also use the exact name of the matcap texture, like so:

    const [matcap] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5')
    

👉 Use the `url` to download the texture when you are ready for production!</content>
</page>

<page>
  <title>RandomizedLight - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/randomized-light</url>
  <content>A randomized light that internally runs multiple lights and jiggles them. See below, you would normally pair it with `AccumulativeShadows`. This component is context aware, paired with AccumulativeShadows it will take the number of frames from its parent.

    type RandomizedLightProps = ThreeElements['group'] & {
      /** How many frames it will jiggle the lights, 1.
       *  Frames is context aware, if a provider like AccumulativeShadows exists, frames will be taken from there!  */
      frames?: number
      /** Light position, [0, 0, 0] */
      position?: [x: number, y: number, z: number]
      /** Radius of the jiggle, higher values make softer light, 5 */
      radius?: number
      /** Amount of lights, 8 */
      amount?: number
      /** Light intensity, 1 */
      intensity?: number
      /** Ambient occlusion, lower values mean less AO, hight more, you can mix AO and directional light, 0.5 */
      ambient?: number
      /** If the lights cast shadows, this is true by default */
      castShadow?: boolean
      /** Default shadow bias, 0 */
      bias?: number
      /** Default map size, 512 */
      mapSize?: number
      /** Default size of the shadow camera, 10 */
      size?: number
      /** Default shadow camera near, 0.5 */
      near?: number
      /** Default shadow camera far, 500 */
      far?: number
    }
    

    <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
    

[

Refernce api
------------

](#refernce-api)

    interface AccumulativeLightContext {
      /** Jiggles the lights */
      update: () => void;
    }</content>
</page>

<page>
  <title>Resize - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/resize</url>
  <content>*   [](https://codesandbox.io/s/6yg0i3)
    
    ###### Resize - dyno
    

Calculates a boundary box and scales its children so the highest dimension is constrained by 1. NB: proportions are preserved.

    export type ResizeProps = ThreeElements['group'] & {
      /** constrained by width dimension (x axis), undefined */
      width?: boolean
      /** constrained by height dimension (y axis), undefined */
      height?: boolean
      /** constrained by depth dimension (z axis), undefined */
      depth?: boolean
      /** You can optionally pass the Box3, otherwise will be computed, undefined */
      box3?: THREE.Box3
      /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
      precise?: boolean
    }
    

    <Resize>
      <mesh />
    </Resize>
    

You can also specify the dimension to be constrained by:

    <Resize height>
      <Box args={[70, 40, 20]}>
    </Resize></content>
</page>

<page>
  <title>ShadowAlpha - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/shadow-alpha</url>
  <content>Makes an object's shadow respect its opacity and alphaMap.

    <mesh>
      <geometry />
      <material transparent opacity={0.5} />
    
      <ShadowAlpha
        opacity={undefined} // number. Override the opacity of the shadow.
        alphaMap={undefined} // THREE.Texture. Override the alphaMap of the shadow
      />
    </mesh></content>
</page>

<page>
  <title>Shadow - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/shadow</url>
  <content>A cheap canvas-texture-based circular gradient.

    <Shadow
      color="black"
      colorStop={0}
      opacity={0.5}
      fog={false} // Reacts to fog (default=false)
    /></content>
</page>

<page>
  <title>Sky - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/sky</url>
  <content>*   [](https://codesandbox.io/s/vkgi6)
    
    ###### Minecraft
    

Adds a [sky](https://threejs.org/examples/#webgl_shaders_sky) to your scene.

    <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} {...props} /></content>
</page>

<page>
  <title>Sparkles - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/sparkles</url>
  <content>*   [](https://codesandbox.io/s/0c5hv9)
    
    ###### Ground projected envmaps + lamina
    

Floating, glowing particles.

    <Sparkles
      /** Number of particles (default: 100) */
      count?: number
      /** Speed of particles (default: 1) */
      speed?: number | Float32Array
      /** Opacity of particles (default: 1) */
      opacity?: number | Float32Array
      /** Color of particles (default: 100) */
      color?: THREE.ColorRepresentation | Float32Array
      /** Size of particles (default: randomized between 0 and 1) */
      size?: number | Float32Array
      /** The space the particles occupy (default: 1) */
      scale?: number | [number, number, number] | THREE.Vector3
      /** Movement factor (default: 1) */
      noise?: number | [number, number, number] | THREE.Vector3 | Float32Array
    />
    

Custom shaders are allowed. Sparkles will use the following attributes and uniforms:

    attribute float size;
    attribute float speed;
    attribute float opacity;
    attribute vec3 noise;
    attribute vec3 color;
    

    { "time": 0, "pixelRatio": 1 }</content>
</page>

<page>
  <title>SpotLightShadow - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/spot-light-shadow</url>
  <content>*   [](https://codesandbox.io/s/yyk6gv)
    
    ###### drei-spotlight-shadows
    

A shadow caster that can help cast shadows of different patterns (textures) onto the scene.

    <SpotLight>
      <SpotLightShadow
        distance={0.4} // Distance between the shadow caster and light
        alphaTest={0.5} // Sets the alpha value to be used when running an alpha test. See Material.alphaTest
        scale={1} //  Scale of the shadow caster plane
        map={undefined} // Texture - Pattern of the shadow
        shader={undefined} // Optional shader to run. Lets you add effects to the shadow map. See bellow
        width={512} // Width of the shadow map. The higher the more expnsive
        height={512} // Height of the shadow map. The higher the more expnsive
      />
    </SpotLight>
    

An optional `shader` prop lets you run a custom shader to modify/add effects to your shadow texture. The shader provides the following uniforms and varyings.

| Type | Name | Notes |
| --- | --- | --- |
| `varying vec2` | `vUv` | UVs of the shadow casting plane |
| `uniform sampler2D` | `uShadowMap` | The texture provided to the `map` prop |
| `uniform float` | `uTime` | Current time |

Treat the output of the shader like an alpha map where `1` is opaque and `0` is transparent.

    gl_FragColor = vec4(vec3(1.), 1.); // Opaque
    gl_FragColor = vec4(vec3(0.), 1.); // Transparent</content>
</page>

<page>
  <title>Stage - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/stage</url>
  <content>*   [](https://codesandbox.io/s/57iefg)
    
    ###### Stage presets
    

Creates a "stage" with proper studio lighting, 0/0/0 top-centred, model-shadows, ground-shadows and optional zoom to fit. Make sure to set `makeDefault` on your controls when `adjustCamera` is true!

    type StageProps = {
      /** Lighting setup, default: "rembrandt" */
      preset?:
        | 'rembrandt'
        | 'portrait'
        | 'upfront'
        | 'soft'
        | { main: [x: number, y: number, z: number]; fill: [x: number, y: number, z: number] }
      /** Controls the ground shadows, default: "contact" */
      shadows?: boolean | 'contact' | 'accumulative' | StageShadows
      /** Optionally wraps and thereby centers the models using <Bounds>, can also be a margin, default: true */
      adjustCamera?: boolean | number
      /** The default environment, default: "city" */
      environment?: PresetsType | Partial<EnvironmentProps>
      /** The lighting intensity, default: 0.5 */
      intensity?: number
      /** To adjust centering, default: undefined */
      center?: Partial<CenterProps>
    }
    
    type StageShadows = Partial<AccumulativeShadowsProps> &
      Partial<RandomizedLightProps> &
      Partial<ContactShadowsProps> & {
        type: 'contact' | 'accumulative'
        /** Shadow plane offset, default: 0 */
        offset?: number
        /** Shadow bias, default: -0.0001 */
        bias?: number
        /** Shadow normal bias, default: 0 */
        normalBias?: number
        /** Shadow map size, default: 1024 */
        size?: number
      }
    

By default it gives you contact shadows and auto-centering.

    <Stage adjustCamera intensity={0.5} shadows="contact" environment="city">
      <mesh />
    </Stage>
    

For a little more realistic results enable accumulative shadows, which requires that the canvas, and models, can handle shadows.

    <Canvas shadows>
      <Stage shadows="accumulative">
        <mesh castShadow />
      </Stage>
    </Canvas></content>
</page>

<page>
  <title>SpotLight - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/spot-light</url>
  <content>*   [](https://codesandbox.io/s/tx1pq)
    
    ###### Volumetric spotlight
    
*   [](https://codesandbox.io/s/wdzv4)
    
    ###### Ragdoll physics
    

A Volumetric spotlight.

    <SpotLight
      distance={5}
      angle={0.15}
      attenuation={5}
      anglePower={5} // Diffuse-cone anglePower (default: 5)
    />
    

Optionally you can provide a depth-buffer which converts the spotlight into a soft particle.

    function Foo() {
      const depthBuffer = useDepthBuffer()
      return <SpotLight depthBuffer={depthBuffer} /></content>
</page>

<page>
  <title>Stars - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/stars</url>
  <content>Adds a blinking shader-based starfield to your scene.

    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /></content>
</page>

<page>
  <title>useEnvironment - Drei</title>
  <url>https://drei.docs.pmnd.rs/staging/use-environment</url>
  <content>A convenience hook to load an environment map. The props are the same as on the `<Environment />` component.

    export type EnvironmentLoaderProps = {
      files?: string | string[]
      path?: string
      preset?: PresetsType
      extensions?: (loader: Loader) => void
      encoding?: TextureEncoding
    

You can use it without properties, which will default to px, nx, py, ny, pz, nz as \*.png files inside your /public directory.

    const cubeTexture = useEnvironment()
    

Or you can specificy from where to load the files.

    const presetTexture = useEnvironment({ preset: 'city' })
    const rgbeTexture = useEnvironment({ files: 'model.hdr' })
    const cubeTexture = useEnvironment({ files: ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map((n) => `${n}.png`) })
    

In order to preload you do this:

    useEnvironment.preload({ preset: 'city' })
    useEnvironment.preload({ files: 'model.hdr' })
    useEnvironment.preload({ files: ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map((n) => `${n}.png`) })
    

Keep in mind that preloading [gainmaps](https://github.com/MONOGRID/gainmap-js) is not possible, because their loader requires access to the renderer.

You can also clear your environment map from the cache:

    useEnvironment.clear({ preset: 'city' })
    useEnvironment.clear({ files: 'model.hdr' })
    useEnvironment.clear({ files: ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map((n) => `${n}.png`) })</content>
</page>