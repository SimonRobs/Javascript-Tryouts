class KMeansPlusPlus {

    constructor() {
        this.initRandomPoints();
        this.doKMeansPlusPlus();
    }

    show() {
        this.showCenters();
    }

    showCenters() {
        for (let c of this.centers) {
            noStroke();
            fill(255, 0, 0);
            ellipse(c.x, c.y, 10);
        }
    }

    initRandomPoints() {
        this.randomPoints = [];
        for (let i = 0; i < N_PRECINCTS; ++i) {
            let x = width / COLS * (0.5 + (i % COLS));
            let y = height / ROWS * (0.5 + int(i / COLS));
            this.randomPoints.push(new Point(x, y))
        }
    }

    doKMeansPlusPlus() {
        // Choose the centroids
        this.chooseInitialCenters();

        // Assign the centroids to the clusters
        let clusters = [];
        for (let i = 0; i < this.centers.length; ++i) {
            clusters.push(new Cluster(i, this.centers[i]));
        }

        let oldCenters = Cluster.getRandomCenters();
        let error = Cluster.calculateCumulativeCentersDistance(this.centers, oldCenters);
        while (error != 0) {
            // Reset the points in the cluster
            for (let cluster of clusters) {
                cluster.clear();
            }
            // For each point
            for (let p of this.randomPoints) {
                // Look for the closest cluster center
                let closestClusterIndex = 0;
                let minDistance = Number.MAX_SAFE_INTEGER;
                for (let i = 0; i < clusters.length; ++i) {
                    let dist = clusters[i].distanceFromCenter(p);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestClusterIndex = i;
                    }
                }
                // Add the point to the closest cluster
                clusters[closestClusterIndex].addPoint(p);
            }
            oldCenters = [...this.centers];
            this.centers = [];
            for (let cluster of clusters) {
                cluster.recalculateCenter();
                this.centers.push(cluster.center);
            }
            error = Cluster.calculateCumulativeCentersDistance(this.centers, oldCenters);
        }
    }

    chooseInitialCenters() {
        this.centers = [];
        // Add a random precinct as a center
        this.centers.push(Point.getRandom());
        // Choose the other centers with the k-means++ algorithm (Step 1)
        this.chooseNextCenters();
    }

    chooseNextCenters() {
        while (this.centers.length < N_DISTRICTS) {
            this.centers.push(this.chooseNextCenter());
        }
    }

    chooseNextCenter() {
        let allDistances = [];
        let distanceSum = this.findMinDistances(allDistances);
        let cumulativeProbs = this.calculateCumulativeSum(allDistances, distanceSum);

        // Pick a random number between 0 and 1
        let r = random(1);

        // If the cumulative probability of a precinct being chosen is higher or equal to
        // the random number, we choose the precinct.
        // This happens with the same probability distribution as calculated using the distances.
        for (let i = 0; i < this.randomPoints.length; ++i) {
            if (r > cumulativeProbs[i])
                continue;
            return this.randomPoints[i];
        }
    }

    // minDistances is the array to be modified
    findMinDistances(allDistances) {
        let distanceSum = 0;
        // For each point
        for (let i = 0; i < this.randomPoints.length; ++i) {
            let minDistance = Number.MAX_SAFE_INTEGER;
            // Find the closest center and calculate the distance
            for (let j = 0; j < this.centers.length; ++j) {
                // We can choose the type of distance to obtain
                let dist = this.randomPoints[i].getManhattanDistance(this.centers[j]);
                if (dist < minDistance) {
                    minDistance = dist;
                }
            }
            allDistances.push(minDistance);
            distanceSum += minDistance;
        }
        return distanceSum;
    }

    calculateCumulativeSum(allDistances, distanceSum) {
        let cumulativeProbs = [];
        for (let i = 0; i < this.randomPoints.length; ++i) {
            let probability = allDistances[i] / distanceSum;
            if (i > 0)
                cumulativeProbs.push(cumulativeProbs[i - 1] + probability);
            else
                cumulativeProbs.push(probability);
        }
        return cumulativeProbs;
    }
}