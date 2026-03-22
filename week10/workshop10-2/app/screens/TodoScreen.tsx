import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTodo, toggleTodo, removeTodo, Todo } from '../redux/todoSlice';

const TodoScreen = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="เพิ่มงาน"
        value={text}
        onChangeText={setText}
      />
      <Button title="เพิ่มงาน" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity 
                style={styles.todoTextContainer} 
                onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text style={[styles.todoText, item.completed && styles.completedText]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => dispatch(removeTodo(item.id))}>
              <Text style={styles.deleteText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 10, 
    backgroundColor: '#fff' 
  },
  itemContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#fff' },
  todoTextContainer: { 
    flex: 1 
  },
  todoText: { 
    fontSize: 16 
  },
  completedText: { 
    textDecorationLine: 'line-through', 
    color: '#888' 
  },
  deleteButton: { 
    backgroundColor: '#ff4d4f', 
    padding: 8, 
    borderRadius: 5, 
    marginLeft: 10 
  },
  deleteText: { 
    color: 'white' 
  },
});

export default TodoScreen;