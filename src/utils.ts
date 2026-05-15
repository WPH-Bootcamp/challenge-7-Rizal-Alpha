import { ITodoitem, TDateCreate, TStringValid, TValidCriteria } from './types';
// TODO: Implementasikan type guards di sini => typeof primitive, in properties, instanceof object/class, type predicate parameterName is Type
// Hint: Type guard berguna untuk memastikan tipe data saat runtime
//jika inputan aman (setelah dicek dgn fungsi di utils) maka boleh .push(storage)

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid
//ini berfungsi untuk cek isi di dalam memory fs, bukan untuk cek atas inputan, krna inputan sudah pasti valid, tapi klo dari memory fs ini yg bisa ada corrupt
export const validCriteria: TValidCriteria = function (
  obj: any
): obj is ITodoitem {
  /*
  VERSI NOT CLEAN
  const mustProp = typeof obj.id === 'number' && typeof obj.text === 'string';
  // Perbaikan di sini: isCompleted dicek sebagai 'string'
  const optionalProp =
    typeof obj.isCompleted === 'string' && (obj.isCompleted === 'active' || obj.isCompleted === 'done') || 
    typeof obj.createdAt === 'number'; */
  //VERSI CLEAN CODE (bantuan AI)
  const allowedStatus = ['active', 'done'];
  const isStatusValid =
    //selain string, harus lebih spesifik (active, done)
    typeof obj.isCompleted === 'string' &&
    allowedStatus.includes(obj.isCompleted);

  const mustProp =
    typeof obj.id === 'number' && typeof obj.text === 'string' && isStatusValid;
  const optionalProp = typeof obj.createdAt === 'number';

  return mustProp && optionalProp;
};

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
// ambil dari obj.createdAt
export const dateCreate: TDateCreate = function (inputDate: number) {
  const todoDate = new Date(inputDate).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return todoDate;
};

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
export const stringValid: TStringValid = function (inputString: string) {
  const hasil = inputString.trim();
  if (hasil.length === 0) {
    console.log('Input tidak boleh kosong!');
    return null; // Kasih tahu kalau ini gagal tanpa bikin crash
  }
  return hasil;
};

/*awal2 storage akan kosong lalu kita tarik agar jadi array yg bisa dipush oleh data yg diinput user, nah seiring waktu berjalan storage akan terisi object tapi bisa saja rusak oleh si user sendiri... terklik  oleh sebab itu akan difilter oleh fungsi cekObject jika lolos maka tetap di array jika tidak maka tidak dimasukkan, kemudian tetap siklus yg sama seperti menerima .push dari inputUser */

/*fungsi helper tu pakai obj.createdAt = Date.now() 
const todoDate = new Date(obj.createdAt).toLocaleString(('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})
*/
