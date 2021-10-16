export type ListKey                         = number | string;
export type MapType<K extends ListKey,V>    = { [J in K] : V };
export type Func<T,R>                       = (value:T)=>R;

export type framework = "custom" | "jasmine"