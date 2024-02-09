import { Button, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider, useAppContext } from "../context/appContext";


export const Rules = () => {

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
				marginBottom="20%"
			>
				<Text>mongle.</Text>
			</Container>

			<Container
				paddingLeft="15%"
			>
				<Text
          color="#868686"
          fontSize="16"
					fontWeight='300'
				>
					매너있는 대화를 위한,
				</Text>
				<Container
					fontSize='25'
					fontWeight='500'
          marginBottom="30%"
				>
					<Text
            margin="0"
          >
            몽글 이용 가이드 💭
          </Text>
				</Container>
        <Container
          marginBottom="70%"
        >
          <Text>1. <strong>대화 시간</strong>을 잘 지켜주세요.</Text>
          <Text>2. 불쾌감을 줄 수 있는 말들은 <strong>조심</strong>!</Text>
          <Text>3. 연락처와 실명 등 <strong>개인정보</strong>는 묻지 않아요.</Text>
          <Text>4. 서로를 존중하는 <u>대화 매너</u>를 지켜주세요.</Text>
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
					입장하기
				</Button>
			</Container>
		</Container>
        
	);
}
