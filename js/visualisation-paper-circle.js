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

var circle = new Path({
  closed: true,
  strokeColor: 'black',
  strokeWidth: 2
});

var radius = view.size.height / 4;

var angle = ((2 * Math.PI) / bufferLength);


for (i = 0; i < bufferLength; i++) {
  circle.add(new Point(
    radius * Math.cos(angle * i), 
    radius * Math.sin(angle * i)
  ));
}

circle.position = view.center;


view.onFrame = function() {

  var angle = ((2 * Math.PI) / bufferLength);

  analyser.getByteFrequencyData(dataArray);

  // For as many vertices in the shape, add a point
  for(i = 0; i < bufferLength; i++) {

    stepHeight = dataArray[i] / 75.0;

    var shiftX = radius * Math.cos(angle * i) * stepHeight;
    var shiftY = radius * Math.sin(angle * i) * stepHeight;

    circle.segments[i].point = [shiftX, shiftY];

  }
  circle.position = view.center;
}



