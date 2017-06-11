const socketStore = require('./socketStore/native');

module.exports = (app, io) => {
    io.on('connection', (socket) => {
        socket.on('user.watch.start', (data) => {
            const customerId = parseInt(data.customer_id, 10);

            socketStore.addSocket(socket, customerId);

            socket.emit('hello', {
                customer_id: customerId
            });
        });

        socket.on('disconnect', () => {
            socketStore.deleteBySocketId(socket.id);
        });
    });
};
