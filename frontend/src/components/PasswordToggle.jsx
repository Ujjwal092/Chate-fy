import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function PasswordToggle({
  show,
  onToggle,
  onHoldStart,
  onHoldEnd,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onMouseLeave={onHoldEnd}
      aria-label={show ? "Hide password" : "Show password"}
      className="absolute right-3 top-1/2 -translate-y-1/2
                 text-slate-400 hover:text-cyan-400 transition"
    >
      {show ? (
        <EyeOffIcon className="w-5 h-5" />
      ) : (
        <EyeIcon className="w-5 h-5" />
      )}
    </button>
  );
}
