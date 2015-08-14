function KMeans(centroids) {
   this.centroids = centroids || [];

   this.distance = function(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += Math.pow(v2[i] - v1[i], 2);      
      }
      return Math.sqrt(total);
   };
}

KMeans.prototype.randomCentroids = function(points, k) {
   var centroids = points.slice(0); // copy
   centroids.sort(function() {
      return (Math.round(Math.random()) - 0.5);
   });
   return centroids.slice(0, k);
};

KMeans.prototype.classify = function(point) {
   var min = Infinity, index = 0;

   for (var i = 0; i < this.centroids.length; i++) {
      var dist = this.distance(point, this.centroids[i]);
      if (dist < min) {
         min = dist;
         index = i;
      }
   }
   return index;
};

KMeans.prototype.cluster = function(points, k) {
   k = k || Math.max(2, Math.ceil(Math.sqrt(points.length / 2)));

   this.centroids = this.randomCentroids(points, k);

   var assignment = new Array(points.length);
   var clusters = new Array(k);

   var movement = true;
   while (movement) {
      // update point-to-centroid assignments
      for (var i = 0; i < points.length; i++) {
         assignment[i] = this.classify(points[i]);
      }

      // update location of each centroid
      movement = false;
      for (var j = 0; j < k; j++) {
         var assigned = [];
         for (var i = 0; i < assignment.length; i++) {
            if (assignment[i] === j) {
               assigned.push(points[i]);
            }
         }
         if (!assigned.length) {
            continue;
         }
         var centroid = this.centroids[j];
         var newCentroid = new Array(centroid.length);

         for (var g = 0; g < centroid.length; g++) {
            var sum = 0;
            for (var i = 0; i < assigned.length; i++) {
               sum += assigned[i][g];
            }
            newCentroid[g] = sum / assigned.length;

            if (newCentroid[g] !== centroid[g]) {
               movement = true;
            }
         }
         this.centroids[j] = newCentroid;
         clusters[j] = assigned;
      }
   }
   return clusters;
};

module.exports = KMeans;
