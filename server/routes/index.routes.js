const path = require('path');
const logger = require('../logging/logger');

module.exports = (app) => {
  app.get(['/', '/budget-calculator', '/budget-calculator/*'], (req, res) => {
    logger.debug(req.body);
    res.status(200).sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
};
