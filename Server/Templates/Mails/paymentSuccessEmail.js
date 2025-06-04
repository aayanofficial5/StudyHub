exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4CAF50;">🎉 Payment Successful!</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thank you for your purchase. Your payment has been received successfully.</p>

      <h3 style="color: #4CAF50;">Payment Summary:</h3>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Amount Paid:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">₹${amount.toFixed(
            2
          )}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Order ID:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Payment ID:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${paymentId}</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">You can now access your course from your dashboard.</p>

      <p>If you have any questions or concerns, feel free to contact our support team.</p>

      <p style="margin-top: 30px;">Happy Learning!<br/>Team StudyHub</p>
    </div>
  `;
};
