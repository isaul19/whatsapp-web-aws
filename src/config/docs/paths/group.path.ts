import { Paths } from "swagger-jsdoc";

export const groupPath: Paths = {
  "/api/group/": {
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
};
