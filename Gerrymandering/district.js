class District {

    constructor(index, center, maxPrecincts, maxDistanceBetweenPrecincts) {
        this.index = index;
        this.precincts = [];
        this.maxPrecincts = maxPrecincts;
        this.maxDistanceBetweenPrecincts = maxDistanceBetweenPrecincts;
        this.districtCenter = center;
        this.nGreenVotes = 0;
        this.color = {
            r: random(10, 220),
            g: random(10, 220),
            b: random(10, 220)
        };
    }

    addPrecinct(precinct) {
        // If the district is full, return false
        // if (this.isFull()) return false;
        let dist = Math.ceil(this.distanceFromCenter(precinct));
        if (dist > this.maxDistanceBetweenPrecincts / 2)
            return false;
        precinct.inDistrict = true;
        precinct.districtId = this.index;
        this.precincts.push(precinct);
        this.nGreenVotes += precinct.value;
        return true;
    }

    addPrecinctCheckAllDistances(precinct) {
        // If the district is full, return false
        // if (this.isFull()) return false;
        // If the new precinct is too far from any precinct return false
        for (let p of this.precincts)
            if (precinct.getDistanceFrom(p) > this.maxDistanceBetweenPrecincts)
                return false;
        precinct.inDistrict = true;
        precinct.districtId = this.index;
        this.precincts.push(precinct);
        this.nGreenVotes += precinct.value;
        return true;
    }

    distanceFromCenter(precinct) {
        return this.districtCenter.getManhattanDistance(precinct.pos);
    }

    clearPrecincts() {
        for (let p of this.precincts) {
            p.inDistrict = false;
        }
        this.precincts = [];
    }

    recalculateCenter() {
        if (this.precincts.length == 0) return;
        let sumX = 0;
        let sumY = 0;
        for (let p of this.precincts) {
            sumX += p.j;
            sumY += p.i;
        }
        let meanX = sumX / this.precincts.length;
        let meanY = sumY / this.precincts.length;
        this.districtCenter = new Point(meanX, meanY);
    }

    isGreenWinning() {
        let nPrecincts = this.precincts.length;
        return this.nGreenVotes > nPrecincts * 50;
    }

    calculateVoteThreshold(nDistricts) {
        this.voteThreshold = 0.01 * (this.precincts.length * 100) / nDistricts;
    }

    isFull() {
        return this.precincts.length >= this.maxPrecincts;
    }

    show() {
        noStroke();
        for (let p of this.precincts) {
            p.color = this.color;
            p.show();
        }
        fill(0, 0, 0);
        let centerX = this.districtCenter.x * width / COLS;
        let centerY = this.districtCenter.y * height / ROWS;
        ellipse(centerX, centerY, 4);
    }
}