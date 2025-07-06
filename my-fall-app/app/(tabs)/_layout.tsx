import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() { // Expo Router 幫你「自動使用」這個 _layout.tsx, 代表這個檔案（_layout.tsx）預設 export 一個名字叫 TabLayout 的函式元件。
  const colorScheme = useColorScheme();

  return (
    <Tabs                             // JSX 語法: <Tabs> ... </Tabs> 元件標籤
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen       // 元件呼叫語法，會轉成 React.createElement(...)
        name="index"     // JSX 的屬性
        options={{       // JavaScript 物件
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,   // = function IconFunction(props) {  const color = props.color; return <IconSymbol color={color} />;}
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ElderHomeScreen"
        options={{
          title: 'Elder',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="exclamationmark.triangle.fill" color={color} />,
        }}
        />
    </Tabs>
  );
}
