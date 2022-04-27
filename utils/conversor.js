function valueToSimpleValue(value){
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

function dateToSimpleDate(date){
    let now = new Date().toISOString();

    let spliteddate = date.split('T');
    let splitednow = now.split('T');

    let datehour = spliteddate[1].split('.')[0].split(':');
    let nowhour = splitednow[1].split('.')[0].split(':');

    let formateddate = spliteddate[0].split('-');
    let formatednow = splitednow[0].split('-');

    if(formateddate[0] == formatednow[0]){
        if(formateddate[1] == formatednow[1]){
            if(formateddate[2] == formatednow[2]){
                if(datehour[0] == nowhour[0]){
                    if(datehour[1] == nowhour[1]){
                        return 'right now'
                    }
                    else{
                        return `${nowhour[1]-datehour[1]}m`
                    }
                }
                else{
                    return `${nowhour[0]-datehour[0]}h`
                }
            }
            else{
                let day = (formatednow[2]-formateddate[2]) > 1 ? 'days' : 'day';
                return `${formatednow[2]-formateddate[2]} ${day}`
            }
        }
        else{
            let month = (formatednow[1]-formateddate[1]) > 1 ? 'months' : 'month';
            return `${formatednow[1]-formateddate[1]} ${month}`
        }
    }
    else {
        let year = (formatednow[0]-formateddate[0]) > 1 ? 'years' : 'year';
        return `${formatednow[0]-formateddate[0]} ${year}`
    }
}

export { valueToSimpleValue, dateToSimpleDate }