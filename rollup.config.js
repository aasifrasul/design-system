// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/design-system.js',
		format: 'es',
	},
	plugins: [resolve(), terser()],
};
