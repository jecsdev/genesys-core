import React, { useState } from 'react';
import {
    Container, Card, CardContent, Grid} from '@mui/material'
    import { makeStyles } from '@mui/styles';
import {BarcodeScannerComponent} from "react-qr-barcode-scanner";

function BarcodeReader() {
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
                            <BarcodeScannerComponent
                                delay={300}
                                style={{ width: '100%' }}
                                onError={handleErrorWebCam}
                                onUpdate={handleScanWebCam}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        
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


export default BarcodeReader