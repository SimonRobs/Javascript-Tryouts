function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let canBeAdded = true;

        let adjustedMouseX = (mouseX - width / 2) / (width / (2 * scale));
        let adjustedMouseY = (mouseY - height / 2) / (height / (2 * scale));

        //Snap the mouse to the grid
        if (snapping) {
            if (abs(adjustedMouseX - floor(adjustedMouseX)) < 0.5)
                adjustedMouseX = floor(adjustedMouseX);
            else
                adjustedMouseX = ceil(adjustedMouseX);

            if (abs(adjustedMouseY - floor(adjustedMouseY)) < 0.5)
                adjustedMouseY = floor(adjustedMouseY);
            else
                adjustedMouseY = ceil(adjustedMouseY);
        }

        //Check if the new point can be added
        for (let i = 0; i < dataSet.length; i++) {
            if (adjustedMouseX == dataSet[i].x) {
                canBeAdded = false;
                break;
            }
            if (adjustedMouseX == dataSet[i].x && adjustedMouseY == dataSet[i].y) {
                canBeAdded = false;
                break;
            }
        }
        //Add the point
        if (canBeAdded) {
            dataSet.push(createVector(adjustedMouseX, adjustedMouseY));
            IsLoaded = false;
        }
    }
}
/**
 * Helper function to draw multiple points for the linear regression
 */
function mouseDragged() {
    if (mouseX > 0 && mouseX < width && linear) {
        let r = 50;
        for (let i = 0; i < r / 2; i++)
            dataSet.push(createVector(
                mouseX - width / 2 + random(-r, r),
                mouseY - height / 2 + random(-r, r)
            ));
        IsLoaded = false;
    }
}

/**
 * Zoom in or our using mouse wheel
 * @param {Event} event 
 */
function mouseWheel(event) {
    if (!linear) {
        let sign = (event.delta > 0) ? 1 : -1;
        let nextScale = 0;
        if (sign >= 0 && scale < width)
            for (let i = scale + 1; i < width; i++)
                if (width % i == 0) {
                    nextScale = i;
                    break;
                }
        if (sign < 0 && scale > 4)
            for (let i = scale - 1; i >= 4; i -= 1)
                if (width % i == 0) {
                    nextScale = i;
                    break;
                }

        if (nextScale > 0)
            scale = nextScale;
        return false;
    }
}


function keyPressed() {
    if (keyCode == SHIFT) {
        snapping = true;
    }
}

function keyReleased() {
    if (keyCode == SHIFT) {
        snapping = false;
    }
}