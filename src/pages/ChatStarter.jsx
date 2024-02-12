import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { InvitationCode } from './InvitationCode';
import { Start } from './Start';
import { Rules } from './Rules';
import { End } from './End';

export const ChatStarter = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const style = {
    buttonStyle: {
      backgroundColor: '#1B1B1B',
      borderRadius: '23px',
      width: '100%',
      color: '#FFFFFF',
      fontSize: 'medium',
      fontWeight: '600',
    },
    headerStyle: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: '21',
      marginBottom: '30%',
      marginTop: '5%',
    },
    subTitleStyle: {
      color: '#868686',
      fontWeight: '500',
      fontSize: '15px',
      marginBottom: '2%',
    },
    titleStyle: {
      color: '#000000',
      fontWeight: '700',
      fontSize: '28px',
      padding: '0',
      marginBottom: '30%',
    },
    containerStyle: {
      height: '70vh',
    },
  };

  const nextPage = () => {
    switch (currentPage) {
      case 'start':
        setCurrentPage('rules');
        break;
      case 'rules':
        setCurrentPage('invitation');
        break;
      case 'invitation':
        setCurrentPage('end');
        break;
      default:
        setCurrentPage('start');
    }
  };
  return (
    <Container>
      {currentPage === 'start' && <Start nextPage={nextPage} style={style} />}
      {currentPage === 'invitation' && (
        <InvitationCode nextPage={nextPage} style={style} />
      )}
      {currentPage === 'rules' && <Rules nextPage={nextPage} style={style} />}
      {currentPage === 'end' && <End style={style} />}
    </Container>
  );
};
