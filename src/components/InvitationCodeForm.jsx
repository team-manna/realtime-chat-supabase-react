import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";

export const InvitationCodeForm = (props) => {
    const [input, setInput] = useState("");
    const { invitationCode, setInvitationCode, roomId, setRoomId } = useAppContext();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from("invitation_codes")
            .select();

        console.log(data[0]);

        if (error) {
            console.error(error);
        } else {
            console.log(`set invitation code ${input} ${[...data]}`);
            setInvitationCode(input);
            setRoomId(data);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        console.log("clicked");
        navigate(`/chat`)
    }

    return (
        <div className={css`
        background-color: #F7F6F5;
        border-radius: 10px;
        width: 300px;
        height: 500px;
        `}>
            <h1>{invitationCode} {roomId}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>

            <button onClick={handleClick}>채팅하러 가기</button>
        </div>
    );
};
