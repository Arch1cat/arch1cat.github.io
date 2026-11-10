import subprocess, time, json, urllib.request, socket, os, base64

proc = subprocess.Popen([
    'C:/Users/z/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
    '--headless',
    '--remote-debugging-port=9227',
    '--window-size=1440,1100',
    'http://localhost:8080/'
])
time.sleep(2.5)

try:
    tabs = json.loads(urllib.request.urlopen('http://localhost:9227/json').read())
    path = tabs[0]['webSocketDebuggerUrl'].split('9227')[-1]
    
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(('127.0.0.1', 9227))
    key = base64.b64encode(os.urandom(16)).decode('ascii')
    s.sendall(f'GET {path} HTTP/1.1\r\nHost: 127.0.0.1:9227\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'.encode('ascii'))
    s.recv(1024)

    msg_counter = [0]
    def cdp_send(method, params=None):
        msg_counter[0] += 1
        msg_id = msg_counter[0]
        msg = {'id': msg_id, 'method': method}
        if params: msg['params'] = params
        payload = json.dumps(msg).encode('utf-8')
        l = len(payload)
        mask = os.urandom(4)
        header = (bytes([0x81, 0x80 | l]) if l < 126 else bytes([0x81, 0xFE, (l >> 8) & 0xFF, l & 0xFF])) + mask
        s.sendall(header + bytes(b ^ mask[i % 4] for i, b in enumerate(payload)))
        
        data = b''
        while True:
            chunk = s.recv(65536)
            if not chunk: break
            data += chunk
            target = f'"id":{msg_id}'.encode('ascii')
            if target in data and data.strip().endswith(b'}'): break
            
        start = data.find(f'{{"id":{msg_id}'.encode('ascii'))
        end = data.rfind(b'}')
        return json.loads(data[start:end+1].decode('utf-8', 'ignore'))

    cdp_send('Emulation.setDeviceMetricsOverride', {'width': 1440, 'height': 1100, 'deviceScaleFactor': 1, 'mobile': False})
    
    # 1. Force remove preloader and set UK
    cdp_send('Runtime.evaluate', {'expression': '''(() => {
        const p = document.getElementById('pre');
        if (p) p.classList.add('done');
        document.body.classList.remove('is-locked');
        if (typeof applyLanguage === 'function') applyLanguage('uk');
    })()'''})
    time.sleep(1.0)
    
    # Check text
    res = cdp_send('Runtime.evaluate', {'expression': '''({
        title: document.title,
        lang: document.documentElement.lang,
        h1: document.querySelector('#hero-title').innerText.replace(/\\s+/g, ' '),
        gateHead: document.querySelector('#gate .sec-head').innerText.replace(/\\s+/g, ' '),
        gateH2: document.querySelector('#gate h2').innerText.replace(/\\s+/g, ' '),
        cardsCount: document.querySelectorAll('#cards .card').length,
        card1: document.querySelectorAll('#cards .card .card-lab b')[0].innerText,
        card2: document.querySelectorAll('#cards .card .card-lab b')[1].innerText,
        card3: document.querySelectorAll('#cards .card .card-lab b')[2].innerText,
        card4: document.querySelectorAll('#cards .card .card-lab b')[3].innerText,
        card5: document.querySelectorAll('#cards .card .card-lab b')[4].innerText,
        card6: document.querySelectorAll('#cards .card .card-lab b')[5].innerText
    })''', 'returnByValue': True})
    
    val = res.get('result', {}).get('result', {})
    print('RAW RES EVAL:', json.dumps(val, indent=2, ensure_ascii=False))

    # Take screenshot of Hero
    shot1 = cdp_send('Page.captureScreenshot', {'format': 'png'})
    with open('archive/qa/portfolio_uk_hero.png', 'wb') as f:
        f.write(base64.b64decode(shot1['result']['data']))
    print('Saved archive/qa/portfolio_uk_hero.png')
    
    # Scroll to #gate and shoot
    cdp_send('Runtime.evaluate', {'expression': 'document.getElementById("gate").scrollIntoView();'})
    time.sleep(1.0)
    shot2 = cdp_send('Page.captureScreenshot', {'format': 'png'})
    with open('archive/qa/portfolio_uk_gate.png', 'wb') as f:
        f.write(base64.b64decode(shot2['result']['data']))
    print('Saved archive/qa/portfolio_uk_gate.png')

    # Scroll to #pathways and shoot
    cdp_send('Runtime.evaluate', {'expression': 'document.getElementById("pathways").scrollIntoView();'})
    time.sleep(1.0)
    shot3 = cdp_send('Page.captureScreenshot', {'format': 'png'})
    with open('archive/qa/portfolio_uk_pathways.png', 'wb') as f:
        f.write(base64.b64decode(shot3['result']['data']))
    print('Saved archive/qa/portfolio_uk_pathways.png')

    # Now test English switch!
    cdp_send('Runtime.evaluate', {'expression': 'applyLanguage("en");'})
    time.sleep(0.5)
    
    res_en = cdp_send('Runtime.evaluate', {'expression': '''({
        lang: document.documentElement.lang,
        h1: document.querySelector('#hero-title').innerText.replace(/\\s+/g, ' '),
        gateHead: document.querySelector('#gate .sec-head').innerText.replace(/\\s+/g, ' '),
        p1_desc: document.querySelector('[data-i18n="works.p1_desc"]').innerText
    })''', 'returnByValue': True})
    print('EN VERIFICATION:\n', json.dumps(res_en['result']['result']['value'], indent=2, ensure_ascii=False))

    shot4 = cdp_send('Page.captureScreenshot', {'format': 'png'})
    with open('archive/qa/portfolio_en_pathways.png', 'wb') as f:
        f.write(base64.b64decode(shot4['result']['data']))
    print('Saved archive/qa/portfolio_en_pathways.png')

finally:
    proc.terminate()
