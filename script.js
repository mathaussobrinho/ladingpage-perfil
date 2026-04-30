// ============================================
// PROJETOS - Servidor: 72.61.36.102 | mathaus.site
// Listados via SSH a partir do nginx
// ============================================

const projetos = [
  {
    nome: 'FuniPro Shop',
    url: 'https://funipro.shop',
    descricao: 'Plataforma web com frontend em tempo real. Sistema completo com proxy e SSL.',
  },
  {
    nome: 'SysBarber',
    url: 'https://sysbarber.com.br/test/login',
    descricao: 'Sistema para barbearias: agendamento, API e painel administrativo integrados.',
  },
  {
    nome: 'SysBeauty',
    url: 'https://sysbeauty.com.br/test',
    descricao: 'Sistema para salões de beleza: API, uploads e frontend com Vite.',
  },
  {
    nome: 'Puxa Trem',
    url: 'https://capclient.fun',
    descricao: 'Sistema que busca estabelecimentos por tipo (barbearia, hotel, restaurante, farmácia etc.), estado e cidade e retorna endereço, telefone, site e demais dados dos resultados.',
  },
  {
    nome: 'Zé dos Pintos',
    url: 'https://zedospintos.com.br',
    descricao: 'Site de vendas da distribuidora de pintinhos – e-commerce para compra de pintinhos.',
  },
  {
    nome: 'Sysmath',
    url: 'https://sysmath.com.br',
    descricao: 'Site da Sysmath – desenvolvimento de sistemas, sites e soluções digitais sob medida.',
  },
  {
    nome: 'Brashero',
    url: 'https://relatorio.fun',
    descricao: 'Jogo de gerenciamento de futebol estilo Brasfoot: monte seu time, colete jogadores raros e dispute partidas. Hospedado no servidor.',
  },
  {
    nome: 'Lanne Head Spa',
    url: 'https://lanneheadspa.com/',
    descricao: 'Site institucional do primeiro Head Spa de Belo Horizonte (Pampulha): terapia capilar e corporal, serviços, localização e agendamento via WhatsApp.',
  },
  {
    nome: 'Atelier da Madeira',
    url: 'https://atelierdamadeira.com.br/',
    descricao:
      'Site institucional da Atelier Madeira – marcenaria de luxo: apresentação dos trabalhos em madeira, móveis sob medida e portfólio da marca.',
  },
  {
    nome: 'Bella Slim',
    url: 'https://bellaslim.com.br/',
    descricao: 'Presença digital da Bella Slim — emagrecimento inteligente: conteúdo institucional e jornada do cliente na web (hospedado na VPS).',
  },
  {
    nome: 'Intranet Royal Hotéis',
    url: 'https://app.sysmath.cloud/',
    descricao:
      'Portal intranet corporativo da rede Royal Hotéis (landing institucional + tela de login). Acesso ao painel é restrito; não há credencial de demonstração pública.',
    credencialDemo: false,
  },
  {
    nome: 'diZparo',
    url: 'https://dizparo.com.br/',
    descricao:
      'Sistema multi-tenant para disparo de mensagens por WhatsApp e e-mail: administrador, gestão de usuários e módulos, cadastro de clientes e organização dos envios por conta.',
  },
  {
    nome: 'VisoHelp',
    url: 'https://app.dizparo.com.br/',
    descricao:
      'Service desk e inventário de TI: gestão de tickets e SLA, inventário automático de dispositivos, monitoramento com alertas e uso em web, desktop, mobile e agente Windows.',
    credencialDemo: false,
  },
];

function renderProjetos() {
  const grid = document.getElementById('projetos-grid');
  if (!grid) return;

  grid.innerHTML = projetos
    .map((p) => {
      const isHttp = /^https?:\/\//i.test(p.url);
      const target = isHttp ? '_blank' : '_self';
      const rel = isHttp ? 'noopener noreferrer' : '';
      const badge =
        p.credencialDemo === false
          ? '<span class="projeto-badge">Sem usuário de demonstração · área restrita após login</span>'
          : '';
      const relAttr = rel ? ` rel="${rel}"` : '';
      return `
    <article class="projeto-card">
      <a href="${escapeHtml(p.url)}" target="${target}"${relAttr} class="projeto-link">
        <span class="projeto-num"></span>
        <h3 class="projeto-nome">${escapeHtml(p.nome)}</h3>
        <p class="projeto-desc">${escapeHtml(p.descricao)}</p>
        ${badge}
        <span class="projeto-arrow">→</span>
      </a>
    </article>
  `;
    })
    .join('');

  document.querySelectorAll('.projeto-num').forEach((el, i) => {
    el.textContent = String(i + 1).padStart(2, '0');
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Menu mobile
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.nav-links')?.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links')?.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animação do contador (sobre)
function animateValue(el, end) {
  if (isNaN(end)) return;
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(easeOut * end);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const num = entry.target;
        const count = parseInt(num.getAttribute('data-count'), 10);
        if (!isNaN(count)) animateValue(num, count);
        observer.unobserve(num);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num[data-count]').forEach((el) => observer.observe(el));

// Inicialização
renderProjetos();
