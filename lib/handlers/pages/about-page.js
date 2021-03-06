const _data = require('../../data');
const header = require('../../components/header');

async function aboutPageHandler() {
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(false);
    const footerHTML = await _data.readTemplateHTML('footer');
    const aboutHTML = await _data.readTemplateHTML('about');

    headHTML = headHTML.replace('{{page-css}}', 'about');

    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${aboutHTML}
                    </main>
                    ${footerHTML}

                    <script src="/js/demo.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = aboutPageHandler;