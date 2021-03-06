import Axios from 'axios'
import React from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Headline, Subheading, Button, FAB } from 'react-native-paper'
import globalStyles from '../styles/global'

export default function DetallesCliente({navigation,route}) {
  const {nombre, telefono, correo, empresa, id} = route.params.item
  const {setReload} = route.params;

  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas eliminar este cliente?',
      'Un contacto eliminado no se puede recuperar',
      [
        {text: 'Si, Eliminar', onPress: () => eliminarContacto()},
        {text: 'Cancelar', style: 'cancel'},
      ]
      
    )
  }
  const eliminarContacto = async ()=> {
        const url = `http://192.168.0.6:3000/clientes/${id}`;
    try {
      await Axios.delete(url)
    } catch (error) {
      console.log(error);
    }

    // Redireccionar
    navigation.navigate('Inicio')
    // Volver a consultar
    setReload(true)

  }
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading> </Text>
      <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading> </Text>
      <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading> </Text>
      <Button
        style={styles.boton}
        mode='contained'
        icon='cancel'
        onPress={()=> mostrarConfirmacion()}
      >
        Eliminar Cliente
      </Button>
      <FAB
        icon="pencil"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente', {cliente: route.params.item , setReload})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  boton: {
    marginTop: 100,
    backgroundColor: '#ff2020'
  }
})
