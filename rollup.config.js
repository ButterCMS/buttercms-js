import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const bundle = (config) => ({
	...config,
	input: "src/index.ts",
	external: ["@storybook/vue3"],
});

export default [
	bundle({
		plugins: [esbuild()],
		output: [
			{
				file: "dist/index.js",
				format: "cjs",
				sourcemap: true,
			},
			{
				file: "dist/index.mjs",
				format: "es",
				sourcemap: true,
			},
		],
	}),
	bundle({
		plugins: [dts()],
		output: {
			file: "dist/index.d.ts",
			format: "es",
		},
	}),
];
