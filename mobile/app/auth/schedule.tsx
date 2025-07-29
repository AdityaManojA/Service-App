import React, 'useState', useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SectionList, TouchableOpacity, Alert } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust path if needed
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

// Define the structure for the SectionList data
interface ScheduleSection {
  title: string; // e.g., "Wednesday, October 29"
  data: Event[];
}

export default function ScheduleScreen() {
  const [sections, setSections] = useState<ScheduleSection[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const scheduleQuery = query(collection(db, 'schedule'), orderBy('startTime'));

    const unsubscribe = onSnapshot(scheduleQuery, (snapshot) => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      
      // Group events by day
      const groupedEvents = events.reduce((acc, event) => {
        const eventDate = new Date(event.startTime).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        if (!acc[eventDate]) {
          acc[eventDate] = [];
        }
        acc[eventDate].push(event);
        return acc;
      }, {} as Record<string, Event[]>);

      // Format for SectionList
      const formattedSections = Object.keys(groupedEvents).map(date => ({
        title: date,
        data: groupedEvents[date]
      }));

      setSections(formattedSections);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToItinerary = (event: Event) => {
    // This functionality will be fully implemented in a later step
    Alert.alert("Add to Itinerary", `"${event.title}" will be added to your personal itinerary.`);
  };
  
  const handleViewDetails = (eventId: string) => {
    // This will navigate to a new screen showing the event's abstract and full details
    // We will build this screen next.
    router.push(`/event/${eventId}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conference Schedule</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem} onPress={() => handleViewDetails(item.id)}>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                {item.speakerName && <Text style={styles.speakerName}>{item.speakerName}</Text>}
                <Text style={styles.venueText}>{item.venue}</Text>
            </View>
            <TouchableOpacity style={styles.itineraryButton} onPress={() => handleAddToItinerary(item)}>
                <Ionicons name="star-outline" size={24} color="#4f46e5" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No events have been scheduled yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 40,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 20,
    color: '#374151',
  },
  eventItem: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeContainer: {
    width: 80,
    alignItems: 'flex-start',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4f46e5',
  },
  detailsContainer: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  speakerName: {
    fontSize: 14,.
    color: '#374151',
    marginTop: 2,
  },
  venueText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  itineraryButton: {
    padding: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6b7280',
  },
}); 