// mobile-app/App.tsx
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Wallet, Settings } from 'lucide-react-native'; // Iconos

import WalletScreen from './src/screens/WalletScreen';
import CalibrationScreen from './src/screens/CalibrationScreen';

const Tab = createBottomTabNavigator();

// Tema oscuro personalizado para la navegación
const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#fff',
    background: '#0f172a',
    card: '#1e293b',
    text: '#fff',
    border: '#334155',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Billetera') {
              return <Wallet color={color} size={size} />;
            } else if (route.name === 'Calibración') {
              return <Settings color={color} size={size} />;
            }
          },
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Ocultamos la cabecera por defecto
        })}
      >
        <Tab.Screen name="Billetera" component={WalletScreen} />
        <Tab.Screen name="Calibración" component={CalibrationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}