import { Container, Box, Button, Image, Text } from '@chakra-ui/react';
import { useAppContext } from '../context/appContext';
// import { Badge, Box, Container } from '@chakra-ui/react';

const Profile = ({ setModal }) => {
  const goToBack = () => {
    setModal(false);
  };
  const { otherInfo } = useAppContext();
  const isMan = otherInfo?.gender === 'male';
  const ImageComponent = ({ svg, op, text }) => {
    return (
      <Box alignItems="center">
        <Image src={svg} opacity={op && '40%'} />
        <Text
          opacity={op && '40%'}
          fontSize={13}
          fontWeight={500}
          lineHeight={9}>
          {text}
        </Text>
      </Box>
    );
  };

  const InfoItemComponent = ({ title, text }) => {
    return (
      <Box>
        <Text fontSize={16} fontWeight={300} color={'#868686'}>
          {title}
        </Text>
        <Text fontSize={21} fontWeight={500}>
          {text}
        </Text>
      </Box>
    );
  };
  return (
    <Container
      style={{
        zIndex: 100,
        backgroundColor: '#F7F6F5',
        height: '100%',
        position: 'absolute',
        maxWidth: '410px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F7F6F5',
        overflow: 'hidden',
        touchAction: 'none',
        padding: 20,
      }}>
      <Box
        style={{
          justifyContent: 'space-between',
          maxWidth: '100%',
          display: 'flex',
          fontSize: 25,
          fontWeight: 200,
        }}>
        Profile
        <Button
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            padding: 10,
            borderColor: '#D5D5D5',
            borderWidth: 1,
          }}
          onClick={goToBack}>
          <Image src="backbutton.svg" />
        </Button>
      </Box>
      <Box
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '63%',
            height: '60%',
          }}>
          <Text fontSize={26} fontWeight={700}>
            {otherInfo?.mbti}
            {otherInfo?.username}
            💭
          </Text>
          <Box
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              textAlign: 'center',
              display: 'flex',
            }}>
            {isMan ? (
              <>
                <ImageComponent svg={'noFemale.svg'} op text={'여성'} />
                <ImageComponent svg={'male.svg'} text={'남성'} />
              </>
            ) : (
              <>
                <ImageComponent svg={'female.svg'} text={'여성'} />
                <ImageComponent svg={'noMale.svg'} op text={'남성'} />
              </>
            )}
          </Box>
          <InfoItemComponent
            title={`${isMan ? '그' : '그녀'}의 대화스타일은`}
            text={otherInfo?.talk_style}
          />
          <InfoItemComponent
            title={`${isMan ? '그' : '그녀'}의 관심사는`}
            text={otherInfo?.interest}
          />
          <InfoItemComponent
            title={`${isMan ? '그' : '그녀'}의 직종은`}
            text={otherInfo?.job}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
