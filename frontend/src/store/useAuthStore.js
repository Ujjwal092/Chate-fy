import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      /* ================= STATE ================= */
      authUser: null,
      isCheckingAuth: true,
      socket: null,
      onlineUsers: [],

      /* ================= AUTH ================= */

      checkAuth: async () => {
        try {
          set({ isCheckingAuth: true });

          const res = await axiosInstance.get("/auth/check");

          set({ authUser: res.data });

          //  connect socket after auth
          get().connectSocket();
        } catch (err) {
          console.log(err);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },
      signup: async (data) => {
        try {
          set({ isSigningUp: true });

          const res = await axiosInstance.post("/auth/signup", data);

          set({ authUser: res.data });

          // socket connect
          get().connectSocket();

          toast.success("Account created successfully");
        } catch (error) {
          console.error("Signup error:", error);

          toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        try {
          const res = await axiosInstance.post("/auth/login", data);

          set({ authUser: res.data });

          //  connect socket after login
          get().connectSocket();

          toast.success("Login successful");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Login failed");
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
        } catch (error) {
          console.log("Logout error:", error);
        }

        get().disconnectSocket();

        set({ authUser: null, onlineUsers: [] });

        toast.success("Logged out");
      },

      updateProfile: async (data) => {
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);

          set({ authUser: res.data });

          toast.success("Profile updated successfully");
        } catch (error) {
          console.error("Update profile error:", error);
          toast.error(
            error?.response?.data?.message || "Failed to update profile",
          );
        }
      },

      /* ================= SOCKET ================= */

      connectSocket: () => {
        const { authUser, socket } = get();

        if (!authUser || socket?.connected) return;

        const newSocket = io(
          import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
          {
            withCredentials: true,
            autoConnect: true,
          },
        );

        newSocket.on("onlineUsers", (users) => {
          set({ onlineUsers: users });
        });

        set({ socket: newSocket });
      },

      disconnectSocket: () => {
        const socket = get().socket;

        if (socket) {
          socket.off();
          socket.disconnect();
        }

        set({ socket: null });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        authUser: state.authUser, //  only persist user
      }),
    },
  ),
);
