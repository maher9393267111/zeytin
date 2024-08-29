import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Cairo", sans-serif !important',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },



  palette: {
    primary: {
      main: "#29221f",
    },
    secondary: {
      main: "#575757",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#00962a",
    },
    background: {
      default: "#F0F0F0",
      paper: "#fff",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        colorInherit: {
          color: "white",
          cursor: "pointer",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: '"Cairo", sans-serif !important',
          "& .MuiSelect-select": {
            fontFamily: '"Cairo", sans-serif !important',
            color: "white",
          },
        },
      },
      defaultProps: {
        style: {
          fontFamily: '"Cairo", sans-serif !important',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorInherit: {
          color: "white",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-cell--textLeft": {
            cursor: "pointer",
          },
        },
      },
    },
  },
});

export default theme;