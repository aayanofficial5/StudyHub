exports.resetPasswordLink = (firstName,resetLink) => {
  return `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
  </head>
  <body style="background-color: #f4f4f4; padding: 20px;">
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table width="600" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h2 style="color: #333;">Reset Your Password</h2>
              </td>
            </tr>
            <tr>
              <td style="color: #555; font-size: 16px;">
                <p>Hi ${firstName},</p>
                <p>We received a request to reset your password. Click the button below to create a new one:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a
                    href="${resetLink}"
                    target="_blank"
                    style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;"
                  >
                    Reset Password
                  </a>
                </div>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                <p style="margin-top: 30px;">Thanks,<br />The Learning Platform Team</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 12px; color: #aaa; padding-top: 20px;">
                © 2025 Learning Platform. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};
