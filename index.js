const path = require('path');
const pathExists = require('path-exists');

module.exports = (filename, options) => {
	const cwd = path.resolve(options.cwd || '');
	const end = options.end ? path.resolve(options.end) : null;

	const results = [];

	return new Promise(resolve => {
		(function find(currentDir) {
			const fp = path.join(currentDir, filename);
			pathExists(fp).then(exists => {
				if (exists) {
					results.push(fp);
				}

				const parentDir = path.dirname(currentDir);
				const reachedEnd = end && (currentDir === end);
				const reachedFsRoot = (parentDir === currentDir);

				if (reachedFsRoot || reachedEnd) {
					resolve(results);
				} else {
					find(parentDir);
				}
			});
		})(cwd);
	});
};

module.exports.sync = (filename, options) => {
	const cwd = path.resolve(options.cwd || '');
	const end = options.end ? path.resolve(options.end) : null;

	let currentDir = cwd;
	let reachedFsRoot = false;
	let reachedEnd = false;

	const results = [];

	while (!(reachedFsRoot || reachedEnd)) {
		const fp = path.join(currentDir, filename);
		if (pathExists.sync(fp)) {
			results.push(fp);
		}

		const parentDir = path.dirname(currentDir);

		reachedEnd = end && (currentDir === end);
		reachedFsRoot = (parentDir === currentDir);
		currentDir = parentDir;
	}

	return results;
};
