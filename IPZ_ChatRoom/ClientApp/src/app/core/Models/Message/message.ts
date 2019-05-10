export interface Message {
   id: number;
   text: string;
   userId: string;
   user: any;
   imageUrl: string;
   date: Date
}
export interface MessageViewModel {
   text: string;
   userName: any;
   fullName: string;
   date: Date
}