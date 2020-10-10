import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TopMenu } from './TopMenu';
import { theme } from '../theme';
import { SelectForm } from './SelectForm';
import { TabPanels } from './TabPanels';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TopMenu />

      <main>
        <div className={classes.toolbar} />

        <Container maxWidth="md">
          <SelectForm setData={setData} />

          <TabPanels data={data} />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
