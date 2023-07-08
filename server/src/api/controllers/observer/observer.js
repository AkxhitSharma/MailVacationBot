const {checkPriorReply ,addLabel} = require('../middleware/app.middleware')
const {sendResponse} = require('../middleware/sendresponse')
const{ CLIENT_ID , CLIENT_SECRET , REDIRECT_URIS} = require('../../../config/var');
const {google} = require('googleapis');

const author =(refresh_token)=>{
  const OAuth2Client = new google.auth.OAuth2( CLIENT_ID , CLIENT_SECRET, REDIRECT_URIS);
    
    OAuth2Client.setCredentials({"refresh_token":refresh_token});
    return OAuth2Client;

}


const mailbot = async (req,res)=>{

  const refresh_token =req.refresh
  const auth = await author(refresh_token)
  const gmail = google.gmail({version: 'v1', auth});
  setInterval(async () => {

    try {

      //geting list of unread emails prior to one minute of starting the node app 
      const res = await gmail.users.messages.list({
          userId: 'me',
          q: 'label:unread label:inbox newer_than:1d',
      });
  
      const emails = res.data.messages;
  
      if (emails && emails.length > 0) {

          // accessing the random unread mail from list
          const email = emails[Math.floor(Math.random() * emails.length)];
          const threadId = email.threadId;
  
          // Geting the senders email address from the incoming email
          const emailData = await gmail.users.messages.get({
              userId: 'me',
              id: email.id,
              format: 'full',
          });

          const sendersHeader = emailData.data.payload.headers.find((header) => header.name === 'From').value;

          // Parsing the Header and fetching the senders email address
          const sendersEmail = sendersHeader.match(/<([^>]+)>/)[1];


          // Checking if the email had been replied before
          const isThreadReplied = await checkPriorReply(threadId, gmail);
      
          //if not sending response to email and adding label
          if (!isThreadReplied) {
              await sendResponse(sendersEmail, gmail);
              await addLabel(threadId, gmail);
      
              // Marking the email as read
              await gmail.users.messages.modify({
                  userId: 'me',
                  id: email.id,
                  requestBody: {
                      removeLabelIds: ['UNREAD'],
                  },
              });
              console.log('Auto-reply sent and labeled for thread ID: '+ threadId+" , To : "+sendersEmail);
          }
        }
    } catch (err) {
        console.error('Error in checking emails-------->', err);
    }

    //using math.random for random time interval between 45 seconds to 120 seconds
  }, (Math.floor(Math.random() * (120 - 45 + 1) + 45))*1000)

  res.send("Welcome to mailbot ! You have successfully logined to your account. Enjoy your vacations we will handle the rest.");
  

}

module.exports = mailbot;