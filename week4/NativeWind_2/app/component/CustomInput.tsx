import { View, Text, TextInput } from "react-native";

type CustomInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: CustomInputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-base font-medium mb-1 ml-1">
        {label}
      </Text>
      <TextInput
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};