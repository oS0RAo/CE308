import { View, FlatList } from "react-native";
import { ItemCard } from "./component/ItemCard";
import "./global.css";

export default function Index() {

  const items = [
    {
      id: "1",
      productName: "Banana",
      price: 2000,
      pcs: 10,
      btnSize: "small" as const,
      btnColor: "primary" as const,
    },
    {
      id: "2",
      productName: "Mango",
      price: 2000,
      pcs: 10,
      btnSize: "medium" as const,
      btnColor: "secondary" as const,
    },
    {
      id: "3",
      productName: "Apple",
      price: 2000,
      pcs: 10,
      btnSize: "large" as const,
      btnColor: "danger" as const,
    },
  ];

  return (
    <View className="flex-1 bg-white pt-12">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}