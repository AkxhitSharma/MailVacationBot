exports.addLabel = async (threadId, gmail) => {

    try {

        // Getting the list of all labels using this api call
        const res = await gmail.users.labels.list({
            userId: 'me' 
        });

        // Get lables from the list
        const labels = res.data.labels;
        let labelId;
    
        // check the label from the list of Labels have label Name as "Vacation Bot Reponses"
        for (const label of labels) {
            if (label.name === "Vacation Bot Reponses") {
                labelId = label.id;
                break;
            }
        }
    
        // If no such Labels then create a Label name "Vacation Bot Reponses"
        if (!labelId) {
            const newLabel = await gmail.users.labels.create({
                userId: 'me',
                requestBody: {
                    name: "Vacation Bot Reponses",
                    labelListVisibility: 'labelShow',
                },
            });

            labelId = newLabel.data.id;
        }
    
        // API call to modify the label of the replies mail to "Auto-Replied"
        await gmail.users.threads.modify({
            userId: 'me',
            id: threadId,
            requestBody: {
                addLabelIds: [labelId],
            },
        });
    } catch (err) {
        console.error('Error adding label:', err);
    }
}