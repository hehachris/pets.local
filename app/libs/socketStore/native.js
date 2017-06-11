const _ = require('lodash');

const sockets = {};

module.exports = {
    getStore() {
        return sockets;
    },
    getSize() {
        return Object.keys(sockets).length;
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
