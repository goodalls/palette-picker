const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//middlewear setup for body parser and port and setting the title to 'palette picker'
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));

// for some reason this code was breaking my tests. but the docs made it seem like I did it correctly.

// app.use((request, respond) => {
//   respond.status(404).send('Sorry, that is not found.');
// });

app.get('*', (request, response)=> {
  response.redirect('https://' + request.headers.host + request.url);
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
  const { palettes, name, project_id } = request.body;
  for (let requiredParameter of ['palettes', 'name', 'project_id']) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { palettes: <Array>, name: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database('palettes')
    .insert(
      {
        color1: palettes[0],
        color2: palettes[1],
        color3: palettes[2],
        color4: palettes[3],
        color5: palettes[4],
        name,
        project_id
      },
      'id'
    )
    .then(palette => {
      response.status(201).json(palette);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  database('palettes')
    .where('id', id)
    .select()
    .del()
    .then(palette => {
      response.status(200).json(palette);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/projects', (request, response) => {
  database('projects')
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects', (request, response) => {
  const { name } = request.body;
  for (let requiredParameter of ['name']) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  database('projects')
    .insert({ name }, 'id')
    .then(projects => {
      response.status(201).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  database('projects')
    .where('id', id)
    .select()
    .del()
    .then(project => {
      response.status(200).json(project);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  const { id } = request.params;
  database('palettes')
    .where('project_id', id)
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
