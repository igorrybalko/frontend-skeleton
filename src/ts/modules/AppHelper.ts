declare var google:any;

export default class AppHelper {

    initgmap(breadth: number, longitude: number, mapId: string, desk:string = "") {
        let ukCent = new google.maps.LatLng(breadth, longitude);
        let mapOptions = {
            zoom: 14,
            center: ukCent,
            scrollwheel: false,
            mapTypeControl: false,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "saturation": "2"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "saturation": "-28"
                        },
                        {
                            "lightness": "-10"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "saturation": "-1"
                        },
                        {
                            "lightness": "-12"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "lightness": "-31"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "lightness": "-74"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "lightness": "65"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": "-15"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.landcover",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "lightness": "0"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": "0"
                        },
                        {
                            "lightness": "-9"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "lightness": "-14"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "lightness": "-35"
                        },
                        {
                            "gamma": "1"
                        },
                        {
                            "weight": "1.39"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "lightness": "-19"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "lightness": "46"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "lightness": "-13"
                        },
                        {
                            "weight": "1.23"
                        },
                        {
                            "invert_lightness": true
                        },
                        {
                            "visibility": "simplified"
                        },
                        {
                            "hue": "#ff0000"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#adadad"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        };
        let map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        let markerType = new google.maps.MarkerImage(
            '/images/marker.png',
            new google.maps.Size(24,36),
            new google.maps.Point(0,0),
            new google.maps.Point(12,36)
        );
        let myLatlng = new google.maps.LatLng(breadth, longitude);
        let marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'maps',
            icon: markerType
        });

        let infowindow = new google.maps.InfoWindow({
            content: desk
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    modal() {
        let $ = jQuery;
        let overlay = $('.modal_overlay'),
            open_modal = $('.open_modal'),
            close = $('.modal_close, .modal_overlay'),
            modal = $('.modal_div');

        open_modal.on('click', function(e:any){
            e.preventDefault();
            $('body').addClass('modal_active');
            let div = $(this).attr('href');
            overlay.fadeIn(400,
                function(){
                    $(div)
                        .css('display', 'block')
                        .animate({opacity: 1, top: '50%'}, 200);
                });
        });

        close.on('click', function(){
            modal
                .animate({opacity: 0, top: '45%'}, 200,
                    function(){
                        $(this).css('display', 'none');
                        overlay.fadeOut(400);
                    }
                );
            $('body').removeClass('modal_active');
        });
    }

}
