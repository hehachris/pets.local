(function($){
    var socket = io();

    var queries = getQueryParams();

    if (typeof queries.customer_id !== 'undefined') {
        socket.emit('user.watch.start', {
            customer_id: parseInt(queries.customer_id)
        });

        socket.on('hello', function(data) {
            console.log(data);
        });

        var $list = $('#petsList');
        socket.on('pet.matched', function(data) {
            var $innerList = $('<ul></ul>');

            ['name', 'age', 'species', 'breed'].forEach(function (key) {
                $('<li></li>').html(key + ': ' + data.pet[key]).appendTo($innerList);
            });

            $list.children('li.nothing').remove();

            $('<li></li>').append($innerList).appendTo($list);
        });
    }
})(jQuery);

function getQueryParams() {
    var queries = {};

    $.each(document.location.search.substr(1).split('&'),function(c,q){
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });

    return queries;
}
