import { Container, Button, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";
import StartSvg from "../../public/start.svg";


export const Start = () => {

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
				<p>mongle</p>
			</Container>

			<Container
				paddingLeft="15%"
			>
				<Text
					color="#868686"
					fontWeight='300'
				>
					나만의 대화메이트를 찾아볼까요?
				</Text>
				<Container
					fontWeight='500'
					fontSize='28'
				>
					<Text>몽글몽글 피어나는<br/>대화의 즐거움 💭</Text>
				</Container>
				<Container 
					textAlign="center"
				>
					<Image src="start.svg" />
				</Container>
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
					초대 코드 입력
				</Button>
			</Container>
		</Container>
        
	);
}
