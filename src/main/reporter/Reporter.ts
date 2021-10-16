import {HashMap} from "lib-utils-ts/src/HashMap";
import {HashSet} from "lib-utils-ts/src/HashSet";

const reporter = require('cucumber-html-reporter');

export abstract class Reporter {

    public static generateCucumberReporter( ):void{
        let map:HashMap<string,Object> = new HashMap();
        HashSet.of<string>(12);
        map.put("theme",'bootstrap');

        let data = require("../../../target/medata.json");

        data.Platform = process.platform;

        let options = {
            theme: 'bootstrap',
            jsonFile: './target/results.json',
            output: './target/cucumber-report.html',
            reportSuiteAsScenarios: true,
            scenarioTimestamp: true,
            launchReport: true,
            metadata: data /* {
                "App Version":"0.3.2",
              //  "Test Environment": Config.Prop.getEnv().getEnv(false),
                "Browser": "Chrome  54.0.2840.98",
                "Platform": process.platform,
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }*/
        };

        reporter.generate(options);
    }
}