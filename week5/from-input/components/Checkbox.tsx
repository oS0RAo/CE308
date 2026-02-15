import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function Checkbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  const hasError = touched && error;

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          className={`w-6 h-6 rounded border-2 justify-center items-center mr-3
            ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"}
            ${hasError ? "border-red-500" : ""}
          `}
        >
          {checked && (
            <Text className="text-white font-bold text-xs">✓</Text>
          )}
        </View>
        <Text className="text-gray-700 text-base">{label}</Text>
      </TouchableOpacity>

      {hasError && (
        <Text className="text-red-500 text-sm mt-1 ml-9">
          {error}
        </Text>
      )}
    </View>
  );
}