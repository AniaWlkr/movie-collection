import team from './team';
import hackersTmpl from '../../templates/hackers-modal.hbs';

const teamList = document.querySelector('.hackers-list');

function renderTeam(arr) {
  return teamList.insertAdjacentHTML('beforeend', hackersTmpl(arr));
}
renderTeam(team);
