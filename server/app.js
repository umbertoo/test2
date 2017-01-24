import express from 'express';
import compression from 'compression';

import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);

import bodyParser from 'body-parser';

import apiRoutes from './routes/api';

const app = express();
app.use(compression());
app.disable('x-powered-by');
app.use(require("webpack-dev-middleware")(compiler, {
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only'

}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/',apiRoutes);

app.get('/*', (req, res)=> {
    res.sendFile('views/index.html', {root: './server/' });
});

app.listen(8080, ()=> {
    console.log('example app listening on port 8080');
});
