import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Input from '../components/Input'
import * as LoginService from '../services/LoginService'

export default function Registro(props) {
    const { navigation } = props
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState('')

    const cadastro = () => {

        LoginService.cadastro(email, password)
            .then(() => {
                navigation.replace("Menu")
            }).catch(erro => {
                setMsg(erro)
            })


    }

    return (
        <View style={styles.container}>
            <Text>Informe suas credenciais abaixo:</Text>
            <Input
                label="E-mail"
                value={email}
                setValue={setEmail}

            />
            <Input
                label="Password"
                seguro={true}
                value={password}
                setValue={setPassword}
                keyboardType="numeric"
            />
            <View style={styles.caixaBotao}>
                <Button
                    title="Registre-se"
                    onPress={cadastro}
                />
            </View>
            <View>
                <Text style={{ color: "red", margin: 10 }}>{msg}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: "50%"
    },
    caixaBotao: {
        marginTop: 10,
        width: "80%"
    },
})
