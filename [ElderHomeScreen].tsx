import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// **Mock 版 ElderHomeScreen**
// 這份程式去掉了 expo‑location 與 BLE，相依套件為零，
// 方便你先跑畫面、測試 UI。日後只要把 TODO 標記處
// 換成真實 BLE 與 Firebase 呼叫即可。

const FALL_CONFIRM_TIMEOUT = 15000; // 15 秒倒數

export default function ElderHomeScreen() {
  // 模擬裝置已連線
  const [isConnected] = useState(true);

  // 跌倒確認 Dialog 相關 state
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [countDown, setCountDown] = useState(15);

  // ===== 模擬『偵測到跌倒』的開發按鈕 =====
  const triggerFallMock = () => {
    setConfirmVisible(true);
    setCountDown(15);

    // 開始倒數
    const interval = setInterval(() => setCountDown((c) => c - 1), 1000);
    const timer = setTimeout(() => {
      handleNeedHelp();
    }, FALL_CONFIRM_TIMEOUT);

    // 清理計時器
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  };

  // 長者按『我沒事』
  const handleImFine = () => {
    setConfirmVisible(false);
    // TODO: 將『取消求救』寫入後台
  };

  // 自動或手動送出求救事件
  const handleNeedHelp = () => {
    setConfirmVisible(false);
    // TODO: 將『跌倒求救』寫入 Firebase，並推播給照顧者
  };

  return (
    <View style={styles.container}>
      {/* ===== 常駐狀態列 ===== */}
      <View style={styles.statusBar}>
        <Text style={[styles.statusText, { color: isConnected ? '#2ecc71' : '#e74c3c' }]}> {isConnected ? '裝置已連線 (Mock)' : '裝置未連線'} </Text>
      </View>

      {/* ===== 一鍵求救（長按） ===== */}
      <TouchableOpacity style={styles.sosButton} onLongPress={handleNeedHelp}>
        <Text style={styles.sosText}>🔴 長按求救 (Mock)</Text>
      </TouchableOpacity>

      {/* ===== DEV 測試按鈕：模擬跌倒 ===== */}
      <TouchableOpacity style={styles.devButton} onPress={triggerFallMock}>
        <Text style={styles.devText}>DEV: 模擬跌倒</Text>
      </TouchableOpacity>

      {/* ===== 跌倒確認 Dialog ===== */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>您還好嗎？</Text>
            <Text style={styles.modalSub}>若 {countDown} 秒內沒有按下「我沒事」，系統將自動通知家人。</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleImFine}>
              <Text style={styles.okText}>我沒事</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.select({ ios: 60, android: 30 }),
  },
  // ===== 狀態列 =====
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: '#ecf0f1',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  // ===== 求救按鈕 =====
  sosButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sosText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // ===== 開發用測試按鈕 =====
  devButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  devText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  // ===== Modal =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalSub: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  okButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  okText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
