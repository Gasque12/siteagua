/**
 * EcoClima - Vila Rezende | Piracicaba - SP
 * Funcionalidades Interativas Oficiais (JavaScript)
 * 100% Funcional no Front-End
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     Dados das 6 Soluções (Para Modais e Ações Dinâmicas)
     ========================================================================== */
  const SOLUTIONS_DATA = {
    'pelicula-termica': {
      id: 'pelicula-termica',
      name: 'Película Térmica',
      category: 'Proteção Solar e Conforto',
      icon: '☀️',
      themeBadge: 'badge-heat',
      colorClass: 'icon-heat',
      shortDesc: 'Redução expressiva do calor solar e bloqueio de raios UV em vidraças e janelas residenciais e comerciais.',
      whatIs: 'Películas de nanotecnologia e controle solar aplicadas diretamente nas faces internas dos vidros e esquadrias de portas e janelas.',
      whatSolves: 'Ambientes abafados onde o sol bate a tarde toda, desbotamento precoce de cortinas e móveis, e contas elevadas de energia com ventilador ou ar-condicionado.',
      howEcoClimaUses: 'Nossa equipe realiza medição da incidência infravermelha com termômetro laser e calcula a especificação ideal (grau de transparência e retenção térmica), realizando aplicação estanque e sem bolhas.',
      specs: ['Bloqueio de até 80% do calor por radiação', 'Filtro de 99% contra raios ultravioleta (UV)', 'Mantém a luminosidade natural sem alterar a fachada'],
      targetProblem: 'Excesso de sol'
    },
    'toldos': {
      id: 'toldos',
      name: 'Toldos e Coberturas',
      category: 'Sombra e Barreira Física',
      icon: '⛱️',
      themeBadge: 'badge-heat',
      colorClass: 'icon-heat',
      shortDesc: 'Sombreamento exterior inteligente para fachadas, varandas e vitrines comerciais na Vila Rezende.',
      whatIs: 'Estruturas articuladas, retráteis ou fixas com lona sintética marítima ou policarbonato com proteção solar integrada.',
      whatSolves: 'Incidência solar direta que esquenta paredes e pisos antes mesmo do calor penetrar no imóvel, além de proteger entradas de chuvas de vento moderadas.',
      howEcoClimaUses: 'Projetamos a extensão e inclinação dos toldos conforme a trajetória solar da Avenida Manoel Conceição e bairros vizinhos, garantindo sombra no pico do calor e recolhimento prático.',
      specs: ['Lonas com tratamento anti-mofo e proteção UV', 'Braços reforçados para ventos moderados', 'Opções retráteis manuais ou automatizadas'],
      targetProblem: 'Calor'
    },
    'calhas': {
      id: 'calhas',
      name: 'Calhas e Rufos Pluviais',
      category: 'Drenagem de Coberturas',
      icon: '🌧️',
      themeBadge: 'badge-rain',
      colorClass: 'icon-rain',
      shortDesc: 'Captação e direcionamento de grandes volumes de chuva das coberturas para evitar infiltrações.',
      whatIs: 'Canais coletores em chapa galvanizada ou alumínio sob medida, instalados no beiral dos telhados com condutores verticais de alta vazão.',
      whatSolves: 'Transbordamento de água de telhados durante as fortes chuvas de verão de Piracicaba, infiltrações em paredes, goteiras, rachaduras e erosão de quintais.',
      howEcoClimaUses: 'Calculamos a área de contribuição do telhado em metros quadrados multiplicada pelo índice pluviométrico crítico da região (229 mm em janeiro) para garantir condutores sem estrangulamento.',
      specs: ['Emendas com vedação selante de poliuretano industrial', 'Fixação reforçada anti-empenamento', 'Pintura eletrostática combinando com a fachada'],
      targetProblem: 'Água da chuva'
    },
    'captacao-chuva': {
      id: 'captacao-chuva',
      name: 'Captação de Chuva (Cisternas Urbanas)',
      category: 'Reúso e Sustentabilidade',
      icon: '💧',
      themeBadge: 'badge-rain',
      colorClass: 'icon-rain',
      shortDesc: 'Armazenamento seguro de água pluvial para rega de jardins, lavagem de calçadas e economia na conta.',
      whatIs: 'Reservatórios verticais compactos e modulares conectados aos condutores das calhas, equipados com separador mecânico de primeiras águas (first flush) e torneira de extração.',
      whatSolves: 'Desperdício de água potável em serviços gerais, alívio da sobrecarga nos bueiros no pico das tempestades e redução no valor da conta de água do SEMAE.',
      howEcoClimaUses: 'Adaptamos os reservatórios até mesmo em corredores laterais estreitos de residências e comércios da Vila Rezende, com filtro de folhas e grade anti-dengue 100% vedada.',
      specs: ['Módulos de 250L a 1.000L interligáveis', 'Filtro decantador de impurezas e folhas', 'Torneira e extravasor de segurança para galeria'],
      targetProblem: 'Acúmulo de água'
    },
    'jardim-chuva': {
      id: 'jardim-chuva',
      name: 'Jardim de Chuva (Biorretenção)',
      category: 'Drenagem Natural e Paisagismo',
      icon: '🌱',
      themeBadge: 'badge-eco',
      colorClass: 'icon-eco',
      shortDesc: 'Canteiros permeáveis com solo técnico e vegetação adaptada para absorver água no próprio lote.',
      whatIs: 'Microbacias de infiltração natural escavadas com camadas de brita, areia lavada, solo poroso e espécies botânicas tolerantes tanto a inundações temporárias quanto a períodos secos.',
      whatSolves: 'Impermeabilização excessiva do solo urbano que gera poças prolongadas em quintais, sobrecarga de calçadas e lamaçal nos períodos de chuva contínua.',
      howEcoClimaUses: 'Identificamos áreas subutilizadas de cimento ou grama compactada e convertemos em um jardim funcional que drena a água em até 2 horas pós-tempestade, enriquecendo o microclima.',
      specs: ['Camada drenante de brita graduada', 'Espécies nativas de baixa manutenção', 'Prevenção de poças e proliferação de mosquitos'],
      targetProblem: 'Acúmulo de água'
    },
    'analise-climatica': {
      id: 'analise-climatica',
      name: 'Análise Climática Personalizada',
      category: 'O Grande Diferencial EcoClima',
      icon: '🔎',
      themeBadge: 'badge-eco',
      colorClass: 'icon-eco',
      shortDesc: 'Diagnóstico técnico presencial do imóvel com medição solar e estudo do escoamento pluvial.',
      whatIs: 'Uma consultoria técnica in-loco realizada pela equipe EcoClima antes da compra de qualquer produto, analisando orientação solar, termografia e fluxo de águas pluviais.',
      whatSolves: 'Gastos errados em soluções ineficientes (como comprar toldo curto, calha subdimensionada ou película escura que não retém calor) por falta de diagnóstico prévio.',
      howEcoClimaUses: 'Levamos equipamentos de medição ao imóvel na Vila Rezende, emitimos um laudo prático com simulação de ganhos térmicos e desenhamos a solução perfeita dentro do orçamento do cliente.',
      specs: ['Mapeamento solar com bússola e carta solar', 'Termômetro infravermelho de superfícies', 'Relatório com prioridades de investimento'],
      targetProblem: 'Quero uma análise completa'
    }
  };

  /* ==========================================================================
     Element Selectors
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.querySelector('.back-to-top-btn');

  // Modais
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalAgendamento = document.getElementById('modal-agendamento');
  const modalOrcamento = document.getElementById('modal-orcamento');
  const modalSolucao = document.getElementById('modal-solucao');

  // Formulários
  const formAgendamento = document.getElementById('form-agendamento');
  const formOrcamento = document.getElementById('form-orcamento');

  // Sucesso Cards
  const successAgendamento = document.getElementById('success-agendamento');
  const successOrcamento = document.getElementById('success-orcamento');

  /* ==========================================================================
     1 & 4. Navegação e Header Fixo
     ========================================================================== */
  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Botão Voltar ao Topo (Requisito 7)
    if (backToTopBtn) {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  // Mobile Menu Toggle
  function toggleMobileMenu(forceClose = false) {
    if (!mainNav || !mobileMenuToggle) return;
    const shouldOpen = forceClose ? false : !mainNav.classList.contains('is-open');

    if (shouldOpen) {
      mainNav.classList.add('is-open');
      mobileMenuToggle.classList.add('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      navBackdrop?.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    } else {
      mainNav.classList.remove('is-open');
      mobileMenuToggle.classList.remove('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      navBackdrop?.classList.remove('is-visible');
      document.body.style.overflow = '';
    }
  }

  mobileMenuToggle?.addEventListener('click', () => toggleMobileMenu());
  navBackdrop?.addEventListener('click', () => toggleMobileMenu(true));

  // Fechar menu mobile ao clicar em qualquer link e rolagem suave
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          toggleMobileMenu(true);
          targetElem.scrollIntoView({ behavior: 'smooth' });
          // Atualiza hash sem pular
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Botões de Scroll Suave Específicos (Requisitos 5 e 6)
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-scroll-to');
      if (targetSelector) {
        const targetElem = document.querySelector(targetSelector);
        if (targetElem) {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Requisito 7: Botão Voltar ao Topo
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     Sistema Unificado de Modais (Abertura, Fechamento e Foco)
     ========================================================================== */
  function openModal(modalId) {
    if (!modalBackdrop) return;
    
    // Esconde todos os modais internos primeiro
    [modalAgendamento, modalOrcamento, modalSolucao].forEach(m => {
      if (m) m.style.display = 'none';
    });

    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    targetModal.style.display = 'flex';
    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foca no primeiro input se existir
    const firstInput = targetModal.querySelector('input:not([type="hidden"]), select, textarea, button');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    setTimeout(() => {
      [modalAgendamento, modalOrcamento, modalSolucao].forEach(m => {
        if (m) m.style.display = 'none';
      });
    }, 280);
  }

  // Event Listeners para botões que abrem modais
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      if (modalId) {
        openModal(modalId);
      }
    });
  });

  // Fechar modais com botões de fechar
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Fechar modal ao clicar fora (no backdrop)
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     Requisito 3: BOTÕES DOS PRODUTOS / SOLUÇÕES (Modais Dinâmicos)
     ========================================================================== */
  function showSolutionDetails(solutionKey) {
    const data = SOLUTIONS_DATA[solutionKey];
    if (!data || !modalSolucao) return;

    // Elementos dentro do modal de solução
    const titleEl = document.getElementById('solution-modal-title');
    const badgeEl = document.getElementById('solution-modal-badge');
    const whatIsEl = document.getElementById('solution-modal-whatis');
    const whatSolvesEl = document.getElementById('solution-modal-whatsolves');
    const howEcoClimaEl = document.getElementById('solution-modal-howecoclima');
    const specsListEl = document.getElementById('solution-modal-specs');
    const btnQuote = document.getElementById('solution-modal-btn-quote');
    const btnSchedule = document.getElementById('solution-modal-btn-schedule');

    if (titleEl) titleEl.textContent = `${data.icon} ${data.name}`;
    if (badgeEl) {
      badgeEl.textContent = data.category;
      badgeEl.className = `solution-modal-header-badge ${data.themeBadge}`;
    }
    if (whatIsEl) whatIsEl.textContent = data.whatIs;
    if (whatSolvesEl) whatSolvesEl.textContent = data.whatSolves;
    if (howEcoClimaEl) whatEcoClimaEl(howEcoClimaEl, data.howEcoClimaUses);
    
    if (specsListEl) {
      specsListEl.innerHTML = data.specs.map(s => `<li>✓ ${s}</li>`).join('');
    }

    // Ação do botão "Solicitar Orçamento Desta Solução" dentro do modal
    if (btnQuote) {
      btnQuote.onclick = () => {
        closeModal();
        setTimeout(() => {
          openModal('modal-orcamento');
          const select = document.getElementById('orc_solucao');
          if (select) {
            select.value = data.name;
          }
        }, 300);
      };
    }

    // Ação do botão "Agendar Análise Climática"
    if (btnSchedule) {
      btnSchedule.onclick = () => {
        closeModal();
        setTimeout(() => {
          openModal('modal-agendamento');
          const problemSelect = document.getElementById('principal_problema');
          if (problemSelect && data.targetProblem) {
            problemSelect.value = data.targetProblem;
          }
        }, 300);
      };
    }

    openModal('modal-solucao');
  }

  function whatEcoClimaEl(elem, text) {
    elem.textContent = text;
  }

  // Delegação de clique para todos os botões e cards de soluções
  document.querySelectorAll('[data-solution-key]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = elem.getAttribute('data-solution-key');
      if (key) {
        e.preventDefault();
        showSolutionDetails(key);
      }
    });
  });

  /* ==========================================================================
     Requisito 1 & 8: FORMULÁRIO "AGENDAR ANÁLISE" COM VALIDAÇÃO COMPLETA
     ========================================================================== */
  // Limpa erros ao digitar/alterar campo
  function setupFieldValidationClear(form) {
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => clearFieldError(input));
      input.addEventListener('change', () => clearFieldError(input));
    });
  }

  function setFieldError(field, message) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    let errorMsg = group.querySelector('.form-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'form-error-msg';
      group.appendChild(errorMsg);
    }
    errorMsg.innerHTML = `⚠️ ${message}`;
  }

  function clearFieldError(field) {
    const group = field.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  function clearAllErrors(form) {
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
  }

  // Configura data mínima para o agendamento (hoje)
  const inputDataPref = document.getElementById('data_preferencia');
  if (inputDataPref) {
    const todayStr = new Date().toISOString().split('T')[0];
    inputDataPref.min = todayStr;
  }

  if (formAgendamento) {
    setupFieldValidationClear(formAgendamento);

    formAgendamento.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(formAgendamento);

      const nome = formAgendamento.querySelector('#nome');
      const contato = formAgendamento.querySelector('#contato');
      const tipoImovel = formAgendamento.querySelector('#tipo_imovel');
      const principalProblema = formAgendamento.querySelector('#principal_problema');
      const dataPref = formAgendamento.querySelector('#data_preferencia');
      const horarioPref = formAgendamento.querySelector('#horario_preferencia');
      const observacoes = formAgendamento.querySelector('#observacoes');

      let isValid = true;
      let firstInvalid = null;

      // Validação Nome
      if (!nome.value.trim() || nome.value.trim().length < 3) {
        setFieldError(nome, 'Por favor, informe seu nome completo.');
        isValid = false;
        if (!firstInvalid) firstInvalid = nome;
      }

      // Validação Contato (E-mail ou Telefone)
      const contatoVal = contato.value.trim();
      const hasEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contatoVal);
      const digitsOnly = contatoVal.replace(/\D/g, '');
      const hasPhoneFormat = digitsOnly.length >= 8;

      if (!contatoVal) {
        setFieldError(contato, 'Informe seu e-mail ou número de telefone/WhatsApp.');
        isValid = false;
        if (!firstInvalid) firstInvalid = contato;
      } else if (!hasEmailFormat && !hasPhoneFormat) {
        setFieldError(contato, 'Digite um e-mail válido ou telefone com DDD (mínimo 8 dígitos).');
        isValid = false;
        if (!firstInvalid) firstInvalid = contato;
      }

      // Validação Tipo de Imóvel
      if (!tipoImovel.value) {
        setFieldError(tipoImovel, 'Selecione o tipo do imóvel.');
        isValid = false;
        if (!firstInvalid) firstInvalid = tipoImovel;
      }

      // Validação Principal Problema
      if (!principalProblema.value) {
        setFieldError(principalProblema, 'Selecione o principal problema a ser analisado.');
        isValid = false;
        if (!firstInvalid) firstInvalid = principalProblema;
      }

      // Validação Data de Preferência
      if (!dataPref.value) {
        setFieldError(dataPref, 'Selecione uma data para a visita técnica.');
        isValid = false;
        if (!firstInvalid) firstInvalid = dataPref;
      } else {
        const selectedDate = new Date(dataPref.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate < today) {
          setFieldError(dataPref, 'A data não pode ser anterior a hoje.');
          isValid = false;
          if (!firstInvalid) firstInvalid = dataPref;
        }
      }

      // Validação Horário
      if (!horarioPref.value) {
        setFieldError(horarioPref, 'Selecione o horário de preferência.');
        isValid = false;
        if (!firstInvalid) firstInvalid = horarioPref;
      }

      if (!isValid) {
        firstInvalid?.focus();
        return;
      }

      // Se válido: Gera Protocolo e Mostra Mensagem de Sucesso (Requisito 1)
      const protocolNumber = 'ECO-' + Math.floor(100000 + Math.random() * 900000);
      
      // Formata data amigável
      const [year, month, day] = dataPref.value.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      // Preenche resumo no card de sucesso
      const summaryProtocol = document.getElementById('agendamento-sum-protocol');
      const summaryNome = document.getElementById('agendamento-sum-nome');
      const summaryContato = document.getElementById('agendamento-sum-contato');
      const summaryImovel = document.getElementById('agendamento-sum-imovel');
      const summaryProblema = document.getElementById('agendamento-sum-problema');
      const summaryDataHora = document.getElementById('agendamento-sum-datahora');

      if (summaryProtocol) summaryProtocol.textContent = protocolNumber;
      if (summaryNome) summaryNome.textContent = nome.value.trim();
      if (summaryContato) summaryContato.textContent = contatoVal;
      if (summaryImovel) summaryImovel.textContent = tipoImovel.value;
      if (summaryProblema) summaryProblema.textContent = principalProblema.value;
      if (summaryDataHora) summaryDataHora.textContent = `${formattedDate} • ${horarioPref.value}`;

      // Transição visual para estado de sucesso
      formAgendamento.style.display = 'none';
      if (successAgendamento) {
        successAgendamento.classList.add('is-active');
      }
    });

    // Botão de Novo Agendamento
    const btnNovoAgendamento = document.getElementById('btn-novo-agendamento');
    if (btnNovoAgendamento) {
      btnNovoAgendamento.addEventListener('click', () => {
        formAgendamento.reset();
        clearAllErrors(formAgendamento);
        if (successAgendamento) successAgendamento.classList.remove('is-active');
        formAgendamento.style.display = 'flex';
      });
    }
  }

  /* ==========================================================================
     Requisito 2 & 8: FORMULÁRIO "SOLICITAR ORÇAMENTO" COM VALIDAÇÃO COMPLETA
     ========================================================================== */
  if (formOrcamento) {
    setupFieldValidationClear(formOrcamento);

    formOrcamento.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(formOrcamento);

      const orcNome = formOrcamento.querySelector('#orc_nome');
      const orcTipoImovel = formOrcamento.querySelector('#orc_tipo_imovel');
      const orcSolucao = formOrcamento.querySelector('#orc_solucao');
      const orcContato = formOrcamento.querySelector('#orc_contato');
      const orcDescricao = formOrcamento.querySelector('#orc_descricao');

      let isValid = true;
      let firstInvalid = null;

      // Validação Nome
      if (!orcNome.value.trim() || orcNome.value.trim().length < 3) {
        setFieldError(orcNome, 'Por favor, informe seu nome.');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcNome;
      }

      // Validação Tipo de Imóvel
      if (!orcTipoImovel.value) {
        setFieldError(orcTipoImovel, 'Selecione o tipo do imóvel.');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcTipoImovel;
      }

      // Validação Solução de Interesse
      if (!orcSolucao.value) {
        setFieldError(orcSolucao, 'Selecione a solução desejada.');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcSolucao;
      }

      // Validação Contato
      const contatoVal = orcContato.value.trim();
      const hasEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contatoVal);
      const digitsOnly = contatoVal.replace(/\D/g, '');
      const hasPhoneFormat = digitsOnly.length >= 8;

      if (!contatoVal) {
        setFieldError(orcContato, 'Informe seu telefone/WhatsApp ou e-mail.');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcContato;
      } else if (!hasEmailFormat && !hasPhoneFormat) {
        setFieldError(orcContato, 'Digite um contato válido (e-mail ou telefone).');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcContato;
      }

      // Validação Descrição do Problema
      if (!orcDescricao.value.trim() || orcDescricao.value.trim().length < 8) {
        setFieldError(orcDescricao, 'Descreva brevemente o problema ou o que gostaria de orçar.');
        isValid = false;
        if (!firstInvalid) firstInvalid = orcDescricao;
      }

      if (!isValid) {
        firstInvalid?.focus();
        return;
      }

      // Sucesso no Orçamento (Requisito 2)
      const protocolNumber = 'ORC-' + Math.floor(100000 + Math.random() * 900000);
      
      const sumProtocol = document.getElementById('orc-sum-protocol');
      const sumNome = document.getElementById('orc-sum-nome');
      const sumSolucao = document.getElementById('orc-sum-solucao');
      const sumContato = document.getElementById('orc-sum-contato');

      if (sumProtocol) sumProtocol.textContent = protocolNumber;
      if (sumNome) sumNome.textContent = orcNome.value.trim();
      if (sumSolucao) sumSolucao.textContent = orcSolucao.value;
      if (sumContato) sumContato.textContent = contatoVal;

      formOrcamento.style.display = 'none';
      if (successOrcamento) {
        successOrcamento.classList.add('is-active');
      }
    });

    // Botão de Novo Orçamento
    const btnNovoOrcamento = document.getElementById('btn-novo-orcamento');
    if (btnNovoOrcamento) {
      btnNovoOrcamento.addEventListener('click', () => {
        formOrcamento.reset();
        clearAllErrors(formOrcamento);
        if (successOrcamento) successOrcamento.classList.remove('is-active');
        formOrcamento.style.display = 'flex';
      });
    }
  }

  /* ==========================================================================
     Seletor Dinâmico de Problemas ("Qual seu desafio?") no Diferencial
     ========================================================================== */
  const PROBLEM_PRESETS = {
    'calor-janela': {
      title: 'Película Térmica Nanocerâmica + Toldos Articulados',
      desc: 'Bloqueio de 80% do calor antes de aquecer as paredes e vidros, reduzindo a necessidade de ar-condicionado.',
      targetSolution: 'Película térmica',
      targetProblem: 'Excesso de sol'
    },
    'calhas-transbordando': {
      title: 'Redimensionamento de Calhas e Rufos de Alta Vazão',
      desc: 'Condutores calculados para os 229 mm de chuva de Piracicaba, eliminando goteiras e transbordamento.',
      targetSolution: 'Calhas',
      targetProblem: 'Água da chuva'
    },
    'patio-alagado': {
      title: 'Jardim de Chuva (Biorretenção) + Infiltração Permeável',
      desc: 'Canteiro técnico que drena a água da chuva no próprio solo em até 2 horas sem sobrecarregar bueiros.',
      targetSolution: 'Jardim de chuva',
      targetProblem: 'Acúmulo de água'
    },
    'reduzir-conta': {
      title: 'Cisterna Compacta Urbana para Reúso de Chuva',
      desc: 'Armazenamento limpo para rega de plantas e limpeza geral, economizando até 40% na conta de água.',
      targetSolution: 'Captação de chuva',
      targetProblem: 'Água da chuva'
    },
    'completo': {
      title: 'Análise Climática Técnica Completa in-loco',
      desc: 'Vistoria presencial com termografia e estudo solar para apontar exatamente a causa raiz antes de investir.',
      targetSolution: 'Análise Climática',
      targetProblem: 'Quero uma análise completa'
    }
  };

  const problemTabs = document.querySelectorAll('[data-problem-preset]');
  const recTitle = document.getElementById('recommendation-title');
  const recDesc = document.getElementById('recommendation-desc');
  const recBtnAction = document.getElementById('recommendation-action-btn');

  function selectProblemPreset(presetKey) {
    const data = PROBLEM_PRESETS[presetKey];
    if (!data) return;

    problemTabs.forEach(tab => {
      if (tab.getAttribute('data-problem-preset') === presetKey) {
        tab.classList.add('is-selected');
      } else {
        tab.classList.remove('is-selected');
      }
    });

    if (recTitle) recTitle.textContent = data.title;
    if (recDesc) recDesc.textContent = data.desc;

    if (recBtnAction) {
      recBtnAction.onclick = () => {
        openModal('modal-orcamento');
        const select = document.getElementById('orc_solucao');
        if (select) select.value = data.targetSolution;
      };
    }
  }

  problemTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-problem-preset');
      if (key) selectProblemPreset(key);
    });
  });

  // Inicializa com o primeiro problema selecionado
  selectProblemPreset('calor-janela');

  /* ==========================================================================
     Comparador Visual "Antes e Depois" da Locação (Vila Rezende)
     ========================================================================== */
  const btnViewAfter = document.getElementById('btn-view-after');
  const btnViewBefore = document.getElementById('btn-view-before');
  const imgAfter = document.querySelector('.view-after');
  const imgBefore = document.querySelector('.view-before');
  const labelOverlay = document.querySelector('.before-after-badge-overlay');

  if (btnViewAfter && btnViewBefore && imgAfter && imgBefore) {
    btnViewAfter.addEventListener('click', () => {
      btnViewAfter.classList.add('is-active');
      btnViewBefore.classList.remove('is-active');
      imgAfter.style.opacity = '1';
      imgBefore.style.opacity = '0';
      if (labelOverlay) labelOverlay.textContent = 'PROPOSTA ECOCLIMA (DEPOIS)';
    });

    btnViewBefore.addEventListener('click', () => {
      btnViewBefore.classList.add('is-active');
      btnViewAfter.classList.remove('is-active');
      imgAfter.style.opacity = '0';
      imgBefore.style.opacity = '1';
      if (labelOverlay) labelOverlay.textContent = 'IMÓVEL DO ANÚNCIO (ANTES)';
    });
  }

  /* ==========================================================================
     Filtro Interativo do Investimento de R$ 40.000
     ========================================================================== */
  const filterPills = document.querySelectorAll('[data-budget-filter]');
  const budgetCards = document.querySelectorAll('.budget-item-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filterCategory = pill.getAttribute('data-budget-filter');

      budgetCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'todos' || cardCategory === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     Scrollspy para Menu Ativo
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavOnScroll() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavOnScroll);
  updateActiveNavOnScroll();
});
