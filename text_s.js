const text = document.querySelector('#text');
const sound = document.querySelector('#text_s');

text.addEventListener('click', () => {
  sound.currentTime = 0;
  sound.play();
});

