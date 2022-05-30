window.addEventListener('load', function () {

    // redirect user to the home page if visiting game page directly
    if (this.sessionStorage.getItem('username') == undefined ||
        this.sessionStorage.getItem('selectedLevel') == undefined ||
        this.sessionStorage.getItem('SelectedImgsArr') == undefined ||
        this.sessionStorage.getItem('SelectedImgsArr') == null
    )
        this.location.assign('/');

    // display username and timer on page load
    let usernameSpan = this.document.getElementById('username')
    let timerSpan = this.document.getElementById('timer')
    usernameSpan.innerText = this.sessionStorage.getItem('username').toUpperCase()
    timerSpan.innerText = sessionStorage.getItem('selectedLevel') == '1' ? '1m' : '2m'

    // load prefered imgs on page load
    let preferedImgsDiv = this.document.getElementById('preferedImgsDiv');
    let preferedArray = JSON.parse(this.sessionStorage.getItem('SelectedImgsArr'));
    for (const i in preferedArray) {
        preferedImgsDiv.append(drawImgDiv(+i + 1, preferedArray[i]))
    }

    //load table cells
    const sudokuTable = document.querySelector('table tbody');
    const level = this.sessionStorage.getItem('selectedLevel');
    drawRow(level, sudokuTable);
    sudokuTable.rows[0].cells[0].focus();

    // keyboard keydown handler
    window.addEventListener('keydown', KeyDownHandler)

    let startBtn = this.document.getElementById('startBtn');
    startBtn.addEventListener('click', startGame)

    let retryBtn = document.getElementById('retryBtn')
    retryBtn.addEventListener('click', () => {
        this.sessionStorage.removeItem('sudokuSolution')
        this.location.assign('/')
    })

    let playAgainBtn = document.getElementById('playAgainBtn')
    playAgainBtn.addEventListener('click', () => {
        this.sessionStorage.removeItem('sudokuSolution')
        this.location.assign('/')
    })


})