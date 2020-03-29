var nodemailer = require('nodemailer')
//Modulo para enviar Email
exports.sendEmail = (mail,cb)=>{
    // Se Define  el transporter
        const url_recover = "***url para cambiar contraseña***"
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL
            }
        });
    // Se Define el email
    var mailOptions = {
        from: process.env.USER_MAIL,
        to: mail.email,
        subject:"Reset Your Password",
        text: `Use this link to reset your password. The link is only valid for 24 hours.

        [Authentication Server] ( https://example.com )
        
        ************
        Hi ${mail.user},
        ************
        
        You recently requested to reset your password for your [Product Name] account. Use the button below to reset it. This password reset is only valid for the next 24 hours.
        
        Reset your password ( ${url_recover} )
        
        For security, this request was received from a {{operating_system}} device using {{browser_name}}. If you did not request a password reset, please ignore this email or contact support ( {{ support_url }} ) if you have questions.
        
        Thanks,
        The AuthServer Team
        
        If you’re having trouble with the button above, copy and paste the URL below into your web browser.
        
        ${url_recover}
        
        © 2020 AuthServer. All rights reserved.
        
        [AuthServer, LLC]
        
        1234 Street Rd.
        
        Suite 1234`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            throw error
        } else {
            console.log("Email sent");
            cb(error,info)
        }
    });
    }