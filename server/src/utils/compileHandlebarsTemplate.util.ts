import fs from "fs/promises";
import { compile } from "handlebars";
import path from "path";

import { EmptyObject } from "@/types";

export type CompileHandlebarsTemplateOptions = {
  name: string;
  featureName?: string;
};

async function compileHandlebarsTemplate<Context = EmptyObject>({
  name,
  featureName,
}: CompileHandlebarsTemplateOptions) {
  const finalPath =
    featureName != null
      ? `../router/${featureName}/templates/${name}.handlebars`
      : `../templates/${name}.handlebars`;

  const templatePath = path.join(__dirname, finalPath);
  const template = await fs.readFile(templatePath, { encoding: "utf-8" });
  return compile<Context>(template);
}

export default compileHandlebarsTemplate;
