import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      light: "#ebf2fa", 
      dark: "#2D3748", 
    },
    text: {
      light: "#47556A", 
      dark: "#fff",
    },
    background: {
      light: "#fff", 
      dark: "#1A202C", 
    },
    cards: {
      light: "#fff", 
      dark: "#2D3748", 
    },
    splash: {
      light: "#fff", 
      dark: "#1A202C", 
    },
    icon: {
      light: "#47556A",
      dark: "#fff",
    },
    sidebar: {
      light: "#ebf2fa",
      dark: "#2D3748",
    },
  },
  fonts: {
    heading: `'Outfit'`,
    body: `'Outfit'`,
  },
});

export default theme;
