import { Alert, Box, Button, Spinner } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import Message from "./Message";

export default function Messages() {
  const {
    invitationCode,
    loadingInitial,
    error,
    getMessagesAndSubscribe,
    messages,
  } = useAppContext();
  const reversed = [...messages].reverse();

  if (loadingInitial)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error)
    return (
      <Alert status="error" mt="20px">
        {error}
        <Button
          ml="5px"
          onClick={getMessagesAndSubscribe}
          colorScheme="red"
          variant="link"
        >
          try to reconnect
        </Button>
      </Alert>
    );

  if (!messages.length)
    return (
      <Box as="h3" textAlign="center">
        No messages 😞
      </Box>
    );

  console.log(reversed);
  return reversed.map((message, i) => {
    // let prevTime = null;
    const isYou = message.invitation_code === invitationCode;
    // const currentTime = message.timestamp;
    // const displayTime = message.timestamp !== reversed[i - 1].timestamp;
    // console.log(displayTime, "displayTime");
    return (
      <Message
        key={message.id}
        message={message}
        isYou={isYou}
        // displayTime={displayTime}
      />
    );
  });
}
