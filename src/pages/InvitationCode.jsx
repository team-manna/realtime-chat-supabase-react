import { Button, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";


export const InvitationCode = () => {

	const globalStyle = {
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#F9F9F7",
    height: "100vh",
    overflow: "hidden",
    touchAction: "none",
  };

	return(
		<Container style={globalStyle}>
			<Container
				textAlign="center"
				fontFamily="BlackHanSans"
				fontWeight="900"
				fontSize="21"
				marginBottom="15%"
			>
				<Text>mongle.</Text>
			</Container>

			<Container
				paddingLeft="15%"
			>
        <Text
          fontWeight="600"
        >
          초대 코드를 입력하세요
        </Text>
			</Container>
      
			<Container textAlign="center">
				<Button
					backgroundColor="black"
					color="white"
					size="lg"
					padding="10"
					width="350px"
					borderRadius="23px"
				>
					입장하기
				</Button>
			</Container>
		</Container>
	);
}
