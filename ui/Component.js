module.exports = function (makeChild) {
    return function (opts = {}, protocol) {
        const el = document.createElement("div")
        const shadow = el.attachShadow({ mode: "closed" })

        shadow.append(...makeChild(opts, protocol))

        return el
    }
}