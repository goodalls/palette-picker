const coloring = event => {
  if (event.keyCode === 32 || event.keyCode === 13) {
    for (let i = 1; i < 6; i++) {
      if ($(`.color${i}`).find('span').hasClass('locked')) {
        console.log('locked');
      } else {
        const color = getRandomColor();
        $(`.color${i}`).css('background-color', color);
        $(`.color${i}`).find('h4').text(color);
      }
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
    const color = getRandomColor();
    $(`.color${i}`).css('background-color', color);
    $(`.color${i}`).find('h4').text(color);
  }
};

$('.lock').click(event => {
  $(event.target).toggleClass('locked');
});

$('.generate').click(coloring);
