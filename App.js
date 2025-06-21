import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Pedometer } from 'expo-sensors';

const App = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [user, setUser] = useState(null);

  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        startPedometerTracking();
      }
    });

    return () => unsubscribe();
  }, []);

  // 歩数計測の開始
  const startPedometerTracking = async () => {
    try {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (isAvailable) {
        const subscription = Pedometer.watchStepCount(result => {
          setStepCount(result.steps);
          saveStepsToDatabase(result.steps);
        });

        return () => subscription.remove();
      }
    } catch (error) {
      console.error('Pedometer error:', error);
    }
  };

  // データベースへの保存
  const saveStepsToDatabase = async (steps) => {
    try {
      if (user) {
        await firestore()
          .collection('steps')
          .doc(user.uid)
          .set({
            steps: steps,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
      }
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  // ログイン処理
  const handleLogin = async () => {
    try {
      const response = await auth().signInAnonymously();
      console.log('Logged in:', response.user.uid);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await auth().signOut();
      setStepCount(0);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.title}>歩数計</Text>
          {isPedometerAvailable ? (
            <Text style={styles.steps}>{stepCount} 歩</Text>
          ) : (
            <Text style={styles.error}>歩数計を利用できません</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>ログアウト</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  steps: {
    fontSize: 48,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default App;