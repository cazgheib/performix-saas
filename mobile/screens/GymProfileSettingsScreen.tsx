import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING } from '../constants/config';

interface GymProfileSettingsScreenProps {
  navigation: any;
}

const GymProfileSettingsScreen: React.FC<GymProfileSettingsScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'CrossFit Downtown',
    email: 'info@crossfitdowntown.com',
    phone: '(555) 123-4567',
    website: 'https://crossfitdowntown.com',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    description: 'Premier CrossFit gym in downtown San Francisco',
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    subscriptionPlan: 'Pro',
    subscriptionStatus: 'Active',
    nextBillingDate: '2024-08-15',
  });

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      console.log('Updating gym profile:', formData);
      setIsEditing(false);
      Alert.alert('Success', 'Gym profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update gym profile');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (user?.role !== 'admin') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.accessDenied}>
          <Text style={styles.accessDeniedText}>Access Denied</Text>
          <Text style={styles.accessDeniedSubtext}>
            Only administrators can manage gym settings
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gym Settings</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gym Name *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              placeholder="Gym name"
              placeholderTextColor={COLORS.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="gym@example.com"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone *</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              placeholder="(555) 123-4567"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="phone-pad"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData.website}
              onChangeText={(value) => updateFormData('website', value)}
              placeholder="https://yourgym.com"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="url"
              autoCapitalize="none"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea, !isEditing && styles.disabledInput]}
              value={formData.description}
              onChangeText={(value) => updateFormData('description', value)}
              placeholder="Tell members about your gym..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.disabledInput]}
              value={formData.address}
              onChangeText={(value) => updateFormData('address', value)}
              placeholder="123 Main Street"
              placeholderTextColor={COLORS.textSecondary}
              editable={isEditing}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex2]}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={formData.city}
                onChangeText={(value) => updateFormData('city', value)}
                placeholder="City"
                placeholderTextColor={COLORS.textSecondary}
                editable={isEditing}
              />
            </View>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={formData.state}
                onChangeText={(value) => updateFormData('state', value)}
                placeholder="CA"
                placeholderTextColor={COLORS.textSecondary}
                maxLength={2}
                autoCapitalize="characters"
                editable={isEditing}
              />
            </View>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Zip</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.disabledInput]}
                value={formData.zipCode}
                onChangeText={(value) => updateFormData('zipCode', value)}
                placeholder="12345"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                maxLength={5}
                editable={isEditing}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Branding</Text>
          
          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Primary Color</Text>
              <View style={styles.colorInputContainer}>
                <View style={[styles.colorPreview, { backgroundColor: formData.primaryColor }]} />
                <TextInput
                  style={[styles.input, styles.colorInput, !isEditing && styles.disabledInput]}
                  value={formData.primaryColor}
                  onChangeText={(value) => updateFormData('primaryColor', value)}
                  placeholder="#007AFF"
                  placeholderTextColor={COLORS.textSecondary}
                  autoCapitalize="none"
                  editable={isEditing}
                />
              </View>
            </View>
            <View style={[styles.inputContainer, styles.flex1]}>
              <Text style={styles.label}>Secondary Color</Text>
              <View style={styles.colorInputContainer}>
                <View style={[styles.colorPreview, { backgroundColor: formData.secondaryColor }]} />
                <TextInput
                  style={[styles.input, styles.colorInput, !isEditing && styles.disabledInput]}
                  value={formData.secondaryColor}
                  onChangeText={(value) => updateFormData('secondaryColor', value)}
                  placeholder="#5856D6"
                  placeholderTextColor={COLORS.textSecondary}
                  autoCapitalize="none"
                  editable={isEditing}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.planName}>{formData.subscriptionPlan} Plan</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: formData.subscriptionStatus === 'Active' ? COLORS.success : COLORS.error }
              ]}>
                <Text style={styles.statusText}>{formData.subscriptionStatus}</Text>
              </View>
            </View>
            
            <Text style={styles.billingInfo}>
              Next billing: {formData.nextBillingDate}
            </Text>
            
            <View style={styles.subscriptionActions}>
              <TouchableOpacity style={styles.subscriptionButton}>
                <Text style={styles.subscriptionButtonText}>Change Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.subscriptionButton, styles.cancelButton]}>
                <Text style={styles.subscriptionButtonText}>Cancel Subscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  editButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  editButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disabledInput: {
    backgroundColor: COLORS.background,
    color: COLORS.textSecondary,
  },
  textArea: {
    height: 80,
    paddingTop: SPACING.md,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  colorInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  colorPreview: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  colorInput: {
    flex: 1,
  },
  subscriptionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  billingInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  subscriptionActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  subscriptionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.error,
  },
  subscriptionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  accessDeniedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  accessDeniedSubtext: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default GymProfileSettingsScreen;
