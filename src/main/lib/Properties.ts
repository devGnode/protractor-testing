import {Device} from "./Device";
import {Optional} from "../globals/Optional";
import {browser} from "protractor";
import {Env} from "./Env";
import {Logger} from "protractor/built/logger";

export class Properties {

    private static Logger:Logger  = new Logger(Properties.name);

    private static INSTANCE:Properties = new Properties();

    private isLoad:boolean = false;
    private device:Device;
    private env:Env;

    constructor() {}

    private init():Properties{
        if(this.isLoad)return this;

            browser.waitForAngularEnabled( browser.params.angular ).then();
            this.device = Device.valueOf(Optional.of(browser.params.device).orElse("DEFAULT"));
            this.env    = Env.valueOf(Optional.of(browser.params.env).orElse("PRODUCTION"));
            this.isLoad = true;

        Properties.Logger.info(`Device : ${this.device.toString()}( ${this.device.getWidth()} x ${this.device.getHeight()} ) ; isReal( ${this.device.getIsReal()} )`);
        Properties.Logger.info(`Environment : ${this.getEnv().getEnv()}`);

        return this;
    }

    public getDevice( ):Device{return this.device;}

    public getEnv( ):Env{return this.env;}

    public get<T extends Object>(value:string):T{
        return Optional.of(browser.params[value] ).orElse(null);
    }

    public static getInstance():Properties{
        return this.INSTANCE.init();
    }
}