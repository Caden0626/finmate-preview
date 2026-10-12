const concepts = await (await fetch('./concepts.json')).json()
let selected = concepts.find(concept => concept.id === 'fold-f') || concepts[0]
let inverse = false
function softenBrandWords() {
  const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) if (/FinMate|FINMATE/.test(walker.currentNode.textContent) && !walker.currentNode.parentElement.closest('.finmate-name')) nodes.push(walker.currentNode)
  for (const node of nodes) {
    const fragment = document.createDocumentFragment()
    for (const part of node.textContent.split(/(FinMate|FINMATE)/g)) {
      if (/^(FinMate|FINMATE)$/.test(part)) { const span = document.createElement('span'); span.className = 'finmate-name'; span.textContent = part; fragment.append(span) }
      else fragment.append(part)
    }
    node.replaceWith(fragment)
  }
}
function render() {
  if (['fold-f', 'fin'].includes(selected.id)) document.querySelector('.original-studies').open = true
  for (const card of document.querySelectorAll('.concept-card')) {
    const active = card.dataset.id === selected.id
    card.classList.toggle('is-selected', active)
    card.querySelector('.choose-button').setAttribute('aria-pressed', String(active))
  }
  for (const image of document.querySelectorAll('.context-glyph')) image.src = `./${selected.id}/glyph.svg`
  for (const image of document.querySelectorAll('.context-app-icon')) image.src = `./${selected.id}/app-icon${inverse ? '-inverse' : ''}.svg`
  document.querySelector('#selected-description').textContent = selected.detail
  for (const button of document.querySelectorAll('[data-tone]')) button.setAttribute('aria-pressed', String((button.dataset.tone === 'inverse') === inverse))
  const link = document.querySelector('#download-icon')
  link.href = `./${selected.id}/app-icon${inverse ? '-inverse' : ''}.png`
  link.download = `FinMate-${selected.id}${inverse ? '-inverse' : ''}.png`
  softenBrandWords()
}
for (const card of document.querySelectorAll('.concept-card')) card.querySelector('button').addEventListener('click', () => {
  selected = concepts.find(concept => concept.id === card.dataset.id)
  inverse = false
  render()
})
for (const button of document.querySelectorAll('[data-tone]')) button.addEventListener('click', () => {
  inverse = button.dataset.tone === 'inverse'
  render()
})
render()
