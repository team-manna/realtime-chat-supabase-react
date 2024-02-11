import { createContext, useContext, useEffect, useRef, useState } from 'react';
import supabase from '../supabaseClient';

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [invitationCode, setInvitationCode] = useState(
    sessionStorage.getItem('@CODE'),
  );
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [routeHash, setRouteHash] = useState('');
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
    useState(null);
  const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
  const [room, setRoom] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const [allData, setAllData] = useState({});
  useEffect(() => {
    // Effect to scroll to bottom on initial message load
    if (isInitialLoad) {
      setIsInitialLoad(false);
      scrollToBottom();
    }
  }, [messages]);

  const initializeUser = session => {
    setSession(session);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });

    const storedRoomId = localStorage.getItem('room');
    if (storedRoomId && storedRoomId !== 'undefined') setRoom(storedRoomId);

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('onAuthStateChange', { _event, session });
      initializeUser(session);
    });

    // const { hash, pathname } = window.location;
    // if (hash && pathname === "/") {
    //   console.log("hash", hash);
    //   setRouteHash(hash);
    // }

    return () => {
      // Remove supabase channel subscription by useEffect unmount
      if (myChannel) {
        supabase.removeChannel(myChannel);
      }

      authSubscription.unsubscribe();
    };
  }, []);

  // 방이 바뀔 떄마다 새로운 메시지를 가져오고 구독한다.
  useEffect(() => {
    setMessages([]);
    if (room) {
      getMessagesAndSubscribe(room);
    }
  }, [room]);

  useEffect(() => {
    if (!newIncomingMessageTrigger) return;

    if (newIncomingMessageTrigger.invitationCode === invitationCode) {
      scrollToBottom();
    } else {
      setUnviewedMessageCount(prevCount => prevCount + 1);
    }
  }, [newIncomingMessageTrigger]);

  const handleNewMessage = payload => {
    setMessages(prevMessages => [payload.new, ...prevMessages]);
    //* needed to trigger react state because I need access to the invitationCode state
    setNewIncomingMessageTrigger(payload.new);
  };

  const getInitialMessages = async room => {
    if (messages.length) return;

    const { data, error } = await supabase
      .from('messages')
      .select()
      .filter('room_id', 'eq', room)
      .range(0, 49)
      .order('id', { ascending: false });
    // console.log(`data`, data);

    setLoadingInitial(false);
    if (error) {
      setError(error.message);
      return;
    }

    setIsInitialLoad(true);
    setMessages(data);
    // scrollToBottom(); // not sure why this stopped working, meanwhile using useEffect that's listening to messages and isInitialLoad state.
  };

  const getMessagesAndSubscribe = async room => {
    setError('');

    await getInitialMessages(room);

    if (!myChannel) {
      // mySubscription = supabase
      // .from("messages")
      // .on("*", (payload) => {
      //   handleNewMessage(payload);
      // })
      // .subscribe();
      myChannel = supabase
        .channel('custom-all-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'messages',
            filter: `room_id=eq.${room}`,
          },
          payload => {
            handleNewMessage(payload);
          },
        )
        .subscribe();
    }
  };

  const scrollRef = useRef();
  const onScroll = async ({ target }) => {
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
      setUnviewedMessageCount(0);
      setIsOnBottom(true);
    } else {
      setIsOnBottom(false);
    }

    //* Load more messages when reaching top
    if (target.scrollTop === 0) {
      // console.log("messages.length :>> ", messages.length);
      const { data, error } = await supabase
        .from('messages')
        .select('invitation_codes( invitation_code, room_id)')
        .filter('room_id', 'eq', room)
        .range(messages.length, messages.length + 49)
        .order('id', { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }
      target.scrollTop = 1;
      // setMessages(prevMessages => [...prevMessages, ...data]);
    }
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        loadingInitial,
        error,
        getMessagesAndSubscribe,
        invitationCode,
        setInvitationCode,
        room,
        setRoom,
        routeHash,
        scrollRef,
        onScroll,
        scrollToBottom,
        isOnBottom,
        unviewedMessageCount,
        session,
        allData,
        setAllData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
