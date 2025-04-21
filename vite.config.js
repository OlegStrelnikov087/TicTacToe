// export default {
//     root: '.', // по умолчанию Vite ищет index.html в корне
//     build: {
//         outDir: 'dist',
//         emptyOutDir: true,
//     },
// };
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
});

