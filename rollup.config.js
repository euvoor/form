export default [{
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
}, {
  input: 'src/index.js',
  output: {
    file: 'es/index.js',
    format: 'es',
  },
}]
