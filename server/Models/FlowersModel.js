module.exports = function(pool) {
	var context = {
		Save: function(key, callback) {
			pool.query('INSERT INTO Flowers SET ?', key, callback);
		},
		Get: function(callback) {
			pool.query("SELECT * FROM Flowers ORDER BY 'dateCreate'", callback);
		},
		SaveChange: function (key, callback) {
			pool.query('UPDATE Flowers SET isActive=?, dateActivation=? WHERE id=?', key, callback);
		},
		Delete: function (key, callback) {
			pool.query('DELETE FROM Flowers WHERE id=?', key, callback);
		},
		SaveFlower: function(key, callback) {
			pool.query('INSERT INTO Flowers2 SET ?', key, callback);
		},
		getFlowers: function(callback) {
			pool.query("SELECT * FROM Flowers2 ORDER BY 'dateCreate'", callback);
		},
		SaveChangeFlower: function (key, callback) {
			pool.query('UPDATE Flowers2 SET isActive=?, dateActivation=? WHERE id=?', key, callback);
		},
		DeleteFlower: function (key, callback) {
			pool.query('DELETE FROM Flowers2 WHERE id=?', key, callback);
		},
		GetBouquetsActive: function(callback) {
			pool.query("SELECT * FROM Flowers WHERE isActive=1 ORDER BY 'dateActivation' DESC", callback);
		},
		GetFlowersActive: function(callback) {
			pool.query("SELECT * FROM Flowers2 WHERE isActive=1 ORDER BY 'dateActivation' DESC", callback);
		},
	};

	return context;
};
