import { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, ActivityIndicator, TextInput, Keyboard, ScrollView, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as MediaLibrary from 'expo-media-library';

export default function IndexScreen() {
  const [timeInSeconds, setTimeInSeconds] = useState('1'); 
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  

  // ฟังก์ชันเลือกวิดีโอและดึงภาพทันที
  const pickVideoAndExtract = async () => {
    Keyboard.dismiss(); 

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const videoUri = result.assets[0].uri;  
        extractThumbnail(videoUri); 
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเลือกวิดีโอได้');
    }
  };

  // ฟังก์ชันประมวลผลดึงภาพตามเวลา
  const extractThumbnail = async (videoUri: string) => {
    setIsLoading(true);
    setImageUri(null); 
    
    const timeMs = (parseFloat(timeInSeconds) || 0) * 1000;

    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: timeMs, 
      });

      setImageUri(uri); 
    } catch (error: any) {
      console.error('Error generating thumbnail:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถดึงภาพได้\n(เวลาที่ระบุอาจจะเกินความยาวของวิดีโอ)');
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันบันทึกภาพลงเครื่อง
  const saveImageToGallery = async () => {
    if (!imageUri) return;

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(true);
      
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(imageUri);
        Alert.alert('สำเร็จ!', 'รูปภาพถูกบันทึกลงในอัลบั้มมือถือของคุณแล้ว');
      } else {
        Alert.alert('แจ้งเตือน', 'แอปจำเป็นต้องได้รับอนุญาตเพื่อบันทึกรูปภาพลงเครื่องครับ');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถบันทึกรูปภาพได้');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Video <Text style={{fontWeight: '300'}}>Snap</Text></Text>
        <Text style={styles.headerSubtitle}>บันทึกภาพจากวิดีโอในวินาทีที่ต้องการ</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ขั้นตอนที่ 1: กำหนดเวลา</Text>
          </View>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            value={timeInSeconds}
            onChangeText={setTimeInSeconds}
            placeholder="เช่น 1.5 หรือ 5"
            editable={!isLoading}
            maxLength={6}
          />
          <Text style={styles.helperText}>* ใส่เวลาเกินความยาววิดีโอจะดึงภาพไม่ได้</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ขั้นตอนที่ 2: เลือกและดึงภาพ</Text>
          </View>
          {isLoading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.loadingText}>กำลังประมวลผลไฟล์วิดีโอ...</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.mainButton} 
              onPress={pickVideoAndExtract}
              activeOpacity={0.8}
            >
              <Text style={styles.mainButtonText}>เลือกวิดีโอจากอัลบั้ม</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Card ที่ 3: ส่วนแสดงผลและบันทึก (Result Area) */}
        <View style={[styles.card, {marginBottom: 20}]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>ภาพผลลัพธ์</Text>
          </View>
          
          <View style={styles.imageFrame}>
            {imageUri ? (
              <View style={styles.resultWrapper}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.thumbnail}
                  resizeMode="contain"
                />
                
                <TouchableOpacity 
                  style={styles.saveButton} 
                  onPress={saveImageToGallery}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>บันทึกภาพลง Gallery</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.placeholderWrapper}>
                <Text style={styles.placeholderText}>
                  ภาพที่คุณแคปจะแสดงที่นี่{"\n"}
                  (เริ่มโดยการกดปุ่ม เลือกวิดีโอ)
                </Text>
              </View>
            )}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
    fontWeight: '300',
  },
  scrollContent: {
    padding: 15,
    paddingTop: 20,
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 15,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: '#eee',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  timeInput: {
    borderWidth: 1.5,
    borderColor: '#2196F3',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#e3f2fd',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565c0',
    textAlign: 'center',
  },
  helperText: {
    fontSize: 11,
    color: '#d32f2f',
    marginTop: 6,
    fontStyle: 'italic',
    paddingLeft: 2,
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
  mainButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  imageFrame: {
    width: '100%',
    height: 320,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f3f5', 
    overflow: 'hidden',
  },
  resultWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '65%',
    backgroundColor: '#000',
  },
  resultInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timeTagText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2196F3',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    width: '90%',
    padding: 14,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  placeholderWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '300',
  },
});