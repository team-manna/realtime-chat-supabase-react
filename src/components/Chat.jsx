import { Badge, Box, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import Messages from "./Messages";
import { BsChevronDoubleDown } from "react-icons/bs";
import MessageForm from "./MessageForm";
import { css } from "@emotion/react";

export default function Chat() {
  const {
    room,
    invitationCode,
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
  } = useAppContext();

  const infoTitleStyle = {
    fontSize: 13,
    fontWeight: 400,
    color: "#858585",
    letterSpacing: -0.22,
  };

  console.log(room?.ended_at, "room");

  return (
    <Container
      width="100%"
      height="100%"
      paddingBottom={210}
      backgroundColor={"white"}
      borderRadius="41px"
    >
      {/* <div>
        <p>room: {room.id}</p>
        <p>startedAt: {room.started_at}</p>
        <p>endedAt: {room.ended_at}</p>
        <p>invitationCode: {invitationCode}</p>
      </div> */}

      <Box
        // bg="white"
        width="100%"
        height="100%"
        overflow="auto"
        onScroll={onScroll}
        ref={scrollRef}
        // paddingTop="50px"
        position="relative"
      >
        <Box
          width="100%"
          alignItems="center"
          textAlign="center"
          position="sticky"
          backgroundColor="white"
          borderRadius={100}
          padding="10px"
          zIndex={10}
          top={0}
        >
          <div style={infoTitleStyle}>대화 종료까지</div>
        </Box>
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
      </Box>
    </Container>
  );
}
