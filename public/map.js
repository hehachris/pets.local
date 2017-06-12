var map;

function onCurrentPosition(startingPosition) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: startingPosition.coords.latitude,
            lng: startingPosition.coords.longitude
        },
        zoom: 15
    });
}
