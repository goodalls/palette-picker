
  

const coloring = (event) => {
  if (event.keyCode === 32) {
    console.log($('.color1'));
    
    for (let i = 1; i < 6; i++) {
      console.log($(`.color${i}`));
      
      $(`.color${i}`).css('background-color', getRandomColor(''));
    }
  }
};

function getRandomColor(string) {
  if (string.length === 6) {
    return '#' + string;
  }
  const letters = '0123456789ABCDEF';
  const newString = string += letters[Math.round(Math.random() * 16)];
  return getRandomColor(newString);
}

$(window).keypress(coloring);