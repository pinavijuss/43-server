const _data = require('../../data');
const header = require('../../components/header');
const helpers = require('../../helpers')

async function adminUpdateServicesPageHandler(data) {
    const serviceUrlSlug = data.queryStringObject.get('urlSlug');
    const updateService = await _data.read('services', serviceUrlSlug);
    const serviceObj = helpers.parseJsonToObject(updateService);
    let headHTML = await _data.readTemplateHTML('head');
    const headerHTML = header(data.user);
    const footerHTML = await _data.readTemplateHTML('footer');
    let updateServiceHTML = await _data.readTemplateHTML('update-service');

    headHTML = headHTML.replace('{{page-css}}', 'add-service');
    updateServiceHTML = updateServiceHTML.replace('{{serviceName}}', serviceObj.serviceName)
        .replace('{{urlSlug}}', serviceObj.urlSlug)
        .replace('{{shortDescription}}', serviceObj.shortDescription)
        .replace('{{fullDescription}}', serviceObj.fullDescription)
        .replace('{{price}}', serviceObj.price)
        .replace('{{isActive}}', serviceObj.isActive ? "checked" : "")
    const HTML = `<!DOCTYPE html>
            <html lang="en">
                ${headHTML}
                <body>
                    ${headerHTML}
                    <main>
                        ${updateServiceHTML}
                    </main>
                    ${footerHTML}
                    <script src="/js/update-service.js" type="module" defer></script>
                </body>
            </html>`;

    return { HTML }
}

module.exports = adminUpdateServicesPageHandler; 