import { Paths } from "swagger-jsdoc";

export const groupPath: Paths = {
  "/api/group": {
    post: {
      tags: ["group"],
      summary: "Create group",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Group name",
                },
                participantsPhones: {
                  type: "array",
                  items: {
                    type: "number",
                  },
                  example: [51777888999],
                },
              },
              required: ["name", "participantsPhones"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "create group successfully",
        },
      },
    },
  },

  "/api/group/muted-by-name/{name}": {
    post: {
      tags: ["group"],
      summary: "Muted group by name",
      parameters: [
        {
          name: "name",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Group name",
          },
        },
      ],
      responses: {
        "200": {
          description: "muted group by name successfully",
        },
      },
    },
  },

  "/api/group/unmuted-by-name/{name}": {
    post: {
      tags: ["group"],
      summary: "Unmuted group by name",
      parameters: [
        {
          name: "name",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "Group name",
          },
        },
      ],
      responses: {
        "200": {
          description: "unmuted group by name successfully",
        },
      },
    },
  },
};
