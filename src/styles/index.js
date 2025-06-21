// Global styles for the pedometer mobile application
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Color palette
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

// Font sizes
const typography = {
  title: 24,
  subtitle: 20,
  body: 16,
  caption: 14,
  small: 12,
};

// Common spacing values
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Global styles
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Auth screens
  authContainer: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  authInput: {
    height: 48,
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
    fontWeight: '600',
  },
  // Pedometer screen
  pedometerContainer: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  // Stats display
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginVertical: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // Error states
  errorText: {
    color: colors.error,
    fontSize: typography.caption,
    marginBottom: spacing.sm,
  },
  // Loading states
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export { colors, typography, spacing };