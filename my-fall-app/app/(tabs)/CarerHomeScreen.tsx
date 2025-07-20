import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import SvgQRCode from 'react-native-qrcode-svg';
import { v4 as uuidv4 } from 'uuid';

export default function CarerHomeScreen() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateAndUploadQRCode = async () => {
      // 取得目前登入的照顧者
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.warn('尚未登入，無法產生 QR Code');
        setLoading(false);
        return;
      }

      const uuid = uuidv4();

      // 準備顯示在 QR Code 的內容
      const payload = {
        uuid,
        caregiverId: user.id,
        createdAt: new Date().toISOString(),
      };
      setQrData(JSON.stringify(payload));

      // 寫入 Supabase elders 資料表
      const { error: insertError } = await supabase.from('elders').insert([
      { id: uuid, caregiver_id: user.id },
      ]);

      if (insertError) {
      console.error('❌ 寫入 elders 表失敗:', insertError); // 👈 用整個物件 log 出來
      }

      setLoading(false);
    };

    generateAndUploadQRCode();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>被照顧者登入 QR Code</Text>
      {loading ? (
        <Text>產生中...</Text>
      ) : qrData ? (
        <SvgQRCode value={qrData} size={250} />
      ) : (
        <Text>產生失敗</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 16 },
});