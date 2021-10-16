import {After, AfterAll, ITestCaseHookParameter} from "@cucumber/cucumber";
import {browser} from "protractor";
import {Buffer} from "buffer";
import * as fs from "fs";
import {writeFileSync} from "fs";
import {Config} from "../Config";
import {OutputStreamWriter} from "lib-utils-ts/src/file/IOStream";

/***
 * After all scenarii
 */
AfterAll(async ()=>{

    fs.truncateSync("./target/medata.json",0);
    new OutputStreamWriter("./target/medata.json").write(JSON.stringify({

        date        : new Date().toISOString(),
        device      : Config.Prop.getDevice().toString(),
        environment : Config.Prop.getEnv().getEnv()

    }));
    /*fs.truncateSync("./target/medata.json",0);
    writeFileSync("./target/medata.json",JSON.stringify({

        date        : new Date().toISOString(),
        device      : Config.Prop.getDevice().toString(),
        environment : Config.Prop.getEnv().getEnv()

    }),{encoding:"utf-8", flag:"a+"});*/
});
/***
 * After each scenario
 */
After( async function(scenario:ITestCaseHookParameter){

    if( scenario.result.status==="FAILED" ){
        let buffer:string = await browser.driver.takeScreenshot();
        this.attach(Buffer.from(buffer, 'base64'), 'image/png');
    }

});

