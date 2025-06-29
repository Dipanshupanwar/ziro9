const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  if (!email) throw new Error("Email is required to send OTP");

  console.log("Inside sendOtp, email:", email, "otp:", otp); // ✅ DEBUG

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email, // ✅ This must NOT be empty
    subject: 'Ziro9 Email Verification OTP',
    html: `<h3>Your OTP is: ${otp}</h3>`,
  });
};

module.exports = sendOtp;
