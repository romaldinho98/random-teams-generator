const generateButton = document.querySelector("#generate-btn");

let countTeamsValue = 0,
    countMembersValue = 0,
    membersArray = [],
    teamsList = document.querySelector(".teams__final");

generateButton.addEventListener('click', () => {
  countTeamsValue = +document.querySelector("#count-teams").value;
  countMembersValue = +document.querySelector("#count-members").value;

  membersArray = [];
  deleteElements(teamsList);
  showTeamsAndMembers(countTeamsValue, countMembersValue);
});

function deleteElements(parent) {
  let childrens = parent.childNodes;
  childrens.forEach(item => {
    item.remove();
    
  });
  console.log(childrens);
}

function showTeamsAndMembers(teams, members) {
  let membersArray = [];

  for (let i = 1; i <= members; i += 1) {
    membersArray.push(i);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

      // "деструктурирующее присваивание", то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffle(membersArray);

  function createElem(elemText, elemsList) {
    let elem = document.createElement('li');
    elem.classList.add("teams__item");
    elem.textContent = elemText;
    elemsList.appendChild(elem);
  }

  const chunkSize = teams;

  for (let i = 0; i < membersArray.length; i += chunkSize) {
    let chunk = membersArray.slice(i, i + chunkSize);
    createElem(chunk, teamsList);
  }
}