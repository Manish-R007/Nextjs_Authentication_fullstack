import User from '@/models/userModels';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user token & expiry
    const updateData =
      emailType === 'VERIFY'
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateData);

    // Encode token for URL safety
    const encodedToken = encodeURIComponent(hashedToken);

    // Create verification/reset link
    const link =
      emailType === 'VERIFY'
        ? `${process.env.DOMAIN}/verifyemail?token=${encodedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${encodedToken}`;

    // Nodemailer transporter
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: 'manish@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your Email' : 'Reset your Password',
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste this link in your browser: <br> ${link}</p>`,
    };

    return await transport.sendMail(mailOptions);
  } catch (err: any) {
    console.error('Error sending mail:', err);
    throw new Error(err.message);
  }
};
