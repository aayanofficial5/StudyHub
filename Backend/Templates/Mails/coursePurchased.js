exports.coursePurchased = (email, name, courseName) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Purchase Successful</title>
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
            <div class="message">Course Purchase Successful!</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Thank you for purchasing <span class="highlight">"${courseName}"</span> using the email <span class="highlight">${email}</span>.</p>
                <p>You now have full access to all the course content. Let the learning begin!</p>
                <p>If you have any issues accessing your course, feel free to reach out to us anytime.</p>
            </div>
            <div class="support">
                Need help? Contact us at 
                <a href="mailto:info.knowgeek@gmail.com">info.knowgeek@gmail.com</a>. We're here for you!
            </div>
        </div>
    </body>
    
    </html>`;
};
