document.addEventListener('DOMContentLoaded', () => {
  // add bet form
  const form = document.querySelector('.side-form');
  M.Sidenav.init(form, {
    edge: 'right'
  });

  // nav menu
  const menu = document.querySelector('.side-menu');
  M.Sidenav.init(menu, {
    edge: 'left'
  });

  // modal
  const modal = document.querySelector('.modal');
  M.Modal.init(modal, {
    opacity: 0.5,
    dismissible: false,
    startingTop: '8%',
    endingTop: "14%",
    onCloseEnd: () => {
      const betContainer = document.querySelector('.bets');
      const deleteModal = document.getElementById('modal1');
      betContainer.addEventListener('click', evt => {
        const id = evt.target.getAttribute('data-id');
        if (evt.target.textContent === 'delete_outline') {
          deleteModal.addEventListener('click', evt => {
            if (evt.target.textContent === 'Fortsätt') {
              db.collection('bets').doc(id).delete();
            }
          })
        } else if (evt.target.textContent === 'move_to_inbox') {
          let bet = {
            archive: true
          }
          db.collection('bets').doc(id).update(bet);
        }
      })
    }
  });
});

// render archived bet
const renderBet = (data, id) => {
  // const bets = document.querySelector(data.archive ? '.archive-bets' : '.bets');
  const date = new Date(data.date * 1000);
  let html = `
      <div class="card-panel bet white row" data-id="${id}">
        <img src="/img/user.png" alt="player avatar" />
        <div class="bet-particulars">
          <div class="bet-player grey-text text-darken-1">${data.player}</div>
          <div class="bet-date grey-text text-darken-1">${date.getFullYear()}/${date.getMonth() +
            1}/${date.getDate()} ${date.getHours()}:${(date.getMinutes() < 10
              ? "0"
              : "") + date.getMinutes()}</div>
          <div class="bet-type grey-text text-darken-1">${data.type}</div>
          <div class="bet-sum grey-text text-darken-1">${data.sum}:-</div>
        </div>
        <div class="bet-actions">
          <a class="modal-trigger" href="#modal1"><i class="material-icons grey-text text-darken-1" data-id="${id}">delete_outline</i></a>
    `;
  if (!data.archive) {
    html += `<i class="material-icons grey-text text-darken-1" data-id="${id}">move_to_inbox</i>`;
  }
  html += '</div> </div>';

  return html;
};
