import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RadioGroupProps {
  label: string;
  options: { label: string; value: string }[];
  selectedId?: string;
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
}

export default function RadioGroup({
  label,
  options,
  selectedId,
  onSelect,
  error,
  touched,
}: RadioGroupProps) {
  const hasError = touched && error;

  return (
    <View className="mb-4">
      {/* Label หัวข้อ */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      <View className="flex-row flex-wrap gap-4">
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.8}
            className="flex-row items-center mr-4 mb-2"
          >
            <View
              className={`w-5 h-5 rounded-full border-2 justify-center items-center mr-2
                ${selectedId === option.value ? "border-blue-600" : "border-gray-400"}
              `}
            >
              {selectedId === option.value && (
                <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              )}
            </View>
            <Text className="text-gray-700 text-base">{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {hasError && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}