module.exports = (app, io) => {
    io.on('connection', (socket) => {
        socket.on('user.watch.start', (data) => {
            const customerId = parseInt(data.customer_id, 10);

            socket.emit('hello', {
                customer_id: customerId
            });
        });
    });
};
