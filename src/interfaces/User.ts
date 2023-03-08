import ILocation from "./Location";
import ILogin from "./Login";
import IName from "./Name";

import IPicture from "./Picture";

export default interface IUser {
    gender: "male" | "female";
    name: IName;
    location: ILocation;
    email: string;
    login: ILogin;
    dob: { date: Date; age: number };
    registered: {
        date: Date;
        age: 2;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: IPicture;
    nat: string;
}
