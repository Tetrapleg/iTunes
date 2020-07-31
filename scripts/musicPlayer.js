import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimeTotal = document.querySelector('.audio-time__total'),
        playlist = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused,
          track = playlist[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed){
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }

  };

  const prevTrack = () => {
    if (trackIndex !== 0){
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  const nextTrack = () => {
    if (trackIndex === playlist.length - 1){
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };



  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('audio-button__play')){
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused){
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')){
      prevTrack();
    }

    if (target.classList.contains('audio-button__next')){
      nextTrack();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  const updateTime = () => {
    const duration = audioPlayer.duration,
          currentTime = audioPlayer.currentTime,
          progress = (currentTime / duration) * 100,
          minutesPassed = Math.floor(currentTime / 60) || '0',
          secondPassed = Math.floor(currentTime % 60) || '0',
          minutesTotal = Math.floor(duration / 60) || '0',
          secondTotal = Math.floor(duration % 60) || '0';

    audioProgressTiming.style.width = progress + '%';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`;
  };

  audioPlayer.addEventListener('timeupdate', updateTime);

  audioProgress.addEventListener('click', event => {
    const x = event.offsetX,
          allWidth = audioProgress.clientWidth,
          progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  audioPlayer.addEventListener('canplay', () => {
    updateTime();
  });

  musicPlayerInit.stop = () => {
    if (!audioPlayer.paused){
      audioPlayer.pause();
      audio.classList.remove('play');
      audioButtonPlay.classList.remove('fa-pause');
      audioButtonPlay.classList.add('fa-play');
    }
  };
};