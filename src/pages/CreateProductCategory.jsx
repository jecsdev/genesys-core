import {React, useRef, useState, useEffect} from 'react'
import { Button,  Grid, Paper, TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
function CreateProductCategory() {
    const userRef = useRef();
    const navigate = useNavigate();
    const paperStyle={padding: 70, height:'50vh', width:280, margin:'100px auto'};
    const [productCategory, setProductCategory] = useState('');
  return (
    <Grid>
        <h2>Nueva categoría de producto</h2>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
            <TextField 
          type="text" 
          label='Categoría de producto'
          id="productCategory"
          ref={userRef}
          autoComplete="off"
          placeholder='Introducir el nombre de usuario'
          onChange={(e) => setProductCategory(e.target.value)}
          value={productCategory}
          variant='standard'
          fullWidth 
          
          />
          <br/>
            </Grid>
        </Paper>
    </Grid>
  )
}

export default CreateProductCategory

