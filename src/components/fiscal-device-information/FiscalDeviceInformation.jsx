import { forwardRef, Fragment, useState, useEffect } from 'react';
import { H3 } from '../layout/typography-elements/TypographyElements';
import { TableVirtuoso } from 'react-virtuoso';
import { useFP } from '../../hooks/useFP';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const columns = [
  {
    width: 100,
    label: 'Name',
    dataKey: 'statusEntryName',
  },
  {
    width: 50,
    label: 'Status',
    dataKey: 'statusEntryValue',
  }
];

const VirtuosoTableComponents = {
  Scroller: forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

const fixedHeaderContent = () => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const rowContent = (_index, row) => {
  return (
    <Fragment>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === 'statusEntryValue' ? (
            row[column.dataKey] ? <EmojiObjectsIcon style={{ fill: 'orange' }} /> : <EmojiObjectsIcon style={{ fill: 'grey' }} />
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </Fragment>
  );
}

const FiscalDeviceInformation = () => {
  const [statusEntries, setStatusEntries] = useState([]);
  const fp = useFP();

  useEffect(() => {
    const readStatusEntries = fp.ReadStatus();
    
    const mappedStatusEntries = Object.entries(readStatusEntries).map(([key, value]) => ({
      statusEntryName: key.replaceAll("_", " "),
      statusEntryValue: value
    }));

    setStatusEntries(mappedStatusEntries);
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', px: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper style={{ height: '600px', width: '100%' }}>
              <TableVirtuoso
                data={statusEntries}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 3 }}>
            <Card>
              <CardContent>
                <H3 sx={{ color: 'text.secondary' }}>
                  Information
                </H3>
                <Stack spacing={2} sx={{ mt: 3 }}>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }}>
                    Read Status
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }}>
                    Version
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }}>
                    Date / Time
                  </Button>
                  <Button size="medium" variant="contained" sx={{ width: '100%' }}>
                    Diagnostics
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FiscalDeviceInformation;