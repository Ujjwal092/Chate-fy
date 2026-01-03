import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: { name: "john", _id: "123", age: 30 },
  isLoggedIn: false,
  isLoading: false,

  login: () => {
    console.log("logged in");
    set({ isLoggedIn: true, isLoading: true }); // Update the isLoggedIn state to true and we can update this mutliple states
  },
}));
