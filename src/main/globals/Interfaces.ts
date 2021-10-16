import {Func} from "./Gloabals";
import {Optional} from "./Optional";
import {PropertiesConfig} from "../../test/runner/PropertiesConfig";
import {framework} from "./Gloabals";

export interface supplier<T>{
    get():T
}

export interface optional<T> {
    isPresent( ):boolean
    isNull( ):boolean
    isEquals( value:T ):boolean
    orElse( value:T ):T
    map<R>( consumer: Func<T,R> ):Optional<R>
    orThrow( exception: Error ): Optional<T>
    orElseThrow( exception: Error ): T
}

export interface cucumberOptions {
    strict( status: boolean ):cucumberOptions
    tags(tags:string):cucumberOptions
    glue(stepsDefinitions:string, pageObjectPattern:string ): cucumberOptions
    features( ...features: string[]): cucumberOptions
    format(format:string):cucumberOptions
    protractorCucumberFrameworkPath(path:string):cucumberOptions
}

export interface propertiesOptions{
    withSeleniumAddress(url:string):propertiesOptions
    widthBaseUrl( url:string ):propertiesOptions
    withCucumberOptions():cucumberOptions
    withFrameWork(framework: framework ):propertiesOptions
    withFrameWorkPath(path:string):propertiesOptions
    withFeatures(...features: string[]):propertiesOptions
    withTS( tsconfig: Func<void, void>):propertiesOptions
    widthAngular(status:boolean):propertiesOptions
    build():PropertiesConfig
}