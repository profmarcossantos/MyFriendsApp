import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

export default function Menu(props) {
    const { navigation } = props

    return (
        <View>
            <View style={{ width: "99%", marginBottom: 20 }}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("CadastroAmigo")}
                >
                    <View style={styles.botao}>
                        <Text>Adicionar Amigos + </Text>
                    </View>
                </TouchableOpacity>

            </View>


            <View>
                <Button
                    title="Logoff"
                    onPress={() => navigation.replace("Login")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    botao: {
        width: "48%",
        marginLeft: 10,
        marginTop: 10,
        height: 100,
        backgroundColor: "#ffec8b",
        borderRadius: 20,
        alignItems: "center",
        paddingTop: 40
    }
})
