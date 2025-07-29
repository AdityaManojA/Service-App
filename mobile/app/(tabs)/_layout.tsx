import React, { useState, useEffect } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase'; // Corrected import path
import { Ionicons } from '@expo/vector-icons'; // Ensure you have installed @expo/vector-icons

/**
 * This layout component acts as a gatekeeper for the main application screens.
 * It uses Firebase's onAuthStateChanged listener to check the user's login status in real-time.
 * * - If the user is logged in, it renders the main tab navigator.
 * - If the user is not logged in, it redirects them to the sign-in screen.
 * - It shows a loading state (returns null) while Firebase checks the initial auth state
 * to prevent a screen flicker.
 */
export default function TabsLayout() {
  const [user, setUser] = useState<any>(null); // Using 'any' for simplicity, can be typed to Firebase User
  
  // This state prevents the screen from flickering while Firebase checks the auth status.
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // onAuthStateChanged is a real-time listener. It runs once on component mount
    // and again every time a user signs in or out.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoaded(true);
    });

    // Cleanup function to detach the listener when the component is unmounted.
    return () => unsubscribe();
  }, []);

  if (!isLoaded) {
    return null;
  }

  // If the check is complete and there is no user, redirect to the sign-in page.
  if (!user) {
    // FIX: Use the object syntax for the href prop to satisfy TypeScript.
    return <Redirect href="/sign-in" />;
  }

  // If a user is logged in, render the main application tabs.
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header for all screens in the tabs
        tabBarActiveTintColor: '#4f46e5', // Example: Indigo color for active tab
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index" // This corresponds to app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule" // This corresponds to app/(tabs)/schedule.tsx
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="my-itinerary" // This corresponds to app/(tabs)/my-itinerary.tsx
        options={{
          title: 'My Itinerary',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
