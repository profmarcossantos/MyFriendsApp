import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Input from '../components/Input'
import * as AmigoService from '../services/AmigoService'

export default function CadastroAmigo(props) {

    const { navigation } = props


    const [msg, setMsg] = useState("")
    const [form, setForm] = useState({
        nome: "",
        fone: "",
        endereco: ""
    })

    // field = { nome: "João das Coves" }, {fone: "54 9999999"}, {endereco: 'Rua Lá mesmo, 296"}
    const atualizaForm = (field) => setForm(oldValue => Object.assign({}, oldValue, field))


    useLayoutEffect(() => {
        const dados = props.route.params
        if (dados) setForm(dados)


    }, [])

    const validar = () => {
        let campos = Object.getOwnPropertyNames(form)
        for (const campo of campos) {
            if (form[campo] == "" || form[campo] == null)
                return false
        }
        return true
    }

    const cadastrar = () => {
        if (validar()) {
            AmigoService.save(form)
                .then(() => {
                    navigation.navigate("Menu")
                })
                .catch((erro) => {
                    setMsg(erro)
                })
        } else {
            setMsg("Algum campo não foi preenchido corretamente!")
        }



    }

    return (
        <View style={styles.container}>
            <Text>Informe os dados de seu amigo:</Text>
            <Input
                label="Nome"
                value={form.nome}
                setValue={atualizaForm}
                name="nome"
            />
            <Input
                label="Fone"
                value={form.fone}
                setValue={atualizaForm}
                name="fone"
            />
            <Input
                label="Endereço"
                value={form.endereco}
                setValue={atualizaForm}
                name="endereco"
            />
            <View style={{ marginTop: 5, width: "80%" }}>
                <Button
                    title="Cadastrar"
                    onPress={cadastrar}
                />
            </View>
            <View>
                <Text>{msg}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: "50%"
    },
})
