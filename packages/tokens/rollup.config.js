import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

process.env.BABEL_ENV = "production";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "es",
    },
    {
      file: "./dist/index.cjs",
      format: "cjs",
    },
  ],
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: "node_modules/**",
    }),
    terser(),
    json(),
    babel({
      extensions,
      include: ["src/**/*"],
      babelHelpers: "runtime",
      presets: [["react-app", { flow: false, typescript: true }]],
    }),
  ],
};
