exports.successfulPaymentMessageToAdmin = (
  name,
  amount,
  orderId,
  paymentId,
  month,
  joinedAt
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <title>Payment Notification - Admin</title>
    <style>
      body {
        background-color: #f4f4f4;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 650px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
        padding: 30px;
      }

      .header {
        text-align: center;
        padding-bottom: 20px;
      }

      .logo {
        max-width: 180px;
      }

      .title {
        font-size: 22px;
        font-weight: 700;
        margin-top: 20px;
        color: #1a1a1a;
      }

      .content {
        margin-top: 30px;
        line-height: 1.6;
      }

      .highlight {
        font-weight: bold;
        color: #2a2a2a;
      }

      .label {
        color: #888;
        font-size: 15px;
      }

      .support {
        margin-top: 30px;
        font-size: 14px;
        color: #666;
        border-top: 1px solid #eaeaea;
        padding-top: 15px;
        text-align: center;
      }

      .footer-note {
        font-size: 12px;
        color: #aaa;
        margin-top: 20px;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
        <div class="title">New Payment Received</div>
      </div>

      <div class="content">
        <p><span class="highlight">${name}</span> has successfully completed a payment.</p>
        <p><span class="label">Amount Paid:</span> <span class="highlight">₹${amount}</span></p>
        <p><span class="label">Payment Month:</span> <span class="highlight">${month}</span></p>
        <p><span class="label">Joined At:</span> <span class="highlight">${joinedAt}</span></p>
        <p><span class="label">Order ID:</span> <span class="highlight">${orderId}</span></p>
        <p><span class="label">Payment ID:</span> <span class="highlight">${paymentId}</span></p>
      </div>

      <div class="support">
        For any queries, contact <a href="mailto:bmpsng@gmail.com">bmpsng@gmail.com</a>. This message is intended for administrative tracking purposes.
      </div>

      <div class="footer-note">
        &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </div>
  </body>
  </html>`;
};
