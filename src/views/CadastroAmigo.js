import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Input from '../components/Input'
import * as AmigoService from '../services/AmigoService'

export default function CadastroAmigo(props) {

    const { navigation } = props
    const [nome, setNome] = useState("")
    const [fone, setFone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [msg, setMsg] = useState("")

    const validar = () => {
        if ((nome.length == 0) || (fone.length == 0) || (endereco.length == 0))
            return false
        else
            return true
    }

    const cadastrar = () => {

        if (validar()) {
            let amigo = {
                nome, fone, endereco
            }
            AmigoService.cadastrarAmigo(amigo)
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
                value={nome}
                setValue={setNome}
            />
            <Input
                label="Fone"
                value={fone}
                setValue={setFone}
            />
            <Input
                label="Endereço"
                value={endereco}
                setValue={setEndereco}
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
