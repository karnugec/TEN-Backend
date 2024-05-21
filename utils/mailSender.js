const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (email, title, body) =>{
    try {
        let transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `${email}`,
            to:`bhagyashreepatil7498@gmail.com`,
            subject:`${title}`,
            html:`<div class="body">
                    <p>Hello,</p>
                    <p>I am ${body.firstName},</p>
                    <p>Here are my details:</p>
                    <p>Name: ${body.firstName} ${body.lastName}</p>
                    <p>Email: ${body.email}</p>
                    <p>Phone Number: ${body.mobile}</p>
                    <p>Message: ${body.message}</p>
                </div>`,
        });
        // console.log(info);
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = mailSender;