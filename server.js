const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
  const { palettes } = app.locals;
  response.status(200).json(palettes);
});

app.post('/api/v1/palettes', (request, response) => {
  const id = Date.now();
  const { palettes, name } = request.body;
  app.locals.palettes.unshift({ 
    id, 
    name, 
    color1:palettes[0],
    color2:palettes[1],
    color3:palettes[2],
    color4:palettes[3],
    color5:palettes[4]
  });
  response.status(201).json({ 
    id, 
    name, 
    color1:palettes[0],
    color2:palettes[1],
    color3:palettes[2],
    color4:palettes[3],
    color5:palettes[4]
  });
});

app.locals.palettes = [];

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});









// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser')

// app.set('port', process.env.PORT || 3000);
// app.locals.title = 'Chat Box';

// app.use(bodyParser.json());

// app.locals.messages = [
//   { id: 'a1', message: 'Hello World' },
//   { id: 'b2', message: 'Goodbye World' }
// ];

// app.get('/', (request, response) => {
//   response.send('Oh hey Chat Box');
// });
// app.get('/api/v1/messages', (req, res) => {
//   const { messages } = app.locals;

//   res.status(200).json(messages);
// });

// app.get('/api/v1/messages/:id', (request, response) => {
//   const { id } = request.params;
//   const message = app.locals.messages.find(message => message.id === id);
//   if (message) { 
//     return response.status(200).json(message);
//   } else {
//     return response.sendStatus(404);
//   }
// });

// app.post('/api/v1/messages', (request, response) => {
//   const id = Date.now();
//   const { message } = request.body;

//   app.locals.messages.push({ id, message });

//   response.status(201).json({ id, message });
// });

// app.listen(app.get('port'), () => {
//   console.log(`${app.locals.title} is running on ${app.get('port')}.`);
// });
