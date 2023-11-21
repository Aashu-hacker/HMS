import React, { useState, useRef } from 'react';
import {
    Button,
    Grid,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
} from '@mui/material';
import { MenuItem, Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Input } from '@mui/base';
import Page from '@layout/Page';

function PatientRegisterForm2() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [patientPhoto, setPatientPhoto] = useState(null);
    const [patientImpression, setPatientImpression] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);

    const videoRef = useRef();
    const canvasRef = useRef();

    const handleCapturePhoto = () => {
        setIsCameraOpen(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    setMediaStream(stream); // Store the stream in state
                })
                .catch((error) => {
                    console.error('Error accessing the camera:', error);
                });
        }
    };

    const handleCaptureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const capturedImage = canvas.toDataURL('image/png');
        setPatientPhoto(capturedImage);
        setIsCameraOpen(false);
        stopMediaStream(); // Stop the camera stream
    };

    const handleCloseCamera = () => {
        setIsCameraOpen(false);
        stopMediaStream();
    };

    const stopMediaStream = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
                track.stop();
            });
            setMediaStream(null);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Page title='Patient Registration (Form No. 2)'>
            <form>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ margin: '10px' }}>Patient Details</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={1}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel variant="outlined">Prefix</InputLabel>
                                <Select
                                    label="Prefix"
                                    value="Mr">
                                    <MenuItem value="Mr">Mr.</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth id="patient" label="Patient Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="date"
                                    label="DOB"
                                    inputFormat="DD-MM-YYYY"
                                    renderInput={(props) => <TextField {...props} variant="outlined" label="DOB" />}
                                    fullWidth
                                    value={selectedDate} // Set the selected date
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth id="age" label="Age" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel variant="outlined">Sex</InputLabel>
                                <Select
                                    label="Prefix"
                                    value="Male">
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth id="nationality" label="Nationality" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth id="birt_time" label="Birth Time" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControl variant="outlined" fullWidth >
                                <InputLabel variant="outlined">Maritial Status</InputLabel>
                                <Select
                                    label="Maritial Status"
                                    value="non-married">
                                    <MenuItem value="non-married">Non-Married</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <TextField fullWidth id="country" label="Country" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField fullWidth id="address" label="Address" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="area" label="Area" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="district" label="District" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="pincode" label="Pincode" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="state" label="State" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="mobile_no" label="Mobile No" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="adhar_no" label="Adhar Card No." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel htmlFor="attachment">Upload Adhar Card</InputLabel>
                            <Input
                                fullWidth
                                type="file"
                                id="attachment"
                                inputProps={{ accept: '.pdf, .doc, .docx' }} // Set accepted file types
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField fullWidth id="abha" label="ABHA No." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <InputLabel htmlFor="attachment">Upload ABHA Card</InputLabel>
                            <Input
                                fullWidth
                                type="file"
                                id="attachment"
                                inputProps={{ accept: '.pdf, .doc, .docx' }} // Set accepted file types
                            />
                        </Grid>
                    </Grid>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Patient Relative Refrence</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="relative_name" label="Relative Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="mobile_no" label="mobile No." variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth id="relation" label="Relation" variant="outlined" />
                        </Grid>
                    </Grid>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Patient Photo</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            {/* Patient Photo */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCapturePhoto}>
                                Capture Photo
                            </Button>
                            {patientPhoto && (
                                <div>
                                    <img src={patientPhoto} alt="Patient" width="100" height="100" />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ marginBottom: '10px' }}>Patient Impression</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            {/* Patient Impression */}
                            <TextField
                                fullWidth
                                id="patient-impression"
                                label="Patient Impression"
                                variant="outlined"
                                value={patientImpression}
                                onChange={(e) => setPatientImpression(e.target.value)} />
                        </Grid>
                    </Grid>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        style={{ marginRight: '16px', backgroundColor: 'rgb(8,155,171)' }}>
                        Save
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: 'rgb(8,155,171)' }}>
                        Cancel
                    </Button>
                </div>
            </form>

            <Dialog open={isCameraOpen} onClose={handleCloseCamera} fullWidth>
                <DialogTitle>Capture Photo</DialogTitle>
                <DialogContent>
                    <video ref={videoRef} autoPlay />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleCaptureImage}>
                        Capture
                    </Button>
                    <Button variant="contained" onClick={handleCloseCamera}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Page>
    );
}

export default PatientRegisterForm2;
