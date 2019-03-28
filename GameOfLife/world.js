class World {

    /**
     * Constructor for the World
     * @param {p5} p - The p5js context
     */
    constructor(p) {
        this.grid = [];
        this.p = p
        for (let i = 0; i < this.p.height; i += CELL_SIZE)
            for (let j = 0; j < this.p.width; j += CELL_SIZE)
                this.grid.push(this.p.createVector(j + CELL_SIZE / 2, i + CELL_SIZE / 2));

        this.organisms = [];

    }

    /**
     * Populate the world with organisms.
     * An organism has 90% chances of being alive
     */
    populate() {
        let tag = 0;
        this.organisms = [];
        for (let i = 0; i < this.grid.length; i++) {
            let temp = new Organism(tag, i);
            if (this.p.random() < 0.9)
                temp.alive = false;
            this.organisms.push(temp);
            tag++;
        }
    }

    /**
     * Populates the world with dead organisms
     */
    populateDead() {
        let tag = 0;
        this.organisms = [];
        for (let i = 0; i < this.grid.length; i++) {
            let temp = new Organism(tag, i);
            temp.alive = false;
            this.organisms.push(temp);
            tag++;
        }
    }

    /**
     * Populates the world by placing alive organisms only on the edges
     */
    populateEdges() {

        let tag = 0;
        this.organisms = [];

        for (let i = 0; i < this.grid.length; i++) {
            let temp = new Organism(tag, i);
            if (i >= rows &&
                i % (rows) !== 0 &&
                (i + rows + 1) % (rows) !== 0 &&
                i < this.grid.length - rows) {
                temp.alive = false;
            }
            this.organisms.push(temp);
            tag++;
        }
    }

    /**
     * Returns the grid index
     * @param {Int} i - The row 
     * @param {Int} j - The column
     * @returns {Int} - The grid index
     */
    getGridIndex(i, j) {
        return j + (i * cols);
    }

    /**
     * Finds the organism closest to the specified coordinates
     * @param {Int} x - The x coordinate
     * @param {Int} y - The y coordinate
     * @returns {Int} - The grid index of the closest element
     */
    findClosestIndex(x, y) {
        let i = Math.floor(y / CELL_SIZE);
        let j = Math.floor(x / CELL_SIZE);
        let index = Math.floor(this.getGridIndex(i, j));
        return index;
    }

    /**
     * Adds the organisms to the list
     * @param {Array} organisms - The list of organisms to add
     */
    addOrganisms(organisms) {
        for (var organism of organisms)
            this.organisms[organism.index] = organism;
    }

    /**
     * Adds the organism to the list
     * @param {Organism} organism - The organism to add
     * @param {Int} index - The index where to add the organism
     */
    addOrganism(organism, index) {
        if (this.organisms[index] == 0)
            this.organisms[index] = organism;
    }

    /**
     * Shows the grid
     */
    showGrid() {
        for (var cell of this.grid) {
            this.p.noFill();
            this.p.stroke(255);
            this.p.rect(cell.x - CELL_SIZE / 2,
                cell.y - CELL_SIZE / 2,
                CELL_SIZE, CELL_SIZE);
        }
    }

    /**
     * Shows each organism in the list
     */
    show() {
        for (var organism of this.organisms)
            organism.show(this.p);
    }

    /**
     * Updates the world according to the rules of the Game of Life
     */
    update() {
        let nextGen = [];
        for (let i = 0; i < this.organisms.length; i++) {
            let organism = copy(this.organisms[i], true);

            let nNeighbours = organism.getNeighbours().nNeighbours;

            if (!organism.alive && nNeighbours == 3) {
                organism.alive = true;
            } else if (organism.alive && (nNeighbours < 2 || nNeighbours > 3)) {
                organism.alive = false;
            } else {
                organism.alive = organism.alive;
            }
            nextGen.push(organism);
        }
        this.organisms = nextGen;
    }

    /**
     * Finds the neighbours of the wanted organism
     * @param {Int} index - The index of the wanted organism
     * @returns {Array} - The neighbours
     */
    getNeighbours(index) {
        let target = this.organisms[index];
        let neighbours = target.getNeighbours().neighbours;
        return neighbours;
    }
}