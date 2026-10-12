const homeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>'
const profileIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></svg>'
const nav = id => `<span class="nav-destination"><span class="glyph-wrap">${homeIcon}</span>主页</span><span class="nav-destination active"><span class="glyph-wrap"><img src="./${id}/glyph.svg" alt=""/></span>Agent</span><span class="nav-destination"><span class="glyph-wrap">${profileIcon}</span>我的</span>`

const concepts = await fetch('./concepts.json').then(response => {
  if (!response.ok) throw new Error('无法加载图标方案')
  return response.json()
})
const container = document.querySelector('#concepts')
let selectedId = 'fox'
for (const [index, concept] of concepts.entries()) {
  const card = document.createElement('article')
  card.className = 'concept-card'
  card.dataset.id = concept.id
  card.innerHTML = `<div class="concept-card-top"><span class="concept-number">0${index + 1}</span><span class="concept-en">${concept.en}</span></div><div class="hero-stage"><div class="app-icon"><img src="./${concept.id}/mark.svg" alt="${concept.name} App 图标"/></div></div><div class="concept-info"><h2>${concept.name}</h2><span class="concept-type">${concept.type}</span><p class="concept-description">${concept.description}</p></div><div class="usage-preview"><div class="usage-caption"><span>AGENT / 头像与导航</span><span>24 PX</span></div><div class="avatar-sample"><img src="./${concept.id}/mark.svg" alt=""/><div><strong>Aera Agent</strong><small>你的金融助手</small></div></div><div class="nav-sample" aria-hidden="true">${nav(concept.id)}</div></div><button class="choose-button" aria-pressed="false" aria-label="预览${concept.name}方案"><span>在界面中预览</span><span aria-hidden="true">↗</span></button>`
  card.querySelector('button').addEventListener('click', () => {
    select(concept.id)
    document.querySelector('#context-preview').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
  })
  container.append(card)
}

function select(id) {
  const selected = concepts.find(concept => concept.id === id)
  if (!selected) return
  selectedId = id
  for (const card of document.querySelectorAll('.concept-card')) {
    const active = card.dataset.id === id
    card.classList.toggle('selected', active)
    card.querySelector('button').setAttribute('aria-pressed', String(active))
    card.querySelector('.choose-button > span').textContent = active ? '正在预览此方案' : '在界面中预览'
  }
  for (const image of document.querySelectorAll('.selected-mark')) image.src = `./${id}/mark.svg`
  const descriptions = {
    orbit: ['轨道 A，', '精密而从容。'],
    fox: ['银狐，', '你的智慧伙伴。'],
    owl: ['月光猫头鹰，', '把每一步看清。'],
    whale: ['浮光鲸，', '陪你从容前行。'],
  }
  const heading = document.querySelector('#preview-title')
  heading.replaceChildren(document.createTextNode(descriptions[id][0]), document.createElement('br'), document.createTextNode(descriptions[id][1]))
  document.querySelector('#preview-description').textContent = selected.description
  document.querySelector('.phone-nav').innerHTML = nav(id)
  updateDownload()
  document.querySelector('#download-mark').href = `./${id}/mark.svg`
  document.querySelector('#download-glyph').href = `./${id}/glyph.svg`
}

for (const button of document.querySelectorAll('[data-surface]')) {
  button.addEventListener('click', () => {
    document.body.classList.toggle('white-surface', button.dataset.surface === 'white')
    for (const item of document.querySelectorAll('[data-surface]')) {
      const active = item === button
      item.classList.toggle('active', active)
      item.setAttribute('aria-pressed', String(active))
    }
    updateDownload()
  })
}
function updateDownload() {
  const name = document.body.classList.contains('white-surface') ? 'app-icon-white' : 'app-icon'
  document.querySelector('#download-icon').href = `./${selectedId}/${name}.png`
}
select('fox')
