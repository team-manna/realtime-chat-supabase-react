import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { MdVerified } from "react-icons/md";
import { truncateText } from "../utils";

import { css } from "@emotion/css";

export default function Message({ message, isYou, displayTime }) {
  const timeTextStyle = css`
    position: relative;
    font-size: 12px;
    letter-spacing: -0.22px;
    line-height: 36.8px;
    font-weight: 300;
    font-family: Pretendard;
    color: "#bdbdbd";
    text-align: right;
    padding-right: 10px;
  `;

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    justify-content: ${isYou ? "flex-end" : "flex-start"};
    align-items: ${isYou ? "flex-end" : "flex-start"};
  `;

  const balloonStyle = css`
    position: relative;
    border-radius: 22px;
    background-color: ${isYou ? "#8C7E71" : "#F6F6F6"};
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 5px 17px;
    margin-top: 10px;
    align-items: ${isYou ? "flex-end" : "flex-start"};
  `;
  console.log(displayTime, 123);
  // const realtime = dayjs(message.timestamp).format("HH:MM");
  return (
    <div className={containerStyle}>
      <div className={balloonStyle}>
        <div>
          {/* <span>{message.username} </span> */}
          {message.is_authenticated && (
            <MdVerified
              color="#1d9bf0"
              style={{ display: "inline", marginRight: "5px" }}
            />
          )}
        </div>
        <div>{truncateText(message.text)}</div>
      </div>

      <div className={timeTextStyle}>
        {dayjs(message.timestamp).format("HH:MM")}
      </div>
    </div>
  );
}
