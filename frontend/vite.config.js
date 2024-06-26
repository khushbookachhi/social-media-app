import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
   port:3060,
    proxy: {
			"/api": {
				target: process.env.server_URL,
			},
		},
  }
})
