import React, { useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Tab1 } from './Tab1';
import { Tab2 } from './Tab2';
import Box from '@material-ui/core/Box';
import { DataContext } from './dataContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

export function TabPanels() {
  const [value, setValue] = useState(0);
  const { loading, error, data } = useContext(DataContext);

  const onChange = (event, newValue) => setValue(newValue);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data.temperatureToDate?.length) {
    return null;
  }

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={onChange}
        scrollButtons="auto"
        variant="scrollable"
      >
        <Tab label="Вкладка 1" />
        <Tab label="Вкладка 2" />
        <Tab label="Вкладка 3" />
        <Tab label="Вкладка 4" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Tab1 />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Tab2 />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Tab Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Tab Four
      </TabPanel>
    </Paper>
  );
}
