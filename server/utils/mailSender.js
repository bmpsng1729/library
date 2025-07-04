const { default: TableBody } = require('@mui/material/TableBody');
const nodemailer=require('nodemailer');

exports.mailSender=async(email,title,body)=>{
 try{
         let transporter =nodemailer.createTransport(
            {
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
                }
            }
         );

         let info =await transporter.sendMail({
            from:'Officers Library',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
         });
         console.log("sent Email info->",info);
         return info;
 }catch(err){
     console.log("error in mailsender utils",err);
 }

}