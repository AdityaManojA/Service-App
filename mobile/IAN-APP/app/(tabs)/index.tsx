import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust path if needed
import { Ionicons } from '@expo/vector-icons';

// Define the structure of an Event object for TypeScript
interface Event {
  id: string;
  title: string;
  speakerName?: string;
  designation?: string;
  startTime: string;
  endTime: string;
  venue: string;
}

export default function HomeScreen() {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up a real-time listener to the 'schedule' collection in Firestore
    const scheduleQuery = query(collection(db, 'schedule'), orderBy('startTime'));

    const unsubscribe = onSnapshot(scheduleQuery, (snapshot) => {
      const now = new Date();
      let activeEvent: Event | null = null;

      snapshot.forEach(doc => {
        const event = { id: doc.id, ...doc.data() } as Event;
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);

        // Check if the current time is between the event's start and end time
        if (now >= startTime && now <= endTime) {
          activeEvent = event;
        }
      });

      setCurrentEvent(activeEvent);
      setLoading(false);
    });

    // Cleanup: detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Show a loading indicator while fetching data
  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading Schedule...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Happening Now</Text>
      
      {currentEvent ? (
        // If there is an active event, display its details
        <View style={styles.card}>
          <Text style={styles.eventTitle}>{currentEvent.title}</Text>
          {currentEvent.speakerName && (
            <Text style={styles.speakerName}>{currentEvent.speakerName}</Text>
          )}
          {currentEvent.designation && (
            <Text style={styles.designation}>{currentEvent.designation}</Text>
          )}
          <View style={styles.infoContainer}>
            <Ionicons name="location-outline" size={20} color="#6b7280" />
            <Text style={styles.infoText}>{currentEvent.venue}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons name="time-outline" size={20} color="#6b7280" />
            <Text style={styles.infoText}>
              {new Date(currentEvent.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {' - '}
              {new Date(currentEvent.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      ) : (
        // If no event is currently active, show a message
        <View style={styles.card}>
          <Text style={styles.noEventText}>No event is currently in session.</Text>
          <Text style={styles.noEventSubText}>Please check the full schedule for upcoming events.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6', // A light gray background
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4b5563',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 8,
  },
  speakerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  designation: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#374151',
  },
  noEventText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#374151',
  },
  noEventSubText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 8,
  },
});
