import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#f4511e',
      headerStyle: { backgroundColor: '#fff' },
      headerShadowVisible: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Market',
          headerTitle: 'Market',
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'My Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}