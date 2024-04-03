document.addEventListener("DOMContentLoaded", function () {
  const cases = [
    { type: "single", name: "T" },
    { type: "single", name: "CT" },
    { type: "single", name: "DICE" },
    { type: "double", name: "T sau T" },
    { type: "double", name: "CT sau T" },
    { type: "double", name: "DICE sau T" },
    { type: "double", name: "CT sau CT" },
    { type: "double", name: "CT sau DICE" },
    { type: "double", name: "DICE sau CT" },
    { type: "double", name: "DICE sau DICE" },
  ];

  const casesContainer = document.getElementById("cases-container");
  let occurrences = JSON.parse(localStorage.getItem("occurrences")) || {};

  cases.forEach((caseItem) => {
    if (occurrences[caseItem.name] === undefined) {
      occurrences[caseItem.name] = 0;
    }
  });

  function createColumn(caseItem) {
    const column = document.createElement("div");
    column.className = "column";

    const title = document.createElement("h2");
    title.innerText = caseItem.name;

    const content = document.createElement("div");
    content.className = "column-content";

    const count = document.createElement("p");
    count.id = `count-${caseItem.name}`;
    count.innerText = `Số lần xuất hiện: ${occurrences[caseItem.name]}`;

    content.appendChild(title);
    content.appendChild(count);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    const addButton = document.createElement("button");
    addButton.innerText = "+1";
    addButton.onclick = function () {
      occurrences[caseItem.name]++;
      updateLocalStorageAndDisplay();
    };

    const subtractButton = document.createElement("button");
    subtractButton.innerText = "-1";
    subtractButton.onclick = function () {
      if (occurrences[caseItem.name] > 0) {
        occurrences[caseItem.name]--;
        updateLocalStorageAndDisplay();
      }
    };

    buttonGroup.appendChild(addButton);
    buttonGroup.appendChild(subtractButton);

    column.appendChild(content);
    column.appendChild(buttonGroup);

    casesContainer.appendChild(column);
  }

  function updateLocalStorageAndDisplay() {
    localStorage.setItem("occurrences", JSON.stringify(occurrences));
    cases.forEach((caseItem) => {
      const countElement = document.getElementById(`count-${caseItem.name}`);
      countElement.innerText = `Số lần xuất hiện: ${
        occurrences[caseItem.name]
      }`;
    });
  }

  cases.forEach(createColumn);
  updateLocalStorageAndDisplay();
});
