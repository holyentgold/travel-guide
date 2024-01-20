import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import  getPlaceData  from './api/index';


const theme = createTheme();

const App = () => {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() =>{
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
        setCoordinates({lat: latitude, lng: longitude});
      })
    }, []);

    useEffect(()=>{
      const filteredPlaces = places.filter(()=>places.rating > rating);
      setfilteredPlaces(filteredPlaces);
    }, [rating]);

    useEffect(() =>{
      if(bounds.sw && bounds.ne){
      setisLoading(true);


      getPlaceData(type, bounds.sw, bounds.ne)
      .then((data) =>{
        setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0));
        setfilteredPlaces([]);
        setisLoading(false);
      })
    }
    }, [type, bounds]);
    
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs={12} md={4}>
            <List 
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>
      </>
    </ThemeProvider>
  );
};

export default App;
