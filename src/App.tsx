import {
  ChakraProvider,
  StyleFunctionProps,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "default",
        bg: "#A7BEAE",
      },
    }),
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <AppRoutes />
    </Router>
  </ChakraProvider>
);
