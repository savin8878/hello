import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Input, Box, FormControl, InputLabel, MenuItem, Select, Popover, Checkbox } from '@mui/material';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Chip from '@mui/material/Chip';
import '../styles/common.css';
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import Modal from '@mui/material/Modal';
import Collapse from './Collapse';
import ReactVirtualizedTable from './Trip';
import Button from '@mui/material/Button';
const sample = [];
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
const Common = ({ check }) => {

    const [toLocation, setToLocation] = useState();
    const [fromLocationList, setFromLocationList] = useState([]);
    const [toLocationList, setToLocationList] = useState([]);
    const [dates, setDates] = useState([]);
    const [showFourthBox, setShowFourthBox] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [travelClass, setTravelClass] = useState('');
    const [dvalue, setValue] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(sample);
    const [storetdata,setstoretdata]=useState();
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const flightSource = [
            { title: 'Toronto', place: 'Toronto, Canada', code: "YYZ" },
            { title: 'Halifax', place: 'Halifax, Canada', code: "YHZ" },
            { title: 'Moncton', place: 'Moncton, Canada', code: "YSJ" },
            { title: 'Montreal', place: 'Montreal, Canada', code: "YHZ" }
        ];
        setFromLocationList(flightSource);
        setToLocationList(flightSource);
    }, []);

    const handleChange = (event, box) => {
        const { value } = event.target;
        setTravelClass(value);
        if (box === 1) {
            setShowFourthBox(value === "Services");
        }
    };

    const handleDataChange = (event, box) => {
        const { value } = event.target;
        setValue(value);
    };

  

    const handleToLocation = (value) => {
        setToLocation(value);
        const filteredLocations = toLocationList.filter((item) => item.title !== value);
        setFromLocationList(filteredLocations);
    };

  

    const handleEditClick = () => {
        setIsEditOpen(true);
        setOpen(true);
    };

    const Empid = [
        { title: '12345', year: 1994 },
        { title: '54321', year: 1972 },
        { title: '32145', year: 1974 },
    ];
    const SelectType = [
        { title: 'Indivisual', year: 1994 },
        { title: 'Group', year: 1972 }
    ];

    return (
        <div className="Common">
            <div className="container">
                <form className='mainclass'>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} className="row">
                        <div className="col-lg-2 m-top-16" style={{ margin: "8px" }}>
                            <Stack spacing={2}>
                                <Autocomplete
                                    multiple
                                    size='small'
                                    id="checkboxes-tags-demo"
                                    options={Empid}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                style={{ marginRight: 2 }}
                                                checked={selected}
                                            />
                                            {option.title}
                                        </li>
                                    )}
                                    style={{ width: "100%" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Employee Id" placeholder="Favorites" />
                                    )}
                                    ChipProps={{ style: { margin: "2px" } }}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip variant="outlined" label={option.title} {...getTagProps({ index })} />
                                        ))
                                    }
                                />
                            </Stack>
                        </div>

                        <div className="col-lg-2 m-top-16" style={{ margin: "8px" }}>
                            <Stack spacing={2}>
                                <Autocomplete
                                    size='small'
                                    onChange={(event, value) => handleToLocation(value)}
                                    id="to-location"
                                    freeSolo
                                    options={SelectType.map((option) => option.title)}
                                    renderInput={(params) => <TextField {...params} label="Select Type" />}
                                />
                            </Stack>
                        </div>
                        <div className="col-lg-2 m-top-16" style={{ margin: "8px" }}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="travel-class-label">Select Dept.</InputLabel>
                                    <Select
                                        style={{ width: "100%" }}
                                        size='small'
                                        labelId="travel-class-label"
                                        id="demo-simple-select"
                                        value={travelClass}
                                        label="Select Dept"
                                        onChange={(event) => handleChange(event, 1)} // Pass 1 for the 3rd box
                                    >
                                        <MenuItem value={"economy"}>Sales</MenuItem>
                                        <MenuItem value={"premiumEconomy"}>Operations</MenuItem>
                                        <MenuItem value={"Services"}>Services</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        {showFourthBox && (
                            <div style={{ margin: "8px" }}>
                                <Box style={{ height: "38px", width: "60px", border: "1px solid #ccc", borderRadius: "4px" }}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="travel-class-input" style={{ marginBottom: "4px" }}>Class</InputLabel>
                                        <Input
                                            size='small'
                                            id="travel-class-input"
                                            type="number"
                                            value={dvalue}
                                            onChange={handleDataChange}
                                            style={{ borderBottom: "none" }} // Remove underline from input
                                        />
                                    </FormControl>
                                </Box>
                            </div>
                        )}
                        <div style={{ margin: "8px", zIndex: 1000 }}> {/* Add zIndex here */}
                            <DatePicker
                                value={dates}
                                small
                                onChange={setDates}
                                format="MMMM DD YYYY"
                                sort
                                className={check ? "bg-dark" : ""}
                                plugins={[
                                    <DatePanel />
                                ]}
                                style={{ height: '32px', backgroundColor: check ? "#222222" : "#ffffff", color: check ? "#ffffff" : "#333333", width: "100%", zIndex: 1000 }} // Add zIndex here
                            />
                        </div>

                        {dates.length >= 1 && (
                            <>
                                <div style={{ position: 'relative' }}>
                                    <EditCalendarRoundedIcon
                                        style={{ fontSize: '45px', width: '48px', height: '40px', margin: "8px", position: 'absolute', top: '0', left: '0' }}
                                        onClick={handleEditClick}
                                    />
                                    {isEditOpen && <div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="parent-modal-title"
                                            aria-describedby="parent-modal-description"
                                        >
                                            <Box sx={{ ...style, width: '85%', height: '75%', overflowY: 'auto' }}>
                                                <h2 style={{ borderRadius: "100px", textAlign: 'center', color: check ? "#ffffff" : "#222222" }} id="parent-modal-title ">Plans for {dates.length} Days</h2>
                                                {
                                                    dates.map((date, index) => (
                                                        <Box
                                                            style={{ borderRadius: "100px" }}
                                                            key={index}
                                                            component="section"
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                p: 1,
                                                                width: '70%',
                                                                margin: '10px auto',
                                                                marginTop: '2rem',
                                                                borderRadius: '2rem'
                                                            }}
                                                        >
                                                            <Collapse date={date} index={index} check={check} open={open} onClose={handleClose} setOpen={setOpen} tableData={tableData} setTableData={setTableData} storetdata={storetdata} setstoretdata={setstoretdata} />
                                                        </Box>
                                                    ))
                                                }
                                            </Box>
                                    
                                        </Modal>
                                    </div>}
                                </div>
                            </>
                        )}
                    </div>
                </form>
                <div className="tripClass">Trip Plan</div>

                <ReactVirtualizedTable tableData={tableData} setTableData={setTableData} />
            </div>
        </div>
    );
};

export default Common;