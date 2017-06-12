const Geo = require('geo-nearby');
const config = require('../../config');

module.exports = {
    getMargin(pLatitude, pLongitude, km) {
        const latRadian = (pLatitude * Math.PI) / 180;

        const degLatKm = 110.574235;
        const degLongKm = 110.572833 * Math.cos(latRadian);
        const deltaLat = km / degLatKm;
        const deltaLong = km / degLongKm;

        const topLat = pLatitude + deltaLat;
        const bottomLat = pLatitude - deltaLat;
        const leftLng = pLongitude - deltaLong;
        const rightLng = pLongitude + deltaLong;

        return {
            topLat,
            bottomLat,
            leftLng,
            rightLng
        };
    },
    nearby(rows, lat, lng, km = config.defaultDistance) {
        const geo = new Geo(rows, {
            setOptions: {
                id: 'id',
                lat: 'latitude',
                lon: 'longitude'
            }
        });

        return geo.nearBy(lat, lng, km * 1000);
    }
};
