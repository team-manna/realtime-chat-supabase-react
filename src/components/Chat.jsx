import { Badge, Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Messages from "./Messages";
import { BsChevronDoubleDown } from "react-icons/bs";
import MessageForm from "./MessageForm";
import { css } from "@emotion/react";

export default function Chat() {
  const [height, setHeight] = useState(window.innerHeight - 100);
  const {
    roomId,
    invitationCode,
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
  } = useAppContext();

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = css`
    max-width: 393px;
    padding-bottom: 26px;
  `;

  const boxStyle = css`
    background: white;
    padding: 5;
    overflow: auto;
    border-radius: 41px;
    height: ${height}px;
  `;

  const badgeStyle = css`
    margin-left: 1;
    font-size: 0.8em;
    color-scheme: green;
    display: flex;
    border-radius: 7px;
    padding: 3px 5px;
    align-items: center;
  `;

  const stickyDivStyle = css`
    position: sticky;
    bottom: 8px;
    float: right;
    cursor: pointer;
  `;

  return (
    <Container maxW="393px" pb="26px">
      <Box
        bg="white"
        p="5"
        overflow="auto"
        borderRadius="41px"
        height={height}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Messages />
        {!isOnBottom && (
          <div
            style={{
              position: "sticky",
              bottom: 8,
              // right: 0,
              float: "right",
              cursor: "pointer",
            }}
            onClick={scrollToBottom}
          >
            {unviewedMessageCount > 0 ? (
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme="green"
                display="flex"
                borderRadius="7px"
                padding="3px 5px"
                alignItems="center"
              >
                {unviewedMessageCount}
                <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
              </Badge>
            ) : (
              <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
            )}
          </div>
        )}
        <MessageForm />
      </Box>
    </Container>
  );
}
