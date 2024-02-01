import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [invitationCode, setInvitationCode] = useState("");
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [routeHash, setRouteHash] = useState("");
  const [isOnBottom, setIsOnBottom] = useState(false);
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
    useState(null);
  const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    // Effect to scroll to bottom on initial message load
    if (isInitialLoad) {
      setIsInitialLoad(false);
      scrollToBottom();
    }
  }, [messages]);

  const getLocation = async () => {
    try {
      const res = await fetch("https://api.db-ip.com/v2/free/self");
      const { room_id, error } = await res.json();
      if (error) throw new Error(error);

      setRoomId(room_id);
      localStorage.setItem("room_id", room_id);
    } catch (error) {
      console.error(
        `error getting location from api.db-ip.com:`,
        error.message
      );
    }
  };

  const randomUsername = () => {
    return `@user${Date.now().toString().slice(-4)}`;
  };
  const initializeUser = (session) => {
    setSession(session);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      initializeUser(session);
    });

    getMessagesAndSubscribe();

    const storedRoomId = localStorage.getItem("room_id");
    if (storedRoomId && storedRoomId !== "undefined")
      setRoomId(storedRoomId);
    else getLocation();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", { _event, session });
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

  useEffect(() => {
    if (!newIncomingMessageTrigger) return;

    if (newIncomingMessageTrigger.invitationCode === invitationCode) {
      scrollToBottom();
    } else {
      setUnviewedMessageCount((prevCount) => prevCount + 1);
    }
  }, [newIncomingMessageTrigger]);

  const handleNewMessage = (payload) => {
    setMessages((prevMessages) => [payload.new, ...prevMessages]);
    //* needed to trigger react state because I need access to the invitationCode state
    setNewIncomingMessageTrigger(payload.new);
  };

  const getInitialMessages = async () => {
    if (messages.length) return;

    const { data, error } = await supabase
      .from("messages")
      .select()
      .range(0, 49)
      .order("id", { ascending: false });
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

  const getMessagesAndSubscribe = async () => {
    setError("");

    await getInitialMessages();

    if (!myChannel) {
      // mySubscription = supabase
      // .from("messages")
      // .on("*", (payload) => {
      //   handleNewMessage(payload);
      // })
      // .subscribe();

      myChannel = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          (payload) => {
            handleNewMessage(payload);
          }
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
        .from("messages")
        .select('invitation_codes( invitation_code, room_id, username )')
        .range(messages.length, messages.length + 49)
        .order("id", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }
      target.scrollTop = 1;
      setMessages((prevMessages) => [...prevMessages, ...data]);
    }
  };

  // const { data, error } = await supabase
  //   .from('invitation_codes')
  //   .select('invitation_code, rooms(room_id, room_name)')
  //   .join('rooms', {
  //     from: 'invitation_codes.invitation_code',
  //     to: 'rooms.room_id'
  //   });

  // if (error) {
  //   console.error('Error fetching invitation codes and rooms:', error.message);
  //   return;
  // }

  // const invitationCodesAndRooms = data.map((row) => ({
  //   invitationCode: row.invitation_code,
  //   room: {
  //     roomId: row.rooms.room_id,
  //     roomName: row.rooms.room_name
  //   }
  // }));
  // console.log('Invitation codes and rooms:', invitationCodesAndRooms);

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
        roomId,
        setRoomId,
        randomUsername,
        routeHash,
        scrollRef,
        onScroll,
        scrollToBottom,
        isOnBottom,
        unviewedMessageCount,
        session,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
