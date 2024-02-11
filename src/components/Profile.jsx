import { Container, Box, Button, Image } from '@chakra-ui/react';
import { useAppContext } from '../context/appContext';
// import { Badge, Box, Container } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Container
      style={{
        zIndex: 100,
        backgroundColor: '#F7F6F5',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
      }}>
      <Box
        style={{
          justifyContent: 'space-between',
          width: '100%',
          display: 'flex',
          fontSize: 25,
          fontWeight: 200,
        }}>
        Profile
        <Button
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            padding: 10,
            borderColor: '#D5D5D5',
            borderWidth: 1,
          }}>
          <Image src="backbutton.svg" />
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
