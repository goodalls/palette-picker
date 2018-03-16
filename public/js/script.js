const coloring = event => {
  if (
    (document.activeElement.tagName !== 'INPUT' && event.keyCode === 32) ||
    event.keyCode === 13 ||
    event.target.className === 'generate'
  ) {
    event.preventDefault();
    for (let i = 1; i < 6; i++) {
      if (
        $(`.color${i}`)
          .find('span')
          .hasClass('locked')
      ) {
        //do nothing
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

const savePalette = () => {
  const palette = $('.color');
  const name = $('.palette-name').val();
  const project_id = $('.drop-down option:selected').val();
  const colors = Object.keys(palette)
    .map(color => palette[color].textContent)
    .filter(color => color !== undefined);
  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify({
      palettes: colors,
      name,
      project_id
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  });
  window.location.reload()
};

const savedPalette = async () => {
  const initial = await fetch('/api/v1/palettes');
  const response = await initial.json();
  response.forEach(palette => {
    const { id, color1, color2, color3, color4, color5, name } = palette;
    const card = `<div id=${id} class='card'>
    <div class='name'>${name}</div>
    <div class='color-palette' style='background-color:${color1}'></div>
    <div class='color-palette' style='background-color:${color2}'></div>
    <div class='color-palette' style='background-color:${color3}'></div>
    <div class='color-palette' style='background-color:${color4}'></div>
    <div class='color-palette' style='background-color:${color5}'></div>
    <button class='delete'>delete</button>
    </div>`;
    $('#saved-palettes').append(card);
  });
};

function deletePalette(event) {
  const id = event.target.closest('.card').id;
  if (event.target.className === 'delete') {
    event.target.closest('.card').remove();
  
    //remove from database
    fetch(`/api/v1/palettes/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
}

const newProject = () => {
  const name = $('.project-name').val();
  fetch('/api/v1/projects', {
    method: 'POST',
    body: JSON.stringify({
      name
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  window.location.reload()
};

const appendProjects = async () => {
  const initial = await fetch('/api/v1/projects');
  const response = await initial.json();

  
  

  response.forEach( async projects => {
    const { name , id } = projects;
    const paletteInitial = await fetch(`/api/v1/projects/${id}/palettes`);
    const paletteResponse = await paletteInitial.json();

    const paletteCards = paletteResponse.map(palette => {
      const { id, color1, color2, color3, color4, color5, name } = palette;
    return `<div id=${id} class='card'>
    <div class='name'>${name}</div>
    <div class='color-palette' style='background-color:${color1}'></div>
    <div class='color-palette' style='background-color:${color2}'></div>
    <div class='color-palette' style='background-color:${color3}'></div>
    <div class='color-palette' style='background-color:${color4}'></div>
    <div class='color-palette' style='background-color:${color5}'></div>
    <button class='delete'>delete</button>
    </div>`;
    });

    const card = `<div id=${id} class='card'>
    <div class='name'>${name}</div>
    ${paletteCards}
    <button class='delete'>delete</button>
    </div>`;
    $('#saved-projects').append(card);
  });
}

const projectsDropDown = async () => {
  const initial = await fetch('/api/v1/projects');
  const response = await initial.json();
  response.forEach(project => {
    const { name, id } = project;
    $('.drop-down').append(`
      <option value='${id}'>${name}</option>
      `);
  });
};

const deleteProjects = async (event) => {
  const id = event.target.closest('.card').id;
  if (event.target.className === 'delete') {
    event.target.closest('.card').remove();
  
    //remove from database
    fetch(`/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
}

window.onload = () => {
  savedPalette();
  projectsDropDown();
  appendProjects();
  for (let i = 1; i < 6; i++) {
    const color = getRandomColor();
    $(`.color${i}`).css('background-color', color);
    $(`.color${i}`)
    .find('h4')
    .text(color);
  }
};
$(window).keypress(coloring);
$('#saved-palettes').click(deletePalette);
$('#saved-projects').click(deleteProjects);
$('.lock').click(event => {$(event.target).toggleClass('locked');});
$('.generate').click(coloring);
$('.save-palette').click(savePalette);
$('.new-project').click(newProject);
