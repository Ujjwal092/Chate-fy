import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import PasswordToggle from "../components/PasswordToggle";
import { MailIcon, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  //Bubble text rotation
  useEffect(() => {
    const bubbles = document.querySelectorAll(".chat-bubble");
    if (!bubbles.length) return;

    const messages = [
      "Hey 👋",
      "Private 🔒",
      "Real-time ⚡",
      "Chate-fy 💬",
      "Encrypted 🛡️",
      "No Lag 🚀",
    ];

    let index = 0;
    const interval = setInterval(() => {
      bubbles.forEach((bubble, i) => {
        bubble.textContent = messages[(index + i) % messages.length];
      });
      index++;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    login(formData); // Call login function from auth store
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="md:w-1/2 p-6 md:p-10 flex items-center justify-center md:border-r border-base-300/40">
              <div className="w-full max-w-md">
                {/* HEADER */}
                <div className="text-center mb-6">
                  <img
                    src="/logo.png"
                    alt="Chate-fy"
                    className="h-24 mx-auto mb-3 cursor-pointer hover:scale-105 transition"
                    onClick={() => (window.location.href = "/")}
                  />
                  <h2 className="text-2xl font-bold text-base-content mb-1">
                    Welcome Back
                  </h2>
                  <p className="text-base-content/60 text-sm">
                    Login to access your account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        required
                        className="input"
                        placeholder="johndoe@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="input pr-12"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        onKeyUp={(e) =>
                          setCapsLock(e.getModifierState("CapsLock"))
                        }
                      />
                      <PasswordToggle
                        show={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                        onHoldStart={() => setShowPassword(true)}
                        onHoldEnd={() => setShowPassword(false)}
                      />
                    </div>
                    {capsLock && (
                      <p className="text-xs text-yellow-400 mt-1">
                        ⚠️ Caps Lock is ON
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`animated-button mx-auto mt-2 ${
                      isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="circle" />
                    <span className="text">
                      {isLoggingIn ? "Logging in..." : "Sign In"}
                    </span>
                    <svg className="arr-1" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 5l6 7-6 7" />
                    </svg>
                    <svg className="arr-2" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 5l6 7-6 7" />
                    </svg>
                  </button>
                </form>

                {/* FOOTER */}
                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don&apos;t have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/*  RIGHT SIDE  */}
            <div className="hidden md:flex md:w-1/2">
              <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden chat-float-wrap"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

                  e.currentTarget.style.setProperty("--mx", `${x}px`);
                  e.currentTarget.style.setProperty("--my", `${y}px`);
                }}
              >
                <span className="chat-bubble b1"></span>
                <span className="chat-bubble b2"></span>
                <span className="chat-bubble b3"></span>
                <span className="chat-bubble b4"></span>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
