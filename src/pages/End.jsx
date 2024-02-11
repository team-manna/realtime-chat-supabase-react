import { Button, Container, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider, useAppContext } from '../context/appContext';

export const End = ({ style }) => {
  return (
    <Container>
      <Container style={style.headerStyle}>
        <Text>mongle.</Text>
      </Container>

      <Container>
        <Container>
          <Image src="end.svg" />
        </Container>
        <Text style={style.subTitleStyle}>
          대화가 종료되었어요. <br /> 즐거운 대화 시간 보내셨나요?
        </Text>
        <Text style={style.titleStyle}>
          여러분의
          <br />
          소중한 의견을
          <br />
          들려주세요 💭
        </Text>
      </Container>
      <Container>
        <Button style={style.buttonStyle}>피드백 작성</Button>
      </Container>
    </Container>
  );
};
