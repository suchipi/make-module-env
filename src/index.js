const Module = require("module");
const pathPosix = require("path/posix");
const pathWin32 = require("path/win32");
const makeRequireFunction = require("./makeRequireFunction");

function makeModuleEnv(filename) {
  let pathModuleToUseForDirname;
  if (pathPosix.isAbsolute(filename)) {
    pathModuleToUseForDirname = pathPosix;
  } else if (pathWin32.isAbsolute(filename)) {
    pathModuleToUseForDirname = pathWin32;
  } else {
    throw new Error("makeModuleEnv requires an absolute path");
  }

  const dirname = pathModuleToUseForDirname.dirname(filename);

  const mod = new Module(".", null);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(filename);

  let req;
  if (typeof Module.createRequire === "function") {
    try {
      req = Module.createRequire(filename);
    } catch (err) {
      req = makeRequireFunction(mod);
    }
  } else {
    req = makeRequireFunction(mod);
  }

  req.main = mod;

  const exps = {};
  mod.exports = exps;

  return {
    exports: exps,
    require: req,
    module: mod,
    __filename: filename,
    __dirname: dirname,
  };
}

makeModuleEnv.__esModule = true;
makeModuleEnv.makeModuleEnv = makeModuleEnv;
makeModuleEnv.default = makeModuleEnv;

module.exports = makeModuleEnv;
