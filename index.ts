/*
* defines the type system for
*
 */

export type bool = boolean
export type int8 = number
export type uint8 = number
export type int16 = number
export type uint16 = number
export type int32 = number
export type uint32 = number
export type float32 = number
export type float64 = number
export type nil = null
export type str = string
export type error = Error
// will actually be any in generated typescript code
export type dynamic = unknown
export type timestamp = Date
export type blob = Uint8Array
export type map<T extends RpcType = dynamic,S extends RpcType = dynamic> = Map<T,S>
export type tuple2<T extends RpcType = dynamic,X extends RpcType = dynamic> = [T,X]
export type tuple3<T extends RpcType = dynamic,R extends RpcType = dynamic,S extends RpcType = dynamic> = [T,R,S]
export type tuple4<T extends RpcType = dynamic,R extends RpcType = dynamic,S extends RpcType = dynamic, U extends RpcType = dynamic> = [T,R,S, U]
export type tuple5<T extends RpcType = dynamic,R extends RpcType = dynamic,S extends RpcType = dynamic ,U extends RpcType = dynamic,V extends RpcType = dynamic> = [T,R,S,U,V]
export type list<T extends RpcType = dynamic> = Array<T>

export type file = {
	mimeType : str
	name: str
	contents: blob
}

export type RpcType = bool | int8 | uint8 | int16 | uint16 | int32 | uint32 | float32 | float64 | nil | str | error | map | tuple2 | tuple3 | tuple4 | tuple5 | list | dynamic | timestamp | blob | file

