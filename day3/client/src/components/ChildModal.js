import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InputAdornment from '@mui/material/InputAdornment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export function ChildModal({ date, index, onSubmit, check, type, onSave }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [remarksValue, setRemarksValue] = useState('');
    const [countryValue, setCountryValue] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [stateValue, setStateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);
    const [gcountry, setgCountry] = useState(null);
    const [gstate, setgState] = useState(null);
    const [loadingCities, setLoadingCities] = useState(false);
    useEffect(() => {
        axios.get('https://api.countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            }
        })
            .then(response => {
                setgCountry(response.data);
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleCountryChange = (country) => {
        if (country) {
            setgCountry(country);
            axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
                .then(response => {
                    setgState(response.data);
                    setStates(response.data);
                })
                .catch(error => {
                    console.error('Error fetching states:', error);
                });
        }
    };

    const handleStateChange = (state) => {
        if (state) {
            const countryCode = gcountry;
            const stateCode = state.state;
            axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
                .then(response => {
                    setCities(response.data);
                    setLoadingCities(false);
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                    setLoadingCities(false);
                });
        }
    };

    const handleClearInput = () => {
        setInputValue('');
    };

    const handleClearPurpose = () => {
        setPurposeValue('');
    };

    const handleClearRemarks = () => {
        setRemarksValue('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const formData = {
            clientName: inputValue,
            purpose: purposeValue,
            remark: remarksValue,
            country: countryValue ? countryValue.name : '',
            state: stateValue ? stateValue.name : '',
            city: cityValue ? cityValue.name : '',
            date: date.toString(),
            serialNum: `${index + 1}`,
            day: `${index + 1}`,
        };
        if (type === "updatetable") {
            onSave(formData, index);
        } else {
            onSubmit(formData);
            setInputValue("");
            setPurposeValue("");
            setRemarksValue("");
            setCountryValue(null);
            setStateValue(null);
            setCityValue(null);
            setOpen(false);
        }
        console.log(formData + "tabledata");

        setOpen(false);
    };

    const handleSubmit = () => {
        const formData = {
            clientName: inputValue,
            purpose: purposeValue,
            remark: remarksValue,
            country: countryValue ? countryValue.name : '',
            state: stateValue ? stateValue.name : '',
            city: cityValue ? cityValue.name : '',
            date: date.toString(),
            serialNum: `${index + 1}`,
            day: `${index + 1}`,
        };

        onSubmit(formData);
        setInputValue("");
        setPurposeValue("");
        setRemarksValue("");
        setCountryValue(null);
        setStateValue(null);
        setCityValue(null);
        setOpen(false);
    };


    return (
        <React.Fragment>
            {type === "newTabledata" ? (
                <AddCircleOutlineOutlinedIcon onClick={() => setOpen(true)} style={{ marginLeft: '10px' }} />
            ) : (
                <EditIcon onClick={() => setOpen(true)} />)}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 540, hieght: 50 }}>
                    <h2 style={{ color: check ? "#ffffff" : "#222222", fontSize: 20 }} id="child-modal-title">Day-{index + 1} {date.toString()}</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                id="combo-box-country"
                                options={countries}
                                getOptionLabel={(option) => option.name}
                                value={countryValue ? countries.find(country => country.name === countryValue.name) : null}
                                onChange={(event, newValue) => {
                                    setCountryValue(newValue);
                                    handleCountryChange(newValue ? newValue.iso2 : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-state"
                                options={states}
                                getOptionLabel={(option) => option.name}
                                value={stateValue ? states.find(state => state.name === stateValue.name) : null}
                                onChange={(event, newValue) => {
                                    setStateValue(newValue);
                                    handleStateChange(newValue ? { country: newValue.country_iso2, state: newValue.iso2 } : null);
                                }}
                                renderInput={(params) => <TextField {...params} label="State" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                size="small"
                                id="combo-box-city"
                                options={cities}
                                getOptionLabel={(option) => option.name}
                                value={cityValue ? cities.find(city => city.name === cityValue.name) : null}
                                onChange={(event, newValue) => {
                                    setCityValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Client"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearInput}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Purpose"
                                    value={purposeValue}
                                    onChange={(e) => setPurposeValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearPurpose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Remarks"
                                    value={remarksValue}
                                    onChange={(e) => setRemarksValue(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" aria-label="delete" onClick={handleClearRemarks}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    {type !== "newTabledata" ? (
                        <Button onClick={handleSave}>Save</Button>
                    ) : (
                        <Button onClick={handleSubmit}>Submit</Button>
                    )}

                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
