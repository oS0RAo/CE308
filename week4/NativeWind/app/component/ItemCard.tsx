import { View, Text } from "react-native";
import { CustomButton } from "./CustomButton";

type ItemCardProps = {
  item: {
    id: string;
    productName: string;
    price: number;
    pcs: number;
    btnSize: "small" | "medium" | "large";
    btnColor: "primary" | "secondary" | "danger";
  };
};

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <View className="bg-gray-200 p-5 rounded-xl mb-4 shadow-sm border border-gray-300 mx-4">
      <Text className="text-4xl font-bold text-black mb-2">
        ชื่อสินค้า: {item.productName}
      </Text>
      <View className="mb-4 space-y-1">
        <Text className="text-base text-gray-700">ราคา: {item.price}</Text>
        <Text className="text-base text-gray-700">จำนวน: {item.pcs}</Text>
      </View>
      <View className="items-start">
        <CustomButton
          title="สั่งซื้อ"
          onPress={() => alert(`สั่งซื้อ ${item.productName} เรียบร้อย`)}
          size={item.btnSize}
          variant={item.btnColor}
        />
      </View>
    </View>
  );
};