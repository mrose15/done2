import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins";

const theme = extendTheme({
  colors: {
    red: {
      500: "#C53030",
    },
  },
  fonts: {
    body: `'Poppins', sans-serif`,
    heading: `'Poppins', sans-serif`,
  },
  components: {
    Flex: {
      baseStyle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "90dvh",
        width: "100%",
      },
      variants: {
        "bg-gradient": {
          bgGradient: "linear(white 0%, purple.200 75%, purple.300 100%)",
        },
      },
    },
    Box: {
      variants: {
        glassmorphism: {
          backdropFilter: "blur(10px)",
          borderRadius: "xl",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 2px 10px 0 rgba(31, 38, 135, .5)",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "md",
            border: "1px solid",
            borderColor: "purple.400",
            bg: "purple.50",
          },
        },
      },
    },
  },
});

export default theme;
