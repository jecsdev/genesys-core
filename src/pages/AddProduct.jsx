import React from 'react'
import Menu from '../components/Menu';
import { Paper, Grid, FormControl, Typography } from '@mui/material';
function AddProduct() {
    
  return ( 
    <div className="container">
        <Menu/>
        <h2>Agregar nuevo producto</h2>
        <Grid>
          <Paper>
              <FormControl>
                <Typography variant="h2" align="center">
                  Add product
                </Typography>
              </FormControl>
          </Paper>
        </Grid>
    </div>
  )
}

export default AddProduct