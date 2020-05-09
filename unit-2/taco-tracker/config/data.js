const tacos =[];

module.exports = {
    getAll,
    create,
    deleteOne,
    getOne,
    update
}

function getAll() {
    return tacos;
}

function create(taco) {
    tacos.push(taco);
}

function deleteOne(tacoIdx) {
    tacos.splice(tacoIdx, 1);
}

function getOne(tacoIdx) {
    return tacos[tacoIdx];
}

function update(tacoIdx, taco) {
    tacos[tacoIdx] = taco;
}
