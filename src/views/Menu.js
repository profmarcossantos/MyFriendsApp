import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
import * as AmigoService from '../services/AmigoService'
export default function Menu(props) {
    const { navigation } = props

    const [amigos, setAmigos] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAmigos()
        });
        return unsubscribe;
    }, [navigation])

    const getAmigos = () => {
        AmigoService.get()
            .then(dados => {
                setAmigos(dados)
            })
            .catch(erro => console.log(erro))
    }

    const deletar = (id) => {
        AmigoService.del(id)
            .then(() => {
                getAmigos()
            })
            .catch(erro => console.log(erro))
    }


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
                <FlatList
                    data={amigos}
                    renderItem={({ item }) =>
                        <View>
                            <View style={{ width: 100 }}>
                                <Button title="Delete" onPress={() => deletar(item.id)} />
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("CadastroAmigo", item)}
                            >
                                <Text>
                                    {`${item.nome} ${item.fone}  `}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    }
                    keyExtractor={item => item.id}
                />
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
