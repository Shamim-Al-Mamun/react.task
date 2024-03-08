import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define : {
    'process.env': {
      'BASE_URL' : 'https://contact.mediusware.com/api',
      'CSRFToken' : 'AhyczsrO2QrbyvHoZBvfUjx8ZbN271PVRJUmVdbSsYWOfKRD8JmWioUSNtNQRgPp'
    }
  }
})
