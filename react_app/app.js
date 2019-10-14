import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cons from 'consolidate';
import logger from 'morgan';
import webpackDevServer from './webpack/dev-server';
import routes from './routes/routes';

const app = express();
const server = http.createServer(app);

dotenv.config({
    silent: true,
});

//view engine
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');

//include webpack-dev-server for development only
if (process.env.NODE_ENV != 'production'){
    webpackDevServer(app);
}

//logger
app.use(logger('combined'));
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(cookieParser())
    .use(express.static('public'))
    .use(express.static('src'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});


app.use('/', routes);
app.all('*', (req, res) => {
  res.redirect('http://localhost:3000');
});
    

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {},
    });
    //next();
});

//server.listen(3000);
server.on('listening', ()=> {
    console.log('Server is listening on port: 3000');
});

export default app;









