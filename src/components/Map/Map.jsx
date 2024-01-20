import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

import mapStyles from './mapStyles';

const MapContainer = styled('div')(({ theme }) => ({
  height: '85vh',
  width: '100%',
}));

const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '5px',
}));

const MarkerContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': {
    zIndex: 2,
  },
}));

const Pointer = styled('div')(({ theme }) => ({
  cursor: 'pointer',
}));

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{disableDefaultUI: true, zoomControl:true, styles:mapStyles }}
        onChange={(e) => {
          setCoordinates({lat: e.center.lat, lng: e.center.lng});
          setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child)=> setChildClicked(child)}
      >
        {places?.map((place, i)=>(
          <MarkerContainer 
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlined color='primary' fontSize='large' />
              ) : (
                <Paper elevation={3}>
                  <Typography variant='subtitle2' gutterBottom>{place.name}</Typography>
                  <Pointer>
                  <Image
                     src={place.photo ? place.photo.images.large.url : 'https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                     alt={place.name}
                  />
                  </Pointer>
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          
        </MarkerContainer>
        ))}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;
