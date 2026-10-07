import subprocess
import time
import json
import urllib.request
import asyncio
import os
import shutil
import base64
import websockets

abs_dir = os.path.abspath('.').replace('\\', '/')
file_url = f'file:///{abs_dir}/index.html'
profile = os.path.abspath('scratch_chrome_profile')
os.makedirs(profile, exist_ok=True)

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
chrome_proc = subprocess.Popen([
    chrome_path,
    '--headless=new',
    '--remote-debugging-port=9222',
    f'--user-data-dir={profile}',
    '--no-first-run',
    '--disable-gpu',
    '--window-size=1280,900',
    file_url
])
time.sleep(2.5)

async def run_tests():
    with urllib.request.urlopen('http://localhost:9222/json') as resp:
        targets = json.loads(resp.read().decode('utf-8'))
        page_targets = [t for t in targets if t.get('type') == 'page']
        assert page_targets, "Nenhum alvo do tipo 'page' encontrado!"
        page_ws = page_targets[0]['webSocketDebuggerUrl']

    async with websockets.connect(page_ws) as ws:
        msg_id = 0
        async def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            payload = {'id': msg_id, 'method': method}
            if params:
                payload['params'] = params
            await ws.send(json.dumps(payload))
            while True:
                res = await ws.recv()
                data = json.loads(res)
                if data.get('id') == msg_id:
                    return data.get('result', {})

        async def eval_js(expression):
            res = await send('Runtime.evaluate', {
                'expression': expression,
                'returnByValue': True,
                'awaitPromise': True
            })
            return res.get('result', {}).get('value')

        async def take_screenshot(filename):
            res = await send('Page.captureScreenshot', {'format': 'png'})
            data = res.get('data')
            if data:
                with open(filename, 'wb') as f:
                    f.write(base64.b64decode(data))
                print(f"  📸 Captura salva em: {filename}")

        print("\n=================================================================")
        print("  SUÍTE DE TESTES AUTOMATIZADOS: ECOCLIMA VILA REZENDE")
        print("=================================================================\n")

        await send('Page.enable')
        await asyncio.sleep(1)

        # Checa carregamento e título
        title = await eval_js("document.title")
        print(f"[TESTE GERAL] Título da página: '{title}'")
        assert "EcoClima" in title, f"Título incorreto: {title}"

        # ----------------------------------------------------------------------
        # REQUISITO 4: NAVEGAÇÃO COMPLETA
        # “Início” → topo
        # “Soluções” → seção de soluções
        # “Como funciona” → timeline
        # “Nosso diferencial” → análise climática
        # “Investimento” → orçamento dos R$40.000
        # “Localização” → Vila Rezende
        # ----------------------------------------------------------------------
        print("\n[REQUISITO 4] Testando Menu de Navegação:")
        expected_nav = [
            ("Início", "#inicio"),
            ("Soluções", "#solucoes"),
            ("Como funciona", "#como-funciona"),
            ("Nosso diferencial", "#diferencial"),
            ("Investimento", "#investimento"),
            ("Localização", "#localizacao")
        ]
        for name, selector in expected_nav:
            exists = await eval_js(f"!!document.querySelector('{selector}')")
            link_exists = await eval_js(f"!!document.querySelector('.main-nav a[href=\"{selector}\"]')")
            print(f"  • Link '{name}' ({selector}) -> Presente: {link_exists} | Seção Alvo Existe: {exists}")
            assert exists and link_exists, f"Falha na navegação para {name} ({selector})"

        # ----------------------------------------------------------------------
        # REQUISITOS 5 e 6: BOTÕES DE SCROLL
        # ----------------------------------------------------------------------
        print("\n[REQUISITOS 5 & 6] Testando Botões de Scroll Suave:")
        btn_sol = await eval_js("!!document.querySelector('[data-scroll-to=\"#solucoes\"]')")
        btn_como = await eval_js("!!document.querySelector('[data-scroll-to=\"#como-funciona\"]')")
        print(f"  • Botão 'Conheça as Soluções' (-> #solucoes): {btn_sol}")
        print(f"  • Botão 'Como Funciona' (-> #como-funciona): {btn_como}")
        assert btn_sol and btn_como

        # ----------------------------------------------------------------------
        # REQUISITO 1: BOTÃO “AGENDAR ANÁLISE” + VALIDAÇÃO + CONFIRMAÇÃO VISUAL
        # ----------------------------------------------------------------------
        print("\n[REQUISITO 1] Testando Botão 'Agendar Análise', Modal e Validação:")
        # Abre modal
        await eval_js("document.querySelector('button[data-open-modal=\"modal-agendamento\"]').click()")
        await asyncio.sleep(0.3)
        modal_open = await eval_js("document.getElementById('modal-backdrop').classList.contains('is-open')")
        print(f"  • Modal de agendamento aberto: {modal_open}")
        assert modal_open

        # Tenta enviar vazio para testar validação
        await eval_js("document.getElementById('form-agendamento').dispatchEvent(new Event('submit', {cancelable: true}))")
        errors = await eval_js("document.querySelectorAll('#form-agendamento .has-error').length")
        print(f"  • Validação ativada: {errors} campos obrigatórios destacados com mensagens amigáveis.")
        assert errors >= 5, "Validação deveria bloquear campos obrigatórios vazios!"

        # Preenche com dados válidos conforme requisitos:
        # Nome, E-mail ou telefone, Tipo de imóvel, Principal problema, Data de preferência, Horário de preferência, Observações
        await eval_js("""
            const f = document.getElementById('form-agendamento');
            f.querySelector('#nome').value = 'Mariana Silva';
            f.querySelector('#contato').value = '(19) 99876-5432';
            f.querySelector('#tipo_imovel').value = 'Casa';
            f.querySelector('#principal_problema').value = 'Calor';
            const d = new Date();
            d.setDate(d.getDate() + 5);
            f.querySelector('#data_preferencia').value = d.toISOString().split('T')[0];
            f.querySelector('#horario_preferencia').value = 'Manhã (08h às 12h)';
            f.querySelector('#observacoes').value = 'Fachada oeste com sol forte na Vila Rezende.';
        """)
        # Submete formulário
        await eval_js("document.getElementById('form-agendamento').dispatchEvent(new Event('submit', {cancelable: true}))")
        await asyncio.sleep(0.3)

        success_shown = await eval_js("document.getElementById('success-agendamento').classList.contains('is-active')")
        success_title = await eval_js("document.querySelector('#success-agendamento .success-title').textContent.trim()")
        success_msg = await eval_js("document.querySelector('#success-agendamento .success-message').textContent.trim()")
        protocol_val = await eval_js("document.getElementById('agendamento-sum-protocol').textContent.trim()")
        
        print(f"  • Mensagem de confirmação visível: {success_shown}")
        print(f"  • Título: '{success_title}'")
        print(f"  • Mensagem: '{success_msg}'")
        print(f"  • Protocolo gerado: '{protocol_val}'")

        assert success_shown
        assert "Solicitação recebida!" in success_title
        assert "A EcoClima entrará em contato para confirmar a visita." in success_msg
        assert "ECO-" in protocol_val

        # Fecha modal
        await eval_js("document.querySelector('#modal-agendamento [data-close-modal]').click()")
        await asyncio.sleep(0.4)

        # ----------------------------------------------------------------------
        # REQUISITO 2: BOTÃO “SOLICITAR ORÇAMENTO”
        # ----------------------------------------------------------------------
        print("\n[REQUISITO 2] Testando Botão 'Solicitar Orçamento', Modal e Confirmação:")
        await eval_js("document.querySelector('button[data-open-modal=\"modal-orcamento\"]').click()")
        await asyncio.sleep(0.3)
        orc_open = await eval_js("document.getElementById('modal-backdrop').classList.contains('is-open')")
        print(f"  • Modal de orçamento aberto: {orc_open}")
        assert orc_open

        # Envio vazio -> erro
        await eval_js("document.getElementById('form-orcamento').dispatchEvent(new Event('submit', {cancelable: true}))")
        orc_errors = await eval_js("document.querySelectorAll('#form-orcamento .has-error').length")
        print(f"  • Validação ativada: {orc_errors} campos obrigatórios destacados.")
        assert orc_errors >= 4

        # Preenche com dados válidos:
        # Nome, Tipo de imóvel, Solução de interesse, Telefone/e-mail, Descrição do problema
        await eval_js("""
            const f = document.getElementById('form-orcamento');
            f.querySelector('#orc_nome').value = 'Padaria & Mercearia Rezende';
            f.querySelector('#orc_tipo_imovel').value = 'Comércio';
            f.querySelector('#orc_solucao').value = 'Toldos e Coberturas';
            f.querySelector('#orc_contato').value = 'contato@padariarezende.com.br';
            f.querySelector('#orc_descricao').value = 'Precisamos proteger a vitrine e entrada de 6 metros contra sol e chuva de vento.';
        """)
        submit_result = await eval_js("""
            const f = document.getElementById('form-orcamento');
            f.dispatchEvent(new Event('submit', {cancelable: true}));
            const errs = Array.from(f.querySelectorAll('.has-error')).map(el => ({
                id: el.querySelector('input, select, textarea')?.id,
                msg: el.querySelector('.form-error-msg')?.textContent
            }));
            return errs;
        """)
        print(f"  • Erros restantes pós-preenchimento: {submit_result}")
        await asyncio.sleep(0.3)

        orc_success_shown = await eval_js("document.getElementById('success-orcamento').classList.contains('is-active')")
        orc_protocol = await eval_js("document.getElementById('orc-sum-protocol').textContent.trim()")
        print(f"  • Confirmação de orçamento ativa: {orc_success_shown}")
        print(f"  • Protocolo gerado: '{orc_protocol}'")
        assert orc_success_shown
        assert "ORC-" in orc_protocol

        # Fecha modal
        await eval_js("document.querySelector('#modal-orcamento [data-close-modal]').click()")
        await asyncio.sleep(0.4)

        # ----------------------------------------------------------------------
        # REQUISITO 3: BOTÕES DOS PRODUTOS
        # Película térmica, Toldos, Calhas, Captação de chuva, Jardim de chuva, Análise Climática
        # Cada um deve mostrar: o que é, qual problema resolve, como a EcoClima utiliza essa solução
        # ----------------------------------------------------------------------
        print("\n[REQUISITO 3] Testando os 6 Produtos / Soluções e Conteúdo Rico:")
        solutions_list = [
            ('pelicula-termica', 'Película térmica'),
            ('toldos', 'Toldos'),
            ('calhas', 'Calhas'),
            ('captacao-chuva', 'Captação de chuva'),
            ('jardim-chuva', 'Jardim de chuva'),
            ('analise-climatica', 'Análise Climática')
        ]
        for key, name in solutions_list:
            # Clica no elemento da solução
            await eval_js(f"document.querySelector('[data-solution-key=\"{key}\"]').click()")
            await asyncio.sleep(0.2)
            
            modal_sol_open = await eval_js("document.getElementById('modal-solucao').style.display !== 'none'")
            title = await eval_js("document.getElementById('solution-modal-title').textContent.trim()")
            whatis = await eval_js("document.getElementById('solution-modal-whatis').textContent.trim()")
            whatsolves = await eval_js("document.getElementById('solution-modal-whatsolves').textContent.trim()")
            howeco = await eval_js("document.getElementById('solution-modal-howecoclima').textContent.trim()")

            print(f"  • [{name}] Modal Aberto: {modal_sol_open}")
            print(f"    - 'O que é': {whatis[:45]}...")
            print(f"    - 'Qual problema resolve': {whatsolves[:45]}...")
            print(f"    - 'Como EcoClima utiliza': {howeco[:45]}...")

            assert modal_sol_open, f"Modal da solução {name} não abriu!"
            assert len(whatis) > 15, f"Texto 'O que é' vazio para {name}!"
            assert len(whatsolves) > 15, f"Texto 'Qual problema resolve' vazio para {name}!"
            assert len(howeco) > 15, f"Texto 'Como EcoClima utiliza' vazio para {name}!"

            # Fecha modal da solução
            await eval_js("document.querySelector('#modal-solucao [data-close-modal]').click()")
            await asyncio.sleep(0.3)

        # ----------------------------------------------------------------------
        # REQUISITO 7: BOTÃO VOLTAR AO TOPO
        # ----------------------------------------------------------------------
        print("\n[REQUISITO 7] Testando Botão Voltar ao Topo:")
        # Rola página
        await eval_js("window.scrollTo(0, 900); window.dispatchEvent(new Event('scroll'));")
        await asyncio.sleep(0.3)
        top_btn_visible = await eval_js("document.querySelector('.back-to-top-btn').classList.contains('is-visible')")
        print(f"  • Botão flutuante 'Voltar ao Topo' visível após rolagem: {top_btn_visible}")
        assert top_btn_visible

        # ----------------------------------------------------------------------
        # INTERATIVIDADE EXTRA: Simulador de Problemas e Filtro de Investimento
        # ----------------------------------------------------------------------
        print("\n[INTERATIVIDADES ADICIONAIS]:")
        # Simulador de Problema
        await eval_js("document.querySelector('[data-problem-preset=\"patio-alagado\"]').click()")
        rec_title = await eval_js("document.getElementById('recommendation-title').textContent.trim()")
        print(f"  • Seletor de Desafio mudou recomendação para: '{rec_title}'")
        assert "Jardim de Chuva" in rec_title

        # Filtro de Investimento R$ 40.000
        await eval_js("document.querySelector('[data-budget-filter=\"ponto\"]').click()")
        visible_cards = await eval_js("Array.from(document.querySelectorAll('.budget-item-card')).filter(c => c.style.display !== 'none').length")
        print(f"  • Filtro de Investimento 'Ponto Comercial' exibiu {visible_cards} itens")
        assert visible_cards >= 3

        # ----------------------------------------------------------------------
        # TESTE VISUAL E CAPTURA DE TELA DESKTOP
        # ----------------------------------------------------------------------
        print("\n[CAPTURAS VISUAIS]:")
        await eval_js("window.scrollTo(0, 0);")
        await asyncio.sleep(0.5)
        await take_screenshot('screenshot_desktop.png')

        # ----------------------------------------------------------------------
        # TESTE MOBILE (Viewport de Celular)
        # ----------------------------------------------------------------------
        print("\n[TESTE MOBILE - RESPONSIVIDADE EM CELULAR]:")
        await send('Emulation.setDeviceMetricsOverride', {
            'width': 390,
            'height': 844,
            'deviceScaleFactor': 2,
            'mobile': True
        })
        await asyncio.sleep(0.5)

        # Clica no menu hambúrguer mobile
        await eval_js("document.querySelector('.mobile-menu-toggle').click()")
        menu_open = await eval_js("document.querySelector('.main-nav').classList.contains('is-open')")
        print(f"  • Menu Hambúrguer abriu no smartphone: {menu_open}")
        assert menu_open

        # Clica em 'Soluções' no menu mobile
        await eval_js("document.querySelector('.main-nav a[href=\"#solucoes\"]').click()")
        await asyncio.sleep(0.3)
        menu_closed = await eval_js("!document.querySelector('.main-nav').classList.contains('is-open')")
        print(f"  • Menu Hambúrguer fechou automaticamente após navegar: {menu_closed}")
        assert menu_closed

        await take_screenshot('screenshot_mobile.png')

        print("\n=================================================================")
        print("  ✅ TODOS OS 9 REQUISITOS FORAM TESTADOS E VALIDADOS COM ÊXITO!")
        print("=================================================================\n")

try:
    asyncio.run(run_tests())
finally:
    chrome_proc.terminate()
    chrome_proc.wait()
    shutil.rmtree(profile, ignore_errors=True)
