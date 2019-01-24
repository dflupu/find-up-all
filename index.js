const path = require('path');
const pathExists = require('path-exists');

module.exports = (filename, options) => {
	const cwd = path.resolve(options.cwd || '');
	const limitDir = options.limitDir ? path.resolve(options.limitDir) : null;

	const results = [];

	return new Promise(resolve => {
		(function find(currentDir) {
			const fp = path.join(currentDir, filename);
			pathExists(fp).then(exists => {
				if (exists) {
					results.push(fp);
				}

				const parentDir = path.dirname(currentDir);
				const reachedlimitDir = limitDir && (currentDir === limitDir);
				const reachedFsRoot = (parentDir === currentDir);

				if (reachedFsRoot || reachedlimitDir) {
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
	const limitDir = options.limitDir ? path.resolve(options.limitDir) : null;

	let currentDir = cwd;
	let reachedFsRoot = false;
	let reachedlimitDir = false;

	const results = [];

	while (!(reachedFsRoot || reachedlimitDir)) {
		const fp = path.join(currentDir, filename);
		if (pathExists.sync(fp)) {
			results.push(fp);
		}

		const parentDir = path.dirname(currentDir);

		reachedlimitDir = limitDir && (currentDir === limitDir);
		reachedFsRoot = (parentDir === currentDir);
		currentDir = parentDir;
	}

	return results;
};
