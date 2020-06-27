const strInRegex = (str, addStr) => { return new RegExp("^ ?" + str + " ?"+addStr+" ?", "i") }

const idleStrRegex = (str) => { return new RegExp("^ ?" + str + " ?", "i") }

const wordBrRegex = (str) => { return new RegExp("^ ?" + str + "\\b", "i") }

module.exports = { strInRegex, idleStrRegex, wordBrRegex }