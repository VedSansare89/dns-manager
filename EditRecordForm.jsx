import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-UI/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const EditRecordForm = ({ record, onSubmit, onCancel }) => {
  const [type, setType] = useState(record.type);
  const [name, setName] = useState(record.name);
  const [value, setValue] = useState(record.value);

  useEffect(() => {
    setType(record.type);
    setName(record.name);
    setValue(record.value);
  }, [record]); // Update form fields when record changes

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecord = { ...record, type, name, value };
    onSubmit(updatedRecord);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Value" value={value} onChange={(e) => setValue(e.target.value)} required />
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <MenuItem value="A">A</MenuItem>
        <MenuItem value="CNAME">CNAME</MenuItem>
        {/* Add more record types as needed */}
      </Select>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditRecordForm;
