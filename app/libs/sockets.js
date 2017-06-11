module.exports = (app, io) => {
    const sockets = {};

    app.use((req, res, next) => {
        req.sockets = sockets;
        next();
    });

    io.on('connection', (socket) => {
        socket.on('user.watch.start', (data) => {
            const customerId = parseInt(data.customer_id, 10);

            sockets[customerId] = socket;

            socket.emit('hello', {
                customer_id: customerId
            });
        });
    });
};
