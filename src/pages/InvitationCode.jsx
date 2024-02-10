import {
  Button,
  PinInput,
  PinInputField,
  Container,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export const InvitationCode = ({ nextPage, style }) => {
  const [code, setCode] = useState('......');
  const isButtonDisabled = code.length < 6;

  // 입력값이 변경되었을 때 호출되는 함수
  const handleInputChange = e => {
    const input = e.target.value;
    // 코드가 숫자이고 6자리를 초과하지 않도록 제한
    if (/^\d*$/.test(input) && input.length <= 6) {
      setCode(input);
    }
  };

  return (
    <Container>
      <Container style={style.headerStyle}>
        <Text>mongle.</Text>
      </Container>

      <Container style={style.containerStyle}>
        <Text style={style.titleStyle}>초대 코드를 입력하세요</Text>
        <PinInput variant="unstyled">
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Container>

      <Container textAlign="center">
        <Button style={style.buttonStyle}>입장하기</Button>
      </Container>
    </Container>
  );
};
