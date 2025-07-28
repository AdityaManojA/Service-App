// IAN-APP/constants/Colors.ts

const colors = {
  // Dark Mode Colors
  dark_background: '#1A1A2E', // The deep navy background
  dark_card: '#2A2A3D',       // The slightly lighter card background
  dark_purple: '#D02F8A',     // The vibrant purple/magenta accent
  dark_text: '#FFFFFF',       // White text
  dark_text_subtle: '#B0B0B0', // Lighter gray for secondary text

  // Light Mode Colors
  light_background: '#F7F7F7', // Off-white background
  light_card: '#FFFFFF',       // Pure white cards
  light_teal: '#00838F',       // The teal accent color for titles and pins
  light_text: '#121212',       // Almost black text
  light_text_subtle: '#666666', // Gray for secondary text
};

export default {
  light: {
    background: colors.light_background,
    card: colors.light_card,
    text: colors.light_text,
    textSubtle: colors.light_text_subtle,
    primary: colors.light_teal,
    tabIconDefault: '#ccc',
    tabIconSelected: colors.light_teal,
  },
  dark: {
    background: colors.dark_background,
    card: colors.dark_card,
    text: colors.dark_text,
    textSubtle: colors.dark_text_subtle,
    primary: colors.dark_purple,
    tabIconDefault: '#ccc',
    tabIconSelected: colors.dark_purple,
  },
};