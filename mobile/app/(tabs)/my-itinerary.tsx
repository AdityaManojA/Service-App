import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyItineraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Itinerary</Text>
      <Text style={styles.subtitle}>This screen will show your saved events.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  },
});
