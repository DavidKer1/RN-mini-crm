import Axios from 'axios';
import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { TextInput, Headline, Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
export default function NuevoCliente() {
  const [user, setUser] = useState({})
  
  const [alert, setAlert] = useState(false)

  const leerNombre = (txt) => {
    console.log(txt);
  }
  const guardarCliente = async () => {  
    // Validation
    if(validation()){
      setAlert(true)
      return
    }
    // Save Client
    try {
      const url = 'http://localhost:3000/clientes'
      if(Platform.OS === 'android'){
        const url = 'http://10.0.2.2:3000/clientes'
      }
      await Axios.post(url,user)
      
    } catch (error) {
      console.log(error);
    }
    // Redirection

  }

  function validation() {
    return !user.nombre || !user.telefono || !user.correo || !user.empresa
  }
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput 
        label='Nombre'
        placeholder='Victor'
        onChangeText={(txt) => setUser({...user,nombre: txt})}
        style={styles.input}
        value={user.nombre}
      />
      <TextInput 
        label='Telefono'
        placeholder='8442056074'
        onChangeText={(txt) => setUser({...user,telefono: txt})}
        style={styles.input}
        value={user.telefono}
      />
      <TextInput 
        label='Correo'
        placeholder='correo@correo.com'
        onChangeText={(txt) => setUser({...user,correo: txt})}
        style={styles.input}
        value={user.correo}
        textContentType='emailAddress'
      />
      <TextInput 
        label='Empresa'
        placeholder='Empresa.com'
        onChangeText={(txt) => setUser({...user, empresa: txt})}
        style={styles.input}
        value={user.empresa}
      />
      <Button icon='pencil-circle' mode='contained' onPress={guardarCliente}>Guardar Cliente</Button>

      <Portal>
        <Dialog
          visible={alert}
          onDismiss={() => setAlert(false)}
        >
          <Dialog.Title>Intentelo de nuevo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
})
