(function () {
    var cloudmade = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18}),
        map = new L.Map('map', {layers: [cloudmade], center: new L.LatLng(-37.7772, 175.2756), zoom: 15 });

    var editableLayers = new L.FeatureGroup();
    var layers = [], isMouseOver;
    
    map.addLayer(editableLayers);

    var options = {
        position: 'topright',
        draw: {
            polyline: {
                shapeOptions: {
                    color: '#f357a1',
                    weight: 10
                }
            },
            polygon: false,
            circle: false,
            circlemarker: false,
            rectangle: false,
            marker: false
        },
        edit: {
            featureGroup: editableLayers,
            remove: false
        }
    };

    isMouseOver = function (layer) {
        var length = layers.length;

        for (var i = 0; i < length; i++) {
            if (layer === layers[i]) { return true; }
        }

        return false;
    }

    var drawControl = new L.Control.Draw(options);
    map.addControl(drawControl);

    map.on('draw:created', function (data) {
        editableLayers.addLayer(data.layer);

        data.layer.on('click', function (e) {
            layers = [];
            layers.push(e.target);

            L.DomUtil.toBack(e.target.getElement());

            setTimeout(function () {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent('<p>Layers length: <strong>' + layers.length + '</strong></p>')
                    .openOn(map);
            }, 100);
        });

        data.layer.on('mouseover', function (e) {
            if (!(isMouseOver(e.target))) {
                L.DomUtil.toBack(e.target.getElement());

                layers.push(e.target);
                console.log('push');
            } else {
                console.log('stop', 'layers length', layers.length);
                
            }
        });
    });
}());
