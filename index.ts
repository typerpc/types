/*
* defines the type system for
*
 */


export type Bool = number & {readonly brand: unique symbol}
export type Int8 = number & {readonly brand: unique symbol}
export type Uint8 = number & {readonly brand: unique symbol}
export type Int16 = number & {readonly brand: unique symbol}
export type Uint16 = number & {readonly brand: unique symbol}
export type Int32 = number & {readonly brand: unique symbol}
export type Uint32 = number & {readonly brand: unique symbol}
export type Int64 = number & {readonly brand: unique symbol}
export type Uint64 = number & {readonly brand: unique symbol}
export type Float32 = number & {readonly brand: unique symbol}
export type Float64 = number & {readonly brand: unique symbol}
export type Null = null & {readonly brand: unique symbol}
export type String = string & {readonly brand: unique symbol}
export type Err = {} & {readonly brand: unique symbol}
// will actually be any in generated typescript code
export type Any = unknown & {readonly brand: unique symbol}
export type TimeStamp = Date & {readonly brand: unique symbol}
export type Blob = Uint8Array & {readonly brand: unique symbol}
export type Dict<T extends RpcType = Any,S extends RpcType = Any> = Map<T,S> & {readonly brand: unique symbol}
export type Tuple2<T extends RpcType = Any,X extends RpcType = Any> = [T,X] & {readonly brand: unique symbol}
export type Tuple3<T extends RpcType = Any,R extends RpcType = Any,S extends RpcType = Any> = [T,R,S] & {readonly brand: unique symbol}
export type Tuple4<T extends RpcType = Any,R extends RpcType = Any,S extends RpcType = Any, U extends RpcType = Any> = [T,R,S, U] & {readonly brand: unique symbol}
export type Tuple5<T extends RpcType = Any,R extends RpcType = Any,S extends RpcType = Any ,U extends RpcType = Any,V extends RpcType = Any> = [T,R,S,U,V] & {readonly brand: unique symbol}
export type List<T extends RpcType = Any> = Array<T> & {readonly brand: unique symbol}


export type RpcType = Bool | Int8 | Uint8 | Int16 | Uint16 | Int32 | Uint32 | Int64 | Uint64 | Float32 | Float64 | Null | String | Err | Dict | Tuple2 | Tuple3 | Tuple4 | Tuple5 | List | Any | TimeStamp | Blob


