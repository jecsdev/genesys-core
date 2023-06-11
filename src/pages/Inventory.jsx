import React from 'react'
import Table from '../components/Table'
import Menu from '../components/Menu'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Inventory() {


const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0c243c',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    secondary: {
      main: "#4a7a9e"
      
    }
  },
});
const navigate = useNavigate();
  return (
    <div>
      <ThemeProvider theme={theme}>
      <Menu/>
      <h2>Inventario</h2>
      <Table/>
      <div class="fab">
        <Fab color="secondary" aria-label="add" onClick={()=>{
          navigate("/qrscanner")
        }} >
          <AddIcon/>
        </Fab>
      
      </div>
      </ThemeProvider>
    </div>
    

  )
}

export default Inventory