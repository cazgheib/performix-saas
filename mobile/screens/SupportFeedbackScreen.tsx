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
import { COLORS, SPACING } from '../constants/config';

interface SupportFeedbackScreenProps {
  navigation: any;
}

const SupportFeedbackScreen: React.FC<SupportFeedbackScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'support' | 'feedback'>('support');
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
  });

  const handleSubmit = async () => {
    if (!formData.subject || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      console.log('Submitting:', { ...formData, type: activeTab });
      Alert.alert(
        'Success',
        activeTab === 'support' 
          ? 'Support ticket submitted successfully! We\'ll get back to you soon.'
          : 'Thank you for your feedback! We appreciate your input.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit. Please try again.');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const supportCategories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing & Subscription' },
    { value: 'account', label: 'Account Management' },
    { value: 'classes', label: 'Classes & Booking' },
    { value: 'workouts', label: 'Workouts & Programming' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: COLORS.success },
    { value: 'medium', label: 'Medium', color: COLORS.warning },
    { value: 'high', label: 'High', color: COLORS.error },
  ];

  const renderSupportForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryGrid}>
          {supportCategories.map((category) => (
            <TouchableOpacity
              key={category.value}
              style={[
                styles.categoryButton,
                formData.category === category.value && styles.activeCategoryButton
              ]}
              onPress={() => updateFormData('category', category.value)}
            >
              <Text style={[
                styles.categoryButtonText,
                formData.category === category.value && styles.activeCategoryButtonText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {priorityLevels.map((priority) => (
            <TouchableOpacity
              key={priority.value}
              style={[
                styles.priorityButton,
                formData.priority === priority.value && { backgroundColor: priority.color }
              ]}
              onPress={() => updateFormData('priority', priority.value)}
            >
              <Text style={[
                styles.priorityButtonText,
                formData.priority === priority.value && styles.activePriorityButtonText
              ]}>
                {priority.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={styles.input}
          value={formData.subject}
          onChangeText={(value) => updateFormData('subject', value)}
          placeholder="Brief description of your issue"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Message *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.message}
          onChangeText={(value) => updateFormData('message', value)}
          placeholder="Please provide detailed information about your issue..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderFeedbackForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Feedback Type</Text>
        <View style={styles.feedbackTypes}>
          {[
            { value: 'feature', label: '💡 Feature Request' },
            { value: 'improvement', label: '⚡ Improvement' },
            { value: 'bug', label: '🐛 Bug Report' },
            { value: 'compliment', label: '👏 Compliment' },
          ].map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.feedbackTypeButton,
                formData.category === type.value && styles.activeFeedbackTypeButton
              ]}
              onPress={() => updateFormData('category', type.value)}
            >
              <Text style={[
                styles.feedbackTypeButtonText,
                formData.category === type.value && styles.activeFeedbackTypeButtonText
              ]}>
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={styles.input}
          value={formData.subject}
          onChangeText={(value) => updateFormData('subject', value)}
          placeholder="What's your feedback about?"
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Feedback *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.message}
          onChangeText={(value) => updateFormData('message', value)}
          placeholder="Share your thoughts, suggestions, or report issues..."
          placeholderTextColor={COLORS.textSecondary}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Support & Feedback</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'support' && styles.activeTab]}
          onPress={() => setActiveTab('support')}
        >
          <Text style={[styles.tabText, activeTab === 'support' && styles.activeTabText]}>
            🎧 Support
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feedback' && styles.activeTab]}
          onPress={() => setActiveTab('feedback')}
        >
          <Text style={[styles.tabText, activeTab === 'feedback' && styles.activeTabText]}>
            💬 Feedback
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {activeTab === 'support' 
              ? 'Need help? Submit a support ticket and our team will assist you.'
              : 'Help us improve Performix! Share your feedback, suggestions, or report issues.'
            }
          </Text>
        </View>

        {activeTab === 'support' ? renderSupportForm() : renderFeedbackForm()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {activeTab === 'support' ? 'Submit Support Ticket' : 'Send Feedback'}
          </Text>
        </TouchableOpacity>
      </View>
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
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  description: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  formContainer: {
    padding: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
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
  textArea: {
    height: 120,
    paddingTop: SPACING.md,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeCategoryButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeCategoryButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activePriorityButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  feedbackTypes: {
    gap: SPACING.sm,
  },
  feedbackTypeButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFeedbackTypeButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  feedbackTypeButtonText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  activeFeedbackTypeButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SupportFeedbackScreen;
