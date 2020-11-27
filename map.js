
function initMap() {

    // declare windows 
    let infoWindow = new google.maps.InfoWindow;

    let icon = 'http://localhost/shoto/assets/markme.png'
    let icon2 = 'http://localhost/shoto/assets/markme.png'



    // checking if my location exist
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            let location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            // define the map
            let map = new google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: 7.5
            });


            //fetch data from  php
            fetch('route.php?func=fetchMerchant_on_map')
            .then((response) => response.json())

                .then((responseJson) => {
 
                    console.log(responseJson)
                    

                    for (let x = 0; x < responseJson.length; x++) {



                        let marker2 = new google.maps.Marker({
                            position: { lat: parseFloat(responseJson[x].lat), lng: parseFloat(responseJson[x].lng) },
                            map: map,
                            title: 'this is where you are',
                            icon: icon2
                        })

                        let id = responseJson[x].id
                        let mid = responseJson[x].mercahntsId


                        google.maps.event.addListener(marker2, 'click', (function (marker2, id) {
                            return function () {

                                $.ajax({
                                    type: "post",
                                    url: "route.php?func=showInf",
                                    data: { dataid: id,merchantid:mid },
                                    dataType: "text",
                                    success: function (response) {
                                        infoWindow.setContent(response);
                                        infoWindow.open(map, marker2);
                                    }
                                });
                            }
                        })(marker2, id));

                    }



                }).catch((error) => {
                    alert(error)
                })










        }, function () {

            handleLocationError(true, infoWindow, map.getCenter())

        })





    } else {
        handleLocationError(false, infoWindow, map.getCenter())
    }



}

function addMarker(lat, lng, title) {
    marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: title
    });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


