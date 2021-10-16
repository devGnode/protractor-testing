import {Optional} from "../globals/Optional";
import {Enum} from "lib-utils-ts/src/Enum"

export class DeviceA extends Enum{

    @Enum.args("default", -1, -1, true )
    static DEFAULT: DeviceA;

    @Enum.args("IOS", 150, 800, false )
    static IOS: DeviceA;

    private readonly device:string;
    private readonly width:number;
    private readonly height:number;
    private readonly isReal:boolean;

    constructor(device:string, width:number, height:number, isReal:boolean) {
        super();
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
}