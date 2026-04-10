# DPS
Implementé validaciones robustas, persistencia local con AsyncStorage y control de fechas evitando valores inválidos”

npm install @react-navigation/native
>> npx expo install react-native-screens react-native-safe-area-context
>> npm install @react-navigation/native-stack

npx expo install expo-image-picker

# Instalar dependencias del proyecto
npm install

# Instalar navegación
npm install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack

# Instalar DateTimePicker (IMPORTANTE usar expo)
npx expo install @react-native-community/datetimepicker

npx expo start

⚠️ IMPORTANTE:
Para dependencias nativas como DateTimePicker, usar siempre:

npx expo install

y NO:

npm install

Esto evita errores como:
"Unable to resolve './eventCreators'"

# Si hay errores, limpiar caché
npx expo start -c
