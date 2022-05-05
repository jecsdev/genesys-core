import React from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent  from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'

export default function CardItem() {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {Array.from(Array(2)).map((_, index) => (
      <Grid item xs={2} sm={4} md={2} key={index}>
        <Card sx={{ maxWidth: 250 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be{bull}nev{bull}o{bull}lent
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
</Grid>
  )
}

