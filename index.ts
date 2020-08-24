/**
 * defines the type system for typerpc
 *
 */

/* eslint-disable @typescript-eslint/no-namespace */
type typeRpcPrimitive = { readonly brand: unique symbol }

type nonComparablePrimitive = { readonly brand: unique symbol }
type typeRpcContainer = { readonly brand: unique symbol }

type primitiveOrUndefined = typeRpcPrimitive | undefined
type containerOrUndefined = typeRpcContainer | undefined
type messagable = primitiveOrUndefined | containerOrUndefined

export namespace t {
    // Primitive internal
    import Paramable = internal.Paramable
    import Comparable = internal.Comparable
    export type bool = { toString(): string } & typeRpcPrimitive
    export type int8 = { toString(): string } & typeRpcPrimitive
    export type uint8 = { toString(): string } & typeRpcPrimitive
    export type int16 = { toString(): string } & typeRpcPrimitive
    export type uint16 = { toString(): string } & typeRpcPrimitive
    export type int32 = { toString(): string } & typeRpcPrimitive
    export type uint32 = { toString(): string } & typeRpcPrimitive
    export type int64 = { toString(): string } & typeRpcPrimitive
    export type uint64 = { toString(): string } & typeRpcPrimitive
    export type float32 = { toString(): string } & typeRpcPrimitive
    export type float64 = { toString(): string } & typeRpcPrimitive
    export type str = { toString(): string } & typeRpcPrimitive
    export type err = { toString(): string } & typeRpcPrimitive
    export type timestamp = { toString(): string } & typeRpcPrimitive
    /**
     * Uint8Array in Js. []byte in Go.
     */
    export type blob = { toString(): string } & typeRpcPrimitive
    /**
     * any type in Ts/Rust, interface{} in go, dynamic in C#/Dart
     */
    export type dyn = { toString(): string } & typeRpcPrimitive

    // Primitives, but can't be used as keys for anything
    /**
     * represents the absence of a value. void in C derived most languages.
     */
    export type unit = { toString(): string } & nonComparablePrimitive
    export type nil = { toString(): string } & nonComparablePrimitive
    export type Dict<T extends Comparable, S extends Paramable> = Readonly<{
        keyType: T
        valType: S
        toString(): string
    }> &
        typeRpcContainer
    /**
     * Do not use Tuples as method parameters when generating Go Code.
     * Can only be used as return type.
     */
    export type Tuple2<T extends Paramable, X extends Paramable> = Readonly<{
        item1: T
        item2: X
        toString(): string
    }> &
        typeRpcContainer
    /**
     * Do not use Tuples as method parameters when generating Go Code.
     * Can only be used as return type.
     */
    export type Tuple3<T extends Paramable, R extends Paramable, S extends Paramable> = Readonly<{
        item1: T
        item2: R
        item3: S
        toString(): string
    }> &
        typeRpcContainer
    /**
     * Do not use Tuples as method parameters when generating Go Code.
     * Can only be used as return type.
     */
    export type Tuple4<T extends Paramable, R extends Paramable, S extends Paramable, U extends Paramable> = Readonly<{
        item1: T
        item2: R
        item3: S
        item4: U
        toString(): string
    }> &
        typeRpcContainer
    /**
     * Do not use Tuples as method parameters when generating Go Code.
     * Can only be used as return type.
     */
    export type Tuple5<
        T extends Paramable,
        R extends Paramable,
        S extends Paramable,
        U extends Paramable,
        V extends Paramable
    > = Readonly<{
        item1: T
        item2: R
        item3: S
        item4: U
        item5: V
        toString(): string
    }> &
        typeRpcContainer

    export type List<T extends Paramable> = Readonly<{
        dataType: T
        toString(): string
    }> &
        typeRpcContainer
}

export namespace rpc {
    import RpcType = internal.RpcType
    type Func = (...params: (internal.RpcType | undefined)[]) => RpcType

    /**
     * Constructs a new typerpc Service definition.
     * Only valid typerpc internal can be used as parameters and return
     * internal.
     */
    export type Service<T extends { [key: string]: Func }> = T

    /**
     * Used to construct a type alias a typerpc Type alias.
     * Types defined without using this type are not allowed.
     */
    export type Msg<T extends internal.MsgProps> = T
}

export namespace internal {
    // valid Dict keys
    export type Comparable =
        | t.bool
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
        | t.blob

    export type MsgProps = { [key: string]: messagable | rpc.Msg<{ [key: string]: messagable }> }
    export type Primitive = Comparable | t.nil | t.unit

    // valid generic type params
    export type Paramable = Comparable | typeRpcContainer | rpc.Msg<MsgProps>
    export type RpcType = Primitive | typeRpcContainer | rpc.Msg<MsgProps>
}
