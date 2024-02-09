import { Button, Container, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";


export const End = () => {

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
				<p>mongle.</p>
			</Container>

			<Container
				paddingLeft="15%"
			>
        <Container 
            textAlign="center"
        >
            <Image src="end.svg" />
        </Container>
				<p
					color="#868686"
					fontWeight='300'
				>
					대화가 종료되었어요. <br/> 즐거운 대화 시간 보내셨나요?
				</p>
				<Container
					fontWeight='700'
					fontSize='28'
				>
					<p>여러분의<br/>소중한 의견을<br/>들려주세요 💭</p>
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
					피드백 작성
				</Button>
			</Container>
		</Container>
        
	);
}
