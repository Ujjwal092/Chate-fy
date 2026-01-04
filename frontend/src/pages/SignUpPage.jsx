import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import PasswordToggle from "../components/PasswordToggle";
import PasswordStrength from "../components/PasswordStrength";
import { UserIcon, MailIcon, LockIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* LEFT */}
            <div className="md:w-1/2 p-6 md:p-10 flex items-center justify-center md:border-r border-base-300/40">
              <div className="w-full max-w-md">
                {/* HEADER */}
                <div className="text-center mb-6">
                  <img
                    src="/logo.png"
                    alt="Chate-fy"
                    className="h-24 mx-auto mb-3 cursor-pointer hover:scale-105 transition"
                    onClick={() => (window.location.href = "/")}
                    loading="lazy"
                  />
                  <h2 className="text-2xl font-bold text-base-content mb-1">
                    Create Account
                  </h2>
                  <p className="text-base-content/60 text-sm">
                    Sign up for a new account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        required
                        className="input"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        autoComplete="email"
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
                        autoComplete="new-password"
                        required
                        className="input pr-12"
                        placeholder="Create a strong password"
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
                    <PasswordStrength password={formData.password} />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={isSigningUp}
                    className={`animated-button mx-auto mt-2 ${
                      isSigningUp ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="circle" />
                    <span className="text">
                      {isSigningUp ? "Creating..." : "Create Account"}
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
                  <Link to="/login" className="auth-link">
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-base-200/40 to-transparent">
              <div className="text-center">
                <img
                  src="/signup.png"
                  alt="Signup illustration"
                  loading="lazy"
                  className="max-w-md mx-auto drop-shadow-xl"
                />
                <h3 className="mt-6 text-xl font-medium text-cyan-400">
                  Start your journey today
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;
