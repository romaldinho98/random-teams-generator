const generateButton = document.querySelector("#generate-btn"),
      teamsList = document.querySelector(".teams__final"),
      resultTitle = document.querySelector(".teams__result"),
      membersListInputs = document.querySelector(".teams__inputs-members"),
      countTeamsInput = document.querySelector("#count-teams"),
      countMembersInput = document.querySelector("#count-members");

let membersArray = [];

resultTitle.style.display = "none";

countMembersInput.addEventListener('input', () => {
  membersListInputs.innerHTML = '';

  function createElemMember(elemsList) {
    let elem = document.createElement('li');
    let input = document.createElement('input');
    input.type = "text";
    input.className = "teams__input-member";
    elem.appendChild(input);
    elemsList.appendChild(elem);
  }
  
  if (countMembersInput.value < 20) {
    for (let i = 1; i <= countMembersInput.value; i += 1) {
      createElemMember(membersListInputs);
    }
  }
});

generateButton.addEventListener('click', () => {
  let countTeamsValue = +countTeamsInput.value;
  let countMembersValue = +countMembersInput.value;

  membersArray = [];
  teamsList.innerHTML = '';

  if (countTeamsInput.value >= 1 && countMembersInput.value >= 1) {
    resultTitle.style.display = "block";
    showTeamsAndMembers(countTeamsValue, countMembersValue);
  }
});

function showTeamsAndMembers(teams) {
  let membersArray = [];

  let inputsMembers = document.querySelectorAll(".teams__input-member");
  
  inputsMembers.forEach(input => {
    membersArray.push(input.value);
  });

  console.log(membersArray);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

      // "деструктурирующее присваивание", то же самое можно записать как:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(membersArray);
  
  console.log(membersArray);

  function createResultElem(elemText, elemsList) {
    let elem = document.createElement('li');
    elem.classList.add("teams__item");
    elem.textContent = elemText;
    elemsList.appendChild(elem);
  }

  const chunkSize = teams;

  for (let i = 0; i < membersArray.length; i += (membersArray.length/chunkSize)) {
    let chunk = (membersArray.slice(i, i + (membersArray.length/chunkSize))).join(', ');
    // console.log(chunk);
    createResultElem(chunk, teamsList);
  }
}