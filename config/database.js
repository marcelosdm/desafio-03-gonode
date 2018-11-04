const path = require('path');

module.exports = {
  // url: process.env.DATABASE_URL,
  url: 'mongodb://localhost/desafio03gonode',
  modelsPath: path.resolve('app', 'models'),
};
