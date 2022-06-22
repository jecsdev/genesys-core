import React, { useState } from 'react';
import {
    Container, Card, CardContent, Grid} from '@mui/material'
    import { makeStyles } from '@mui/styles';
import { QrReader } from 'react-qr-reader';


function Qrscanner() {
    const classes = useStyles();
    //const qrRef = useRef(null);
    const [scanResultWebCam, setScanResultWebCam] =  useState('');

/*     const onScanFile = () =>{
         qrRef.current.openImageDialog();   
    } */
 
    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        if(result) {
            setScanResultWebCam(result.text);
        }
    }
    return (
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
                            <h3>Información botenida por el código QR: {scanResultWebCam}</h3>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
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
        background: '#3f51b5',
        color: '#fff',
        padding: 20
    }
}));
export default Qrscanner;