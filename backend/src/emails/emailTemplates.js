export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Chate-fy</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f2f4f7; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CONTAINER -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- HEADER -->
            <tr>
              <td style="background:linear-gradient(135deg,#36D1DC,#5B86E5); padding:35px; text-align:center;">
                <img 
                  src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480"
                  alt="Messenger Logo"
                  style="width:72px; height:72px; border-radius:50%; background:#ffffff; padding:10px; margin-bottom:18px;"
                />
                <h1 style="margin:0; font-size:28px; font-weight:600; color:#ffffff;">
                  Welcome to Chate-fy! Community
                </h1>
                <p style="margin-top:8px; font-size:15px; color:#eaf4ff;">
                  Fast • Secure • Real-time messaging
                </p>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:40px 35px; color:#333333;">

                <p style="font-size:18px; margin:0 0 15px 0;">
                  Hi <strong style="color:#5B86E5;">${name}</strong> 👋
                </p>

                <p style="font-size:15px; line-height:1.7; margin:0 0 25px 0;">
                  We’re thrilled to have you onboard! Messenger helps you stay connected with the people that matter — anytime, anywhere.
                </p>

                <!-- STEPS BOX -->
                <div style="background:#f8fafc; border-radius:12px; padding:25px; margin-bottom:30px; border-left:5px solid #36D1DC;">
                  <p style="margin:0 0 12px 0; font-size:16px; font-weight:600;">
                    🚀 Get started in minutes
                  </p>
                  <ul style="margin:0; padding-left:20px; font-size:14px; line-height:1.8;">
                    <li>Set up your profile picture</li>
                    <li>Add friends & contacts</li>
                    <li>Start real-time conversations</li>
                    <li>Share photos, videos & more</li>
                  </ul>
                </div>

                <!-- CTA -->
                <div style="text-align:center; margin-bottom:30px;">
                  <a 
                    href="${clientURL}"
                    style="background:linear-gradient(135deg,#36D1DC,#5B86E5); color:#ffffff; text-decoration:none; padding:14px 38px; border-radius:50px; font-size:15px; font-weight:600; display:inline-block;"
                  >
                    Open Chate-fy →
                  </a>
                </div>

                <p style="font-size:14px; line-height:1.7; margin:0;">
                  If you ever need help, our support team is always ready for you.
                </p>

                <p style="margin-top:18px; font-size:14px;">
                  Happy chatting! 💬<br/>
                  <strong>The Chate-fy Team</strong>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f2f4f7; padding:22px; text-align:center; font-size:12px; color:#888888;">
                <p style="margin:0;">© 2025 Team Chate-fy. All rights reserved.</p>
                <p style="margin-top:8px;">
                  <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Privacy</a> |
                  <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Terms</a> |
                  <a href="#" style="color:#5B86E5; text-decoration:none; margin:0 8px;">Contact</a>
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
