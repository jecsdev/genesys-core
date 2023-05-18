import React from 'react'
import Table from '../components/Table'
import Menu from '../components/Menu'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

function Inventory() {
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
      <Menu/>
      <h2>Inventario</h2>
      <Table/>
      <div class="fab">
        <Fab color="secondary" aria-label="add" className={btnStyle.root}onClick={()=>{
          navigate("/qrscanner")
        }} >
          <AddIcon />
        </Fab>
      </div>
    </div>
    

  )
}

export default Inventory