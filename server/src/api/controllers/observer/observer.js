const {authorize} = require('../middleware/auth')
const {google} = require('googleapis');
const {checkPriorReply , sendReply} = require('../middleware/app.middleware')
const {addLabel} = require('../middleware/label')


const mailbot = async (req,res)=>{
  const auth = await authorize();
  console.log("........................authorization completed!")
  const gmail = google.gmail({version: 'v1', auth});
  setInterval(async () => {

    try {

      // Getting the list of unread mails using this api call
      const res = await gmail.users.messages.list({
          userId: 'me',
          q: 'label:unread label:inbox newer_than:1d',
      });
  
      const emails = res.data.messages;
  
      if (emails && emails.length > 1) {

          // accessing the random unread mail from list of mails
          const email = emails[Math.floor(Math.random() * emails.length)];

          // threadid of the mail
          const threadId = email.threadId;
  
          // Get the senders email address from the incoming email
          const emailData = await gmail.users.messages.get({
              userId: 'me',
              id: email.id,
              format: 'full',
          });

          const sendersHeader = emailData.data.payload.headers.find((header) => header.name === 'From').value;

          // Parsing the Header and fetching the senders email address
          const sendersEmail = sendersHeader.match(/<([^>]+)>/)[1];


          // Check if the email thread has prior replies
          const isThreadReplied = await checkPriorReply(threadId, gmail);
      
          if (!isThreadReplied) {

              // Send the reply email
              await sendReply(sendersEmail, gmail);
      
              // Add label to the email thread
              await addLabel(threadId, gmail);
      
              // Mark the email as read
              await gmail.users.messages.modify({
                  userId: 'me',
                  id: email.id,
                  requestBody: {
                      removeLabelIds: ['UNREAD'],
                  },
              });

              // Output given to the console
              console.log('Auto-reply sent and labeled for thread ID: '+ threadId+" , To : "+sendersEmail);
          }
        }
    } catch (err) {
        console.error('Error checking emails:', err);
    }

//using math.random for random time interval between 45 seconds to 120 seconds
  }, (Math.floor(Math.random() * (120 - 45 + 1) + 45))*1000)

  res.send("Welcome to mailbot ! You have successfully logined to your account. Enjoy your vacations we will handle the rest.");


}

module.exports = mailbot;