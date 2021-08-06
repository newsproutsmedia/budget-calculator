const path = require('path');
const logger = require('../logging/logger');

module.exports = (app) => {
  app.get(['/', '/budget-calculator', '/budget-calculator/*'], (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });

  app.get('/api/test', (req, res) => {
    logger.debug('This is the "/test" route.');
    res.status(200).send('You\'re connected to the backend!');
  });

  app.post('/api/message', (req, res) => {
    logger.debug(req.body);
    const messageResponse = { message: `POST received! You sent: "${req.body.message}"` };
    res.status(200).send(messageResponse);
  });
};
