import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";

export const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: { main: green[600] },
    secondary: pink
  }
});
