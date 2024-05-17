import { Paths } from "swagger-jsdoc";

export const messagePath: Paths = {
  "/api/message": {
    post: {
      tags: ["message"],
      summary: "Send message by phone number",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                phone: {
                  type: "string",
                  example: "51777888999",
                },
                message: {
                  type: "string",
                  example: "Hello from documentation",
                },
              },
              required: ["phone", "message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message successfully",
        },
      },
    },
  },

  "/api/message/from-me": {
    get: {
      tags: ["message"],
      summary: "Get messages from me",
      responses: {
        "200": {
          description: "get messages from me successfully",
        },
      },
    },
    post: {
      tags: ["message"],
      summary: "Send message from me",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Hello from documentation",
                },
              },
              required: ["message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message from me successfully",
        },
      },
    },
  },

  "/api/message/by-contact-order": {
    post: {
      tags: ["message"],
      summary: "Send message by contact order",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                order: {
                  type: "number",
                  example: 1,
                },
                message: {
                  type: "string",
                  example: "Hello from documentation",
                },
              },
              required: ["order", "message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message to contact successfully",
        },
      },
    },
  },

  "/api/message/by-contact-name": {
    post: {
      tags: ["message"],
      summary: "Send message by contact name",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Sister",
                },
                message: {
                  type: "string",
                  example: "Hello sister from documentation",
                },
              },
              required: ["name", "message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message by contact name successfully",
        },
      },
    },
  },

  "/api/message/by-group-order": {
    post: {
      tags: ["message"],
      summary: "Send message by group order",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                order: {
                  type: "number",
                  example: 1,
                },
                message: {
                  type: "string",
                  example: "Hello from documentation",
                },
              },
              required: ["order", "message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message to group successfully",
        },
      },
    },
  },

  "/api/message/by-group-name": {
    post: {
      tags: ["message"],
      summary: "Send message by group name",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Family",
                },
                message: {
                  type: "string",
                  example: "Hello from documentation",
                },
              },
              required: ["name", "message"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "send message by group name successfully",
        },
      },
    },
  },
};
