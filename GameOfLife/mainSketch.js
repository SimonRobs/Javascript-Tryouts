const CELL_SIZE = 10;

let cols, rows;

let world;

//Initialize p5 context
let main = new p5(GameOfLife, 'mainSketchDiv');

let targetNeighboursDiv;

/**
 * Copies an array
 * @param {Array} source - The array to be copied
 * @param {Boolean} deep - Indicates whether the copy should be deep os shallow
 * @returns {Array} - The copy of the source array
 */
function copy(source, deep) {
    var o, prop, type;

    if (typeof source != 'object' || source === null) {
        o = source;
        return o;
    }

    o = new source.constructor();

    for (prop in source) {

        if (source.hasOwnProperty(prop)) {
            type = typeof source[prop];

            if (deep && type == 'object' && source[prop] !== null) {
                o[prop] = copy(source[prop]);

            } else {
                o[prop] = source[prop];
            }
        }
    }
    return o;
}