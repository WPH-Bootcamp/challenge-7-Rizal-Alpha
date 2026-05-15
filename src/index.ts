// TODO: Import readline untuk membaca input dari command line
import readlineSync from 'readline-sync';
import {
  THandleOption,
  TUserOption,
  TMain,
  TFirstRun,
  TRunAgain,
  TStartApp,
} from './types';
import {
  addTodo,
  deleteTodo,
  displayAll,
  displayTodo,
  exitApp,
  markTodo,
  searchTodo,
} from './todoService';
import { loadData, initStorage } from './storage';
import { stringValid, validCriteria } from './utils';
// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input
async function userOption(): Promise<void> {
  let inputOption = readlineSync.question(
    `Berikut adalah fitur aplikasi todolist berikut:
    1. Add new todo
    2. Mark todo as complete
    3. Delete todo
    4. List all todos
    5. Search todos
    6. Exit
    Silahkan masukkan nomor yg Anda inginkan => `
  );
  await handleOption(inputOption as TUserOption);
}

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti: (di setiap pilihan, tampilkan list todo terkini)
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

export const handleOption: THandleOption = async function (o) {
  switch (o) {
    case '1': {
      while (true) {
        const inputUser = readlineSync.question(
          'Silahkan masukkan nama tugas (todo) Anda => '
        );
        const inputValid = stringValid(inputUser);
        if (typeof inputValid === 'string') {
          await addTodo(inputValid as string);
          break;
        } else console.log('Harap masukkan inputan Anda');
      }
      break;
    }
    case '2': {
      await markTodo();
      break;
    }
    case '3': {
      await deleteTodo();
      break;
    }
    case '4': {
      //ini buat kembali ke tampilan keseluruhan list, jika misal dari awalnya ke case 5, akan ditampilkan hasil dari case 5, adanya case 4 ini untuk kembali ke list lengkap
      await displayAll();
      break;
    }
    case '5': {
      await searchTodo();
      break;
    }
    case '6': {
      exitApp();
      break;
    }
    default: {
      console.log(
        'Error: Pilihan tidak valid! Silakan masukkan angka 1 hingga 6.'
      );
      break;
    }
  }
};

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop
export const main: TMain = async function () {
  //Buat memory fs, jika belum ada
  initStorage();
  //awal pertama kali buka aplikasi, ambil data terkini akan ditampilkan
  const dataLoad = await loadData();
  //filter dulu agar file corupt dari memory fs bisa disaring
  const updatedData = dataLoad.filter(validCriteria);
  console.log('Selamat datang di todolist App ini');
  // displayTodo(updatedData);
  await userOption();
};

// TODO: Jalankan fungsi main
const firstRun: TFirstRun = async function () {
  while (true) {
    const askRun = readlineSync.question(
      'Selamat datang di aplikasi todolist ini, Apa Anda ingin mulai menggunakan? (y/n) => '
    );
    if (askRun.toLowerCase() === 'y') {
      await main();
      break;
    } else if (askRun.toLowerCase() === 'n') {
      console.log(
        'Terimakasih telah menggunakan aplikasi ini, have a nice day'
      );
      break;
    } else {
      console.log('harap masukkan HANYA huruf berikut: y atau n');
    }
  }
};

const runAgain: TRunAgain = async function () {
  while (true) {
    const askAgain = readlineSync.question(
      'Apa Anda masih ingin melanjutkan? (y/n) => '
    );
    if (askAgain.toLowerCase() === 'y') {
      await firstRun();
    } else if (askAgain.toLowerCase() === 'n') {
      console.log(
        'Terimakasih telah menggunakan aplikasi ini, have a nice day'
      );
      break;
    } else {
      console.log('harap masukkan HANYA huruf berikut: y atau n');
    }
  }
};

//AI insights biar nda buntu
const startApp: TStartApp = async function () {
  await firstRun();
  // Jika firstRun selesai (user pilih 'y' lalu main() selesai),
  // baru jalankan runAgain jika memang diperlukan loop luar.
  runAgain();
};

startApp();
// //coach mohon maaf sebelumnya, tapi tolong ketik ini untuk menjalankan aplikasi ini =>
// // npx tsx src/index.ts
// // klo nda begini anehnya si todos.json masuk ke dalam src jadi harus ketik itu coach (ada tanya AI juga)
