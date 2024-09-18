function decodeValue(base, value) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points) {
    const k = points.length;

    function basis(i) {
        let numerator = 1;
        let denominator = 1;
        const [x_i, _] = points[i];
        for (let j = 0; j < k; j++) {
            if (j !== i) {
                const [x_j, _] = points[j];
                numerator *= (0 - x_j);
                denominator *= (x_i - x_j);
            }
        }
        return numerator / denominator;
    }

    let constantTerm = 0;
    for (let i = 0; i < k; i++) {
        const [_, y_i] = points[i];
        constantTerm += y_i * basis(i);
    }
    return constantTerm;
}
function solve(input) {
    const keys = input.keys;
    const n = keys.n;
    const k = keys.k;

    let points = [];
    for (let key in input) {
        if (key !== "keys") {
            const x = parseInt(key);
            const base = parseInt(input[key].base);
            const value = input[key].value;
            const y = decodeValue(base, value);

            points.push([x, y]);

            if (points.length === k) {
                break;
            }
        }
    }

    const constantTerm = lagrangeInterpolation(points);
    return constantTerm;
}

const input = {
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

const result = solve(input);
console.log(`The constant term is: ${result}`);
