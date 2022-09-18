import React from 'react'
import {Avatar, Button,  Grid, Paper, TextField} from '@mui/material'
import {useNavigate} from "react-router-dom"
import Table from '../components/Table'
function ProductCategories() {

    const navigate = useNavigate();
    const paperStyle={padding: 70, height:'50vh', width:280, margin:'100px auto'};
  return (
    
    <Table/>
  )
}

export default ProductCategories 