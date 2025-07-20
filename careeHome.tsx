import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CareeHome() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@role');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>被照顧者主頁成功載入 🎉</Text>
      <Button title="登出 / 重選角色" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  text: { fontSize: 20 },
});
