const corner_names = [
  'none',
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle center',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right'
]

class CornerPicker extends HTMLElement {

  static get observedAttributes() {
    return ['value']
  }

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = 'div { display: flex} .box { border: 0.5px solid white; width:10px; height:10px; margin: 3px;} .selected { background-color:white }'
    this.shadowRoot.appendChild(style)

    // create 3 rows ...
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row = document.createElement('div')
      this.shadow.appendChild(row)

      // ... with 3 boxes
      for (let boxIndex = 0; boxIndex < 3; boxIndex++) {
        const box = document.createElement('div')
        const value = rowIndex * 3 + boxIndex + 1
        box.setAttribute('value', value)
        box.classList.add('box')
        box.addEventListener('click', ({ target }) => this.value = target.getAttribute('value'))
        row.appendChild(box)
      }
    }
  }

  get value() {
    return this.getAttribute('value')
  }

  set value(newValue) {
    this.setAttribute('value', newValue)
  }

  get cornerName() {
    return corner_names[this.getAttribute('value')]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value' && oldValue !== newValue) {
      const boxes = this.shadowRoot.querySelectorAll('.box')
      boxes.forEach((box, index) => newValue-1 === index ? box.classList.add('selected') : box.classList.remove('selected'))
      this.dispatchEvent(new Event('change'))
    }
  }


  connectedCallback() {
    this.value = this.getAttribute('value') || 1
  }
}

customElements.define('corner-picker', CornerPicker)

module.exports = { CornerPicker }