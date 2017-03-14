const R = require('ramda');
const computeControlPoints = require('./computeControlPoints.js');
const transpose = require('./transpose.js');


const controlPointsToLists = (controlPoints) => {
	return R.flatten(
		transpose([
			controlPoints.p1,
			controlPoints.p2,
		])
	);
};


const combinePoints =
module.exports.combinePoints =
function combinePoints(_points, _controlPoints) {
	let points = [..._points];
	let controlPoints = [..._controlPoints];
	let results = [];
	while (true) {
		results = [
			...results,
			...R.take(1, points),
			...R.take(2, controlPoints),
		];
		points = R.drop(1, points);
		controlPoints = R.drop(2, controlPoints);
		if (controlPoints.length === 0) {
			break;
		}
	}
	return [
		...results,
		...R.take(1, points),
	];
};


const getControlPoints =
module.exports.getControlPoints = R.pipe(
	transpose,
	R.map(computeControlPoints),
	R.map(controlPointsToLists),
	transpose
);
