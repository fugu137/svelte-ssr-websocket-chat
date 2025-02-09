export interface User {
    id: number;
    username: string;
    password: string;
}

export interface Conversation {
    id: number;
    name: string;
}

export interface Message {
    id: number;
    sender: number
    body: string;
}