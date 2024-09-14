// 3rd Party
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rohitchavan7216@gmail.com",
    pass: "xydv mmfr srij ncxl",
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      to,
      subject,
      html,
    });

    if (info.response && info.rejected.length === 0) {
      console.log("mail has been sent successfully.");
    }
  } catch (error: any) {
    console.log("error while sending an email : ", error.message);
  }
};
