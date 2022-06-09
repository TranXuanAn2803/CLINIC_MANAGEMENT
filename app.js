const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const checkupRouter = require('./routes/checkup');
const patientRouter = require('./routes/patient');
const diseaseRouter = require('./routes/disease');
const medicineRouter = require('./routes/medicine');
const unitRouter = require('./routes/unit');
const constraintRouter = require('./routes/constraint');

const app = express();

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/'),
  partialsDir: path.join(__dirname, 'views/partials/')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'node_modules/tabulator-tables/dist/css')));
app.use(express.static(path.join(__dirname, 'node_modules/tabulator-tables/dist/js')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/patient', patientRouter);
app.use('/checkup', checkupRouter);
app.use('/disease', diseaseRouter);
app.use('/medicine', medicineRouter);
app.use('/unit', unitRouter);
app.use('/constraint', constraintRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
