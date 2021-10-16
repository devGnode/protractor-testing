import "lib-utils-ts/src/globalUtils";
import {Before} from "@cucumber/cucumber";
import {browser} from "protractor";
import {Device} from "../../main/lib/Device";
import {Config} from "../../main/Config";
import {DeviceA} from "../../main/lib/DeviceA";



Before(async ()=>{
    let device:Device = Config.Prop.getDevice();

    console.log(DeviceA.valueOf("IOS").toString(), DeviceA.valueOf("IOS").equals(DeviceA.valueOf("IOS")) )
    if(device.getIsReal()) {
        await browser.driver.manage().window().setPosition(0,0);
        await browser.driver.manage().window().maximize();
    }else{
        await browser.driver.manage().window().setSize(device.getWidth(),device.getHeight());
    }
    //
});
