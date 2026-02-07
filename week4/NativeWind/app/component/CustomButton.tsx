import { Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
};

export const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
}: CustomButtonProps) => {
  
  const containerClasses = {
    small: "px-3 py-1",
    medium: "px-4 py-2",
    large: "px-6 py-3",
  };

  const textClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const variantClasses = {
    primary: "bg-blue-500 active:bg-blue-700",
    secondary: "bg-gray-500 active:bg-gray-700",
    danger: "bg-red-500 active:bg-red-700",
  };

  return (
    <TouchableOpacity
      className={`rounded-lg items-center justify-center active:bg-opacity-70 ${containerClasses[size]} ${variantClasses[variant]}`}
      onPress={onPress}
    >
      <Text className={`text-white font-semibold ${textClasses[size]}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};