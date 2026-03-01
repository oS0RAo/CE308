import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const products = [
  { id: '1', name: 'Premium Green Tea Powder', price: '450', description: 'ผงชาเขียวแท้ 100% นำเข้าจากญี่ปุ่น หอมละมุน' },
  { id: '2', name: 'Water', price: '15', description: 'น้ำดื่มที่คุณขาดไม่ได้' },
  { id: '3', name: 'Milk 1.5L', price: '115', description: 'นมแสนอร่อยรสชาตินุ่มนวล' },
];

export default function MarketScreen() {
  return (
    <ScrollView style={styles.container}>
      {products.map((item) => (
        <Pressable
          key={item.id}
          style={styles.card}
          onPress={() => {
            router.push({
              pathname: '/details',
              params: {
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
              },
            });
          }}
        >
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>฿{item.price}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20, 
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eaeaea',
    elevation: 2, 
    shadowColor: '#000000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3,
  },
  name: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#222' 
  },
  price: { 
    fontSize: 14, 
    color: '#f44611',
    marginTop: 8,
    fontWeight: '500'
  },
});