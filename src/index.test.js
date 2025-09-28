import { test, expect } from "vitest";
import { Path } from "nice-path";
import makeModuleEnv from "./index";

const rootDir = new Path(__dirname, "..").normalize();

test("make-module-env", () => {
  const env = makeModuleEnv(__filename);

  const cleaned = JSON.parse(
    JSON.stringify(env, null, 2).replaceAll(rootDir.toString(), "<rootDir>")
  );

  cleaned.module.paths = cleaned.module.paths
    .filter((somePath) => somePath.startsWith("<rootDir>"))
    .concat("...and some others");

  expect(cleaned).toMatchInlineSnapshot(`
    {
      "__dirname": "<rootDir>/src",
      "__filename": "<rootDir>/src/index.test.js",
      "exports": {},
      "module": {
        "children": [],
        "exports": {},
        "filename": "<rootDir>/src/index.test.js",
        "id": ".",
        "loaded": false,
        "path": ".",
        "paths": [
          "<rootDir>/src/index.test.js/node_modules",
          "<rootDir>/src/node_modules",
          "<rootDir>/node_modules",
          "...and some others",
        ],
      },
    }
  `);

  const makeRequireFunction = env.require("./makeRequireFunction");
  expect(typeof makeRequireFunction).toBe("function");
});

test("with windows-style paths", () => {
  const env = makeModuleEnv("C:\\Users\\suchipi\\blah");

  const cleaned = JSON.parse(
    JSON.stringify(env, null, 2).replaceAll(rootDir.toString(), "<rootDir>")
  );

  cleaned.module.paths = cleaned.module.paths
    .filter((somePath) => somePath.startsWith("<rootDir>"))
    .concat("...and some others");

  expect(cleaned).toMatchInlineSnapshot(`
    {
      "__dirname": "C:\\Users\\suchipi",
      "__filename": "C:\\Users\\suchipi\\blah",
      "exports": {},
      "module": {
        "children": [],
        "exports": {},
        "filename": "C:\\Users\\suchipi\\blah",
        "id": ".",
        "loaded": false,
        "path": ".",
        "paths": [
          "<rootDir>/C:\\Users\\suchipi\\blah/node_modules",
          "<rootDir>/node_modules",
          "...and some others",
        ],
      },
    }
  `);

  // No easy way to test this part without actually being on windows...

  // const makeRequireFunction = env.require("./makeRequireFunction");
  // expect(typeof makeRequireFunction).toBe("function");
});
