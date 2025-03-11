import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    emitCJS: false,
    inlineDependencies: true,
  },
  alias: {
    // Add any aliases if needed
  },
  hooks: {
    'build:done': () => {
      // Any post-build tasks
    },
  },
})
