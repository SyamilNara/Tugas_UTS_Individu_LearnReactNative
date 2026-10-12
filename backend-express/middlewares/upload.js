// Mengimpor modul multer untuk menangani upload file
const multer = require('multer');
// Mengimpor modul path untuk manipulasi path file
const path = require('path');
// Mengimpor modul crypto untuk menghasilkan hash unik
const crypto = require('crypto');

// Ekstensi gambar yang diizinkan
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${fileHash}${ext}`);
    },
});

// Filter file multer
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Ekstensi gambar tidak valid'), false);
    }
};

// Konfigurasi upload multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;