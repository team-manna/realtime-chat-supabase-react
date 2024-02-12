import { Badge, Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import Messages from './Messages';
import { BsChevronDoubleDown } from 'react-icons/bs';
import dayjs from 'dayjs';

export default function Chat() {
  const {
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
    myInfo,
    setIsTime,
  } = useAppContext();

  const infoTitleStyle = {
    fontSize: 13,
    fontWeight: 400,
    color: '#858585',
    letterSpacing: -0.22,
  };
  const [chatTimeText, setChatTimeText] = useState('');
  //* 오늘 날짜
  const today = dayjs().format('YYYY-MM-DD HH:mm:ss');
  // console.log(today, '오늘');
  //* 대화 시작 시간
  const startTime = dayjs(sessionStorage.getItem('@START')).format(
    'YYYY-MM-DD HH:mm:ss',
  );
  console.log(startTime, '대화 시작 시간');
  //* 대화 종료 시간
  const endTime = dayjs(sessionStorage.getItem('@START'))
    .add(15, 'm')
    .format('YYYY-MM-DD HH:mm:ss');
  console.log(endTime, '대화 종료 시간');
  //* 지금시간부터 대화 종료까지 남은 시간(대화 시간 안일떄)
  // const diffEndMinute = dayjs(today).diff(endTime, 'm');
  const diffEndTime = dayjs(endTime).diff(today, 's');
  console.log(diffEndTime);
  //* 지금시간 부터 대화 시작까지 남은 시간(대화 시작 전일떄)
  // const diffStartMinute = dayjs(today).diff(startTime, 'm');
  const diffStartTime = dayjs(startTime).diff(today, 's');
  console.log(diffStartTime);
  //* 타이머 state
  const [timeLeft, setTimeLeft] = useState();
  //* 채팅 시작 전
  const beforeChat = dayjs(today) < dayjs(startTime);
  //* 채팅 시작이후
  const ingChat = diffEndTime > 0;
  useEffect(() => {
    if (beforeChat) {
      console.log(beforeChat, '시작전');
      setTimeLeft(diffStartTime * 1000);
      setChatTimeText('대화 시작 까지');
      setIsTime('B');
    } else if (ingChat) {
      console.log(ingChat, '대화 중');
      setTimeLeft(diffEndTime * 1000);
      setChatTimeText('대화 종료 까지');
      setIsTime('I');
    } else {
      setIsTime('E');
    }
  }, []);
  //* 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1000);
    }, 1000);
    // console.log()
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log('타이머가 종료되었습니다.');
    }
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  // const MINUTES_IN_MS = 15 * 60 * 1000;
  // const [timeLeft, setTimeLeft] = useState(MINUTES_IN_MS);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
  console.log(minutes, second, '타이머');

  return (
    <Container
      width="100%"
      height="100%"
      paddingBottom={210}
      backgroundColor={'white'}
      borderRadius="41px">
      <Box
        // bg="white"
        width="100%"
        height="100%"
        overflow="auto"
        onScroll={onScroll}
        ref={scrollRef}
        // paddingTop="50px"
        position="relative">
        <Box
          width="100%"
          alignItems="center"
          textAlign="center"
          position="sticky"
          backgroundColor="white"
          borderRadius={100}
          padding="10px"
          zIndex={10}
          top={0}>
          <div style={infoTitleStyle}>
            {chatTimeText}
            {' ' + minutes}분{' ' + second}초
          </div>
        </Box>
        <Messages />
        {!isOnBottom && (
          <div
            style={{
              position: 'sticky',
              bottom: 8,
              // right: 0,
              float: 'right',
              cursor: 'pointer',
            }}
            onClick={scrollToBottom}>
            {unviewedMessageCount > 0 ? (
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme="green"
                display="flex"
                borderRadius="7px"
                padding="3px 5px"
                alignItems="center">
                {unviewedMessageCount}
                <BsChevronDoubleDown style={{ marginLeft: '3px' }} />
              </Badge>
            ) : (
              <BsChevronDoubleDown style={{ marginLeft: '3px' }} />
            )}
          </div>
        )}
      </Box>
    </Container>
  );
}
