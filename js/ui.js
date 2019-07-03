const bets = document.querySelector('.bets');

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
});

// render bet data
const renderBet = (data, id) => {
  const html = `
  <div class="card-panel bet white row" data-id="${id}">
    <img src="/img/baseline_account_circle_black_48.png" alt="player avatar" />
    <div class="bet-particulars">
      <div class="bet-player grey-text text-darken-1">${data.player}</div>
      <div class="bet-type grey-text text-darken-1">${data.type}</div>
      <div class="bet-sum grey-text text-darken-1">${data.sum}</div>
    </div>
    <div class="bet-actions">
      <i class="material-icons grey-text text-darken-1  data-id="${id}">delete_outline</i>
      <i class="material-icons grey-text text-darken-1">
        redo
      </i>
      <i class="material-icons grey-text text-darken-1">move_to_inbox</i>
    </div>
  </div>
  `;

  bets.innerHTML += html;
}
