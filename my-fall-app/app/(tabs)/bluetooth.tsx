// app/(tabs)/bluetooth.tsx
import React from 'react';
import { Text, View } from 'react-native';

export default function BluetoothScreen() {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🔵 Bluetooth Page</Text>
      <Text style={{ marginTop: 10 }}>目前未啟用 BLE 模組，可在 Expo Go 中正常預覽</Text>
    </View>
  );
}