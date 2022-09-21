import { extendTheme } from "@mui/joy/styles";

const madoTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#171717",
          solidHoverBg: "#3d3d3d",
          solidActiveBg: undefined,
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

export default madoTheme;
