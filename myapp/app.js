/* return all notes
 create a new and return it
 get a single note by id
 edit a notes title and message
 delete a note*/


const {Note, Store} = require('./notes')


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();





/* Delete a note by id */
app.get('/deletenote/:noteid', function (req, res) {
Store.deleteNote(req.params['noteid'])
res.send(Store.getNotes())
})



/* Edit a notes title and message */
app.get('/editnote/id/:noteid/title/:notetitle/message/:notemessage', function (req, res) {
let editedNote = Store.getNote(req.params['noteid'])
editedNote.title = req.params['notetitle']
editedNote.message = req.params['notemessage']

/* This writenote part doesn't seem to be necessary? */
Store.writeNote(editedNote)

res.send(editedNote)
})








/* Write a new note, and retrieve it from store */
app.get('/newnote/title/:notetitle/message/:notemessage', function (req, res) {
let newestNote = new Note(req.params['notetitle'], req.params['notemessage'])
Store.writeNote(newestNote)
res.send(Store.getNote(newestNote.id))
})


/* Request a specific note by id */
app.get('/getnote/:noteid', function (req, res) {
res.send(Store.getNote(req.params['noteid']))
})

/* Obsolete params use example */
app.get('/users/:userId/books/:bookId', function (req, res) {
res.send(req.params)
})


/* Get all notes */
app.get('/', function (req, res) {
	res.send(Store.getNotes())
})





app.post('/', function (req, res) {
	res.send('Got a POST request')
})

app.put('/user', function (req, res) {
	res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
	res.send('Got a DELETE request at /user')
})


app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'))
app.use(express.static('files'))









// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

