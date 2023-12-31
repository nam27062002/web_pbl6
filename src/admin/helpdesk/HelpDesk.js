import React, { useState, useEffect } from "react";
import moment from "moment";
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
import "../../styles/Components/HelpDesk.css";
import util from "../../util";

const HelpDesk = () => {
  const [user, setUser] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('user'));
    return localData || null
  });
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [open, setOpen] = useState(false);
  const [openResolved, setOpenResolved] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;
  const totalPages = Math.ceil(issues.length / issuesPerPage);
  const startIndex = (currentPage - 1) * issuesPerPage;
  const endIndex = startIndex + issuesPerPage;
  const currentIssues = () => {
    const filteredData = issues.filter((issue) => {
      const isMatchingSearchText = exactMatch
        ? issue.id.toString() === searchText ||
          issue.description.toLowerCase() === searchText.toLowerCase()
        : issue.id.toString().includes(searchText) ||
          issue.description.toLowerCase().includes(searchText.toLowerCase());
      const isMatchingIssueStatus =
        selectedIssueStatus === "All" || issue.status === selectedIssueStatus;
      if (selectedField === "All") {
        return isMatchingSearchText && isMatchingIssueStatus;
      } else {
        const isMatchingField = issue[selectedField]
          .toString()
          .toLowerCase()
          .includes(searchText.toLowerCase());
        return isMatchingField && isMatchingIssueStatus;
      }
    });
    return filteredData.slice(startIndex, endIndex);
  };
  const [searchText, setSearchText] = useState("");
  const [selectedField, setSelectedField] = useState("All");
  const [selectedIssueStatus, setSelectedIssueStatus] = useState("All");
  const [exactMatch, setExactMatch] = useState(false);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const highlightText = (text, search) => {
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ridewizard.pro:9000/api/v1/issues",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.accessToken}`
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

  const handleOpenResolved = (issue) => {
    setSelectedIssue(issue);
    setOpenResolved(true);
  };
  const handleCloseResolved = () => {
    setOpenResolved(false);
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
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            resolution: replyText,
          }),
        }
      );

      if (response.ok) {
        util.showToastSuccess("Issue resolved successfully");
        const updatedIssues = await fetchUpdatedIssues();
        setIssues(updatedIssues);
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
        util.showToastWarning(`Failed to resolve issue: ${errorMessage}`);
      }
    } catch (error) {
      util.showToastWarning(`Error while resolving issue: ${error.message}`);
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
            `Bearer ${user.accessToken}` ,
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
      <h1 className="helpDesk__title text-light me-3">Issue List</h1>

      <div className={"filter-container"}>
        <label className="filter-label text-light me-3">
          Field:
          <select
            className="filter-dropdown form-item-history ms-3"
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="All">All</option>
            <option value="id">ID</option>
            <option value="description">Description</option>
          </select>
        </label>

        <label className="filter-label text-light me-3">
          Search:
          <input
            className="search-input form-item-history ms-3"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </label>

        <label className="filter-label text-light me-3">
          Status:
          <select
            className="filter-dropdown form-item-history ms-3"
            value={selectedIssueStatus}
            onChange={(e) => setSelectedIssueStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Resolved">Resolved</option>
            <option value="InProgress">InProgress</option>
          </select>
        </label>

        <label className="filter-label text-light me-3">
          Exact Match:
          <input
            className="exact-match-checkbox"
            type="checkbox"
            checked={exactMatch}
            onChange={() => setExactMatch(!exactMatch)}
          />
        </label>
      </div>
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
            {currentIssues().map((issue) => (
              <TableRow
                key={issue.id}
                className={`helpDesk__tableRow ${
                  issue.status === "Resolved" ? "resolved" : ""
                } ${issue.status === "InProgress" ? "inProgress" : ""}`}
                onClick={() =>
                  issue.status === "InProgress"
                    ? handleOpen(issue)
                    : handleOpenResolved(issue)
                }
              >
                <TableCell className="helpDesk__tableCell">
                  {(selectedField === "All" || selectedField === "id") &&
                  searchText &&
                  issue.id.toString().includes(searchText) ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(issue.id.toString(), searchText),
                      }}
                    />
                  ) : (
                    issue.id
                  )}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.subject}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {(selectedField === "All" ||
                    selectedField === "description") &&
                  searchText &&
                  issue.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: highlightText(issue.description, searchText),
                      }}
                    />
                  ) : (
                    issue.description
                  )}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {issue.status}
                </TableCell>
                <TableCell className="helpDesk__tableCell">
                  {moment(issue.createdAt).format("DD/MM/YYYY HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination-buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openResolved}
        onClose={handleCloseResolved}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openResolved}>
          <div className="popup">
            <h2 id="transition-modal-title">Issue has been answered</h2>
            <p id="transition-modal-description">
              <strong>ID:</strong> {selectedIssue?.id}
            </p>
            <p id="transition-modal-description">
              <strong>Description:</strong> {selectedIssue?.description}
            </p>
            <p id="transition-modal-description">
              <strong>Resolution:</strong> {selectedIssue?.resolution}
            </p>
            <p id="transition-modal-description">
              <strong>Date of issue submission</strong>{" "}
              {moment(selectedIssue?.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
            <p id="transition-modal-description">
              <strong>Date of issue resolution:</strong>{" "}
              {moment(selectedIssue?.updatedAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default HelpDesk;
