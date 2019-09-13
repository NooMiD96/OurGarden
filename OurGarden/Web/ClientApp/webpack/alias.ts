import * as path from "path";

const getAlias = (): { [key: string]: string } => ({
  "@src": path.resolve("./src"),
  "@core": path.resolve("./src/core"),
  "@components": path.resolve("./src/components"),
  "@antdSvgs": path.resolve("./node_modules/@ant-design/icons/lib/outline"),
  "@projectFolder": path.resolve("../../../"),
  "styles": path.resolve("./src/assets/scss"),
  "indexof": "component-indexof/index",
  "~/component-indexof.js": "component-indexof",
});

export default getAlias;
