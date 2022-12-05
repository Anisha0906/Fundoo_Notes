const nodemailer = require ('nodemailer')
const { google } = require ('googleapis')

const CLIENT_ID = '451673291919-51r189vcokn92ki9lbci2lid30u927f8.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN ='1//04S0zqcU888mKCgYIARAAGAQSNwF-L9IrzGUWgc5dvCG7v5vrEOLwcV76frINNOUHHeEZuPo7VRYkbVtHanuNzp7cnA1r9A7Au9Q';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN})

 export async function sendEMail(emailID) {

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
        to: emailID,
        subject: 'Hello from my gmail using API',
        text: 'Hello from my gmail email using API',
        html: '<h1>To reset your password<a href=" http://localhost:5000/api/v1/ResetPWD"> click here </a></h1>',
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

   //send mail for all the new registered users

export async function sendEmailToNewUser(emailID,firstname,lastname){
    try{
         const accessToken=await oAuth2Client.getAccessToken();

        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'anishadas880@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });

        const mailOptions={
            from: 'AnishaDas <anishadas880@gmail.com>',
            to: emailID,
            subject:'New user Registration is Successful',
            text:`Hi, ${firstname} ${lastname} the Registration for fundoo notes is successful`,
            
            html:`<h2>To login to fundoo notes, please <a href="http://localhost:5000/api/v1/users/login">Click Here</a></h2>`
        };

        const result= await transport.sendMail(mailOptions)
        return result;

    }catch(error){
        return error;

    }
}