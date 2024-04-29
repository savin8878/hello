import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { ChildModal } from './ChildModal';

const sample = [];

const columns = [
    { width: 68, label: 'Action', dataKey: 'action' },
    { width: 5, label: 'SN', dataKey: 'serialNum' },
    { width: 30, label: 'Date', dataKey: 'date' },
    { width: 20, label: 'Day', dataKey: 'day' },
    { width: 30, label: 'Country', dataKey: 'country' },
    { width: 25, label: 'State', dataKey: 'state' },
    { width: 30, label: 'City', dataKey: 'city' },
    { width: 40, label: 'Client', dataKey: 'clientName' },
    { width: 40, label: 'Purpose', dataKey: 'purpose' },
    { width: 40, label: 'Remark', dataKey: 'remark' }
];

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width, backgroundColor: 'lightgrey', border: '1px solid #ddd' }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row, handleDelete, handleCloseChildModal, date, index, check, onSubmit, onSave) {
    const handleEdit = () => {
        console.log('Edit', row);
    };

    return (
        <React.Fragment>
            {columns.map((column, colIndex) => (
                <TableCell key={`${_index}-${colIndex}`} align="left" style={{ border: '1px solid #ddd' }}>
                    {column.dataKey === 'action' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton aria-label="edit" onClick={handleEdit}>
                                <ChildModal onClose={handleCloseChildModal} date={date} index={index} check={check} type={"updatetable"} onSubmit={onSubmit} onSave={onSave} />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
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

export default function Collapse({ date, index, check }) {
    const [expanded, setExpanded] = React.useState(false);
    const [tableData, setTableData] = useState(sample);

    const handleExpansion = (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    const handleCloseChildModal = () => {
        setExpanded(false);
    };

    const handleFormSubmit = (formData) => {
        setTableData([...tableData, formData]);
    };

    const handleSaveForm = (formData, rowIndex) => {
        const updatedData = [...tableData];
        updatedData[rowIndex] = formData;
        setTableData(updatedData);
    };

    const handleDelete = (rowToDelete) => {
        const newData = tableData.filter(item => item !== rowToDelete);
        setTableData(newData);
    };

    const handlePushToBackend = () => {
        // Send table data to backend
        axios.post('http://localhost:4000/feed', {
            newData: tableData,
            employee: [],
            type: "",
            department: "",
            sno: 0
        })
            .then(response => {
                console.log('Data successfully sent to backend:', response.data);
            })
            .catch(error => {
                console.error('Error sending data to backend:', error);
            });
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                    width: '100%',
                    '& .MuiAccordionSummart': {
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
                        <div style={{ fontWeight: 'bold', margin: 0, color: check ? "#ffffff" : "#222222" }}>Day-{index + 1} {date ? date.toString() : ""}</div>
                    </div>
                    <IconButton aria-label="push-to-backend" onClick={handlePushToBackend}>
                        <ChildModal date={date} index={index} onSubmit={handleFormSubmit} check={check} type={"newTabledata"} />
                    </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Paper style={{ height: 150, width: "100%", overflowX: 'hidden', overflowX: 'hidden' }}>
                            <Table>
                                <TableHead>
                                    {fixedHeaderContent()}
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {rowContent(rowIndex, row, handleDelete, handleCloseChildModal, date, index, check, handleFormSubmit, handleSaveForm)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
