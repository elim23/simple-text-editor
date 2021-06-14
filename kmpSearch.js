text = 'asdas'
pattern = 'as'
replaceWord = 'hello '
//lps = lpsGenerator(pattern)

matchCounter = 0;


function highlightSearched() {
    let searchResIndex = searchKMP(text, pattern)
    let first;
    let mid;
    let last;
    let i = 0

    while(i < searchResIndex.length){
        splitter = text.split('')

        coor = searchResIndex[i].split(' ')
        coorStart = parseInt(coor[0])
        coorEnd = parseInt(coor[1])

        console.log(`coor:  ${coor}`)

        first = splitter.slice(0, coorStart)
        first.push('<mark>')

        mid = splitter.slice(coorStart, coorEnd)
        mid.push('</mark>')

        last = splitter.slice(coorEnd, splitter.length)

        test = first.join('') + mid.join('') + last.join('')
        document.getElementById("textContainer").innerHTML = test
        text = test
        
        matchCounter = 0
        searchResIndex = searchKMP(text, pattern, lps)

        i++
    }
}

function searchKMP(text, pattern) {
    const lps = lpsGenerator(pattern)
    storeIndex = []

    length = text.length
    i = 0;
    j = 0;

    while (i < length) {
        if (text[i] == pattern[j]) {
            i++ //textIndex
            j++ //patternIndex
        } else {
            if (j != 0) {
                j = lps[j - 1]
            } else {
                i++
            }
        }

        if (j === pattern.length) {
            storeIndex.push(`${i - pattern.length} ${i}`)
            matchCounter++
            j = lps[j - 1]
        }
    }
    console.log(storeIndex)
    return storeIndex;
}

function lpsGenerator(pattern) {
    lps = []

    for (i = 0; i < pattern.length; i++) {
        lps.push(0)
    }

    patternArr = pattern.split('')

    basis = 0
    i = 1

    while (i < pattern.length) {
        if (patternArr[i] === pattern[basis]) {
            lps[i] = basis + 1
            basis++
            i++
        } else {
            if (basis != 0) {
                basis = lps[basis - 1]
            } else {
                lps[i] = 0
                i++
            }
        }
    }
    return lps
}

function matchCount() {
    if (matchCounter === 0) {
        return 'No Match Found'
    } else {
        return ('Matches Found:   ' + matchCounter)
    }
}

function replaceWords(){
    let searchResIndex = searchKMP(text, pattern)
    let first;
    let last;
    let i = 0

    while(i < searchResIndex.length){
        splitter = text.split('')

        coor = searchResIndex[i].split(' ')
        coorStart = parseInt(coor[0])
        coorEnd = parseInt(coor[1])

        console.log(`coor:  ${coor}`)

        first = splitter.slice(0, coorStart)
        first.push(replaceWord)

        last = splitter.slice(coorEnd, splitter.length)

        test = first.join('')+ last.join('')
        document.getElementById("textContainer").innerHTML = test
        text = test
        
        matchCounter = 0
        searchResIndex = searchKMP(text, pattern, lps)

        i++
    }
}

// lpsGenerator(pattern)
//searchKMP(text, pattern, lps)
// highlightSearched()
//replaceWords()