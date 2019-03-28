class Organism {
    /**
     * Constructor for an organism
     * @param {Int} tag - An ID to identify the organism
     * @param {Int} i - The index in a grid or row if j specified
     * @param {Int} j - The column
     */
    constructor(tag, i, j) 
    {
        if (j == null) 
        {
            this.index = i;
            this.i = Math.floor(i / (cols));
            this.j = Math.floor(i % (cols));
        } else
        {
            this.i = i;
            this.j = j;
            this.index = world.getGridIndex(i, j);
        }
        this.tag = tag;
        this.pos = world.grid[this.index];
        this.alive = true;
    }

    /**
     * Finds the neighbours of the organism
     * @returns {Array} - The list of neighbours
     * @returns {Int} - The number of neighbours
     */
    getNeighbours() 
    {
        let neighbours = [];
        let nNeighbours = 0;
        for (let i = -1; i < 2; i++) 
        {
            for (let j = -1; j < 2; j++)
             {
                let newI = (this.i + i + rows) % (rows);
                let newJ = (this.j + j + cols) % (cols);

                let newIndex = world.getGridIndex(newI, newJ);
                let neighbour = world.organisms[newIndex];

                if (neighbour.alive) 
                    nNeighbours++;
                
                neighbours.push(neighbour);
            }
        }
        if (this.alive)
            nNeighbours--;
        return {
            neighbours,
            nNeighbours
        };
    }

    /**
     * Displays the organism
     * @param {p5.sketch} context - The canvas to display the organism
     */
    show(context) {
        if (this.alive)
            context.fill(255);
        else
            context.fill(0);
        context.noStroke();
        let adjustement = CELL_SIZE / 2 * 0.9;
        context.rect(
            this.pos.x - adjustement,
            this.pos.y - adjustement,
            CELL_SIZE * 0.95, CELL_SIZE * 0.95);

        // this.showInfo(context);
    }

    /**
     * Displays the info on this organism
     * @param {p5.sketch} context - The canvas to display the organism
     */
    showInfo(context) {
        if (this.alive)
            context.fill(0);
        else
            context.fill(255);
        context.textSize(10);
        context.text(this.tag, this.pos.x - 2, this.pos.y - 9);
        context.text(
            this.i + '   ' + this.j,
            this.pos.x - 9, this.pos.y + 15
            );
    }

}