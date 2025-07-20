import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CareeScanSection from './CareeScanSection';
import CarerLoginSection from './CarerLoginSection';

export default function RoleSelectScreen() {
  const [role, setRole] = useState<'carer' | 'caree'>('caree'); // 預設顯示家人畫面

  return (
    <View style={styles.container}>
      {/* 切換角色 tab */}
      <View style={styles.switchTab}>
        <TouchableOpacity onPress={() => setRole('caree')} style={role === 'caree' ? styles.activeTab : styles.inactiveTab}>
          <Text style={styles.tabText}>家人</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('carer')} style={role === 'carer' ? styles.activeTab : styles.inactiveTab}>
          <Text style={styles.tabText}>管理者</Text>
        </TouchableOpacity>
      </View>

      {/* 主體畫面 */}
      <View style={styles.body}>
        {role === 'caree' ? <CareeScanSection /> : <CarerLoginSection />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 100, alignItems: 'center', backgroundColor: '#fff' },
  switchTab: { flexDirection: 'row', marginBottom: 20, borderRadius: 8 },
  activeTab: { paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#ccc', borderRadius: 8 },
  inactiveTab: { paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#eee', borderRadius: 8 },
  tabText: { fontSize: 16 },
  body: { width: '100%', alignItems: 'center' }
});
