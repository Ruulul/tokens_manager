const Component = require('./Component')

module.exports = Component(function (opts = {}) {
    let count = opts.value ?? 0

    const plus = document.createElement("button")
    plus.textContent = '+'
    const minus = document.createElement("button")
    minus.textContent = '-'
    const display = document.createElement("span")
    display.textContent = count

    plus.onclick = _ => {
        display.textContent = ++count
    }
    minus.onclick = _ => {
        display.textContent = --count
    }

    const theme = document.createElement("style")
    theme.textContent = opts.theme ?? getTheme()

    return [theme, minus, display, plus]
})

function getTheme() {
    return `
    :host {
        display: inline-block;
        outline: red;
        margin: 0.5em;
    }
    span {
        margin: 0.5em;
    }
    `
}