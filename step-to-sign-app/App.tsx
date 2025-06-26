// Contenido final y completo para: mobile-app/App.tsx

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Wallet, Link, Settings } from 'lucide-react-native'; // Iconos para nuestro menú

// Importamos las tres pantallas principales de nuestra aplicación
import WalletScreen from './src/screens/WalletScreen';
import DeviceConnectionScreen from './src/screens/DeviceConnectionScreen';
import CalibrationScreen from './src/screens/CalibrationScreen';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Creamos la instancia del navegador de menú lateral
const Drawer = createDrawerNavigator();

// Definimos un tema oscuro personalizado para que coincida con nuestra estética
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

// Este es el navegador principal que se muestra DESPUÉS del login
function MainAppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Billetera">
      <Drawer.Screen name="Billetera" component={WalletScreen} options={{ drawerIcon: ({color}) => <Wallet color={color} size={24}/> }} />
      <Drawer.Screen name="Calibración IA" component={CalibrationScreen} options={{ drawerIcon: ({color}) => <Settings color={color} size={24}/> }} />
    </Drawer.Navigator>
  );
}

// Este es el componente raíz que decide qué mostrar
function AppNavigator() {
  const { userData } = useAuth();
  return (
    <NavigationContainer theme={AppTheme}>
      {userData ? <MainAppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}

// Envolvemos todo con nuestro proveedor de autenticación
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}