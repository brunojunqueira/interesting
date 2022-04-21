function convert(value){
    if(value > 1000 && value < 1000000){
        return Math.round(value/1000) + 'K+'
    }
    else if(value > 1000000){
        return Math.floor(value/1000000) + 'M+'
    }
    else{
        return value;
    }
}

export { convert }