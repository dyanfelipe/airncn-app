import React, { useState, useEffect } from 'react';
import { SafeAreaView, AsyncStorage, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import Socketio from 'socket.io-client';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(userid => {
      const socket = Socketio('http://192.168.43.134:3333', {
        query: { userid }
      });

      socket.on('booking_response', booking => {
        console.log('UseEffect', booking);
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.aprroved ? 'Aprovada' : 'Rejeitada'}`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});
