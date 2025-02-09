import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [
    react(),
=======
  plugins: [react(),
>>>>>>> ba468cbfd0406083d919ab68f8194d0fb745d262
    tailwindcss(),
  ],
})
