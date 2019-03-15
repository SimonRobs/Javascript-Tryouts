/**
 * Displays the polynome created
 * @param {array} coefficients 
 */
function displayFunction(coefficients) {
    //Note: coefficients is a matrix object and has therefore
    //      a particular structure.
    //      Log the object to know morw.
    if (coefficients != null && coefficients.size()[0] > 0) {
        let func = "y = ";
        for (let i = coefficients.size()[0] - 1; i > 0; i--) {
            let coefficient = coefficients.subset(math.index(i, 0)) * -1;
            let nextCoefficient = coefficients.subset(math.index(i - 1, 0)) * -1;
            let term;

            //Adjust the coefficient display
            if (coefficient != 0) {
                //If it's negative and not the first one displayed
                if (coefficient < 0 && i < coefficients.size()[0] - 1)
                    term = -coefficient + "x";
                //If it equals to one or minus one
                else if (coefficient == 1)
                    term = "x";
                else if (coefficient == -1)
                    term = "-x";
                //In any other case
                else
                    term = coefficient + "x";

                if (i > 1)
                    term += "<sup>" + i + "</sup> ";

                if (nextCoefficient != 0) {
                    if (nextCoefficient < 0)
                        term += " - ";
                    else
                        term += " + ";
                }

                func += term;
            }
        }
        let lastDisplayedCoefficient = coefficients.subset(math.index(0, 0)) * -1;

        if (coefficients.size()[0] == 1 || (coefficients.size()[0] > 1 && lastDisplayedCoefficient != 0))
            func += lastDisplayedCoefficient;

        functionLabel.html(func);
    }
}

/**
 * Displays the mouse coordinates relative to the graph
 */
function displayMouseCoordinates() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        textSize(20);
        fill(255);
        noStroke();

        let adjustedMouseX = parseFloat((mouseX - width / 2) / (width / (2 * scale))).toFixed(2);
        let adjustedMouseY = parseFloat(-(mouseY - height / 2) / (height / (2 * scale))).toFixed(2);

        let mouseLoc = "(" + adjustedMouseX + ", " + adjustedMouseY + ")";
        text(mouseLoc, width / 2 - 160, height / 2 - 10);
    }
}

/**
 * Displays the axis of the graph
 */
function displayAxis() {
    stroke(60);
    strokeWeight(1);
    for (let i = -width / 2; i <= width / 2; i += width / (2 * scale))
        if (i != 0)
            line(i, -height / 2, i, height / 2);
    for (let i = -height / 2; i <= height / 2; i += width / (2 * scale))
        if (i != 0)
            line(-width / 2, i, width / 2, i);

    stroke(100);
    strokeWeight(2);
    line(-width / 2, 0, width / 2, 0);
    line(0, height / 2, 0, -height / 2);
}