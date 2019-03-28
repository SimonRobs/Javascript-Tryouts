let Neighbours = function (neighbours) {

    //Set and return the setup and draw function of the context
    return function (p) {
        p.setup = () => {
            p.createCanvas(300, 300);
            let index = 0;
            for (let i = 0; i < p.height; i += CELL_SIZE) 
            {
                for (let j = 0; j < p.width; j += CELL_SIZE) 
                {
                    neighbours[index].pos = p.createVector(j + CELL_SIZE / 2, i + CELL_SIZE / 2);
                    index++;
                }
            }

        }

        p.draw = () => {
            p.background(0);
            p.push();
            p.noFill();
            p.stroke(255);
            p.rect(0, 0, p.width, p.height);
            p.pop();
            if (neighbours != null)
                for (var neighbour of neighbours)
                    neighbour.show(p);
        }
    }
}