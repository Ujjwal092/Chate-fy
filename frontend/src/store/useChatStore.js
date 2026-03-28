import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  /* =========================
     STATE
     ========================= */
  allContacts: [],
  chats: [],
  messages: [],

  selectedUser: null,
  activeTab: "chats",

  isUsersLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: true,

  /* UI HELPERS */
  setSelectedUser: (user) => set({ selectedUser: user, messages: [] }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleSound: () =>
    set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),

  /* =========================
     USERS / CONTACTS
     ========================= */

  //  THIS WAS MISSING
  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      console.error("Failed to load contacts", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      console.error("Failed to load chats", error);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  /* =========================
     MESSAGES
     ========================= */

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.error("Failed to load messages", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser || !authUser) return;

    // optimistic message
    const tempMessage = {
      _id: Date.now(),
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: data.text,
      image: data.image,
      createdAt: new Date().toISOString(),
    };

    set({ messages: [...messages, tempMessage] });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data,
      );

      // replace temp with real
      set({
        messages: get().messages.filter((m) => m._id !== tempMessage._id),
      });
      set((state) => ({ messages: [...state.messages, res.data] }));
    } catch (error) {
      console.error("Message send failed", error);
      set({ messages }); // rollback
    }
  },

  /* =========================
     SOCKET
     ========================= */

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (msg) => {
      set({ messages: [...get().messages, msg] });

      if (get().isSoundEnabled) {
        const sound = new Audio("/sounds/notification.mp3");
        sound.play().catch(() => {});
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("newMessage");
  },
}));
