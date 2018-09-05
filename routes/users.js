var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'users',
});

console.log(connection);

router.post('/', function(req, res, next) {
	connection.query(
		`SELECT * FROM users WHERE username = '${ req.body['username']}' AND password = '${req.body['password']}'`, (error, row, field) => {
			console.log(`error is: ${error}`)
			if (error != null) {
				res.json({ 'success': false, 'message': 'could not connect to database.' });
			} else if ( row.length > 0) {
				res.json({ 'success': true, 'user': row[0] });
			} else {
				res.json({ 'success': false, 'message': 'Username or Password incorrect. Please try again.' });
			}
		});
});

module.exports = router;
