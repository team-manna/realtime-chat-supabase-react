import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { useState, Fragment } from 'react';
import './App.css';
import Header from './layout/Header';
import Chat from './components/Chat';
import Profile from './components/Profile';
import { InvitationCodeForm } from './components/InvitationCodeForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './context/appContext';
import MessageForm from './components/MessageForm';
import { ChatStarter } from './pages/ChatStarter';

function App() {
  const { invitationCode, setInvitationCode, routeHash } = useAppContext();
  const [modal, setModal] = useState(false);

  const globalStyle = {
    maxWidth: '410px',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F7F6F5',
    height: '100vh',
    overflow: 'hidden',
    touchAction: 'none',
  };

  if (routeHash) {
    if (routeHash.endsWith('&type=recovery')) {
      window.location.replace(`/login/${routeHash}`);
    }
    if (routeHash.startsWith('#error_code=404'))
      return (
        <div>
          <p>This link has expired</p>
          <a href="/" style={{ cursor: 'pointer' }} variant="link">
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
                    <ChatStarter />
                  </>
                }
              />
              <Route
                path="/chat"
                element={
                  <div style={{ position: 'relative' }}>
                    {modal && <Profile />}
                    <Header modal={modal} setModal={setModal} />
                    <Chat />
                    <div
                      style={{
                        position: 'fixed',
                        bottom: '1%',
                        width: window.innerWidth,
                        maxWidth: '400px',
                        padding: 20,
                      }}>
                      <MessageForm />
                    </div>
                  </div>
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
