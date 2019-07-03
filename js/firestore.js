// offline data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed')
        } else if (err.code == 'unimplemented') {
            // lack of browser support
            console.log('persistence is not available')
        }
    });

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
            removeBet(bet.doc.id);
        }
    });
});

// add new bet
const form = document.querySelector('.add-bet');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const bet = {
        player: form.player.value,
        type: form.type.value,
        sum: form.sum.value
    };

    db.collection('bets').add(bet)
        .catch(err => {
            console.log(err)
        });

    form.player.value = '';
    form.type.value = '';
    form.sum.value = '';
});

// delete bet
const betContainer = document.querySelector('.bets');
betContainer.addEventListener('click', evt => {
    if (evt.target.tagName === 'I') {
        const id = evt.target.getAttribute('data-id');
        db.collection('bets').doc(id).delete();
    }
});
