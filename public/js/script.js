const coloring = event => {
  console.log(document.activeElement.tagName);
  
  if (document.activeElement.tagName !== 'INPUT' && event.keyCode === 32 || event.keyCode === 13 || event.target.className === 'generate' ) {
    for (let i = 1; i < 6; i++) {
      if (
        $(`.color${i}`)
          .find('span')
          .hasClass('locked')
      ) {
      } else {
        const color = getRandomColor();
        $(`.color${i}`).css('background-color', color);
        $(`.color${i}`)
          .find('h4')
          .text(color);
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

const savePalette = (event) => {
  const palette = $('.color')
  const colors = Object.keys(palette).map(color => palette[color].textContent).filter(color=> color !== undefined);
  console.log(colors);
  //needs to post to backend
}

$(window).keypress(coloring);
window.onload = () => {
  for (let i = 1; i < 6; i++) {
    const color = getRandomColor();
    $(`.color${i}`).css('background-color', color);
    $(`.color${i}`)
      .find('h4')
      .text(color);
  }
};

$('.lock').click(event => {
  $(event.target).toggleClass('locked');
});

$('.generate').click(coloring);
$('.save-palette').click(savePalette);

