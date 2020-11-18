import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
export default function NuevoCliente({navigation, route}) {
  const {setReload} = route.params;

  useEffect(() => {
    if (route.params.cliente) {
      setUser(route.params.cliente);
    }
  }, []);
  const [user, setUser] = useState({});

  const [alert, setAlert] = useState(false);

  const guardarCliente = async () => {
    // Validation
    if (validation()) {
      setAlert(true);
      return;
    }

    // Edit or new
    if (route.params.cliente) {
      const {id} = route.params.cliente;
      const newUser = user;
      newUser.id = id;
      try {
        const url = `http://192.168.0.6:3000/clientes/${id}`;
        await Axios.put(url, newUser);
      } catch (error) {}
    } else {
      try {
        const url = 'http://192.168.0.6:3000/clientes';
        await Axios.post(url, user);
      } catch (error) {}
    }

    // Redirection
    navigation.navigate('Inicio');

    setUser({});
    setReload(true);
  };

  function validation() {
    return !user.nombre || !user.telefono || !user.correo || !user.empresa;
  }
  return (
    <View style={globalStyles.contenedor}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Headline style={globalStyles.titulo}>
        {route.params.cliente ? 'Editar' : 'Añadir Nuevo'} Cliente
      </Headline>
      <View style={styles.inputContainer}>
      <TextInput
        label="Nombre"
        placeholder="Victor"
        onChangeText={(txt) => setUser({...user, nombre: txt})}
        style={styles.input}
        value={user.nombre}
      /></View>
      <View style={styles.inputContainer}>

      <TextInput
        label="Telefono"
        placeholder="8442056074"
        onChangeText={(txt) => setUser({...user, telefono: txt})}
        style={styles.input}
        value={user.telefono}
      /></View>
      <View style={styles.inputContainer}>

      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={(txt) => setUser({...user, correo: txt})}
        style={styles.input}
        value={user.correo}
        textContentType="emailAddress"
      /></View>
      <View style={styles.inputContainer}>

      <TextInput
        label="Empresa"
        placeholder="Empresa.com"
        onChangeText={(txt) => setUser({...user, empresa: txt})}
        style={styles.input}
        value={user.empresa}
      /></View>
      <Button icon="pencil-circle" mode="contained" onPress={guardarCliente} >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alert} onDismiss={() => setAlert(false)}>
          <Dialog.Title>Intentelo de nuevo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlert(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderBottomColor: 'red'
  },
  inputContainer: {
    overflow: 'hidden',
    height: Platform.OS === 'android' ? 60 : 70,
    marginBottom: 20
  },
});
