module.exports = function(pool) {
	var context = {
		Save: function(key, callback) {
			pool.query('INSERT INTO Flowers SET ?', key, callback);
		},
		Get: function(callback) {
			pool.query("SELECT * FROM Flowers ORDER BY 'dateCreate' DESC LIMIT 30", callback);
		},
		SaveChange: function (key, callback) {
			pool.query('UPDATE Flowers SET isActive=?, dateActivation=? WHERE id=?', key, callback);
		},
		Delete: function (key, callback) {
			pool.query('DELETE FROM Flowers WHERE id=?', key, callback);
		},
	};

	return context;
};
