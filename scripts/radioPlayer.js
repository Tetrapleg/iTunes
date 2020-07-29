export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop'),
        volumeProgress = document.querySelector('.volume-progress');
  
  volumeProgress.style.width = '150px';

  const audio = new Audio();
  audio.type = 'audio/aac'; //потоковое радио

  radioStop.disabled = true;
  radioStop.style.marginRight = '35px';
  volumeProgress.style.marginRight = '15px';
  volumeProgress.style.marginLeft = '15px';
  audio.volume = volumeProgress.value;

  const createElementsOfVolume = () => {
    // <i class="fa fa-volume-up" aria-hidden="true"></i>
    const volumeOn = document.createElement('i');
    volumeOn.classList.add('fa fa-volume-up');
    volumeProgress.append(volumeOn);
  };

  const changeIconPlay = () => {
    if (audio.paused){
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  };

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  radioNavigation.addEventListener('change', event => {
    const target = event.target,
          parrent = target.closest('.radio-item');

    selectItem(parrent);

    const title = parrent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parrent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;

    audio.play();
    changeIconPlay();
  });
  
  radioStop.addEventListener('click', () => {
    if (audio.paused){
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  volumeProgress.addEventListener('input', () => {
    audio.volume = volumeProgress.value;
  });
};


