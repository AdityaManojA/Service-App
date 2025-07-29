//import { Stack } from 'expo-router';
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
    // FIX: Explicitly set the initial route to the (tabs) group.
    // The logic inside the (tabs) layout will then handle the redirect to sign-in.
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
