module.exports = {
	exitApp: (exitcode) => {
		process.exit(exitcode || 0)
	}
}