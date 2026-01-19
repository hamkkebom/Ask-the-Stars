
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ProjectRequest
 * 
 */
export type ProjectRequest = $Result.DefaultSelection<Prisma.$ProjectRequestPayload>
/**
 * Model ProjectAssignment
 * 
 */
export type ProjectAssignment = $Result.DefaultSelection<Prisma.$ProjectAssignmentPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Submission
 * 
 */
export type Submission = $Result.DefaultSelection<Prisma.$SubmissionPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model Settlement
 * 
 */
export type Settlement = $Result.DefaultSelection<Prisma.$SettlementPayload>
/**
 * Model Campaign
 * 
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  MOON_MANAGER: 'MOON_MANAGER',
  MOON_ADVERTISING: 'MOON_ADVERTISING',
  MOON_FEEDBACK: 'MOON_FEEDBACK',
  MOON_SETTLEMENT: 'MOON_SETTLEMENT',
  STAR: 'STAR',
  COUNSELOR: 'COUNSELOR'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const AssignmentType: {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE'
};

export type AssignmentType = (typeof AssignmentType)[keyof typeof AssignmentType]


export const RequestStatus: {
  OPEN: 'OPEN',
  FULL: 'FULL',
  CLOSED: 'CLOSED',
  CANCELLED: 'CANCELLED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]


export const AssignmentStatus: {
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus]


export const ProjectStatus: {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  MATCHING: 'MATCHING',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  REVISION: 'REVISION',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus]


export const SubmissionStatus: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REVISED: 'REVISED'
};

export type SubmissionStatus = (typeof SubmissionStatus)[keyof typeof SubmissionStatus]


export const FeedbackPriority: {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type FeedbackPriority = (typeof FeedbackPriority)[keyof typeof FeedbackPriority]


export const FeedbackStatus: {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  WONTFIX: 'WONTFIX'
};

export type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus]


export const SettlementType: {
  PAYOUT: 'PAYOUT',
  DEDUCTION: 'DEDUCTION',
  BONUS: 'BONUS'
};

export type SettlementType = (typeof SettlementType)[keyof typeof SettlementType]


export const SettlementRound: {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY'
};

export type SettlementRound = (typeof SettlementRound)[keyof typeof SettlementRound]


export const SettlementStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type SettlementStatus = (typeof SettlementStatus)[keyof typeof SettlementStatus]


export const CampaignStatus: {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type CampaignStatus = (typeof CampaignStatus)[keyof typeof CampaignStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type AssignmentType = $Enums.AssignmentType

export const AssignmentType: typeof $Enums.AssignmentType

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

export type AssignmentStatus = $Enums.AssignmentStatus

export const AssignmentStatus: typeof $Enums.AssignmentStatus

export type ProjectStatus = $Enums.ProjectStatus

export const ProjectStatus: typeof $Enums.ProjectStatus

export type SubmissionStatus = $Enums.SubmissionStatus

export const SubmissionStatus: typeof $Enums.SubmissionStatus

export type FeedbackPriority = $Enums.FeedbackPriority

export const FeedbackPriority: typeof $Enums.FeedbackPriority

export type FeedbackStatus = $Enums.FeedbackStatus

export const FeedbackStatus: typeof $Enums.FeedbackStatus

export type SettlementType = $Enums.SettlementType

export const SettlementType: typeof $Enums.SettlementType

export type SettlementRound = $Enums.SettlementRound

export const SettlementRound: typeof $Enums.SettlementRound

export type SettlementStatus = $Enums.SettlementStatus

export const SettlementStatus: typeof $Enums.SettlementStatus

export type CampaignStatus = $Enums.CampaignStatus

export const CampaignStatus: typeof $Enums.CampaignStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectRequest`: Exposes CRUD operations for the **ProjectRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectRequests
    * const projectRequests = await prisma.projectRequest.findMany()
    * ```
    */
  get projectRequest(): Prisma.ProjectRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectAssignment`: Exposes CRUD operations for the **ProjectAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectAssignments
    * const projectAssignments = await prisma.projectAssignment.findMany()
    * ```
    */
  get projectAssignment(): Prisma.ProjectAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.submission`: Exposes CRUD operations for the **Submission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Submissions
    * const submissions = await prisma.submission.findMany()
    * ```
    */
  get submission(): Prisma.SubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settlement`: Exposes CRUD operations for the **Settlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settlements
    * const settlements = await prisma.settlement.findMany()
    * ```
    */
  get settlement(): Prisma.SettlementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Campaigns
    * const campaigns = await prisma.campaign.findMany()
    * ```
    */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ProjectRequest: 'ProjectRequest',
    ProjectAssignment: 'ProjectAssignment',
    Project: 'Project',
    Submission: 'Submission',
    Feedback: 'Feedback',
    Settlement: 'Settlement',
    Campaign: 'Campaign'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "projectRequest" | "projectAssignment" | "project" | "submission" | "feedback" | "settlement" | "campaign"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ProjectRequest: {
        payload: Prisma.$ProjectRequestPayload<ExtArgs>
        fields: Prisma.ProjectRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          findFirst: {
            args: Prisma.ProjectRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          findMany: {
            args: Prisma.ProjectRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          create: {
            args: Prisma.ProjectRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          createMany: {
            args: Prisma.ProjectRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          delete: {
            args: Prisma.ProjectRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          update: {
            args: Prisma.ProjectRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          deleteMany: {
            args: Prisma.ProjectRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>[]
          }
          upsert: {
            args: Prisma.ProjectRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectRequestPayload>
          }
          aggregate: {
            args: Prisma.ProjectRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectRequest>
          }
          groupBy: {
            args: Prisma.ProjectRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectRequestCountAggregateOutputType> | number
          }
        }
      }
      ProjectAssignment: {
        payload: Prisma.$ProjectAssignmentPayload<ExtArgs>
        fields: Prisma.ProjectAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          findFirst: {
            args: Prisma.ProjectAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          findMany: {
            args: Prisma.ProjectAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>[]
          }
          create: {
            args: Prisma.ProjectAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          createMany: {
            args: Prisma.ProjectAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>[]
          }
          delete: {
            args: Prisma.ProjectAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          update: {
            args: Prisma.ProjectAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.ProjectAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.ProjectAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectAssignmentPayload>
          }
          aggregate: {
            args: Prisma.ProjectAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectAssignment>
          }
          groupBy: {
            args: Prisma.ProjectAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Submission: {
        payload: Prisma.$SubmissionPayload<ExtArgs>
        fields: Prisma.SubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findFirst: {
            args: Prisma.SubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          findMany: {
            args: Prisma.SubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          create: {
            args: Prisma.SubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          createMany: {
            args: Prisma.SubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          delete: {
            args: Prisma.SubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          update: {
            args: Prisma.SubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          deleteMany: {
            args: Prisma.SubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>[]
          }
          upsert: {
            args: Prisma.SubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubmissionPayload>
          }
          aggregate: {
            args: Prisma.SubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubmission>
          }
          groupBy: {
            args: Prisma.SubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<SubmissionCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      Settlement: {
        payload: Prisma.$SettlementPayload<ExtArgs>
        fields: Prisma.SettlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          findFirst: {
            args: Prisma.SettlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          findMany: {
            args: Prisma.SettlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>[]
          }
          create: {
            args: Prisma.SettlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          createMany: {
            args: Prisma.SettlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>[]
          }
          delete: {
            args: Prisma.SettlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          update: {
            args: Prisma.SettlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          deleteMany: {
            args: Prisma.SettlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettlementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>[]
          }
          upsert: {
            args: Prisma.SettlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementPayload>
          }
          aggregate: {
            args: Prisma.SettlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettlement>
          }
          groupBy: {
            args: Prisma.SettlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettlementCountArgs<ExtArgs>
            result: $Utils.Optional<SettlementCountAggregateOutputType> | number
          }
        }
      }
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>
        fields: Prisma.CampaignFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[]
          }
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>
          }
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCampaign>
          }
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>
            result: $Utils.Optional<CampaignGroupByOutputType>[]
          }
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    projectRequest?: ProjectRequestOmit
    projectAssignment?: ProjectAssignmentOmit
    project?: ProjectOmit
    submission?: SubmissionOmit
    feedback?: FeedbackOmit
    settlement?: SettlementOmit
    campaign?: CampaignOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ownedProjects: number
    assignedProjects: number
    submissions: number
    feedbacks: number
    settlements: number
    createdRequests: number
    assignments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedProjects?: boolean | UserCountOutputTypeCountOwnedProjectsArgs
    assignedProjects?: boolean | UserCountOutputTypeCountAssignedProjectsArgs
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    feedbacks?: boolean | UserCountOutputTypeCountFeedbacksArgs
    settlements?: boolean | UserCountOutputTypeCountSettlementsArgs
    createdRequests?: boolean | UserCountOutputTypeCountCreatedRequestsArgs
    assignments?: boolean | UserCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSettlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettlementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectAssignmentWhereInput
  }


  /**
   * Count Type ProjectRequestCountOutputType
   */

  export type ProjectRequestCountOutputType = {
    assignments: number
  }

  export type ProjectRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | ProjectRequestCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * ProjectRequestCountOutputType without action
   */
  export type ProjectRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequestCountOutputType
     */
    select?: ProjectRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectRequestCountOutputType without action
   */
  export type ProjectRequestCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectAssignmentWhereInput
  }


  /**
   * Count Type ProjectAssignmentCountOutputType
   */

  export type ProjectAssignmentCountOutputType = {
    submissions: number
  }

  export type ProjectAssignmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | ProjectAssignmentCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * ProjectAssignmentCountOutputType without action
   */
  export type ProjectAssignmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignmentCountOutputType
     */
    select?: ProjectAssignmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectAssignmentCountOutputType without action
   */
  export type ProjectAssignmentCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    assignees: number
    submissions: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignees?: boolean | ProjectCountOutputTypeCountAssigneesArgs
    submissions?: boolean | ProjectCountOutputTypeCountSubmissionsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountAssigneesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
  }


  /**
   * Count Type SubmissionCountOutputType
   */

  export type SubmissionCountOutputType = {
    feedbacks: number
  }

  export type SubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedbacks?: boolean | SubmissionCountOutputTypeCountFeedbacksArgs
  }

  // Custom InputTypes
  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubmissionCountOutputType
     */
    select?: SubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubmissionCountOutputType without action
   */
  export type SubmissionCountOutputTypeCountFeedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    phone: string | null
    role: $Enums.UserRole | null
    profileImage: string | null
    bio: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    phone: string | null
    role: $Enums.UserRole | null
    profileImage: string | null
    bio: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    phone: number
    role: number
    profileImage: number
    bio: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    phone?: true
    role?: true
    profileImage?: true
    bio?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    phone?: true
    role?: true
    profileImage?: true
    bio?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    phone?: true
    role?: true
    profileImage?: true
    bio?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    phone: string | null
    role: $Enums.UserRole
    profileImage: string | null
    bio: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    profileImage?: boolean
    bio?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ownedProjects?: boolean | User$ownedProjectsArgs<ExtArgs>
    assignedProjects?: boolean | User$assignedProjectsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    settlements?: boolean | User$settlementsArgs<ExtArgs>
    createdRequests?: boolean | User$createdRequestsArgs<ExtArgs>
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    profileImage?: boolean
    bio?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    profileImage?: boolean
    bio?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    phone?: boolean
    role?: boolean
    profileImage?: boolean
    bio?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "phone" | "role" | "profileImage" | "bio" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedProjects?: boolean | User$ownedProjectsArgs<ExtArgs>
    assignedProjects?: boolean | User$assignedProjectsArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    feedbacks?: boolean | User$feedbacksArgs<ExtArgs>
    settlements?: boolean | User$settlementsArgs<ExtArgs>
    createdRequests?: boolean | User$createdRequestsArgs<ExtArgs>
    assignments?: boolean | User$assignmentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ownedProjects: Prisma.$ProjectPayload<ExtArgs>[]
      assignedProjects: Prisma.$ProjectPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
      settlements: Prisma.$SettlementPayload<ExtArgs>[]
      createdRequests: Prisma.$ProjectRequestPayload<ExtArgs>[]
      assignments: Prisma.$ProjectAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      phone: string | null
      role: $Enums.UserRole
      profileImage: string | null
      bio: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ownedProjects<T extends User$ownedProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedProjects<T extends User$assignedProjectsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedProjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedbacks<T extends User$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, User$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settlements<T extends User$settlementsArgs<ExtArgs> = {}>(args?: Subset<T, User$settlementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdRequests<T extends User$createdRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends User$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ownedProjects
   */
  export type User$ownedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.assignedProjects
   */
  export type User$assignedProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * User.feedbacks
   */
  export type User$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * User.settlements
   */
  export type User$settlementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    where?: SettlementWhereInput
    orderBy?: SettlementOrderByWithRelationInput | SettlementOrderByWithRelationInput[]
    cursor?: SettlementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SettlementScalarFieldEnum | SettlementScalarFieldEnum[]
  }

  /**
   * User.createdRequests
   */
  export type User$createdRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    where?: ProjectRequestWhereInput
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    cursor?: ProjectRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * User.assignments
   */
  export type User$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    where?: ProjectAssignmentWhereInput
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    cursor?: ProjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectAssignmentScalarFieldEnum | ProjectAssignmentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ProjectRequest
   */

  export type AggregateProjectRequest = {
    _count: ProjectRequestCountAggregateOutputType | null
    _avg: ProjectRequestAvgAggregateOutputType | null
    _sum: ProjectRequestSumAggregateOutputType | null
    _min: ProjectRequestMinAggregateOutputType | null
    _max: ProjectRequestMaxAggregateOutputType | null
  }

  export type ProjectRequestAvgAggregateOutputType = {
    maxAssignees: number | null
    currentAssignees: number | null
    estimatedBudget: Decimal | null
  }

  export type ProjectRequestSumAggregateOutputType = {
    maxAssignees: number | null
    currentAssignees: number | null
    estimatedBudget: Decimal | null
  }

  export type ProjectRequestMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    deadline: Date | null
    assignmentType: $Enums.AssignmentType | null
    maxAssignees: number | null
    currentAssignees: number | null
    status: $Enums.RequestStatus | null
    estimatedBudget: Decimal | null
    requirements: string | null
    targetCounselorId: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectRequestMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    deadline: Date | null
    assignmentType: $Enums.AssignmentType | null
    maxAssignees: number | null
    currentAssignees: number | null
    status: $Enums.RequestStatus | null
    estimatedBudget: Decimal | null
    requirements: string | null
    targetCounselorId: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectRequestCountAggregateOutputType = {
    id: number
    title: number
    description: number
    categories: number
    deadline: number
    assignmentType: number
    maxAssignees: number
    currentAssignees: number
    status: number
    estimatedBudget: number
    requirements: number
    referenceUrls: number
    targetCounselorId: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectRequestAvgAggregateInputType = {
    maxAssignees?: true
    currentAssignees?: true
    estimatedBudget?: true
  }

  export type ProjectRequestSumAggregateInputType = {
    maxAssignees?: true
    currentAssignees?: true
    estimatedBudget?: true
  }

  export type ProjectRequestMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    deadline?: true
    assignmentType?: true
    maxAssignees?: true
    currentAssignees?: true
    status?: true
    estimatedBudget?: true
    requirements?: true
    targetCounselorId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectRequestMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    deadline?: true
    assignmentType?: true
    maxAssignees?: true
    currentAssignees?: true
    status?: true
    estimatedBudget?: true
    requirements?: true
    targetCounselorId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectRequestCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    categories?: true
    deadline?: true
    assignmentType?: true
    maxAssignees?: true
    currentAssignees?: true
    status?: true
    estimatedBudget?: true
    requirements?: true
    referenceUrls?: true
    targetCounselorId?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRequest to aggregate.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectRequests
    **/
    _count?: true | ProjectRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectRequestMaxAggregateInputType
  }

  export type GetProjectRequestAggregateType<T extends ProjectRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectRequest[P]>
      : GetScalarType<T[P], AggregateProjectRequest[P]>
  }




  export type ProjectRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectRequestWhereInput
    orderBy?: ProjectRequestOrderByWithAggregationInput | ProjectRequestOrderByWithAggregationInput[]
    by: ProjectRequestScalarFieldEnum[] | ProjectRequestScalarFieldEnum
    having?: ProjectRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectRequestCountAggregateInputType | true
    _avg?: ProjectRequestAvgAggregateInputType
    _sum?: ProjectRequestSumAggregateInputType
    _min?: ProjectRequestMinAggregateInputType
    _max?: ProjectRequestMaxAggregateInputType
  }

  export type ProjectRequestGroupByOutputType = {
    id: string
    title: string
    description: string | null
    categories: string[]
    deadline: Date
    assignmentType: $Enums.AssignmentType
    maxAssignees: number
    currentAssignees: number
    status: $Enums.RequestStatus
    estimatedBudget: Decimal | null
    requirements: string | null
    referenceUrls: string[]
    targetCounselorId: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectRequestCountAggregateOutputType | null
    _avg: ProjectRequestAvgAggregateOutputType | null
    _sum: ProjectRequestSumAggregateOutputType | null
    _min: ProjectRequestMinAggregateOutputType | null
    _max: ProjectRequestMaxAggregateOutputType | null
  }

  type GetProjectRequestGroupByPayload<T extends ProjectRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectRequestGroupByOutputType[P]>
        }
      >
    >


  export type ProjectRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    categories?: boolean
    deadline?: boolean
    assignmentType?: boolean
    maxAssignees?: boolean
    currentAssignees?: boolean
    status?: boolean
    estimatedBudget?: boolean
    requirements?: boolean
    referenceUrls?: boolean
    targetCounselorId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    assignments?: boolean | ProjectRequest$assignmentsArgs<ExtArgs>
    _count?: boolean | ProjectRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    categories?: boolean
    deadline?: boolean
    assignmentType?: boolean
    maxAssignees?: boolean
    currentAssignees?: boolean
    status?: boolean
    estimatedBudget?: boolean
    requirements?: boolean
    referenceUrls?: boolean
    targetCounselorId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    categories?: boolean
    deadline?: boolean
    assignmentType?: boolean
    maxAssignees?: boolean
    currentAssignees?: boolean
    status?: boolean
    estimatedBudget?: boolean
    requirements?: boolean
    referenceUrls?: boolean
    targetCounselorId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectRequest"]>

  export type ProjectRequestSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    categories?: boolean
    deadline?: boolean
    assignmentType?: boolean
    maxAssignees?: boolean
    currentAssignees?: boolean
    status?: boolean
    estimatedBudget?: boolean
    requirements?: boolean
    referenceUrls?: boolean
    targetCounselorId?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "categories" | "deadline" | "assignmentType" | "maxAssignees" | "currentAssignees" | "status" | "estimatedBudget" | "requirements" | "referenceUrls" | "targetCounselorId" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["projectRequest"]>
  export type ProjectRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    assignments?: boolean | ProjectRequest$assignmentsArgs<ExtArgs>
    _count?: boolean | ProjectRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectRequest"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      assignments: Prisma.$ProjectAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      categories: string[]
      deadline: Date
      assignmentType: $Enums.AssignmentType
      maxAssignees: number
      currentAssignees: number
      status: $Enums.RequestStatus
      estimatedBudget: Prisma.Decimal | null
      requirements: string | null
      referenceUrls: string[]
      targetCounselorId: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectRequest"]>
    composites: {}
  }

  type ProjectRequestGetPayload<S extends boolean | null | undefined | ProjectRequestDefaultArgs> = $Result.GetResult<Prisma.$ProjectRequestPayload, S>

  type ProjectRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectRequestCountAggregateInputType | true
    }

  export interface ProjectRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectRequest'], meta: { name: 'ProjectRequest' } }
    /**
     * Find zero or one ProjectRequest that matches the filter.
     * @param {ProjectRequestFindUniqueArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectRequestFindUniqueArgs>(args: SelectSubset<T, ProjectRequestFindUniqueArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectRequestFindUniqueOrThrowArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindFirstArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectRequestFindFirstArgs>(args?: SelectSubset<T, ProjectRequestFindFirstArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindFirstOrThrowArgs} args - Arguments to find a ProjectRequest
     * @example
     * // Get one ProjectRequest
     * const projectRequest = await prisma.projectRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectRequests
     * const projectRequests = await prisma.projectRequest.findMany()
     * 
     * // Get first 10 ProjectRequests
     * const projectRequests = await prisma.projectRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectRequestFindManyArgs>(args?: SelectSubset<T, ProjectRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectRequest.
     * @param {ProjectRequestCreateArgs} args - Arguments to create a ProjectRequest.
     * @example
     * // Create one ProjectRequest
     * const ProjectRequest = await prisma.projectRequest.create({
     *   data: {
     *     // ... data to create a ProjectRequest
     *   }
     * })
     * 
     */
    create<T extends ProjectRequestCreateArgs>(args: SelectSubset<T, ProjectRequestCreateArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectRequests.
     * @param {ProjectRequestCreateManyArgs} args - Arguments to create many ProjectRequests.
     * @example
     * // Create many ProjectRequests
     * const projectRequest = await prisma.projectRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectRequestCreateManyArgs>(args?: SelectSubset<T, ProjectRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectRequests and returns the data saved in the database.
     * @param {ProjectRequestCreateManyAndReturnArgs} args - Arguments to create many ProjectRequests.
     * @example
     * // Create many ProjectRequests
     * const projectRequest = await prisma.projectRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectRequests and only return the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectRequest.
     * @param {ProjectRequestDeleteArgs} args - Arguments to delete one ProjectRequest.
     * @example
     * // Delete one ProjectRequest
     * const ProjectRequest = await prisma.projectRequest.delete({
     *   where: {
     *     // ... filter to delete one ProjectRequest
     *   }
     * })
     * 
     */
    delete<T extends ProjectRequestDeleteArgs>(args: SelectSubset<T, ProjectRequestDeleteArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectRequest.
     * @param {ProjectRequestUpdateArgs} args - Arguments to update one ProjectRequest.
     * @example
     * // Update one ProjectRequest
     * const projectRequest = await prisma.projectRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectRequestUpdateArgs>(args: SelectSubset<T, ProjectRequestUpdateArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectRequests.
     * @param {ProjectRequestDeleteManyArgs} args - Arguments to filter ProjectRequests to delete.
     * @example
     * // Delete a few ProjectRequests
     * const { count } = await prisma.projectRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectRequestDeleteManyArgs>(args?: SelectSubset<T, ProjectRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectRequests
     * const projectRequest = await prisma.projectRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectRequestUpdateManyArgs>(args: SelectSubset<T, ProjectRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectRequests and returns the data updated in the database.
     * @param {ProjectRequestUpdateManyAndReturnArgs} args - Arguments to update many ProjectRequests.
     * @example
     * // Update many ProjectRequests
     * const projectRequest = await prisma.projectRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectRequests and only return the `id`
     * const projectRequestWithIdOnly = await prisma.projectRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectRequest.
     * @param {ProjectRequestUpsertArgs} args - Arguments to update or create a ProjectRequest.
     * @example
     * // Update or create a ProjectRequest
     * const projectRequest = await prisma.projectRequest.upsert({
     *   create: {
     *     // ... data to create a ProjectRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectRequest we want to update
     *   }
     * })
     */
    upsert<T extends ProjectRequestUpsertArgs>(args: SelectSubset<T, ProjectRequestUpsertArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestCountArgs} args - Arguments to filter ProjectRequests to count.
     * @example
     * // Count the number of ProjectRequests
     * const count = await prisma.projectRequest.count({
     *   where: {
     *     // ... the filter for the ProjectRequests we want to count
     *   }
     * })
    **/
    count<T extends ProjectRequestCountArgs>(
      args?: Subset<T, ProjectRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectRequestAggregateArgs>(args: Subset<T, ProjectRequestAggregateArgs>): Prisma.PrismaPromise<GetProjectRequestAggregateType<T>>

    /**
     * Group by ProjectRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectRequestGroupByArgs['orderBy'] }
        : { orderBy?: ProjectRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectRequest model
   */
  readonly fields: ProjectRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignments<T extends ProjectRequest$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, ProjectRequest$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectRequest model
   */
  interface ProjectRequestFieldRefs {
    readonly id: FieldRef<"ProjectRequest", 'String'>
    readonly title: FieldRef<"ProjectRequest", 'String'>
    readonly description: FieldRef<"ProjectRequest", 'String'>
    readonly categories: FieldRef<"ProjectRequest", 'String[]'>
    readonly deadline: FieldRef<"ProjectRequest", 'DateTime'>
    readonly assignmentType: FieldRef<"ProjectRequest", 'AssignmentType'>
    readonly maxAssignees: FieldRef<"ProjectRequest", 'Int'>
    readonly currentAssignees: FieldRef<"ProjectRequest", 'Int'>
    readonly status: FieldRef<"ProjectRequest", 'RequestStatus'>
    readonly estimatedBudget: FieldRef<"ProjectRequest", 'Decimal'>
    readonly requirements: FieldRef<"ProjectRequest", 'String'>
    readonly referenceUrls: FieldRef<"ProjectRequest", 'String[]'>
    readonly targetCounselorId: FieldRef<"ProjectRequest", 'String'>
    readonly createdById: FieldRef<"ProjectRequest", 'String'>
    readonly createdAt: FieldRef<"ProjectRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectRequest findUnique
   */
  export type ProjectRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest findUniqueOrThrow
   */
  export type ProjectRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest findFirst
   */
  export type ProjectRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRequests.
     */
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest findFirstOrThrow
   */
  export type ProjectRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRequest to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectRequests.
     */
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest findMany
   */
  export type ProjectRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter, which ProjectRequests to fetch.
     */
    where?: ProjectRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectRequests to fetch.
     */
    orderBy?: ProjectRequestOrderByWithRelationInput | ProjectRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectRequests.
     */
    cursor?: ProjectRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectRequests.
     */
    skip?: number
    distinct?: ProjectRequestScalarFieldEnum | ProjectRequestScalarFieldEnum[]
  }

  /**
   * ProjectRequest create
   */
  export type ProjectRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectRequest.
     */
    data: XOR<ProjectRequestCreateInput, ProjectRequestUncheckedCreateInput>
  }

  /**
   * ProjectRequest createMany
   */
  export type ProjectRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectRequests.
     */
    data: ProjectRequestCreateManyInput | ProjectRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectRequest createManyAndReturn
   */
  export type ProjectRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectRequests.
     */
    data: ProjectRequestCreateManyInput | ProjectRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectRequest update
   */
  export type ProjectRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectRequest.
     */
    data: XOR<ProjectRequestUpdateInput, ProjectRequestUncheckedUpdateInput>
    /**
     * Choose, which ProjectRequest to update.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest updateMany
   */
  export type ProjectRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectRequests.
     */
    data: XOR<ProjectRequestUpdateManyMutationInput, ProjectRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRequests to update
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to update.
     */
    limit?: number
  }

  /**
   * ProjectRequest updateManyAndReturn
   */
  export type ProjectRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * The data used to update ProjectRequests.
     */
    data: XOR<ProjectRequestUpdateManyMutationInput, ProjectRequestUncheckedUpdateManyInput>
    /**
     * Filter which ProjectRequests to update
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectRequest upsert
   */
  export type ProjectRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectRequest to update in case it exists.
     */
    where: ProjectRequestWhereUniqueInput
    /**
     * In case the ProjectRequest found by the `where` argument doesn't exist, create a new ProjectRequest with this data.
     */
    create: XOR<ProjectRequestCreateInput, ProjectRequestUncheckedCreateInput>
    /**
     * In case the ProjectRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectRequestUpdateInput, ProjectRequestUncheckedUpdateInput>
  }

  /**
   * ProjectRequest delete
   */
  export type ProjectRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
    /**
     * Filter which ProjectRequest to delete.
     */
    where: ProjectRequestWhereUniqueInput
  }

  /**
   * ProjectRequest deleteMany
   */
  export type ProjectRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectRequests to delete
     */
    where?: ProjectRequestWhereInput
    /**
     * Limit how many ProjectRequests to delete.
     */
    limit?: number
  }

  /**
   * ProjectRequest.assignments
   */
  export type ProjectRequest$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    where?: ProjectAssignmentWhereInput
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    cursor?: ProjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectAssignmentScalarFieldEnum | ProjectAssignmentScalarFieldEnum[]
  }

  /**
   * ProjectRequest without action
   */
  export type ProjectRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectRequest
     */
    select?: ProjectRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectRequest
     */
    omit?: ProjectRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectRequestInclude<ExtArgs> | null
  }


  /**
   * Model ProjectAssignment
   */

  export type AggregateProjectAssignment = {
    _count: ProjectAssignmentCountAggregateOutputType | null
    _min: ProjectAssignmentMinAggregateOutputType | null
    _max: ProjectAssignmentMaxAggregateOutputType | null
  }

  export type ProjectAssignmentMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    freelancerId: string | null
    acceptedAt: Date | null
    status: $Enums.AssignmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectAssignmentMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    freelancerId: string | null
    acceptedAt: Date | null
    status: $Enums.AssignmentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectAssignmentCountAggregateOutputType = {
    id: number
    requestId: number
    freelancerId: number
    acceptedAt: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAssignmentMinAggregateInputType = {
    id?: true
    requestId?: true
    freelancerId?: true
    acceptedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectAssignmentMaxAggregateInputType = {
    id?: true
    requestId?: true
    freelancerId?: true
    acceptedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectAssignmentCountAggregateInputType = {
    id?: true
    requestId?: true
    freelancerId?: true
    acceptedAt?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectAssignment to aggregate.
     */
    where?: ProjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectAssignments to fetch.
     */
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectAssignments
    **/
    _count?: true | ProjectAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectAssignmentMaxAggregateInputType
  }

  export type GetProjectAssignmentAggregateType<T extends ProjectAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectAssignment[P]>
      : GetScalarType<T[P], AggregateProjectAssignment[P]>
  }




  export type ProjectAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectAssignmentWhereInput
    orderBy?: ProjectAssignmentOrderByWithAggregationInput | ProjectAssignmentOrderByWithAggregationInput[]
    by: ProjectAssignmentScalarFieldEnum[] | ProjectAssignmentScalarFieldEnum
    having?: ProjectAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectAssignmentCountAggregateInputType | true
    _min?: ProjectAssignmentMinAggregateInputType
    _max?: ProjectAssignmentMaxAggregateInputType
  }

  export type ProjectAssignmentGroupByOutputType = {
    id: string
    requestId: string
    freelancerId: string
    acceptedAt: Date
    status: $Enums.AssignmentStatus
    createdAt: Date
    updatedAt: Date
    _count: ProjectAssignmentCountAggregateOutputType | null
    _min: ProjectAssignmentMinAggregateOutputType | null
    _max: ProjectAssignmentMaxAggregateOutputType | null
  }

  type GetProjectAssignmentGroupByPayload<T extends ProjectAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type ProjectAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    freelancerId?: boolean
    acceptedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
    submissions?: boolean | ProjectAssignment$submissionsArgs<ExtArgs>
    _count?: boolean | ProjectAssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectAssignment"]>

  export type ProjectAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    freelancerId?: boolean
    acceptedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectAssignment"]>

  export type ProjectAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    freelancerId?: boolean
    acceptedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectAssignment"]>

  export type ProjectAssignmentSelectScalar = {
    id?: boolean
    requestId?: boolean
    freelancerId?: boolean
    acceptedAt?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestId" | "freelancerId" | "acceptedAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["projectAssignment"]>
  export type ProjectAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
    submissions?: boolean | ProjectAssignment$submissionsArgs<ExtArgs>
    _count?: boolean | ProjectAssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | ProjectRequestDefaultArgs<ExtArgs>
    freelancer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectAssignment"
    objects: {
      request: Prisma.$ProjectRequestPayload<ExtArgs>
      freelancer: Prisma.$UserPayload<ExtArgs>
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      freelancerId: string
      acceptedAt: Date
      status: $Enums.AssignmentStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["projectAssignment"]>
    composites: {}
  }

  type ProjectAssignmentGetPayload<S extends boolean | null | undefined | ProjectAssignmentDefaultArgs> = $Result.GetResult<Prisma.$ProjectAssignmentPayload, S>

  type ProjectAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectAssignmentCountAggregateInputType | true
    }

  export interface ProjectAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectAssignment'], meta: { name: 'ProjectAssignment' } }
    /**
     * Find zero or one ProjectAssignment that matches the filter.
     * @param {ProjectAssignmentFindUniqueArgs} args - Arguments to find a ProjectAssignment
     * @example
     * // Get one ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectAssignmentFindUniqueArgs>(args: SelectSubset<T, ProjectAssignmentFindUniqueArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectAssignmentFindUniqueOrThrowArgs} args - Arguments to find a ProjectAssignment
     * @example
     * // Get one ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentFindFirstArgs} args - Arguments to find a ProjectAssignment
     * @example
     * // Get one ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectAssignmentFindFirstArgs>(args?: SelectSubset<T, ProjectAssignmentFindFirstArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentFindFirstOrThrowArgs} args - Arguments to find a ProjectAssignment
     * @example
     * // Get one ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectAssignments
     * const projectAssignments = await prisma.projectAssignment.findMany()
     * 
     * // Get first 10 ProjectAssignments
     * const projectAssignments = await prisma.projectAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectAssignmentWithIdOnly = await prisma.projectAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectAssignmentFindManyArgs>(args?: SelectSubset<T, ProjectAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectAssignment.
     * @param {ProjectAssignmentCreateArgs} args - Arguments to create a ProjectAssignment.
     * @example
     * // Create one ProjectAssignment
     * const ProjectAssignment = await prisma.projectAssignment.create({
     *   data: {
     *     // ... data to create a ProjectAssignment
     *   }
     * })
     * 
     */
    create<T extends ProjectAssignmentCreateArgs>(args: SelectSubset<T, ProjectAssignmentCreateArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectAssignments.
     * @param {ProjectAssignmentCreateManyArgs} args - Arguments to create many ProjectAssignments.
     * @example
     * // Create many ProjectAssignments
     * const projectAssignment = await prisma.projectAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectAssignmentCreateManyArgs>(args?: SelectSubset<T, ProjectAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectAssignments and returns the data saved in the database.
     * @param {ProjectAssignmentCreateManyAndReturnArgs} args - Arguments to create many ProjectAssignments.
     * @example
     * // Create many ProjectAssignments
     * const projectAssignment = await prisma.projectAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectAssignments and only return the `id`
     * const projectAssignmentWithIdOnly = await prisma.projectAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectAssignment.
     * @param {ProjectAssignmentDeleteArgs} args - Arguments to delete one ProjectAssignment.
     * @example
     * // Delete one ProjectAssignment
     * const ProjectAssignment = await prisma.projectAssignment.delete({
     *   where: {
     *     // ... filter to delete one ProjectAssignment
     *   }
     * })
     * 
     */
    delete<T extends ProjectAssignmentDeleteArgs>(args: SelectSubset<T, ProjectAssignmentDeleteArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectAssignment.
     * @param {ProjectAssignmentUpdateArgs} args - Arguments to update one ProjectAssignment.
     * @example
     * // Update one ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectAssignmentUpdateArgs>(args: SelectSubset<T, ProjectAssignmentUpdateArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectAssignments.
     * @param {ProjectAssignmentDeleteManyArgs} args - Arguments to filter ProjectAssignments to delete.
     * @example
     * // Delete a few ProjectAssignments
     * const { count } = await prisma.projectAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectAssignmentDeleteManyArgs>(args?: SelectSubset<T, ProjectAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectAssignments
     * const projectAssignment = await prisma.projectAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectAssignmentUpdateManyArgs>(args: SelectSubset<T, ProjectAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectAssignments and returns the data updated in the database.
     * @param {ProjectAssignmentUpdateManyAndReturnArgs} args - Arguments to update many ProjectAssignments.
     * @example
     * // Update many ProjectAssignments
     * const projectAssignment = await prisma.projectAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectAssignments and only return the `id`
     * const projectAssignmentWithIdOnly = await prisma.projectAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectAssignment.
     * @param {ProjectAssignmentUpsertArgs} args - Arguments to update or create a ProjectAssignment.
     * @example
     * // Update or create a ProjectAssignment
     * const projectAssignment = await prisma.projectAssignment.upsert({
     *   create: {
     *     // ... data to create a ProjectAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectAssignment we want to update
     *   }
     * })
     */
    upsert<T extends ProjectAssignmentUpsertArgs>(args: SelectSubset<T, ProjectAssignmentUpsertArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentCountArgs} args - Arguments to filter ProjectAssignments to count.
     * @example
     * // Count the number of ProjectAssignments
     * const count = await prisma.projectAssignment.count({
     *   where: {
     *     // ... the filter for the ProjectAssignments we want to count
     *   }
     * })
    **/
    count<T extends ProjectAssignmentCountArgs>(
      args?: Subset<T, ProjectAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAssignmentAggregateArgs>(args: Subset<T, ProjectAssignmentAggregateArgs>): Prisma.PrismaPromise<GetProjectAssignmentAggregateType<T>>

    /**
     * Group by ProjectAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: ProjectAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectAssignment model
   */
  readonly fields: ProjectAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends ProjectRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectRequestDefaultArgs<ExtArgs>>): Prisma__ProjectRequestClient<$Result.GetResult<Prisma.$ProjectRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    freelancer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submissions<T extends ProjectAssignment$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, ProjectAssignment$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectAssignment model
   */
  interface ProjectAssignmentFieldRefs {
    readonly id: FieldRef<"ProjectAssignment", 'String'>
    readonly requestId: FieldRef<"ProjectAssignment", 'String'>
    readonly freelancerId: FieldRef<"ProjectAssignment", 'String'>
    readonly acceptedAt: FieldRef<"ProjectAssignment", 'DateTime'>
    readonly status: FieldRef<"ProjectAssignment", 'AssignmentStatus'>
    readonly createdAt: FieldRef<"ProjectAssignment", 'DateTime'>
    readonly updatedAt: FieldRef<"ProjectAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProjectAssignment findUnique
   */
  export type ProjectAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ProjectAssignment to fetch.
     */
    where: ProjectAssignmentWhereUniqueInput
  }

  /**
   * ProjectAssignment findUniqueOrThrow
   */
  export type ProjectAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ProjectAssignment to fetch.
     */
    where: ProjectAssignmentWhereUniqueInput
  }

  /**
   * ProjectAssignment findFirst
   */
  export type ProjectAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ProjectAssignment to fetch.
     */
    where?: ProjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectAssignments to fetch.
     */
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectAssignments.
     */
    cursor?: ProjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectAssignments.
     */
    distinct?: ProjectAssignmentScalarFieldEnum | ProjectAssignmentScalarFieldEnum[]
  }

  /**
   * ProjectAssignment findFirstOrThrow
   */
  export type ProjectAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ProjectAssignment to fetch.
     */
    where?: ProjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectAssignments to fetch.
     */
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectAssignments.
     */
    cursor?: ProjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectAssignments.
     */
    distinct?: ProjectAssignmentScalarFieldEnum | ProjectAssignmentScalarFieldEnum[]
  }

  /**
   * ProjectAssignment findMany
   */
  export type ProjectAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which ProjectAssignments to fetch.
     */
    where?: ProjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectAssignments to fetch.
     */
    orderBy?: ProjectAssignmentOrderByWithRelationInput | ProjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectAssignments.
     */
    cursor?: ProjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectAssignments.
     */
    skip?: number
    distinct?: ProjectAssignmentScalarFieldEnum | ProjectAssignmentScalarFieldEnum[]
  }

  /**
   * ProjectAssignment create
   */
  export type ProjectAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectAssignment.
     */
    data: XOR<ProjectAssignmentCreateInput, ProjectAssignmentUncheckedCreateInput>
  }

  /**
   * ProjectAssignment createMany
   */
  export type ProjectAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectAssignments.
     */
    data: ProjectAssignmentCreateManyInput | ProjectAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectAssignment createManyAndReturn
   */
  export type ProjectAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectAssignments.
     */
    data: ProjectAssignmentCreateManyInput | ProjectAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectAssignment update
   */
  export type ProjectAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectAssignment.
     */
    data: XOR<ProjectAssignmentUpdateInput, ProjectAssignmentUncheckedUpdateInput>
    /**
     * Choose, which ProjectAssignment to update.
     */
    where: ProjectAssignmentWhereUniqueInput
  }

  /**
   * ProjectAssignment updateMany
   */
  export type ProjectAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectAssignments.
     */
    data: XOR<ProjectAssignmentUpdateManyMutationInput, ProjectAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ProjectAssignments to update
     */
    where?: ProjectAssignmentWhereInput
    /**
     * Limit how many ProjectAssignments to update.
     */
    limit?: number
  }

  /**
   * ProjectAssignment updateManyAndReturn
   */
  export type ProjectAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update ProjectAssignments.
     */
    data: XOR<ProjectAssignmentUpdateManyMutationInput, ProjectAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which ProjectAssignments to update
     */
    where?: ProjectAssignmentWhereInput
    /**
     * Limit how many ProjectAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectAssignment upsert
   */
  export type ProjectAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectAssignment to update in case it exists.
     */
    where: ProjectAssignmentWhereUniqueInput
    /**
     * In case the ProjectAssignment found by the `where` argument doesn't exist, create a new ProjectAssignment with this data.
     */
    create: XOR<ProjectAssignmentCreateInput, ProjectAssignmentUncheckedCreateInput>
    /**
     * In case the ProjectAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectAssignmentUpdateInput, ProjectAssignmentUncheckedUpdateInput>
  }

  /**
   * ProjectAssignment delete
   */
  export type ProjectAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter which ProjectAssignment to delete.
     */
    where: ProjectAssignmentWhereUniqueInput
  }

  /**
   * ProjectAssignment deleteMany
   */
  export type ProjectAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectAssignments to delete
     */
    where?: ProjectAssignmentWhereInput
    /**
     * Limit how many ProjectAssignments to delete.
     */
    limit?: number
  }

  /**
   * ProjectAssignment.submissions
   */
  export type ProjectAssignment$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * ProjectAssignment without action
   */
  export type ProjectAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    budget: Decimal | null
  }

  export type ProjectSumAggregateOutputType = {
    budget: Decimal | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.ProjectStatus | null
    deadline: Date | null
    budget: Decimal | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: $Enums.ProjectStatus | null
    deadline: Date | null
    budget: Decimal | null
    ownerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    deadline: number
    budget: number
    ownerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    budget?: true
  }

  export type ProjectSumAggregateInputType = {
    budget?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    deadline?: true
    budget?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    deadline?: true
    budget?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    deadline?: true
    budget?: true
    ownerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: $Enums.ProjectStatus
    deadline: Date | null
    budget: Decimal | null
    ownerId: string
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    deadline?: boolean
    budget?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    assignees?: boolean | Project$assigneesArgs<ExtArgs>
    submissions?: boolean | Project$submissionsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    deadline?: boolean
    budget?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    deadline?: boolean
    budget?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    deadline?: boolean
    budget?: boolean
    ownerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "deadline" | "budget" | "ownerId" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    assignees?: boolean | Project$assigneesArgs<ExtArgs>
    submissions?: boolean | Project$submissionsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      assignees: Prisma.$UserPayload<ExtArgs>[]
      submissions: Prisma.$SubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: $Enums.ProjectStatus
      deadline: Date | null
      budget: Prisma.Decimal | null
      ownerId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignees<T extends Project$assigneesArgs<ExtArgs> = {}>(args?: Subset<T, Project$assigneesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Project$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Project$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'ProjectStatus'>
    readonly deadline: FieldRef<"Project", 'DateTime'>
    readonly budget: FieldRef<"Project", 'Decimal'>
    readonly ownerId: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.assignees
   */
  export type Project$assigneesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Project.submissions
   */
  export type Project$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    cursor?: SubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Submission
   */

  export type AggregateSubmission = {
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  export type SubmissionAvgAggregateOutputType = {
    versionSlot: number | null
    version: number | null
    duration: number | null
  }

  export type SubmissionSumAggregateOutputType = {
    versionSlot: number | null
    version: number | null
    duration: number | null
  }

  export type SubmissionMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    assignmentId: string | null
    userId: string | null
    versionSlot: number | null
    versionTitle: string | null
    version: number | null
    videoUrl: string | null
    fileKey: string | null
    duration: number | null
    thumbnailUrl: string | null
    status: $Enums.SubmissionStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    assignmentId: string | null
    userId: string | null
    versionSlot: number | null
    versionTitle: string | null
    version: number | null
    videoUrl: string | null
    fileKey: string | null
    duration: number | null
    thumbnailUrl: string | null
    status: $Enums.SubmissionStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubmissionCountAggregateOutputType = {
    id: number
    projectId: number
    assignmentId: number
    userId: number
    versionSlot: number
    versionTitle: number
    version: number
    videoUrl: number
    fileKey: number
    duration: number
    thumbnailUrl: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubmissionAvgAggregateInputType = {
    versionSlot?: true
    version?: true
    duration?: true
  }

  export type SubmissionSumAggregateInputType = {
    versionSlot?: true
    version?: true
    duration?: true
  }

  export type SubmissionMinAggregateInputType = {
    id?: true
    projectId?: true
    assignmentId?: true
    userId?: true
    versionSlot?: true
    versionTitle?: true
    version?: true
    videoUrl?: true
    fileKey?: true
    duration?: true
    thumbnailUrl?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionMaxAggregateInputType = {
    id?: true
    projectId?: true
    assignmentId?: true
    userId?: true
    versionSlot?: true
    versionTitle?: true
    version?: true
    videoUrl?: true
    fileKey?: true
    duration?: true
    thumbnailUrl?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubmissionCountAggregateInputType = {
    id?: true
    projectId?: true
    assignmentId?: true
    userId?: true
    versionSlot?: true
    versionTitle?: true
    version?: true
    videoUrl?: true
    fileKey?: true
    duration?: true
    thumbnailUrl?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submission to aggregate.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Submissions
    **/
    _count?: true | SubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubmissionMaxAggregateInputType
  }

  export type GetSubmissionAggregateType<T extends SubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubmission[P]>
      : GetScalarType<T[P], AggregateSubmission[P]>
  }




  export type SubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubmissionWhereInput
    orderBy?: SubmissionOrderByWithAggregationInput | SubmissionOrderByWithAggregationInput[]
    by: SubmissionScalarFieldEnum[] | SubmissionScalarFieldEnum
    having?: SubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubmissionCountAggregateInputType | true
    _avg?: SubmissionAvgAggregateInputType
    _sum?: SubmissionSumAggregateInputType
    _min?: SubmissionMinAggregateInputType
    _max?: SubmissionMaxAggregateInputType
  }

  export type SubmissionGroupByOutputType = {
    id: string
    projectId: string | null
    assignmentId: string | null
    userId: string
    versionSlot: number
    versionTitle: string | null
    version: number
    videoUrl: string
    fileKey: string | null
    duration: number | null
    thumbnailUrl: string | null
    status: $Enums.SubmissionStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: SubmissionCountAggregateOutputType | null
    _avg: SubmissionAvgAggregateOutputType | null
    _sum: SubmissionSumAggregateOutputType | null
    _min: SubmissionMinAggregateOutputType | null
    _max: SubmissionMaxAggregateOutputType | null
  }

  type GetSubmissionGroupByPayload<T extends SubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], SubmissionGroupByOutputType[P]>
        }
      >
    >


  export type SubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    assignmentId?: boolean
    userId?: boolean
    versionSlot?: boolean
    versionTitle?: boolean
    version?: boolean
    videoUrl?: boolean
    fileKey?: boolean
    duration?: boolean
    thumbnailUrl?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedbacks?: boolean | Submission$feedbacksArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    assignmentId?: boolean
    userId?: boolean
    versionSlot?: boolean
    versionTitle?: boolean
    version?: boolean
    videoUrl?: boolean
    fileKey?: boolean
    duration?: boolean
    thumbnailUrl?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    assignmentId?: boolean
    userId?: boolean
    versionSlot?: boolean
    versionTitle?: boolean
    version?: boolean
    videoUrl?: boolean
    fileKey?: boolean
    duration?: boolean
    thumbnailUrl?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["submission"]>

  export type SubmissionSelectScalar = {
    id?: boolean
    projectId?: boolean
    assignmentId?: boolean
    userId?: boolean
    versionSlot?: boolean
    versionTitle?: boolean
    version?: boolean
    videoUrl?: boolean
    fileKey?: boolean
    duration?: boolean
    thumbnailUrl?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "assignmentId" | "userId" | "versionSlot" | "versionTitle" | "version" | "videoUrl" | "fileKey" | "duration" | "thumbnailUrl" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["submission"]>
  export type SubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    feedbacks?: boolean | Submission$feedbacksArgs<ExtArgs>
    _count?: boolean | SubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | Submission$projectArgs<ExtArgs>
    assignment?: boolean | Submission$assignmentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Submission"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs> | null
      assignment: Prisma.$ProjectAssignmentPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
      feedbacks: Prisma.$FeedbackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string | null
      assignmentId: string | null
      userId: string
      versionSlot: number
      versionTitle: string | null
      version: number
      videoUrl: string
      fileKey: string | null
      duration: number | null
      thumbnailUrl: string | null
      status: $Enums.SubmissionStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["submission"]>
    composites: {}
  }

  type SubmissionGetPayload<S extends boolean | null | undefined | SubmissionDefaultArgs> = $Result.GetResult<Prisma.$SubmissionPayload, S>

  type SubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubmissionCountAggregateInputType | true
    }

  export interface SubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Submission'], meta: { name: 'Submission' } }
    /**
     * Find zero or one Submission that matches the filter.
     * @param {SubmissionFindUniqueArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubmissionFindUniqueArgs>(args: SelectSubset<T, SubmissionFindUniqueArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Submission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubmissionFindUniqueOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubmissionFindFirstArgs>(args?: SelectSubset<T, SubmissionFindFirstArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Submission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindFirstOrThrowArgs} args - Arguments to find a Submission
     * @example
     * // Get one Submission
     * const submission = await prisma.submission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Submissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Submissions
     * const submissions = await prisma.submission.findMany()
     * 
     * // Get first 10 Submissions
     * const submissions = await prisma.submission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const submissionWithIdOnly = await prisma.submission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubmissionFindManyArgs>(args?: SelectSubset<T, SubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Submission.
     * @param {SubmissionCreateArgs} args - Arguments to create a Submission.
     * @example
     * // Create one Submission
     * const Submission = await prisma.submission.create({
     *   data: {
     *     // ... data to create a Submission
     *   }
     * })
     * 
     */
    create<T extends SubmissionCreateArgs>(args: SelectSubset<T, SubmissionCreateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Submissions.
     * @param {SubmissionCreateManyArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubmissionCreateManyArgs>(args?: SelectSubset<T, SubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Submissions and returns the data saved in the database.
     * @param {SubmissionCreateManyAndReturnArgs} args - Arguments to create many Submissions.
     * @example
     * // Create many Submissions
     * const submission = await prisma.submission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Submission.
     * @param {SubmissionDeleteArgs} args - Arguments to delete one Submission.
     * @example
     * // Delete one Submission
     * const Submission = await prisma.submission.delete({
     *   where: {
     *     // ... filter to delete one Submission
     *   }
     * })
     * 
     */
    delete<T extends SubmissionDeleteArgs>(args: SelectSubset<T, SubmissionDeleteArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Submission.
     * @param {SubmissionUpdateArgs} args - Arguments to update one Submission.
     * @example
     * // Update one Submission
     * const submission = await prisma.submission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubmissionUpdateArgs>(args: SelectSubset<T, SubmissionUpdateArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Submissions.
     * @param {SubmissionDeleteManyArgs} args - Arguments to filter Submissions to delete.
     * @example
     * // Delete a few Submissions
     * const { count } = await prisma.submission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubmissionDeleteManyArgs>(args?: SelectSubset<T, SubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubmissionUpdateManyArgs>(args: SelectSubset<T, SubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Submissions and returns the data updated in the database.
     * @param {SubmissionUpdateManyAndReturnArgs} args - Arguments to update many Submissions.
     * @example
     * // Update many Submissions
     * const submission = await prisma.submission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Submissions and only return the `id`
     * const submissionWithIdOnly = await prisma.submission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Submission.
     * @param {SubmissionUpsertArgs} args - Arguments to update or create a Submission.
     * @example
     * // Update or create a Submission
     * const submission = await prisma.submission.upsert({
     *   create: {
     *     // ... data to create a Submission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Submission we want to update
     *   }
     * })
     */
    upsert<T extends SubmissionUpsertArgs>(args: SelectSubset<T, SubmissionUpsertArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Submissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionCountArgs} args - Arguments to filter Submissions to count.
     * @example
     * // Count the number of Submissions
     * const count = await prisma.submission.count({
     *   where: {
     *     // ... the filter for the Submissions we want to count
     *   }
     * })
    **/
    count<T extends SubmissionCountArgs>(
      args?: Subset<T, SubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubmissionAggregateArgs>(args: Subset<T, SubmissionAggregateArgs>): Prisma.PrismaPromise<GetSubmissionAggregateType<T>>

    /**
     * Group by Submission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubmissionGroupByArgs['orderBy'] }
        : { orderBy?: SubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Submission model
   */
  readonly fields: SubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Submission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends Submission$projectArgs<ExtArgs> = {}>(args?: Subset<T, Submission$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assignment<T extends Submission$assignmentArgs<ExtArgs> = {}>(args?: Subset<T, Submission$assignmentArgs<ExtArgs>>): Prisma__ProjectAssignmentClient<$Result.GetResult<Prisma.$ProjectAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feedbacks<T extends Submission$feedbacksArgs<ExtArgs> = {}>(args?: Subset<T, Submission$feedbacksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Submission model
   */
  interface SubmissionFieldRefs {
    readonly id: FieldRef<"Submission", 'String'>
    readonly projectId: FieldRef<"Submission", 'String'>
    readonly assignmentId: FieldRef<"Submission", 'String'>
    readonly userId: FieldRef<"Submission", 'String'>
    readonly versionSlot: FieldRef<"Submission", 'Int'>
    readonly versionTitle: FieldRef<"Submission", 'String'>
    readonly version: FieldRef<"Submission", 'Int'>
    readonly videoUrl: FieldRef<"Submission", 'String'>
    readonly fileKey: FieldRef<"Submission", 'String'>
    readonly duration: FieldRef<"Submission", 'Int'>
    readonly thumbnailUrl: FieldRef<"Submission", 'String'>
    readonly status: FieldRef<"Submission", 'SubmissionStatus'>
    readonly notes: FieldRef<"Submission", 'String'>
    readonly createdAt: FieldRef<"Submission", 'DateTime'>
    readonly updatedAt: FieldRef<"Submission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Submission findUnique
   */
  export type SubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findUniqueOrThrow
   */
  export type SubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission findFirst
   */
  export type SubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findFirstOrThrow
   */
  export type SubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submission to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Submissions.
     */
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission findMany
   */
  export type SubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter, which Submissions to fetch.
     */
    where?: SubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Submissions to fetch.
     */
    orderBy?: SubmissionOrderByWithRelationInput | SubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Submissions.
     */
    cursor?: SubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Submissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Submissions.
     */
    skip?: number
    distinct?: SubmissionScalarFieldEnum | SubmissionScalarFieldEnum[]
  }

  /**
   * Submission create
   */
  export type SubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Submission.
     */
    data: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
  }

  /**
   * Submission createMany
   */
  export type SubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Submission createManyAndReturn
   */
  export type SubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many Submissions.
     */
    data: SubmissionCreateManyInput | SubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission update
   */
  export type SubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Submission.
     */
    data: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
    /**
     * Choose, which Submission to update.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission updateMany
   */
  export type SubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
  }

  /**
   * Submission updateManyAndReturn
   */
  export type SubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * The data used to update Submissions.
     */
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyInput>
    /**
     * Filter which Submissions to update
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Submission upsert
   */
  export type SubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Submission to update in case it exists.
     */
    where: SubmissionWhereUniqueInput
    /**
     * In case the Submission found by the `where` argument doesn't exist, create a new Submission with this data.
     */
    create: XOR<SubmissionCreateInput, SubmissionUncheckedCreateInput>
    /**
     * In case the Submission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubmissionUpdateInput, SubmissionUncheckedUpdateInput>
  }

  /**
   * Submission delete
   */
  export type SubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
    /**
     * Filter which Submission to delete.
     */
    where: SubmissionWhereUniqueInput
  }

  /**
   * Submission deleteMany
   */
  export type SubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Submissions to delete
     */
    where?: SubmissionWhereInput
    /**
     * Limit how many Submissions to delete.
     */
    limit?: number
  }

  /**
   * Submission.project
   */
  export type Submission$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Submission.assignment
   */
  export type Submission$assignmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectAssignment
     */
    select?: ProjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectAssignment
     */
    omit?: ProjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectAssignmentInclude<ExtArgs> | null
    where?: ProjectAssignmentWhereInput
  }

  /**
   * Submission.feedbacks
   */
  export type Submission$feedbacksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    cursor?: FeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Submission without action
   */
  export type SubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Submission
     */
    select?: SubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Submission
     */
    omit?: SubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackAvgAggregateOutputType = {
    startTime: number | null
    endTime: number | null
    timestamp: number | null
  }

  export type FeedbackSumAggregateOutputType = {
    startTime: number | null
    endTime: number | null
    timestamp: number | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    submissionId: string | null
    userId: string | null
    startTime: number | null
    endTime: number | null
    timestamp: number | null
    feedbackType: string | null
    content: string | null
    priority: $Enums.FeedbackPriority | null
    status: $Enums.FeedbackStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    submissionId: string | null
    userId: string | null
    startTime: number | null
    endTime: number | null
    timestamp: number | null
    feedbackType: string | null
    content: string | null
    priority: $Enums.FeedbackPriority | null
    status: $Enums.FeedbackStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    submissionId: number
    userId: number
    startTime: number
    endTime: number
    timestamp: number
    feedbackType: number
    content: number
    priority: number
    status: number
    annotations: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeedbackAvgAggregateInputType = {
    startTime?: true
    endTime?: true
    timestamp?: true
  }

  export type FeedbackSumAggregateInputType = {
    startTime?: true
    endTime?: true
    timestamp?: true
  }

  export type FeedbackMinAggregateInputType = {
    id?: true
    submissionId?: true
    userId?: true
    startTime?: true
    endTime?: true
    timestamp?: true
    feedbackType?: true
    content?: true
    priority?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    submissionId?: true
    userId?: true
    startTime?: true
    endTime?: true
    timestamp?: true
    feedbackType?: true
    content?: true
    priority?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    submissionId?: true
    userId?: true
    startTime?: true
    endTime?: true
    timestamp?: true
    feedbackType?: true
    content?: true
    priority?: true
    status?: true
    annotations?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _avg?: FeedbackAvgAggregateInputType
    _sum?: FeedbackSumAggregateInputType
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    submissionId: string
    userId: string
    startTime: number | null
    endTime: number | null
    timestamp: number | null
    feedbackType: string | null
    content: string
    priority: $Enums.FeedbackPriority
    status: $Enums.FeedbackStatus
    annotations: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _avg: FeedbackAvgAggregateOutputType | null
    _sum: FeedbackSumAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    timestamp?: boolean
    feedbackType?: boolean
    content?: boolean
    priority?: boolean
    status?: boolean
    annotations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    timestamp?: boolean
    feedbackType?: boolean
    content?: boolean
    priority?: boolean
    status?: boolean
    annotations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionId?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    timestamp?: boolean
    feedbackType?: boolean
    content?: boolean
    priority?: boolean
    status?: boolean
    annotations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedback"]>

  export type FeedbackSelectScalar = {
    id?: boolean
    submissionId?: boolean
    userId?: boolean
    startTime?: boolean
    endTime?: boolean
    timestamp?: boolean
    feedbackType?: boolean
    content?: boolean
    priority?: boolean
    status?: boolean
    annotations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submissionId" | "userId" | "startTime" | "endTime" | "timestamp" | "feedbackType" | "content" | "priority" | "status" | "annotations" | "createdAt" | "updatedAt", ExtArgs["result"]["feedback"]>
  export type FeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submission?: boolean | SubmissionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {
      submission: Prisma.$SubmissionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      submissionId: string
      userId: string
      startTime: number | null
      endTime: number | null
      timestamp: number | null
      feedbackType: string | null
      content: string
      priority: $Enums.FeedbackPriority
      status: $Enums.FeedbackStatus
      annotations: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Feedbacks and returns the data saved in the database.
     * @param {FeedbackCreateManyAndReturnArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks and returns the data updated in the database.
     * @param {FeedbackUpdateManyAndReturnArgs} args - Arguments to update many Feedbacks.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Feedbacks and only return the `id`
     * const feedbackWithIdOnly = await prisma.feedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submission<T extends SubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubmissionDefaultArgs<ExtArgs>>): Prisma__SubmissionClient<$Result.GetResult<Prisma.$SubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly submissionId: FieldRef<"Feedback", 'String'>
    readonly userId: FieldRef<"Feedback", 'String'>
    readonly startTime: FieldRef<"Feedback", 'Float'>
    readonly endTime: FieldRef<"Feedback", 'Float'>
    readonly timestamp: FieldRef<"Feedback", 'Float'>
    readonly feedbackType: FieldRef<"Feedback", 'String'>
    readonly content: FieldRef<"Feedback", 'String'>
    readonly priority: FieldRef<"Feedback", 'FeedbackPriority'>
    readonly status: FieldRef<"Feedback", 'FeedbackStatus'>
    readonly annotations: FieldRef<"Feedback", 'Json'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
    readonly updatedAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback createManyAndReturn
   */
  export type FeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback updateManyAndReturn
   */
  export type FeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackInclude<ExtArgs> | null
  }


  /**
   * Model Settlement
   */

  export type AggregateSettlement = {
    _count: SettlementCountAggregateOutputType | null
    _avg: SettlementAvgAggregateOutputType | null
    _sum: SettlementSumAggregateOutputType | null
    _min: SettlementMinAggregateOutputType | null
    _max: SettlementMaxAggregateOutputType | null
  }

  export type SettlementAvgAggregateOutputType = {
    amount: Decimal | null
    quarterYear: number | null
    quarterNumber: number | null
  }

  export type SettlementSumAggregateOutputType = {
    amount: Decimal | null
    quarterYear: number | null
    quarterNumber: number | null
  }

  export type SettlementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    amount: Decimal | null
    type: $Enums.SettlementType | null
    settlementRound: $Enums.SettlementRound | null
    status: $Enums.SettlementStatus | null
    description: string | null
    quarterYear: number | null
    quarterNumber: number | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettlementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    amount: Decimal | null
    type: $Enums.SettlementType | null
    settlementRound: $Enums.SettlementRound | null
    status: $Enums.SettlementStatus | null
    description: string | null
    quarterYear: number | null
    quarterNumber: number | null
    processedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettlementCountAggregateOutputType = {
    id: number
    userId: number
    submissionId: number
    amount: number
    type: number
    settlementRound: number
    status: number
    description: number
    quarterYear: number
    quarterNumber: number
    processedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettlementAvgAggregateInputType = {
    amount?: true
    quarterYear?: true
    quarterNumber?: true
  }

  export type SettlementSumAggregateInputType = {
    amount?: true
    quarterYear?: true
    quarterNumber?: true
  }

  export type SettlementMinAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    amount?: true
    type?: true
    settlementRound?: true
    status?: true
    description?: true
    quarterYear?: true
    quarterNumber?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettlementMaxAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    amount?: true
    type?: true
    settlementRound?: true
    status?: true
    description?: true
    quarterYear?: true
    quarterNumber?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettlementCountAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    amount?: true
    type?: true
    settlementRound?: true
    status?: true
    description?: true
    quarterYear?: true
    quarterNumber?: true
    processedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settlement to aggregate.
     */
    where?: SettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settlements to fetch.
     */
    orderBy?: SettlementOrderByWithRelationInput | SettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settlements
    **/
    _count?: true | SettlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettlementMaxAggregateInputType
  }

  export type GetSettlementAggregateType<T extends SettlementAggregateArgs> = {
        [P in keyof T & keyof AggregateSettlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettlement[P]>
      : GetScalarType<T[P], AggregateSettlement[P]>
  }




  export type SettlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettlementWhereInput
    orderBy?: SettlementOrderByWithAggregationInput | SettlementOrderByWithAggregationInput[]
    by: SettlementScalarFieldEnum[] | SettlementScalarFieldEnum
    having?: SettlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettlementCountAggregateInputType | true
    _avg?: SettlementAvgAggregateInputType
    _sum?: SettlementSumAggregateInputType
    _min?: SettlementMinAggregateInputType
    _max?: SettlementMaxAggregateInputType
  }

  export type SettlementGroupByOutputType = {
    id: string
    userId: string
    submissionId: string | null
    amount: Decimal
    type: $Enums.SettlementType
    settlementRound: $Enums.SettlementRound | null
    status: $Enums.SettlementStatus
    description: string | null
    quarterYear: number | null
    quarterNumber: number | null
    processedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SettlementCountAggregateOutputType | null
    _avg: SettlementAvgAggregateOutputType | null
    _sum: SettlementSumAggregateOutputType | null
    _min: SettlementMinAggregateOutputType | null
    _max: SettlementMaxAggregateOutputType | null
  }

  type GetSettlementGroupByPayload<T extends SettlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettlementGroupByOutputType[P]>
            : GetScalarType<T[P], SettlementGroupByOutputType[P]>
        }
      >
    >


  export type SettlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    amount?: boolean
    type?: boolean
    settlementRound?: boolean
    status?: boolean
    description?: boolean
    quarterYear?: boolean
    quarterNumber?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settlement"]>

  export type SettlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    amount?: boolean
    type?: boolean
    settlementRound?: boolean
    status?: boolean
    description?: boolean
    quarterYear?: boolean
    quarterNumber?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settlement"]>

  export type SettlementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    amount?: boolean
    type?: boolean
    settlementRound?: boolean
    status?: boolean
    description?: boolean
    quarterYear?: boolean
    quarterNumber?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settlement"]>

  export type SettlementSelectScalar = {
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    amount?: boolean
    type?: boolean
    settlementRound?: boolean
    status?: boolean
    description?: boolean
    quarterYear?: boolean
    quarterNumber?: boolean
    processedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettlementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "submissionId" | "amount" | "type" | "settlementRound" | "status" | "description" | "quarterYear" | "quarterNumber" | "processedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["settlement"]>
  export type SettlementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SettlementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SettlementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SettlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settlement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      submissionId: string | null
      amount: Prisma.Decimal
      type: $Enums.SettlementType
      settlementRound: $Enums.SettlementRound | null
      status: $Enums.SettlementStatus
      description: string | null
      quarterYear: number | null
      quarterNumber: number | null
      processedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["settlement"]>
    composites: {}
  }

  type SettlementGetPayload<S extends boolean | null | undefined | SettlementDefaultArgs> = $Result.GetResult<Prisma.$SettlementPayload, S>

  type SettlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettlementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettlementCountAggregateInputType | true
    }

  export interface SettlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settlement'], meta: { name: 'Settlement' } }
    /**
     * Find zero or one Settlement that matches the filter.
     * @param {SettlementFindUniqueArgs} args - Arguments to find a Settlement
     * @example
     * // Get one Settlement
     * const settlement = await prisma.settlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettlementFindUniqueArgs>(args: SelectSubset<T, SettlementFindUniqueArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settlement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettlementFindUniqueOrThrowArgs} args - Arguments to find a Settlement
     * @example
     * // Get one Settlement
     * const settlement = await prisma.settlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettlementFindUniqueOrThrowArgs>(args: SelectSubset<T, SettlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementFindFirstArgs} args - Arguments to find a Settlement
     * @example
     * // Get one Settlement
     * const settlement = await prisma.settlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettlementFindFirstArgs>(args?: SelectSubset<T, SettlementFindFirstArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementFindFirstOrThrowArgs} args - Arguments to find a Settlement
     * @example
     * // Get one Settlement
     * const settlement = await prisma.settlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettlementFindFirstOrThrowArgs>(args?: SelectSubset<T, SettlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settlements
     * const settlements = await prisma.settlement.findMany()
     * 
     * // Get first 10 Settlements
     * const settlements = await prisma.settlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settlementWithIdOnly = await prisma.settlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettlementFindManyArgs>(args?: SelectSubset<T, SettlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settlement.
     * @param {SettlementCreateArgs} args - Arguments to create a Settlement.
     * @example
     * // Create one Settlement
     * const Settlement = await prisma.settlement.create({
     *   data: {
     *     // ... data to create a Settlement
     *   }
     * })
     * 
     */
    create<T extends SettlementCreateArgs>(args: SelectSubset<T, SettlementCreateArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settlements.
     * @param {SettlementCreateManyArgs} args - Arguments to create many Settlements.
     * @example
     * // Create many Settlements
     * const settlement = await prisma.settlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettlementCreateManyArgs>(args?: SelectSubset<T, SettlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settlements and returns the data saved in the database.
     * @param {SettlementCreateManyAndReturnArgs} args - Arguments to create many Settlements.
     * @example
     * // Create many Settlements
     * const settlement = await prisma.settlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settlements and only return the `id`
     * const settlementWithIdOnly = await prisma.settlement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettlementCreateManyAndReturnArgs>(args?: SelectSubset<T, SettlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Settlement.
     * @param {SettlementDeleteArgs} args - Arguments to delete one Settlement.
     * @example
     * // Delete one Settlement
     * const Settlement = await prisma.settlement.delete({
     *   where: {
     *     // ... filter to delete one Settlement
     *   }
     * })
     * 
     */
    delete<T extends SettlementDeleteArgs>(args: SelectSubset<T, SettlementDeleteArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settlement.
     * @param {SettlementUpdateArgs} args - Arguments to update one Settlement.
     * @example
     * // Update one Settlement
     * const settlement = await prisma.settlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettlementUpdateArgs>(args: SelectSubset<T, SettlementUpdateArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settlements.
     * @param {SettlementDeleteManyArgs} args - Arguments to filter Settlements to delete.
     * @example
     * // Delete a few Settlements
     * const { count } = await prisma.settlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettlementDeleteManyArgs>(args?: SelectSubset<T, SettlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settlements
     * const settlement = await prisma.settlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettlementUpdateManyArgs>(args: SelectSubset<T, SettlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settlements and returns the data updated in the database.
     * @param {SettlementUpdateManyAndReturnArgs} args - Arguments to update many Settlements.
     * @example
     * // Update many Settlements
     * const settlement = await prisma.settlement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settlements and only return the `id`
     * const settlementWithIdOnly = await prisma.settlement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettlementUpdateManyAndReturnArgs>(args: SelectSubset<T, SettlementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Settlement.
     * @param {SettlementUpsertArgs} args - Arguments to update or create a Settlement.
     * @example
     * // Update or create a Settlement
     * const settlement = await prisma.settlement.upsert({
     *   create: {
     *     // ... data to create a Settlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settlement we want to update
     *   }
     * })
     */
    upsert<T extends SettlementUpsertArgs>(args: SelectSubset<T, SettlementUpsertArgs<ExtArgs>>): Prisma__SettlementClient<$Result.GetResult<Prisma.$SettlementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementCountArgs} args - Arguments to filter Settlements to count.
     * @example
     * // Count the number of Settlements
     * const count = await prisma.settlement.count({
     *   where: {
     *     // ... the filter for the Settlements we want to count
     *   }
     * })
    **/
    count<T extends SettlementCountArgs>(
      args?: Subset<T, SettlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettlementAggregateArgs>(args: Subset<T, SettlementAggregateArgs>): Prisma.PrismaPromise<GetSettlementAggregateType<T>>

    /**
     * Group by Settlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettlementGroupByArgs['orderBy'] }
        : { orderBy?: SettlementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settlement model
   */
  readonly fields: SettlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settlement model
   */
  interface SettlementFieldRefs {
    readonly id: FieldRef<"Settlement", 'String'>
    readonly userId: FieldRef<"Settlement", 'String'>
    readonly submissionId: FieldRef<"Settlement", 'String'>
    readonly amount: FieldRef<"Settlement", 'Decimal'>
    readonly type: FieldRef<"Settlement", 'SettlementType'>
    readonly settlementRound: FieldRef<"Settlement", 'SettlementRound'>
    readonly status: FieldRef<"Settlement", 'SettlementStatus'>
    readonly description: FieldRef<"Settlement", 'String'>
    readonly quarterYear: FieldRef<"Settlement", 'Int'>
    readonly quarterNumber: FieldRef<"Settlement", 'Int'>
    readonly processedAt: FieldRef<"Settlement", 'DateTime'>
    readonly createdAt: FieldRef<"Settlement", 'DateTime'>
    readonly updatedAt: FieldRef<"Settlement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settlement findUnique
   */
  export type SettlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter, which Settlement to fetch.
     */
    where: SettlementWhereUniqueInput
  }

  /**
   * Settlement findUniqueOrThrow
   */
  export type SettlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter, which Settlement to fetch.
     */
    where: SettlementWhereUniqueInput
  }

  /**
   * Settlement findFirst
   */
  export type SettlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter, which Settlement to fetch.
     */
    where?: SettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settlements to fetch.
     */
    orderBy?: SettlementOrderByWithRelationInput | SettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settlements.
     */
    cursor?: SettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settlements.
     */
    distinct?: SettlementScalarFieldEnum | SettlementScalarFieldEnum[]
  }

  /**
   * Settlement findFirstOrThrow
   */
  export type SettlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter, which Settlement to fetch.
     */
    where?: SettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settlements to fetch.
     */
    orderBy?: SettlementOrderByWithRelationInput | SettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settlements.
     */
    cursor?: SettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settlements.
     */
    distinct?: SettlementScalarFieldEnum | SettlementScalarFieldEnum[]
  }

  /**
   * Settlement findMany
   */
  export type SettlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter, which Settlements to fetch.
     */
    where?: SettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settlements to fetch.
     */
    orderBy?: SettlementOrderByWithRelationInput | SettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settlements.
     */
    cursor?: SettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settlements.
     */
    skip?: number
    distinct?: SettlementScalarFieldEnum | SettlementScalarFieldEnum[]
  }

  /**
   * Settlement create
   */
  export type SettlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * The data needed to create a Settlement.
     */
    data: XOR<SettlementCreateInput, SettlementUncheckedCreateInput>
  }

  /**
   * Settlement createMany
   */
  export type SettlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settlements.
     */
    data: SettlementCreateManyInput | SettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settlement createManyAndReturn
   */
  export type SettlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * The data used to create many Settlements.
     */
    data: SettlementCreateManyInput | SettlementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Settlement update
   */
  export type SettlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * The data needed to update a Settlement.
     */
    data: XOR<SettlementUpdateInput, SettlementUncheckedUpdateInput>
    /**
     * Choose, which Settlement to update.
     */
    where: SettlementWhereUniqueInput
  }

  /**
   * Settlement updateMany
   */
  export type SettlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settlements.
     */
    data: XOR<SettlementUpdateManyMutationInput, SettlementUncheckedUpdateManyInput>
    /**
     * Filter which Settlements to update
     */
    where?: SettlementWhereInput
    /**
     * Limit how many Settlements to update.
     */
    limit?: number
  }

  /**
   * Settlement updateManyAndReturn
   */
  export type SettlementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * The data used to update Settlements.
     */
    data: XOR<SettlementUpdateManyMutationInput, SettlementUncheckedUpdateManyInput>
    /**
     * Filter which Settlements to update
     */
    where?: SettlementWhereInput
    /**
     * Limit how many Settlements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Settlement upsert
   */
  export type SettlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * The filter to search for the Settlement to update in case it exists.
     */
    where: SettlementWhereUniqueInput
    /**
     * In case the Settlement found by the `where` argument doesn't exist, create a new Settlement with this data.
     */
    create: XOR<SettlementCreateInput, SettlementUncheckedCreateInput>
    /**
     * In case the Settlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettlementUpdateInput, SettlementUncheckedUpdateInput>
  }

  /**
   * Settlement delete
   */
  export type SettlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
    /**
     * Filter which Settlement to delete.
     */
    where: SettlementWhereUniqueInput
  }

  /**
   * Settlement deleteMany
   */
  export type SettlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settlements to delete
     */
    where?: SettlementWhereInput
    /**
     * Limit how many Settlements to delete.
     */
    limit?: number
  }

  /**
   * Settlement without action
   */
  export type SettlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settlement
     */
    select?: SettlementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settlement
     */
    omit?: SettlementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SettlementInclude<ExtArgs> | null
  }


  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  export type CampaignAvgAggregateOutputType = {
    budget: Decimal | null
    views: number | null
    clicks: number | null
    conversions: number | null
  }

  export type CampaignSumAggregateOutputType = {
    budget: Decimal | null
    views: number | null
    clicks: number | null
    conversions: number | null
  }

  export type CampaignMinAggregateOutputType = {
    id: string | null
    name: string | null
    submissionId: string | null
    budget: Decimal | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.CampaignStatus | null
    views: number | null
    clicks: number | null
    conversions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignMaxAggregateOutputType = {
    id: string | null
    name: string | null
    submissionId: string | null
    budget: Decimal | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.CampaignStatus | null
    views: number | null
    clicks: number | null
    conversions: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CampaignCountAggregateOutputType = {
    id: number
    name: number
    submissionId: number
    platform: number
    budget: number
    startDate: number
    endDate: number
    targetAudience: number
    status: number
    views: number
    clicks: number
    conversions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CampaignAvgAggregateInputType = {
    budget?: true
    views?: true
    clicks?: true
    conversions?: true
  }

  export type CampaignSumAggregateInputType = {
    budget?: true
    views?: true
    clicks?: true
    conversions?: true
  }

  export type CampaignMinAggregateInputType = {
    id?: true
    name?: true
    submissionId?: true
    budget?: true
    startDate?: true
    endDate?: true
    status?: true
    views?: true
    clicks?: true
    conversions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignMaxAggregateInputType = {
    id?: true
    name?: true
    submissionId?: true
    budget?: true
    startDate?: true
    endDate?: true
    status?: true
    views?: true
    clicks?: true
    conversions?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CampaignCountAggregateInputType = {
    id?: true
    name?: true
    submissionId?: true
    platform?: true
    budget?: true
    startDate?: true
    endDate?: true
    targetAudience?: true
    status?: true
    views?: true
    clicks?: true
    conversions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CampaignAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Campaigns
    **/
    _count?: true | CampaignCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CampaignAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CampaignSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CampaignMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CampaignMaxAggregateInputType
  }

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
        [P in keyof T & keyof AggregateCampaign]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>
  }




  export type CampaignGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CampaignWhereInput
    orderBy?: CampaignOrderByWithAggregationInput | CampaignOrderByWithAggregationInput[]
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum
    having?: CampaignScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CampaignCountAggregateInputType | true
    _avg?: CampaignAvgAggregateInputType
    _sum?: CampaignSumAggregateInputType
    _min?: CampaignMinAggregateInputType
    _max?: CampaignMaxAggregateInputType
  }

  export type CampaignGroupByOutputType = {
    id: string
    name: string
    submissionId: string | null
    platform: string[]
    budget: Decimal
    startDate: Date
    endDate: Date
    targetAudience: JsonValue | null
    status: $Enums.CampaignStatus
    views: number
    clicks: number
    conversions: number
    createdAt: Date
    updatedAt: Date
    _count: CampaignCountAggregateOutputType | null
    _avg: CampaignAvgAggregateOutputType | null
    _sum: CampaignSumAggregateOutputType | null
    _min: CampaignMinAggregateOutputType | null
    _max: CampaignMaxAggregateOutputType | null
  }

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CampaignGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CampaignGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>
        }
      >
    >


  export type CampaignSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    submissionId?: boolean
    platform?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    targetAudience?: boolean
    status?: boolean
    views?: boolean
    clicks?: boolean
    conversions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    submissionId?: boolean
    platform?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    targetAudience?: boolean
    status?: boolean
    views?: boolean
    clicks?: boolean
    conversions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    submissionId?: boolean
    platform?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    targetAudience?: boolean
    status?: boolean
    views?: boolean
    clicks?: boolean
    conversions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["campaign"]>

  export type CampaignSelectScalar = {
    id?: boolean
    name?: boolean
    submissionId?: boolean
    platform?: boolean
    budget?: boolean
    startDate?: boolean
    endDate?: boolean
    targetAudience?: boolean
    status?: boolean
    views?: boolean
    clicks?: boolean
    conversions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CampaignOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "submissionId" | "platform" | "budget" | "startDate" | "endDate" | "targetAudience" | "status" | "views" | "clicks" | "conversions" | "createdAt" | "updatedAt", ExtArgs["result"]["campaign"]>

  export type $CampaignPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Campaign"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      submissionId: string | null
      platform: string[]
      budget: Prisma.Decimal
      startDate: Date
      endDate: Date
      targetAudience: Prisma.JsonValue | null
      status: $Enums.CampaignStatus
      views: number
      clicks: number
      conversions: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["campaign"]>
    composites: {}
  }

  type CampaignGetPayload<S extends boolean | null | undefined | CampaignDefaultArgs> = $Result.GetResult<Prisma.$CampaignPayload, S>

  type CampaignCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CampaignFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CampaignCountAggregateInputType | true
    }

  export interface CampaignDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Campaign'], meta: { name: 'Campaign' } }
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     * 
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CampaignFindManyArgs>(args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     * 
     */
    create<T extends CampaignCreateArgs>(args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CampaignCreateManyArgs>(args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     * 
     */
    delete<T extends CampaignDeleteArgs>(args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CampaignUpdateArgs>(args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CampaignDeleteManyArgs>(args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CampaignUpdateManyArgs>(args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>): Prisma__CampaignClient<$Result.GetResult<Prisma.$CampaignPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
    **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CampaignCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CampaignAggregateArgs>(args: Subset<T, CampaignAggregateArgs>): Prisma.PrismaPromise<GetCampaignAggregateType<T>>

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs['orderBy'] }
        : { orderBy?: CampaignGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCampaignGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Campaign model
   */
  readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", 'String'>
    readonly name: FieldRef<"Campaign", 'String'>
    readonly submissionId: FieldRef<"Campaign", 'String'>
    readonly platform: FieldRef<"Campaign", 'String[]'>
    readonly budget: FieldRef<"Campaign", 'Decimal'>
    readonly startDate: FieldRef<"Campaign", 'DateTime'>
    readonly endDate: FieldRef<"Campaign", 'DateTime'>
    readonly targetAudience: FieldRef<"Campaign", 'Json'>
    readonly status: FieldRef<"Campaign", 'CampaignStatus'>
    readonly views: FieldRef<"Campaign", 'Int'>
    readonly clicks: FieldRef<"Campaign", 'Int'>
    readonly conversions: FieldRef<"Campaign", 'Int'>
    readonly createdAt: FieldRef<"Campaign", 'DateTime'>
    readonly updatedAt: FieldRef<"Campaign", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Campaigns to fetch.
     */
    orderBy?: CampaignOrderByWithRelationInput | CampaignOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Campaigns.
     */
    skip?: number
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[]
  }

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
  }

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The data used to update Campaigns.
     */
    data: XOR<CampaignUpdateManyMutationInput, CampaignUncheckedUpdateManyInput>
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number
  }

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>
  }

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput
  }

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number
  }

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    phone: 'phone',
    role: 'role',
    profileImage: 'profileImage',
    bio: 'bio',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectRequestScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    categories: 'categories',
    deadline: 'deadline',
    assignmentType: 'assignmentType',
    maxAssignees: 'maxAssignees',
    currentAssignees: 'currentAssignees',
    status: 'status',
    estimatedBudget: 'estimatedBudget',
    requirements: 'requirements',
    referenceUrls: 'referenceUrls',
    targetCounselorId: 'targetCounselorId',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectRequestScalarFieldEnum = (typeof ProjectRequestScalarFieldEnum)[keyof typeof ProjectRequestScalarFieldEnum]


  export const ProjectAssignmentScalarFieldEnum: {
    id: 'id',
    requestId: 'requestId',
    freelancerId: 'freelancerId',
    acceptedAt: 'acceptedAt',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectAssignmentScalarFieldEnum = (typeof ProjectAssignmentScalarFieldEnum)[keyof typeof ProjectAssignmentScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    deadline: 'deadline',
    budget: 'budget',
    ownerId: 'ownerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SubmissionScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    assignmentId: 'assignmentId',
    userId: 'userId',
    versionSlot: 'versionSlot',
    versionTitle: 'versionTitle',
    version: 'version',
    videoUrl: 'videoUrl',
    fileKey: 'fileKey',
    duration: 'duration',
    thumbnailUrl: 'thumbnailUrl',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubmissionScalarFieldEnum = (typeof SubmissionScalarFieldEnum)[keyof typeof SubmissionScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    submissionId: 'submissionId',
    userId: 'userId',
    startTime: 'startTime',
    endTime: 'endTime',
    timestamp: 'timestamp',
    feedbackType: 'feedbackType',
    content: 'content',
    priority: 'priority',
    status: 'status',
    annotations: 'annotations',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const SettlementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    submissionId: 'submissionId',
    amount: 'amount',
    type: 'type',
    settlementRound: 'settlementRound',
    status: 'status',
    description: 'description',
    quarterYear: 'quarterYear',
    quarterNumber: 'quarterNumber',
    processedAt: 'processedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettlementScalarFieldEnum = (typeof SettlementScalarFieldEnum)[keyof typeof SettlementScalarFieldEnum]


  export const CampaignScalarFieldEnum: {
    id: 'id',
    name: 'name',
    submissionId: 'submissionId',
    platform: 'platform',
    budget: 'budget',
    startDate: 'startDate',
    endDate: 'endDate',
    targetAudience: 'targetAudience',
    status: 'status',
    views: 'views',
    clicks: 'clicks',
    conversions: 'conversions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CampaignScalarFieldEnum = (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AssignmentType'
   */
  export type EnumAssignmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentType'>
    


  /**
   * Reference to a field of type 'AssignmentType[]'
   */
  export type ListEnumAssignmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'AssignmentStatus'
   */
  export type EnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus'>
    


  /**
   * Reference to a field of type 'AssignmentStatus[]'
   */
  export type ListEnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus[]'>
    


  /**
   * Reference to a field of type 'ProjectStatus'
   */
  export type EnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus'>
    


  /**
   * Reference to a field of type 'ProjectStatus[]'
   */
  export type ListEnumProjectStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectStatus[]'>
    


  /**
   * Reference to a field of type 'SubmissionStatus'
   */
  export type EnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus'>
    


  /**
   * Reference to a field of type 'SubmissionStatus[]'
   */
  export type ListEnumSubmissionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubmissionStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'FeedbackPriority'
   */
  export type EnumFeedbackPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackPriority'>
    


  /**
   * Reference to a field of type 'FeedbackPriority[]'
   */
  export type ListEnumFeedbackPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackPriority[]'>
    


  /**
   * Reference to a field of type 'FeedbackStatus'
   */
  export type EnumFeedbackStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackStatus'>
    


  /**
   * Reference to a field of type 'FeedbackStatus[]'
   */
  export type ListEnumFeedbackStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeedbackStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SettlementType'
   */
  export type EnumSettlementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementType'>
    


  /**
   * Reference to a field of type 'SettlementType[]'
   */
  export type ListEnumSettlementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementType[]'>
    


  /**
   * Reference to a field of type 'SettlementRound'
   */
  export type EnumSettlementRoundFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementRound'>
    


  /**
   * Reference to a field of type 'SettlementRound[]'
   */
  export type ListEnumSettlementRoundFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementRound[]'>
    


  /**
   * Reference to a field of type 'SettlementStatus'
   */
  export type EnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus'>
    


  /**
   * Reference to a field of type 'SettlementStatus[]'
   */
  export type ListEnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus[]'>
    


  /**
   * Reference to a field of type 'CampaignStatus'
   */
  export type EnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus'>
    


  /**
   * Reference to a field of type 'CampaignStatus[]'
   */
  export type ListEnumCampaignStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CampaignStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    profileImage?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedProjects?: ProjectListRelationFilter
    assignedProjects?: ProjectListRelationFilter
    submissions?: SubmissionListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    settlements?: SettlementListRelationFilter
    createdRequests?: ProjectRequestListRelationFilter
    assignments?: ProjectAssignmentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownedProjects?: ProjectOrderByRelationAggregateInput
    assignedProjects?: ProjectOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
    settlements?: SettlementOrderByRelationAggregateInput
    createdRequests?: ProjectRequestOrderByRelationAggregateInput
    assignments?: ProjectAssignmentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    profileImage?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    ownedProjects?: ProjectListRelationFilter
    assignedProjects?: ProjectListRelationFilter
    submissions?: SubmissionListRelationFilter
    feedbacks?: FeedbackListRelationFilter
    settlements?: SettlementListRelationFilter
    createdRequests?: ProjectRequestListRelationFilter
    assignments?: ProjectAssignmentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectRequestWhereInput = {
    AND?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    OR?: ProjectRequestWhereInput[]
    NOT?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    id?: StringFilter<"ProjectRequest"> | string
    title?: StringFilter<"ProjectRequest"> | string
    description?: StringNullableFilter<"ProjectRequest"> | string | null
    categories?: StringNullableListFilter<"ProjectRequest">
    deadline?: DateTimeFilter<"ProjectRequest"> | Date | string
    assignmentType?: EnumAssignmentTypeFilter<"ProjectRequest"> | $Enums.AssignmentType
    maxAssignees?: IntFilter<"ProjectRequest"> | number
    currentAssignees?: IntFilter<"ProjectRequest"> | number
    status?: EnumRequestStatusFilter<"ProjectRequest"> | $Enums.RequestStatus
    estimatedBudget?: DecimalNullableFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string | null
    requirements?: StringNullableFilter<"ProjectRequest"> | string | null
    referenceUrls?: StringNullableListFilter<"ProjectRequest">
    targetCounselorId?: StringNullableFilter<"ProjectRequest"> | string | null
    createdById?: StringFilter<"ProjectRequest"> | string
    createdAt?: DateTimeFilter<"ProjectRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectRequest"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignments?: ProjectAssignmentListRelationFilter
  }

  export type ProjectRequestOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    categories?: SortOrder
    deadline?: SortOrder
    assignmentType?: SortOrder
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    status?: SortOrder
    estimatedBudget?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    referenceUrls?: SortOrder
    targetCounselorId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    assignments?: ProjectAssignmentOrderByRelationAggregateInput
  }

  export type ProjectRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    OR?: ProjectRequestWhereInput[]
    NOT?: ProjectRequestWhereInput | ProjectRequestWhereInput[]
    title?: StringFilter<"ProjectRequest"> | string
    description?: StringNullableFilter<"ProjectRequest"> | string | null
    categories?: StringNullableListFilter<"ProjectRequest">
    deadline?: DateTimeFilter<"ProjectRequest"> | Date | string
    assignmentType?: EnumAssignmentTypeFilter<"ProjectRequest"> | $Enums.AssignmentType
    maxAssignees?: IntFilter<"ProjectRequest"> | number
    currentAssignees?: IntFilter<"ProjectRequest"> | number
    status?: EnumRequestStatusFilter<"ProjectRequest"> | $Enums.RequestStatus
    estimatedBudget?: DecimalNullableFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string | null
    requirements?: StringNullableFilter<"ProjectRequest"> | string | null
    referenceUrls?: StringNullableListFilter<"ProjectRequest">
    targetCounselorId?: StringNullableFilter<"ProjectRequest"> | string | null
    createdById?: StringFilter<"ProjectRequest"> | string
    createdAt?: DateTimeFilter<"ProjectRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectRequest"> | Date | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignments?: ProjectAssignmentListRelationFilter
  }, "id">

  export type ProjectRequestOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    categories?: SortOrder
    deadline?: SortOrder
    assignmentType?: SortOrder
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    status?: SortOrder
    estimatedBudget?: SortOrderInput | SortOrder
    requirements?: SortOrderInput | SortOrder
    referenceUrls?: SortOrder
    targetCounselorId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectRequestCountOrderByAggregateInput
    _avg?: ProjectRequestAvgOrderByAggregateInput
    _max?: ProjectRequestMaxOrderByAggregateInput
    _min?: ProjectRequestMinOrderByAggregateInput
    _sum?: ProjectRequestSumOrderByAggregateInput
  }

  export type ProjectRequestScalarWhereWithAggregatesInput = {
    AND?: ProjectRequestScalarWhereWithAggregatesInput | ProjectRequestScalarWhereWithAggregatesInput[]
    OR?: ProjectRequestScalarWhereWithAggregatesInput[]
    NOT?: ProjectRequestScalarWhereWithAggregatesInput | ProjectRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectRequest"> | string
    title?: StringWithAggregatesFilter<"ProjectRequest"> | string
    description?: StringNullableWithAggregatesFilter<"ProjectRequest"> | string | null
    categories?: StringNullableListFilter<"ProjectRequest">
    deadline?: DateTimeWithAggregatesFilter<"ProjectRequest"> | Date | string
    assignmentType?: EnumAssignmentTypeWithAggregatesFilter<"ProjectRequest"> | $Enums.AssignmentType
    maxAssignees?: IntWithAggregatesFilter<"ProjectRequest"> | number
    currentAssignees?: IntWithAggregatesFilter<"ProjectRequest"> | number
    status?: EnumRequestStatusWithAggregatesFilter<"ProjectRequest"> | $Enums.RequestStatus
    estimatedBudget?: DecimalNullableWithAggregatesFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string | null
    requirements?: StringNullableWithAggregatesFilter<"ProjectRequest"> | string | null
    referenceUrls?: StringNullableListFilter<"ProjectRequest">
    targetCounselorId?: StringNullableWithAggregatesFilter<"ProjectRequest"> | string | null
    createdById?: StringWithAggregatesFilter<"ProjectRequest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProjectRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectRequest"> | Date | string
  }

  export type ProjectAssignmentWhereInput = {
    AND?: ProjectAssignmentWhereInput | ProjectAssignmentWhereInput[]
    OR?: ProjectAssignmentWhereInput[]
    NOT?: ProjectAssignmentWhereInput | ProjectAssignmentWhereInput[]
    id?: StringFilter<"ProjectAssignment"> | string
    requestId?: StringFilter<"ProjectAssignment"> | string
    freelancerId?: StringFilter<"ProjectAssignment"> | string
    acceptedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    status?: EnumAssignmentStatusFilter<"ProjectAssignment"> | $Enums.AssignmentStatus
    createdAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    request?: XOR<ProjectRequestScalarRelationFilter, ProjectRequestWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
    submissions?: SubmissionListRelationFilter
  }

  export type ProjectAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    freelancerId?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    request?: ProjectRequestOrderByWithRelationInput
    freelancer?: UserOrderByWithRelationInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type ProjectAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requestId_freelancerId?: ProjectAssignmentRequestIdFreelancerIdCompoundUniqueInput
    AND?: ProjectAssignmentWhereInput | ProjectAssignmentWhereInput[]
    OR?: ProjectAssignmentWhereInput[]
    NOT?: ProjectAssignmentWhereInput | ProjectAssignmentWhereInput[]
    requestId?: StringFilter<"ProjectAssignment"> | string
    freelancerId?: StringFilter<"ProjectAssignment"> | string
    acceptedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    status?: EnumAssignmentStatusFilter<"ProjectAssignment"> | $Enums.AssignmentStatus
    createdAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    request?: XOR<ProjectRequestScalarRelationFilter, ProjectRequestWhereInput>
    freelancer?: XOR<UserScalarRelationFilter, UserWhereInput>
    submissions?: SubmissionListRelationFilter
  }, "id" | "requestId_freelancerId">

  export type ProjectAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    freelancerId?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectAssignmentCountOrderByAggregateInput
    _max?: ProjectAssignmentMaxOrderByAggregateInput
    _min?: ProjectAssignmentMinOrderByAggregateInput
  }

  export type ProjectAssignmentScalarWhereWithAggregatesInput = {
    AND?: ProjectAssignmentScalarWhereWithAggregatesInput | ProjectAssignmentScalarWhereWithAggregatesInput[]
    OR?: ProjectAssignmentScalarWhereWithAggregatesInput[]
    NOT?: ProjectAssignmentScalarWhereWithAggregatesInput | ProjectAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectAssignment"> | string
    requestId?: StringWithAggregatesFilter<"ProjectAssignment"> | string
    freelancerId?: StringWithAggregatesFilter<"ProjectAssignment"> | string
    acceptedAt?: DateTimeWithAggregatesFilter<"ProjectAssignment"> | Date | string
    status?: EnumAssignmentStatusWithAggregatesFilter<"ProjectAssignment"> | $Enums.AssignmentStatus
    createdAt?: DateTimeWithAggregatesFilter<"ProjectAssignment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProjectAssignment"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    deadline?: DateTimeNullableFilter<"Project"> | Date | string | null
    budget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignees?: UserListRelationFilter
    submissions?: SubmissionListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    deadline?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    assignees?: UserOrderByRelationAggregateInput
    submissions?: SubmissionOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    deadline?: DateTimeNullableFilter<"Project"> | Date | string | null
    budget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignees?: UserListRelationFilter
    submissions?: SubmissionListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    deadline?: SortOrderInput | SortOrder
    budget?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus
    deadline?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    budget?: DecimalNullableWithAggregatesFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type SubmissionWhereInput = {
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    id?: StringFilter<"Submission"> | string
    projectId?: StringNullableFilter<"Submission"> | string | null
    assignmentId?: StringNullableFilter<"Submission"> | string | null
    userId?: StringFilter<"Submission"> | string
    versionSlot?: IntFilter<"Submission"> | number
    versionTitle?: StringNullableFilter<"Submission"> | string | null
    version?: IntFilter<"Submission"> | number
    videoUrl?: StringFilter<"Submission"> | string
    fileKey?: StringNullableFilter<"Submission"> | string | null
    duration?: IntNullableFilter<"Submission"> | number | null
    thumbnailUrl?: StringNullableFilter<"Submission"> | string | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    notes?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    assignment?: XOR<ProjectAssignmentNullableScalarRelationFilter, ProjectAssignmentWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedbacks?: FeedbackListRelationFilter
  }

  export type SubmissionOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrderInput | SortOrder
    assignmentId?: SortOrderInput | SortOrder
    userId?: SortOrder
    versionSlot?: SortOrder
    versionTitle?: SortOrderInput | SortOrder
    version?: SortOrder
    videoUrl?: SortOrder
    fileKey?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    assignment?: ProjectAssignmentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    feedbacks?: FeedbackOrderByRelationAggregateInput
  }

  export type SubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    assignmentId_versionSlot?: SubmissionAssignmentIdVersionSlotCompoundUniqueInput
    AND?: SubmissionWhereInput | SubmissionWhereInput[]
    OR?: SubmissionWhereInput[]
    NOT?: SubmissionWhereInput | SubmissionWhereInput[]
    projectId?: StringNullableFilter<"Submission"> | string | null
    assignmentId?: StringNullableFilter<"Submission"> | string | null
    userId?: StringFilter<"Submission"> | string
    versionSlot?: IntFilter<"Submission"> | number
    versionTitle?: StringNullableFilter<"Submission"> | string | null
    version?: IntFilter<"Submission"> | number
    videoUrl?: StringFilter<"Submission"> | string
    fileKey?: StringNullableFilter<"Submission"> | string | null
    duration?: IntNullableFilter<"Submission"> | number | null
    thumbnailUrl?: StringNullableFilter<"Submission"> | string | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    notes?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    assignment?: XOR<ProjectAssignmentNullableScalarRelationFilter, ProjectAssignmentWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    feedbacks?: FeedbackListRelationFilter
  }, "id" | "assignmentId_versionSlot">

  export type SubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrderInput | SortOrder
    assignmentId?: SortOrderInput | SortOrder
    userId?: SortOrder
    versionSlot?: SortOrder
    versionTitle?: SortOrderInput | SortOrder
    version?: SortOrder
    videoUrl?: SortOrder
    fileKey?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubmissionCountOrderByAggregateInput
    _avg?: SubmissionAvgOrderByAggregateInput
    _max?: SubmissionMaxOrderByAggregateInput
    _min?: SubmissionMinOrderByAggregateInput
    _sum?: SubmissionSumOrderByAggregateInput
  }

  export type SubmissionScalarWhereWithAggregatesInput = {
    AND?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    OR?: SubmissionScalarWhereWithAggregatesInput[]
    NOT?: SubmissionScalarWhereWithAggregatesInput | SubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Submission"> | string
    projectId?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    assignmentId?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    userId?: StringWithAggregatesFilter<"Submission"> | string
    versionSlot?: IntWithAggregatesFilter<"Submission"> | number
    versionTitle?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    version?: IntWithAggregatesFilter<"Submission"> | number
    videoUrl?: StringWithAggregatesFilter<"Submission"> | string
    fileKey?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    duration?: IntNullableWithAggregatesFilter<"Submission"> | number | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    status?: EnumSubmissionStatusWithAggregatesFilter<"Submission"> | $Enums.SubmissionStatus
    notes?: StringNullableWithAggregatesFilter<"Submission"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Submission"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    submissionId?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    startTime?: FloatNullableFilter<"Feedback"> | number | null
    endTime?: FloatNullableFilter<"Feedback"> | number | null
    timestamp?: FloatNullableFilter<"Feedback"> | number | null
    feedbackType?: StringNullableFilter<"Feedback"> | string | null
    content?: StringFilter<"Feedback"> | string
    priority?: EnumFeedbackPriorityFilter<"Feedback"> | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFilter<"Feedback"> | $Enums.FeedbackStatus
    annotations?: JsonNullableFilter<"Feedback">
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    submission?: XOR<SubmissionScalarRelationFilter, SubmissionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    userId?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    timestamp?: SortOrderInput | SortOrder
    feedbackType?: SortOrderInput | SortOrder
    content?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    annotations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submission?: SubmissionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    submissionId?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    startTime?: FloatNullableFilter<"Feedback"> | number | null
    endTime?: FloatNullableFilter<"Feedback"> | number | null
    timestamp?: FloatNullableFilter<"Feedback"> | number | null
    feedbackType?: StringNullableFilter<"Feedback"> | string | null
    content?: StringFilter<"Feedback"> | string
    priority?: EnumFeedbackPriorityFilter<"Feedback"> | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFilter<"Feedback"> | $Enums.FeedbackStatus
    annotations?: JsonNullableFilter<"Feedback">
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
    submission?: XOR<SubmissionScalarRelationFilter, SubmissionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    submissionId?: SortOrder
    userId?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    timestamp?: SortOrderInput | SortOrder
    feedbackType?: SortOrderInput | SortOrder
    content?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    annotations?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _avg?: FeedbackAvgOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
    _sum?: FeedbackSumOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    submissionId?: StringWithAggregatesFilter<"Feedback"> | string
    userId?: StringWithAggregatesFilter<"Feedback"> | string
    startTime?: FloatNullableWithAggregatesFilter<"Feedback"> | number | null
    endTime?: FloatNullableWithAggregatesFilter<"Feedback"> | number | null
    timestamp?: FloatNullableWithAggregatesFilter<"Feedback"> | number | null
    feedbackType?: StringNullableWithAggregatesFilter<"Feedback"> | string | null
    content?: StringWithAggregatesFilter<"Feedback"> | string
    priority?: EnumFeedbackPriorityWithAggregatesFilter<"Feedback"> | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusWithAggregatesFilter<"Feedback"> | $Enums.FeedbackStatus
    annotations?: JsonNullableWithAggregatesFilter<"Feedback">
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type SettlementWhereInput = {
    AND?: SettlementWhereInput | SettlementWhereInput[]
    OR?: SettlementWhereInput[]
    NOT?: SettlementWhereInput | SettlementWhereInput[]
    id?: StringFilter<"Settlement"> | string
    userId?: StringFilter<"Settlement"> | string
    submissionId?: StringNullableFilter<"Settlement"> | string | null
    amount?: DecimalFilter<"Settlement"> | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFilter<"Settlement"> | $Enums.SettlementType
    settlementRound?: EnumSettlementRoundNullableFilter<"Settlement"> | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFilter<"Settlement"> | $Enums.SettlementStatus
    description?: StringNullableFilter<"Settlement"> | string | null
    quarterYear?: IntNullableFilter<"Settlement"> | number | null
    quarterNumber?: IntNullableFilter<"Settlement"> | number | null
    processedAt?: DateTimeNullableFilter<"Settlement"> | Date | string | null
    createdAt?: DateTimeFilter<"Settlement"> | Date | string
    updatedAt?: DateTimeFilter<"Settlement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SettlementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    settlementRound?: SortOrderInput | SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    quarterYear?: SortOrderInput | SortOrder
    quarterNumber?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SettlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SettlementWhereInput | SettlementWhereInput[]
    OR?: SettlementWhereInput[]
    NOT?: SettlementWhereInput | SettlementWhereInput[]
    userId?: StringFilter<"Settlement"> | string
    submissionId?: StringNullableFilter<"Settlement"> | string | null
    amount?: DecimalFilter<"Settlement"> | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFilter<"Settlement"> | $Enums.SettlementType
    settlementRound?: EnumSettlementRoundNullableFilter<"Settlement"> | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFilter<"Settlement"> | $Enums.SettlementStatus
    description?: StringNullableFilter<"Settlement"> | string | null
    quarterYear?: IntNullableFilter<"Settlement"> | number | null
    quarterNumber?: IntNullableFilter<"Settlement"> | number | null
    processedAt?: DateTimeNullableFilter<"Settlement"> | Date | string | null
    createdAt?: DateTimeFilter<"Settlement"> | Date | string
    updatedAt?: DateTimeFilter<"Settlement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SettlementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    type?: SortOrder
    settlementRound?: SortOrderInput | SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    quarterYear?: SortOrderInput | SortOrder
    quarterNumber?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettlementCountOrderByAggregateInput
    _avg?: SettlementAvgOrderByAggregateInput
    _max?: SettlementMaxOrderByAggregateInput
    _min?: SettlementMinOrderByAggregateInput
    _sum?: SettlementSumOrderByAggregateInput
  }

  export type SettlementScalarWhereWithAggregatesInput = {
    AND?: SettlementScalarWhereWithAggregatesInput | SettlementScalarWhereWithAggregatesInput[]
    OR?: SettlementScalarWhereWithAggregatesInput[]
    NOT?: SettlementScalarWhereWithAggregatesInput | SettlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Settlement"> | string
    userId?: StringWithAggregatesFilter<"Settlement"> | string
    submissionId?: StringNullableWithAggregatesFilter<"Settlement"> | string | null
    amount?: DecimalWithAggregatesFilter<"Settlement"> | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeWithAggregatesFilter<"Settlement"> | $Enums.SettlementType
    settlementRound?: EnumSettlementRoundNullableWithAggregatesFilter<"Settlement"> | $Enums.SettlementRound | null
    status?: EnumSettlementStatusWithAggregatesFilter<"Settlement"> | $Enums.SettlementStatus
    description?: StringNullableWithAggregatesFilter<"Settlement"> | string | null
    quarterYear?: IntNullableWithAggregatesFilter<"Settlement"> | number | null
    quarterNumber?: IntNullableWithAggregatesFilter<"Settlement"> | number | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"Settlement"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Settlement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settlement"> | Date | string
  }

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    id?: StringFilter<"Campaign"> | string
    name?: StringFilter<"Campaign"> | string
    submissionId?: StringNullableFilter<"Campaign"> | string | null
    platform?: StringNullableListFilter<"Campaign">
    budget?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Campaign"> | Date | string
    endDate?: DateTimeFilter<"Campaign"> | Date | string
    targetAudience?: JsonNullableFilter<"Campaign">
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    views?: IntFilter<"Campaign"> | number
    clicks?: IntFilter<"Campaign"> | number
    conversions?: IntFilter<"Campaign"> | number
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    platform?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    targetAudience?: SortOrderInput | SortOrder
    status?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CampaignWhereInput | CampaignWhereInput[]
    OR?: CampaignWhereInput[]
    NOT?: CampaignWhereInput | CampaignWhereInput[]
    name?: StringFilter<"Campaign"> | string
    submissionId?: StringNullableFilter<"Campaign"> | string | null
    platform?: StringNullableListFilter<"Campaign">
    budget?: DecimalFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFilter<"Campaign"> | Date | string
    endDate?: DateTimeFilter<"Campaign"> | Date | string
    targetAudience?: JsonNullableFilter<"Campaign">
    status?: EnumCampaignStatusFilter<"Campaign"> | $Enums.CampaignStatus
    views?: IntFilter<"Campaign"> | number
    clicks?: IntFilter<"Campaign"> | number
    conversions?: IntFilter<"Campaign"> | number
    createdAt?: DateTimeFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string
  }, "id">

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    submissionId?: SortOrderInput | SortOrder
    platform?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    targetAudience?: SortOrderInput | SortOrder
    status?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CampaignCountOrderByAggregateInput
    _avg?: CampaignAvgOrderByAggregateInput
    _max?: CampaignMaxOrderByAggregateInput
    _min?: CampaignMinOrderByAggregateInput
    _sum?: CampaignSumOrderByAggregateInput
  }

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    OR?: CampaignScalarWhereWithAggregatesInput[]
    NOT?: CampaignScalarWhereWithAggregatesInput | CampaignScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Campaign"> | string
    name?: StringWithAggregatesFilter<"Campaign"> | string
    submissionId?: StringNullableWithAggregatesFilter<"Campaign"> | string | null
    platform?: StringNullableListFilter<"Campaign">
    budget?: DecimalWithAggregatesFilter<"Campaign"> | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    targetAudience?: JsonNullableWithAggregatesFilter<"Campaign">
    status?: EnumCampaignStatusWithAggregatesFilter<"Campaign"> | $Enums.CampaignStatus
    views?: IntWithAggregatesFilter<"Campaign"> | number
    clicks?: IntWithAggregatesFilter<"Campaign"> | number
    conversions?: IntWithAggregatesFilter<"Campaign"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestCreateInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedRequestsInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutRequestInput
  }

  export type ProjectRequestUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type ProjectRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedRequestsNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutRequestNestedInput
  }

  export type ProjectRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type ProjectRequestCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectAssignmentCreateInput = {
    id?: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    request: ProjectRequestCreateNestedOneWithoutAssignmentsInput
    freelancer: UserCreateNestedOneWithoutAssignmentsInput
    submissions?: SubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentUncheckedCreateInput = {
    id?: string
    requestId: string
    freelancerId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: ProjectRequestUpdateOneRequiredWithoutAssignmentsNestedInput
    freelancer?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
    submissions?: SubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentCreateManyInput = {
    id?: string
    requestId: string
    freelancerId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedProjectsInput
    assignees?: UserCreateNestedManyWithoutAssignedProjectsInput
    submissions?: SubmissionCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignees?: UserUncheckedCreateNestedManyWithoutAssignedProjectsInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedProjectsNestedInput
    assignees?: UserUpdateManyWithoutAssignedProjectsNestedInput
    submissions?: SubmissionUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignees?: UserUncheckedUpdateManyWithoutAssignedProjectsNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateInput = {
    id?: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutSubmissionsInput
    assignment?: ProjectAssignmentCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
    feedbacks?: FeedbackCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateInput = {
    id?: string
    projectId?: string | null
    assignmentId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutSubmissionsNestedInput
    assignment?: ProjectAssignmentUpdateOneWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    feedbacks?: FeedbackUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionCreateManyInput = {
    id?: string
    projectId?: string | null
    assignmentId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    id?: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission: SubmissionCreateNestedOneWithoutFeedbacksInput
    user: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    submissionId: string
    userId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUpdateOneRequiredWithoutFeedbacksNestedInput
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    submissionId: string
    userId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementCreateInput = {
    id?: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSettlementsInput
  }

  export type SettlementUncheckedCreateInput = {
    id?: string
    userId: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSettlementsNestedInput
  }

  export type SettlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementCreateManyInput = {
    id?: string
    userId: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateInput = {
    id?: string
    name: string
    submissionId?: string | null
    platform?: CampaignCreateplatformInput | string[]
    budget: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CampaignStatus
    views?: number
    clicks?: number
    conversions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUncheckedCreateInput = {
    id?: string
    name: string
    submissionId?: string | null
    platform?: CampaignCreateplatformInput | string[]
    budget: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CampaignStatus
    views?: number
    clicks?: number
    conversions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: CampaignUpdateplatformInput | string[]
    budget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    views?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    conversions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: CampaignUpdateplatformInput | string[]
    budget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    views?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    conversions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignCreateManyInput = {
    id?: string
    name: string
    submissionId?: string | null
    platform?: CampaignCreateplatformInput | string[]
    budget: Decimal | DecimalJsLike | number | string
    startDate: Date | string
    endDate: Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.CampaignStatus
    views?: number
    clicks?: number
    conversions?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: CampaignUpdateplatformInput | string[]
    budget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    views?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    conversions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    platform?: CampaignUpdateplatformInput | string[]
    budget?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    targetAudience?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumCampaignStatusFieldUpdateOperationsInput | $Enums.CampaignStatus
    views?: IntFieldUpdateOperationsInput | number
    clicks?: IntFieldUpdateOperationsInput | number
    conversions?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SubmissionListRelationFilter = {
    every?: SubmissionWhereInput
    some?: SubmissionWhereInput
    none?: SubmissionWhereInput
  }

  export type FeedbackListRelationFilter = {
    every?: FeedbackWhereInput
    some?: FeedbackWhereInput
    none?: FeedbackWhereInput
  }

  export type SettlementListRelationFilter = {
    every?: SettlementWhereInput
    some?: SettlementWhereInput
    none?: SettlementWhereInput
  }

  export type ProjectRequestListRelationFilter = {
    every?: ProjectRequestWhereInput
    some?: ProjectRequestWhereInput
    none?: ProjectRequestWhereInput
  }

  export type ProjectAssignmentListRelationFilter = {
    every?: ProjectAssignmentWhereInput
    some?: ProjectAssignmentWhereInput
    none?: ProjectAssignmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SettlementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    profileImage?: SortOrder
    bio?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    profileImage?: SortOrder
    bio?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    profileImage?: SortOrder
    bio?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumAssignmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentType | EnumAssignmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentTypeFilter<$PrismaModel> | $Enums.AssignmentType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectRequestCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    categories?: SortOrder
    deadline?: SortOrder
    assignmentType?: SortOrder
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    status?: SortOrder
    estimatedBudget?: SortOrder
    requirements?: SortOrder
    referenceUrls?: SortOrder
    targetCounselorId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectRequestAvgOrderByAggregateInput = {
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    estimatedBudget?: SortOrder
  }

  export type ProjectRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    assignmentType?: SortOrder
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    status?: SortOrder
    estimatedBudget?: SortOrder
    requirements?: SortOrder
    targetCounselorId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectRequestMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    deadline?: SortOrder
    assignmentType?: SortOrder
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    status?: SortOrder
    estimatedBudget?: SortOrder
    requirements?: SortOrder
    targetCounselorId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectRequestSumOrderByAggregateInput = {
    maxAssignees?: SortOrder
    currentAssignees?: SortOrder
    estimatedBudget?: SortOrder
  }

  export type EnumAssignmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentType | EnumAssignmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAssignmentTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type ProjectRequestScalarRelationFilter = {
    is?: ProjectRequestWhereInput
    isNot?: ProjectRequestWhereInput
  }

  export type ProjectAssignmentRequestIdFreelancerIdCompoundUniqueInput = {
    requestId: string
    freelancerId: string
  }

  export type ProjectAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    freelancerId?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    freelancerId?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    freelancerId?: SortOrder
    acceptedAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type EnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    budget?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    deadline?: SortOrder
    budget?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    budget?: SortOrder
  }

  export type EnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type ProjectAssignmentNullableScalarRelationFilter = {
    is?: ProjectAssignmentWhereInput | null
    isNot?: ProjectAssignmentWhereInput | null
  }

  export type SubmissionAssignmentIdVersionSlotCompoundUniqueInput = {
    assignmentId: string
    versionSlot: number
  }

  export type SubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    assignmentId?: SortOrder
    userId?: SortOrder
    versionSlot?: SortOrder
    versionTitle?: SortOrder
    version?: SortOrder
    videoUrl?: SortOrder
    fileKey?: SortOrder
    duration?: SortOrder
    thumbnailUrl?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionAvgOrderByAggregateInput = {
    versionSlot?: SortOrder
    version?: SortOrder
    duration?: SortOrder
  }

  export type SubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    assignmentId?: SortOrder
    userId?: SortOrder
    versionSlot?: SortOrder
    versionTitle?: SortOrder
    version?: SortOrder
    videoUrl?: SortOrder
    fileKey?: SortOrder
    duration?: SortOrder
    thumbnailUrl?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    assignmentId?: SortOrder
    userId?: SortOrder
    versionSlot?: SortOrder
    versionTitle?: SortOrder
    version?: SortOrder
    videoUrl?: SortOrder
    fileKey?: SortOrder
    duration?: SortOrder
    thumbnailUrl?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubmissionSumOrderByAggregateInput = {
    versionSlot?: SortOrder
    version?: SortOrder
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumFeedbackPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackPriority | EnumFeedbackPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackPriorityFilter<$PrismaModel> | $Enums.FeedbackPriority
  }

  export type EnumFeedbackStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackStatus | EnumFeedbackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackStatusFilter<$PrismaModel> | $Enums.FeedbackStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SubmissionScalarRelationFilter = {
    is?: SubmissionWhereInput
    isNot?: SubmissionWhereInput
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timestamp?: SortOrder
    feedbackType?: SortOrder
    content?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    annotations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackAvgOrderByAggregateInput = {
    startTime?: SortOrder
    endTime?: SortOrder
    timestamp?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timestamp?: SortOrder
    feedbackType?: SortOrder
    content?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    submissionId?: SortOrder
    userId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    timestamp?: SortOrder
    feedbackType?: SortOrder
    content?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackSumOrderByAggregateInput = {
    startTime?: SortOrder
    endTime?: SortOrder
    timestamp?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumFeedbackPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackPriority | EnumFeedbackPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackPriorityWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackPriorityFilter<$PrismaModel>
    _max?: NestedEnumFeedbackPriorityFilter<$PrismaModel>
  }

  export type EnumFeedbackStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackStatus | EnumFeedbackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackStatusWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackStatusFilter<$PrismaModel>
    _max?: NestedEnumFeedbackStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumSettlementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementType | EnumSettlementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementTypeFilter<$PrismaModel> | $Enums.SettlementType
  }

  export type EnumSettlementRoundNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementRound | EnumSettlementRoundFieldRefInput<$PrismaModel> | null
    in?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSettlementRoundNullableFilter<$PrismaModel> | $Enums.SettlementRound | null
  }

  export type EnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type SettlementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    settlementRound?: SortOrder
    status?: SortOrder
    description?: SortOrder
    quarterYear?: SortOrder
    quarterNumber?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettlementAvgOrderByAggregateInput = {
    amount?: SortOrder
    quarterYear?: SortOrder
    quarterNumber?: SortOrder
  }

  export type SettlementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    settlementRound?: SortOrder
    status?: SortOrder
    description?: SortOrder
    quarterYear?: SortOrder
    quarterNumber?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettlementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    settlementRound?: SortOrder
    status?: SortOrder
    description?: SortOrder
    quarterYear?: SortOrder
    quarterNumber?: SortOrder
    processedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettlementSumOrderByAggregateInput = {
    amount?: SortOrder
    quarterYear?: SortOrder
    quarterNumber?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumSettlementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementType | EnumSettlementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementTypeWithAggregatesFilter<$PrismaModel> | $Enums.SettlementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementTypeFilter<$PrismaModel>
    _max?: NestedEnumSettlementTypeFilter<$PrismaModel>
  }

  export type EnumSettlementRoundNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementRound | EnumSettlementRoundFieldRefInput<$PrismaModel> | null
    in?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSettlementRoundNullableWithAggregatesFilter<$PrismaModel> | $Enums.SettlementRound | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSettlementRoundNullableFilter<$PrismaModel>
    _max?: NestedEnumSettlementRoundNullableFilter<$PrismaModel>
  }

  export type EnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
  }

  export type EnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    submissionId?: SortOrder
    platform?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignAvgOrderByAggregateInput = {
    budget?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
  }

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    submissionId?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    submissionId?: SortOrder
    budget?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CampaignSumOrderByAggregateInput = {
    budget?: SortOrder
    views?: SortOrder
    clicks?: SortOrder
    conversions?: SortOrder
  }

  export type EnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutAssigneesInput = {
    create?: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput> | ProjectCreateWithoutAssigneesInput[] | ProjectUncheckedCreateWithoutAssigneesInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAssigneesInput | ProjectCreateOrConnectWithoutAssigneesInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type FeedbackCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type SettlementCreateNestedManyWithoutUserInput = {
    create?: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput> | SettlementCreateWithoutUserInput[] | SettlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SettlementCreateOrConnectWithoutUserInput | SettlementCreateOrConnectWithoutUserInput[]
    createMany?: SettlementCreateManyUserInputEnvelope
    connect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
  }

  export type ProjectRequestCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput> | ProjectRequestCreateWithoutCreatedByInput[] | ProjectRequestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutCreatedByInput | ProjectRequestCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectRequestCreateManyCreatedByInputEnvelope
    connect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
  }

  export type ProjectAssignmentCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput> | ProjectAssignmentCreateWithoutFreelancerInput[] | ProjectAssignmentUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutFreelancerInput | ProjectAssignmentCreateOrConnectWithoutFreelancerInput[]
    createMany?: ProjectAssignmentCreateManyFreelancerInputEnvelope
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutAssigneesInput = {
    create?: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput> | ProjectCreateWithoutAssigneesInput[] | ProjectUncheckedCreateWithoutAssigneesInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAssigneesInput | ProjectCreateOrConnectWithoutAssigneesInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type SettlementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput> | SettlementCreateWithoutUserInput[] | SettlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SettlementCreateOrConnectWithoutUserInput | SettlementCreateOrConnectWithoutUserInput[]
    createMany?: SettlementCreateManyUserInputEnvelope
    connect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
  }

  export type ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput> | ProjectRequestCreateWithoutCreatedByInput[] | ProjectRequestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutCreatedByInput | ProjectRequestCreateOrConnectWithoutCreatedByInput[]
    createMany?: ProjectRequestCreateManyCreatedByInputEnvelope
    connect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
  }

  export type ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput = {
    create?: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput> | ProjectAssignmentCreateWithoutFreelancerInput[] | ProjectAssignmentUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutFreelancerInput | ProjectAssignmentCreateOrConnectWithoutFreelancerInput[]
    createMany?: ProjectAssignmentCreateManyFreelancerInputEnvelope
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnerInput | ProjectUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnerInput | ProjectUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnerInput | ProjectUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutAssigneesNestedInput = {
    create?: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput> | ProjectCreateWithoutAssigneesInput[] | ProjectUncheckedCreateWithoutAssigneesInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAssigneesInput | ProjectCreateOrConnectWithoutAssigneesInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAssigneesInput | ProjectUpsertWithWhereUniqueWithoutAssigneesInput[]
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAssigneesInput | ProjectUpdateWithWhereUniqueWithoutAssigneesInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAssigneesInput | ProjectUpdateManyWithWhereWithoutAssigneesInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type FeedbackUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type SettlementUpdateManyWithoutUserNestedInput = {
    create?: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput> | SettlementCreateWithoutUserInput[] | SettlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SettlementCreateOrConnectWithoutUserInput | SettlementCreateOrConnectWithoutUserInput[]
    upsert?: SettlementUpsertWithWhereUniqueWithoutUserInput | SettlementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SettlementCreateManyUserInputEnvelope
    set?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    disconnect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    delete?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    connect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    update?: SettlementUpdateWithWhereUniqueWithoutUserInput | SettlementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SettlementUpdateManyWithWhereWithoutUserInput | SettlementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SettlementScalarWhereInput | SettlementScalarWhereInput[]
  }

  export type ProjectRequestUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput> | ProjectRequestCreateWithoutCreatedByInput[] | ProjectRequestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutCreatedByInput | ProjectRequestCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectRequestUpsertWithWhereUniqueWithoutCreatedByInput | ProjectRequestUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectRequestCreateManyCreatedByInputEnvelope
    set?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    disconnect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    delete?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    connect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    update?: ProjectRequestUpdateWithWhereUniqueWithoutCreatedByInput | ProjectRequestUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectRequestUpdateManyWithWhereWithoutCreatedByInput | ProjectRequestUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectRequestScalarWhereInput | ProjectRequestScalarWhereInput[]
  }

  export type ProjectAssignmentUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput> | ProjectAssignmentCreateWithoutFreelancerInput[] | ProjectAssignmentUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutFreelancerInput | ProjectAssignmentCreateOrConnectWithoutFreelancerInput[]
    upsert?: ProjectAssignmentUpsertWithWhereUniqueWithoutFreelancerInput | ProjectAssignmentUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: ProjectAssignmentCreateManyFreelancerInputEnvelope
    set?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    disconnect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    delete?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    update?: ProjectAssignmentUpdateWithWhereUniqueWithoutFreelancerInput | ProjectAssignmentUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: ProjectAssignmentUpdateManyWithWhereWithoutFreelancerInput | ProjectAssignmentUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput> | ProjectCreateWithoutOwnerInput[] | ProjectUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutOwnerInput | ProjectCreateOrConnectWithoutOwnerInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutOwnerInput | ProjectUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ProjectCreateManyOwnerInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutOwnerInput | ProjectUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutOwnerInput | ProjectUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutAssigneesNestedInput = {
    create?: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput> | ProjectCreateWithoutAssigneesInput[] | ProjectUncheckedCreateWithoutAssigneesInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAssigneesInput | ProjectCreateOrConnectWithoutAssigneesInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAssigneesInput | ProjectUpsertWithWhereUniqueWithoutAssigneesInput[]
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAssigneesInput | ProjectUpdateWithWhereUniqueWithoutAssigneesInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAssigneesInput | ProjectUpdateManyWithWhereWithoutAssigneesInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput> | SubmissionCreateWithoutUserInput[] | SubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutUserInput | SubmissionCreateOrConnectWithoutUserInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutUserInput | SubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubmissionCreateManyUserInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutUserInput | SubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutUserInput | SubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput> | FeedbackCreateWithoutUserInput[] | FeedbackUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutUserInput | FeedbackCreateOrConnectWithoutUserInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutUserInput | FeedbackUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedbackCreateManyUserInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutUserInput | FeedbackUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutUserInput | FeedbackUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type SettlementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput> | SettlementCreateWithoutUserInput[] | SettlementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SettlementCreateOrConnectWithoutUserInput | SettlementCreateOrConnectWithoutUserInput[]
    upsert?: SettlementUpsertWithWhereUniqueWithoutUserInput | SettlementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SettlementCreateManyUserInputEnvelope
    set?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    disconnect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    delete?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    connect?: SettlementWhereUniqueInput | SettlementWhereUniqueInput[]
    update?: SettlementUpdateWithWhereUniqueWithoutUserInput | SettlementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SettlementUpdateManyWithWhereWithoutUserInput | SettlementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SettlementScalarWhereInput | SettlementScalarWhereInput[]
  }

  export type ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput> | ProjectRequestCreateWithoutCreatedByInput[] | ProjectRequestUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutCreatedByInput | ProjectRequestCreateOrConnectWithoutCreatedByInput[]
    upsert?: ProjectRequestUpsertWithWhereUniqueWithoutCreatedByInput | ProjectRequestUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ProjectRequestCreateManyCreatedByInputEnvelope
    set?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    disconnect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    delete?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    connect?: ProjectRequestWhereUniqueInput | ProjectRequestWhereUniqueInput[]
    update?: ProjectRequestUpdateWithWhereUniqueWithoutCreatedByInput | ProjectRequestUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ProjectRequestUpdateManyWithWhereWithoutCreatedByInput | ProjectRequestUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ProjectRequestScalarWhereInput | ProjectRequestScalarWhereInput[]
  }

  export type ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput = {
    create?: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput> | ProjectAssignmentCreateWithoutFreelancerInput[] | ProjectAssignmentUncheckedCreateWithoutFreelancerInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutFreelancerInput | ProjectAssignmentCreateOrConnectWithoutFreelancerInput[]
    upsert?: ProjectAssignmentUpsertWithWhereUniqueWithoutFreelancerInput | ProjectAssignmentUpsertWithWhereUniqueWithoutFreelancerInput[]
    createMany?: ProjectAssignmentCreateManyFreelancerInputEnvelope
    set?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    disconnect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    delete?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    update?: ProjectAssignmentUpdateWithWhereUniqueWithoutFreelancerInput | ProjectAssignmentUpdateWithWhereUniqueWithoutFreelancerInput[]
    updateMany?: ProjectAssignmentUpdateManyWithWhereWithoutFreelancerInput | ProjectAssignmentUpdateManyWithWhereWithoutFreelancerInput[]
    deleteMany?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
  }

  export type ProjectRequestCreatecategoriesInput = {
    set: string[]
  }

  export type ProjectRequestCreatereferenceUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutCreatedRequestsInput = {
    create?: XOR<UserCreateWithoutCreatedRequestsInput, UserUncheckedCreateWithoutCreatedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectAssignmentCreateNestedManyWithoutRequestInput = {
    create?: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput> | ProjectAssignmentCreateWithoutRequestInput[] | ProjectAssignmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutRequestInput | ProjectAssignmentCreateOrConnectWithoutRequestInput[]
    createMany?: ProjectAssignmentCreateManyRequestInputEnvelope
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
  }

  export type ProjectAssignmentUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput> | ProjectAssignmentCreateWithoutRequestInput[] | ProjectAssignmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutRequestInput | ProjectAssignmentCreateOrConnectWithoutRequestInput[]
    createMany?: ProjectAssignmentCreateManyRequestInputEnvelope
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
  }

  export type ProjectRequestUpdatecategoriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAssignmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AssignmentType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ProjectRequestUpdatereferenceUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutCreatedRequestsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedRequestsInput, UserUncheckedCreateWithoutCreatedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedRequestsInput
    upsert?: UserUpsertWithoutCreatedRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedRequestsInput, UserUpdateWithoutCreatedRequestsInput>, UserUncheckedUpdateWithoutCreatedRequestsInput>
  }

  export type ProjectAssignmentUpdateManyWithoutRequestNestedInput = {
    create?: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput> | ProjectAssignmentCreateWithoutRequestInput[] | ProjectAssignmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutRequestInput | ProjectAssignmentCreateOrConnectWithoutRequestInput[]
    upsert?: ProjectAssignmentUpsertWithWhereUniqueWithoutRequestInput | ProjectAssignmentUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: ProjectAssignmentCreateManyRequestInputEnvelope
    set?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    disconnect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    delete?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    update?: ProjectAssignmentUpdateWithWhereUniqueWithoutRequestInput | ProjectAssignmentUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: ProjectAssignmentUpdateManyWithWhereWithoutRequestInput | ProjectAssignmentUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
  }

  export type ProjectAssignmentUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput> | ProjectAssignmentCreateWithoutRequestInput[] | ProjectAssignmentUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutRequestInput | ProjectAssignmentCreateOrConnectWithoutRequestInput[]
    upsert?: ProjectAssignmentUpsertWithWhereUniqueWithoutRequestInput | ProjectAssignmentUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: ProjectAssignmentCreateManyRequestInputEnvelope
    set?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    disconnect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    delete?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    connect?: ProjectAssignmentWhereUniqueInput | ProjectAssignmentWhereUniqueInput[]
    update?: ProjectAssignmentUpdateWithWhereUniqueWithoutRequestInput | ProjectAssignmentUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: ProjectAssignmentUpdateManyWithWhereWithoutRequestInput | ProjectAssignmentUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
  }

  export type ProjectRequestCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ProjectRequestCreateWithoutAssignmentsInput, ProjectRequestUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutAssignmentsInput
    connect?: ProjectRequestWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
  }

  export type SubmissionCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type EnumAssignmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssignmentStatus
  }

  export type ProjectRequestUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ProjectRequestCreateWithoutAssignmentsInput, ProjectRequestUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ProjectRequestCreateOrConnectWithoutAssignmentsInput
    upsert?: ProjectRequestUpsertWithoutAssignmentsInput
    connect?: ProjectRequestWhereUniqueInput
    update?: XOR<XOR<ProjectRequestUpdateToOneWithWhereWithoutAssignmentsInput, ProjectRequestUpdateWithoutAssignmentsInput>, ProjectRequestUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignmentsInput
    upsert?: UserUpsertWithoutAssignmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignmentsInput, UserUpdateWithoutAssignmentsInput>, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubmissionUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutAssignmentInput | SubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutAssignmentInput | SubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutAssignmentInput | SubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput> | SubmissionCreateWithoutAssignmentInput[] | SubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutAssignmentInput | SubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutAssignmentInput | SubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: SubmissionCreateManyAssignmentInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutAssignmentInput | SubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutAssignmentInput | SubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedProjectsInput = {
    create?: XOR<UserCreateWithoutOwnedProjectsInput, UserUncheckedCreateWithoutOwnedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutAssignedProjectsInput = {
    create?: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput> | UserCreateWithoutAssignedProjectsInput[] | UserUncheckedCreateWithoutAssignedProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedProjectsInput | UserCreateOrConnectWithoutAssignedProjectsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SubmissionCreateNestedManyWithoutProjectInput = {
    create?: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput> | SubmissionCreateWithoutProjectInput[] | SubmissionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProjectInput | SubmissionCreateOrConnectWithoutProjectInput[]
    createMany?: SubmissionCreateManyProjectInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAssignedProjectsInput = {
    create?: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput> | UserCreateWithoutAssignedProjectsInput[] | UserUncheckedCreateWithoutAssignedProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedProjectsInput | UserCreateOrConnectWithoutAssignedProjectsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type SubmissionUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput> | SubmissionCreateWithoutProjectInput[] | SubmissionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProjectInput | SubmissionCreateOrConnectWithoutProjectInput[]
    createMany?: SubmissionCreateManyProjectInputEnvelope
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
  }

  export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOwnedProjectsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedProjectsInput, UserUncheckedCreateWithoutOwnedProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedProjectsInput
    upsert?: UserUpsertWithoutOwnedProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedProjectsInput, UserUpdateWithoutOwnedProjectsInput>, UserUncheckedUpdateWithoutOwnedProjectsInput>
  }

  export type UserUpdateManyWithoutAssignedProjectsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput> | UserCreateWithoutAssignedProjectsInput[] | UserUncheckedCreateWithoutAssignedProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedProjectsInput | UserCreateOrConnectWithoutAssignedProjectsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssignedProjectsInput | UserUpsertWithWhereUniqueWithoutAssignedProjectsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssignedProjectsInput | UserUpdateWithWhereUniqueWithoutAssignedProjectsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssignedProjectsInput | UserUpdateManyWithWhereWithoutAssignedProjectsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SubmissionUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput> | SubmissionCreateWithoutProjectInput[] | SubmissionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProjectInput | SubmissionCreateOrConnectWithoutProjectInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProjectInput | SubmissionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SubmissionCreateManyProjectInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProjectInput | SubmissionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProjectInput | SubmissionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutAssignedProjectsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput> | UserCreateWithoutAssignedProjectsInput[] | UserUncheckedCreateWithoutAssignedProjectsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAssignedProjectsInput | UserCreateOrConnectWithoutAssignedProjectsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAssignedProjectsInput | UserUpsertWithWhereUniqueWithoutAssignedProjectsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAssignedProjectsInput | UserUpdateWithWhereUniqueWithoutAssignedProjectsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAssignedProjectsInput | UserUpdateManyWithWhereWithoutAssignedProjectsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SubmissionUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput> | SubmissionCreateWithoutProjectInput[] | SubmissionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: SubmissionCreateOrConnectWithoutProjectInput | SubmissionCreateOrConnectWithoutProjectInput[]
    upsert?: SubmissionUpsertWithWhereUniqueWithoutProjectInput | SubmissionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: SubmissionCreateManyProjectInputEnvelope
    set?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    disconnect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    delete?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    connect?: SubmissionWhereUniqueInput | SubmissionWhereUniqueInput[]
    update?: SubmissionUpdateWithWhereUniqueWithoutProjectInput | SubmissionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: SubmissionUpdateManyWithWhereWithoutProjectInput | SubmissionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<ProjectCreateWithoutSubmissionsInput, ProjectUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSubmissionsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectAssignmentCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<ProjectAssignmentCreateWithoutSubmissionsInput, ProjectAssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutSubmissionsInput
    connect?: ProjectAssignmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type FeedbackCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput> | FeedbackCreateWithoutSubmissionInput[] | FeedbackUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutSubmissionInput | FeedbackCreateOrConnectWithoutSubmissionInput[]
    createMany?: FeedbackCreateManySubmissionInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type FeedbackUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput> | FeedbackCreateWithoutSubmissionInput[] | FeedbackUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutSubmissionInput | FeedbackCreateOrConnectWithoutSubmissionInput[]
    createMany?: FeedbackCreateManySubmissionInputEnvelope
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSubmissionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubmissionStatus
  }

  export type ProjectUpdateOneWithoutSubmissionsNestedInput = {
    create?: XOR<ProjectCreateWithoutSubmissionsInput, ProjectUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutSubmissionsInput
    upsert?: ProjectUpsertWithoutSubmissionsInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutSubmissionsInput, ProjectUpdateWithoutSubmissionsInput>, ProjectUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProjectAssignmentUpdateOneWithoutSubmissionsNestedInput = {
    create?: XOR<ProjectAssignmentCreateWithoutSubmissionsInput, ProjectAssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: ProjectAssignmentCreateOrConnectWithoutSubmissionsInput
    upsert?: ProjectAssignmentUpsertWithoutSubmissionsInput
    disconnect?: ProjectAssignmentWhereInput | boolean
    delete?: ProjectAssignmentWhereInput | boolean
    connect?: ProjectAssignmentWhereUniqueInput
    update?: XOR<XOR<ProjectAssignmentUpdateToOneWithWhereWithoutSubmissionsInput, ProjectAssignmentUpdateWithoutSubmissionsInput>, ProjectAssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type FeedbackUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput> | FeedbackCreateWithoutSubmissionInput[] | FeedbackUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutSubmissionInput | FeedbackCreateOrConnectWithoutSubmissionInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutSubmissionInput | FeedbackUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: FeedbackCreateManySubmissionInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutSubmissionInput | FeedbackUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutSubmissionInput | FeedbackUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type FeedbackUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput> | FeedbackCreateWithoutSubmissionInput[] | FeedbackUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: FeedbackCreateOrConnectWithoutSubmissionInput | FeedbackCreateOrConnectWithoutSubmissionInput[]
    upsert?: FeedbackUpsertWithWhereUniqueWithoutSubmissionInput | FeedbackUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: FeedbackCreateManySubmissionInputEnvelope
    set?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    disconnect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    delete?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    connect?: FeedbackWhereUniqueInput | FeedbackWhereUniqueInput[]
    update?: FeedbackUpdateWithWhereUniqueWithoutSubmissionInput | FeedbackUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: FeedbackUpdateManyWithWhereWithoutSubmissionInput | FeedbackUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
  }

  export type SubmissionCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<SubmissionCreateWithoutFeedbacksInput, SubmissionUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutFeedbacksInput
    connect?: SubmissionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedbacksInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFeedbackPriorityFieldUpdateOperationsInput = {
    set?: $Enums.FeedbackPriority
  }

  export type EnumFeedbackStatusFieldUpdateOperationsInput = {
    set?: $Enums.FeedbackStatus
  }

  export type SubmissionUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<SubmissionCreateWithoutFeedbacksInput, SubmissionUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: SubmissionCreateOrConnectWithoutFeedbacksInput
    upsert?: SubmissionUpsertWithoutFeedbacksInput
    connect?: SubmissionWhereUniqueInput
    update?: XOR<XOR<SubmissionUpdateToOneWithWhereWithoutFeedbacksInput, SubmissionUpdateWithoutFeedbacksInput>, SubmissionUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateOneRequiredWithoutFeedbacksNestedInput = {
    create?: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedbacksInput
    upsert?: UserUpsertWithoutFeedbacksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedbacksInput, UserUpdateWithoutFeedbacksInput>, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserCreateNestedOneWithoutSettlementsInput = {
    create?: XOR<UserCreateWithoutSettlementsInput, UserUncheckedCreateWithoutSettlementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettlementsInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumSettlementTypeFieldUpdateOperationsInput = {
    set?: $Enums.SettlementType
  }

  export type NullableEnumSettlementRoundFieldUpdateOperationsInput = {
    set?: $Enums.SettlementRound | null
  }

  export type EnumSettlementStatusFieldUpdateOperationsInput = {
    set?: $Enums.SettlementStatus
  }

  export type UserUpdateOneRequiredWithoutSettlementsNestedInput = {
    create?: XOR<UserCreateWithoutSettlementsInput, UserUncheckedCreateWithoutSettlementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettlementsInput
    upsert?: UserUpsertWithoutSettlementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettlementsInput, UserUpdateWithoutSettlementsInput>, UserUncheckedUpdateWithoutSettlementsInput>
  }

  export type CampaignCreateplatformInput = {
    set: string[]
  }

  export type CampaignUpdateplatformInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumCampaignStatusFieldUpdateOperationsInput = {
    set?: $Enums.CampaignStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAssignmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentType | EnumAssignmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentTypeFilter<$PrismaModel> | $Enums.AssignmentType
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumAssignmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentType | EnumAssignmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentType[] | ListEnumAssignmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAssignmentTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumProjectStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusFilter<$PrismaModel> | $Enums.ProjectStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectStatus | EnumProjectStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProjectStatus[] | ListEnumProjectStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProjectStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProjectStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProjectStatusFilter<$PrismaModel>
    _max?: NestedEnumProjectStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubmissionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusFilter<$PrismaModel> | $Enums.SubmissionStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubmissionStatus | EnumSubmissionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubmissionStatus[] | ListEnumSubmissionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubmissionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubmissionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubmissionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubmissionStatusFilter<$PrismaModel>
  }

  export type NestedEnumFeedbackPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackPriority | EnumFeedbackPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackPriorityFilter<$PrismaModel> | $Enums.FeedbackPriority
  }

  export type NestedEnumFeedbackStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackStatus | EnumFeedbackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackStatusFilter<$PrismaModel> | $Enums.FeedbackStatus
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumFeedbackPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackPriority | EnumFeedbackPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackPriority[] | ListEnumFeedbackPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackPriorityWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackPriorityFilter<$PrismaModel>
    _max?: NestedEnumFeedbackPriorityFilter<$PrismaModel>
  }

  export type NestedEnumFeedbackStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeedbackStatus | EnumFeedbackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeedbackStatus[] | ListEnumFeedbackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFeedbackStatusWithAggregatesFilter<$PrismaModel> | $Enums.FeedbackStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeedbackStatusFilter<$PrismaModel>
    _max?: NestedEnumFeedbackStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumSettlementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementType | EnumSettlementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementTypeFilter<$PrismaModel> | $Enums.SettlementType
  }

  export type NestedEnumSettlementRoundNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementRound | EnumSettlementRoundFieldRefInput<$PrismaModel> | null
    in?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSettlementRoundNullableFilter<$PrismaModel> | $Enums.SettlementRound | null
  }

  export type NestedEnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumSettlementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementType | EnumSettlementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementType[] | ListEnumSettlementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementTypeWithAggregatesFilter<$PrismaModel> | $Enums.SettlementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementTypeFilter<$PrismaModel>
    _max?: NestedEnumSettlementTypeFilter<$PrismaModel>
  }

  export type NestedEnumSettlementRoundNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementRound | EnumSettlementRoundFieldRefInput<$PrismaModel> | null
    in?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SettlementRound[] | ListEnumSettlementRoundFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSettlementRoundNullableWithAggregatesFilter<$PrismaModel> | $Enums.SettlementRound | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSettlementRoundNullableFilter<$PrismaModel>
    _max?: NestedEnumSettlementRoundNullableFilter<$PrismaModel>
  }

  export type NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
  }

  export type NestedEnumCampaignStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusFilter<$PrismaModel> | $Enums.CampaignStatus
  }

  export type NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CampaignStatus | EnumCampaignStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CampaignStatus[] | ListEnumCampaignStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCampaignStatusWithAggregatesFilter<$PrismaModel> | $Enums.CampaignStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCampaignStatusFilter<$PrismaModel>
    _max?: NestedEnumCampaignStatusFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignees?: UserCreateNestedManyWithoutAssignedProjectsInput
    submissions?: SubmissionCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignees?: UserUncheckedCreateNestedManyWithoutAssignedProjectsInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput>
  }

  export type ProjectCreateManyOwnerInputEnvelope = {
    data: ProjectCreateManyOwnerInput | ProjectCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutAssigneesInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedProjectsInput
    submissions?: SubmissionCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAssigneesInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAssigneesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput>
  }

  export type SubmissionCreateWithoutUserInput = {
    id?: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutSubmissionsInput
    assignment?: ProjectAssignmentCreateNestedOneWithoutSubmissionsInput
    feedbacks?: FeedbackCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    projectId?: string | null
    assignmentId?: string | null
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionCreateManyUserInputEnvelope = {
    data: SubmissionCreateManyUserInput | SubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackCreateWithoutUserInput = {
    id?: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    submission: SubmissionCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutUserInput = {
    id?: string
    submissionId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackCreateManyUserInputEnvelope = {
    data: FeedbackCreateManyUserInput | FeedbackCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SettlementCreateWithoutUserInput = {
    id?: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettlementUncheckedCreateWithoutUserInput = {
    id?: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettlementCreateOrConnectWithoutUserInput = {
    where: SettlementWhereUniqueInput
    create: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput>
  }

  export type SettlementCreateManyUserInputEnvelope = {
    data: SettlementCreateManyUserInput | SettlementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectRequestCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ProjectAssignmentCreateNestedManyWithoutRequestInput
  }

  export type ProjectRequestUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutRequestInput
  }

  export type ProjectRequestCreateOrConnectWithoutCreatedByInput = {
    where: ProjectRequestWhereUniqueInput
    create: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectRequestCreateManyCreatedByInputEnvelope = {
    data: ProjectRequestCreateManyCreatedByInput | ProjectRequestCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectAssignmentCreateWithoutFreelancerInput = {
    id?: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    request: ProjectRequestCreateNestedOneWithoutAssignmentsInput
    submissions?: SubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentUncheckedCreateWithoutFreelancerInput = {
    id?: string
    requestId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentCreateOrConnectWithoutFreelancerInput = {
    where: ProjectAssignmentWhereUniqueInput
    create: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput>
  }

  export type ProjectAssignmentCreateManyFreelancerInputEnvelope = {
    data: ProjectAssignmentCreateManyFreelancerInput | ProjectAssignmentCreateManyFreelancerInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutOwnerInput, ProjectUncheckedUpdateWithoutOwnerInput>
    create: XOR<ProjectCreateWithoutOwnerInput, ProjectUncheckedCreateWithoutOwnerInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutOwnerInput, ProjectUncheckedUpdateWithoutOwnerInput>
  }

  export type ProjectUpdateManyWithWhereWithoutOwnerInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus
    deadline?: DateTimeNullableFilter<"Project"> | Date | string | null
    budget?: DecimalNullableFilter<"Project"> | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutAssigneesInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutAssigneesInput, ProjectUncheckedUpdateWithoutAssigneesInput>
    create: XOR<ProjectCreateWithoutAssigneesInput, ProjectUncheckedCreateWithoutAssigneesInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutAssigneesInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutAssigneesInput, ProjectUncheckedUpdateWithoutAssigneesInput>
  }

  export type ProjectUpdateManyWithWhereWithoutAssigneesInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutAssigneesInput>
  }

  export type SubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<SubmissionCreateWithoutUserInput, SubmissionUncheckedCreateWithoutUserInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutUserInput, SubmissionUncheckedUpdateWithoutUserInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutUserInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubmissionScalarWhereInput = {
    AND?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    OR?: SubmissionScalarWhereInput[]
    NOT?: SubmissionScalarWhereInput | SubmissionScalarWhereInput[]
    id?: StringFilter<"Submission"> | string
    projectId?: StringNullableFilter<"Submission"> | string | null
    assignmentId?: StringNullableFilter<"Submission"> | string | null
    userId?: StringFilter<"Submission"> | string
    versionSlot?: IntFilter<"Submission"> | number
    versionTitle?: StringNullableFilter<"Submission"> | string | null
    version?: IntFilter<"Submission"> | number
    videoUrl?: StringFilter<"Submission"> | string
    fileKey?: StringNullableFilter<"Submission"> | string | null
    duration?: IntNullableFilter<"Submission"> | number | null
    thumbnailUrl?: StringNullableFilter<"Submission"> | string | null
    status?: EnumSubmissionStatusFilter<"Submission"> | $Enums.SubmissionStatus
    notes?: StringNullableFilter<"Submission"> | string | null
    createdAt?: DateTimeFilter<"Submission"> | Date | string
    updatedAt?: DateTimeFilter<"Submission"> | Date | string
  }

  export type FeedbackUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
    create: XOR<FeedbackCreateWithoutUserInput, FeedbackUncheckedCreateWithoutUserInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutUserInput, FeedbackUncheckedUpdateWithoutUserInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutUserInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedbackScalarWhereInput = {
    AND?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    OR?: FeedbackScalarWhereInput[]
    NOT?: FeedbackScalarWhereInput | FeedbackScalarWhereInput[]
    id?: StringFilter<"Feedback"> | string
    submissionId?: StringFilter<"Feedback"> | string
    userId?: StringFilter<"Feedback"> | string
    startTime?: FloatNullableFilter<"Feedback"> | number | null
    endTime?: FloatNullableFilter<"Feedback"> | number | null
    timestamp?: FloatNullableFilter<"Feedback"> | number | null
    feedbackType?: StringNullableFilter<"Feedback"> | string | null
    content?: StringFilter<"Feedback"> | string
    priority?: EnumFeedbackPriorityFilter<"Feedback"> | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFilter<"Feedback"> | $Enums.FeedbackStatus
    annotations?: JsonNullableFilter<"Feedback">
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
    updatedAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type SettlementUpsertWithWhereUniqueWithoutUserInput = {
    where: SettlementWhereUniqueInput
    update: XOR<SettlementUpdateWithoutUserInput, SettlementUncheckedUpdateWithoutUserInput>
    create: XOR<SettlementCreateWithoutUserInput, SettlementUncheckedCreateWithoutUserInput>
  }

  export type SettlementUpdateWithWhereUniqueWithoutUserInput = {
    where: SettlementWhereUniqueInput
    data: XOR<SettlementUpdateWithoutUserInput, SettlementUncheckedUpdateWithoutUserInput>
  }

  export type SettlementUpdateManyWithWhereWithoutUserInput = {
    where: SettlementScalarWhereInput
    data: XOR<SettlementUpdateManyMutationInput, SettlementUncheckedUpdateManyWithoutUserInput>
  }

  export type SettlementScalarWhereInput = {
    AND?: SettlementScalarWhereInput | SettlementScalarWhereInput[]
    OR?: SettlementScalarWhereInput[]
    NOT?: SettlementScalarWhereInput | SettlementScalarWhereInput[]
    id?: StringFilter<"Settlement"> | string
    userId?: StringFilter<"Settlement"> | string
    submissionId?: StringNullableFilter<"Settlement"> | string | null
    amount?: DecimalFilter<"Settlement"> | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFilter<"Settlement"> | $Enums.SettlementType
    settlementRound?: EnumSettlementRoundNullableFilter<"Settlement"> | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFilter<"Settlement"> | $Enums.SettlementStatus
    description?: StringNullableFilter<"Settlement"> | string | null
    quarterYear?: IntNullableFilter<"Settlement"> | number | null
    quarterNumber?: IntNullableFilter<"Settlement"> | number | null
    processedAt?: DateTimeNullableFilter<"Settlement"> | Date | string | null
    createdAt?: DateTimeFilter<"Settlement"> | Date | string
    updatedAt?: DateTimeFilter<"Settlement"> | Date | string
  }

  export type ProjectRequestUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectRequestWhereUniqueInput
    update: XOR<ProjectRequestUpdateWithoutCreatedByInput, ProjectRequestUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ProjectRequestCreateWithoutCreatedByInput, ProjectRequestUncheckedCreateWithoutCreatedByInput>
  }

  export type ProjectRequestUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ProjectRequestWhereUniqueInput
    data: XOR<ProjectRequestUpdateWithoutCreatedByInput, ProjectRequestUncheckedUpdateWithoutCreatedByInput>
  }

  export type ProjectRequestUpdateManyWithWhereWithoutCreatedByInput = {
    where: ProjectRequestScalarWhereInput
    data: XOR<ProjectRequestUpdateManyMutationInput, ProjectRequestUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ProjectRequestScalarWhereInput = {
    AND?: ProjectRequestScalarWhereInput | ProjectRequestScalarWhereInput[]
    OR?: ProjectRequestScalarWhereInput[]
    NOT?: ProjectRequestScalarWhereInput | ProjectRequestScalarWhereInput[]
    id?: StringFilter<"ProjectRequest"> | string
    title?: StringFilter<"ProjectRequest"> | string
    description?: StringNullableFilter<"ProjectRequest"> | string | null
    categories?: StringNullableListFilter<"ProjectRequest">
    deadline?: DateTimeFilter<"ProjectRequest"> | Date | string
    assignmentType?: EnumAssignmentTypeFilter<"ProjectRequest"> | $Enums.AssignmentType
    maxAssignees?: IntFilter<"ProjectRequest"> | number
    currentAssignees?: IntFilter<"ProjectRequest"> | number
    status?: EnumRequestStatusFilter<"ProjectRequest"> | $Enums.RequestStatus
    estimatedBudget?: DecimalNullableFilter<"ProjectRequest"> | Decimal | DecimalJsLike | number | string | null
    requirements?: StringNullableFilter<"ProjectRequest"> | string | null
    referenceUrls?: StringNullableListFilter<"ProjectRequest">
    targetCounselorId?: StringNullableFilter<"ProjectRequest"> | string | null
    createdById?: StringFilter<"ProjectRequest"> | string
    createdAt?: DateTimeFilter<"ProjectRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectRequest"> | Date | string
  }

  export type ProjectAssignmentUpsertWithWhereUniqueWithoutFreelancerInput = {
    where: ProjectAssignmentWhereUniqueInput
    update: XOR<ProjectAssignmentUpdateWithoutFreelancerInput, ProjectAssignmentUncheckedUpdateWithoutFreelancerInput>
    create: XOR<ProjectAssignmentCreateWithoutFreelancerInput, ProjectAssignmentUncheckedCreateWithoutFreelancerInput>
  }

  export type ProjectAssignmentUpdateWithWhereUniqueWithoutFreelancerInput = {
    where: ProjectAssignmentWhereUniqueInput
    data: XOR<ProjectAssignmentUpdateWithoutFreelancerInput, ProjectAssignmentUncheckedUpdateWithoutFreelancerInput>
  }

  export type ProjectAssignmentUpdateManyWithWhereWithoutFreelancerInput = {
    where: ProjectAssignmentScalarWhereInput
    data: XOR<ProjectAssignmentUpdateManyMutationInput, ProjectAssignmentUncheckedUpdateManyWithoutFreelancerInput>
  }

  export type ProjectAssignmentScalarWhereInput = {
    AND?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
    OR?: ProjectAssignmentScalarWhereInput[]
    NOT?: ProjectAssignmentScalarWhereInput | ProjectAssignmentScalarWhereInput[]
    id?: StringFilter<"ProjectAssignment"> | string
    requestId?: StringFilter<"ProjectAssignment"> | string
    freelancerId?: StringFilter<"ProjectAssignment"> | string
    acceptedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    status?: EnumAssignmentStatusFilter<"ProjectAssignment"> | $Enums.AssignmentStatus
    createdAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"ProjectAssignment"> | Date | string
  }

  export type UserCreateWithoutCreatedRequestsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutCreatedRequestsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutCreatedRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedRequestsInput, UserUncheckedCreateWithoutCreatedRequestsInput>
  }

  export type ProjectAssignmentCreateWithoutRequestInput = {
    id?: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    freelancer: UserCreateNestedOneWithoutAssignmentsInput
    submissions?: SubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentUncheckedCreateWithoutRequestInput = {
    id?: string
    freelancerId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: SubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type ProjectAssignmentCreateOrConnectWithoutRequestInput = {
    where: ProjectAssignmentWhereUniqueInput
    create: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput>
  }

  export type ProjectAssignmentCreateManyRequestInputEnvelope = {
    data: ProjectAssignmentCreateManyRequestInput | ProjectAssignmentCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedRequestsInput = {
    update: XOR<UserUpdateWithoutCreatedRequestsInput, UserUncheckedUpdateWithoutCreatedRequestsInput>
    create: XOR<UserCreateWithoutCreatedRequestsInput, UserUncheckedCreateWithoutCreatedRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedRequestsInput, UserUncheckedUpdateWithoutCreatedRequestsInput>
  }

  export type UserUpdateWithoutCreatedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type ProjectAssignmentUpsertWithWhereUniqueWithoutRequestInput = {
    where: ProjectAssignmentWhereUniqueInput
    update: XOR<ProjectAssignmentUpdateWithoutRequestInput, ProjectAssignmentUncheckedUpdateWithoutRequestInput>
    create: XOR<ProjectAssignmentCreateWithoutRequestInput, ProjectAssignmentUncheckedCreateWithoutRequestInput>
  }

  export type ProjectAssignmentUpdateWithWhereUniqueWithoutRequestInput = {
    where: ProjectAssignmentWhereUniqueInput
    data: XOR<ProjectAssignmentUpdateWithoutRequestInput, ProjectAssignmentUncheckedUpdateWithoutRequestInput>
  }

  export type ProjectAssignmentUpdateManyWithWhereWithoutRequestInput = {
    where: ProjectAssignmentScalarWhereInput
    data: XOR<ProjectAssignmentUpdateManyMutationInput, ProjectAssignmentUncheckedUpdateManyWithoutRequestInput>
  }

  export type ProjectRequestCreateWithoutAssignmentsInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutCreatedRequestsInput
  }

  export type ProjectRequestUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectRequestCreateOrConnectWithoutAssignmentsInput = {
    where: ProjectRequestWhereUniqueInput
    create: XOR<ProjectRequestCreateWithoutAssignmentsInput, ProjectRequestUncheckedCreateWithoutAssignmentsInput>
  }

  export type UserCreateWithoutAssignmentsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAssignmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
  }

  export type SubmissionCreateWithoutAssignmentInput = {
    id?: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
    feedbacks?: FeedbackCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutAssignmentInput = {
    id?: string
    projectId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type SubmissionCreateManyAssignmentInputEnvelope = {
    data: SubmissionCreateManyAssignmentInput | SubmissionCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type ProjectRequestUpsertWithoutAssignmentsInput = {
    update: XOR<ProjectRequestUpdateWithoutAssignmentsInput, ProjectRequestUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ProjectRequestCreateWithoutAssignmentsInput, ProjectRequestUncheckedCreateWithoutAssignmentsInput>
    where?: ProjectRequestWhereInput
  }

  export type ProjectRequestUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ProjectRequestWhereInput
    data: XOR<ProjectRequestUpdateWithoutAssignmentsInput, ProjectRequestUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ProjectRequestUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutCreatedRequestsNestedInput
  }

  export type ProjectRequestUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAssignmentsInput = {
    update: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<UserCreateWithoutAssignmentsInput, UserUncheckedCreateWithoutAssignmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignmentsInput, UserUncheckedUpdateWithoutAssignmentsInput>
  }

  export type UserUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type SubmissionUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutAssignmentInput, SubmissionUncheckedUpdateWithoutAssignmentInput>
    create: XOR<SubmissionCreateWithoutAssignmentInput, SubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutAssignmentInput, SubmissionUncheckedUpdateWithoutAssignmentInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutAssignmentInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type UserCreateWithoutOwnedProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutOwnedProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutOwnedProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedProjectsInput, UserUncheckedCreateWithoutOwnedProjectsInput>
  }

  export type UserCreateWithoutAssignedProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutAssignedProjectsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutAssignedProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput>
  }

  export type SubmissionCreateWithoutProjectInput = {
    id?: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignment?: ProjectAssignmentCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
    feedbacks?: FeedbackCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionUncheckedCreateWithoutProjectInput = {
    id?: string
    assignmentId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type SubmissionCreateOrConnectWithoutProjectInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput>
  }

  export type SubmissionCreateManyProjectInputEnvelope = {
    data: SubmissionCreateManyProjectInput | SubmissionCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedProjectsInput = {
    update: XOR<UserUpdateWithoutOwnedProjectsInput, UserUncheckedUpdateWithoutOwnedProjectsInput>
    create: XOR<UserCreateWithoutOwnedProjectsInput, UserUncheckedCreateWithoutOwnedProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedProjectsInput, UserUncheckedUpdateWithoutOwnedProjectsInput>
  }

  export type UserUpdateWithoutOwnedProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutAssignedProjectsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAssignedProjectsInput, UserUncheckedUpdateWithoutAssignedProjectsInput>
    create: XOR<UserCreateWithoutAssignedProjectsInput, UserUncheckedCreateWithoutAssignedProjectsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAssignedProjectsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAssignedProjectsInput, UserUncheckedUpdateWithoutAssignedProjectsInput>
  }

  export type UserUpdateManyWithWhereWithoutAssignedProjectsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAssignedProjectsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    profileImage?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type SubmissionUpsertWithWhereUniqueWithoutProjectInput = {
    where: SubmissionWhereUniqueInput
    update: XOR<SubmissionUpdateWithoutProjectInput, SubmissionUncheckedUpdateWithoutProjectInput>
    create: XOR<SubmissionCreateWithoutProjectInput, SubmissionUncheckedCreateWithoutProjectInput>
  }

  export type SubmissionUpdateWithWhereUniqueWithoutProjectInput = {
    where: SubmissionWhereUniqueInput
    data: XOR<SubmissionUpdateWithoutProjectInput, SubmissionUncheckedUpdateWithoutProjectInput>
  }

  export type SubmissionUpdateManyWithWhereWithoutProjectInput = {
    where: SubmissionScalarWhereInput
    data: XOR<SubmissionUpdateManyMutationInput, SubmissionUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutSubmissionsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedProjectsInput
    assignees?: UserCreateNestedManyWithoutAssignedProjectsInput
  }

  export type ProjectUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    ownerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignees?: UserUncheckedCreateNestedManyWithoutAssignedProjectsInput
  }

  export type ProjectCreateOrConnectWithoutSubmissionsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutSubmissionsInput, ProjectUncheckedCreateWithoutSubmissionsInput>
  }

  export type ProjectAssignmentCreateWithoutSubmissionsInput = {
    id?: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    request: ProjectRequestCreateNestedOneWithoutAssignmentsInput
    freelancer: UserCreateNestedOneWithoutAssignmentsInput
  }

  export type ProjectAssignmentUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    requestId: string
    freelancerId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectAssignmentCreateOrConnectWithoutSubmissionsInput = {
    where: ProjectAssignmentWhereUniqueInput
    create: XOR<ProjectAssignmentCreateWithoutSubmissionsInput, ProjectAssignmentUncheckedCreateWithoutSubmissionsInput>
  }

  export type UserCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type FeedbackCreateWithoutSubmissionInput = {
    id?: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFeedbacksInput
  }

  export type FeedbackUncheckedCreateWithoutSubmissionInput = {
    id?: string
    userId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateOrConnectWithoutSubmissionInput = {
    where: FeedbackWhereUniqueInput
    create: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput>
  }

  export type FeedbackCreateManySubmissionInputEnvelope = {
    data: FeedbackCreateManySubmissionInput | FeedbackCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutSubmissionsInput = {
    update: XOR<ProjectUpdateWithoutSubmissionsInput, ProjectUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<ProjectCreateWithoutSubmissionsInput, ProjectUncheckedCreateWithoutSubmissionsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutSubmissionsInput, ProjectUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProjectUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedProjectsNestedInput
    assignees?: UserUpdateManyWithoutAssignedProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignees?: UserUncheckedUpdateManyWithoutAssignedProjectsNestedInput
  }

  export type ProjectAssignmentUpsertWithoutSubmissionsInput = {
    update: XOR<ProjectAssignmentUpdateWithoutSubmissionsInput, ProjectAssignmentUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<ProjectAssignmentCreateWithoutSubmissionsInput, ProjectAssignmentUncheckedCreateWithoutSubmissionsInput>
    where?: ProjectAssignmentWhereInput
  }

  export type ProjectAssignmentUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: ProjectAssignmentWhereInput
    data: XOR<ProjectAssignmentUpdateWithoutSubmissionsInput, ProjectAssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProjectAssignmentUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: ProjectRequestUpdateOneRequiredWithoutAssignmentsNestedInput
    freelancer?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type FeedbackUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: FeedbackWhereUniqueInput
    update: XOR<FeedbackUpdateWithoutSubmissionInput, FeedbackUncheckedUpdateWithoutSubmissionInput>
    create: XOR<FeedbackCreateWithoutSubmissionInput, FeedbackUncheckedCreateWithoutSubmissionInput>
  }

  export type FeedbackUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: FeedbackWhereUniqueInput
    data: XOR<FeedbackUpdateWithoutSubmissionInput, FeedbackUncheckedUpdateWithoutSubmissionInput>
  }

  export type FeedbackUpdateManyWithWhereWithoutSubmissionInput = {
    where: FeedbackScalarWhereInput
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type SubmissionCreateWithoutFeedbacksInput = {
    id?: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project?: ProjectCreateNestedOneWithoutSubmissionsInput
    assignment?: ProjectAssignmentCreateNestedOneWithoutSubmissionsInput
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type SubmissionUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    projectId?: string | null
    assignmentId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateOrConnectWithoutFeedbacksInput = {
    where: SubmissionWhereUniqueInput
    create: XOR<SubmissionCreateWithoutFeedbacksInput, SubmissionUncheckedCreateWithoutFeedbacksInput>
  }

  export type UserCreateWithoutFeedbacksInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    settlements?: SettlementCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutFeedbacksInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    settlements?: SettlementUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutFeedbacksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
  }

  export type SubmissionUpsertWithoutFeedbacksInput = {
    update: XOR<SubmissionUpdateWithoutFeedbacksInput, SubmissionUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<SubmissionCreateWithoutFeedbacksInput, SubmissionUncheckedCreateWithoutFeedbacksInput>
    where?: SubmissionWhereInput
  }

  export type SubmissionUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: SubmissionWhereInput
    data: XOR<SubmissionUpdateWithoutFeedbacksInput, SubmissionUncheckedUpdateWithoutFeedbacksInput>
  }

  export type SubmissionUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutSubmissionsNestedInput
    assignment?: ProjectAssignmentUpdateOneWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutFeedbacksInput = {
    update: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
    create: XOR<UserCreateWithoutFeedbacksInput, UserUncheckedCreateWithoutFeedbacksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedbacksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedbacksInput, UserUncheckedUpdateWithoutFeedbacksInput>
  }

  export type UserUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedbacksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserCreateWithoutSettlementsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentCreateNestedManyWithoutFreelancerInput
  }

  export type UserUncheckedCreateWithoutSettlementsInput = {
    id?: string
    email: string
    name: string
    password: string
    phone?: string | null
    role?: $Enums.UserRole
    profileImage?: string | null
    bio?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedProjects?: ProjectUncheckedCreateNestedManyWithoutOwnerInput
    assignedProjects?: ProjectUncheckedCreateNestedManyWithoutAssigneesInput
    submissions?: SubmissionUncheckedCreateNestedManyWithoutUserInput
    feedbacks?: FeedbackUncheckedCreateNestedManyWithoutUserInput
    createdRequests?: ProjectRequestUncheckedCreateNestedManyWithoutCreatedByInput
    assignments?: ProjectAssignmentUncheckedCreateNestedManyWithoutFreelancerInput
  }

  export type UserCreateOrConnectWithoutSettlementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettlementsInput, UserUncheckedCreateWithoutSettlementsInput>
  }

  export type UserUpsertWithoutSettlementsInput = {
    update: XOR<UserUpdateWithoutSettlementsInput, UserUncheckedUpdateWithoutSettlementsInput>
    create: XOR<UserCreateWithoutSettlementsInput, UserUncheckedCreateWithoutSettlementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettlementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettlementsInput, UserUncheckedUpdateWithoutSettlementsInput>
  }

  export type UserUpdateWithoutSettlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutSettlementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    assignedProjects?: ProjectUncheckedUpdateManyWithoutAssigneesNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type ProjectCreateManyOwnerInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ProjectStatus
    deadline?: Date | string | null
    budget?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionCreateManyUserInput = {
    id?: string
    projectId?: string | null
    assignmentId?: string | null
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackCreateManyUserInput = {
    id?: string
    submissionId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettlementCreateManyUserInput = {
    id?: string
    submissionId?: string | null
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.SettlementType
    settlementRound?: $Enums.SettlementRound | null
    status?: $Enums.SettlementStatus
    description?: string | null
    quarterYear?: number | null
    quarterNumber?: number | null
    processedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectRequestCreateManyCreatedByInput = {
    id?: string
    title: string
    description?: string | null
    categories?: ProjectRequestCreatecategoriesInput | string[]
    deadline: Date | string
    assignmentType?: $Enums.AssignmentType
    maxAssignees?: number
    currentAssignees?: number
    status?: $Enums.RequestStatus
    estimatedBudget?: Decimal | DecimalJsLike | number | string | null
    requirements?: string | null
    referenceUrls?: ProjectRequestCreatereferenceUrlsInput | string[]
    targetCounselorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectAssignmentCreateManyFreelancerInput = {
    id?: string
    requestId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignees?: UserUpdateManyWithoutAssignedProjectsNestedInput
    submissions?: SubmissionUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignees?: UserUncheckedUpdateManyWithoutAssignedProjectsNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutAssigneesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedProjectsNestedInput
    submissions?: SubmissionUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAssigneesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutAssigneesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    budget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutSubmissionsNestedInput
    assignment?: ProjectAssignmentUpdateOneWithoutSubmissionsNestedInput
    feedbacks?: FeedbackUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: SubmissionUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumSettlementTypeFieldUpdateOperationsInput | $Enums.SettlementType
    settlementRound?: NullableEnumSettlementRoundFieldUpdateOperationsInput | $Enums.SettlementRound | null
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    quarterYear?: NullableIntFieldUpdateOperationsInput | number | null
    quarterNumber?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectRequestUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ProjectAssignmentUpdateManyWithoutRequestNestedInput
  }

  export type ProjectRequestUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type ProjectRequestUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    categories?: ProjectRequestUpdatecategoriesInput | string[]
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    assignmentType?: EnumAssignmentTypeFieldUpdateOperationsInput | $Enums.AssignmentType
    maxAssignees?: IntFieldUpdateOperationsInput | number
    currentAssignees?: IntFieldUpdateOperationsInput | number
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    estimatedBudget?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    requirements?: NullableStringFieldUpdateOperationsInput | string | null
    referenceUrls?: ProjectRequestUpdatereferenceUrlsInput | string[]
    targetCounselorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectAssignmentUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: ProjectRequestUpdateOneRequiredWithoutAssignmentsNestedInput
    submissions?: SubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateManyWithoutFreelancerInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectAssignmentCreateManyRequestInput = {
    id?: string
    freelancerId: string
    acceptedAt?: Date | string
    status?: $Enums.AssignmentStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectAssignmentUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    freelancer?: UserUpdateOneRequiredWithoutAssignmentsNestedInput
    submissions?: SubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: SubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProjectAssignmentUncheckedUpdateManyWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    freelancerId?: StringFieldUpdateOperationsInput | string
    acceptedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyAssignmentInput = {
    id?: string
    projectId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubmissionUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    feedbacks?: FeedbackUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionCreateManyProjectInput = {
    id?: string
    assignmentId?: string | null
    userId: string
    versionSlot?: number
    versionTitle?: string | null
    version?: number
    videoUrl: string
    fileKey?: string | null
    duration?: number | null
    thumbnailUrl?: string | null
    status?: $Enums.SubmissionStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutAssignedProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUpdateManyWithoutOwnerNestedInput
    submissions?: SubmissionUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUpdateManyWithoutUserNestedInput
    settlements?: SettlementUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedProjects?: ProjectUncheckedUpdateManyWithoutOwnerNestedInput
    submissions?: SubmissionUncheckedUpdateManyWithoutUserNestedInput
    feedbacks?: FeedbackUncheckedUpdateManyWithoutUserNestedInput
    settlements?: SettlementUncheckedUpdateManyWithoutUserNestedInput
    createdRequests?: ProjectRequestUncheckedUpdateManyWithoutCreatedByNestedInput
    assignments?: ProjectAssignmentUncheckedUpdateManyWithoutFreelancerNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAssignedProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubmissionUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignment?: ProjectAssignmentUpdateOneWithoutSubmissionsNestedInput
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    feedbacks?: FeedbackUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedbacks?: FeedbackUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type SubmissionUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    assignmentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    versionSlot?: IntFieldUpdateOperationsInput | number
    versionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    videoUrl?: StringFieldUpdateOperationsInput | string
    fileKey?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSubmissionStatusFieldUpdateOperationsInput | $Enums.SubmissionStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManySubmissionInput = {
    id?: string
    userId: string
    startTime?: number | null
    endTime?: number | null
    timestamp?: number | null
    feedbackType?: string | null
    content: string
    priority?: $Enums.FeedbackPriority
    status?: $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFeedbacksNestedInput
  }

  export type FeedbackUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startTime?: NullableFloatFieldUpdateOperationsInput | number | null
    endTime?: NullableFloatFieldUpdateOperationsInput | number | null
    timestamp?: NullableFloatFieldUpdateOperationsInput | number | null
    feedbackType?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    priority?: EnumFeedbackPriorityFieldUpdateOperationsInput | $Enums.FeedbackPriority
    status?: EnumFeedbackStatusFieldUpdateOperationsInput | $Enums.FeedbackStatus
    annotations?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}