const _ = require('lodash');

const sockets = {};

module.exports = {
    getSize() {
        return Object.keys(sockets).length;
    },
    getByKey(key) {
        return sockets[key];
    },
    addSocket(socket, customKey) {
        const key = typeof customKey !== 'undefined' ? customKey : socket.id;
        sockets[key] = socket;
    },
    deleteByKey(key) {
        delete sockets[key];
    },
    deleteBySocketId(id) {
        const key = _.findKey(sockets, { id });
        this.deleteByKey(key);
    }
};
