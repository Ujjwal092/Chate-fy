import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  /* ==============================
     📥 FETCH + SUBSCRIBE MESSAGES
     ============================== */
  useEffect(() => {
    if (!selectedUser?._id || !authUser?._id) return;

    // fetch chat history
    getMessagesByUserId(selectedUser._id);

    // subscribe to realtime messages
    subscribeToMessages();

    // cleanup on user change / unmount
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    authUser?._id,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  /* ==============================
     🔽 AUTO SCROLL TO LAST MESSAGE
     ============================== */
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ==============================
     ❌ NO CHAT SELECTED
     ============================== */
  if (!selectedUser) {
    return (
      <>
        <ChatHeader />
        <NoChatHistoryPlaceholder />
      </>
    );
  }

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              // 🔥 CRITICAL: compare with authUser (not selectedUser)
              const isSender =
                msg.senderId?.toString() === authUser?._id?.toString();

              return (
                <div
                  key={msg._id}
                  className={`chat ${isSender ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble relative ${
                      isSender
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover mb-2"
                      />
                    )}

                    {msg.text && <p>{msg.text}</p>}

                    {/* ⏰ timestamp */}
                    <p className="text-xs mt-1 opacity-75">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* 🔽 scroll anchor */}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName || "User"} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
