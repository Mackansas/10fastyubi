import {hiraDict, romajiToHira, hiraToRomaji} from './consts.js' 
const hiraDisplayElement = document.getElementById('charDisplay')
const inputElement = document.getElementById('inputBox')
let endless = false
let count = 0
let hiragana = [
    'あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ',
    'ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'
    ]

const hiraButtonsID = ['vHira','kHira','sHira','tHira','nHira','hHira','mHira','yHira','rHira','wHira', 'dHira']

function renderNextHiragana() {
    return (hiragana[Math.floor(Math.random() * hiragana.length)])
}

function generateHiraganaArray() {
    let res =''
    for (let i = 0; i <100; i++) {
        res += renderNextHiragana() + '';
    }
    hiraDisplayElement.innerHTML = ''
    res.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        hiraDisplayElement.appendChild(characterSpan)
    })
    inputElement.value = null
}
  
inputElement.addEventListener('input', () => {
    //This selects each char in quote so it can be marked correct/incorrect
    const arrayHira = hiraDisplayElement.querySelectorAll('span')
    //Splits each input at space
    const arrayValuet = inputElement.value.split(' ')
    //translated into hira V
    const arrayValue = []
    arrayValuet.forEach(element => arrayValue.push(romajiToHira[element.toLowerCase()]))

    arrayHira.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        /* Checks if we have typed the char, if not make it "black" */
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        /*Checks if we have typed the char and it is correct, make it "green"*/
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            inputElement.value = ''
            count +=1
            document.getElementById('counterDisplay').innerHTML = 'Count: ' + count
        /* We typed the wrong char, make it "red" */
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
        }
    })
    //Checks each elem if something is right
    arrayHira.forEach((element, index) => {
        //Remove hira char if it is correct
        if (element.classList.contains('correct')) {
            element.parentNode.removeChild(element);
        //TODO Append one new random hira
        }
    })
})

//Tried to move into above listener, didnt update properly, had to press key again for it to fire
inputElement.addEventListener("input", e => {
    const arrayHira = hiraDisplayElement.querySelectorAll('span')
    if (arrayHira.length === 0) {
        generateHiraganaArray()
    }
    if (endless && arrayHira.length < 100) {
        for (let i = arrayHira.length; i < 130; i++){
        const characterSpan = document.createElement('span')
        characterSpan.innerText = renderNextHiragana() + ''
        hiraDisplayElement.appendChild(characterSpan)
        }
    }
})

endlessButton.addEventListener("click", e => {
    if (endless) {
        endless = false
        endlessButton.innerText="Endless: OFF"
    } else {
        endless = true
        endlessButton.innerText="Endless: ON"
    }
})

reloadHiraButton.addEventListener('click', e => {
    generateHiraganaArray()
})

hiraButtonsID.forEach((hiraStringID) => {
    let hiraButton = document.getElementById(hiraStringID)
    hiraButton.addEventListener("click", e => {
        let hiraArray = hiraDict[hiraStringID]
        if (hiragana.some(r => hiraArray.includes(r))) {
            hiragana = hiragana.filter((hira) => !hiraArray.includes(hira));
            hiraButton.style.color = "rgba(255, 82, 82, 0.85)"
        } else {
            hiragana = [...hiragana, ...hiraArray]
            hiraButton.style.color = "black"
        }
    })
})

generateHiraganaArray()
