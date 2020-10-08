import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { TopMenu } from './TopMenu';
import { theme } from './theme';
import { SelectForm } from './SelectForm';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <TopMenu />

      <main>
        <div className={classes.toolbar} />

        <Container maxWidth="md">
          <SelectForm />
          <Paper className={classes.root}>
            <Tabs centered value={value} onChange={handleChange}>
              <Tab label="Вкладка 1" />
              <Tab label="Вкладка 2" />
              <Tab label="Вкладка 3" />
              <Tab label="Вкладка 4" />
            </Tabs>
          </Paper>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
