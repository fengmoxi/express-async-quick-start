const boom = require('boom');
module.exports = {
    // async/await 异常处理中间件
    asyncMiddleware: fn => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            if (!err.isBoom) {
                return next(boom.badImplementation(err));
            }
            next(err);
        });
    }
};