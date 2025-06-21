// src/styles/AppStyles.js

import { StyleSheet, Dimensions } from 'react-native';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Define common colors
const colors = {
  primary: '#4A90E2',
  secondary: '#F5A623',
  background: '#F8F8F8',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8E8E93',
  error: '#FF3B30',
  success: '#4CD964'
};

// Define common metrics
const metrics = {
  padding: 15,
  borderRadius: 8,
  screenWidth: width,
  screenHeight: height
};

export default StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  },

  // Authentication styles
  authContainer: {
    padding: metrics.padding,
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    width: '90%',
    maxWidth: 400
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: metrics.borderRadius,
    paddingHorizontal: metrics.padding,
    marginBottom: 15
  },
  button: {
    backgroundColor: colors.primary,
    padding: metrics.padding,
    borderRadius: metrics.borderRadius,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },

  // Step counter styles
  stepCounter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary
  },
  stepLabel: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 10
  },

  // Card styles
  card: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  // Error styles
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 10
  },

  // Loading styles
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Navigation styles
  headerStyle: {
    backgroundColor: colors.primary
  },
  headerTitleStyle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  }
});