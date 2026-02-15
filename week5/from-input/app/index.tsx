import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Checkbox from "../components/Checkbox";
import RadioGroup from "../components/RadioGroup";
import DateTimePicker from '@react-native-community/datetimepicker';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptTerms: boolean;
  gender: string;
  dob: Date | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptTerms?: string;
  gender?: string;
  dob?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
    gender: "",
    dob: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [isLoading, setIsLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (typeof value === 'string' && !value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (typeof value === 'string' && value.trim().length < 3) return "ชื่อ-นามสกุลต้องอย่างน้อย 3 ตัวอักษร";
        return undefined;

      case "email":
        if (typeof value === 'string' && !value.trim()) return "กรุณากรอกอีเมล";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === 'string' && !emailRegex.test(value)) return "รูปแบบอีเมลไม่ถูกต้อง";
        return undefined;

      case "phone":
        if (typeof value === 'string' && !value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        const phoneRegex = /^[0-9]{10}$/;
        if (typeof value === 'string' && !phoneRegex.test(value)) return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
        return undefined;

      case "password":
        if (!value) return "กรุณากรอกรหัสผ่าน";
        if (typeof value === 'string' && value.length < 6) return "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร";
        return undefined;

      case "confirmPassword":
        if (!value) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน";
        return undefined;

      case "address":
        if (typeof value === 'string' && !value.trim()) return "กรุณากรอกที่อยู่";
        if (typeof value === 'string' && value.trim().length < 10) return "ที่อยู่ต้องมีความยาวอย่างน้อย 10 ตัวอักษร";
        return undefined;

      case "acceptTerms":
        if (value === false) return "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        return undefined;

      case "gender":
        if (!value) return "กรุณาระบุเพศ";
        return undefined;

      case "dob":
        if (!value) return "กรุณาระบุวันเกิด";
        
        const today = new Date();
        const birthDate = new Date(value);
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 13) return "คุณต้องมีอายุ 13 ปีขึ้นไป";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, dob: selectedDate }));
      const error = validateField("dob", selectedDate);
      setErrors(prev => ({ ...prev, dob: error }));
      setTouched(prev => ({ ...prev, dob: true })); 
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("th-TH", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address:"",
      acceptTerms: false,
      gender: "",
      dob: null,
    });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ!",
        `ลงทะเบียนสำเร็จ\n\nชื่อ: ${formData.fullName}\nอีเมล: ${formData.email}\nเบอร์: ${formData.phone}\nวันเกิด: ${formatDate(formData.dob)}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ]
      );
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <RadioGroup
              label="เพศ"
              options={[
                { label: "ชาย", value: "male" },
                { label: "หญิง", value: "female" },
                { label: "ไม่ระบุ", value: "na" },
              ]}
              selectedId={formData.gender}
              onSelect={(value) => {
                handleChange("gender", value);
              }}
              error={errors.gender}
              touched={touched.gender}
            />

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 text-base">
                วันเดือนปีเกิด
              </Text>
              
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white
                  ${errors.dob && touched.dob ? "border-red-500" : "border-gray-300"}
                `}
              >
                <Text className={`text-base ${formData.dob ? "text-gray-800" : "text-gray-400"}`}>
                  {formData.dob ? formatDate(formData.dob) : "DD/MM/YYYY"}
                </Text>
              </TouchableOpacity>

              {errors.dob && touched.dob && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.dob}
                </Text>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            <View>
              <CustomInput
                label="ที่อยู่"
                placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล..."
                value={formData.address}
                onChangeText={(value) => handleChange("address", value)}
                onBlur={() => handleBlur("address")}
                error={errors.address}
                touched={touched.address}
                multiline={true}
                numberOfLines={4}
                maxLength={200}
                style={{ height: 120, textAlignVertical: 'top' }}
              />
              <Text className="text-right text-gray-500 text-xs -mt-3 mb-4 pr-1">
                {formData.address.length}/200
              </Text>
            </View>

            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Checkbox
              label="ฉันยอมรับข้อกำหนดและเงื่อนไข"
              checked={formData.acceptTerms}
              onPress={() => {
                const newValue = !formData.acceptTerms;
                handleChange("acceptTerms", newValue);
              }}
              error={errors.acceptTerms}
              touched={touched.acceptTerms}
            />

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />
              
              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />
            </View>

            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">
                คำแนะนำ
              </Text>
              <Text className="text-blue-700 text-sm leading-5">
                • กรอกข้อมูลให้ครบถ้วน{"\n"}
                • อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                • เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}
                • รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}