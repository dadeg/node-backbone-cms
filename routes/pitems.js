var mongo = require('mongodb');

var Server = mongo.Server;
	Db = mongo.Db;
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('pitems', server);

db.open(function(err, db) {
	if(!err) {
		console.log("Connected to pitems db");
		db.collection('pitems', {strict:true}, function(err, collection) {
			if(err) {
				console.log("pitems doesn't exist.");
			}
		});
	}
});

exports.findAll = function(req, res) {
	db.collection('pitems', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Retrieving pitem: ' + id);
	db.collection('pitems', function(err, collection) {
		collection.findOne({'_id':id}, function(err, item) {
			res.send(item);
		});
	});
};

exports.addPitem = function(req, res) {
	var pitem = req.body;
	console.log('Adding pitem: ' + JSON.stringify(pitem));
	db.collection('pitems', function(err, collection) {
		collection.insert(pitem, {safe:true}, function(err, result) {
			if(err) {
				res.send({'error':'An error has occurred.'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updatePitem = function(req, res) {
	var id = req.params.id;
	var pitem = req.body;
	console.log('Updating pitem: ' + id);
	console.log(JSON.stringify(pitem));
	db.collection('pitems', function(err, collection) {
		collection.update({'_id':id}, pitem, {safe:true}, function(err, result) {
			if(err) {
				console.log('Error updating pitem: ' + err);
				res.send({'error':'An error has occurred.'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(pitem);
			}
		});
	});
};

exports.deletePitem = function(req, res) {
	var id = req.params.id;
	console.log('Deleting Pitem: ' + id);
	db.collection('pitems', function(err, collection) {
		collection.remove({'_id':id}, {safe:true}, function(err, result) {
			if(err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);			
			}
		});
	});
};

exports.fileUpload = function (req, res) {
	var data_url = req.files.file.path;
	console.log(data_url);
    fs.rename(req.files.file.path, 'public/imgs/' + req.files.file.originalFilename, function(err){
        if(err) {
            console.log(err);
        } else {
            res.send("file upload successful.");
        }
    });
};
