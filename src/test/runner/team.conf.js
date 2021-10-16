const {PropertiesConfig} = require("./PropertiesConfig.js")

//console.log(process.argv)
exports.config = PropertiesConfig
    .options()

    .widthAngular(false)
    .withSeleniumAddress("http://localhost:4444/wd/hub")
    .widthBaseUrl("https://carrefour.fr/")

    .withTS(() => {
        require('ts-node').register({
            project: './tsconfig.json'
        });
    })

    .withCucumberOptions()
    .protractorCucumberFrameworkPath(require.resolve('protractor-cucumber-framework'))
    .features('../features/**/*.feature')
    .glue( '../step_definitions/**/*.ts','../../main/PagesObject/**/*.ts')
    //.tags("@testor")
    .format(require.resolve('@cucumber/pretty-formatter')  )
    .config()

    .build()
    .get();