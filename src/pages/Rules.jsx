import { Button, Container, Text } from '@chakra-ui/react';

export const Rules = ({ nextPage, style }) => {
  return (
    <Container>
      <Container style={style.headerStyle}>
        <Text>mongle.</Text>
      </Container>

      <Container style={style.containerStyle}>
        <Text style={style.subTitleStyle}>매너있는 대화를 위한,</Text>
        <Text style={style.titleStyle}>몽글 이용 가이드 💭</Text>
        <Container paddingLeft="0">
          <Text marginBottom="2%">
            1. <strong>대화 시간</strong>을 잘 지켜주세요.
          </Text>
          <Text marginBottom="2%">
            2. 불쾌감을 줄 수 있는 말들은 <strong>조심</strong>!
          </Text>
          <Text marginBottom="2%">
            3. 연락처와 실명 등 <strong>개인정보</strong>는 묻지 않아요.
          </Text>
          <Text marginBottom="2%">
            4. 서로를 존중하는 <u>대화 매너</u>를 지켜주세요.
          </Text>
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
