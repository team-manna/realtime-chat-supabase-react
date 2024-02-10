import { Container, Button, Image, Text } from "@chakra-ui/react";

export const Start = ({nextPage}) => {

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
				marginTop="5%"
			>
				<Text>mongle.</Text>
			</Container>

			<Container
				paddingLeft="15%"
				height="70vh"
			>
				<Text
					color="#868686"
					fontWeight='300'
					marginBottom="2%"
				>
					나만의 대화메이트를 찾아볼까요?
				</Text>
				<Container
					fontWeight='500'
					fontSize='28'
					padding="0"
					marginBottom="20%"
				>
					<Text>몽글몽글 피어나는<br/>대화의 즐거움 💭</Text>
				</Container>
				<Container 
					textAlign="center"
				>
					<Image src="start.svg" />
				</Container>
			</Container>
			<Container>
				<Button
					backgroundColor="black"
					color="white"
					size="lg"
					width="100%"
					borderRadius="23px"
					onClick={nextPage}
				>
					초대코드 입력
				</Button>
			</Container>
		</Container>  
	);
}
