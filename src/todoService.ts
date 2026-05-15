// TODO: Import tipe-tipe yang sudah didefinisikan
import readlineSync from 'readline-sync';
import {
  ITodoitem,
  TAddTodo,
  TMarkTodo,
  TTodoStatus,
  TDeleteTodo,
  TDisplayTodo,
  TDisplayAll,
  TSearchTodo,
  TExitApp,
} from './types';
import { loadData, saveData } from './storage';
import { dateCreate, validCriteria } from './utils';

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active
export const addTodo: TAddTodo = async function (text: string) {
  //ambil data terakhir
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  //id baru, pakai cara ini daripada versi idCounter = 1 then idCounter++
  const newId =
    updatedData.length > 0 ? updatedData[updatedData.length - 1].id + 1 : 1;
  //buat object baru
  const newTodo: ITodoitem = {
    id: newId,
    text,
    isCompleted: 'active',
    createdAt: Date.now(),
  };
  //masukkan ke array
  updatedData.push(newTodo);
  //save ke fs
  await saveData(updatedData);
  console.clear();
};

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan
export const markTodo: TMarkTodo = async function () {
  //ambil data terakhir
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  console.clear();
  displayTodo(updatedData);
  const markAsked = readlineSync.question(
    'masukkan nomor kegiatan yang ingin ditandai selesai => '
  ); // misal no.5 ingin ditandai selesai, tapi awas, klo di filter si no.urut 5 kelak akan berubah ketika jenis filter berbeda,  jd tembak ke id krna id unik dan presisi
  //di index dimulai dari 0 maka index nya tu  i+1
  const indexMarked = Number(markAsked) - 1;
  if (updatedData[indexMarked]) {
    //array data diambil urutan ke- indexMarked, jika ini true/ada maka, data dgn nomor yg dipilih itu akan:
    const idTarget = updatedData[indexMarked].id;
    const statusTodo: Record<string, string> = {
      active: 'done',
      done: 'active',
    };
    updatedData.forEach((d) => {
      //dicari setiap dari semua array data kemudian
      if (d.id === idTarget) {
        //jika ketemu data dgn id yg sama dengan id dari data ke-indexMarked
        const statusNow = d.isCompleted.toString();
        d.isCompleted = statusTodo[statusNow] as TTodoStatus; //maka ubah ke sebaliknya misal statusTodo["active"] => "done"
      }
    });
  }
  saveData(updatedData);
  console.clear();
};

// TODO: Buat fungsi untuk menghapus To-Do => jika dipilih tombol hapus maka updatedData => ubah ke variable lain dulu as parameternya.
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan
export const deleteTodo: TDeleteTodo = async function () {
  //ambil data terakhir
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  console.clear();
  displayTodo(updatedData);
  const markAsked = readlineSync.question(
    'masukkan nomor kegiatan yang ingin dihapus => '
  );
  const indexMarked = Number(markAsked) - 1;
  if (updatedData[indexMarked]) {
    const idTarget = updatedData[indexMarked].id;
    const afterDeleted = updatedData.filter((d) => d.id !== idTarget);
    saveData(afterDeleted);
  } else {
    console.log('Nomor tidak valid');
  }
  console.clear();
};

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih
export const displayTodo: TDisplayTodo = async function (data: ITodoitem[]) {
  console.clear(); //biar hasil di UI CLI nda seolah2 numpuk
  data.forEach((d, i) => {
    console.log(
      `${i + 1}. ${d.text} [${d.isCompleted}] -- ${dateCreate(d.createdAt)} `
    );
  });
};

//TODO: Buat fungsi async display all todos
export const displayAll: TDisplayAll = async function () {
  //ambil data terakhir
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  displayTodo(updatedData);
};

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword
export const searchTodo: TSearchTodo = async function () {
  //ambil data terakhir
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  const inputSearch = readlineSync.question(
    'masukkan nama kegiatan yang ingin dicari => '
  );
  const afterSearch = updatedData.filter((d) => d.text === inputSearch);
  console.clear();
  displayTodo(afterSearch);
};

//TODO: Buat fungsi exit
export const exitApp: TExitApp = async function () {
  console.log('Terimakasih telah menggunakan aplikasi ini, Have a nice day!');
  process.exit(0);
};
