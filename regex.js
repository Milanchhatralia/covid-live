const customRegex = (str, addStr) => { return new RegExp("^ ?" + str + " ?"+addStr+" ?", "i") }

const regex = (str) => { return new RegExp("^ ?" + str + " ?", "i") }

module.exports = { customRegex, regex }