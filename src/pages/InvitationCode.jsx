import {
  Button,
  PinInput,
  PinInputField,
  Container,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import supabase from '../supabaseClient';

import { useLocation, useNavigate } from 'react-router-dom';

export const InvitationCode = ({ nextPage, style }) => {
  const [input, setInput] = useState('......');
  const { invitationCode, setInvitationCode, room, setRoom, setAllData } =
    useAppContext();
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const checkInvitationCode = async e => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('invitation_codes')
      .select()
      .eq('invitation_code', input)
      .maybeSingle();
    if (error) {
      console.error(error);
    } else if (!data) {
      return alert('코드를 정확히 기입해 주세요 !');
    } else {
      console.log(data);
      setRoom(data.room_id);
      setInvitationCode(input);
      setAllData(data);
      sessionStorage.setItem('@CODE', data.invitation_code);
      navigate(`/chat`);
    }
  };
  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  return (
    <Container>
      <Container style={style.headerStyle}>
        <Text>mongle.</Text>
      </Container>

      <Container style={style.containerStyle}>
        <Text style={style.titleStyle}>초대 코드를 입력하세요</Text>
        <PinInput
          otp
          variant="unstyled"
          type="alphanumeric"
          onChange={e => setInput(e)}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Container>

      <Container textAlign="center">
        <Button style={style.buttonStyle} onClick={checkInvitationCode}>
          입장하기
        </Button>
      </Container>
    </Container>
  );
};
