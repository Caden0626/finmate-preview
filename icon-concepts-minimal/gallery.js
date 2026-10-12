const home = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>'
const profile = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>'
const nav = id => `<span class="nav-destination"><span class="glyph-wrap">${home}</span>主页</span><span class="nav-destination active"><span class="glyph-wrap"><img src="./${id}/glyph.svg" alt=""/></span>Agent</span><span class="nav-destination"><span class="glyph-wrap">${profile}</span>我的</span>`
const response = await fetch('./concepts.json')
if (!response.ok) throw new Error('无法加载图标方案')
const concepts = await response.json()
for (const [index, concept] of concepts.entries()) {
  const card = document.createElement('article')
  card.className = 'concept-card'
  card.dataset.id = concept.id
  card.innerHTML = `<div class="concept-card-top"><span class="concept-number">0${index + 1}</span><span class="concept-en">${concept.en}</span></div><div class="hero-stage"><div class="app-icon"><img src="./${concept.id}/mark.svg" alt="${concept.name} App 图标"/></div></div><div class="concept-info"><h2>${concept.name}</h2><span class="concept-type">${concept.type}</span><p class="concept-description">${concept.description}</p></div><div class="usage-preview"><div class="usage-caption"><span>AGENT / 头像与导航</span><span>24 PX</span></div><div class="avatar-sample"><img src="./${concept.id}/mark.svg" alt=""/><div><strong>Aera Agent</strong><small>你的金融助手</small></div></div><div class="nav-sample" aria-hidden="true">${nav(concept.id)}</div></div><button class="choose-button" aria-pressed="false" aria-label="预览${concept.name}方案"><span>在界面中预览</span><span aria-hidden="true">↗</span></button>`
  card.querySelector('button').addEventListener('click', () => {
    select(concept.id)
    document.querySelector('#context-preview').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  })
  document.querySelector('#concepts').append(card)
}
function select(id) {
  const selected = concepts.find(concept => concept.id === id)
  if (!selected) return
  for (const card of document.querySelectorAll('.concept-card')) {
    const active = card.dataset.id === id
    card.classList.toggle('selected', active)
    card.querySelector('button').setAttribute('aria-pressed', String(active))
    card.querySelector('.choose-button > span').textContent = active ? '正在预览此方案' : '在界面中预览'
  }
  for (const image of document.querySelectorAll('.selected-mark')) image.src = `./${id}/mark.svg`
  document.querySelector('#preview-title').replaceChildren(document.createTextNode(selected.heading[0]), document.createElement('br'), document.createTextNode(selected.heading[1]))
  document.querySelector('#preview-description').textContent = selected.description
  document.querySelector('.phone-nav').innerHTML = nav(id)
  document.querySelector('#download-icon').href = `./${id}/app-icon.png`
  document.querySelector('#download-mark').href = `./${id}/mark.svg`
  document.querySelector('#download-glyph').href = `./${id}/glyph.svg`
}
select('soft-a')
