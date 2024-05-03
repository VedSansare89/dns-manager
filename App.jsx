import React, { useState, useEffect } from "react";
import axios from "axios";
// Import Material-UI components (replace with your actual imports)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-UI/core";
import { TextField, Select, MenuItem } from "@material-UI/core";

const App = () => {
  const [domain, setDomain] = useState("example.com"); // Replace with your domain
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);

  const fetchRecords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`your-backend-api-url/records/${domain}`); // Replace URL
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [domain]); // Fetch records whenever domain changes

  const handleRecordEdit = (record) => {
    setRecordToEdit(record);
    setOpenEditModal(true);
  };

  const handleEditSubmit = async (updatedRecord) => {
    try {
      // Make API call to update record (replace with your actual API call)
      const response = await axios.put(`your-backend-api-url/records/${updatedRecord.id}`, updatedRecord);
      const updatedRecords = records.map((record) => (record.id === updatedRecord.id ? response.data : record));
      setRecords(updatedRecords);
    } catch (error) {
      console.error("Error updating record:", error);
      // Handle errors appropriately (e.g., display error message to user)
    } finally {
      setOpenEditModal(false);
    }
  };

  const handleEditCancel = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="App">
      <h1>DNS Record Management</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <DNSRecordTable record={record} key={record.id} onRecordEdit={handleRecordEdit} />
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={openEditModal} onClose={handleEditCancel}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          {/* EditRecordForm component with props */}
          <EditRecordForm
            record={recordToEdit}
            onSubmit={handleEditSubmit} // Pass the handleEditSubmit function
            onCancel={() => setOpenEditModal(false)} // Inline function to close the modal
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
