import React, { useState, useEffect, createRef } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  styled,
} from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

const ListContainer = styled('div')(({ theme }) => ({
  padding: '25px',
}));

const StyledGridItem = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  marginBottom: '30px',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <ListContainer>
      <Grid container spacing={3}>
        <StyledGridItem item xs={12}>
          <Typography variant="h5" gutterBottom>
            Explore Local Hotels, Restaurants, Attractions.
          </Typography>
          {isLoading ? (
            <div>
              <CircularProgress size='5rem' />
            </div>
          ) : (
            <>
              <StyledGridItem item xs={12}>
                <StyledFormControl>
                  <InputLabel>Type</InputLabel>
                  <StyledSelect value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                  </StyledSelect>
                </StyledFormControl>
                <StyledFormControl>
                  <InputLabel>Ratings</InputLabel>
                  <StyledSelect value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                  </StyledSelect>
                </StyledFormControl>
              </StyledGridItem>
              <StyledGridItem item xs={12}>
                {places?.map((place, i) => (
                  <Grid item key={i} xs={12}>
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Grid>
                ))}
              </StyledGridItem>
            </>
          )}
        </StyledGridItem>
      </Grid>
    </ListContainer>
  );
};

export default List;

