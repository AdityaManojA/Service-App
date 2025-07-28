import { Stack } from 'expo-router';
import React from 'react';

/**
 * This is the layout for the authentication group of screens.
 * It uses a Stack navigator to manage the sign-in and sign-up screens.
 * The headerShown option is set to false to provide a cleaner, full-screen
 * experience for the authentication flow, without a top navigation bar.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
    