import {MapType, framework, Func} from "../../main/globals/Gloabals";
import {Optional} from "../../main/globals/Optional";
import {cucumberOptions, propertiesOptions, supplier} from "../../main/globals/Interfaces";
import {Reporter} from "../../main/reporter/Reporter";
import {List} from "lib-utils-ts/src/Interface"
import {ArrayList} from "lib-utils-ts/src/ArrayList";

class CucumberOptions implements cucumberOptions{

    protected options:MapType<string, Object> = { require:[] };
    protected readonly parent: propertiesOptions;

    constructor(parent :propertiesOptions) {
        this.parent = parent;
        this.parent.withFrameWork('custom');
        this.strict(false);
    }

    strict( status: boolean ):cucumberOptions{
        this.options.strict = Optional.of(status).orElse(false);
        return this;
    }


    protractorCucumberFrameworkPath(path:string):cucumberOptions{
        this.parent.withFrameWorkPath(path);
        return this;
    }

    tags(tags:string):cucumberOptions{
        this.options.strict = Optional.of(tags).orElse("");
        return this;
    }

    features( ...features: string[]): cucumberOptions{
        this.parent.withFeatures.apply(this.parent,features);
        return this;
    }

    glue(stepsDefinitions:string, pageObjectPattern:string ): cucumberOptions{
        let lst: List<string> = new ArrayList();
        lst.add(stepsDefinitions);
        lst.add(pageObjectPattern);
        lst.toArray();

        (<Array<string>>this.options.require).push( stepsDefinitions );
        (<Array<string>>this.options.require).push( pageObjectPattern );
    return this;
    }

    format(format: string): cucumberOptions{
        this.options.format = format;
        return this;
    }

    config( ):propertiesOptions{return this.parent;}
}


export class PropertiesConfig implements supplier<MapType<string, Object>>{
    /***
     *
     * @type {{new(): PropertiesOptions; prototype: PropertiesOptions}}
     */
    protected static PropertiesOptions = class PropertiesOptions implements propertiesOptions {

        protected options:MapType<string, Object> = {
            seleniumAddress: null, framework:null,frameworkPath:null, cucumberOpts:{}, specs:[], params:{  },

            getPageTimeout: 60000,
            allScriptsTimeout: 500000,
            capabilities: {
                'browserName': 'chrome'
            },
            onComplete:():void => Reporter.generateCucumberReporter()
        };

        withCucumberOptions():CucumberOptions{
            let slf:this = this;
            this.options.cucumberOpts = { require:[] };

            return new class extends CucumberOptions implements cucumberOptions{

                constructor() {super(slf);}

                 // @override
                strict( status: boolean ):cucumberOptions{
                    (<MapType<string, boolean>>slf.options.cucumberOpts).strict = Optional.of(status).orElse(false);
                    return this;
                }

                // @override
                format(format: string): cucumberOptions {
                    (<MapType<string, string[]>>slf.options.cucumberOpts).format = [ format, "json:../../../target/results.json" ];
                    return this;
                }

                // @override
                tags(tags:string):cucumberOptions{
                    (<MapType<string, string>>slf.options.cucumberOpts).tags = Optional.of(tags).orElse("");
                    return this;
                }

                // @override
                glue(stepsDefinitions:string, pageObjectPattern:string): cucumberOptions{
                    (<Array<string>>(<MapType<string, Array<string>>>slf.options.cucumberOpts).require).push( stepsDefinitions );
                    (<Array<string>>(<MapType<string, Array<string>>>slf.options.cucumberOpts).require).push( pageObjectPattern );
                    return this;
                }

            }
        }

        withSeleniumAddress(url:string):propertiesOptions{
            this.options.seleniumAddress = url;
            return this;
        }

        withFrameWork(framework: framework ):propertiesOptions{
            this.options.framework = framework;
            return this;
        }

        withFeatures(... features: string[]):propertiesOptions{
            Array.from(features).map(feature=>(<Array<string>>this.options.specs).push(feature));
            return this;
        }

        withFrameWorkPath(path:string):propertiesOptions{
            this.options.frameworkPath = path;
            return this;
        }

        widthBaseUrl( url:string ):propertiesOptions{
            this.options.baseUrl = url;
            return this;
        }

        widthAngular( state:boolean ):propertiesOptions{
            //@ts-ignore
            this.options.params.angular = Optional.of(state).orElse(false);
            return this;
        }

        withTS( tsconfig: Func<void, void> ):propertiesOptions{
           /* (<MapType<string, Func<void,void>>>this.options).onPrepare = ( )=>{
                require('ts-node').register({
                    project: tsconfig
                });
            };*/
            (<MapType<string, Func<void,void>>>this.options).onPrepare = function onPrepare( ){

                tsconfig.call(null);
            };
            return this;
        }


        build():PropertiesConfig{
            return new PropertiesConfig(this.options);
        }

    }
    /**
     *
     */
    private readonly data:MapType<string, Object>;

    /**
     *
     */
    constructor(data: MapType<string, Object> ) {
        this.data = data;
    }
    /**
     *
     */
    public get( ):MapType<string, Object>{
        return this.data;
    }
    /**
     *
     */
    public static options():propertiesOptions{
        return new PropertiesConfig.PropertiesOptions();
    }
}