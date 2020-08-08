/*
* defines the type system for typerpc
*
 */

type typeRpcPrimitive = {readonly brand: unique symbol}

type nonComparablePrimitive = {readonly brand: unique symbol}
type typeRpcBrand = {readonly brand: unique symbol}
export namespace t {
	// Primitive types
	import Keyable = rpc.Keyable
	import Comparable = rpc.Comparable
	export type bool = typeRpcPrimitive
	export type int8 = typeRpcPrimitive
	export type uint8 = typeRpcPrimitive
	export type int16 = typeRpcPrimitive
	export type uint16 = typeRpcPrimitive
	export type int32 = typeRpcPrimitive
	export type uint32 = typeRpcPrimitive
	export type int64 = typeRpcPrimitive
	export type uint64 = typeRpcPrimitive
	export type float32 = typeRpcPrimitive
	export type float64 = typeRpcPrimitive
	export type str = typeRpcPrimitive
	export type err = typeRpcPrimitive
	export type dyn = typeRpcPrimitive
	export type timestamp = typeRpcPrimitive

	// Primitives, but can't be used as keys for anything
	/*
	* represents the absence of a value. void in C derived most languages.
	 */
	export type unit = nonComparablePrimitive
	export type nil = nonComparablePrimitive
	/*
	* any type in Ts/Rust, interface{} in go, dynamic in C#/Dart
	 */
	/*
	* binary data. Uint8Array in Js. []byte in Go.
	 */
	export type blob = typeRpcBrand
	export type Dict<T extends Comparable = str, S extends Keyable = dyn> =
		{ keyType: T, valType: S } & typeRpcBrand
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple2<T extends Keyable = dyn, X extends Keyable = dyn> =
		{ item1: T, item2: X }
		& typeRpcBrand
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple3<T extends Keyable = dyn, R extends Keyable = dyn, S extends Keyable = dyn> =
		{ item1: T, item2: R, item3: S }
		& typeRpcBrand
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple4<T extends Keyable = dyn, R extends Keyable = dyn, S extends Keyable = dyn, U extends Keyable = dyn> =
		{ item1: T, item2: R, item3: S, item4: U }
		& typeRpcBrand
	/*
	* Do not use Tuples as method parameters when generating Go Code.
	* Can only be used as return type.
	 */
	export type Tuple5<T extends Keyable = dyn, R extends Keyable = dyn, S extends Keyable = dyn, U extends Keyable  = dyn, V extends Keyable = dyn> =
		{ item1: T, item2: R, item3: S, item4: U, item5: V }
		& typeRpcBrand
	export type List<T extends Keyable = dyn> = { dataType: T } & typeRpcBrand


}

export namespace rpc {
	// valid Dict keys
	export type Comparable =
		t.bool
		| t.int8
		| t.uint8
		| t.int16
		| t.uint16
		| t.int32
		| t.uint32
		| t.int64
		| t.float32
		| t.float64
		| t.uint64
		| t.str
		| t.timestamp
		| t.err
		| t.dyn

	export type Primitive = Comparable | t.nil | t.unit
	export type Container = t.Dict | t.Tuple2 | t.Tuple3 | t.Tuple4 | t.Tuple5 | t.List | t.blob
	// valid generic types
	export type Keyable = Comparable | Container
	export type RpcType = Primitive | Container
}
