import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InputAdornment from '@mui/material/InputAdornment';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const sample = [];

const columns = [
    { width: 68, label: 'Action', dataKey: 'action' },
    { width: 5, label: 'SN', dataKey: 'serialNum' },
    { width: 30, label: 'Date', dataKey: 'date' },
    { width: 20, label: 'Day', dataKey: 'day' },
    { width: 30, label: 'Country', dataKey: 'country' },
    { width: 30, label: 'State', dataKey: 'state' },
    { width: 30, label: 'City', dataKey: 'city' },
    { width: 40, label: 'Client', dataKey: 'clientName' },
    { width: 40, label: 'Purpose', dataKey: 'purpose' },
    { width: 40, label: 'Remark', dataKey: 'remark' }
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
        <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width }}
                    sx={{ backgroundColor: 'lightgrey' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row, setTableData) {
    const handleEdit = () => {
        // Implement edit functionality here
        console.log('Edit', row); // Placeholder for actual edit action
    };

    const handleDelete = () => {
        // Implement delete functionality here
        console.log('Delete', row); // Placeholder for actual delete action
        const newData = sample.filter(item => item !== row);
        setTableData(newData);
    };

    return (
        <React.Fragment>
            {columns.map((column) => (
                <TableCell key={column.dataKey} align="left">
                    {column.dataKey === 'action' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton aria-label="edit" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            <Box sx={{ width: '0.4px', height: '12px', border: '1px dashed gray', marginX: '5px' }} />
                            <IconButton aria-label="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        row[column.dataKey]
                    )}
                </TableCell>
            ))}
        </React.Fragment>
    );
}

export default function Collapse({ date, index }) {
    const [expanded, setExpanded] = React.useState(false);
    const [tableData, setTableData] = useState(sample);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [purposeValue, setPurposeValue] = useState('');
    const [remarksValue, setRemarksValue] = useState('');
    const [countryValue, setCountryValue] = useState(null);
    const [stateValue, setStateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);
    const [loadingCities, setLoadingCities] = useState(false); // State for loading city options

    useEffect(() => {
        // Fetch countries
        axios.get('https://api.countrystatecity.in/v1/countries', {
            headers: {
                'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
            }
        })
        .then(response => {
            setCountries(response.data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
    }, []);

    const handleCountryChange = (country) => {
        if (country) {
            // Fetch states for selected country
            axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
            .then(response => {
                setStates(response.data);
            })
            .catch(error => {
                console.error('Error fetching states:', error);
            });
        }
    };

    const handleStateChange = (state) => {
        if (state) {
            // Fetch cities for selected state
            setLoadingCities(true); // Start loading cities
            axios.get(`https://api.countrystatecity.in/v1/countries/${state.country}/states/${state.state}/cities`, {
                headers: {
                    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==',
                }
            })
            .then(response => {
                setCities(response.data);
                setLoadingCities(false); // Stop loading cities
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
                setLoadingCities(false); // Stop loading cities in case of error
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

    const handleSubmit = () => {
        // Prepare form data
        const formData = {
            clientName: inputValue,
            purpose: purposeValue,
            remark: remarksValue,
            country: countryValue ? countryValue.label : '',
            state: stateValue ? stateValue.label : '',
            city: cityValue ? cityValue.label : '',
            date: date.toString(), // Fixed the date format
            day: index.toString(), // Fixed the index format
        };
        setTableData([...tableData, formData]);
        setInputValue('');
        setPurposeValue('');
        setRemarksValue('');
        setCountryValue(null);
        setStateValue(null);
        setCityValue(null);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Accordion
                expanded={expanded}
                onChange={(event, isExpanded) => setExpanded(isExpanded)}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    width: '100%',
                    '& .MuiAccordionSummary-root': {
                        width: '100%',
                        '& > .MuiAccordionSummary-content': {
                            width: '100%',
                        },
                    },
                    '& .MuiAccordion-region': { height: expanded ? '100%' : 0 },
                    '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
            >
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <div style={{ display: 'grid', marginLeft: '1rem', gridTemplateColumns: 'auto 1fr' }}>
                        <div style={{ fontWeight: 'bold', margin: 0 }}>Day-{index} {date.toString()}</div>
                    </div>
                    <AddCircleOutlineOutlinedIcon onClick={() => setExpanded(true)} style={{ marginLeft: '10px' }} />
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper style={{ height: 150, width: '100%' }}>
                            <TableVirtuoso
                                data={tableData} // Render table with updated data
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={fixedHeaderContent}
                                itemContent={(_index, row) => rowContent(_index, row, setTableData)}
                            />
                        </Paper>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Modal
                open={expanded}
                onClose={() => setExpanded(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 550, height: 540 }}>
                    <h2 id="child-modal-title">Day-{index} {date.toString()}</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-country"
                                options={countries}
                                getOptionLabel={(option) => option.name}
                                value={countryValue}
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
                                id="combo-box-state"
                                options={states}
                                getOptionLabel={(option) => option.name}
                                value={stateValue}
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
                                id="combo-box-city"
                                options={cities}
                                getOptionLabel={(option) => option.name}
                                value={cityValue}
                                onChange={(event, newValue) => {
                                    setCityValue(newValue);
                                }}
                                loading={loadingCities} // Set loading state
                                noOptionsText={loadingCities ? 'Loading...' : 'No options'} // Display appropriate text
                                renderInput={(params) => <TextField {...params} label="City" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                sx={{
                                    width: 200,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField
                                    fullWidth
                                    label="Client"
                                    id="Remarks"
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
                            <Box
                                sx={{
                                    width: 200,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField
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
                            <Box
                                sx={{
                                    width: 200,
                                    maxWidth: '100%',
                                }}
                            >
                                <TextField
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
                    <Button onClick={() => setExpanded(false)}>Close</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Box>
            </Modal>
        </Box>
    );
}

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
