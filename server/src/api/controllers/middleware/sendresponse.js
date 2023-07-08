
exports.sendResponse = async (email, gmail) => {

    //this function sends mail response to the qualified mails.
    try{
        const message = `From: "me"\nTo: ${email}\nSubject: Re: ${"Vacation Mailer Reponse"}\n\nThankyou for approaching me, I am on a vacation and will reply to you soon.`;
    
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
            raw: Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
            },
        });
    
      return res.data;
    }catch(err){
        console.error("error in sending response --------->",err);
    }
    
}


