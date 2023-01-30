module.exports = {
    wrap_dom(...elms) {
        const el = new DocumentFragment()
        el.append(...elms)
        return el
    }
}