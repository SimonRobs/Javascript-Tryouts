/* 
 * *************************************
 *  CHANGEABLE CONSTANTS
 * *************************************
 **/
const ROWS = 14;
const COLS = 20;
const N_DISTRICTS = 40;
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
    for (let i = 0; i < ROWS; ++i) {
        for (let j = 0; j < COLS; ++j) {
            let value = int(random(0, 100));
            precincts.push(new Precinct(i, j, value));
        }
    }
    // Initialize the districts
    resetAll();
}

function draw() {
    // showWithKeyboard();
    showNormal();
}

function showWithKeyboard() {
    if (!stopped) {
        populateDistricts();
        showAll();
        stopped = true;
    }
}

function showNormal() {
    frameRate(60);
    let populated = populateDistricts();
    showAll();
    if (populated) {
        noLoop();
    } else resetAll();
}

function keyPressed(event) {
    if (event.key === 'r') {
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
    // Reset all the precincts
    for (let p of precincts) {
        p.inDistrict = false;
    }
    resetDistricts();
}

function resetDistricts() {
    districts = [];
    let centers = (new KMeansPlusPlus()).centers;
    centers = orderByDescendingClosestDistance(centers);
    let nPrecinctsRemaining = N_PRECINCTS;
    let nDistrictsRemaining = N_DISTRICTS;
    for (let i = 0; i < N_DISTRICTS; ++i) {
        let maxPrecinctsBounds = getPrecinctPerDistrictBounds(nPrecinctsRemaining, nDistrictsRemaining);
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
    let counter = 0;
    let prevCenters = districts.map(d => d.districtCenter);
    let allPrecinctsInDistricts = false;
    let diff = 1;
    do {
        for (let d of districts) {
            d.clearPrecincts();
        }
        // addCenterPrecincts();
        let added = tryPopulateDistricts();
        if (added) {
            allPrecinctsInDistricts = true;
            // Recalculate the centers one last time
            for (let d of districts) {
                d.recalculateCenter();
            }
            break;
        }
        // Recalculate the center
        for (let d of districts) {
            d.recalculateCenter();
        }

        // Check the difference between the previous centers
        // and the current ones
        for (let i = 0; i < districts.length; ++i) {
            diff += prevCenters[i].getManhattanDistance(districts[i].districtCenter);
        }
        prevCenters = districts.map(d => d.districtCenter);
        counter++;
    } while (diff != 0 && counter < 100);

    // If we could add all the precincts,
    // check if some districts have too many or too few
    // precincts
    // if (allPrecinctsInDistricts && !tryAdjustDistricts())
    //     return false;

    return allPrecinctsInDistricts;
}

function tryAdjustDistricts() {
    let allDistrictsAdded = false;
    let counter = 0;
    do {
        // Do something...
        counter++;
    } while (!allDistrictsAdded && counter < 100);
    return allDistrictsAdded;
}

function tryPopulateDistricts() {
    let nonAddedPrecincts = [];
    // Add precincts along the center of the district
    for (let p of precincts) {
        if (p.inDistrict) continue;
        let added = tryAddPrecinct(p, false);
        if (!added) nonAddedPrecincts.push(p);
    }
    // For the precincts that were not added, try to add them normally
    let nNonAddedPrecincts = nonAddedPrecincts.length;
    for (let p of nonAddedPrecincts) {
        if (p.inDistrict) continue;
        if (tryAddPrecinct(p, true)) nNonAddedPrecincts--;
    }
    return nNonAddedPrecincts == 0;
}

function tryAddPrecinct(p, checkDistance) {
    // Order the districts by closest
    let distances = [];
    for (let i = 0; i < N_DISTRICTS; ++i) {
        let dist = Math.round(districts[i].distanceFromCenter(p) * 10) / 10;
        distances.push({
            i,
            dist
        });
    }
    distances.sort((a, b) => a.dist - b.dist);
    let added = false;
    let districtsAtEqualDistance = [distances[0]];
    // Try to add the point to the closest distric in order
    for (let i = 0; i < distances.length; ++i) {
        // If there are multiple districts at equal distance, pick the one
        // with less precincts
        if (distances[i].dist === districtsAtEqualDistance[0].dist) {
            districtsAtEqualDistance.push(distances[i]);
            continue;
        }
        let targetDIndex = -1;
        let minSize = N_PRECINCTS;
        for (let possibleDistrict of districtsAtEqualDistance) {
            if (districts[possibleDistrict.i].precincts.length < minSize) {
                minSize = districts[possibleDistrict.i].precincts.length;
                targetDIndex = possibleDistrict.i;
            }
        }
        // let maxSize = -1;
        // for (let possibleDistrict of districtsAtEqualDistance) {
        //     if (districts[possibleDistrict.i].precincts.length > maxSize) {
        //         maxSize = districts[possibleDistrict.i].precincts.length;
        //         targetDIndex = possibleDistrict.i;
        //     }
        // }
        let targetDistrict = districts[targetDIndex];
        districtFitness = 2 //FitnessCalculator.calculateFitness(targetDistrict);
        if (random(0, 1) <= districtFitness) {
            let couldAdd = checkDistance ? targetDistrict.addPrecinctCheckAllDistances(p) : targetDistrict.addPrecinct(p);
            if (couldAdd) {
                added = true;
                break;
            }
        }
        districtsAtEqualDistance = [distances[i]];
    }
    return added;
}