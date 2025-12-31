export function createWelcomeEmailTemplate(name, clientURL) {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Chate-fy</title>
</head>

<body style="margin:0; padding:0; background:#0b0f1a; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:45px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CARD -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="
            background:#0f1629;
            border-radius:20px;
            overflow:hidden;
            box-shadow:0 30px 80px rgba(0,0,0,0.6);
            border:1px solid rgba(255,255,255,0.05);
          ">

          <!-- HEADER -->
          <tr>
            <td
              style="
                background:radial-gradient(circle at top, #1f2a48, #0b1020);
                padding:50px 30px;
                text-align:center;
              "
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png"
                alt="Chate-fy Logo"
                style="
                  width:78px;
                  height:78px;
                  border-radius:18px;
                  background:linear-gradient(135deg,#00f2fe,#4facfe);
                  padding:14px;
                  box-shadow:0 20px 40px rgba(0,255,255,0.35);
                  margin-bottom:24px;
                "
              />

              <h1 style="margin:0; font-size:30px; font-weight:700; color:#ffffff;">
                Welcome to Chate-fy 🚀
              </h1>

              <p style="margin-top:10px; font-size:15px; color:#9fb3ff; letter-spacing:0.6px;">
                Fast • Secure • Real-time messaging
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:44px 40px; color:#e6e9f0;">

              <p style="font-size:19px; margin:0 0 18px 0;">
                Hi <strong style="color:#4facfe;">${name}</strong> 👋
              </p>

              <p style="font-size:15.5px; line-height:1.8; margin:0 0 30px 0; color:#b8c0ff;">
                You’re officially in!  
                <strong style="color:#ffffff;">Chate-fy</strong> lets you chat faster, safer,
                and smarter — built for modern conversations.
              </p>

              <!-- FEATURE CARD -->
              <div
                style="
                  background:linear-gradient(180deg,#141c33,#0f1629);
                  border-radius:16px;
                  padding:28px;
                  margin-bottom:36px;
                  border:1px solid rgba(79,172,254,0.2);
                  box-shadow:inset 0 0 0 1px rgba(255,255,255,0.02);
                "
              >
                <p style="margin:0 0 16px 0; font-size:16px; font-weight:700; color:#4facfe;">
                  ⚡ Get started in minutes
                </p>

                <ul style="margin:0; padding-left:20px; font-size:14.5px; line-height:1.9; color:#d0d6ff;">
                  <li>Create your profile & avatar</li>
                  <li>Find friends & sync contacts</li>
                  <li>Start ultra-fast real-time chats</li>
                  <li>Share media with zero friction</li>
                </ul>
              </div>

              <!-- CTA -->
              <div style="text-align:center; margin-bottom:38px;">
                <a
                  href="${clientURL}"
                  style="
                    background:linear-gradient(135deg,#00f2fe,#4facfe);
                    color:#061018;
                    text-decoration:none;
                    padding:16px 46px;
                    border-radius:999px;
                    font-size:16px;
                    font-weight:800;
                    display:inline-block;
                    box-shadow:0 18px 45px rgba(79,172,254,0.6);
                  "
                >
                  Open Chate-fy →
                </a>
              </div>

              <p style="font-size:14.5px; line-height:1.7; margin:0; color:#9aa3d6;">
                Need help or support?  
                We’re just one message away.
              </p>

              <p style="margin-top:24px; font-size:14.5px; color:#e6e9f0;">
                See you inside 💬<br/>
                <strong style="color:#ffffff;">Team Chate-fy</strong>
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td
              style="
                background:#0b1020;
                padding:28px;
                text-align:center;
                font-size:12.5px;
                color:#7f89c4;
                border-top:1px solid rgba(255,255,255,0.05);
              "
            >
              <p style="margin:0;">
                © 2025 Chate-fy. All rights reserved.
              </p>

              <p style="margin-top:10px;">
                <a href="#" style="color:#4facfe; text-decoration:none; margin:0 12px;">Privacy</a> |
                <a href="#" style="color:#4facfe; text-decoration:none; margin:0 12px;">Terms</a> |
                <a href="#" style="color:#4facfe; text-decoration:none; margin:0 12px;">Contact</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

  `;
}
