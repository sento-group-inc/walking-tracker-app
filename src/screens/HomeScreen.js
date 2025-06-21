import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Pedometer } from 'expo-sensors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkPedometerPermission();
    subscribeToStepCount();
    fetchUserData();
  }, []);

  // ペドメーターの権限チェック
  const checkPedometerPermission = async () => {
    try {
      const result = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(result ? 'available' : 'not available');
    } catch (error) {
      setIsPedometerAvailable('not available');
      Alert.alert('Error', 'Failed to check pedometer permission');
    }
  };

  // 歩数のサブスクリプション設定
  const subscribeToStepCount = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
      saveStepCountToFirestore(result.steps);
    });

    return () => subscription && subscription.remove();
  };

  // ユーザーデータの取得
  const fetchUserData = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        setUserData(userDoc.data());
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  // 歩数データの保存
  const saveStepCountToFirestore = async (steps) => {
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore()
          .collection('stepCounts')
          .doc(user.uid)
          .set({
            steps,
            timestamp: firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
      }
    } catch (error) {
      console.error('Error saving step count:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.status}>
        Pedometer status: {isPedometerAvailable}
      </Text>
      <Text style={styles.steps}>Steps today: {stepCount}</Text>
      {userData && (
        <Text style={styles.userData}>
          Welcome, {userData.name || 'User'}!
        </Text>
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
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  steps: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  userData: {
    fontSize: 18,
    color: '#666',
  },
});

export default HomeScreen;