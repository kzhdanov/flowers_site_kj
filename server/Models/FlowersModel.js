module.exports = function(pool) {
	var context = {
		Save: function(key, callback) {
			pool.query('INSERT INTO Flowers SET ?', key, callback);
		},
	};

	return context;
};
