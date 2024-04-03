document.addEventListener('DOMContentLoaded', function() {
    const cases = [
        { type: "Đơn", name: "T" },
        { type: "Đơn", name: "CT" },
        { type: "Đơn", name: "DICE" },
        { type: "Đôi", name: "T sau T" },
        { type: "Đôi", name: "CT sau T" },
        { type: "Đôi", name: "DICE sau T" },
        { type: "Đôi", name: "CT sau CT" },
        { type: "Đôi", name: "CT sau DICE" },
        { type: "Đôi", name: "DICE sau CT" },
        { type: "Đôi", name: "DICE sau DICE" }
    ];

    const casesContainer = document.getElementById('cases-container');
    let occurrences = JSON.parse(localStorage.getItem('occurrences')) || {};

    // Khởi tạo dữ liệu nếu cần
    cases.forEach(caseItem => {
        if (occurrences[caseItem.name] === undefined) {
            occurrences[caseItem.name] = 0;
        }
    });

    function createColumn(caseItem) {
        const column = document.createElement('div');
        column.className = 'column';

        const title = document.createElement('h2');
        title.innerText = `${caseItem.name} (${caseItem.type})`;

        const content = document.createElement('div');
        content.className = 'column-content';

        const count = document.createElement('p');
        count.id = `count-${caseItem.name}`;
        count.innerText = `Số lần xuất hiện: ${occurrences[caseItem.name]}`;

        const percentage = document.createElement('p');
        percentage.id = `percentage-${caseItem.name}`;
        percentage.innerText = 'Tính sau...';

        content.appendChild(title);
        content.appendChild(count);
        content.appendChild(percentage);

        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        const addButton = document.createElement('button');
        addButton.innerText = '+1';
        addButton.onclick = function() {
            occurrences[caseItem.name]++;
            updateLocalStorageAndDisplay();
        };

        const subtractButton = document.createElement('button');
        subtractButton.innerText = '-1';
        subtractButton.onclick = function() {
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
        localStorage.setItem('occurrences', JSON.stringify(occurrences));
        const totalOccurrences = Object.values(occurrences).reduce((a, b) => a + b, 0);
        cases.forEach(caseItem => {
            const countElement = document.getElementById(`count-${caseItem.name}`);
            const percentageElement = document.getElementById(`percentage-${caseItem.name}`);
            countElement.innerText = `Số lần xuất hiện: ${occurrences[caseItem.name]}`;
            if (totalOccurrences > 0) {
                const percentage = ((occurrences[caseItem.name] / totalOccurrences) * 100).toFixed(2);
                percentageElement.innerText = `Tỉ lệ xuất hiện: ${percentage}%`;
            } else {
                percentageElement.innerText = `Tỉ lệ xuất hiện: 0%`;
            }
        });
    }

    // Tạo cột cho mỗi trường hợp và cập nhật hiển thị
    cases.forEach(createColumn);
    updateLocalStorageAndDisplay();
});
