var KMeans = require('./');
var kmeans = new KMeans();
var arr = [
	[0, 5, 10],
	[25, 35, 40],
	[12, 28, 60],
	[4, 2, 1]
];

kmeans.cluster(arr, 2);

kmeans.centroids.forEach(function(centroid) {
	console.log(centroid);
});
