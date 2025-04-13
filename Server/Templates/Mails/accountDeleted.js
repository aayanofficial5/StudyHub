exports.accountDeleted = (email, firstName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Account Deletion Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
          }
          .content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #6c757d;
          }
          .button {
            display: inline-block;
            background-color: #dc3545;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .warning {
            color: #dc3545;
            font-weight: bold;
          }
          .logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
          .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
          }
          .success {
            color: #28a745;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <a href=""><img class="logo"
              src="https://res.cloudinary.com/djpjyg8my/image/upload/v1743849699/Admin/w6nt9oyql1tnukkojtcu.png" alt="KnowGeek Logo"></a>
          <h1>Account Deletion Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${firstName},</p>
          
          <p>We are writing to confirm that your account with email <strong>${email}</strong> has been successfully deleted.</p>
          
          <p class="success">Your account has been permanently removed from our system.</p>
          
          <p>If you did not request this deletion or believe this was done in error, please contact our support team immediately:</p>
          
          <p>
            <a href="mailto:info.knowgeek@gmail.com" class="button">Contact Support</a>
          </p>
          
          <p>Our team is available 24/7 to assist you with this matter.</p>
          
          <p>If you have any questions or concerns, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>The KnowGeek Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message, please do not reply to this email.</p>
          <p>If you have any questions or need further assistance, please feel free to reach out to us at
            <a href="mailto:info.knowgeek@gmail.com">info.knowgeek@gmail.com</a>. We are here to help!</p>
          <p>&copy; ${new Date().getFullYear()} KnowGeek. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
};
