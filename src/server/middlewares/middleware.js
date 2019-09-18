import statusCode from '../services/helper/status.code';

export default {
  before(req, res, next) {
    console.log('before all');
    next();
  },
  routeNotFound(req, res) {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    res.status(statusCode.notFound.code).json({
      status: 'error',
      message: `${fullUrl}, ${statusCode.notFound.text}`,
      code: 404,
    });
  },
};
