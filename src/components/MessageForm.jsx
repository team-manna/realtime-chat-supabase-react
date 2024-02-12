import { useState } from 'react';
import {
  Input,
  Stack,
  IconButton,
  useToast,
  Box,
  Container,
  Image,
  Text,
} from '@chakra-ui/react';
import { useAppContext } from '../context/appContext';
import supabase from '../supabaseClient';
import Send from '../../public/send.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MessageForm() {
  const navigate = useNavigate();
  const { invitationCode, session, room, isTime } = useAppContext();
  const [message, setMessage] = useState('');
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async e => {
    if (isTime === 'E') {
      return navigate('/end');
    }
    e.preventDefault();
    setIsSending(true);
    if (!message) return;

    setMessage('');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          text: message,
          invitation_code: invitationCode,
          is_authenticated: session ? true : false,
          room_id: room,
        },
      ]);

      if (error) {
        console.error(error.message);
        toast({
          title: 'Error sending',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      console.log('Sucsessfully sent!');
    } catch (error) {
      console.log('error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };
  useEffect(() => {
    console.log(isTime, '대화의 변화');
  }, [isTime]);

  return (
    <Box bg="#F6F6F6" borderRadius="35px" padding="10px" paddingRight={0}>
      <Container>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row">
            {isTime === 'E' ? (
              <Text
                style={{ fontSize: 14, fontWeight: 700 }}
                onChange={e => setMessage(e.target.value)}
                value={message}
                bg="#F6F6F6"
                alignItems="center"
                justifyContent="flex-start"
                display="flex"
                width="100%">
                대화가 종료됐어요 👏🏻
              </Text>
            ) : (
              <Input
                name="message"
                placeholder={
                  isTime === 'B' ? '대화 시작 전이에요!' : '메시지 보내기'
                }
                style={{ fontSize: 14, fontWeight: 200 }}
                onChange={e => setMessage(e.target.value)}
                value={message}
                bg="#F6F6F6"
                border="none"
                autoFocus
                maxLength="500"
                variant="unstyled"
                disabled={isTime === 'B'}
              />
            )}

            <IconButton
              // colorScheme="white"
              isRound={true}
              padding="13px"
              type="submit"
              disabled={!message}
              isLoading={isSending}
              size="md"
              backgroundColor="White"
              isDisabled={isTime === 'B'}>
              <Image src={isTime === 'E' ? 'back.svg' : 'send.svg'} />
            </IconButton>
          </Stack>
        </form>
      </Container>
    </Box>
  );
}
