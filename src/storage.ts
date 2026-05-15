import fs from 'fs/promises';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ITodoitem, TInitStorage, TLoadData, TSaveData } from './types';
// TODO: Definisikan path file untuk menyimpan data To-Do
// TODO: Definisikan path file
const DB_PATH = path.join(process.cwd(), 'todos.json');

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file
export const loadData: TLoadData = async function () {
  try {
    const fileContent = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error: any) {
    // Jika error karena file tidak ditemukan (code: ENOENT)
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Gagal loading:', error.message);
    return [];
  }
};
// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan
// harus terima argumen berupa array,
export const saveData: TSaveData = async function (data: ITodoitem[]) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    //ubah ke JSON string | null artinya semua diambil no filter | 2 bertujuan u merapikan
    await fs.writeFile(DB_PATH, jsonString, 'utf-8');
  } catch (error) {
    console.error((error as Error).message);
  }
};
// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
// karena ini hanya sekali berjalan (inisialisasi) jd nda perlu async
export const initStorage: TInitStorage = async function () {
  // 1. Cek apakah file tersebut SUDAH ADA atau BELUM
  const isFileExist = existsSync(DB_PATH);

  if (!isFileExist) {
    // 2. Jika BELUM ADA, buat file baru
    // Kita isi dengan string '[]' karena To-Do list kita bentuknya Array
    const initialData = JSON.stringify([]);

    writeFileSync(DB_PATH, initialData, 'utf-8');
    console.log('Storage berhasil dibuat: todos.json');
  } else {
    // Jika sudah ada, tidak perlu melakukan apa-apa
    console.log('Storage sudah ada, siap digunakan.');
  }
};
