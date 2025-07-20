import { supabase } from '@/lib/supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import SvgQRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

export default function ElderHomeStandalone() {
  const [qrData, setQrData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const generateQrData = async () => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const uuid = uuidv4();

      const payload = {
        uuid,
        carerId: user.id,
        createdAt: new Date().toISOString(),
      };

      setQrData(JSON.stringify(payload));
    };

    generateQrData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@role');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>被照顧者登入 QR Code</Text>
      {qrData ? (
        <SvgQRCode value={qrData} size={250} />
      ) : (
        <Text>載入中...</Text>
      )}
      <Button title="登出 / 重選角色" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 },
  title: { fontSize: 20, marginBottom: 20 },
});
