const image = document.querySelector('#reimu');
const sound = document.querySelector('#reimu_s');

image.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();
});

