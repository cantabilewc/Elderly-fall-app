import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('請輸入帳號與密碼');
      return;
    }

    // TODO: 這裡可以之後串後端登入
    Alert.alert('登入成功', `帳號：${username}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>管理者登入</Text>
      <TextInput
        style={styles.input}
        placeholder="帳號"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="密碼"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="登入" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
