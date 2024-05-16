import { Paths } from "swagger-jsdoc";

export const contactPath: Paths = {
  "/api/contact": {
    get: {
      tags: ["contact"],
      summary: "Get all contacts",
      responses: {
        "200": {
          description: "get all contacts successfully",
        },
      },
    },
  },

  "/api/contact/by-order/{order}": {
    get: {
      tags: ["contact"],
      summary: "Get contact by order",
      parameters: [
        {
          name: "order",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: 1,
          },
        },
      ],
      responses: {
        "200": {
          description: "get contact by order successfully",
        },
      },
    },
  },

  "/api/contact/by-name": {
    get: {
      tags: ["contact"],
      summary: "Get contact by name",
      parameters: [
        {
          name: "name",
          in: "query",
          required: true,
          schema: {
            type: "string",
            example: "Sister",
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
