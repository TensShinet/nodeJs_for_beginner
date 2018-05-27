const fc = [
    "sad",
    "asd",
    "bnm",
]

exports.getFc = function() {
    var idx = Math.floor(Math.random() * fc.length)
    return fc[idx]
}
