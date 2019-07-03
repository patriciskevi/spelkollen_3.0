// realtime listener
db.collection('bets').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(bet => {
        // console.log(bet, bet.doc.data());
        if (bet.type === 'added') {
            // add the document data to the UI
            renderBet(bet.doc.data(), bet.doc.id);
        }
        if (bet.type === 'removed') {
            // remove the document data from the UI
        }
    });
});
