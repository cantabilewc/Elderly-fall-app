import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === 'admin' && password === '123456') {
      await AsyncStorage.setItem('@role', 'carer'); // 確保角色仍存在
      router.replace('/(tabs)');
    } else {
      Alert.alert('登入失敗', '帳號或密碼錯誤');
    }
  };

  const resetRole = async () => {
    await AsyncStorage.removeItem('@role');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="帳號"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="密碼"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="登入" onPress={handleLogin} />
      <View style={{ height: 12 }} /> {/* 加一點間距 */}
      <Button title="← 回到選擇角色" onPress={resetRole} /> {/* 新增這個 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
});
