import { Paths } from "swagger-jsdoc";

export const messagePath: Paths = {
  "/api/message/by-phone/{phone}": {
    get: {
      tags: ["message"],
      summary: "Get message by phone number",
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
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "10",
          },
        },
      ],
      responses: {
        "200": {
          description: "get message successfully",
        },
      },
    },
  },

  "/api/message/by-phone": {
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
      parameters: [
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "10",
          },
        },
      ],
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

  "/api/message/by-contact-name/{name}": {
    get: {
      tags: ["message"],
      summary: "Get message by contact name",
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
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "10",
          },
        },
      ],
      responses: {
        "200": {
          description: "get message by contact name successfully",
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

  "/api/message/by-group-name/{name}": {
    get: {
      tags: ["message"],
      summary: "Get message by group name",
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
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "10",
          },
        },
      ],
      responses: {
        "200": {
          description: "get message by group name successfully",
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
