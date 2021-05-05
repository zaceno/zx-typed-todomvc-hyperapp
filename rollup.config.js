import { liveServer } from "rollup-plugin-live-server"
import { terser } from "rollup-plugin-terser"
import del from "rollup-plugin-delete"
import resolve from "@rollup/plugin-node-resolve"
import {
    default as html,
    makeHtmlAttributes as attrs,
} from "@rollup/plugin-html"
import postcss from "rollup-plugin-postcss"
const PROD = !process.env.ROLLUP_WATCH
const PUBLIC_PATH = "./"

const htmlTemplate = production => vars => `<!doctype html>
<html ${attrs(vars.attributes.html)}>
	<head>
		<meta charset="utf-8">
		<title>${vars.title}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		${vars.files.js.map(
            f =>
                `<script ${attrs(vars.attributes.script)} src="${
                    vars.publicPath + f.fileName
                }"></script>`
        )}
	</head>
	<body>
		<x id="app" />
	</body>
</html>`

export default {
    input: "src/index.js",
    output: [
        {
            dir: "dist",
            format: "esm",
            entryFileNames: PROD ? "[name]-[hash].js" : "[name].js",
        },
    ],
    plugins: [
        PROD && del({ targets: "dist/*" }), //cleanup dist folder
        resolve(),
        postcss(),
        PROD && terser(),
        html({
            title: "Hyperapp TodoMVC with JSDoc Types",
            publicPath: PUBLIC_PATH,
            template: htmlTemplate(PROD),
        }),
        !PROD && liveServer({ root: "dist/" }),
    ],
    watch: {
        include: ["src/**/*"],
    },
}
