import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import "../styles/Components/HelpDesk.css";

const HelpDesk = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ridewizard.pro:9000/api/v1/issues",
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setIssues(result.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (issue) => {
    setSelectedIssue(issue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReplyText("");
  };

  const handleSend = async () => {
    try {
      const response = await fetch(
        `http://ridewizard.pro:9000/api/v1/issues/resolve?id=${selectedIssue.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug",
          },
          body: JSON.stringify({
            resolution: replyText,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Issue resolved successfully");
        setSnackbarOpen(true);
        const updatedIssues = await fetchUpdatedIssues();
        setIssues(updatedIssues);
      } else {
        const errorMessage = await response.text();
        setSuccessMessage(`Failed to resolve issue: ${errorMessage}`);
        setSnackbarOpen(true);
        console.error(`Failed to resolve issue: ${errorMessage}`);
      }
    } catch (error) {
      setSuccessMessage(`Error while resolving issue: ${error.message}`);
      setSnackbarOpen(true);
      console.error("Error while resolving issue:", error);
    } finally {
      handleClose();
    }
  };
  const fetchUpdatedIssues = async () => {
    try {
      const response = await fetch("http://ridewizard.pro:9000/api/v1/issues", {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ3LCJlbWFpbCI6ImFkbWluIiwicm9sZXMiOlt7ImlkIjoxLCJyb2xlIjoicGFzc2VuZ2VyIn0seyJpZCI6Mywicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3MDI1NDczMDMsImV4cCI6MTcwNTEzOTMwM30.d8eYVYBYE71TAb7OmZ_aPci4YNbBw3-G1lOu7g-l0Ug",
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result.data;
      } else {
        console.error("Failed to fetch updated issues");
        return [];
      }
    } catch (error) {
      console.error("Error while fetching updated issues:", error);
      return [];
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <div className="helpDesk">
      <h1 className="helpDesk__title text-light">Issue List</h1>
      <TableContainer component={Paper} className="helpDesk__tableContainer">
        <Table className="helpDesk__table">
          <TableHead>
            <TableRow className="text-light">
              <TableCell className="helpDesk__tableCell helpDesk__tableHeaderCell ">
                ID
              </TableCell>
              <TableCell className="helpDesk__tableCell helpDesk__tableHeaderCell">
                Subject
              </TableCell>
              <TableCell className="helpDesk__tableCell helpDesk__tableHeaderCell">
                Description
              </TableCell>
              <TableCell className="helpDesk__tableCell helpDesk__tableHeaderCell">
                Status
              </TableCell>
              <TableCell className="helpDesk__tableCell helpDesk__tableHeaderCell">
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow
                key={issue.id}
                className={`helpDesk__tableRow ${
                  issue.status === "Resolved" ? "resolved" : ""
                } ${issue.status === "InProgress" ? "inProgress" : ""}`}
                onClick={() =>
                  issue.status === "InProgress" ? handleOpen(issue) : null
                }
              >
                <TableCell className="helpDesk__tableCell">
                  {issue.id}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.subject}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.description}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.status}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="popup">
            <h2 id="transition-modal-title">Reply to Issue</h2>
            <p id="transition-modal-description">
              <strong>ID:</strong> {selectedIssue?.id}
            </p>
            <p id="transition-modal-description">
              <strong>Description:</strong> {selectedIssue?.description}
            </p>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Reply"
                multiline
                rows={4}
                variant="outlined"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </div>
            <div className="BTT">
              <Button className="A11A" onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={7000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </div>
  );
};

export default HelpDesk;
