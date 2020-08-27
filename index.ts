/**
 * defines the type system for typerpc
 *
 */

/* eslint-disable @typescript-eslint/no-namespace */
type scalar = { readonly brand: unique symbol }

type nonComparableScalar = { readonly brand: unique symbol }
type container = { readonly brand: unique symbol }

type scalarOrUndefined = scalar | undefined
type containerOrUndefined = container | undefined
type messagable = scalarOrUndefined | containerOrUndefined

export namespace $ {
    // Primitive internal
    import Paramable = internal.Paramable
    import Comparable = internal.Comparable
    export type bool = 'bool' & { toString(): string } & scalar
    export type int8 = 'int8' & { toString(): string } & scalar
    export type uint8 = 'uint8' & { toString(): string } & scalar
    export type int16 = 'int16' & { toString(): string } & scalar
    export type uint16 = 'uint16' & { toString(): string } & scalar
    export type int32 = 'int32' & { toString(): string } & scalar
    export type uint32 = 'uint32' & { toString(): string } & scalar
    export type int64 = 'int64' & { toString(): string } & scalar
    export type uint64 = 'uint64' & { toString(): string } & scalar
    export type float32 = 'float32' & { toString(): string } & scalar
    export type float64 = 'float64' & { toString(): string } & scalar
    export type str = 'str' & { toString(): string } & scalar
    export type err = 'err' & { toString(): string } & scalar
    export type timestamp = 'timestamp' & { toString(): string } & scalar
    /**
     * Uint8Array in Js. []byte in Go.
     */
    export type blob = 'blob' & { toString(): string } & scalar
    /**
     * any type in Ts/Rust, interface{} in go, dynamic in C#/Dart
     */
    export type dyn = 'dyn' & { toString(): string } & scalar

    // Primitives, but can't be used as keys for anything
    /**
     * represents the absence of a value. void in C derived most languages.
     */
    export type unit = 'unit' & { toString(): string } & nonComparableScalar
    export type nil = 'nil' & { toString(): string } & nonComparableScalar
    export type Dict<T extends Comparable, S extends Paramable> = Readonly<{
        keyType: T
        valType: S
        toString(): string
    }> &
        container
    /**
     * Do not use Tuples as method parameters when generating Go Code.
     * Can only be used as return type.
     */
    export type Tuple2<T extends Paramable, X extends Paramable> = Readonly<{
        item1: T
        item2: X
        toString(): string
    }> &
        container
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
        container
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
        container
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
        container

    export type List<T extends Paramable> = Readonly<{
        dataType: T
        toString(): string
    }> &
        container
}

export namespace rpc {
    import RpcType = internal.RpcType
    import QueryParamable = internal.QueryParamable

    type QueryFunc = (...params: (QueryParamable | undefined)[]) => RpcType
    type MutationFunc = (...params: (internal.Paramable | undefined)[]) => RpcType

    /**
     * A service that can handle mutations by using HTTP POST requests.
     *
     * Only valid typerpc QueryParamable types and rpc.Msg can be used as parameters
     * the return type can be any typerpc type or rpc.Msg
     */
    export type MutationSvc<T extends { [key: string]: MutationFunc }> = T

    /** A service that can handle queries by using HTTP Get requests.
     *
     * Only valid typerpc Paramable types and rpc.Msg can be used as parameters
     * the return type can be any typerpc type or rpc.Msg
     */
    export type QuerySvc<T extends { [key: string]: QueryFunc }> = T
    /**
     * Used to construct a type alias a typerpc Type alias.
     * Types defined without using this type are not allowed.
     */
    export type Msg<T extends internal.MsgProps> = T
}

export namespace internal {
    // valid Dict keys
    export type Comparable =
        | $.bool
        | $.int8
        | $.uint8
        | $.int16
        | $.uint16
        | $.int32
        | $.uint32
        | $.int64
        | $.float32
        | $.float64
        | $.uint64
        | $.str
        | $.timestamp
        | $.err
        | $.dyn
        | $.blob

    type QueryParamableScalar =
        | $.str
        | $.bool
        | $.int8
        | $.uint8
        | $.int16
        | $.uint16
        | $.uint32
        | $.int32
        | $.int64
        | $.uint64
        | $.float32
        | $.float64
        | $.timestamp

    export type QueryParamable = QueryParamableScalar | $.List<QueryParamableScalar>
    export type MsgProps = { [key: string]: messagable | rpc.Msg<{ [key: string]: messagable }> }
    export type Primitive = Comparable | $.nil | $.unit

    // valid generic type params
    export type Paramable = Comparable | container | rpc.Msg<MsgProps>
    export type RpcType = Primitive | container | rpc.Msg<MsgProps>
}
