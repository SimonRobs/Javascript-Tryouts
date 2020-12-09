/* 
 * *************************************
 *  CHANGEABLE CONSTANTS
 * *************************************
 **/
const ROWS = 6;
const COLS = 50;
const N_DISTRICTS = 10;
/* 
 * *************************************
 * *************************************
 **/
const N_PRECINCTS = ROWS * COLS;
const MAX_DIST_BETWEEN_PRECINCTS = Math.ceil(N_PRECINCTS / (2 * N_DISTRICTS));

var precincts = [];
var districts = [];

let stopped = false;
let nonAdded = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Initialize the precincts
    for (i = 0; i < ROWS; ++i) {
        for (j = 0; j < COLS; ++j) {
            let value = random(0, 100);
            precincts.push(new Precinct(i, j, value));
        }
    }
    // Initialize the districts
    resetAll();
}

function draw() {
    if (!stopped) {
        while (!populateDistricts()) resetAll();
        showAll();
        stopped = true;
    }
    // let populated = populateDistricts();
    // if (populated) {
    //     noLoop();
    //     showAll();
    // } else resetAll();
}

function keyPressed(event) {
    if (event.key == 'r') {
        resetAll();
    }
    stopped = false;
}

function showAll() {
    background(255);
    for (let d of districts) {
        d.show();
    }
}

function resetAll() {
    console.log("RESETTING");
    // Reset all the precincts
    for (let p of precincts) {
        p.inDistrict = false;
    }

    resetDistricts();

    addCenterPrecincts();
}

function resetDistricts() {
    districts = [];
    let centers = (new KMeansPlusPlus()).centers;
    centers = orderByDescendingClosestDistance(centers);
    let nPrecinctsRemaining = N_PRECINCTS;
    let nDistrictsRemaining = N_DISTRICTS;
    for (let i = 0; i < N_DISTRICTS; ++i) {
        maxPrecinctsBounds = getPrecinctPerDistrictBounds(nPrecinctsRemaining, nDistrictsRemaining);
        let maxPrecincts = (maxPrecinctsBounds.high > nPrecinctsRemaining) ? maxPrecinctsBounds.low : maxPrecinctsBounds.high;
        districts.push(new District(i, centers[i], maxPrecincts, MAX_DIST_BETWEEN_PRECINCTS));
        nPrecinctsRemaining -= maxPrecincts;
        nDistrictsRemaining--;
    }
}

function orderByDescendingClosestDistance(centers) {
    let centersSorted = [];
    for (let c1 of centers) {
        centersSorted.push({
            p: c1,
            dist: c1.getMinDistanceFrom(centers)
        });
    }
    centersSorted.sort((a, b) => b.dist - a.dist);
    centersSorted = centersSorted.map(el => el.p);
    return centersSorted;
}

function addCenterPrecincts() {
    // Add the precincts that overlap with the center of the district
    for (let d of districts) {
        let j = int(d.districtCenter.y / height * ROWS);
        let i = int(d.districtCenter.x / width * COLS);
        let index = j * COLS + i;
        d.addPrecinct(precincts[index]);
    }
}

function populateDistricts() {
    let couldNotAdd = false;
    // For each precinct
    for (let p of precincts) {
        if (p.inDistrict) continue;
        // Order the districts by closest
        let distances = [];
        for (let i = 0; i < N_DISTRICTS; ++i) {
            distances.push({
                i,
                dist: districts[i].distanceFromCenter(p)
            });
        }
        distances.sort((a, b) => a.dist - b.dist);
        let added = false;
        // Try to add the point to the closest distric in order
        for (let i = 0; i < distances.length; ++i) {
            if (districts[distances[i].i].addPrecinct(p)) {
                added = true;
                break;
            }
        }

        // If we could not add the point to any district,
        // we have to recalculate the centers
        // if (!added) couldNotAdd = true;
        if (!added) return false;
    }
    return !couldNotAdd;
}