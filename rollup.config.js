import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  input: 'packages/index.js',
  output: [
    {
      file: pkg.main,
      format: 'es',
      // format: 'cjs',
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    terser(),
    vue(),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ],
      // extract: 'css/index.less'
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    })
  ]
}
