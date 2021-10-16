import {Func} from "./Gloabals";
import {optional} from "./Interfaces";


export class Optional<T> implements optional<T>{

    private readonly value:T;

    constructor(value:T) {this.value = value;}

    public isPresent( ):boolean{ return !this.isNull(); }

    public isNull( ):boolean{return this.value === null || this.value === undefined;}

    public isEquals( value:T ):boolean{return this.value === value;}

    public orElse( value:T ):T{ return this.isNull() ? value : this.value; }

    public map<R>( consumer: Func<T,R> ):Optional<R>{
        return new Optional<R>(consumer.call(null,this.value));
    }

    public orThrow<U extends Error>( exception: U ): Optional<T>{
        if(this.isNull()) throw exception;
        return this;
    }

    public orElseThrow<U extends Error>( exception: U ): T{
        if(this.isNull()) throw exception;
        return this.value;
    }

    public static of<T>(value:T):optional<T>{return new Optional(value);}
}