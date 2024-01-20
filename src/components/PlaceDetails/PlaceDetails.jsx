import React from 'react';
import { Box, Typography, Button, Rating, Card, CardMedia, CardContent, CardActions, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { styled } from '@mui/system'; 

const ChipStyled = styled(Chip)({
  margin: '5px 5px 5px 0',
});

const SubtitleStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px',
});

const SpacingStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PlaceDetails = ({ place, selected, refProp }) => {
  if(selected) refProp?.current?.scrollIntoView({behavior:'smooth', block:'start'})
  return (
    <Card elevation={6}>
      <CardMedia 
        style={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
      <Box display='flex' justifyContent='space-between'>
      <Rating value={Number(place.rating)} readOnly />
        <Typography gutterBottom variant='subtitle1'>Out of {place.num_reviews} reviews</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='subtitle1'>Price</Typography>
        <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='subtitle1'>Ranking</Typography>
        <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
      </Box>
      {place?.awards?.map((award)=>(
        <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
          <img src={award.images.small} alt={award.display_name} />
          <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
        </Box>
      ))}
      {place?.cuisine?.map(({name})=>(
        <ChipStyled key={name} size='small' label={name} />
      ))}
      
      {place?.address && (
        <SubtitleStyled gutterBottom variant='sutitle2' color='textSecondary'>
          <LocationOnIcon /> {place.address}
        </SubtitleStyled>
      )}

      {place?.phone &&(
        <SpacingStyled gutterBottom variant='subtitle2' color='textSecondary'>
          <PhoneInTalkIcon /> {place.phone}
        </SpacingStyled>
      )}
      <CardActions>
        <Button size='small' color='primary' onClick={()=> window.open(place.web_url, '_blank')}>
          Travel Guide
        </Button>
        <Button size='small' color='primary' onClick={()=> window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;
