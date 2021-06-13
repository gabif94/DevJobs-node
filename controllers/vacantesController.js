const Vacante = require('../models/Vacantes');

exports.formularioNuevaVacante = (req, res) => {
	res.render('nuevaVacante', {
		pageName: 'Nueva Vacante',
		tagline: 'Llena el formulario y publica tu vacante',
	});
};

exports.agregarVacante = async (req, res) => {
	const vacante = new Vacante(req.body);

	vacante.skills = req.body.skills.split(',');

	const nuevaVacante = await vacante.save();

	console.log(nuevaVacante);

	res.redirect(`/vacantes/${nuevaVacante.url}`);
};

exports.mostrarVacante = async (req, res, next) => {
	const vacante = await Vacante.findOne({url: req.params.url}).lean();

	if (!vacante) return next();

	res.render('vacante', {
		vacante,
		pageName: vacante.titulo,
		barra: true,
	});
};
