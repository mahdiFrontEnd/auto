import React, { useEffect,memo, useRef, useState } from 'react';
// import '../assets/scss/layout/map.scss';
import L from 'leaflet';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Button } from 'reactstrap';
import { IoIosRefresh } from 'react-icons/io';
import GeojsonLayer from './commerce/map/GeojsonLayerFunc';

const customIcon = new L.Icon({
  iconUrl: '/map/marker.png', shadowUrl: '/map/marker-shadow.png', iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});


const MapBox = memo(({
                  zoom = 6, defLocation, dataCluster, total, getSelectedLocation,
                }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(zoom);

  const mapRef = useRef();
  const handleRefresh = () => {
    setSelectedLocation(selectedLocation || null);
    mapRef.current.leafletElement.flyTo(selectedLocation, zoom);
  };
  const handleMapClick = (e) => {
    if (getSelectedLocation && e?.latlng && e?.latlng?.lat) {
      const { lat, lng } = e.latlng;
      setSelectedLocation([lat, lng]);
      getSelectedLocation([lat, lng]);

    }

  };


  useEffect(() => {

    setSelectedLocation(defLocation || [35.715298, 51.404343]);
  }, [JSON.stringify(defLocation)]);


  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      // Clean up event listener on unmount
      return () => {
        map.off('zoomend');
      };
    }
  }, []);


  return (<div className="position-relative mx-md-0 h-100">
    <Map onClick={handleMapClick} zoom={currentZoom} center={selectedLocation} ref={mapRef}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />{selectedLocation && getSelectedLocation && (<Marker position={selectedLocation} icon={customIcon}>
    </Marker>)}
      {dataCluster && <GeojsonLayer cluster dataCluster={dataCluster.data} />}

    </Map>
    <div className="mapMoreElement">
      <Button type="button" className="mapMoreElementItem p-0" onClick={handleRefresh}>
        <IoIosRefresh size={18} color="black" />
      </Button>
      {total && <span className="mapMoreElementItem fs-4 ">{total}</span>}
    </div>
  </div>);
});

export default MapBox;
