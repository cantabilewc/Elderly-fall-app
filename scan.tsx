import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ScanScreen() {
  const router = useRouter();

  const resetRole = async () => {
    await AsyncStorage.removeItem('@role');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>這裡將來是掃描 QR Code 的畫面 📷</Text>
      <View style={{ height: 20 }} />
      <Button title="← 回到角色選擇" onPress={resetRole} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
