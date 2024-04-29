import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "../Styles/TripPage.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TripAccordion from "./TripAccordion";
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

export default function NestedModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleclearmodal = () => {
    props.setmaindata([]);
    console.log("Data Cleared Successfully")
  }
  const handlesubmitmodal = () => {
    props.setpushingdata(props.maindata)
    handleClose()
  }
  return (
    <div>
      <Button
        variant="contained"
        style={{ padding: "1rem" }}
        sx={{
          backgroundColor: props.darkmode ? "white" : "black",
          color: props.darkmode ? "black" : "white",
        }}
        onClick={handleOpen}
      >
        <CalendarTodayIcon fontSize="small" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{}}
      >
        <Box
          sx={{
            ...style,
            width: 1600,
            height: 700,
            boxShadow: "0 0 10px 0 white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="modalparent"
        >
          <h2 id="parent-modal-title" style={{ fontSize: "3rem" }}>
            Plan for {props.dates.length} days
          </h2>
          <Box
            style={{
              width: "80%",
              height: "40rem",
              overflowY: "scroll",
              overflowX: "visible",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
           
            <TripAccordion maindata={props.maindata} setmaindata={props.setmaindata} dates={props.dates} />
          </Box>
          <div className="btngroup">
            <Button
              className="tablebtn"
              variant="contained"
              onClick={handlesubmitmodal}
              size="medium"
              sx={{
                backgroundColor: props.darkmode ? "white" : "black",
                color: props.darkmode ? "black" : "white",
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
                backgroundColor: props.darkmode ? "white" : "black",
                color: props.darkmode ? "black" : "white",
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
  );
}
