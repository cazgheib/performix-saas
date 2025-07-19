import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { gymService } from '../services/gymService';

const GymSetupScreen = ({ navigation }: any) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    primaryColor: '#007AFF',
    secondaryColor: '#34C759',
    subscriptionPlan: 'monthly' as 'daily' | 'weekly' | 'monthly' | 'yearly',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGym = async () => {
    if (!formData.name || !formData.location || !formData.contactEmail) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      if (token) {
        await gymService.createGym(formData, token);
        Alert.alert('Success', 'Gym created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create gym');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Setup Your Gym</Text>
        <Text style={styles.subtitle}>Let's get your fitness business started</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Gym Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gym name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="City, State"
          value={formData.location}
          onChangeText={(text) => setFormData({ ...formData, location: text })}
        />

        <Text style={styles.label}>Contact Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="contact@yourgym.com"
          value={formData.contactEmail}
          onChangeText={(text) => setFormData({ ...formData, contactEmail: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="(555) 123-4567"
          value={formData.contactPhone}
          onChangeText={(text) => setFormData({ ...formData, contactPhone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell us about your gym..."
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={4}
        />

        <View style={styles.colorSection}>
          <Text style={styles.label}>Brand Colors</Text>
          <View style={styles.colorRow}>
            <View style={styles.colorInput}>
              <Text style={styles.colorLabel}>Primary</Text>
              <View style={[styles.colorPreview, { backgroundColor: formData.primaryColor }]} />
            </View>
            <View style={styles.colorInput}>
              <Text style={styles.colorLabel}>Secondary</Text>
              <View style={[styles.colorPreview, { backgroundColor: formData.secondaryColor }]} />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleCreateGym}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating Gym...' : 'Create Gym'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6c5ce7',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '300',
  },
  form: {
    padding: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e8ecf0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  colorSection: {
    marginTop: 20,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorInput: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  colorLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  colorPreview: {
    width: 60,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8ecf0',
  },
  button: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#6c5ce7',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GymSetupScreen;
