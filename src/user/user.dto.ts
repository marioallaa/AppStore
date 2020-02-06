
export class FXUserDTO {
    constructor() {
    }
    public name: string;
    public lastname: string;
    public username: string;
    public email: string;
    public pass: string;
    public admin: boolean;
    public phone: string;
    public otherSettingsId: number;
}

export class LoginDto {
    public username: string;
    public pass: string;
}
