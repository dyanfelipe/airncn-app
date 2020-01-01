import React, { useState } from 'react';
import { SafeAreaView, Alert, TextInput, Text, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const userid = await AsyncStorage.getItem('user');
    await api.post(
      `/spots/${id}/booking`,
      {
        data: date
      },
      {
        headers: { userid }
      }
    );
    Alert.alert('Solicitação de reserva enviada');

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Data de Interesse * </Text>
      <TextInput
        style={styles.input}
        placeholder='Qual a data você quer reservar?'
        placeholderTextColor='#999'
        autoCapitalize='words'
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 40
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
