import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList } from 'react-native'
import * as AmigosAction from '../services/actions/amigosAction'
import * as AmigoAction from '../services/actions/amigoAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Menu(props) {
    const { navigation } = props
    const dispatch = useDispatch()
    const amigos = useSelector(store => store.amigos)
    const user = useSelector(store => store.login)
    useLayoutEffect(() => {
        dispatch(AmigosAction.getList())
    }, [dispatch])

    const deletar = (id) => {
        dispatch(AmigoAction.remove(id))
    }

    return (
        <View>
            <View style={{ width: "99%", marginBottom: 20, flexDirection: "row" }}>

                <TouchableOpacity
                    style={styles.botaoArea}
                    onPress={() => navigation.navigate("CadastroAmigo")}
                >
                    <View style={styles.botao}>
                        <Text>Adicionar Amigos + </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botaoArea}
                    onPress={() => navigation.navigate("Mapa")}
                >
                    <View style={styles.botao}>
                        <Text>Ver Mapa </Text>
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
                <Text>Olá {user.email}, para sair clique no botão abaixo:</Text>
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
        marginLeft: 10,
        marginTop: 10,
        height: 100,
        backgroundColor: "#ffec8b",
        borderRadius: 20,
        alignItems: "center",
        paddingTop: 40
    }, botaoArea :{
        flex: 1,
        width: "50%"
    }
})
