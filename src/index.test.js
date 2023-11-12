import { test, expect } from "vitest";
import makeModuleEnv from "./index";

test("make-module-env", () => {
  const env = makeModuleEnv(__filename);

  // too lazy to clean the machine-specific paths out of this one... yolo
  expect(env).toMatchInlineSnapshot(`
    {
      "__dirname": "/home/suchipi/Code/make-module-env/src",
      "__filename": "/home/suchipi/Code/make-module-env/src/index.test.js",
      "exports": {},
      "module": Module {
        "children": [],
        "exports": {},
        "filename": "/home/suchipi/Code/make-module-env/src/index.test.js",
        "id": ".",
        "loaded": false,
        "path": ".",
        "paths": [
          "/home/suchipi/Code/make-module-env/src/index.test.js/node_modules",
          "/home/suchipi/Code/make-module-env/src/node_modules",
          "/home/suchipi/Code/make-module-env/node_modules",
          "/home/suchipi/Code/node_modules",
          "/home/suchipi/node_modules",
          "/home/node_modules",
          "/node_modules",
        ],
      },
      "require": [Function],
    }
  `);

  const makeRequireFunction = env.require("./makeRequireFunction");
  expect(typeof makeRequireFunction).toBe("function");
});
