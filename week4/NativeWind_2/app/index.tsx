import { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { CustomInput } from "./component/CustomInput";
import { CustomButton } from "./component/CustomButton";
import "./global.css";

export default function Index() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  const handleSubmit = () => {
    if (!productName || !price || !pcs) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    Alert.alert(
      "บันทึกข้อมูลสำเร็จ",
      `สินค้า: ${productName}\nราคา: ${price} บาท\nจำนวน: ${pcs} ชิ้น`
    );
    
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 p-6 pt-12">
        <Text className="text-2xl font-bold text-black mb-6">
          กรอกข้อมูลสินค้า
        </Text>
        <View className="mb-6">
          <CustomInput
            label="ชื่อสินค้า"
            placeholder="กรุณากรอกชื่อสินค้า"
            value={productName}
            onChangeText={setProductName}
          />
          <CustomInput
            label="ราคา"
            placeholder="กรุณากรอกราคา"
            value={price}
            onChangeText={setPrice}
          />
          <CustomInput
            label="จำนวน"
            placeholder="กรุณากรอกจำนวน"
            value={pcs}
            onChangeText={setPcs}
          />
        </View>
        <View className="items-start">
            <CustomButton
            title="ยืนยัน"
            onPress={handleSubmit}
            size="medium" 
            variant="primary"
            />
        </View>
      </View>
    </ScrollView>
  );
}