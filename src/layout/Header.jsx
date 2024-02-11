import { Box, Button, Grid, GridItem, Image } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import supabase from '../supabaseClient';
import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import NameForm from './NameForm';
export default function Header({ modal, setModal }) {
  const { session, allData } = useAppContext();
  const openModal = () => {
    setModal(true);
    console.log(modal);
  };
  return (
    <Grid
      display="flex"
      flexDir="row"
      justifyContent="space-between"
      bg="#F7F6F5"
      position="sticky"
      top="0"
      zIndex="10"
      ml="5"
      mr="5"
      mt="5"
      mb="5">
      <GridItem
        justifySelf="start"
        m="2"
        flexDir="row"
        display="flex"
        alignItems="center">
        <Image src="/female.svg" height="50px" ml="2" />
        <Box display="flex" flexDir="column" ml="15">
          {allData?.username}
          <Button variant="link" size="xs" onClick={openModal}>
            프로필 보기 <Image src="leftArrow.svg" ml="2" />
          </Button>
        </Box>
      </GridItem>
      <GridItem justifySelf="end" alignSelf="center" mr="4">
        <Image src="guide.svg" />
      </GridItem>
    </Grid>
  );
}
