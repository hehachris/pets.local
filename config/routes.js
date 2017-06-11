const pets = require('../app/routes/pets');

module.exports = (app) => {
    app.get('/pets', pets.getAll);
};
