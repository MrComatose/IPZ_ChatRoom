export interface Message {
   id: number;
   text: string;
   userId: string;
   user: any;
   imageUrl: string;
   chatRoomId : number;
   chatRoom: any;
   date: Date
}
export interface MessageViewModel {
   text: string;
   userName: any;
   fullName: string;
   date: Date;
   chatRoomId : number;
}