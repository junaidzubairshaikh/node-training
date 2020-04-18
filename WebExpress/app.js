const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const navs = [{ title: 'About', link: '/about' }, { title: 'Books', link: '/books' }, { title: 'Author', link: '/author' }];
const booksRouter = require('./routes/bookRouter')(navs);
const adminRouter = require('./routes/adminRouter')();
const authRouter = require('./routes/authRouter')(navs);

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: 'junaidzubairkhalidbinwaleedroadtariqroadkarachisindhpakistan!!!' }));
require('./config/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views', 'index.html'));
  res.render('index',
    {
      title: 'Home',
      navs,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Server is listening on ${port}`);
});
