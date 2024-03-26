import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default function sendGmail(req: NextApiRequest, res: NextApiResponse) {
  const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAILUSER,
      pass: process.env.GMAILPASSWORD,
    },
  })

  const toHostMialData = {
    from: req.body.email,
    to: process.env.GMAILUSER,
    subject: `[お問合せ]${req.body.name}様より`,
    text: `${req.body.message} Send from ${req.body.email}`,
    html: `
      <p>[お名前]</p>
      <p>${req.body.name}</p>
      <p>[メッセージ内容]</p>
      <p>${req.body.message}</p>
      <p>[メールアドレス]</p>
      <p>${req.body.email}</p>
    `,
  };

  transpoter.sendMail(toHostMialData, function(err, info) {
    if(err) console.log(err);
    else console.log(info);
  });
}
