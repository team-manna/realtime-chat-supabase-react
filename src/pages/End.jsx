import { Button, Container, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider, useAppContext } from '../context/appContext';

export const End = ({ style }) => {
  return (
    <Container>
      <Container
        style={{
          textAlign: 'center',
          fontWeight: '400',
          fontSize: '21',
          marginBottom: '30%',
          marginTop: '5%',
        }}>
        <Text>mongle.</Text>
      </Container>

      <Container>
        <Container>
          <Image src="end.svg" />
        </Container>
        <Text
          style={{
            color: '#868686',
            fontWeight: '500',
            fontSize: '15px',
            marginBottom: '2%',
          }}>
          대화가 종료되었어요. <br /> 즐거운 대화 시간 보내셨나요?
        </Text>
        <Text
          style={{
            color: '#000000',
            fontWeight: '700',
            fontSize: '28px',
            padding: '0',
            marginBottom: '40%',
          }}>
          여러분의
          <br />
          소중한 의견을
          <br />
          들려주세요 💭
        </Text>
      </Container>
      <Container>
        <Button
          style={{
            backgroundColor: '#1B1B1B',
            borderRadius: '23px',
            width: '100%',
            color: '#FFFFFF',
            fontSize: 'medium',
            fontWeight: '600',
          }}>
          피드백 작성
        </Button>
      </Container>
    </Container>
  );
};
