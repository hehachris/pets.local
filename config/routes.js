const pets = require('../app/routes/pets');

module.exports = (app) => {
    app.get('/pets', pets.getAll);
    app.get('/pets/:pet_id', pets.getOne);
    app.post('/pets', pets.post);
};
