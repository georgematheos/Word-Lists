// the type of the json body returned by the server to give a token
export interface AuthenticateBody {
    token?: string;
    exp?: string;
}
