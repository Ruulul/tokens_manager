module.exports = function (makeChild) {
    return function (opts = {}, protocol) {
        const el = new DocumentFragment()
        el.append(...makeChild(opts, protocol))
        return el
    }
}