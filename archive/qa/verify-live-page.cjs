const { chromium } = require('playwright');
const path = require('path');

(async () => {
    console.log('Launching headless Chromium...');
    const browser = await chromium.launch({
        headless: true,
        args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl']
    });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const errors = [];
    page.on('console', (msg) => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', (err) => {
        errors.push(err.toString());
    });

    console.log('Navigating to http://127.0.0.1:8080/ ...');
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const title = await page.title();
    const theme1 = await page.getAttribute('html', 'data-theme');
    const canvasCount = await page.locator('canvas').count();

    console.log(`Page Title: "${title}"`);
    console.log(`Initial Theme: "${theme1}"`);
    console.log(`Canvas elements found: ${canvasCount}`);

    // Take screenshot of Lusion Void theme
    const voidScreenshot = path.resolve(__dirname, 'lusion-void-preview.png');
    await page.screenshot({ path: voidScreenshot, fullPage: false });
    console.log(`Saved screenshot: ${voidScreenshot}`);

    // Test Theme Switch Click
    console.log('Clicking theme toggle button...');
    await page.click('#theme-toggle-btn');
    await page.waitForTimeout(600);

    const theme2 = await page.getAttribute('html', 'data-theme');
    console.log(`Theme after toggle: "${theme2}"`);

    const chromeScreenshot = path.resolve(__dirname, 'super-chrome-preview.png');
    await page.screenshot({ path: chromeScreenshot, fullPage: false });
    console.log(`Saved screenshot: ${chromeScreenshot}`);

    // Test Energy Pulse Trigger
    console.log('Clicking pulse action button...');
    await page.click('#hero-pulse-btn');
    await page.waitForTimeout(500);

    const toast = await page.textContent('#toast');
    console.log(`Toast notification: "${toast.trim()}"`);

    console.log(`Errors caught during run: ${errors.length}`);
    if (errors.length > 0) {
        console.error('Console errors:', errors);
    }

    await browser.close();

    if (errors.length > 0) {
        process.exit(1);
    } else {
        console.log('ALL PLAYWRIGHT TESTS PASSED CLEANLY!');
    }
})();
