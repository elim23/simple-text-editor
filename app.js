text = 'absiabcdwerabcd';
pattern = 'aabcaaad';

matchCounter = 0;
storeIndex = []
lps = []

textArr = text.split('')
patternArr = pattern.split('')


function implementKMP(textArr, patternArr) {
    i = 0;
    j = 0;

    while (i < text.length) {
        if (textArr[i] == patternArr[j]) {
            i++ //textIndex
            j++ //patternIndex
        } else {
            if (j != 0) { //prevent to have a negative index
                j = lps[j - 1]
            } else {
                i++
            }
        }

        if (j === patternArr.length) {
            storeIndex.push(`${i - patternArr.length} ${i}`)
            matchCounter++
            j = lps[j - 1]
        }
    }

    if (matchCounter === 0) {
        console.log('No Match Found')
    } else {
        console.log(storeIndex)
        console.log('Match Found:   ' + matchCounter)
    }
}

function generateTable(pattern) {
    for (i = 0; i < pattern.length; i++) {
        lps.push(0)
    }
    return lps
}

function lpsGenerator(pattern) {
    table = generateTable(pattern)
    basis = 0
    i = 1

    while (i < patternArr.length) {
        if (patternArr[i] === patternArr[basis]) {
            table[i] = basis + 1
            basis++
            i++
        } else {
            // if (basis != 0){
            //     basis = 0
            // }
            // i++

            table[i] =0
            i++
        }
        console.log(i)
    }
    console.log(lps)
    return lps
}

lpsGenerator(pattern)
//implementKMP(textArr, patternArr)