import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text style={styles.name}>Chayanan Inami</Text>
      <Text style={styles.email}>chayanan.inami@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#d1d5db',
    marginBottom: 15 
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  email: { fontSize: 14, color: '#9ca3af' },
});