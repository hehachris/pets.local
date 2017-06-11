const models = require('../../models');

module.exports = {
    findById(id, options) {
        return models.CustomerPreference.findById(id, options);
    }
};
