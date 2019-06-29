window.onload = function() {

    // TODO: Throw errors if browser can't play sound or can't dowload it.

    // Variables
    var audioPlayer = document.querySelector('.audio-player');
    var volume = document.querySelector('.media-player__volume-element');
    var progress = document.querySelector('.media-player__progress-element');
    var playBtn = document.querySelector('.media-player__button_play');
    var stopBtn = document.querySelector('.media-player__button_stop');
    var playSlowBtn = document.querySelector('.media-player__button_slow');
    var playFastBtn = document.querySelector('.media-player__button_fast');
    var volumeBtn = document.querySelector('.media-player__volume-btn');
    var iconVolume = document.querySelector('.media-player__volume-btn i');
    var iconPlay = document.querySelector('.media-player__button_play i');
    var playerSpeedStep = 0.5;

    // Events
    playBtn.addEventListener('click', startPausePlaying);

    stopBtn.addEventListener('click', stopPlaying);

    playSlowBtn.addEventListener('click', slowerPlaying);

    playFastBtn.addEventListener('click', fasterPlaying);

    volumeBtn.addEventListener('click', mute);

    audioPlayer.onvolumechange = function() {
        volume.value = audioPlayer.volume;
    }

    volume.oninput = function() {
        audioPlayer.volume = this.value;

        if (audioPlayer.volume === 0) {
            iconVolume.classList.add('fa-volume-mute');
            iconVolume.classList.remove('fa-volume-up');
        } else {
            iconVolume.classList.add('fa-volume-up');
            iconVolume.classList.remove('fa-volume-mute');
        }
    }

    audioPlayer.ontimeupdate = function() {
        progress.value = (this.currentTime / this.duration) * 100;

        if (this.currentTime === this.duration) {
            progress.value = 0;
            audioPlayer.pause();
            iconPlay.classList.add('fa-play');
            iconPlay.classList.remove('fa-pause');
        }
    }

    progress.oninput = function() {
        audioPlayer.currentTime = +this.value / 100 * +audioPlayer.duration;
    }

    // Helper function
    function startPausePlaying(e) {
        if (iconPlay.classList.contains('fa-play')) {
            audioPlayer.play();
            iconPlay.classList.add('fa-pause');
            iconPlay.classList.remove('fa-play');
        } else {
            audioPlayer.pause();
            iconPlay.classList.add('fa-play');
            iconPlay.classList.remove('fa-pause');
        }

        e.preventDefault();
    }

    function stopPlaying(e) {
        audioPlayer.pause();
        iconPlay.classList.add('fa-play');
        iconPlay.classList.remove('fa-pause');
        audioPlayer.currentTime = 0;

        e.preventDefault();
    }

    function slowerPlaying(e) {
        audioPlayer.playbackRate -= playerSpeedStep;
    }

    function fasterPlaying(e) {
        audioPlayer.playbackRate += playerSpeedStep;
    }
    
    //TODO: volume value return to current before mute.
    //TODO: keep visualizing while mute
    function mute(e) {
        if (!iconVolume.classList.contains('fa-volume-mute')) {
            audioPlayer.volume = 0;
            iconVolume.classList.add('fa-volume-mute');
            iconVolume.classList.remove('fa-volume-up'); 
        } else {
            audioPlayer.volume = 1;
            iconVolume.classList.add('fa-volume-up');
            iconVolume.classList.remove('fa-volume-mute');
        }
    }
}