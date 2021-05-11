import db from "../services/ConnectFirebase"

export const cadastrarAmigo = (amigo) => {
    /*
    amigo = {
        nome : "João das Covers",
        fone: "54 99999 9999"
    }
    */
    return new Promise((resolve, reject) => {
        db.collection("amigos")
            .add(amigo)
            .then(() => {
                resolve()
            })
            .catch((erro) => {
                reject(erro)
            })
    })
}

