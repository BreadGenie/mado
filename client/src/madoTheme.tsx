import { extendTheme as extendJoyTheme } from "@mui/joy/styles";
import { deepmerge } from "@mui/utils";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";

const muiTheme = extendMuiTheme({
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#171717",
          dark: "#3d3d3d",
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "4px",
          fontWeight: 600,
          ...(ownerState.size === "medium" && {
            minHeight: "36px",
            fontSize: "14px",
            paddingInline: "18px",
          }),
          "&:active": {
            transform: "translateY(1px)",
          },
        }),
      },
    },
  },
});

const joyTheme = extendJoyTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#171717",
          solidHoverBg: "#3d3d3d",
          solidActiveBg: undefined,
          solidDisabledBg: "#595959",
        },
        danger: {
          solidBg: "#DA0037",
          solidHoverBg: "#b5002d",
          solidActiveBg: undefined,
        },
      },
    },
  },
  fontFamily: {
    body: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  },
  focus: {
    default: {
      outlineWidth: "2px",
      outlineOffset: "2px",
      outlineColor: "#339af0",
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          transition: "initial",
          borderRadius: "4px",
          fontWeight: 600,
          ...(ownerState.size === "md" && {
            minHeight: "36px",
            fontSize: "14px",
            paddingInline: "18px",
          }),
          "&:active": {
            transform: "translateY(1px)",
          },
        }),
      },
    },
    JoyIconButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: "100px",
        }),
      },
    },
  },
});

const madoTheme = deepmerge(muiTheme, joyTheme);

export default madoTheme;
