import nodemailer from "nodemailer";

const passw = "bbvh hors bgbq pxjm";
const email = "noreply.springworthbooks@gmail.com";


const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",

  secure: true, // use SSL
  auth: {
    // user: "itesa.getViral@gmail.com",
    // pass: "rtspkviskcrhorey",

    user: email, // generated ethereal user
    pass: passw, // generated ethereal password
  }
});

async function sendEmail(email: string, subject: string, body: string) {
  try {
    console.log("USER EMAIL-->" , email)
    const message = {
      to: email,
      from: "company@gmail.com",
      subject: subject,
      html: body,
    };
    await transporter
      .sendMail(message)
      .then((res) => {})
      .catch((err) => {
        throw err;
      });
    return message;
  } catch (error) {
    throw error;
  }
}

export default sendEmail;
