import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';

const StatusEntriesFilterBar = ({
  statusEntriesSearchTermForFiltering,
  onStatusEntriesSearch,
  statusEntriesToToggle,
  onToggleStatusEntriesFilterChange
}) => {
  const [statusEntriesSearchTerm, setStatusEntriesSearchTerm] = useState(statusEntriesSearchTermForFiltering);
  const [checkedOnOrOffStatusEntries, setCheckedOnOrOffStatusEntries] = useState(statusEntriesToToggle);

  const handleStatusEntriesSearch = (changeEvent) => {
    const enteredSearchTerm = changeEvent.target.value;
    setStatusEntriesSearchTerm(enteredSearchTerm);
    onStatusEntriesSearch(enteredSearchTerm);
  }

  const handleOnOrOffCheckedStatusEntriesChange = (changeEvent) => {
    const mergedOnOrOffStatusEntries = {
      ...checkedOnOrOffStatusEntries,
      [changeEvent.target.name]: changeEvent.target.checked
    }

    setCheckedOnOrOffStatusEntries(mergedOnOrOffStatusEntries);
    onToggleStatusEntriesFilterChange(mergedOnOrOffStatusEntries);
  };

  const { onStatusEntries, offStatusEntries } = checkedOnOrOffStatusEntries;

  useEffect(() => {
    setStatusEntriesSearchTerm(statusEntriesSearchTermForFiltering);
    setCheckedOnOrOffStatusEntries(statusEntriesToToggle);
  }, [statusEntriesSearchTermForFiltering, statusEntriesToToggle]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      width: '100%',
      gap: 2,
      mb: 2
    }}>
      <TextField
        type="text"
        placeholder="Search for status entry..."
        variant="outlined"
        size="small"
        value={statusEntriesSearchTerm}
        onChange={handleStatusEntriesSearch}
        sx={{ flexGrow: { xs: 0, lg: 1 } }}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="onStatusEntries"
              checked={onStatusEntries}
              onChange={handleOnOrOffCheckedStatusEntriesChange}
            />
          }
          label="On"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="offStatusEntries"
              checked={offStatusEntries}
              onChange={handleOnOrOffCheckedStatusEntriesChange}
            />
          }
          label="Off"
        />
      </FormGroup>
    </Box>
  )
}

StatusEntriesFilterBar.propTypes = {
  statusEntriesSearchTermForFiltering: PropTypes.string,
  onStatusEntriesSearch: PropTypes.func.isRequired,
  statusEntriesToToggle: PropTypes.object,
  onToggleStatusEntriesFilterChange: PropTypes.func
};

export default StatusEntriesFilterBar;