import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter=nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  
};

const mail={
  from:"mail.taskmanager@example.com",
  to:options.email,
  subject:options.subject,
  text:emailTextual,
  html:emailHtml
}
try {
  await transporter.sendEmail(mail);
} catch (error) {
   console.error("Email service failed make sure you have provided MailTrap credentials in .env file")
   console.error("");
   
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we are excited to have you on board",
      action: {
        instructions: "To Verify your email please click on following button ",
        button: {
          color: "#22BC66", // Optional action button color
          text: "verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? just reply to this email, we'd love to help",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your passsword please click on following button ",
        button: {
          color: "#22BC66", // Optional action button color
          text: "verify your email",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? just reply to this email, we'd love to help",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
