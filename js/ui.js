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
})
