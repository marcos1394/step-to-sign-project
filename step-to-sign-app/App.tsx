// Contenido final y completo para: mobile-app/App.tsx

import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Wallet, Link, Settings } from 'lucide-react-native'; // Iconos para nuestro menú

// Importamos las tres pantallas principales de nuestra aplicación
import WalletScreen from './src/screens/WalletScreen';
import DeviceConnectionScreen from './src/screens/DeviceConnectionScreen';
import CalibrationScreen from './src/screens/CalibrationScreen';

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

export default function App() {
  return (
    // NavigationContainer es el contenedor principal que gestiona el estado de la navegación.
    <NavigationContainer theme={AppTheme}>
      <Drawer.Navigator
        initialRouteName="Billetera" // La primera pantalla que se muestra
        screenOptions={{
          // Estilos para todas las pantallas del menú
          drawerStyle: {
            backgroundColor: '#1e293b',
          },
          drawerInactiveTintColor: 'gray',
          drawerActiveTintColor: '#3b82f6',
          drawerActiveBackgroundColor: '#334155',
          // Estilos para la cabecera de cada pantalla
          headerStyle: {
            backgroundColor: '#1e293b',
          },
          headerTintColor: '#fff',
        }}
      >
        {/* Definimos cada pantalla que aparecerá en nuestro menú */}
        <Drawer.Screen 
          name="Billetera" 
          component={WalletScreen} 
          options={{
            drawerIcon: ({ color }) => <Wallet color={color} size={24} />
          }}
        />
        <Drawer.Screen 
          name="Conectar Dispositivo" 
          component={DeviceConnectionScreen} 
          options={{
            drawerIcon: ({ color }) => <Link color={color} size={24} />
          }}
        />
        <Drawer.Screen 
          name="Calibración IA" 
          component={CalibrationScreen} 
          options={{
            drawerIcon: ({ color }) => <Settings color={color} size={24} />
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}