import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";

const bundle = (config) => ({
	...config,
	input: "lib/butter.ts",
});

export default [
	bundle({
		plugins: [terser(), esbuild()],
		output: [
			{
				file: "dist2/butter.js",
				format: "cjs",
				sourcemap: true,
			},
			{
				file: "dist2/butter.mjs",
				format: "es",
				sourcemap: true,
			},
		],
	}),
	bundle({
		plugins: [dts()],
		output: {
			file: "dist2/butter.d.ts",
			format: "es",
		},
	}),
];
