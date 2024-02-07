import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";

export const InvitationCodeForm = (props) => {
  const [input, setInput] = useState("");
  const { invitationCode, setInvitationCode, room, setRoom } = useAppContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error, status } = await supabase
      .from("invitation_codes")
      .select("rooms(id, started_at, ended_at)")
      .eq("invitation_code", input)
      .maybeSingle();
    if (error) {
      console.error(error);
    } else if (!data) {
      console.log("빈 값");
      alert("코드를 정확히 기입해 주세요");
    } else {
      console.log(`디버그: ${input}`);
      console.log(`invitation code 디버그: ${JSON.stringify(data)}`);
      setRoom(data.rooms);
      setInvitationCode(input);
      console.log(data);
      sessionStorage.setItem("@ROOMID", data.rooms.id);
      sessionStorage.setItem("@START", data.rooms.started_at);
      sessionStorage.setItem("@END", data.rooms.ended_at);
      navigate(`/chat/${data.rooms.id}`);
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   console.log("clicked");
  //   ha
  //   console.log(res, "res");
  //   // console.log("완룡");
  //   // navigate(`/chat`);
  // };

  return (
    <div
      className={css`
        background-color: #f7f6f5;
        border-radius: 10px;
        width: 300px;
        height: 500px;
      `}
    >
      <h1>
        {invitationCode} {room?.id}
      </h1>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <input type="text" value={input} onChange={handleInputChange} />
        {/* <button type="submit">Submit</button> */}
      </form>
      <div>예시코드: K4jmMU</div>
      <div>예시코드: 4mNyLD</div>
      <div>예시코드: MA2NaT</div>
      <button onClick={handleSubmit}>채팅하러 가기</button>
    </div>
  );
};
