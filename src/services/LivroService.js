import db from "../services/ConnectFirebase"

const colletion = "livros"
export const save = (param) => {
    /*
    amigo = {
        nome : "João das Covers",
        fone: "54 99999 9999"
    }
    */
    return new Promise((resolve, reject) => {
        let id = param.id
        delete param.id
        if (id) {
            db.collection(colletion)
                .doc(id)
                .update(param)
                .then(() => {
                    resolve()
                })
                .catch((erro) => {
                    reject(erro)
                })
        } else {
            db.collection(colletion)
                .add(param)
                .then(() => {
                    resolve()
                })
                .catch((erro) => {
                    reject(erro)
                })
        }
    })
}

export const get = () => {
    return new Promise((resolve, reject) => {
        db.collection(colletion)
            .get()
            .then((dados) => {
                let lista = []
                dados.forEach(item => {
                    let objeto = Object.assign({}, item.data(), { id: item.id })
                    lista.push(objeto)
                })
                resolve(lista)
            })
            .catch((erro) => {
                reject(erro)
            })
    })
}

export const del = (id) => {
    return new Promise((resolve, reject) => {
        db.collection(colletion)
            .doc(id)
            .delete()
            .then(() => resolve()
            )
            .catch((erro) => {
                reject(erro)
            })
    })
}


