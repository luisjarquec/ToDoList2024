document.addEventListener("DOMContentLoaded", () => {
    for(let i = 1; i <= 4; i++) {
        initializeHabit(i);
    }
    currentDay();
});

function initializeHabit(habitNumber) {
    const habitTitle = document.getElementById(`habitTitle${habitNumber}`);
    const habitButtons = document.getElementById(`habitButtons${habitNumber}`);

    habitTitle.value = localStorage.getItem(`habitTitle${habitNumber}`) || '';
    const savedState = JSON.parse(localStorage.getItem(`habitState${habitNumber}`) || '[]');

    for(let day = 1; day <= 31; day++) {
        const button = document.createElement('button');
        button.textContent = day;
        if(savedState.includes(day)) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => toggleDay(habitNumber, day, button));
        habitButtons.appendChild(button);
    }

    habitTitle.addEventListener('change', () => {
        localStorage.setItem(`habitTitle${habitNumber}`, habitTitle.value);
    });
}

function toggleDay(habitNumber, day, button) {
    let savedState = JSON.parse(localStorage.getItem(`habitState${habitNumber}`)) || [];

    if(savedState.includes(day)) {
        savedState = savedState.filter(d => d !== day);
        button.classList.remove('active');
    } else {
        savedState.push(day);
        button.classList.add('active');
    }
    localStorage.setItem(`habitState${habitNumber}`, JSON.stringify(savedState));
}

function currentDay(){
    const today = new Date().getDate();
    const allButtons = document.querySelectorAll('.habit-buttons button');

    allButtons.forEach(button => {
        if(parseInt(button.textContent) === today) {
            button.classList.add('current-day');
        }
    });
}