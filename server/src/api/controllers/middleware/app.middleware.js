exports.checkPriorReply = async (threadId, gmail) => {

    //function to check whether the mail is in user threads that is if it is previously replied by the user

    try {
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: `in:inbox thread:${threadId} from:me`,
        });
    
        const messages = res.data.messages;

        if (messages && messages.length > 0) {
            return true;
        }
        return false;

    } catch (err) {
        console.error('Error in checking prior replies--------->', err);
    }
}

exports.addLabel = async (threadId, gmail) => {
    
    // this function checks whether the label from the list of Labels have label Name as "Vacation Mailer Reponses" or not ,if not it adds the label also add responded mails to this label
    
    try {

        const res = await gmail.users.labels.list({
            userId: 'me' 
        });

        const labels = res.data.labels;
        let labelID;

        //checking if label id already exists
        for (const label of labels) {
            if (label.name === "Vacation Mailer Reponses") {
                labelID = label.id;
                break;
            }
        }

        //if label id do not exists in the label list then adding label id to list
        if (!labelID) {
            const newLabel = await gmail.users.labels.create({
                userId: 'me',
                requestBody: {
                    name: "Vacation Mailer Reponses",
                    labelListVisibility: 'labelShow',
                },
            });

            labelID = newLabel.data.id;
        }
    
        //adding label id to the gmail
        await gmail.users.threads.modify({
            userId: 'me',
            id: threadId,
            requestBody: {
                addLabelIds: [labelID],
            },
        });
    } catch (err) {
        console.error('Error in adding label--------->', err);
    }
}