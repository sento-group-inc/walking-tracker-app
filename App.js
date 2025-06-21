// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pedometer } from 'expo-sensors';

const App = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);
  const [user, setUser] = useState(null);

  // ペドメーターの可用性チェックと歩数計測開始
  useEffect(() => {
    const subscribe = async () => {
      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
          const end = new Date();
          const start = new Date();
          start.setDate(end.getDate() - 1);

          const subscription = Pedometer.watchStepCount(result => {
            setStepCount(result.steps);
          });

          return () => subscription.remove();
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to access pedometer');
      }
    };

    subscribe();
  }, []);

  // ユーザー認証状態の監視
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        saveStepsToDatabase(user.uid, stepCount);
      }
    });

    return () => unsubscribe();
  }, [stepCount]);

  // データベースに歩数を保存
  const saveStepsToDatabase = async (userId, steps) => {
    try {
      await firestore().collection('steps').doc(userId).set({
        steps: steps,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save steps data');
    }
  };

  // ログイン処理
  const handleLogin = async () => {
    try {
      const response = await auth().signInAnonymously();
      setUser(response.user);
    } catch (error) {
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.status}>
        Pedometer available: {isPedometerAvailable}
      </Text>
      <Text style={styles.steps}>Steps taken: {stepCount}</Text>
      
      {!user && (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    marginBottom: 10,
  },
  steps: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;