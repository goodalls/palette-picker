const coloring = event => {
  if (event.keyCode === 32 || event.keyCode === 13) {
    for (let i = 1; i < 6; i++) {
      $(`.color${i}`).css('background-color', getRandomColor());
    }
  }
};

function getRandomColor() {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(-6)
  );
}

$(window).keypress(coloring);
window.onload = () => {
  for (let i = 1; i < 6; i++) {
    $(`.color${i}`).css('background-color', getRandomColor());
  }
};

$('.lock').click(event => {
  $(event.target).toggleClass('locked');
});
