if (process.env.NODE_ENV === "production") {
  // return prod
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
