import { supabase } from '@/lib/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CarerLoginSection() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      Alert.alert('登入失敗', error?.message || '未知錯誤');
      return;
    }

    // 儲存身份
    await AsyncStorage.setItem('@role', 'carer');

    // 導向照顧者的 tabs 頁面
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>照顧者登入</Text>
      <View style={styles.avatar} />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="密碼"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>登入</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#B8EFCF',
    borderRadius: 50,
    marginBottom: 24,
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#888',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  loginButton: {
    backgroundColor: '#9BE7B4',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    marginTop: 12,
  },
  loginText: {
    fontSize: 16,
    color: '#000',
  },
});
