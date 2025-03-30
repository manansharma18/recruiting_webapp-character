export const getURLRequest = ()=>fetch( "https://recruiting.verylongdomaintotestwith.ca/api/{manansharma18}/character", {method:"GET"});

export const saveCharacterPostURL = (character) => fetch('https://recruiting.verylongdomaintotestwith.ca/api/{manansharma18}/character',{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(character)
})