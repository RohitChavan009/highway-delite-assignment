export const readStream = async (stream: any) => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
};

export const generatePin = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const returnTemplate = (pin: string) => {
  return `
  <!DOCTYPE html>
  
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification Code</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
      }
      h2 {
        font-size: 24px;
        color: #333;
        margin: 0 0 20px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
        margin: 10px 0;
      }
      .code {
        font-size: 28px;
        font-weight: bold;
        color: #007bff;
        margin: 20px 0;
      }
      .footer {
        font-size: 14px;
        color: #777;
        margin-top: 20px;
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <h2>Email Verification Code</h2>
      <p>Thank you for registering with us. To finalize your registration, please use the verification code below:</p>
      <div class="code">${pin}</div>
      <p>This code is valid for 10 minutes. If you did not request this code, please disregard this email.</p>
      <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
      <div class="footer">
        Best regards,<br />
        <a href="mailto:rohitchavan110116114@gmail.com">Rohit Chavan</a>
      </div>
    </div>
  </body>

  </html>
`;
};
