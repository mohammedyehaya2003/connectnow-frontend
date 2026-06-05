import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker
from "emoji-picker-react";

 const socket = io(
   "https://connectnow-backend-bk7y.onrender.com"
 );


function Chat() {
 
    
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [newRoom, setNewRoom] = useState("");
    const [roomType, setRoomType] = useState("shared");
    const [message, setMessage] = useState("");
    const [ selectedMessage, setSelectedMessage] = useState(null);
    const [image, setImage] = useState(null);
    const [documentFile,setDocumentFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState("");
    const messagesEndRef = useRef(null);
    const [showEmoji,setShowEmoji] = useState(false);

    const emojis = [
  "😀",
  "😂",
  "❤️",
  "🔥",
  "🚀",
  "😎",
];


    const user = JSON.parse(
  localStorage.getItem("user")
);

console.log("LOCAL USER:", user);

    const sendMessage = async () => {


    console.log(
  "SEND BUTTON CLICKED"
);


      console.log(
  "DOCUMENT STATE:",
  documentFile
);

  if (!selectedRoom) return;

  let finalMessage = message;

  if (image) {

    const formData =
      new FormData();

    formData.append(
      "image",
      image
    );

    const res = await fetch(
      "https://connectnow-backend-bk7y.onrender.com/api/upload/image",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log(
  "CREATE ROOM CLICKED"
);



    const data =
      await res.json();
      

    console.log(
      "UPLOAD RESPONSE:",
      data
    );

    finalMessage =
      data.imageUrl;

  }



  if (documentFile) {

  const formData =
    new FormData();

  formData.append(
    "document",
    documentFile
  );

  const res = await fetch(
    "https://connectnow-backend-bk7y.onrender.com/api/upload/document",
    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await res.json();

  console.log(
    "DOCUMENT RESPONSE:",
    data
  );

  finalMessage =
    data.documentUrl;

}


  if (!finalMessage.trim())
    return;

  socket.emit(
    "sendMessage",
    {
      roomId:
        selectedRoom.id,

      userId:
        user.id,

      message:
        finalMessage,
    }
  );

  console.log(
    "Message sent:",
    finalMessage
  );

  setMessage("");

  setImage(null);

  setDocumentFile(null);

};

const createRoom = async () => {

  console.log(
    "USER ID:",
    user?.id
  );

  if (!newRoom.trim())
    return;

  try {

    const res = await fetch(
      "https://connectnow-backend-bk7y.onrender.com/api/rooms/create",
      {
        method:"POST",

        headers:{
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          room_name:
            newRoom,

          room_type:
            "shared",

          user_id:
            user?.id,

        }),

      }
    );

    console.log(
      "FETCH COMPLETED"
    );

    const data =
      await res.json();

    console.log(
      "ROOM CREATED:",
      data
    );

    if (res.ok) {

      setRooms([
        ...rooms,
        data.room
      ]);

      setNewRoom("");

    }

  } catch (error) {

    console.log(
      "CREATE ROOM ERROR:",
      error
    );

  }

};



    useEffect(() => {

  const fetchRooms = async () => {

    try {

      const res = await axios.get(
        "https://connectnow-backend-bk7y.onrender.com/api/rooms"
      );

      setRooms(res.data.rooms);

      console.log(res.data.rooms);

    } catch (error) {

      console.log(error);

    }

  };

  fetchRooms();

}, []);

    useEffect(() => {

  if (selectedRoom) {

    socket.emit("joinRoom", selectedRoom.id);

    console.log("Joined room:", selectedRoom.id);

    const fetchMessages = async () => {

      try {

        const res = await axios.get(
          `https://connectnow-backend-bk7y.onrender.com/api/messages/${selectedRoom.id}`
        );

        setMessages(res.data.messages);
        console.log("Fetched Messages:", res.data.messages);

      } catch (error) {

        console.log(error);

      }

    };

    fetchMessages();

  }

}, [selectedRoom]);

useEffect(() => {

  socket.on("receiveMessage", (newMessage) => {

    console.log("Received:", newMessage);

    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
    ]);

  });

  socket.on(
  "messageDeleted",
  (messageId) => {

    setMessages(
      (prev) =>

        prev.filter(
          (msg) =>
            msg.id !==
            messageId
        )

    );

  }
);


  return () => {

    socket.off("receiveMessage");

  };

}, []);

useEffect(() => {

  socket.on("showTyping", (typingText) => {

    setTyping(typingText);

    setTimeout(() => {

      setTyping("");

    }, 2000);

  });

}, []);

useEffect(() => {

  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [messages]);

useEffect(() => {

  console.log("USER:", user);

  if (user) {

    socket.emit(
      "userOnline",
      user.id
    );

    localStorage.setItem(
  "user",
  JSON.stringify({
    ...user,
    is_online: true,
  })
);

    console.log(
      "ONLINE EVENT SENT",
      user.id
    );

  }

}, [user]);

useEffect(() => {

  socket.on(
    "showTyping",
    (msg) => {

      setTyping(msg);

    }
  );

}, []);

  return (

    <div
      style={{
  display: "flex",
  height: "100vh",
  fontFamily: "'Inter', sans-serif",
  background:
    "linear-gradient(to bottom right, #020617, #0f172a)",
  padding: "20px",
  boxSizing: "border-box",
}}

    >

  ```jsx
{/* Sidebar */}

<div
  style={{
    width:"300px",
    background:"rgba(15,23,42,0.8)",
    backdropFilter:"blur(12px)",
    color:"white",
    padding:"24px",
    boxSizing:"border-box",
    display:"flex",
    flexDirection:"column",
    height:"100vh",
    overflow:"hidden",
    borderRadius:"24px",
    border:"1px solid rgba(255,255,255,0.08)",
    boxShadow:"0 8px 32px rgba(0,0,0,0.35)",
  }}
>

  <div
    style={{
      marginBottom:"28px",
    }}
  >

    <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
      }}
    >

      <div>

        <div
          style={{
            fontSize:"26px",
            fontWeight:"800",
          }}
        >
          ConnectNow
        </div>

        <div
          style={{
            color:"#94a3b8",
            fontSize:"13px",
            marginTop:"6px",
          }}
        >
          Premium Workspace
        </div>

      </div>

      <div
        style={{
          background:
"linear-gradient(135deg,#06b6d4,#2563eb)",

          padding:"10px",

          borderRadius:"16px",
        }}
      >
        🚀
      </div>

    </div>

  </div>

  <div
    style={{
      color:"#cbd5e1",
      fontWeight:"700",
      fontSize:"14px",
      marginBottom:"18px",
      textTransform:"uppercase",
    }}
  >

    Your Rooms

  </div>

  <div
    style={{
      background:"rgba(255,255,255,0.05)",
      border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:"20px",
      padding:"16px",
      marginBottom:"18px",
    }}
  >

    <div
      style={{
        fontSize:"13px",
        color:"#94a3b8",
        marginBottom:"8px",
      }}
    >

      Logged in as

    </div>

    <div
      style={{
        color:"white",
        fontWeight:"700",
      }}
    >

      {user?.name}

    </div>

  </div>

  <div
    style={{
      display:"flex",
      gap:"10px",
      marginBottom:"20px",
    }}
  >

    <input
      type="text"
      placeholder="Create Room..."
      value={roomName}
      onChange={(e)=>
        setRoomName(
          e.target.value
        )
      }

      style={{
        flex:1,
        minWidth:0,
        padding:"14px",
        borderRadius:"16px",
        border:
"1px solid rgba(255,255,255,0.08)",

        background:
"rgba(255,255,255,0.05)",

        color:"white",

        outline:"none",
      }}
    />

   <input
  type="text"

  placeholder="Create Room"

  value={newRoom}

  onChange={(e) =>
    setNewRoom(
      e.target.value
    )
  }

  style={{
  flex:1,

  padding:"12px",

  background:"#1b233d",

  color:"white",

  border:"1px solid #2b3658",

  borderRadius:"14px",

  outline:"none",

  fontSize:"14px",

}}
/>



    <button
      onClick={createRoom}

      style={{
        width:"56px",
        border:"none",
        borderRadius:"16px",

        background:
"linear-gradient(135deg,#06b6d4,#2563eb)",

        color:"white",

        fontSize:"24px",

        cursor:"pointer",
      }}
    >

      +

    </button>

  </div>

  <div
     style={{
    flex:1,
    minHeight:0,
    height:"100%",
    overflowY:"auto",
    paddingRight:"6px",
    background:"transparent",
    scrollbarWidth:"thin",
    overflowX:"hidden",
    width:"100%",

  }}
  >

  {rooms.map((room)=>(

    <div
      key={room.id}

      onClick={()=>{
        setSelectedRoom(room);

        socket.emit(
          "joinRoom",
          room.id
        );
      }}

      style={{
        marginTop:"14px",

        background:
selectedRoom?.id===room.id
? "linear-gradient(135deg,#2563eb,#1d4ed8)"
: "rgba(255,255,255,0.05)",

        padding:"16px",

        borderRadius:"18px",

        cursor:"pointer",

        width:"100%",

        boxSizing:"border-box",
      }}
    >

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
        }}
      >

        <div>

          <div
            style={{
              fontWeight:"700",
            }}
          >

            {room.room_name}

          </div>

          <div
            style={{
              fontSize:"12px",
              color:"#94a3b8",
              marginTop:"4px",
            }}
          >

            Workspace Channel

          </div>

        </div>

        <div
          style={{
            color:"#22c55e",
          }}
        >

          ●

        </div>

      </div>

    </div>

  ))}

  </div>

</div>

{/* Chat Area */}

            <div
        style={{
  flex: 1,
  background: "rgba(15, 23, 42, 0.75)",
  backdropFilter: "blur(14px)",
  display: "flex",
  flexDirection: "column",
  borderRadius: "24px",
  marginLeft: "20px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  overflow: "hidden",
}}
      >

        {/* Header */}

        <div
          style={{
  padding: "20px 28px",
  background: "rgba(17, 24, 39, 0.75)",
  backdropFilter: "blur(10px)",
  color: "white",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}}
        >
          <div>
  <div
  style={{
    fontSize:"22px",

    fontWeight:"800",

    letterSpacing:"0.3px",

    color:"white",
  }}
>
    {selectedRoom
      ? selectedRoom.room_name
      : "Select a Room"}
  </div>

  <div
    style={{

  fontSize:"14px",

  color:"#94a3b8",

  marginTop:"8px",

  letterSpacing:"0.3px",

}}
  >
    Welcome {user?.name} 👋
  </div>

 <div
  style={{

    display:"flex",

    alignItems:"center",

    gap:"16px",

  }}
>

  <div
    style={{
      color:"#22c55e",

      fontSize:"12px",

      fontWeight:"600",

    }}
  >

    {user?.is_online
      ? "🟢 Online"
      : "⚫ Offline"}

  </div>

  <button

    onClick={() => {

      socket.emit(
        "userOffline",
        user.id
      );

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      window.location.reload();

    }}

    style={{

      background:
"linear-gradient(135deg,#dc2626,#ef4444)",

      color:"white",

      border:"none",

      padding:"10px 18px",

      borderRadius:"12px",

      cursor:"pointer",

      fontWeight:"600",

      boxShadow:
"0 4px 14px rgba(239,68,68,0.35)",

    }}
  >

    Logout

  </button>

</div>

</div>

</div>



       {/* Messages */}

        <div
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto",
          }}
        >

          {messages.length === 0 ? (

  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#94a3b8",
      fontSize: "18px",
      fontWeight: "500",
    }}
  >
    Start the conversation 🚀
  </div>

) : (


  

  messages.map((msg, index) => (


    <div
 
    onClick={(e) => {

  e.stopPropagation();

  setSelectedMessage(
    selectedMessage === msg.id
      ? null
      : msg.id
  );

}}


      key={msg.id}
      style={{
        display: "flex",
        justifyContent:
  msg.user_id === user.id
    ? "flex-end"
    : "flex-start",

    gap: "14px",
        marginBottom: "14px",
      }}
    >

      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background:
  msg.user_id === user.id
    ? "linear-gradient(135deg,#2563eb,#1d4ed8)"
    : "linear-gradient(135deg,#7c3aed,#4f46e5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          marginRight:
  msg.user_id === user.id
    ? "0px"
    : "15px",

marginLeft:
  msg.user_id === user.id
    ? "18px"
    : "0px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {msg.name?.charAt(0)}
      </div>

      <div
        style={{
          background:
  msg.user_id === user.id
    ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
    : "rgba(255,255,255,0.08)",
          color: "white",
          padding: "14px 18px",

          marginRight:
  msg.user_id === user.id
    ? "14px"
    : "0px",

          borderRadius: "18px",
          width: "fit-content",
          maxWidth: "320px",
          display:"flex",
          flexDirection:"column",
          minWidth:"140px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.15)",
          fontSize: "15px",
          lineHeight: "1.5",
        }}
      >

      <div
  style={{
    fontWeight: "700",
    marginBottom: "6px",
    fontSize: "13px",
    color: "yellow",
  }}
>
  {msg.name}
</div>



        {msg.message.endsWith(".pdf") ? (

  <a
    href={msg.message}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color:"#ffffff",
      textDecoration:"none",
      fontWeight:"600",
    }}
  >
    📄 Open Document
  </a>

) : msg.message.startsWith("http") ? (

  <img
    src={msg.message}
    alt="uploaded"
    style={{
      width: "220px",
      borderRadius: "12px",
      marginTop: "6px",
    }}
  />

) : (

  msg.message

)}





        <div
  style={{
    fontSize: "11px",
    marginTop: "6px",
    opacity: 0.7,
    textAlign: "right",
  }}
>
  {new Date(msg.created_at).toLocaleTimeString()}
</div>



      </div>

    <button
  onClick={() => {

    setSelectedMessage(
      selectedMessage === msg.id
        ? null
        : msg.id
    );

  }}

  style={{
    background:"transparent",
    border:"none",
    color:"white",
    cursor:"pointer",
    fontSize:"20px",
    marginLeft:"8px",
    alignSelf:"center",
  }}
>
  ⋮
</button>


{selectedMessage === msg.id && (

  <div
    style={{
      marginTop:"10px",

      background:"rgba(15,23,42,0.95)",

      borderRadius:"12px",

      padding:"8px",

      display:"flex",

      gap:"12px",
    }}
  >

    <button
  onClick={() => {

    navigator.clipboard.writeText(
      msg.message
    );

    setSelectedMessage(null);

  }}

  style={{
    background:"rgba(37,99,235,0.18)",
    color:"white",
    border:"none",
    padding:"10px 14px",
    borderRadius:"10px",
    cursor:"pointer",
    fontWeight:"600",
  }}
>
  📋 Copy
</button>

    <button
  onClick={() => {

    socket.emit(
      "deleteMessage",
      msg.id
    );

    setSelectedMessage(null);

  }}

  style={{
    background:"rgba(239,68,68,0.18)",
    color:"#f87171",
    border:"none",
    padding:"10px 14px",
    borderRadius:"10px",
    cursor:"pointer",
    fontWeight:"600",
  }}
>
  🗑️ Delete
</button>

  </div>

)}

    </div>

  ))

)}

{typing && (

  <div
    style={{
      color: "#94a3b8",
      fontSize: "14px",
      marginTop: "10px",
      fontStyle: "italic",
    }}
  >
    {typing}
  </div>

)}

<div ref={messagesEndRef} />

        </div>


        {/* Input Area */}

        <div
          style={{
  padding: "20px",
  background: "rgba(17, 24, 39, 0.75)",
  backdropFilter: "blur(10px)",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  display: "flex",
  gap: "14px",
  alignItems: "center",
}}
        >


        <button
  onClick={() =>
    setShowEmoji(
      !showEmoji
    )
  }
  style={{
    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.12)",

    borderRadius: "14px",

    padding:
      "10px 14px",

    cursor: "pointer",

    fontSize: "22px",

    color: "white",

    transition: "0.3s",

    marginRight: "10px",
  }}
>

😊

</button>

{showEmoji && (

  <EmojiPicker
  onEmojiClick={(emojiData) => {

    setMessage(
      message +
      emojiData.emoji
    );

    setShowEmoji(
      false
    );

  }}
/>

)}


   
          <input
  type="text"
  placeholder="Type message..."
  value={message}
  onChange={(e) => {

  setMessage(
    e.target.value
  );

  if (
    selectedRoom &&
    user
  ) {

    socket.emit(
      "typing",
      {
        roomId:
          selectedRoom.id,

        user:
          user.name,
      }
    );

  }

}}

  onKeyDown={(e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
}}
  style={{
  flex: 1,
  padding: "16px 18px",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.08)",
  backgroundColor: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none",
  fontSize: "15px",
  backdropFilter: "blur(10px)",
}}
/>

<label
  style={{
    cursor: "pointer",
    fontSize: "28px",
    marginLeft: "10px",
  }}
>

🖼️

<input
  type="file"
  style={{
    display: "none",
  }}
  onChange={(e) => {

    setImage(
      e.target.files[0]
    );

  }}
/>


</label>

<label>

📄

<input
  type="file"
  accept=".pdf,.doc,.docx,.txt,.zip"

  onChange={(e) => {

  setDocumentFile(
    e.target.files[0]
  );

  console.log(
    "DOC SELECTED:",
    e.target.files[0]
  );

}}

  style={{
    display: "none",
  }}
/>

</label>


          <button
  onClick={sendMessage}
  style={{
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: "16px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
  transition: "translateY(0px)",
}}
>
  Send
</button>

        </div>

      </div>

    </div>

  );

}

export default Chat;