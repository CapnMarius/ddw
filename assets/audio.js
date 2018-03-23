var mic, fft, first, iterator, waveformLength, analyzer, loaded,
    vh = 1024,
    measurePoints = 1024; //1024 is the max!
var songs = [
    "Electric Tribe - unreleased demo 'So long' (2018)",
    "Electric Tribe - 'Met de Sterren Meebewegen'",
    "Electric Tribe - unreleased demo 'Running Electric/Euh' (2018)"];

var avg = function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return (sum / arr.length);
};

var osc = function (arr, avg) {
    var osc = 0;
    var dir = 0;
    for (var i = 0; i < arr.length; i++) {
        var pDir = dir;
        if (arr[i] > avg) {
            dir = 1;
        } else if (arr[i] < avg) {
            dir = -1;
        }
        if (pDir != dir) {
            osc++;
        }
    }
    return osc;
};

var Analyzer = function () {
    this.analyze = function (arr) {
        var avgVal = avg(arr);
        return {
            max: Math.max.apply(null, arr),
            avg: avgVal,
            osc: osc(arr, avgVal)
        };
    };
    this.measureY = function (y) {
        y = y - vh / 2;
        if (y < 0) {
            y = -y;
        }
        return y;
    };

};

var song;
var songIndex = 0;
var currentSong = songs[0];
function loadSong(onstart, onend) {
    song = loadSound("assets/test" + songIndex + ".mp3", function() {
        song.play();
        song.onended(function(event){
            songIndex ++;
            if (songIndex > 2) {
                location.reload();
                songIndex = 0;
            }
            onend(songs[songIndex]);
            setTimeout(function() {
                loadSong(onstart, onend)
            }, 2000)
        });
        fft.setInput(song);
        onstart();

        // song.rate(10);
    });
}

window.setupAudio = function (type) {
    analyzer = new Analyzer();
    fft = new p5.FFT();
    if (type === "mp3") {
        loadSong(function() {
            loaded = true;
            songReturned = false;
        }, function (song) {
            currentSong = song;
            loaded = false;
        })
    } else {
        mic = new p5.AudioIn();
        mic.start();
        fft.setInput(mic);
        loaded = true;
    }
};

var songReturned = false;
window.drawAudio = function () {
    if (loaded !== true && songReturned !== true) {
        songReturned = true;
        return {song: currentSong};
    }
    var waveform = fft.waveform();

    if (!first) {
        waveformLength = waveform.length;
        iterator = parseInt(waveformLength / measurePoints);
        first = true;
    }
    var mappedValues = [];
    for (var i = 0; i < waveformLength; i += iterator) {
        var y = map(waveform[i], -1, 1, 0, vh);
        mappedValues.push(analyzer.measureY(y));
    }

    return analyzer.analyze(mappedValues);
};