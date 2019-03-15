/**
 * Calculates the best-fit line in a set of points
 * @param {array} dataSet 
 */
function linearRegression(dataSet) {
    if (dataSet.length == 0) return null;

    //Define the variables Ax = b
    let matrixA = math.matrix(),
        vectorX = math.matrix(),
        vectorB = math.matrix();
    matrixA.resize([dataSet.length, 2]);
    vectorX.resize([dataSet.length, 1]);
    vectorB.resize([dataSet.length, 1]);

    //Initialize the variables
    for (let i = 0; i < dataSet.length; i++) {
        matrixA.subset(math.index(i, 0), 1);
        matrixA.subset(math.index(i, 1), dataSet[i].x);
        vectorB.subset(math.index(i, 0), dataSet[i].y);
        IsInitialMatrix = false;
    }
    if (IsInitialMatrix) return math.ones();

    /******************************************/

    //Determine A^t * A
    let At = math.transpose(matrixA);
    let AtA = math.multiply(At, matrixA);

    /******************************************/
    //Determine A^t * b
    let Atb = math.multiply(At, vectorB);

    /******************************************/
    //Calculate (A^t * A)^-1
    let AtAInv = math.identity(dataSet.length, 2);
    if (math.det(AtA) != 0)
        AtAInv = math.inv(AtA);
    /******************************************/

    //Solve for vectorX
    vectorX = math.multiply(AtAInv, Atb);

    //Return the answer
    return vectorX;
}

/**
 * Calculates the polynome of degree 'dataSet.length' that
 * passes through all the drawn points
 * @param {array} dataSet 
 */
function polynomialFitting(dataSet) {
    if (dataSet.length == 0) return null;

    //Define the variables Ax = b
    let matrixA = math.matrix(),
        vectorX = math.matrix(),
        vectorB = math.matrix();
    matrixA.resize([dataSet.length]);
    vectorX.resize([dataSet.length, 1]);
    vectorB.resize([dataSet.length, 1]);

    //Initialize the variables
    for (let i = 0; i < dataSet.length; i++) {
        matrixA.subset(math.index(i, 0), 1);
        for (let j = 1; j < dataSet.length; j++) {
            matrixA.subset(math.index(i, j), Math.pow(dataSet[i].x, j));
        }
        vectorB.subset(math.index(i, 0), dataSet[i].y);
        IsInitialMatrix = false;
    }

    /******************************************/
    //Calculate A^(-1)
    let AInv = math.zeros(dataSet.length, dataSet.length);
    if (!IsInitialMatrix) {
        AInv = math.inv(matrixA);
    }

    //Solve for vectorX
    vectorX = math.multiply(AInv, vectorB);

    //Return the answer
    return vectorX;
}

/**
 * Displays the best-fit line in a set of points
 * @param {array} dataSet 
 */
function drawLinearRegression(dataSet) {
    let y, x;
    if (!IsLoaded) {
        coefficients = linearRegression(dataSet);
        displayFunction(coefficients);
        IsLoaded = true;
    }
    if (coefficients != null) {
        noFill();
        stroke(0, 255, 0);
        beginShape();
        for (x = -width / 2; x <= width / 2; x += 80) {
            if (coefficients !== undefined && !IsInitialMatrix) {
                let y = coefficients.subset(math.index(0, 0));
                for (let i = 1; i < coefficients.size()[0]; i++) {
                    y += coefficients.subset(math.index(i, 0)) * Math.pow(x, i);
                }
                vertex(x, y);
            }
        }
        endShape();
    }
}

/**
 * Displays the polynome of degree 'dataSet.length' that
 * passes through all the drawn points
 * @param {array} dataSet 
 */
function drawPolynomialFitting(dataSet) {
    let y, x;
    if (!IsLoaded) {
        coefficients = polynomialFitting(dataSet);
        displayFunction(coefficients);
        IsLoaded = true;
    }
    if (coefficients !== null) {
        noFill();
        stroke(0, 255, 0);
        beginShape();
        let step = adjustStep();
        for (x = -width / 2; x < width / 2; x += step) {
            if (coefficients !== undefined && !IsInitialMatrix) {
                let y = coefficients.subset(math.index(0, 0));
                for (let i = 1; i < dataSet.length; i++) {
                    y += coefficients.subset(math.index(i, 0)) * Math.pow(x, i);
                }
                vertex(x * (width / (2 * scale)), y * (height / (2 * scale)));
            }
        }
        endShape();
    }
}

/**
 * Adjusts the display step to draw the polynome after
 * the zoom
 */
function adjustStep() {
    switch (scale) {
        case 400:
            return 1;
        case 200:
            return 0.95;
        case 100:
            return 0.9;
        case 80:
            return 0.85;
        case 50:
            return 0.8;
        case 40:
            return 0.65;
        case 25:
            return 0.6;
        case 20:
            return 0.55;
        case 16:
            return 0.5;
        case 10:
            return 0.45;
        case 8:
            return 0.4;
        case 5:
            return 0.35;
        case 4:
            return 0.3;
        default:
            return 0.7;
    }
}

/*************UNUSED*************/
// function matrixMultiply(m1, m2) {
//   if (m1[0].length !== m2.length) {
//     console.log("Matrices uncompatible!");
//     return undefined;
//   }
//   if ((m1 || m2) === undefined)
//     return undefined;
//
//   //If m2 is a vector:
//   if (m2[0].length === undefined) {
//     let result = [];
//     for (let i = 0; i < m1[0].length; i++) {
//       let sum = 0;
//       for (let j = 0; j < m2.length; j++) {
//         sum += m1[i][j] * m2[j];
//       }
//       result[i] = sum;
//     }
//     return result;
//
//   } else {
//     let result = [];
//     for (let i = 0; i < m1.length; i++) {
//       result[i] = [];
//       for (let j = 0; j < m2.length; j++) {
//         let sum = 0;
//         for (let k = 0; k < m2.length; k++) {
//           sum += m1[i][j + k] * m2[i + k][j];
//           if (sum === NaN) sum = 0;
//         }
//         result[i][j] = sum;
//       }
//     }
//     return result;
//   }
// }
//
// function getCofactor(matrix, p, q, n) {
//   let i = 0,
//     j = 0;
//   let temp = [];
//
//   for (let row = 0; row < n; row++) {
//
//     temp[row] = [];
//
//     for (let col = 0; col < n; col++) {
//
//       if (row != p && col != q) {
//
//         temp[i][j++] = matrix[row][col];
//
//         if (j == n - 1) {
//           j = 0;
//           i++;
//         }
//       }
//     }
//   }
//   return temp;
// }
//
// function determinantOfMatrix(matrix, n) {
//   let det = 0;
//
//   if (n === 1)
//     return matrix[0][0];
//
//   let temp;
//
//   let sign = 1;
//
//   for (let f = 0; f < n; f++) {
//     temp = getCofactor(matrix, 0, f, n);
//     det += sign * matrix[0][f] * determinantOfMatrix(temp, n - 1);
//     sign *= -1;
//   }
//   return det;
// }