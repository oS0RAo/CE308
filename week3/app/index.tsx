import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const PROFILE_DATA = {
  stats: [
    { id: '1', label: 'รหัส', value: '66111144', color: '#008871' },
    { id: '2', label: 'คณะ', value: 'CITE', color: '#a53939' },
    { id: '3', label: 'สาขา', value: 'CE', color: '#7f2a9e' },
  ],

  personalInfo: [
    { id: '1', label: 'ชื่อ', value: 'นาย ชยานันต์ อินามิ' },
    { id: '2', label: 'ชื่อเล่น', value: 'โคนัน' },
    { id: '3', label: 'อีเมล', value: 'chayanan.inami@gmail.com' },
  ],

  education: [
    { id: '1', text: 'ปริญญาตรี: มหาวิทยาลัยธุรกิจบัณฑิตย์' },
    { id: '2', text: 'สาขา วิศวกรรมมคอมพิวเตอร(ปี3)' },
  ],

  address: [
    { id: '1', text: 'บ้านเลขที่ 3 ซอยประชาชื่นนนทบุรี 8 แยก 9 ต.บางเขน อ.เมือง จ.นนทบุรี' },
  ],

  likes: [
    { id: '1', title: 'การพัฒนาเกม' },
    { id: '2', title: 'ศึกษาการทำงานของระบบที่สใจ' },
    { id: '3', title: 'เกม' },
    { id: '4', title: 'อนิเมะ' },
  ],

  dislikes: [
    { id: '1', title: 'Error...' },
    { id: '2', title: 'แก้ Error เก่าแล้วเจออันใหม่' },
    { id: '3', title: 'Hardware ราคาขึ้น' },
  ]
};

const App = () => {

  const renderItem = ({ item }: {item: {id: string; title: string}}) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.row}>
        {PROFILE_DATA.stats.map((item) => (
          <View key={item.id} style={[styles.box, { backgroundColor: item.color }]}>
            <Text style={styles.boxLabel}>{item.label}</Text>
            <Text style={styles.boxValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว:</Text>
        {PROFILE_DATA.personalInfo.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: 'bold' }}>{item.label}: </Text>{item.value}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
        {PROFILE_DATA.education.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: 'bold' }}>{item.text}</Text>
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ที่อยู่:</Text>
        {PROFILE_DATA.address.map((item) => (
          <View key={item.id} style={styles.listItem}>
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: 'bold' }}>{item.text}</Text>
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <View style={[styles.frame, {backgroundColor: '#4600dd'}]}>
          <Text style={styles.frameText}>สิ่งที่ชอบ</Text>
        </View>
        <FlatList
          data={PROFILE_DATA.likes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.contentSection}>
        <View style={[styles.frame, {backgroundColor: '#4600dd'}]}>
          <Text style={styles.frameText}>สิ่งที่ไม่ชอบ</Text>
        </View>
        <FlatList
          data={PROFILE_DATA.dislikes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    backgroundColor: '#c1d6ff',
  },
  header: {
    height: 100,
    backgroundColor: '#1a1461',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 20, 
    marginBottom: 20, 
  },
  headerText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 90,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 4,
  },
  boxValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  boxLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 5,
  },
  contentSection: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#211e45',
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 6,
    borderLeftColor: '#0b0084',
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#23006d',
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#444',
  },
  frame: {
    height: 50,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  frameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 15,
  },
});

export default App;