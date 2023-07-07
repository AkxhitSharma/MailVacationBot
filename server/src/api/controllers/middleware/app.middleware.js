
exports.sendReply = async (email, gmail) => {



    // General message that will be sent automatically
    const message = `From: "me"\nTo: ${email}\nSubject: Re: ${"Vacation Bot Reponse"}\n\nThankyou for approaching me, I am on a vacation and will reply to you soon.`;

    // API call to send the mail
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
        },
      });
    
      return res.data;
}



exports.checkPriorReply = async (threadId, gmail) => {

    try {

        // Getting the list of read mails using this api call
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `in:inbox thread:${threadId} from:me`,
        });
    
        const messages = res.data.messages;
    
        // Return whether such mail exist or not
        if (messages && messages.length > 0) {
            return true;
        }
        return false;

    } catch (err) {
        console.error('Error checking prior replies:', err);
        return false;
    }
}