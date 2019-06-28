var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioPlayer = document.querySelector('.audio-player');

// Создаем MediaElementAudioSourceNode
// На основе HTMLMediaElement
var source = audioCtx.createMediaElementSource(audioPlayer);

var analyser = audioCtx.createAnalyser();

analyser.smoothingTimeConstant = 0.25;
analyser.fftSize = 512;
// Create the buffer to receive the analyzed data.
var freqByteData = new Uint8Array(analyser.frequencyBinCount);

source.connect(analyser);
analyser.connect(audioCtx.destination);


var leftPath = new Path({
    strokeColor: 'black',
});

leftPath.fullySelected = true;
var amount = 8;
var step = view.size.width / (amount + 1);

for (var i = 0; i <= amount; i++) {
  leftPath.add(new Point(i * step, 0));
}

var group = new Group({
  children: [leftPath],
  transformContent: false,
  strokeWidth: 2,
  strokeJoin: 'miter',
  strokeCap: 'butt',
  miterLimit: 30,
  pivot: leftPath.position
});

view.onFrame = function() {
  var step = view.size.width / (amount + 1);
  var scale = view.size.height / 1.75;
  analyser.getByteFrequencyData(freqByteData);
  var leftBands = getEqualizerBands(freqByteData, true);

  for (var i = 1; i <= amount; i++) {
    leftPath.segments[i].point = [i * step, -leftBands[i - 1] * scale];
  }
  leftPath.smooth();
  group.pivot = [leftPath.position.x, 0];
  group.position = view.center;
}

function getEqualizerBands(data) {
  var bands = [];
  var amount = Math.sqrt(data.length) / 2;
  for(var i = 0; i < amount; i++) {
    var start = Math.pow(2, i) - 1;
    var end = start * 2 + 1;
    var sum = 0;
    for (var j = start; j < end; j++) {
      sum += data[j];
    }
    var avg = sum / (255 * (end - start));
    bands[i] = Math.sqrt(avg / Math.sqrt(2));
  }
  return bands;
}

// leftPath.closed = true;