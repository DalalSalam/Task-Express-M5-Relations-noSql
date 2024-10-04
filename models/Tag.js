const { model, Schema } = require("mongoose");

const TagSchema = new Schema({
  tageName: String,
});

module.exports = model("Tag", TagSchema);
