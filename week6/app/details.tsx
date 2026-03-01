import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen() {
  const { name, price, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={50} color="#a1a1aa" />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>฿{price}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  imagePlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: '#f4f4f5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  price: { fontSize: 20, color: '#ef4444', fontWeight: 'bold', marginBottom: 15 },
  desc: { fontSize: 16, color: '#52525b', textAlign: 'center', lineHeight: 24, paddingHorizontal: 10 },
});