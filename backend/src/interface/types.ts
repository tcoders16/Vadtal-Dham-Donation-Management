export type newUser= {
    username: string;
    password: string;
    role: string;
    token: string; // Optional, in case of JWT token generation

}
export type loggedInUser = {
    username: string;
    role: string;
    token: string;
}
export type newDonar = {
    name: string;
    email: string;
    phone: string;
    address: string;
    amount: number;
    message?: string; // Optional, for additional notes or message
    date: Date;
    paymentMethod: string;
    transactionId?: string; // Optional, in case of online payments
}


export interface SearchDonorQuery {
  name?: string | string[];
  email?: string | string[];
  phone?: string | string[];
  amount?: string | string[];
  from?: string | string[];
  to?: string | string[];
}