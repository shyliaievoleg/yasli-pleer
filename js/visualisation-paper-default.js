var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var distortion = audioCtx.createWaveShaper();
var analyser = audioCtx.createAnalyser();

var audioElement = document.querySelector('.audio-player');

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);

var path = new Path({
    strokeColor: 'black',
    strokeWidth: 2,
    strokeJoin: 'miter',
    strokeCap: 'butt',
    miterLimit: 30
});

var step = (view.size.width / bufferLength) * 2.5;

for (var i = 0; i <= bufferLength; i++) {
  path.add(new Point(i * step, view.size.height / 2));
}

view.onFrame = function() {

  var step = (view.size.width / bufferLength) * 2.5;
  var stepHeight;

  analyser.getByteFrequencyData(dataArray);

  for (var i = 1; i <= bufferLength; i++) {

    stepHeight = dataArray[i] * 1.5;

    path.segments[i].point = [i * step, (view.size.height - stepHeight) / 2];
  }

  path.position = view.center;
}



