import { Paths } from "swagger-jsdoc";

export const chatPath: Paths = {
  "/api/chat/me": {
    get: {
      tags: ["chat"],
      summary: "Get my chat",
      responses: {
        "200": {
          description: "get my chat successfully",
        },
      },
    },
  },

  "/api/chat/by-contact-name/{name}": {
    get: {
      tags: ["chat"],
      summary: "Get chat by contact name",
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
          description: "get chat by contact name successfully",
        },
      },
    },
  },

  "/api/chat/by-group-name/{name}": {
    get: {
      tags: ["chat"],
      summary: "Get chat by group name",
      parameters: [
        {
          name: "name",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "group name",
          },
        },
      ],
      responses: {
        "200": {
          description: "get chat by group name successfully",
        },
      },
    },
  },
};
