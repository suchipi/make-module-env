import Module from "node:module";

export type ModuleEnv = {
  exports: any;
  require: NodeJS.Require;
  module: Module;
  __filename: string;
  __dirname: string;
};

declare function makeModuleEnv(filename: string): ModuleEnv;

declare const exports: typeof makeModuleEnv & {
  makeModuleEnv: typeof makeModuleEnv;
  default: typeof makeModuleEnv;
};

export { exports as makeModuleEnv };
export default exports;
