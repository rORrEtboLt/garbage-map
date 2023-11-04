import React, { useState } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L, {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './leaflet-gm.css'
import garbagePng from "./garbage.png"

export const pointerIcon = new L.Icon({
    iconUrl: './garbage.svg',
    iconRetinaUrl: './garbage.svg',
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
    iconSize: [40, 40],
    shadowUrl: '../../garbage.png',
    shadowSize: [29, 40],
    shadowAnchor: [7, 40],
  })
  

const LeafletPopup = () => {
    const [data, setData] = useState({
        lat: 13.3313,
        lng: 75.7691,
        zoom: 13,
    });

    const [position, setPosition] = useState([data.lat, data.lng])

    return (
        <div><Map center={position} zoom={data.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={new Icon({iconUrl: garbagePng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </Map></div>

    )
};

export default LeafletPopup;