const customers = require('../app/routes/customer');
const pets = require('../app/routes/pets');

module.exports = (app) => {
    app.get('/customers', customers.getAll);
    app.get('/customers/:customer_id', customers.getOne);
    app.get('/customers/:customer_id/matches', customers.getMatchedPets);
    app.post('/customers', customers.post);

    app.get('/pets', pets.getAll);
    app.get('/pets/:pet_id', pets.getOne);
    app.get('/pets/:pet_id/matches', pets.getMatchedCustomers);
    app.post('/pets', pets.post);
};
