import { FC, useState, useEffect, ChangeEvent} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToggleableStatusEntries } from "../../../interfaces/status/ToggleableStatusEntries";

interface StatusEntriesProps {
  statusEntriesSearchTermForFiltering: string;
  onStatusEntriesSearch: (searchTerm: string) => void;
  statusEntriesToToggle: ToggleableStatusEntries;
  onToggleStatusEntriesFilterChange: (statusEntriesToToggle: ToggleableStatusEntries) => void;
}

const StatusEntriesFilterBar: FC<StatusEntriesProps> = ({
  statusEntriesSearchTermForFiltering,
  onStatusEntriesSearch,
  statusEntriesToToggle,
  onToggleStatusEntriesFilterChange
}) => {
  const [statusEntriesSearchTerm, setStatusEntriesSearchTerm] = useState<string>(statusEntriesSearchTermForFiltering);
  const [checkedOnOrOffStatusEntries, setCheckedOnOrOffStatusEntries] = useState<ToggleableStatusEntries>(statusEntriesToToggle);

  const handleStatusEntriesSearch = (changeEvent: ChangeEvent<HTMLInputElement>): void => {
    const enteredSearchTerm = changeEvent.target.value as string;
    setStatusEntriesSearchTerm(enteredSearchTerm);
    onStatusEntriesSearch(enteredSearchTerm);
  }

  const handleOnOrOffCheckedStatusEntriesChange = (changeEvent: ChangeEvent<HTMLInputElement>): void => {
    const mergedOnOrOffStatusEntries = {
      ...checkedOnOrOffStatusEntries,
      [changeEvent.target.name]: changeEvent.target.checked
    } as ToggleableStatusEntries;

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
        sx={{ flexGrow: 1 }}
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

export default StatusEntriesFilterBar;