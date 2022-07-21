const allowedCors = [
  'kudenikovns.studens.nomorepartiesxyz.ru',
  'api.kudenikovns.studens.nomorepartiesxyz.ru',
  'http://kudenikovns.studens.nomorepartiesxyz.ru',
  'http://api.kudenikovns.studens.nomorepartiesxyz.ru',
  'https://kudenikovns.studens.nomorepartiesxyz.ru',
  'https://api.kudenikovns.studens.nomorepartiesxyz.ru',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
    }
  }
  next();
};
