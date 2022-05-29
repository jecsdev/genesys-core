import React from 'react'
import ArchiveIcon from '@mui/icons-material/Archive';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

function InventoryButton() {
  const styles = makeStyles(() => ({
    root: {
      "&:hover": {
        backgroundColor: "#3f51b5"
      }, 
      color: "#ffff", 
      backgroundColor: "#3f51b5"
    }



}));
const navigate = useNavigate();
  const btnStyle = styles();
  return (
    <div>
      <Button
      variant="containted" 
      className={btnStyle.root} 
      endIcon={<ArchiveIcon/>}
      onClick={()=>{
        navigate("/qrscanner")
      }}>Añadir </Button>
    </div>
  )
}

export default InventoryButton
