import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
  input: 'index.js',
  watch: {
    chokidar: false
  },
  output: [{
    file: 'dist/esm.js',
    format: 'esm',
    sourcemap: true
  }],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    }),
    minify({
      comments: false,
      sourceMap: true
    }),
    resolve({
      // modulesOnly: true, // Default: false
    }),
    commonjs()
  ]
}];
