const path = require("path");

module.exports = ({ config }) => {
  // Alternately, for an alias:
  config.resolve.alias = {
    "@/pages": path.resolve(__dirname, "..", "..", "app", "pages"),
    "@/components": path.resolve(__dirname, "..", "..", "app", "components"),
    "@/styles": path.resolve(__dirname, "..", "..", "app", "styles"),
    "@/utils": path.resolve(__dirname, "..", "..", "app", "utils"),
    "@/contexts": path.resolve(__dirname, "..", "..", "app", "contexts"),
    "@/defi": path.resolve(__dirname, "..", "..", "app", "defi"),
    "@/hooks": path.resolve(__dirname, "..", "..", "app", "hooks"),
    "@/stores": path.resolve(__dirname, "..", "..", "app", "stores"),
    "@/types": path.resolve(__dirname, "..", "..", "app", "types"),
  };

  return config;
};
