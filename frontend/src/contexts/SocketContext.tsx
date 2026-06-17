import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface SensorData {
  temperature: number;
  humidity: number;
  ethylene: number;
  fanStatus: boolean;
  relayStatus: boolean;
  buzzerStatus: boolean;
  esp32Status: 'online' | 'offline';
  wifiStatus: 'connected' | 'disconnected';
  lastUpdated: string;
}

interface SocketContextType {
  socket: Socket | null;
  sensorData: SensorData;
  isConnected: boolean;
  isSimulationMode: boolean;
  setSimulationMode: (mode: boolean) => void;
  updateSimulationData: (data: Partial<SensorData>) => void;
}

const defaultSensorData: SensorData = {
  temperature: 24.5,
  humidity: 60.2,
  ethylene: 0.5,
  fanStatus: false,
  relayStatus: true,
  buzzerStatus: false,
  esp32Status: 'offline',
  wifiStatus: 'disconnected',
  lastUpdated: new Date().toISOString(),
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>(defaultSensorData);
  const [isSimulationMode, setIsSimulationMode] = useState(true); // Default to simulation for now

  useEffect(() => {
    if (isSimulationMode) {
      if (socket) {
        socket.disconnect();
      }
      setIsConnected(false);
      
      // Setup mock simulation interval
      const interval = setInterval(() => {
        setSensorData(prev => ({
          ...prev,
          temperature: +(prev.temperature + (Math.random() - 0.5) * 0.5).toFixed(1),
          humidity: +(prev.humidity + (Math.random() - 0.5) * 1.0).toFixed(1),
          ethylene: Math.max(0, +(prev.ethylene + (Math.random() - 0.5) * 0.1).toFixed(2)),
          lastUpdated: new Date().toISOString(),
          esp32Status: 'online',
          wifiStatus: 'connected',
        }));
      }, 1000);

      return () => clearInterval(interval);
    }

    // Real device mode
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => setIsConnected(true));
    newSocket.on('disconnect', () => setIsConnected(false));
    
    newSocket.on('sensorData', (data: Partial<SensorData>) => {
      setSensorData(prev => ({ ...prev, ...data, lastUpdated: new Date().toISOString() }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isSimulationMode]);

  const setSimulationMode = (mode: boolean) => {
    setIsSimulationMode(mode);
  };

  const updateSimulationData = (data: Partial<SensorData>) => {
    if (isSimulationMode) {
      setSensorData(prev => ({ ...prev, ...data, lastUpdated: new Date().toISOString() }));
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sensorData, isConnected, isSimulationMode, setSimulationMode, updateSimulationData }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
