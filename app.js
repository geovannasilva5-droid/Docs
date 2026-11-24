(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const today = new Date();
  const day = (offset = 0) => { const d = new Date(today); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
  const formatDate = (value, options = { day: '2-digit', month: 'short' }) => new Intl.DateTimeFormat('pt-BR', options).format(new Date(`${value}T12:00:00`));
  const money = value => Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const seeds = {
    offers: [
      { id: 'lucas', driver: 'Lucas Silva', initials: 'LS', origin: 'Residencial Jardim', destination: 'IFTO — Campus Paraíso', date: day(1), time: '07:00', seats: 3, price: 8, rating: '4,9', reviews: 32, car: 'Chevrolet Onix', note: 'Posso buscar perto da praça do Residencial Jardim.', tint: '' },
      { id: 'mariana', driver: 'Mariana Costa', initials: 'MC', origin: 'Setor Sul', destination: 'IFTO — Campus Paraíso', date: day(1), time: '07:10', seats: 2, price: 7, rating: '4,8', reviews: 18, car: 'Hyundai HB20', note: 'Saída perto da avenida principal.', tint: 'warm' },
      { id: 'rafael', driver: 'Rafael Oliveira', initials: 'RO', origin: 'Jardim América', destination: 'IFTO — Campus Paraíso', date: day(1), time: '07:20', seats: 1, price: 8, rating: '4,7', reviews: 14, car: 'Fiat Argo', note: 'Tenho espaço para mochila.', tint: '' }
    ],
    mine: [
      { id: 'my-lucas', offerId: 'lucas', kind: 'request', driver: 'Lucas Silva', origin: 'Residencial Jardim', destination: 'IFTO — Campus Paraíso', date: day(1), time: '07:00', price: 8, status: 'Pendente' },
      { id: 'past-ride', kind: 'offer', driver: 'Você dirigindo', origin: 'Setor Sul', destination: 'IFTO — Campus Paraíso', date: day(-4), time: '06:50', price: 6, status: 'Concluída', rated: false }
    ],
    messages: [
      { text: 'Oi, Ana! Vi sua solicitação 😊', sent: false, time: '07:38' },
      { text: 'Posso te buscar perto da praça do Residencial Jardim.', sent: false, time: '07:40' },
      { text: 'Oi, Lucas! Esse ponto funciona muito bem, obrigada!', sent: true, time: '07:42' }
    ], alerts: []
  };
  let data;
  try { data = JSON.parse(localStorage.getItem('partiu-aula-v1')) || seeds; } catch { data = seeds; }
  data.offers ||= seeds.offers; data.mine ||= seeds.mine; data.messages ||= seeds.messages; data.alerts ||= [];
  let currentTab = 'proximas';
  let lastSearch = { origin: '', destination: '', date: day(1), time: '07:00' };

  function save() { localStorage.setItem('partiu-aula-v1', JSON.stringify(data)); }
  function notify(message, kind = 'success') {
    const toast = document.createElement('div'); toast.className = `toast ${kind === 'error' ? 'error' : ''}`;
    toast.innerHTML = `<span class="toast-mark" aria-hidden="true">${kind === 'error' ? '!' : '✓'}</span><span>${escapeHtml(message)}</span>`;
    $('#toast-region').append(toast); setTimeout(() => toast.remove(), 3800);
  }
  function go(page) {
    const target = $(`#page-${page}`); if (!target) return;
    $$('.page').forEach(el => { el.hidden = el !== target; el.classList.toggle('active', el === target); });
    $$('[data-page]').forEach(el => el.classList.toggle('active', el.dataset.page === page && el.classList.contains('nav-link')));
    $$('.mobile-link').forEach(el => el.classList.toggle('active', el.dataset.page === page));
    const labels = { inicio: 'Início', buscar: 'Buscar carona', oferecer: 'Oferecer carona', viagens: 'Minhas caronas', mensagens: 'Mensagens', perfil: 'Meu perfil' };
    $('#page-label').textContent = labels[page] || 'Início';
    if (page === 'viagens') renderMine(); if (page === 'inicio') renderHome();
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function avatarClass(item) { return item.tint === 'warm' ? ' warm' : ''; }
  function offerCard(item, compact = false) {
    return `<article class="ride-card"><div class="ride-card-top"><span class="driver-avatar${avatarClass(item)}">${escapeHtml(item.initials || 'PA')}</span><div class="driver-info"><strong>${escapeHtml(item.driver)}</strong><small>${escapeHtml(item.origin)} → ${escapeHtml(item.destination.replace(' — Campus Paraíso', ' → IFTO'))}</small></div><span class="rating">★ ${escapeHtml(item.rating || '5,0')} <span style="color:#9aa49d">(${item.reviews || 0})</span></span></div><div class="ride-route"><span class="route-dot"></span><span>${escapeHtml(item.origin)}</span><span class="route-rule"></span><span class="route-dot destination"></span><span>${escapeHtml(item.destination)}</span></div><div class="ride-bottom"><div class="ride-meta"><span><strong>${escapeHtml(item.time)}</strong> · ${formatDate(item.date)}</span><span>${escapeHtml(item.seats)} ${Number(item.seats) === 1 ? 'vaga' : 'vagas'}</span><strong>${money(item.price)}</strong></div><button class="${compact ? 'ride-card-action' : 'ride-detail-link'}" data-detail="${escapeHtml(item.id)}">${compact ? 'Ver detalhes' : 'Detalhes →'}</button></div></article>`;
  }
  function renderHome() {
    const available = data.offers.filter(o => o.date >= day(0)).slice(0, 2);
    $('#home-rides').innerHTML = available.length ? available.map(o => offerCard(o, true)).join('') : '<div class="empty-state"><h3>Novas caronas em breve</h3><p>Volte mais tarde para encontrar opções no seu caminho.</p></div>';
    const count = data.mine.filter(r => r.date >= day(0)).length; $('#ride-count').textContent = count;
  }
  function renderResults(results = data.offers) {
    const root = $('#search-results'); $('#result-count').textContent = `${results.length} ${results.length === 1 ? 'opção encontrada' : 'opções encontradas'}`;
    if (results.length) { root.innerHTML = results.map(o => offerCard(o)).join(''); return; }
    root.innerHTML = `<div class="empty-state"><div class="empty-symbol" aria-hidden="true">⌕</div><h3>Nenhuma carona encontrada para esta rota</h3><p>Tente outro horário ou ative um alerta para receber novidades quando surgir uma vaga.</p><button class="button button-outline" id="alert-button">＋ Ativar alerta de novas vagas</button></div>`;
    $('#alert-button').addEventListener('click', () => { const key = `${lastSearch.origin}|${lastSearch.destination}|${lastSearch.date}`; if (!data.alerts.includes(key)) data.alerts.push(key); save(); notify('Alerta ativado. Avisaremos quando houver uma nova carona compatível.'); });
  }
  function searchOffers(values) {
    lastSearch = values;
    const needle = (s) => s.trim().toLocaleLowerCase('pt-BR');
    let results = data.offers.filter(o => o.date === values.date && o.date >= day(0) && o.seats > 0);
    if (values.origin) results = results.filter(o => needle(o.origin).includes(needle(values.origin)) || needle(values.origin).includes(needle(o.origin)));
    if (values.destination) results = results.filter(o => needle(o.destination).includes(needle(values.destination)) || needle(values.destination).includes(needle(o.destination)));
    if (values.time) results = results.filter(o => o.time >= values.time);
    $('#results-title').textContent = results.length ? 'Caronas disponíveis' : 'Vamos tentar outro caminho?';
    $('#results-eyebrow').textContent = results.length ? 'BOAS OPÇÕES PARA VOCÊ' : 'NÃO ENCONTRAMOS UMA OPÇÃO';
    renderResults(results); $('#results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function renderMine() {
    const upcoming = currentTab === 'proximas'; const list = data.mine.filter(r => upcoming ? r.date >= day(0) : r.date < day(0));
    $('#upcoming-count').textContent = data.mine.filter(r => r.date >= day(0)).length; $('#history-count').textContent = data.mine.filter(r => r.date < day(0)).length;
    $$('.tab').forEach(t => { const on = t.dataset.tab === currentTab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
    const root = $('#my-rides');
    if (!list.length) { root.innerHTML = `<div class="empty-rides"><div class="empty-symbol" aria-hidden="true">▤</div><h3>${upcoming ? 'Você ainda não tem caronas próximas' : 'Seu histórico está vazio'}</h3><p>${upcoming ? 'Encontre uma vaga ou publique seu trajeto para começar.' : 'As viagens concluídas aparecerão aqui.'}</p>${upcoming ? '<button class="button button-primary" data-page="buscar">Buscar carona</button>' : ''}</div>`; return; }
    root.innerHTML = list.map(r => `<article class="my-ride"><span class="ride-date-box"><strong>${formatDate(r.date, { day: '2-digit' }).replace('.', '')}</strong><small>${formatDate(r.date, { month: 'short' }).replace('.', '').toUpperCase()}</small></span><div class="my-ride-info"><h3>${escapeHtml(r.origin)} <span aria-hidden="true">→</span> ${escapeHtml(r.destination)}</h3><p>${formatDate(r.date, { weekday: 'long', day: '2-digit', month: 'long' })} · ${escapeHtml(r.time)} · ${money(r.price)} por pessoa</p><p class="ride-subline">${r.kind === 'request' ? `Motorista: ${escapeHtml(r.driver)}` : 'Oferecida por você'}</p></div><span class="status ${r.status === 'Pendente' ? 'status-pending' : r.status === 'Concluída' ? 'status-completed' : 'status-confirmed'}">${escapeHtml(r.status)}</span><div class="ride-actions">${r.status !== 'Concluída' ? '<button class="small-action" data-page="mensagens">Abrir chat</button>' : (!r.rated ? `<button class="small-action" data-rate="${escapeHtml(r.id)}">Avaliar</button>` : '<span class="small-action">★ Avaliada</span>')}</div></article>`).join('');
  }
  function openModal(content, onReady) {
    const root = $('#modal-root'); root.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${content}</section></div>`;
    const backdrop = $('.modal-backdrop', root); backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
    $('.modal-close', root)?.addEventListener('click', closeModal);
    onReady?.(root); $('.modal-close', root)?.focus();
  }
  function closeModal() { $('#modal-root').innerHTML = ''; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#modal-root').firstElementChild) closeModal(); });
  function detail(id) {
    const ride = data.offers.find(o => o.id === id); if (!ride) return;
    const already = data.mine.some(r => r.offerId === id && r.status !== 'Cancelada');
    openModal(`<div class="modal-head"><div><p class="eyebrow">DETALHES DA VIAGEM</p><h2 id="modal-title">Uma carona no seu caminho</h2></div><button class="modal-close" aria-label="Fechar">×</button></div><div class="modal-driver"><span class="driver-avatar${avatarClass(ride)}">${escapeHtml(ride.initials || 'PA')}</span><span><strong>${escapeHtml(ride.driver)}</strong><small>★ ${escapeHtml(ride.rating)} · ${escapeHtml(ride.reviews)} avaliações · ${escapeHtml(ride.car || 'Estudante motorista')}</small></span></div><div class="detail-grid"><div class="detail-item"><small>DATA E HORÁRIO</small><strong>${formatDate(ride.date, { weekday: 'short', day: '2-digit', month: 'long' })} · ${escapeHtml(ride.time)}</strong></div><div class="detail-item"><small>CONTRIBUIÇÃO</small><strong>${money(ride.price)} <span style="font-weight:400;color:#87948c">por pessoa</span></strong></div><div class="detail-item"><small>VAGAS DISPONÍVEIS</small><strong>${escapeHtml(ride.seats)} ${Number(ride.seats) === 1 ? 'vaga' : 'vagas'}</strong></div><div class="detail-item"><small>AVALIAÇÃO</small><strong>★ ${escapeHtml(ride.rating)} / 5</strong></div></div><div class="modal-route"><div><span class="route-dot"></span><strong>${escapeHtml(ride.origin)}</strong></div><div><span class="route-dot destination"></span><strong>${escapeHtml(ride.destination)}</strong></div></div><p class="modal-note">${escapeHtml(ride.note || 'Combine os detalhes do ponto de encontro pelo chat depois de solicitar a vaga.')}</p><div class="modal-actions"><button class="button button-outline modal-close">Voltar</button><button class="button button-primary" id="request-ride" ${already || !Number(ride.seats) ? 'disabled style="opacity:.55;cursor:not-allowed"' : ''}>${already ? 'Solicitação enviada' : 'Solicitar carona'}</button></div>`, root => {
      $('#request-ride', root)?.addEventListener('click', () => confirmRequest(ride));
    });
  }
  function confirmRequest(ride) {
    openModal(`<div class="modal-head"><div><p class="eyebrow">CONFIRME SUA SOLICITAÇÃO</p><h2 id="modal-title">Tudo certo para pedir sua vaga?</h2></div><button class="modal-close" aria-label="Fechar">×</button></div><div class="confirm-copy"><div class="confirm-icon" aria-hidden="true">?</div><p>Vamos enviar seu pedido para <strong>${escapeHtml(ride.driver)}</strong>. A vaga ficará com status <strong>Pendente</strong> enquanto aguarda a confirmação do motorista.</p><p><strong>${escapeHtml(ride.origin)} → ${escapeHtml(ride.destination)}</strong><br>${formatDate(ride.date)} às ${escapeHtml(ride.time)} · ${money(ride.price)}</p></div><div class="modal-actions"><button class="button button-outline modal-close">Agora não</button><button class="button button-primary" id="confirm-request">Confirmar pedido</button></div>`, root => $('#confirm-request', root).addEventListener('click', () => {
      data.mine.unshift({ id: `req-${Date.now()}`, offerId: ride.id, kind: 'request', driver: ride.driver, origin: ride.origin, destination: ride.destination, date: ride.date, time: ride.time, price: ride.price, status: 'Pendente' }); save(); closeModal(); renderHome(); notify('Solicitação enviada! Ela já está em Minhas Caronas.');
    }));
  }
  function fieldError(field, message) { field.classList.add('invalid'); const error = $('.field-error', field); if (error) error.textContent = message; $('input,select,textarea', field)?.focus(); }
  function validateOffer(form) {
    let valid = true; $$('.field', form).forEach(field => { field.classList.remove('invalid'); const err = $('.field-error', field); if (err) err.textContent = ''; const input = $('input,select,textarea', field); if (input?.required && !input.value.trim()) { fieldError(field, 'Preencha este campo para continuar.'); valid = false; } });
    const dateField = $('input[name="date"]', form)?.closest('.field'); const date = $('input[name="date"]', form)?.value;
    if (date && date < day(0)) { fieldError(dateField, 'Escolha hoje ou uma data futura.'); valid = false; }
    const price = Number($('input[name="price"]', form)?.value); if ($('input[name="price"]', form)?.value && price < 0) { fieldError($('input[name="price"]', form).closest('.field'), 'O valor não pode ser negativo.'); valid = false; }
    return valid;
  }
  function submitOffer(form) {
    if (!validateOffer(form)) { notify('Revise os campos destacados e tente novamente.', 'error'); return; }
    const f = new FormData(form); const item = { id: `offer-${Date.now()}`, driver: 'Ana Clara', initials: 'AC', origin: f.get('origin'), destination: f.get('destination'), date: f.get('date'), time: f.get('time'), seats: Number(f.get('seats')), price: Number(f.get('price')), rating: '4,8', reviews: 12, car: 'Veículo informado pelo motorista', note: f.get('notes') || 'Combine o ponto exato de encontro pelo chat.', tint: '' };
    data.offers.unshift(item); data.mine.unshift({ id: `mine-${Date.now()}`, kind: 'offer', driver: 'Você dirigindo', origin: item.origin, destination: item.destination, date: item.date, time: item.time, price: item.price, status: 'Confirmada' }); save(); form.reset(); renderHome(); go('buscar'); $('#search-origin').value = item.origin; $('#search-destination').value = item.destination; $('#search-date').value = item.date; $('#search-time').value = '00:00'; searchOffers({ origin: item.origin, destination: item.destination, date: item.date, time: '00:00' }); notify('Carona publicada e disponível na busca!');
  }
  function rateRide(id) {
    const ride = data.mine.find(r => r.id === id); if (!ride) return;
    openModal(`<div class="modal-head"><div><p class="eyebrow">SUA EXPERIÊNCIA</p><h2 id="modal-title">Como foi a carona?</h2></div><button class="modal-close" aria-label="Fechar">×</button></div><p style="color:#75847b;font-size:11px">Sua avaliação ajuda estudantes a escolherem com mais confiança.</p><form id="rating-form"><fieldset style="border:0;padding:0;margin:18px 0"><legend style="font-weight:700;font-size:11px;margin-bottom:10px">Sua nota</legend><div class="stars" role="radiogroup" aria-label="Nota de 1 a 5 estrelas">${[1,2,3,4,5].map(n => `<button type="button" class="star-button" role="radio" aria-checked="${n === 5}" data-star="${n}" aria-label="${n} ${n === 1 ? 'estrela' : 'estrelas'}">★</button>`).join('')}</div></fieldset><label class="field">Comentário <span class="optional">(opcional)</span><textarea name="comment" rows="3" placeholder="Conte como foi sua experiência."></textarea></label><div class="modal-actions"><button class="button button-primary" type="submit">Enviar avaliação</button></div></form>`, root => {
      let score = 5; const stars = $$('.star-button', root);
      stars.forEach(b => b.addEventListener('click', () => { score = Number(b.dataset.star); stars.forEach(s => { s.setAttribute('aria-checked', String(Number(s.dataset.star) === score)); s.style.color = Number(s.dataset.star) <= score ? '#d59a2b' : '#cbd3cc'; }); }));
      $('#rating-form', root).addEventListener('submit', e => { e.preventDefault(); ride.rated = true; ride.score = score; save(); closeModal(); renderMine(); notify('Avaliação registrada. Obrigada por compartilhar!'); });
    });
  }
  function renderMessages() {
    $('#chat-messages').innerHTML = `<p class="chat-date">HOJE, ${formatDate(day(0), { day: '2-digit', month: 'long' }).toUpperCase()}</p>` + data.messages.map(m => `<div class="message ${m.sent ? 'sent' : 'received'}"><span>${escapeHtml(m.text)}</span><time>${escapeHtml(m.time)}${m.sent ? ' <b>✓✓</b>' : ''}</time></div>`).join('');
    $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  }
  document.addEventListener('click', e => {
    const nav = e.target.closest('[data-page]'); if (nav) { e.preventDefault(); go(nav.dataset.page); return; }
    const details = e.target.closest('[data-detail]'); if (details) detail(details.dataset.detail);
    const rating = e.target.closest('[data-rate]'); if (rating) rateRide(rating.dataset.rate);
  });
  $('#search-date').value = day(1);
  $('#search-origin').value = 'Residencial Jardim';
  $('#search-form').addEventListener('submit', e => { e.preventDefault(); const f = new FormData(e.currentTarget); searchOffers({ origin: f.get('origin'), destination: f.get('destination'), date: f.get('date'), time: f.get('time') }); });
  $('#offer-form').addEventListener('submit', e => { e.preventDefault(); submitOffer(e.currentTarget); });
  $('#offer-form input[name="date"]').min = day(0);
  $$('.tab').forEach(t => t.addEventListener('click', () => { currentTab = t.dataset.tab; renderMine(); }));
  $('#chat-form').addEventListener('submit', e => { e.preventDefault(); const input = $('#chat-input'); const text = input.value.trim(); if (!text) return; data.messages.push({ text, sent: true, time: new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date()) }); save(); renderMessages(); input.value = ''; });
  renderResults(data.offers.filter(o => o.date >= day(0)));
  renderHome(); renderMine(); renderMessages();
})();
