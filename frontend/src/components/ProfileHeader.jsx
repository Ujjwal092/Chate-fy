import { useEffect, useRef, useState } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, onlineUsers = [] } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  // 🔥 IMPORTANT: default image should be authUser.profilePic
  const [selectedImg, setSelectedImg] = useState(authUser?.profilePic || null);

  const fileInputRef = useRef(null);

  /* ===========================
     🔁 SYNC IMAGE AFTER REFRESH
     =========================== */
  useEffect(() => {
    if (authUser?.profilePic) {
      setSelectedImg(authUser.profilePic);
    }
  }, [authUser?.profilePic]);

  /* ===========================
     🖼️ UPLOAD PROFILE IMAGE
     =========================== */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;

      // optimistic UI
      setSelectedImg(base64Image);

      // backend update
      await updateProfile({ profilePic: base64Image });
    };
  };

  /* ===========================
     🟢 ONLINE STATUS (SELF)
     =========================== */
  const isOnline =
    !!authUser?._id && Array.isArray(onlineUsers)
      ? onlineUsers.includes(authUser._id)
      : false;

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <button
              type="button"
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || "/avatar.png"}
                alt="User"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            <h3 className="text-slate-200 font-medium truncate">
              {authUser?.fullName || "User"}
            </h3>
            <p className="text-slate-400 text-xs">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4">
          <button onClick={logout}>
            <LogOutIcon className="size-5 text-slate-400 hover:text-slate-200" />
          </button>

          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5 text-slate-400" />
            ) : (
              <VolumeOffIcon className="size-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
