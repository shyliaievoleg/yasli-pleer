// Create Shape
var circle = new Path({
  closed: true,
  strokeColor: 'black',
  strokeWidth: 2
});

var radius = view.size.height / 6;

var angle = ((2 * Math.PI) / bufferLength);

for (var i = 0; i < bufferLength; i++) {
  circle.add(new Point(
    radius * Math.cos(angle * i), 
    radius * Math.sin(angle * i)
  ));
}

// Create AudioContext
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var distortion = audioCtx.createWaveShaper();
var analyser = audioCtx.createAnalyser();

var audioElement = document.querySelector('.audio-player');

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

// Create MediaElementAudioSourceNode
source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);

// Create Visual Effects
view.onFrame = function() {

  var angle = ((2 * Math.PI) / bufferLength);

  analyser.getByteTimeDomainData(dataArray);

  for(var i = 0; i < bufferLength; i++) {

    stepShift = dataArray[i] / 75.0;

    var shiftX = radius * Math.cos(angle * i) * stepShift;
    var shiftY = radius * Math.sin(angle * i) * stepShift;

    circle.segments[i].point = [shiftX, shiftY];

  }
  circle.position = view.center;
}



