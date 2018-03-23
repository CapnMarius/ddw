var canvasSize;
var calibrated = {min: 0, max: 500, avg: 100, osc: 200};
var calibrating = false;
var average = {};
var audioMax, audioOsc, audioAvgMax, audioAvgOsc;
var audio = {};
var circleCount = 9;
var drawSpeed = 0, drawSpeedMax = 10;
var lcmShapeD, loopCountshapeD, loopCount = 0, loopCountTotal;
var reverse = false;
var oldpoints = 1, newpoints1, newpoints2, newpoints3;
var drawEnabled = false;
var texts = [
    {t: " ", d: 500, c: introClear},
    {t: "'Klankbord'", d: 2500, c: introKlankbord},
    {t: "", d: 500, c: introClear},
    {t: "Audio visualisation by Marius Linders and Atelier Marjolein Linders", d: 2500, c: introAML},
    {t: "", d: 500, c: introClear},
    {t: "", d: 2500, c: introPlay},
    {t: "", d: 0, c: introClear}
];

window.setupVisual = function () {
    canvasSize = ( window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight );
    createCanvas(window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleCount; i += 1) {
        window ["c" + i] = {
            points: undefined,
            angle: undefined,
            radius: undefined,
            coordinates: undefined,
            direction: 1
        };
        window ["c" + i].coordinates = new Coordinates({
            canvas: canvas,
            radius: window ["c" + i].radius,
            angle: window ["c" + i].angle
        });
    }
    c7.direction = -1;
    c8.direction = -1;
    // strokeCap ( PROJECT ) ;
    strokeJoin(MITER);
    noSmooth()
};

window.drawVisual = function (audioData) {
    if (audioData.song !== undefined) {
        drawEnabled = false;
        texts [5].t = audioData.song;
        drawIntro(function () {
            drawEnabled = true;
        });
        return;
    }
    audio = audioData;
    if (calibrating !== false) {
        calibrating.listen(audioData);
    } else {
        analyzeAudioData(audioData);
    }
    if (drawEnabled) drawVisuals();
};

function drawIntro(cb, i) {
    stroke("white");
    strokeWeight(1);
    c2.points = 3;
    c3.points = 12;
    c4.points = 12;
    c5.points = 12;
    c2.coordinates.radius = 0;
    c3.coordinates.radius = canvasSize / 7.5;
    c4.coordinates.radius = canvasSize / 10;
    c5.coordinates.radius = canvasSize / 15;
    c2.angle = Math.PI * 2 / c2.points;
    c3.angle = Math.PI * 2 / c3.points;
    c4.angle = Math.PI * 2 / c4.points;
    c5.angle = Math.PI * 2 / c5.points;
    c2.coordinates.setOptions({radius: c2.radius, angle: c2.angle});
    c3.coordinates.setOptions({radius: c3.radius, angle: c3.angle});
    c4.coordinates.setOptions({radius: c4.radius, angle: c4.angle});
    c5.coordinates.setOptions({radius: c5.radius, angle: c5.angle});

    if (i === undefined) i = 0;
    if (texts [i] === undefined) {
        cb();
        return;
    } else {
        if (texts [i].t !== undefined) document.getElementById("song").innerHTML = texts [i].t;
        if (texts [i].c !== undefined) texts [i].c();
    }

    setTimeout(function () {
        drawIntro(cb, i + 1);
    }, texts [i].d);
}

function introKlankbord() {
    var lines = calculateLineArray(11);
    line(lines[0][3].x, lines[0][3].y, lines[2][3].x, lines[2][3].y);
    line(lines[2][3].x, lines[2][3].y, lines[4][3].x, lines[4][3].y);
    line(lines[4][3].x, lines[4][3].y, lines[6][3].x, lines[6][3].y);
    line(lines[6][3].x, lines[6][3].y, lines[8][3].x, lines[8][3].y);
    line(lines[8][3].x, lines[8][3].y, lines[10][3].x, lines[10][3].y);
    line(lines[10][3].x, lines[10][3].y, lines[0][3].x, lines[0][3].y);

    line(lines[0][4].x, lines[0][4].y, lines[2][4].x, lines[2][4].y);
    line(lines[2][4].x, lines[2][4].y, lines[4][4].x, lines[4][4].y);
    line(lines[4][4].x, lines[4][4].y, lines[6][4].x, lines[6][4].y);
    line(lines[6][4].x, lines[6][4].y, lines[8][4].x, lines[8][4].y);
    line(lines[8][4].x, lines[8][4].y, lines[10][4].x, lines[10][4].y);
    line(lines[10][4].x, lines[10][4].y, lines[0][4].x, lines[0][4].y);

    line(lines[0][5].x, lines[0][5].y, lines[2][5].x, lines[2][5].y);
    line(lines[2][5].x, lines[2][5].y, lines[4][5].x, lines[4][5].y);
    line(lines[4][5].x, lines[4][5].y, lines[6][5].x, lines[6][5].y);
    line(lines[6][5].x, lines[6][5].y, lines[8][5].x, lines[8][5].y);
    line(lines[8][5].x, lines[8][5].y, lines[10][5].x, lines[10][5].y);
    line(lines[10][5].x, lines[10][5].y, lines[0][5].x, lines[0][5].y);
}

function introAML() {
    var lines = calculateLineArray(11);
    line(lines[0][3].x, lines[0][3].y, lines[2][3].x, lines[2][3].y);
    line(lines[2][3].x, lines[2][3].y, lines[4][3].x, lines[4][3].y);
    line(lines[4][3].x, lines[4][3].y, lines[6][3].x, lines[6][3].y);
    line(lines[6][3].x, lines[6][3].y, lines[8][3].x, lines[8][3].y);
    line(lines[8][3].x, lines[8][3].y, lines[10][3].x, lines[10][3].y);
    line(lines[10][3].x, lines[10][3].y, lines[0][3].x, lines[0][3].y);

    line(lines[0][3].x, lines[0][3].y, lines[4][3].x, lines[4][3].y);
    line(lines[4][3].x, lines[4][3].y, lines[8][3].x, lines[8][3].y);
    line(lines[6][3].x, lines[6][3].y, lines[10][3].x, lines[10][3].y);

    line(lines[4][3].x, lines[4][3].y, lines[0][2].x, lines[0][2].y);
    line(lines[6][3].x, lines[6][3].y, lines[0][5].x, lines[0][5].y);
    line(lines[10][3].x, lines[10][3].y, lines[0][5].x, lines[0][5].y);
}

function introPlay() {
    var lines = calculateLineArray(11);
    line(lines[0][3].x, lines[0][3].y, lines[2][3].x, lines[2][3].y);
    line(lines[2][3].x, lines[2][3].y, lines[4][3].x, lines[4][3].y);
    line(lines[4][3].x, lines[4][3].y, lines[6][3].x, lines[6][3].y);
    line(lines[6][3].x, lines[6][3].y, lines[8][3].x, lines[8][3].y);
    line(lines[8][3].x, lines[8][3].y, lines[10][3].x, lines[10][3].y);
    line(lines[10][3].x, lines[10][3].y, lines[0][3].x, lines[0][3].y);

    line(lines[0][4].x, lines[0][4].y, lines[4][4].x, lines[4][4].y);
    line(lines[4][4].x, lines[4][4].y, lines[8][4].x, lines[8][4].y);
    line(lines[8][4].x, lines[8][4].y, lines[0][4].x, lines[0][4].y);
}

function introClear() {
    background(0, 0, 0);
}

function drawVisuals() {
    if (loopCount === 0) {
        calculatePoints();
    }

    visualBackground();
    /* cyan */
    visualShapeF();
    /* blue */
    visualShapeE();
    /* orange */
    visualShapeD();
    /* accent */
    visualShapeC();
    /* yellow */
    visualShapeB();
    /* highlights */
    visualShapeA();

    if (reverse === true) {
        if (delay(.5) === false) loopCount -= 2;
    } else {
        if (delay() === false) loopCount += 1;
    }

    if (loopCount < 1) {
        loopCount = 0;
        reverse = false;
    }
    else if (loopCount > loopCountTotal) {
        reverse = true;
    }
}

/* highlights */
function visualShapeA() {
    var lines = calculateLineArray(loopCount);
    var weightshapeA = [map(audioOsc, 100, 200, 0, 1 + audioAvgOsc / 4)];
    var colorshapeA = [255, 255, 255, map(audioOsc, 100, 200, 0, 100)];
    stroke.apply(null, colorshapeA);
    strokeWeight.apply(null, weightshapeA);
    for (var m = 0; m < lines.length; m += 1) {
        line(lines[m][0].x, lines[m][0].y, lines[m][1].x, lines[m][1].y);
    }
}

/* yellow */
function visualShapeB() {
    var hidden = map(loopCount, loopCountTotal / 3, loopCountTotal / 3 * 2, 0, 1);
    if (hidden > 1) {
        hidden = 1;
    } else if (hidden < 0) {
        hidden = 0;
    }

    var lines = calculateLineArray(loopCount);
    var weightshapeB = [1 + hidden * audioAvgOsc / 4];
    var colorshapeB = [255, map(audioOsc || 0, 200, 0, 255, 175), map(audioOsc || 0, 200, 0, 255, 0), hidden * 255];
    stroke.apply(null, colorshapeB);
    strokeWeight.apply(null, weightshapeB);
    for (var j = 0; j < lines.length; j += 1) {
        var p1 = j;
        var p2 = p1 - 1;
        p2 = lines[p2] === undefined ? 0 : p2;

        line(lines[p1][3].x, lines[p1][3].y, lines[p2][3].x, lines[p2][3].y);
        line(lines[p1][2].x, lines[p1][2].y, lines[p2][2].x, lines[p2][2].y);
        line(lines[p1][3].x, lines[p1][3].y, lines[p1][2].x, lines[p1][2].y);
    }
}

/* accent */
function visualShapeC() {
    var hidden = map(loopCount, loopCountTotal / 2, loopCountTotal, 0, 1);
    if (hidden > 1) {
        hidden = 1;
    } else if (hidden < 0) {
        hidden = 0;
    }
    strokeWeight(0);
    fill(map(audioAvgOsc || 0, 0, 250, 0, 150), map(audioAvgOsc || 0, 0, 250, 80, 120), 120, map(audioAvgMax, 50, 200, 0, hidden * 50));
    if (c2.points === 2) {
    } else if (c2.points === 3) {
        beginShape();
        for (var c = -c2.coordinates.angle / 4; c < TWO_PI; c += c2.coordinates.angle) {
            var cx = this.canvas.width / 2 + cos(c) * c2.coordinates.radius;
            var cy = this.canvas.height / 2 + sin(c) * c2.coordinates.radius;
            vertex(cx, cy);
        }
        endShape(CLOSE);
    } else if (c2.points === 4) {
        beginShape();
        for (var b = 0; b < TWO_PI; b += c2.coordinates.angle) {
            var bx = this.canvas.width / 2 + cos(b) * c2.coordinates.radius;
            var by = this.canvas.height / 2 + sin(b) * c2.coordinates.radius;
            vertex(bx, by);
        }
        endShape(CLOSE);
    } else if (c2.points === 5) {
        beginShape();
        for (var b = c2.coordinates.angle / 4; b < TWO_PI; b += c2.coordinates.angle) {
            var bx = this.canvas.width / 2 + cos(b) * c2.coordinates.radius;
            var by = this.canvas.height / 2 + sin(b) * c2.coordinates.radius;
            vertex(bx, by);
        }
        endShape(CLOSE);
    } else if (c3.points === 6) {
        beginShape();
        for (var b = -c3.coordinates.angle / 2; b < TWO_PI; b += c3.coordinates.angle) {
            var bx = this.canvas.width / 2 + cos(b) * c3.coordinates.radius;
            var by = this.canvas.height / 2 + sin(b) * c3.coordinates.radius;
            vertex(bx, by);
        }
        endShape(CLOSE);
    } else if (c3.points === 8) {
        beginShape();
        for (var b = -Math.PI; b < TWO_PI; b += c3.coordinates.angle) {
            var bx = this.canvas.width / 2 + cos(b) * c3.coordinates.radius;
            var by = this.canvas.height / 2 + sin(b) * c3.coordinates.radius;
            vertex(bx, by);
        }
        endShape(CLOSE);
    }
}

/* orange */
function visualShapeD() {
    var lines = calculateLineArray(loopCount);
    var weightshapeD = [2];
    var colorshapeD = [map(audioOsc || 0, 200, 0, 200, 255), map(audioOsc || 0, 100, 0, 100, 175), 0, map(loopCount, 0, 10, 0, 255)];
    stroke.apply(null, colorshapeD);
    strokeWeight.apply(null, weightshapeD);
    if (c2.points === 2) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - loopCountTotal;
            var p4 = p3 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

        }
    } else if (c2.points === 3) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - loopCountTotal;
            var p4 = p3 - 1;
            var p5 = p3 - loopCountTotal;
            var p6 = p5 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

            line(lines[p5][5].x, lines[p5][5].y, lines[p6][5].x, lines[p6][5].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p6][4].x, lines[p6][4].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p5][5].x, lines[p5][5].y);

        }
    } else if (c2.points === 4) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - loopCountTotal;
            var p4 = p3 - 1;
            var p5 = p3 - loopCountTotal;
            var p6 = p5 - 1;
            var p7 = p5 - loopCountTotal;
            var p8 = p7 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

            line(lines[p5][5].x, lines[p5][5].y, lines[p6][5].x, lines[p6][5].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p6][4].x, lines[p6][4].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p5][5].x, lines[p5][5].y);

            line(lines[p7][5].x, lines[p7][5].y, lines[p8][5].x, lines[p8][5].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p8][4].x, lines[p8][4].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p7][5].x, lines[p7][5].y);

        }
    } else if (c2.points === 5) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - loopCountTotal;
            var p4 = p3 - 1;
            var p5 = p3 - loopCountTotal;
            var p6 = p5 - 1;
            var p7 = p5 - loopCountTotal;
            var p8 = p7 - 1;
            var p9 = p7 - loopCountTotal;
            var p10 = p9 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

            line(lines[p5][5].x, lines[p5][5].y, lines[p6][5].x, lines[p6][5].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p6][4].x, lines[p6][4].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p5][5].x, lines[p5][5].y);

            line(lines[p7][5].x, lines[p7][5].y, lines[p8][5].x, lines[p8][5].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p8][4].x, lines[p8][4].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p7][5].x, lines[p7][5].y);

            line(lines[p9][5].x, lines[p9][5].y, lines[p10][5].x, lines[p10][5].y);
            line(lines[p9][4].x, lines[p9][4].y, lines[p10][4].x, lines[p10][4].y);
            line(lines[p9][4].x, lines[p9][4].y, lines[p9][5].x, lines[p9][5].y);

        }
    } else if (c2.points === 6) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - 28;
            var p4 = p3 - 1;
            var p5 = p3 - 28;
            var p6 = p5 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

            line(lines[p5][5].x, lines[p5][5].y, lines[p6][5].x, lines[p6][5].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p6][4].x, lines[p6][4].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p5][5].x, lines[p5][5].y);

        }
    } else if (c2.points === 8) {
        for (var i = 360; i < lines.length; i += 1) {
            var p1 = i;
            var p2 = p1 - 1;
            var p3 = p1 - 45;
            var p4 = p3 - 1;
            var p5 = p3 - 45;
            var p6 = p5 - 1;
            var p7 = p5 - 45;
            var p8 = p7 - 1;

            line(lines[p1][5].x, lines[p1][5].y, lines[p2][5].x, lines[p2][5].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p2][4].x, lines[p2][4].y);
            line(lines[p1][4].x, lines[p1][4].y, lines[p1][5].x, lines[p1][5].y);

            line(lines[p3][5].x, lines[p3][5].y, lines[p4][5].x, lines[p4][5].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p4][4].x, lines[p4][4].y);
            line(lines[p3][4].x, lines[p3][4].y, lines[p3][5].x, lines[p3][5].y);

            line(lines[p5][5].x, lines[p5][5].y, lines[p6][5].x, lines[p6][5].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p6][4].x, lines[p6][4].y);
            line(lines[p5][4].x, lines[p5][4].y, lines[p5][5].x, lines[p5][5].y);

            line(lines[p7][5].x, lines[p7][5].y, lines[p8][5].x, lines[p8][5].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p8][4].x, lines[p8][4].y);
            line(lines[p7][4].x, lines[p7][4].y, lines[p7][5].x, lines[p7][5].y);

        }
    }
}

/* blue */
function visualShapeE() {
    var lines = calculateLineArray(loopCount);

    // var weightshapeE2 = [8 + 1.25 * audioAvgOsc];
    // var colorshapeE2 = [0, 0, 0, 10];
    // stroke.apply(null, colorshapeE2);
    // strokeWeight.apply(null, weightshapeE2);
    // for (var l = 0; l < lines.length; l += 1) {
    //     var p1 = l;
    //     var p2 = p1 - 1;
    //     p2 = lines[p2] === undefined ? 0 : p2;
    //     line(lines[p1][6].x, lines[p1][6].y, lines[p2][6].x, lines[p2][6].y);
    // }

    var weightshapeE = [2 + audioAvgOsc];
    var colorshapeE = [map(audioAvgOsc || 0, 0, 250, 0, 150), map(audioAvgOsc || 0, 0, 250, 80, 120), 120];
    stroke.apply(null, colorshapeE);
    strokeWeight.apply(null, weightshapeE);
    for (var l = 0; l < lines.length; l += 1) {
        var p1 = l;
        var p2 = p1 - 1;
        p2 = lines[p2] === undefined ? 0 : p2;
        line(lines[p1][6].x, lines[p1][6].y, lines[p2][6].x, lines[p2][6].y);
    }
}

/* cyan */
function visualShapeF() {
    var lines = calculateLineArray(loopCount);
    var weightshapeF = [2];
    var colorshapeF = [0, map(audioOsc || 0, 100, 0, 150, 220), map(audioOsc || 0, 100, 0, 150, 180), map(loopCount, 0, loopCountTotal / 2, 0, 255)];
    stroke.apply(null, colorshapeF);
    strokeWeight.apply(null, weightshapeF);
    for (var k = 1; k < lines.length; k += 1) {
        var p1 = k;
        var p2 = p1 - 1;
        line(lines[p1][7].x, lines[p1][7].y, lines[p2][7].x, lines[p2][7].y);
        line(lines[p1][7].x, lines[p1][7].y, lines[p2][8].x, lines[p2][8].y);
        line(lines[p1][8].x, lines[p1][8].y, lines[p2][8].x, lines[p2][8].y);
        line(lines[p1][8].x, lines[p1][8].y, lines[p2][7].x, lines[p2][7].y);
    }

}

function visualBackground() {
    var colorBackground = [0, 0, 0, 30];
    if (audioOsc > 75 && audioOsc < 100) {
        colorBackground = [map(audioMax || 0, 200, 0, 60, 0), 0, map(audioMax || 0, 200, 0, 30, 0), 40];
    } else if (audioOsc > 100) {
        colorBackground = [map(audioMax || 0, 200, 0, 120, 60), 0, 30, 40];
    }
    background.apply(null, colorBackground);
}

function delay(multiplier) {
    if (multiplier === undefined) {
        multiplier = 1;
    }
    if (drawSpeed >= drawSpeedMax * multiplier) {
        drawSpeed = 0;
        drawSpeedMax = map(audioAvgMax || 0, 250, 0, 0, 1);
        if (drawSpeedMax > 1) {
            drawSpeedMax = 1;
        } else if (drawSpeedMax < 1) {
            drawSpeedMax = 1;
        }
        return false;
    } else {
        drawSpeed += 1;
        return true;
    }
}

function calculatePoints() {
    // newpoints1 = 6;
    newpoints1 = Math.round(map(audioAvgMax || 0, 50, 250, 2, 5));
    if (newpoints1 < 2) {
        newpoints1 = 2;
    } else if (newpoints1 > 5) {
        newpoints1 = 5;
    }
    if (newpoints1 === oldpoints) {
        newpoints1 = newpoints1 + 1;
        if (newpoints1 === 6) {
            newpoints1 = 2;
        }
    }
    oldpoints = newpoints1;
    newpoints2 = newpoints1 * ( newpoints1 + 1 );
    newpoints3 = newpoints1 * ( newpoints1 * 2 + 1);

    /* highlights */
    c0.points = newpoints2;
    c1.points = newpoints2;
    /* yellow */
    c3.points = newpoints2;
    c2.points = newpoints1;
    /* orange */
    if (newpoints1 === 6) {
        c4.points = 21;
        c5.points = 12;
    } else if (newpoints2 === 8) {
        c4.points = 72;
        c5.points = 20;
    } else {
        c4.points = newpoints3;
        c5.points = newpoints2;
    }
    /* blue */
    c6.points = newpoints2;
    /* cyan */
    c7.points = newpoints2;
    c8.points = newpoints2;

    lcmShapeD = lcm(c4.points, c5.points);
    loopCountTotal = lcmShapeD / c2.points;

    var obj = {};
    for (var i = 0; i < circleCount; i += 1) {
        var circle = window ["c" + i];
        circle.angle = Math.PI * 2 / circle.points;
        circle.coordinates.setOptions({radius: circle.radius, angle: circle.angle});
        obj ["c" + 1] = circle;
    }
    return obj;
}

function calculateLineArray(loopCount) {
    loopCount = loopCount + 360;
    for (var i = 0; i < circleCount; i += 1) {
        window ["c" + i].coordinates.init();
    }
    var lines = [];
    for (var i = 0; i < loopCount; i += 1) {
        var circles = [];
        for (var j = 0; j < circleCount; j += 1) {
            window ["c" + j].coordinates.move(window ["c" + j].direction);
            circles.push({x: window ["c" + j].coordinates.pos.x, y: window ["c" + j].coordinates.pos.y});
        }
        lines.push(circles);
    }
    return lines;
}

function analyzeAudioData(data) {
    audioOsc = audio.avgOsc = getAvg(average, "osc", data.osc, 10);
    audioAvgOsc = audio.avgOsc = getAvg(average, "osc", data.osc, 200);
    audioMax = audio.avgMax = getAvg(average, "max", data.max, 10);
    audioAvgMax = audio.avgMax = getAvg(average, "max", data.max, 200);

    var circleSize = canvasSize * 0.35 + audioAvgOsc / 2;
    var quarterAvgMax = audioAvgMax / 4;
    var hidden = map(loopCount, 0, 40, 0, 1);
    if (hidden > 1) {
        hidden = 1;
    }

    /* highlights */
    c0.coordinates.radius = 0;
    c1.coordinates.radius = canvasSize * map(audioOsc, 100, 200, 0, 2);
    /* yellow */
    c2.coordinates.radius = canvasSize * 0.25 - audioAvgMax / 5;
    c3.coordinates.radius = circleSize;
    /* orange */
    c4.coordinates.radius = canvasSize * 0.25 - quarterAvgMax * 2;
    c5.coordinates.radius = circleSize + audioAvgMax;
    /* blue */
    c6.coordinates.radius = circleSize + 2 * audioAvgOsc;
    /* cyan */
    c7.coordinates.radius = circleSize - hidden * audioOsc / 2 * audioOsc / 3;
    c8.coordinates.radius = circleSize + hidden * audioOsc / 4 * audioOsc / 3;
}

var Coordinates = function (options) {

    this.calculate_coordinates = function (direction, pos) {
        pos = pos || {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        pos.x -= Math.sin(direction > 0 ? ( this.i += this.angle ) : ( this.i -= this.angle )) * this.radius;
        pos.y += Math.sin(direction > 0 ? ( this.j += this.angle ) : ( this.j -= this.angle )) * this.radius;
        return pos;
    };

    this.move = function (direction) {
        this.pos = this.calculate_coordinates(direction);
        return this;
    };

    this.init = function () {
        this.i = 0;
        this.j = Math.PI / 2;
    };

    this.setOptions = function (options) {
        var doInit = true;
        if (options.radius) {
            this.radius = options.radius;
        } else {
            doInit = false;
        }
        if (options.angle) {
            this.angle = options.angle;
        } else {
            doInit = false;
        }
        if (options.canvas) {
            this.canvas = canvas;
        }
        if (doInit) {
            this.init();
        }
    };

    this.setOptions(options);
    return this;
};

function map(source, actualMin, actualMax, targetMin, targetMax) {
    return actualMin > actualMax ? actualMin > source ? ( source - actualMin ) * ( targetMax - targetMin ) / ( actualMax - actualMin ) + targetMin : targetMin : actualMax > actualMin ? actualMax > source ? ( source - actualMin ) * ( targetMax - targetMin ) / ( actualMax - actualMin ) + targetMin : targetMax : void 0
}

function avg(arr) {
    var tmp = 0;
    for (var i = 0; i < arr.length; i += 1) {
        tmp += arr [i];
    }
    return Math.round(tmp / arr.length);
}

function getAvg(average, type, value, limit) {
    if (!Array.isArray(average [type])) {
        average [type] = [];
    }
    while (average [type].length > limit) {
        average [type].shift();
    }
    average [type].push(value);
    return avg(average [type]);
}

function gcd(op, ip) {
    while (ip) {
        var t = ip;
        ip = op % ip;
        op = t;
    }
    return op;
}

function lcm(op, ip) {
    op = Math.abs(op);
    ip = Math.abs(ip);
    if (!op || !ip) {
        return 0;
    }
    return ( Math.abs(( op * ip ) / gcd(op, ip)) );
}

function windowResized() {
    canvasSize = ( window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight );
    createCanvas(window.innerWidth, window.innerHeight);
}