exports.showJobs = (req, res) => {
	res.render('home', {
		pageName: 'devJobs',
		tagline: 'Encuentra y publica trabajo para desarrolladores web',
		barra: true,
		boton: true,
	});
};
