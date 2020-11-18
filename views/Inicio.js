import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Button, FAB, Headline, List} from 'react-native-paper';
import globalStyles from '../styles/global';

export default function Inicio({navigation}) {
  const [clientes, setClientes] = useState({});
  const [reload, setReload] = useState(true);
  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url = 'http://192.168.0.6:3000/clientes';

        const resultado = await Axios.get(url);
        setClientes(resultado.data);
        setReload(false);
      } catch (error) {
        console.log(error);
      }
    };
    // if(reload)
    obtenerClientesApi();
  }, [reload]);

  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NuevoCliente', {setReload})}>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={(cliente) => cliente.id.toString()}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() =>
              navigation.navigate('DetallesCliente', {item, setReload})
            }
          />
        )}
      />
      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente', {setReload})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
