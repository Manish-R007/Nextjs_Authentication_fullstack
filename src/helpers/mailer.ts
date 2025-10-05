import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'


export const sendMail = async ({email,emailType , userId} : any) => {
   try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if(emailType === 'VERIFY'){
      await User.findByIdAndUpdate(userId,
      {
         verifyToken : hashedToken,
         verifyTokenExpiry : Date.now() + 3600000
      }
    )
    }else if(emailType === 'RESET'){
      await User.findByIdAndUpdate(userId,
      {
         forgotPasswordToken : hashedToken,
         forgotPasswordExpiry : Date.now() + 3600000
      }
    )
    }
      var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS
      }
      });

      const mailOptions = {
         from : "manish@gmail.com",
         to : email,
         subject : emailType === 'VERIFY'?"Verify your Email":"Reset your password",
         html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
      }

      const mailResponse = await transport.sendMail(mailOptions)
      return mailResponse

   } 
      
   catch (err : any) {
      throw new Error(err.message)
      }
}