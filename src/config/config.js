require('dotenv').config();

module.exports = {
  development: {
    MONGODB_URI: process.env.MONGODB_URI_DEV
  },
  test: {
    MONGODB_URI: process.env.MONGODB_URI_TEST
  }
};
