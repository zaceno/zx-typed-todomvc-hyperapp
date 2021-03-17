import pkg from "./package.json"
import { liveServer } from "rollup-plugin-live-server"
import typescript from "rollup-plugin-typescript2"

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "es",
        },
    ],
    plugins: [
        typescript({ typescript: require("typescript") }),
        liveServer({ root: "./public" }),
    ],
    watch: {
        include: ["src/**/*", "typings/**/*.d.ts"],
    },
}
