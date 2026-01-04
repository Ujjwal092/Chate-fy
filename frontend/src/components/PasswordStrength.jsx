export default function PasswordStrength({ password }) {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++; //.test Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength(); //function call to evaluate password strength
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-yellow-500", "bg-cyan-400", "bg-green-500"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded ${
              strength > i ? colors[strength - 1] : "bg-slate-600"
            }`} //conditional to set color based on strength
          />
        ))}
      </div>
      <p className="text-xs text-slate-400">
        Strength:{" "}
        <span className="font-medium">
          {labels[strength - 1] || "Very Weak"}{" "}
          {/* Display label based on strength in slate color */}
        </span>
      </p>
    </div>
  );
}
