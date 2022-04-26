function getRows( qtd, size ){

    let rows = [];
    let index = 0;

    for(let i = 0; i < size; i++){
        let row = [];
        for(let j = 0; j < qtd/size; j++){
            row.push(index);
            index++
        }
        rows.push(row);
    }

    return rows;
}


  export { getRows }