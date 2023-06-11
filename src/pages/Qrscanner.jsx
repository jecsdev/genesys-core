import React, { useState } from 'react';
import {
    Container, Card, CardContent, Grid} from '@mui/material'
    import { makeStyles } from '@mui/styles';
import { QrReader } from 'react-qr-reader';
import Menu from '../components/Menu';
import moment from 'moment'

function Qrscanner() {
    const classes = useStyles();
    //const qrRef = useRef(null);
    const [scanResultWebCam, setScanResultWebCam] =  useState('');

/*     const onScanFile = () =>{
         qrRef.current.openImageDialog();   
    } */
    
    let createdAt = moment().format("DD-MM-YYYY hh:mm:ss")

    const [created, setCreated] = useState();

    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        if(result) {
            setScanResultWebCam(result.text);
            setCreated(createdAt)
        }
    }
    return (
        <Grid>
             <Menu/>
        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Escáner de código QR</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
                            <QrReader
                                delay={300}
                                style={{ width: '100%' }}
                                onError={handleErrorWebCam}
                                onResult={handleScanWebCam}
                            />
                        </Grid>
                        <Grid item x1={8} lg={4} md={6} sm={12} xs={12}>
                            <h3>Información botenida por el código QR: {scanResultWebCam}</h3>
                            <h3>Fecha de creación: {created}</h3>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </Grid>
        );
}

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 30
    },

    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#1d84b5',
        color: '#fff',
        padding: 20
    }
}));
export default Qrscanner;