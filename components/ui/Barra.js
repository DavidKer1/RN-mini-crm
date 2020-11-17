import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Barra({navigation, route}) {
  const handlePress = () => {
    navigation.navigate("NuevoCliente")
  }
  return (
    <View>
      <Button icon='plus-circle' onPress={handlePress} color='#fff'>
        Cliente
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({})
