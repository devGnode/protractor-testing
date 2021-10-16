import {Optional} from "../globals/Optional";
import {Logger} from "protractor/built/logger";
/***
 * Device
 */
export class Device {

    private static Logger:Logger = new Logger(Device.name);

    static DEFAULT:Device   = new Device("default", -1, -1, true);
    static IOS:Device       = new Device("IOS", 150, 800, false );

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;
    private readonly isReal:boolean;

    constructor(device:string, width:number, height:number, isReal:boolean) {
        this.width = width;
        this.height = height;
        this.device = Optional.of(device).orElseThrow(new Error("Device cannot be null value"));
        this.isReal = Optional.of(isReal).orElse(false);
    }

    public getWidth( ):number{return this.width;}

    public getHeight():number{return this.height;}

    public getDevice():string{return this.device;}

    public getIsReal( ):boolean{return this.isReal;}

    public toString( ):string{return this.device;}

    public equals(value:Device){
        return value.getWidth() === this.width &&
            value.getHeight() === this.height &&
            value.getDevice() === this.device;
    }

    public static valueOf( value:string  ):Device{
        if( Device[value.toUpperCase()] instanceof Device){
            let handle :Device = Device[value.toUpperCase()];
            return new Device(
                handle.getDevice(),
                handle.getWidth(),
                handle.getHeight(),
                handle.getIsReal()
            );
        }
       Device.Logger.error(`Undefined Device : ${value}`);
        throw new Error(`Undefined Device : ${value}`);
    }
}