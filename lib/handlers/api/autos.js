const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.autos = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._autos[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._autos = {}

handlers._autos.get = async (data, callback) => {
    // gaunam autos info
    const regNumber = data.queryStringObject.get('regNumber');

    if (regNumber === '') {
        return callback(400, {
            error: 'Nenurodytas valstybinis numeris'
        })
    }

    const content = await _data.read('autos', regNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas'
        })
    }

    contentObj = helpers.parseJsonToObject(content);

    return callback(200, {
        success: contentObj,
    })

}

handlers._autos.post = async (data, callback) => {
    // irasom autos info
    const { regNumber, brand, model, color } = data.payload;


    const autoObject = {
        regNumber,
        brand,
        model,
        color,
    }

    const res = await _data.create('autos', regNumber, autoObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko uzregistruoti automobilio',
        })
    }

    return callback(200, {
        success: 'Automobilis uzregistruotas',
    })
}

handlers._autos.put = async (data, callback) => {
    // atnaujinam user info
    const { regNumber, brand, model, color } = data.payload;

    if (!regNumber) {
        return callback(400, {
            error: 'Nenurodytas automobilio valstybinis numeris, kuriam reikia atnaujinti informacija',
        })
    }

    if (!brand && !model && !color) {
        return callback(400, {
            error: 'Nenurodyta nei viena reiksme, kuria norima atnaujinti',
        })
    }

    const content = await _data.read('autos', regNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);

    if (brand) {
        // atnaujiname automobilio marke
        contentObj.brand = brand;
    }

    if (model) {
        // atnaujiname modeli
        contentObj.model = model;
    }

    if (color) {
        // atnaujiname spalva
        contentObj.color = color;
    }

    const res = await _data.update('autos', regNumber, contentObj);
    console.log(res)
    if (res) {
        return callback(200, {
            success: 'Automobilio informacija atnaujinta',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant atnaujinti automobilio informacija',
        })
    }
}

handlers._autos.delete = async (data, callback) => {
    // istrinam  auto info
    const regNumber = data.queryStringObject.get('regNumber');

    if (regNumber === '') {
        return callback(400, {
            error: 'Nenurodytas valstybinis numeris'
        })
    }

    const response = await _data.delete('autos', regNumber);
    if (response) {
        return callback(200, {
            success: `Automobilis pasalintas is sistemos`,
        })
    } else {
        return callback(400, {
            error: `Ivyko klaida bandant pasalinti automobili`
        })
    }
}

module.exports = handlers;