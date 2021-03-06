// Admin Editing toggle. Make value true to allow editing. false to deny editing.
var allowEditing = true; // true allows editing, false disallows editing. set to true, make changes, set back to false.

var express = require('express');
path = require('path');
http = require('http');
fs = require('fs');
pitems = require('./routes/pitems');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(path.join(__dirname, 'public')));
});

function allowAdmin(req, res, next) {
	if(allowEditing){
		next();
	} else {
		//next(new Error(401)); // not authorized to edit at this time.
		res.statusCode = 401;
		res.send("not authorized. please change the 'allowEditing' variable to true in '/server.js'");
	}
}

app.get('/pitems', pitems.findAll);
app.get('/pitems/:id', pitems.findById);
app.post('/pitems', allowAdmin, pitems.addPitem);
app.put('/pitems/:id', allowAdmin, pitems.updatePitem);
app.delete('/pitems/:id', allowAdmin, pitems.deletePitem);
app.post('/files', allowAdmin, pitems.fileUpload);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
