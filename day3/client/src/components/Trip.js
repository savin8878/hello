import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const sample = [
];
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
const rows = sample.map((data, index) => {
    return {
        id: index,
        action: data[0],
        serialNum: data[1],
        date: data[2],
        day: data[3],
        country: data[4],
        state: data[5],
        city: data[6],
        clientName: data[7],
        purpose: data[8],
        remark: data[9]
    };
});

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
        <TableRow >
            {columns.map((column) => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width }}
                // sx={{ backgroundColor: }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index, row) {
    return (
        <React.Fragment>
            {columns.map((column, columnIndex) => (
                <TableCell
                    key={column.dataKey}
                    align="left"
                >
                    {column.dataKey === 'action' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <Box sx={{ width: '1px', height: '12px', border: '1px dashed gray', marginX: '5px' }} />
                            <IconButton aria-label="delete">
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
export default function ReactVirtualizedTable({tableData,setTableData}) {
    return (
        <Box sx={{ marginTop: "4rem", flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper style={{ height: 150, width: '50%' }}>
                <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>
        </Box>
    );
}
