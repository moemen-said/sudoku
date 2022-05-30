let preferedArray = [];
let timerId;

// shake passed component horizontaly and find it error text to toggle it
function shakeAlert(component, textAlert) {
    if (component.classList.contains("animate__shakeX")) component.classList.remove("animate__shakeX");
    setTimeout(() => component.classList.add("animate__shakeX"), 0);

    let alert = component.querySelector(".alertText");
    alert.innerText = textAlert
    alert.classList.remove("d-none");
    setTimeout(function () {
        alert.classList.add("d-none");
    }, 2500);
}

// add img to prefered Div and prefered Array
function addToPrefered(preferedImgsDiv, event) {
    let startBtn = document.getElementById('startBtn');
    let clickedBtn = event.target.closest('.item');

    if (clickedBtn.classList.contains('disabled')) return;

    if (isSelectedMoreAllowed() >= 1) {
        //for prefered div items
        let emptyDiv = preferedImgsDiv.querySelector(".empty");
        emptyDiv.dataset.id = event.target.closest('.item').dataset.id;
        emptyDiv.style.background = `url('${event.target.src}') #eee`;
        emptyDiv.classList.remove("empty");

        //for available div items
        event.target.closest('.item').classList.add("disabled");

        //for adding to prefered Array
        preferedArray.push(event.target.closest('.item').dataset.id)
    }
    else {
        shakeAlert(event.target.parentElement.parentElement.parentElement, 'You reached the maximum selection')
    }

    if (isSelectedMoreAllowed() == 0) {
        startBtn.classList.remove('disabled')
        window.scrollTo(0, 0)
    }

}

// remove img from prefered Div and prefered Array
function removeFromPrefered(availableImgsDiv, event) {
    let deletedImgBtn = event.target.closest('.item');
    let id = deletedImgBtn.dataset.id;

    // remove id and background fom deleted Btn
    deletedImgBtn.removeAttribute('data-id');
    deletedImgBtn.style.background = '#eee';
    deletedImgBtn.classList.add('empty');

    //remove disabled class from available section for deleted img
    let selectedImgBtn = availableImgsDiv.querySelector(`button[data-id='${id}']`)
    selectedImgBtn.classList.remove('disabled')

    //remove from array
    preferedArray = preferedArray.filter((item) => item != id)

    if (isSelectedMoreAllowed() > 0) {
        startBtn.classList.add('disabled')
    }

}

// return empty div item
function drawEmptyImgDiv() {
    let div = document.createElement('div');
    let btn = document.createElement('button');
    let icon = document.createElement('i');

    div.classList.add('item', 'empty')
    div.append(btn);
    let availableImgsDiv = this.document.querySelector('.availableCharsDiv')
    btn.addEventListener('click', removeFromPrefered.bind(this, availableImgsDiv))
    icon.classList.add('fa-solid', 'fa-trash')
    btn.append(icon);

    return div;
}

//return -1,0,1 according to selection
function isSelectedMoreAllowed() {
    let preferedImgsDiv = document.querySelector('.selectedCharsDiv')
    let allowedImgs = sessionStorage.getItem("selectedLevel") == "1" ? 4 : 9;

    let noOfSelectedItem = Array.from(preferedImgsDiv.children).reduce((accumulator, item) => {
        if (!item.classList.contains("empty")) return accumulator + 1;
        else return accumulator;
    }, 0);

    return (allowedImgs - noOfSelectedItem)
}

// return img div item
function drawImgDiv(index, imgId) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let span = document.createElement('span');

    div.append(img);
    img.src = `../images/cartoons/${imgId}.png`
    div.append(span);
    span.innerText = index;
    return div;
}

// draw rows and cell in the table
function drawRow(level, table) {
    const noOfRows = level == '1' ? 4 : 9;
    for (let i = 0; i < noOfRows; i++) {
        let tr = document.createElement('tr');
        table.append(tr);
        for (let j = 0; j < noOfRows; j++) {
            let td = document.createElement('td');
            td.setAttribute('tabindex', '10000');
            tr.append(td)
        }
    }
}

// handle keyDown action
const sudokuTable = document.querySelector('table tbody');
let xPosition = 0, yPosition = 0;
function KeyDownHandler(event) {

    const noOfRows = sudokuTable.rows.length;
    let currentCell = sudokuTable.rows[yPosition].cells[xPosition]
    preferedArray = JSON.parse(sessionStorage.getItem('SelectedImgsArr'));

    if (event.key == 'ArrowUp') {
        yPosition--;
        if (yPosition < 0) yPosition = noOfRows - 1;
        sudokuTable.rows[yPosition].cells[xPosition].focus()
    }
    else if (event.key == 'ArrowDown') {
        yPosition++;
        if (yPosition > noOfRows - 1) yPosition = 0;
        sudokuTable.rows[yPosition].cells[xPosition].focus()
    }
    else if (event.key == 'ArrowLeft') {
        xPosition--;
        if (xPosition < 0) xPosition = noOfRows - 1;
        sudokuTable.rows[yPosition].cells[xPosition].focus()
    }
    else if (event.key == 'ArrowRight') {
        xPosition++;
        if (xPosition > noOfRows - 1) xPosition = 0;
        sudokuTable.rows[yPosition].cells[xPosition].focus()
    }
    else if (!currentCell.classList.contains('unchangable')) {
        if (event.key == '1') {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[0]}.png)`
            currentCell.dataset.id = 1
        }
        else if (event.key == '2') {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[1]}.png)`
            currentCell.dataset.id = 2
        }
        else if (event.key == '3') {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[2]}.png)`
            currentCell.dataset.id = 3
        }
        else if (event.key == '4') {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[3]}.png)`
            currentCell.dataset.id = 4
        }
        else if (event.key == '5' && sessionStorage.getItem('selectedLevel') == 2) {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[4]}.png)`
            currentCell.dataset.id = 5
        }
        else if (event.key == '6' && sessionStorage.getItem('selectedLevel') == 2) {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[5]}.png)`
            currentCell.dataset.id = 6
        }
        else if (event.key == '7' && sessionStorage.getItem('selectedLevel') == 2) {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[6]}.png)`
            currentCell.dataset.id = 7
        }
        else if (event.key == '8' && sessionStorage.getItem('selectedLevel') == 2) {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[7]}.png)`
            currentCell.dataset.id = 8
        }
        else if (event.key == '9' && sessionStorage.getItem('selectedLevel') == 2) {
            currentCell.style.background = `url(../images/cartoons/${preferedArray[8]}.png)`
            currentCell.dataset.id = 9
        }
        isSolved();
    }
}

// get sudoku random board and solution
async function getSudokuData() {
    const level = sessionStorage.getItem('selectedLevel') == '1' ? 4 : 9;
    return (await fetch(`https://sudoku-api.deta.dev/?type=${level}`))
        .json()
}

// draw random borad
function drawRandomSudoku(sudokuTable, board) {
    // emptyTabelCells(sudokuTable);
    preferedArray = JSON.parse(sessionStorage.getItem('SelectedImgsArr'));
    const noOfRows = sudokuTable.rows.length;
    for (let i = 0; i < noOfRows; i++) {
        let rowData = board.substring(i * noOfRows, i * noOfRows + noOfRows)
        for (let j = 0; j < noOfRows; j++) {
            if (rowData[j] != '.') {
                sudokuTable.rows[i].cells[j].classList.add('unchangable');
                sudokuTable.rows[i].cells[j].dataset.id = rowData[j];
                sudokuTable.rows[i].cells[j].style.background =
                    `url(../images/cartoons/${preferedArray[+rowData[j] - 1]}.png)`
            }
        }
    }
}

function startGame() {

    let startBtn = document.getElementById('startBtn');
    startBtn.setAttribute('disabled', '');

    //load sudoko data and print the random data on table
    getSudokuData().then(sudokuObject => {
        sessionStorage.setItem('sudokuSolution', sudokuObject.solution)
        drawRandomSudoku(sudokuTable, sudokuObject.board)
    })

    // for timer
    let time = sessionStorage.getItem('selectedLevel') == '1' ? 60000 : 120000;
    let minutes = 0, seconds = 0
    timerId = setInterval(() => {
        time = time - 1000
        minutes = Math.floor(time / 60000);
        seconds = (time / 1000) - (minutes * 60);

        let timerSpan = document.getElementById('timer')
        timerSpan.innerText = minutes + 'm : ' + seconds + 's'

        if (!minutes && !seconds) gameOverAlert(timerId)

    }, 1000);
}

function gameOverAlert(timerId) {
    clearInterval(timerId);
    let gameOverAlert = document.querySelector('.gameOverDiv');
    gameOverAlert.classList.remove('d-none')
}

// check if game solved
function isSolved() {
    let solution = sessionStorage.getItem('sudokuSolution');
    userSolution = '';
    const noOfRows = sudokuTable.rows.length;
    for (let i = 0; i < noOfRows; i++) {
        for (let j = 0; j < noOfRows; j++) {
            if (sudokuTable.rows[i].cells[j].dataset.id != undefined) {
                userSolution = userSolution + sudokuTable.rows[i].cells[j].dataset.id;
            }
            else {
                userSolution = userSolution + 0
            }
        }
    }
    let successDiv = document.querySelector('.successDiv')
    if (userSolution == solution) {
        clearInterval(timerId)
        successDiv.classList.remove('d-none')
    }
}