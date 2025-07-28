import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Adjust path if needed

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            return Alert.alert('Error', 'Please fill in all fields.');
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // On success, the redirect is handled by the (tabs)/_layout.jsx file
        } catch (error) {
            Alert.alert('Sign In Error', 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity 
                style={styles.button} 
                onPress={handleSignIn}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Text>
            </TouchableOpacity>

            <Link href="/sign-up" style={styles.link}>
                Don't have an account? Sign Up
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
    input: { height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 8, marginBottom: 12, paddingHorizontal: 10 },
    button: { backgroundColor: '#0066cc', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    link: { marginTop: 20, textAlign: 'center', color: '#0066cc' }
});