import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

/**
 * This is the root layout for the entire application. It sits at the top level
 * of the 'app' directory and is responsible for:
 * 1. Loading global assets like fonts.
 * 2. Setting up global providers, such as a ThemeProvider for light/dark mode.
 * 3. Defining the top-level navigation structure, which includes the (auth)
 * and (tabs) screen groups.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts for the application.
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        {/* The (auth) group handles sign-in/sign-up screens. Header is hidden by its own layout. */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* The (tabs) group handles the main app screens. Header is hidden by its own layout. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* You can add other top-level modal or detail screens here if needed */}
      </Stack>
    </ThemeProvider>
  );
}
