const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));
// app.get('/', (request, response) => response.send('Hello World!'));

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const palette = app.locals.palettes.find(palette => palette.id === id);
  if (palette) {
    return response.status(200).json(palette);
  } else {
    return response.sendStatus(404);
  }
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palette => {
      response.status(200).json(palette);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const { palettes, name } = request.body;
  for (let requiredParameter of ['palettes', 'name']) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { palettes: <Array>, name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('palettes')
    .insert({
      color1: palettes[0],
      color2: palettes[1],
      color3: palettes[2],
      color4: palettes[3],
      color5: palettes[4],
      name
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
