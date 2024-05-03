import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-UI/core/TableHead";
import TableRow from "@material-UI/core/TableRow";
import TableCell from "@material-UI/core/TableCell";
import TableSortLabel from "@material-UI/core/TableSortLabel";
import axios from "axios"; // Assuming axios for API calls
import Button from "@material-UI/core/Button";
import TextField from "@material-UI/core/TextField"; // For search input

const DNSRecordTable = ({ domain, records, onRecordEdit, onRecordDelete, onSearch }) => {
    const columns = [
      { name: "Type", key: "type" },
      { name: "Name", key: "name" },
      { name: "Value", key: "value" },
      { name: "Actions", key: "actions" },
    ];

  const [sortState, setSortState] = useState({
    sortBy: null,
    sortDirection: "asc",
  });

  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  const handleSortClick = (columnKey) => {
    const isAsc = sortState.sortBy === columnKey && sortState.sortDirection === "asc";
    setSortState({
      sortBy: columnKey,
      sortDirection: isAsc ? "desc" : "asc",
    });
  };

  const handleEditClick = (record) => {
    onRecordEdit(record);
  };

  const handleDeleteClick = (record) => {
    // Implement confirmation prompt before deletion
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      onRecordDelete(record);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Trigger


  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`your-backend-api-url/${domain.name}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [domain]); // Refetch data when domain prop changes

  const handleSortClick = (columnKey) => {
    const isAsc = sortState.sortBy === columnKey && sortState.sortDirection === "asc";
    setSortState({
      sortBy: columnKey,
      sortDirection: isAsc ? "desc" : "asc",
    });
  };

  const sortedRecords = records.slice(); // Copy records array

  if (sortState.sortBy) {
    sortedRecords.sort((a, b) => {
      const sortCol = sortState.sortBy;
      const sortOrder = sortState.sortDirection === "asc" ? 1 : -1;
      if (a[sortCol] < b[sortCol]) {
        return -1 * sortOrder;
      } else if (a[sortCol] > b[sortCol]) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });
  }

  return (
    <div>
      <h2>DNS Records for {domain.name}</h2>
      {isLoading ? (
        <p>Loading records...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Table>
          {/* Table header row (already implemented) */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  <TableSortLabel
                    active={sortState.sortBy === column.key}
                    direction={sortState.sortDirection}
                    onClick={() => handleSortClick(column.key)}
                  >
                    {column.name}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRecords.map((record) => (
              <TableRow key={record.type + record.name}>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.name}</TableCell>
                <TableCell>{record.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
}
export default DNSRecordTable;