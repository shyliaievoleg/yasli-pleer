var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var distortion = audioCtx.createWaveShaper();
var analyser = audioCtx.createAnalyser();

var audioElement = document.querySelector('.audio-player');
var canvas = document.getElementById('canvas');
const canvasCtx = canvas.getContext('2d');

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(audioCtx.destination);


canvasCtx.clearRect(0, 0, canvas.width, canvas.height);


function draw() { 
  drawVisual = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = 'rgb(255, 255, 255)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  var sliceWidth = (canvas.width / bufferLength) * 2.5;
  var sliceHeight;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {
   
    sliceHeight = dataArray[i];
    var y = canvas.height - sliceHeight/2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
};


draw();
