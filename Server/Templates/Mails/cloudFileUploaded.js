const cloudFileUploaded = ({ fileName, fileUrl, uploadedBy }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="color: #4CAF50;">✅ File Uploaded Successfully</h2>
      <p>Hello <strong>${uploadedBy}</strong>,</p>
      <p>Your file has been successfully uploaded to Cloudinary.</p>
      
      <table style="width: 100%; margin-top: 20px;">
        <tr>
          <td style="font-weight: bold;">📁 File Name:</td>
          <td>${fileName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">🔗 File URL:</td>
          <td><a href="${fileUrl}" target="_blank" style="color: #2196F3;">View File</a></td>
        </tr>
      </table>

      <p style="margin-top: 30px;">Thanks,<br/>The Cloud Team</p>
    </div>
  `;
};

module.exports = cloudFileUploaded;
