"use strict";

const _ = require("lodash");

function cleanData(data) {
  const newData = _.omit(data, [
    "id",
    "created_by",
    "updated_by",
    "related",
    "created_at", // For Mongo this needs to be createdAt
    "updated_at", // For Mongo this needs to be updatedAt
  ]);

  return newData;
}

module.exports = {
  createData: async (ctx) => {
    let body = ctx.request.body;

    if (body && Array.isArray(body) === true) {
      let result = [];
      for (let i = 0; i < body.length; i++) {
        const data = body[i];
        result.push(
          await strapi.query("file", "upload").create(cleanData(data))
        );
      }
      return result;
    } else if (body && Array.isArray(body) === false) {
      return await strapi.query("file", "upload").create(cleanData(body));
    } else {
      return ctx.badRequest("You must pass an array or object");
    }
  },

  getData: async (ctx) => {
    if (ctx.query.id) {
      let files = strapi.query("file", "upload").find({ id: ctx.query.id });
      return files;
    } else {
      return ctx.badRequest("You must pass in the file IDs you want data on");
    }
  },
};
