import { useState } from "react";
import {
  Input,
  Stack,
  IconButton,
  useToast,
  Box,
  Container,
  Image,
} from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";

export default function MessageForm() {
  const { invitationCode, session } = useAppContext();
  const [message, setMessage] = useState("");
  const toast = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if (!message) return;

    setMessage("");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          text: message,
          invitation_code: invitationCode,
          is_authenticated: session ? true : false,
        },
      ]);

      if (error) {
        console.error(error.message);
        toast({
          title: "Error sending",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      console.log("Sucsessfully sent!");
    } catch (error) {
      console.log("error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box bg="#F6F6F6" borderRadius="35px" padding="10px" paddingRight={0}>
      <Container>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row">
            <Input
              name="message"
              placeholder="메시지 보내기"
              style={{ fontSize: 14, fontWeight: 200 }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              bg="#F6F6F6"
              border="none"
              autoFocus
              maxLength="500"
              variant="unstyled"
            />
            <IconButton
              // colorScheme="white"
              isRound={true}
              padding="15px"
              type="submit"
              disabled={!message}
              isLoading={isSending}
              size="md"
              backgroundColor="White"
            >
              <Image src="send.svg" />
            </IconButton>
          </Stack>
        </form>
      </Container>
    </Box>
  );
}
