// "BobMarley" -> "Bob Marley"
// "Bobmarley" -> "Bobmarley"
// "Bob marley" -> "Bob Marley"
// "bOB mARLEY" -> "Bob Marley"
// "bob marley" -> "Bob Marley"
// "Bob     marley" -> "Bob Marley"
// "Bob     Marley" -> "Bob Marley"
// "BOB     marley" -> "Bob Marley"
// "BOB            MARLEY" -> "Bob Marley"
// "BOB            MARLEY      plays       THE guitar" -> "Bob Marley Plays The Guitar"
// "HELLO    wORLD" -> "Hello World"

export function formatString(text: string): string {
    const textWithWhiteSpace = addWhiteSpaceOnMergedWords(text);
    const textInTitleCase = convertToTitleCase(textWithWhiteSpace);
    const textWithoutExtraWhiteSpace = removeExtraWhiteSpace(textInTitleCase);
    return textWithoutExtraWhiteSpace;
}

function addWhiteSpaceOnMergedWords(text:string){
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function convertToTitleCase(text:string){
    return text.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
}

function removeExtraWhiteSpace(text:string){
    return text.replace(/\s+/g, ' ').trim();
}