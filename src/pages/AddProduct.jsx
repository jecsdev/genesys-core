import React from 'react'
import Menu from '../components/Menu';
import { Paper, Grid, FormControl, Typography, TextField, Button } from '@mui/material';

//this Class handle the product creation
function AddProduct() {
    
  return ( 
    <div className="form-container">
      <Menu/>
      <Grid>
        <Paper elevation={10} className="paperStyleForm">
            <FormControl className="form-group">
              <form >
                <Typography variant='h5' >Agregar nuevo producto</Typography>
                <br/>
                <br/>
                <Typography variant='h7' className="typography-form">Nombre</Typography>
                <TextField className="textfield-form"/>
                <br/>
                <br/>
                <Typography variant='h7' className="typography-form">Codigo</Typography>
                <TextField className="textfield-form"/>
                <br/>
                <br/>
                <Typography variant='h7' className="typography-form">Descripción</Typography>
                <TextField className="textfield-form"/>
                <br/>
                <br/>
                <Typography variant='h7' className="typography-form">Precio</Typography>
                <TextField className="textfield-form"/>
                <br/>
                <br/>
                <Typography variant='h7' className="typography-form">Unidad de medida</Typography>
                <TextField className="textfield-form"/>
                <br/>
                <br/>
                <Button variant="contained" className="form-button">Agregar</Button>
              </form>
            </FormControl>
        </Paper>
      </Grid>
    </div>
  )
}

export default AddProduct