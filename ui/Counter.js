module.exports = function (opts = {}) {
    let count = opts.value ?? 0

    const root = document.createElement("div")
    root.style.display = 'inline-block'
    root.style.margin = '0.5em'

    const plus = document.createElement("button")
    plus.textContent = '+'
    const minus = document.createElement("button")
    minus.textContent = '-'
    const display = document.createElement("span")
    display.textContent = count
    display.style.margin = '0.5em'

    plus.onclick = _ => {
        display.textContent = ++count
    }
    minus.onclick = _ => {
        display.textContent = --count
    }

    root.append(minus, display, plus)
    return root
}