function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}

const promise1 = new Promise(resolve => setTimeout(() => resolve(getRandomTime(1, 3)), getRandomTime(1000, 3000)));
const promise2 = new Promise(resolve => setTimeout(() => resolve(getRandomTime(1, 3)), getRandomTime(1000, 3000)));
const promise3 = new Promise(resolve => setTimeout(() => resolve(getRandomTime(1, 3)), getRandomTime(1000, 3000)));

const promises = [promise1, promise2, promise3];
const startTime = performance.now();

Promise.all(promises).then((times) => {
    const endTime = performance.now();
    const totalDuration = (endTime - startTime) / 1000;

    // Remove loading row
    const tableBody = document.getElementById('output');
    const loadingRow = document.getElementById('loadingRow');
    if (loadingRow) {
        tableBody.removeChild(loadingRow);
    }

    // Populate table with each promise's result
    times.forEach((time, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = `Promise ${index + 1}`;
        row.appendChild(nameCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = time.toFixed(3);
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    });

    // Add row for total time taken
    const totalRow = document.createElement('tr');

    const totalLabelCell = document.createElement('td');
    totalLabelCell.textContent = 'Total';
    totalRow.appendChild(totalLabelCell);

    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = totalDuration.toFixed(3);
    totalRow.appendChild(totalTimeCell);

    tableBody.appendChild(totalRow);
});
