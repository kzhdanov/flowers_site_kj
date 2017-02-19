module.exports = function(pool) {
	var context = {
		Save: function(key, callback) {
			pool.query('INSERT INTO Events SET ?', key, callback);
		},
		getEvents: function(callback) {
			pool.query("SELECT * FROM Events ORDER BY 'dateCreate' DESC", callback);
		},
		DeleteEvent: function (key, callback) {
			pool.query('DELETE FROM Events WHERE id=?', key, callback);
		},
		SaveChangeEvent: function (key, callback) {
			pool.query('UPDATE Events SET isActive=?, dateActivation=? WHERE id=?', key, callback);
		},
		GetEventsActive: function(callback) {
			pool.query("SELECT id, title, previewSrc, imagesFolderSrc FROM Events WHERE isActive=1 ORDER BY 'dateActivation' DESC", callback);
		},
		GetEventById: function(key, callback) {
			pool.query("SELECT * FROM Events WHERE isActive=1 and id=?", key, callback);
		}
	};

	return context;
};
