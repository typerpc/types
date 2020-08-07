/*
* defines the type system for typerpc
*
 */

export namespace t {

	export type bool = number & { readonly brand: unique symbol }
	export type int8 = number & { readonly brand: unique symbol }
	export type uint8 = number & { readonly brand: unique symbol }
	export type int16 = number & { readonly brand: unique symbol }
	export type uint16 = number & { readonly brand: unique symbol }
	export type int32 = number & { readonly brand: unique symbol }
	export type uint32 = number & { readonly brand: unique symbol }
	export type int64 = number & { readonly brand: unique symbol }
	export type uint64 = number & { readonly brand: unique symbol }
	export type float32 = number & { readonly brand: unique symbol }
	export type float64 = number & { readonly brand: unique symbol }
	export type nil = null & { readonly brand: unique symbol }
	/*
	* represents the absence of a value. void in C derived most languages.
	 */
	export type unit = void & {readonly brand: unique symbol}
	export type str = string & { readonly brand: unique symbol }
	export type err = {} & { readonly brand: unique symbol }
	/*
	* any type in Ts/Rust, interface{} in go, dynamic in C#/Dart
	 */
	export type dyn = unknown & { readonly brand: unique symbol }
	export type timestamp = Date & { readonly brand: unique symbol }
	/*
	* binary data. Uint8Array in Js. []byte in Go.
	 */
	export type blob = Uint8Array & { readonly brand: unique symbol }
	export type Dict<T extends Comparable = str, S extends RpcType = dyn> =
		{ keyType: T, valType: S }
		& { readonly brand: unique symbol }
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple2<T extends RpcType = dyn, X extends RpcType = dyn> =
		{ item1: T, item2: X }
		& { readonly brand: unique symbol }
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple3<T extends RpcType = dyn, R extends RpcType = dyn, S extends RpcType = dyn> =
		{ item1: T, item2: R, item3: S }
		& { readonly brand: unique symbol }
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple4<T extends RpcType = dyn, R extends RpcType = dyn, S extends RpcType = dyn, U extends RpcType = dyn> =
		{ item1: T, item2: R, item3: S, item4: U }
		& { readonly brand: unique symbol }
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple5<T extends RpcType = dyn, R extends RpcType = dyn, S extends RpcType = dyn, U extends RpcType = dyn, V extends RpcType = dyn> =
		{ item1: T, item2: R, item3: S, item4: U, item5: V }
		& { readonly brand: unique symbol }
	export type List<T extends RpcType = dyn> = { dataType: T } & { readonly brand: unique symbol }

// valid Dict keys
	export type Comparable =
		bool
		| int8
		| uint8
		| int16
		| uint16
		| int32
		| uint32
		| int64
		| float32
		| float64
		| uint64
		| str
		| timestamp
		| err

	export type Primitive = Comparable | nil | dyn | blob | unit

	export type Container = Dict | Tuple2 | Tuple3 | Tuple4 | Tuple5 | List

	export type RpcType = Primitive | Container
}
