import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/index.js'
  },
  plugins: [
    babel({ runtimeHelpers: true }),
    vue()
  ]
}
