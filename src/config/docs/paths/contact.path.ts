import { Paths } from "swagger-jsdoc";

export const contactPath: Paths = {
  "/api/contact/by-name/{name}": {
    get: {
      tags: ["contact"],
      summary: "Get contact by name",
      parameters: [
        {
          name: "name",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "contact name",
          },
        },
      ],
      responses: {
        "200": {
          description: "get contact by name successfully",
        },
      },
    },
  },
};
