import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define the structure of an Event object for TypeScript
interface Event {
  id: string;
  title: string;
  speakerName?: string;
  startTime: string;
  endTime: string;
  venue: string;
}

export default function MyItineraryScreen() {
  const [itineraryEvents, setItineraryEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
        setLoading(false);
        return;
    };

    // Listen for changes in the user's itinerary
    const itineraryQuery = query(collection(db, 'itineraries'), where('userId', '==', userId));
    
    const unsubscribe = onSnapshot(itineraryQuery, async (itinerarySnapshot) => {
      const eventIds = itinerarySnapshot.docs.map(doc => doc.data().eventId);

      if (eventIds.length === 0) {
        setItineraryEvents([]);
        setLoading(false);
        return;
      }

      // Fetch the full event details for the saved event IDs
      const scheduleQuery = query(collection(db, 'schedule'), where('__name__', 'in', eventIds));
      const scheduleSnapshot = await getDocs(scheduleQuery);
      
      const events = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      // Sort events by start time
      events.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      
      setItineraryEvents(events);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  if (loading) {
    return <View style={[styles.container, styles.centered]}><ActivityIndicator size="large" color="#4f46e5" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Itinerary</Text>
      <FlatList
        data={itineraryEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                {item.speakerName && <Text style={styles.speakerName}>{item.speakerName}</Text>}
                <Text style={styles.venueText}>{item.venue}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>You haven't added any events to your itinerary yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', paddingTop: 40 },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#111827', paddingHorizontal: 20, marginBottom: 16 },
  eventItem: { backgroundColor: 'white', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb', flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderRadius: 8, marginBottom: 10 },
  timeContainer: { width: 80, alignItems: 'flex-start' },
  timeText: { fontSize: 14, fontWeight: '600', color: '#4f46e5' },
  detailsContainer: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  speakerName: { fontSize: 14, color: '#374151', marginTop: 2 },
  venueText: { fontSize: 14, color: '#6b7280', marginTop: 2 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#6b7280' },
});
