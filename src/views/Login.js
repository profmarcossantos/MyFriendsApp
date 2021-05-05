import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, CheckBox } from 'react-native'
import Input from '../components/Input'
import * as LoginService from '../services/LoginService'
import { AsyncStorage } from "react-native"

export default function Login(props) {

    const { navigation } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [lembreme, setLembreme] = useState(false);
    const [msg, setMsg] = useState("")

    useLayoutEffect(() => {

        const getUsernameAndPassord = async () => {
            let email = await AsyncStorage.getItem("email")
            let senha = await AsyncStorage.getItem("senha")
            if (email) {
                setEmail(email)
                setLembreme(true)
            }
            if (senha) setPassword(senha)
        }
        getUsernameAndPassord()

    }, [])

    const validarCredenciais = () => {

        LoginService.login(email, password, lembreme)
            .then(() => {
                navigation.replace("Menu")
            }).catch(erro => {
                setMsg(erro)
            })
    }

    return (
        <View style={styles.container}>
            <Text>Informe suas Credenciaiss</Text>
            <View>
                <Text style={{ color: "red", margin: 10 }}>{msg}</Text>
            </View>
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

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={lembreme}
                    onValueChange={setLembreme}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Lembre-me</Text>
            </View>
            <View style={styles.caixaBotao}>
                <Button
                    title="Login"
                    onPress={validarCredenciais}
                />
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
    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    }, label: {
        margin: 8,
    },
})
