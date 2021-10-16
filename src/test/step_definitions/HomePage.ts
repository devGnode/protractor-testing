import {browser} from "protractor";
import {Given, When} from "@cucumber/cucumber";
import assert = require("assert");


Given("test dfdsfd",(next)=>{
    console.log("d");
    browser.get("https://google.de").then(()=>{
        browser.sleep(2000).then(next)
    });
});

When("sdsd",()=>{
    //assert.equal(false,true);
})