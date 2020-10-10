const homeRouter = require('./home');
const accountRouter = require('./account');

function route(app) {
    
    app.use('/account', accountRouter);

    app.use('/', homeRouter);
}
module.exports = route;