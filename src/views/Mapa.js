import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Alert, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import { useSelector } from 'react-redux'

export default function Mapa() {

    const estiloPersonalizadoMapa = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2f3948"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ]
    const amigos = useSelector(store => store.amigos) // array []
    const [myPosition, setMyPosition] = useState(null)
    const [pontoInicial, setPontoInicial] = useState({
        latitude: -28.260392632865123,
        longitude: -52.407892697640044,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015
    })


    useLayoutEffect(() => {
        getMyPosition()
    }, [])

    const getMyPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert("Permissão de acesso a localização negada!")
        } else {
            try {
                const minhaLocalizacao = await Location.getCurrentPositionAsync()
                setMyPosition(minhaLocalizacao.coords)
                let novoPontoInicial = Object.assign({}, pontoInicial, minhaLocalizacao.coords)
                setPontoInicial(novoPontoInicial)

            } catch (error) {
                Alert.alert("Erro ao acessar as coordenadas do GPS!")
            }
        }

    }

    return (
        <View>
            <MapView
                style={styles.mapStyle}
                region={pontoInicial}
                customMapStyle={estiloPersonalizadoMapa}
            >
                {myPosition ?
                    <Marker
                        coordinate={{
                            latitude: myPosition.latitude,
                            longitude: myPosition.longitude
                        }}
                        title="Onde Estou!"
                        description=""
                    >
                    </Marker>
                    : null}
                {
                    //map é com um for só que para as Views
                }
                {amigos.map(item =>
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        title={item.nome}
                        description={item.fone}
                    >
                        <Text style={{ backgroundColor: "white" }}>{item.nome}</Text>
                        <Image
                            source={require('../../assets/iconPerson.png')}
                            style={{ width: 35, height: 35 }}

                        />
                    </Marker>)}

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }

})
