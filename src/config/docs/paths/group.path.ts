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
                groupName: {
                  type: "string",
                  example: "Group name",
                },
                contactNames: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["friend1", "friend2"],
                },
              },
              required: ["groupName", "contactNames"],
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

  "/api/group/add-participants": {
    post: {
      tags: ["group"],
      summary: "Add participants to group",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                groupName: {
                  type: "string",
                  example: "Group name",
                },
                contactNames: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["friend1", "friend2"],
                },
              },
              required: ["groupName", "contactNames"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "add participants to group successfully",
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
