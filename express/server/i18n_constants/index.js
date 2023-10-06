const config = require("../../config");
const en = require("./en.json");

const getCurrentLanguage = () => {
  switch (config.LANGUAGE) {
    case "en":
      return en;
    default:
      return en;
    // etc...
  }
};

let I18N = getCurrentLanguage();

module.exports = { I18N };
