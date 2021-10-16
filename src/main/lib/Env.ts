import {Optional} from "../globals/Optional";
import {optional} from "../globals/Interfaces";
import {Logger} from "protractor/built/logger";
/***
 *
 */
export class Env {

    private static Logger:Logger = new Logger(Env.name);

    static PRODUCTION: Env = new Env("https://carrefour.fr");
    static INTEGRATION: Env = new Env("https://vsint-carrefour.fr");

    private readonly env:string;
    private readonly staticEndpoint:optional<string>;

    constructor(env:string, staticEndPoint?:string ) {
        this.env = env;
        this.staticEndpoint = Optional.of<string>(staticEndPoint);
    }

    public getEnv( endPoint:boolean = false ):string{
        return this.env+(this.env.endsWith("/") ? "" : "/" )+this.staticEndpoint.orElse("");
    }

    public getEndPoint( endPoint:boolean = false ):string{
        return this.staticEndpoint.orElse(null);
    }

    public equals(value:Env){return value.getEnv() == this.env;}

    public static valueOf( value:string  ):Env{
        if( Env[value.toUpperCase()] instanceof Env){
            let handle :Env = Env[value.toUpperCase()];
            return new Env(
                handle.getEnv(),
                handle.getEndPoint()
            );
        }
        Env.Logger.error(`Undefined Env : ${value}`);
        throw new Error(`Undefined Env : ${value}`);
    }

}