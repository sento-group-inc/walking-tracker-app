import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useAuth } from '../contexts/AuthContext';
import { saveStepsToDatabase } from '../services/database';
import { Colors, Typography } from '../styles';

const HomeScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    checkPedometerPermission();
    subscribeToStepCounter();
  }, []);

  const checkPedometerPermission = async () => {
    try {
      const result = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to check pedometer permission');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToStepCounter = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
      if (user) {
        saveStepsToDatabase(user.uid, result.steps);
      }
    });

    return () => subscription && subscription.remove();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isPedometerAvailable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Pedometer is not available on this device
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepCount}>{stepCount}</Text>
        <Text style={styles.stepsLabel}>Steps Today</Text>
      </View>

      <TouchableOpacity
        style={styles.syncButton}
        onPress={subscribeToStepCounter}>
        <Text style={styles.syncButtonText}>Sync Steps</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  stepsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepCount: {
    fontSize: Typography.extraLarge,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  stepsLabel: {
    fontSize: Typography.medium,
    color: Colors.textSecondary,
  },
  syncButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  syncButtonText: {
    color: Colors.white,
    fontSize: Typography.medium,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.medium,
    textAlign: 'center',
    padding: 20,
  },
});

export default HomeScreen;