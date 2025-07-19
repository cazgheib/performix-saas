import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';

const SignupScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'athlete' as 'admin' | 'coach' | 'athlete',
    gymId: 'demo-gym-1',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Join Performix</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Role</Text>
          <Picker
            selectedValue={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            style={styles.picker}
          >
            <Picker.Item label="Athlete" value="athlete" />
            <Picker.Item label="Coach" value="coach" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleSignup}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 25,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 12,
    color: '#2c3e50',
    letterSpacing: 0.8,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 40,
    color: '#7f8c8d',
    fontWeight: '300',
  },
  form: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e8ecf0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
    fontWeight: '600',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#e8ecf0',
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  button: {
    backgroundColor: '#6c5ce7',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignupScreen;
