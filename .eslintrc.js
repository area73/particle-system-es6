module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "rules": {
    "no-prototype-builtins": 0,
    "no-undef": 0,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "bower_components"],
      }
    }
  },
  "plugins": ["html"]
};
