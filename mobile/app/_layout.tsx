import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import 'react-native-reanimated';

/**
 * This is the root layout for the entire application. It sits at the top level
 * of the 'app' directory and is responsible for:
 * 1. Loading global assets like fonts.
 * 2. Defining the top-level navigation structure, which includes BOTH the (auth)
 * and (tabs) screen groups.
 */
export default function RootLayout() {
  // Load custom fonts for the application.
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    // Add other fonts here if you have them, e.g., Poppins-Bold
  });

  // Throw an error if the fonts fail to load.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Prevent rendering the app until the fonts are loaded.
  if (!fontsLoaded) {
    return null;
  }

  // Render the main application structure.
  return (
    <Stack>
      {/* This line tells the router about your authentication screens. */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      
      {/* This line tells the router about your main app screens with the tab bar. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
