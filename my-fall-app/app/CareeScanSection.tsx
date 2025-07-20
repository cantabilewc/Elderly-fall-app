import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CareeScanSection() {
  const router = useRouter();

  const mockScanLogin = async () => {
    // 模擬掃描成功後儲存身份並導入首頁
    await AsyncStorage.setItem('@role', 'caree');
    router.replace('/careeHome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>家人</Text>

      <View style={styles.scanBox} />

      <TouchableOpacity onPress={mockScanLogin}>
        <Text style={styles.scanText}>掃描 QRCode 登入</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
  scanBox: {
    width: 200,
    height: 200,
    backgroundColor: '#C8F7DC',
    borderRadius: 12,
    marginBottom: 16,
  },
  scanText: {
    fontSize: 16,
    color: '#444',
    textDecorationLine: 'underline',
  },
});
