export class User {
    id: number;
    regEmails: [string];
    regPhones: [string];
    company: string;
    formDate: string;
    toDate: string;
    dob: string;
    skils: string;
    profilImage: {
      filename:string,
      filetype:string,
      value:string
    };
    resume:{
       filename:string,
       filetype:string,
       value:string
    };
}
