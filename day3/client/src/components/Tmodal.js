import React, { useEffect, useState } from 'react';
import Collapse from './Collapse';
import Modal from '@mui/material/Modal';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
function TModal({ check, dates, tableData, setTableData, storetdata, setstoretdata }) {
    const [open, setOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditClick = () => {
        setIsEditOpen(true);
        setOpen(true);
    };
    const handleclearmodal = () => {
        setTableData([]);
        console.log("Data Cleared Successfully")
    }
    const handlesubmitmodal = () => {
        setstoretdata(tableData)
        handleClose()
    }
    useEffect(() => {
        console.log("dates", dates);
        console.log(dates);
    })
    return (
        <>
            <div style={{ position: 'relative' }}>
                <EditCalendarRoundedIcon
                    style={{ fontSize: '45px', width: '48px', height: '40px', margin: "8px", position: 'absolute', top: '0', left: '0' }}
                    onClick={handleEditClick}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: '85%', height: '75%', overflowY: 'auto' }}>
                        <h2 style={{ borderRadius: "100px", textAlign: 'center', color: check ? "#ffffff" : "#222222" }} id="parent-modal-title ">Plans for {JSON.stringify(dates)} Days</h2>

                        <Box
                            style={{ borderRadius: "100px" }}
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
                            <Collapse dates={dates} index={2} check={check} tableData={tableData} setTableData={setTableData} storetdata={storetdata} setstoretdata={setstoretdata} />
                        </Box>
                        <div className="btngroup">
                            <Button
                                className="tablebtn"
                                variant="contained"
                                onClick={handlesubmitmodal}
                                size="medium"
                                sx={{
                                    backgroundColor: check ? "white" : "black",
                                    color: check ? "black" : "white",
                                    borderRadius: "30px  ",
                                    ml: 2,
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                className="tablebtn"
                                variant="contained"
                                size="medium"
                                onClick={handleclearmodal}
                                sx={{
                                    backgroundColor: check ? "white" : "black",
                                    color: check ? "black" : "white",
                                    borderRadius: "30px  ",
                                    ml: 2,
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </Box>

                </Modal>

            </div>
        </>
    )
}

export default TModal;
