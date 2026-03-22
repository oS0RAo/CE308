import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addItem, removeItem, clearCart, CartItem } from '../redux/cartSlice';

const CartScreen = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const handleAddItem = () => {
        if (name && quantity && price) {
        const newItem: CartItem = {
            id: Date.now().toString(),
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
        };
        dispatch(addItem(newItem));
        setName('');
        setQuantity('');
        setPrice('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="ชื่อสินค้า" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="จำนวน" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="ราคา" value={price} onChangeText={setPrice} keyboardType="numeric" />

            <Button title="เพิ่มลงตะกร้า" onPress={handleAddItem} />

            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                    <Text>{item.name} x{item.quantity} ราคาต่อจำนวน {item.price} บาท</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(removeItem(item.id))}>
                    <Text style={styles.deleteText}>ลบ</Text>
                    </TouchableOpacity>
                </View>
                )}
            />
            <View style={styles.summaryContainer}>
                <Text style={styles.totalText}>ยอดรวม: {totalAmount} บาท</Text>
                <Button title="ล้างตะกร้า" onPress={() => dispatch(clearCart())} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        padding: 8,
        borderRadius: 5,
    },
    deleteText: {
        color: 'white',
    },
    summaryContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default CartScreen;