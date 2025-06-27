// mobile-app/src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { decodeJwt } from 'jose';

import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { generateNonce, generateRandomness, getZkLoginSignature, jwtToAddress } from '@mysten/sui/zklogin';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

// Cierra la ventana del navegador automáticamente después del login
WebBrowser.maybeCompleteAuthSession();

// --- Definición de Tipos ---
interface UserData {
  address: string;
  salt: string;
  jwt: string; 

}

interface AuthContextData {
  userData: UserData | null;
  login: () => void;
  logout: () => void;
  isLoggingIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// --- Configuración de zkLogin ---
const GOOGLE_CLIENT_ID = '322077442996-1h8528pfc6f662h8all6e8c0qp0ev5hh.apps.googleusercontent.com';
const ZK_PROVER_URL = 'https://prover-dev.mystenlabs.com/v1';

// --- El Proveedor del Contexto ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Hook de Expo para manejar el flujo de autenticación de Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
  });

  // Este useEffect se activa cuando Google nos devuelve una respuesta.
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleResponse(id_token);
    } else if (response?.type === 'error' || response?.type === 'cancel') {
        setIsLoggingIn(false);
    }
  }, [response]);
  
  // Función principal para manejar la lógica después de recibir el token de Google.
  const handleGoogleResponse = async (jwt: string) => {
    try {
      console.log("JWT recibido de Google, generando dirección de Sui...");
      
      const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });
      const { epoch } = await suiClient.getLatestSuiSystemState();

      // Generamos una clave efímera y una aleatoriedad para el nonce.
      const ephemeralKeypair = new Ed25519Keypair();
      const randomness = generateRandomness();
      const maxEpoch = Number(epoch) + 2;

      // Generamos el nonce que Google debe incluir en su token.
      // Esta es una medida de seguridad crucial.
      const nonce = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);
      
      // Decodificamos el JWT para obtener el 'sub' (ID de usuario de Google)
      const decodedJwt = decodeJwt(jwt);
      if (!decodedJwt.sub || !decodedJwt.aud) {
        throw new Error("JWT Inválido");
      }
      
      // Generamos una "sal" para el usuario. En una app real, esta sal se debe
      // guardar de forma segura y ser la misma para cada login del mismo usuario.
      const salt = generateRandomness();

      // Generamos la dirección zkLogin.
      const address = jwtToAddress(jwt, salt);
      
      console.log(`✅ Dirección Sui generada con éxito: ${address}`);
      setUserData({ address, salt, jwt }); // Guardamos los 3 datos

    } catch (error) {
      console.error("Error en el flujo de zkLogin:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const login = () => {
    setIsLoggingIn(true);
    promptAsync(); // Esto abre la ventana de login de Google.
  };

  const logout = () => {
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, isLoggingIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto.
export const useAuth = () => {
  return useContext(AuthContext);
};
