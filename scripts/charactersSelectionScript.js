window.addEventListener('load', function () {

    if (this.sessionStorage.getItem('username') == undefined || this.sessionStorage.getItem('selectedLevel') == undefined)
        this.location.assign('/')
    else
        this.sessionStorage.setItem('SelectedImgsArr', null)


    //for animation on load
    let contentDiv = document.querySelector('.content');
    document.body.style.marginTop = '0%'

    setTimeout(() => {
        document.body.style.overflow = 'auto';
        contentDiv.style.opacity = '1';
    }, 1500)

    //load userName and display it on screen
    let usernameSpan = this.document.getElementById('username')
    usernameSpan.innerText = this.sessionStorage.getItem('username').toUpperCase()

    //add image to prefered Div and prefered Array
    let availableImgaBtns = this.document.querySelectorAll('.availableCharsDiv button');
    let preferedImgsDiv = this.document.querySelector('.selectedCharsDiv')
    availableImgaBtns.forEach(btn => {
        btn.addEventListener('click', addToPrefered.bind(this, preferedImgsDiv))
    })

    //draw empty div according to selected level
    let selectedLevel = this.sessionStorage.getItem('selectedLevel');
    noOfImg = selectedLevel == '1' ? 4 : 9;
    for (let i = 0; i < noOfImg; i++) {
        preferedImgsDiv.append(drawEmptyImgDiv())
    }

    //start game button
    let startBtn = this.document.getElementById('startBtn');
    startBtn.addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
            sessionStorage.setItem('SelectedImgsArr', JSON.stringify(preferedArray))
            contentDiv.style.opacity = '0';
            setTimeout(() => location.assign('/pages/game.html'), 1000)

        }
    })

})