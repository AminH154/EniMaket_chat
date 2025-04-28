import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws', // Utilisation explicite de WebSocket
      host: 'localhost', // Hôte local
      port: 5173, // Port du serveur Vite
    },
    watch: {
      usePolling: true, // Active le polling pour éviter les problèmes de fichiers non détectés
    },
  },
  plugins: [react()],
});