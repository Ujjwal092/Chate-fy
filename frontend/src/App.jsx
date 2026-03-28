import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser, connectSocket } = useAuthStore();

  //  1. auth hydration
  useEffect(() => {
    checkAuth();
  }, []);

  //  2. socket connect ONLY after authUser ready
  useEffect(() => {
    if (authUser) {
      connectSocket();
    }
  }, [authUser]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden animated-bg">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster position="bottom-right" reverseOrder />
    </div>
  );
}

export default App;
