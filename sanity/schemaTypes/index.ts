import { type SchemaTypeDefinition } from "sanity";
import { modelType } from "./modelType";
import { postType } from "./postType"; // NEU

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [modelType, postType], // postType hinzugefügt
};
