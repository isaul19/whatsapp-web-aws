import { Application } from "express";

import swaggerJsDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { messagePath, chatPath, contactPath, groupPath } from "./paths";

const swaggerDefinitionv2: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentation For Whatsapp Web Ts",
    version: "1.0.0",
  },
  paths: {
    ...chatPath,
    ...contactPath,
    ...groupPath,
    ...messagePath,
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition: swaggerDefinitionv2,
  apis: [],
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

export const inicializateDocs = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  console.log(`Documentation is available in '{BASE_URL}/docs'`);
};
