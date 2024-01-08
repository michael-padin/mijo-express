// export interface IUser  {
//     userId : number,
//     firstName : string,
//     lastName : string,
//     address : string,
//     phoneNumber : string,
//     email : string,
//     username : string,
//     password : string,
//     userType : "admin" | "customer" | "provider"
// }

// export interface Methods {
//     comparePassword(password : string) : Promise<boolean>;
// }

export interface userHistory {
  tRef: string;
  tName: string;
  tPrice: number;
  tDate: Date;
}

export interface UserTransactionHistory extends userHistory {
  providerId: string;
  providerName: string;
  providerNumber: string;
  providerAddress: string;
}

export type Service = {
  serviceId: number;
  serviceCode: string;
  serviceName: string;
  providerName: string;
  providerAddress: string;
  providerContactNumber: string;
  date: string;
  status: "Accepted" | "Declined" | "Completed" | "In Progress";
};
