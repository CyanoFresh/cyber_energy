import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { TopMenu } from "./TopMenu";
import { theme } from "./theme";
import { SelectForm } from "./SelectForm";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Tab1 } from "./Tab1";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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

            <TabPanel value={value} index={0}>
              <Tab1 />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel><TabPanel value={value} index={3}>
            Item Four
          </TabPanel>

          </Paper>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
