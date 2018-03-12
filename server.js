const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
