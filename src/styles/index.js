// src/styles/index.js
import { StyleSheet, Dimensions } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Define color palette
const colors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  background: '#F5F6F7',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  error: '#FF3B30',
  success: '#4CD964',
};

// Define common spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Define font sizes
const typography = {
  title: 24,
  subtitle: 20,
  body: 16,
  caption: 14,
  small: 12,
};

// Main StyleSheet object
export default StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Authentication styles
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  authInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  authButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  authButtonText: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: 'bold',
  },

  // Step counter styles
  stepCounter: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  stepLabel: {
    fontSize: typography.subtitle,
    color: colors.gray,
    marginTop: spacing.sm,
  },

  // Card styles
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Error styles
  errorText: {
    color: colors.error,
    fontSize: typography.caption,
    marginBottom: spacing.sm,
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Common text styles
  title: {
    fontSize: typography.title,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.subtitle,
    color: colors.gray,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: typography.body,
    color: colors.black,
  },
});

// Export color palette and other constants for use in other files
export { colors, spacing, typography };