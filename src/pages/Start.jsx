import { Container, Button, Image, Text } from '@chakra-ui/react';

export const Start = ({ nextPage, style }) => {
  return (
    <Container>
      <Container style={style.headerStyle}>
        <Text>mongle.</Text>
      </Container>

      <Container style={style.containerStyle}>
        <Text style={style.subTitleStyle}>나만의 대화메이트를 찾아볼까요?</Text>
        <Text style={style.titleStyle}>
          몽글몽글 피어나는
          <br />
          대화의 즐거움 💭
        </Text>
        <Container>
          <Image src="start.svg" />
        </Container>
      </Container>
      <Container>
        <Button style={style.buttonStyle} onClick={nextPage}>
          초대코드 입력
        </Button>
      </Container>
    </Container>
  );
};
