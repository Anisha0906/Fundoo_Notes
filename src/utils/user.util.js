const nodemailer = require ('nodemailer')
const { google } = require ('googleapis')

const CLIENT_ID = '451673291919-51r189vcokn92ki9lbci2lid30u927f8.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN ='1//04TbLme2mEO5xCgYIARAAGAQSNwF-L9IrD6v4T4Jfl18HDqx-HJOO5q4k41Aq-scWsS0NdMhXGYfrKKl1jZv5IuUmcF5HuMoufQ4';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN})

 export async function sendEMail(email,token) {

    try{
       const accessToken = await oAuth2Client.getAccessToken()
       
       const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'anishadas880@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
       })

       const mailOptions = {
        from: 'AnishaDas <anishadas880@gmail.com>',
        to: email,
        subject: 'Hello from my gmail using API',
        text: 'Hello from my gmail email using API',
        html: '<h1>To reset your password<a href=" http://localhost:4000/api/v1/ResetPWD">click here </a></h1>',
       };
       const result = await transport.sendMail(mailOptions)
       return result

    }catch(error) {
        return error
    }
}

/*sendMail()
   .then((result) => console.log('Email sent',result))
   .catch((error) => console.log(error.message));*/