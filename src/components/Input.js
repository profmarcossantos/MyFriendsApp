import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

export default function Input(props) {

    return (
        <View style={styles.caixaTexto}>
            <TextInput
                placeholder={props.label}
                secureTextEntry={props.seguro}
                value={props.value}
                onChangeText={value => props.setValue(value)}
                keyboardType={props.keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    caixaTexto: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 5,
        marginTop: 5,
        borderRadius: 50,
        width: "80%",
        paddingLeft: 15,
    }
})
