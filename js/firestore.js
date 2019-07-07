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
    const activeBets = document.getElementById('bets');
    const archivedBets = document.getElementById('archive-bets');
    activeBets.innerHTML = "";
    archivedBets.innerHTML = "";

    snapshot.forEach(bet => {
        const html = renderBet(bet.data(), bet.id);

        if (bet.data().archive) {
            archivedBets.innerHTML += html;
        } else {
            activeBets.innerHTML += html;
        }
    });
});

// add new bet
const form = document.querySelector('.add-bet');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const bet = {
        player: form.player.value,
        date: new Date().getTime() / 1000,
        type: form.type.value,
        sum: form.sum.value,
        archive: false
    };

    db.collection('bets').add(bet)
        .catch(err => {
            console.log(err)
        });

    form.player.value = '';
    form.type.value = '';
    form.sum.value = '';
});

// delete active bet and archive bet
const betContainer = document.querySelector('.bets');
betContainer.addEventListener('click', evt => {
    // delete active bet
    // if (evt.target.textContent === 'delete_outline') {
    //     const id = evt.target.getAttribute('data-id');
    //     db.collection('bets').doc(id).delete();
    // }
    // archive bet
    // if (evt.target.textContent === 'move_to_inbox') {
    //     const id = evt.target.getAttribute('data-id');
    //     let bet = {
    //         archive: true
    //     }
    //     db.collection('bets').doc(id).update(bet);
    // }
});

// delete archived bet
const archiveBetContainer = document.querySelector('.archive-bets');
archiveBetContainer.addEventListener('click', evt => {
    if (evt.target.textContent === 'delete_outline') {
        const id = evt.target.getAttribute('data-id');
        db.collection('bets').doc(id).delete();
    }
})

// const modalDelete = () => {
//     const betContainer = document.querySelector('.bets');
//     const modal = document.querySelector('.modal');
//     betContainer.addEventListener('click', evt => {
//         if (evt.target.textContent === 'delete_outline') {
//             const id = evt.target.getAttribute('data-id');
//             modal.addEventListener('click', evt => {
//                 if (evt.target.textContent === 'Fortsätt') {
//                     db.collection('bets').doc(id).delete();
//                 }
//             })
//         }
//     })
// }
