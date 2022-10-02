const quoteDisplayElement = document.getElementById('charDisplay')
const quoteInputElement = document.getElementById('inputBox')

quoteInputElement.addEventListener('input', () => {

    
    //This selects each char in quote so it can be marked correct/incorrect
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    //Splits each input at space
    const arrayValuet = quoteInputElement.value.split(' ')
    //translated into hira V
    const arrayValue = []
    arrayValuet.forEach(element => arrayValue.push(romajiToHira[element.toLowerCase()]))
    //console.log("Char marks:", console.log(arrayValue))
    //console.log("Hiragana", arrayValue)
    //console.log("Input", arrayValuet)
    console.log(arrayQuote.length)
    if (arrayQuote.length === 0) {
        console.log("Yohohoh")
        generateHiraganaArray()
    }

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        /* Checks if we have typed the char, if not make it "black" */
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        /*Checks if we have typed the char and it is correct, make it "green"*/
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            quoteInputElement.value = ''
        /* We typed the wrong char, make it "red" */
        } else {
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
        }
    })
    //Checks each elem if something is right
    arrayQuote.forEach((element, index) => {
        if (element.classList.contains('correct')) {
            element.parentNode.removeChild(element); 
        }
    })
})

async function renderNextQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

//renderNextQuote()
generateHiraganaArray()

//const hiraToRomaji = {
//    'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko','さ':'sa',
//    'し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to'
//}

//const romajiToHira = {
//    'to':'と','te':'て','tsu':'つ','chi':'ち','ta':'た','so':'そ','se':'せ','su':'す','shi':'し',
//    'sa':'さ','ko':'こ','ke':'け','ku':'く','ki':'き','ka':'か','o':'お','e':'え','u':'う','i':'い','a':'あ'
//}

const romajiToHira = {
    'wo':'を','wa':'わ',
    'ro':'ろ','re':'れ','ru':'る','ri':'り','ra':'ら',
    'yo':'よ','yu':'ゆ','ya':'や',
    'mo':'も','me':'め','mu':'む','mi':'み','ma':'ま',
    'ho':'ほ','he':'へ','fu':'ふ','hi':'ひ','ha':'は',
    'no':'の','ne':'ね','nu':'ぬ','ni':'に','na':'な',
    'to':'と','te':'て','tsu':'つ','chi':'ち','ta':'た',
    'so':'そ','se':'せ','su':'す','shi':'し','sa':'さ',
    'ko':'こ','ke':'け','ku':'く','ki':'き','ka':'か',
    'n':'ん','o':'お','e':'え','u':'う','i':'い','a':'あ'
}


const hiraToRomaji = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o','ん':'n',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo',
    'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','を':'wo'
}


//var hiragana = [
//    'あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ',
//    'ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'
//]

function renderNextHiragana() {
    const hiragana = [
    'あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ',
    'ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'
    ]
    //const hiragana = [
    //    'あ','い','う','え','お','か','き','く','け','こ',
    //    'さ','し','す','せ','そ','た','ち','つ','て','と']
    return (hiragana[Math.floor(Math.random() * hiragana.length)])

}

function generateHiraganaArray() {
    let res =''
    //generate 10 hiragana chars    57
    for (let i = 0; i < 57; i++) {
        res += renderNextHiragana() + '';
    }
    //Remove last ' '
    //res = res.slice(0,-1)
    quoteDisplayElement.innerHTML = ''
    res.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
}

reloadButton.addEventListener("click", e => {
    generateHiraganaArray()
  })

  
quoteInputElement.addEventListener("input", e => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    if (arrayQuote.length === 0) {
        generateHiraganaArray()
    }
})
