import React from 'react'
import {IconButton} from '@mui/material'
import Menu from '../components/Menu'
import { makeStyles } from '@mui/styles'
import AddBoxIcon from '@mui/icons-material/AddBox';
function ProductCategories() {
    const styles = makeStyles(() => ({
      root: {
        "&:hover": {
          backgroundColor: "#3f51b5"
        }, 
        color: "#ffff", 
        backgroundColor: "#3f51b5"
      }, 
      button: {
        fontSize:"100px",
        float: "right",
        width: "100px",
        height: "20px"
      }
    }));
    const btnStyles = styles();
  return (
    <div>
      <Menu/>
      <h3>Categoría de productos</h3>
      <div >
        <IconButton  className={btnStyles.button} color="primary" >
          <AddBoxIcon className={btnStyles.button}/>
        </IconButton>
      </div>
      <br/>
      <br/>
     
    </div>
    
  )
}

export default ProductCategories 