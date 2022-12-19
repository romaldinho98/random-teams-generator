const generateButton = document.querySelector("#generate-btn"),
      teamsList = document.querySelector(".teams__final"),
      resultTitle = document.querySelector(".teams__result"),
      membersListInputs = document.querySelector(".teams__inputs-members"),
      countTeamsInput = document.querySelector("#count-teams"),
      countMembersInput = document.querySelector("#count-members");

let membersArray = [];

resultTitle.style.display = "none";

countMembersInput.addEventListener('input', () => {
  membersListInputs.innerHTML = "";
  
  if (countMembersInput.value < 20) {
    for (let i = 1; i <= countMembersInput.value; i += 1) {
      createElemMember(membersListInputs);
    }
  }

  resultTitle.style.display = "none";
  teamsList.innerHTML = "";
});


generateButton.addEventListener('click', (e) => {
  let countTeamsValue = +countTeamsInput.value;
  let countMembersValue = +countMembersInput.value;
  let inputsMembers = document.querySelectorAll(".teams__input-member");

  //создание массива инпутов, у которых value пустое
  let emptyInputs = Array.from(inputsMembers).filter(input => input.value === "");

  membersArray = [];
  teamsList.innerHTML = "";

  //проверка на заполнение всех инпутов участников

  inputsMembers.forEach(input => {
    if (input.value === "") {
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (emptyInputs.length === 0 && countTeamsValue >= 1 && countMembersValue >= 1) {
    showTeamsAndMembers(countTeamsValue);
    resultTitle.style.display = "block";
  }
});

function createElemMember(elemsList) {
  let elem = document.createElement('li');
  let input = document.createElement('input');
  input.type = "text";
  input.className = "teams__input-member";
  elem.appendChild(input);
  elemsList.appendChild(elem);
}

function showTeamsAndMembers(teams) {
  let inputsMembers = document.querySelectorAll(".teams__input-member");
  
  inputsMembers.forEach(input => {
    if (input.value.length > 1) {
      membersArray.push(input.value);
    }
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