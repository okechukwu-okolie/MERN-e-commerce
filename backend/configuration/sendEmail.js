import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()


if(!process.env.RESEND_API_KEY){
    throw new error('please check the RESEND_API_KEY and try again')
}

const resend = new Resend(process.env.RESEND_API_KEY);


const sendEmail = async({ sendTo, subject, html})=>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
          });

          if (error) {
            return console.error({ error });
          }
        
          
          return data;
    } catch (error) {
        console.log('the email is not working:', error);
        
    }
}
 
export default sendEmail

 