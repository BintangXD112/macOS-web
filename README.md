# macOS Web

Rasakan pengalaman desktop ala macOS langsung di browser Anda! Proyek ini menghadirkan replika antarmuka macOS yang interaktif, lengkap dengan Dock dinamis, Menu Bar, Control Center, wallpaper otentik, dan berbagai aplikasi bawaan yang siap digunakan.

---

## ✨ Fitur Unggulan

- **Wallpaper Otentik & Desktop Blur**: Latar belakang khas macOS dengan efek blur modern.
- **Dock Interaktif**: Dock dengan efek pembesaran ikon saat hover, mirip aslinya.
- **Menu Bar Dinamis**: Menu bar dengan logo Apple, nama aplikasi aktif, dan jam real-time.
- **Control Center Fungsional**: Panel kontrol cepat untuk Wi-Fi, Bluetooth, Jangan Ganggu, dan tampilan.
- **Manajemen Window**: Buka, minimalkan, maksimalkan, dan pindahkan window aplikasi sesuka hati.
- **Aplikasi Bawaan**:
  - **Finder**: Jantung navigasi utama.
  - **Browser**: Jelajahi web langsung dari "macOS" Anda.
  - **Gemini Chat**: Chatbot AI berbasis Google Gemini (butuh API key).
  - **VS Code**: Editor kode berbasis Monaco, siap untuk ngoding.
  - **Notes**: Catatan sederhana, cocok untuk ide dadakan.
  - **Kalkulator**: Kalkulator fungsional.
  - **Kalender**: Lihat tanggal dan rencana harian.
  - **Pengaturan**: Ubah tampilan, wallpaper, suara, dan lainnya.

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (disarankan versi terbaru)

### Langkah Instalasi
1. **Clone repo ini**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **(Opsional) Siapkan Gemini API Key**
   - Buat file `.env.local` dan tambahkan:
     ```env
     GEMINI_API_KEY=your_google_gemini_api_key
     ```
   - Fitur Gemini Chat hanya aktif jika API key tersedia.
4. **Jalankan aplikasi**
   ```bash
   npm run dev
   ```
5. **Buka di browser**
   - Kunjungi [http://localhost:5173](http://localhost:5173) (atau sesuai info terminal)

---

## 📦 Teknologi yang Digunakan
- React 19
- Vite
- TailwindCSS (CDN)
- Monaco Editor
- Google Gemini API

---

## 💡 Inspirasi & Kontribusi
Proyek ini terinspirasi dari keindahan dan kenyamanan macOS. Kontribusi, ide, dan saran sangat terbuka! Silakan fork, pull request, atau diskusi di issues.

---

## Lisensi
MIT License
