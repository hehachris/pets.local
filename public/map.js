var map;
var petMarkers = []

function onCurrentPosition(startingPosition) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            //lat: 22.35622784,
            //lng: 114.11518335
            lat: startingPosition.coords.latitude,
            lng: startingPosition.coords.longitude
        },
        zoom: 15
    });

    showNearbyPets();

    map.addListener('dragend', showNearbyPets);
}

function displayPetMarker(lat, lng) {
    var marker = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        map: map
    });

    petMarkers.push(marker);
}

function showNearbyPets(km) {
    var center = map.getCenter();

    $.ajax({
        url: '/pets',
        data: {
            latitude: center.lat,
            longitude: center.lng,
            km: km || 2
        },
        success: function(data) {
            deleteAllMarkers();

            data.forEach(function(pet) {
                displayPetMarker(pet.latitude, pet.longitude);
            });
        },
        dataType: 'json'
    });
}

function deleteAllMarkers() {
    petMarkers.forEach(function(marker) {
        marker.setMap(null);
    });
    petMarkers = [];
}
