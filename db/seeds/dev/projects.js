exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(() => knex('palettes').del())
    .then(() => {
      return Promise.all([
        knex('projects')
          .insert(
            {
              name: 'placholder_project'
            },
            'id'
          )
          .then(palette => {
            return knex('palettes').insert([
              {
                color1: '#8daa7f',
                color2: '#60760d',
                color3: '#00d72b',
                color4: '#1dd526',
                color5: '#559cfa',
                name: 'placeholder_palette',
                project_id: palette[0]
              }
            ]);
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]); 
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

