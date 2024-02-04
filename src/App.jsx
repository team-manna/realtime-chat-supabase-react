import { ChakraProvider, Box, theme } from "@chakra-ui/react";
// import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import "./App.css";
import Header from "./layout/Header";
import Chat from "./components/Chat";
import { InvitationCodeForm } from "./components/InvitationCodeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./context/appContext";

function App() {
  const { invitationCode, setInvitationCode, routeHash } = useAppContext();

  const globalStyle = {
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F7F6F5",
  };

  if (routeHash) {
    if (routeHash.endsWith("&type=recovery")) {
      window.location.replace(`/login/${routeHash}`);
    }
    if (routeHash.startsWith("#error_code=404"))
      return (
        <div>
          <p>This link has expired</p>
          <a href="/" style={{ cursor: "pointer" }} variant="link">
            Back to app
          </a>
        </div>
      );
  }
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Box bg="#F7F6F5" style={globalStyle}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <InvitationCodeForm />
                  </>
                }
              />
              <Route
                path="/chat"
                element={
                  <>
                    <Header />
                    <Chat />
                  </>
                }
              />
              <Route path="*" element={<p>Not found</p>} />
            </Routes>
          </Router>
        </Box>
      </AppContextProvider>
    </ChakraProvider>
  );
}

export default App;
