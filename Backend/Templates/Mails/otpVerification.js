exports.otpVerification = (otp) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Your One-Time Password (OTP)</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #4CAF50;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .otp-box {
                display: inline-block;
                padding: 10px 20px;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 4px;
                background-color: #f4f4f4;
                border: 2px dashed #4CAF50;
                border-radius: 10px;
                margin: 20px 0;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight {
                font-weight: bold;
                color: #000000;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href=""><img class="logo"
                    src="https://res.cloudinary.com/djpjyg8my/image/upload/v1743849699/Admin/w6nt9oyql1tnukkojtcu.png" alt="KnowGeek Logo"></a>
            <div class="message">Your OTP for Verification</div>
            <div class="body">
                <p>Dear User,</p>
                <p>Use the following One-Time Password (OTP) to verify your account or complete your action.</p>
                <div class="otp-box">${otp}</div>
                <p>This OTP is valid for <span class="highlight">5 minutes</span>.</p>
                <p>If you did not request this OTP, please ignore this email or contact support immediately.</p>
            </div>
            <div class="support">
                Need help? Contact us at 
                <a href="mailto:info.knowgeek@gmail.com">info.knowgeek@gmail.com</a>. We're here for you!
            </div>
        </div>
    </body>
    
    </html>`;
};
