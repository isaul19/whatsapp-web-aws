import { Paths } from "swagger-jsdoc";

export const chatPath: Paths = {
  "/api/chat": {
    get: {
      tags: ["chat"],
      summary: "Get all chats",
      responses: {
        "200": {
          description: "get all chats successfully",
        },
      },
    },
  },

  "/api/chat/by-phone/{phone}": {
    get: {
      tags: ["chat"],
      summary: "Get chat by phone",
      parameters: [
        {
          name: "phone",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "51777888999",
          },
        },
      ],
      responses: {
        "200": {
          description: "get chat by phone successfully",
        },
      },
    },
  },
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
};
