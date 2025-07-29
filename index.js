const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// Models
const Tought = require('./models/Verse')
const User = require('./models/User')

// Routes

const versesRoutes = require('./routes/versesRoutes');

// Controllers 
const VersesController = require('./controllers/VersesController');

// Template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Required so it can accept body parameters
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.use(
    session({
        name: "session",
        secret: "our_little_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
                path: require('path').join(require('os').tmpdir(), 'sessions'),
            
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            httpOnly: true
        }
    })
)

// Flash messages.

app.use(flash())

// Public path
app.use(express.static('public'))

// Set session to response
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
});

app.use('/verses', versesRoutes);

app.get('/', VersesController.showVerses);

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err));