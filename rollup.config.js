import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import terser from "@rollup/plugin-terser";

export default [
	{
		input: "lib/butter.ts",
		plugins: [terser(), esbuild()],
		output: [
			{
				file: "dist/butter.js",
				format: "cjs",
				sourcemap: true
			},
			{
				file: "dist/butter.mjs",
				format: "es",
				sourcemap: true
			},
		]
	},
	{
		input: "lib/butter.d.ts",
		plugins: [dts()],
		output: {
			file: "dist/butter.d.ts",
			format: "es",
		},
	},
];
