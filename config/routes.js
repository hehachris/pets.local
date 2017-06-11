const customers = require('../app/routes/customer');
const pets = require('../app/routes/pets');

module.exports = (app) => {
    app.get('/customers', customers.getAll);
    app.get('/customers/:customer_id', customers.getOne);
    app.post('/customers', customers.post);

    app.get('/pets', pets.getAll);
    app.get('/pets/:pet_id', pets.getOne);
    app.post('/pets', pets.post);
};
