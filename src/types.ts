// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed
// TODO: Buat interface untuk To-Do item
export interface ITodoitem {
  id: number; //pakai counter
  text: string;
  isCompleted: TTodoStatus;
  createdAt: number; //
}
export type TUserOption = '1' | '2' | '3' | '4' | '5' | '6';
// TODO: Buat tipe untuk status To-Do (active/done)
export type TTodoStatus = 'active' | 'done';
// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan
export type THandleOption = (o: TUserOption) => Promise<void>;
export type TAddTodo = (text: string) => Promise<void>;
export type TMarkTodo = () => Promise<void>;
export type TDeleteTodo = () => Promise<void>;
export type TDisplayTodo = (data: ITodoitem[]) => void;
export type TDisplayAll = () => Promise<void>;
export type TSearchTodo = () => Promise<void>;
export type TExitApp = () => void;
export type TMain = () => Promise<void>;
export type TFirstRun = () => Promise<void>;
export type TRunAgain = () => Promise<void>;
export type TStartApp = () => Promise<void>;
export type TValidCriteria = (obj: any) => obj is ITodoitem;
export type TDateCreate = (inputDate: number) => string;
export type TStringValid = (inputString: string) => string | null;
export type TLoadData = () => Promise<ITodoitem[]>;
export type TSaveData = (data: ITodoitem[]) => Promise<void>;
export type TInitStorage = () => void;
