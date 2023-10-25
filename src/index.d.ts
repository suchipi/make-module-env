import Module from "node:module";

export type ModuleEnv = {
  exports: any;
  require: NodeJS.Require;
  module: Module;
  __filename: string;
  __dirname: string;
};

export function makeModuleEnv(filename: string): ModuleEnv;
