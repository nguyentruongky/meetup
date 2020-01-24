import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export class Card {
   __typename?: 'Card';
  id: Scalars['String'];
  last4: Scalars['String'];
  type: Scalars['String'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
};

export class ClubAttendanceResult {
   __typename?: 'ClubAttendanceResult';
  status: ClubAttendanceStatus;
  errorMessage?: Maybe<Scalars['String']>;
};

/** ENUM */
export enum ClubAttendanceStatus {
  Success = 'success',
  Fail = 'fail',
  NeedPaymentSource = 'needPaymentSource'
}

/** INPUT */
export class CreateClubInput {
  title: Scalars['String'];
  host?: Maybe<Array<Maybe<Scalars['String']>>>;
  description: Scalars['String'];
  location: MLocationInput;
  slotCount: Scalars['Float'];
  frequency: Frequency;
  fee?: Maybe<FeeInput>;
  coverImageUrl?: Maybe<Scalars['String']>;
};

export class EnrollInput {
  cardId: Scalars['String'];
  feeTierId: Scalars['String'];
};

export class EnrollOutput {
   __typename?: 'EnrollOutput';
  error?: Maybe<Scalars['String']>;
  cardId: Scalars['String'];
  fee: Fee;
  enrollId: Scalars['String'];
  createdAt: Scalars['Float'];
};

export class Fee {
   __typename?: 'Fee';
  id: Scalars['String'];
  clubId: Scalars['String'];
  amount: Scalars['Float'];
  currency: Scalars['String'];
  tierId: Scalars['String'];
  tierDescription?: Maybe<Scalars['String']>;
};

export class FeeInput {
  /** Leave clubId null while create new club */
  clubId?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  /** Default is USD */
  currency?: Maybe<Scalars['String']>;
  /** Descriptive name to remember yourself. For instance: 3mon, 1yr */
  tierId?: Maybe<Scalars['String']>;
  tierDescription?: Maybe<Scalars['String']>;
};

export enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Biweekly = 'biweekly',
  Monthly = 'monthly'
}

/** TYPE */
export class MClub {
   __typename?: 'MClub';
  id: Scalars['String'];
  title: Scalars['String'];
  host: Array<Maybe<MUser>>;
  description: Scalars['String'];
  attendees?: Maybe<Array<Maybe<MUser>>>;
  location: MLocation;
  slotCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Float']>;
  frequency: Frequency;
  coverImageUrl?: Maybe<Scalars['String']>;
  fee?: Maybe<Fee>;
};

export class MLocation {
   __typename?: 'MLocation';
  address?: Maybe<Scalars['String']>;
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  locationNotes?: Maybe<Scalars['String']>;
};

export class MLocationInput {
  address?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  long: Scalars['Float'];
  locationNotes?: Maybe<Scalars['String']>;
};

export class MTime {
   __typename?: 'MTime';
  startAt?: Maybe<Scalars['Float']>;
  endAt?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  timeNotes?: Maybe<Scalars['String']>;
};

export class MTimeInput {
  startAt: Scalars['Float'];
  endAt: Scalars['Float'];
  duration?: Maybe<Scalars['Float']>;
  timeNotes?: Maybe<Scalars['String']>;
};

/** TYPE: Type Definition */
export class MUser {
   __typename?: 'MUser';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  stripeUserId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  cards?: Maybe<Array<Maybe<Card>>>;
  clubs?: Maybe<Array<Maybe<MClub>>>;
};

/** MUTATION */
export class Mutation {
   __typename?: 'Mutation';
  addCard: Scalars['String'];
  addCardByToken: Scalars['String'];
  addFee?: Maybe<Fee>;
  createClub: MClub;
  favorite?: Maybe<Scalars['Boolean']>;
  joinClub: ClubAttendanceResult;
  login?: Maybe<MUser>;
  newPassword?: Maybe<Scalars['String']>;
  patchUser?: Maybe<MUser>;
  quitClub: ClubAttendanceResult;
  register: MUser;
  resetPassword?: Maybe<Scalars['String']>;
};


/** MUTATION */
export type MutationAddCardArgs = {
  number: Scalars['String'],
  expMonth: Scalars['String'],
  expYear: Scalars['String'],
  cvc: Scalars['String']
};


/** MUTATION */
export type MutationAddCardByTokenArgs = {
  token: Scalars['String']
};


/** MUTATION */
export type MutationAddFeeArgs = {
  fee: FeeInput
};


/** MUTATION */
export type MutationCreateClubArgs = {
  input?: Maybe<CreateClubInput>
};


/** MUTATION */
export type MutationFavoriteArgs = {
  clubId: Scalars['String']
};


/** MUTATION */
export type MutationJoinClubArgs = {
  clubId: Scalars['String']
};


/** MUTATION */
export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


/** MUTATION */
export type MutationNewPasswordArgs = {
  code: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


/** MUTATION */
export type MutationPatchUserArgs = {
  input: PatchUserInput
};


/** MUTATION */
export type MutationQuitClubArgs = {
  clubId: Scalars['String']
};


/** MUTATION */
export type MutationRegisterArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


/** MUTATION */
export type MutationResetPasswordArgs = {
  email: Scalars['String']
};

/** INPUT */
export class PatchUserInput {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
};

export class Profile {
   __typename?: 'Profile';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  introduction?: Maybe<Scalars['String']>;
  stripeUserId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Float']>;
  cards?: Maybe<Array<Maybe<Card>>>;
  clubs?: Maybe<Array<Maybe<MClub>>>;
};

/** QUERY */
export class Query {
   __typename?: 'Query';
  cards: Array<Card>;
  club?: Maybe<MClub>;
  clubs?: Maybe<Array<MClub>>;
  me: MUser;
  search?: Maybe<Array<MClub>>;
};


/** QUERY */
export type QueryClubArgs = {
  id: Scalars['String']
};


/** QUERY */
export type QuerySearchArgs = {
  keyword: Scalars['String']
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Card: ResolverTypeWrapper<Card>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  MClub: ResolverTypeWrapper<MClub>,
  MUser: ResolverTypeWrapper<MUser>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  MLocation: ResolverTypeWrapper<MLocation>,
  Frequency: Frequency,
  Fee: ResolverTypeWrapper<Fee>,
  Mutation: ResolverTypeWrapper<{}>,
  FeeInput: FeeInput,
  CreateClubInput: CreateClubInput,
  MLocationInput: MLocationInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ClubAttendanceResult: ResolverTypeWrapper<ClubAttendanceResult>,
  ClubAttendanceStatus: ClubAttendanceStatus,
  PatchUserInput: PatchUserInput,
  EnrollInput: EnrollInput,
  EnrollOutput: ResolverTypeWrapper<EnrollOutput>,
  MTime: ResolverTypeWrapper<MTime>,
  MTimeInput: MTimeInput,
  Profile: ResolverTypeWrapper<Profile>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Card: Card,
  String: Scalars['String'],
  Int: Scalars['Int'],
  MClub: MClub,
  MUser: MUser,
  Float: Scalars['Float'],
  MLocation: MLocation,
  Frequency: Frequency,
  Fee: Fee,
  Mutation: {},
  FeeInput: FeeInput,
  CreateClubInput: CreateClubInput,
  MLocationInput: MLocationInput,
  Boolean: Scalars['Boolean'],
  ClubAttendanceResult: ClubAttendanceResult,
  ClubAttendanceStatus: ClubAttendanceStatus,
  PatchUserInput: PatchUserInput,
  EnrollInput: EnrollInput,
  EnrollOutput: EnrollOutput,
  MTime: MTime,
  MTimeInput: MTimeInput,
  Profile: Profile,
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  last4?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  expMonth?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  expYear?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type ClubAttendanceResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClubAttendanceResult'] = ResolversParentTypes['ClubAttendanceResult']> = {
  status?: Resolver<ResolversTypes['ClubAttendanceStatus'], ParentType, ContextType>,
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type EnrollOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['EnrollOutput'] = ResolversParentTypes['EnrollOutput']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  fee?: Resolver<ResolversTypes['Fee'], ParentType, ContextType>,
  enrollId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
};

export type FeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fee'] = ResolversParentTypes['Fee']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  clubId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tierId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tierDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MClubResolvers<ContextType = any, ParentType extends ResolversParentTypes['MClub'] = ResolversParentTypes['MClub']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  host?: Resolver<Array<Maybe<ResolversTypes['MUser']>>, ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  attendees?: Resolver<Maybe<Array<Maybe<ResolversTypes['MUser']>>>, ParentType, ContextType>,
  location?: Resolver<ResolversTypes['MLocation'], ParentType, ContextType>,
  slotCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  frequency?: Resolver<ResolversTypes['Frequency'], ParentType, ContextType>,
  coverImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  fee?: Resolver<Maybe<ResolversTypes['Fee']>, ParentType, ContextType>,
};

export type MLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MLocation'] = ResolversParentTypes['MLocation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  long?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  locationNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MTime'] = ResolversParentTypes['MTime']> = {
  startAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  endAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  timeNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['MUser'] = ResolversParentTypes['MUser']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  introduction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stripeUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  cards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Card']>>>, ParentType, ContextType>,
  clubs?: Resolver<Maybe<Array<Maybe<ResolversTypes['MClub']>>>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCard?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationAddCardArgs, 'number' | 'expMonth' | 'expYear' | 'cvc'>>,
  addCardByToken?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationAddCardByTokenArgs, 'token'>>,
  addFee?: Resolver<Maybe<ResolversTypes['Fee']>, ParentType, ContextType, RequireFields<MutationAddFeeArgs, 'fee'>>,
  createClub?: Resolver<ResolversTypes['MClub'], ParentType, ContextType, MutationCreateClubArgs>,
  favorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationFavoriteArgs, 'clubId'>>,
  joinClub?: Resolver<ResolversTypes['ClubAttendanceResult'], ParentType, ContextType, RequireFields<MutationJoinClubArgs, 'clubId'>>,
  login?: Resolver<Maybe<ResolversTypes['MUser']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  newPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationNewPasswordArgs, 'code' | 'email' | 'password'>>,
  patchUser?: Resolver<Maybe<ResolversTypes['MUser']>, ParentType, ContextType, RequireFields<MutationPatchUserArgs, 'input'>>,
  quitClub?: Resolver<ResolversTypes['ClubAttendanceResult'], ParentType, ContextType, RequireFields<MutationQuitClubArgs, 'clubId'>>,
  register?: Resolver<ResolversTypes['MUser'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'name'>>,
  resetPassword?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>,
};

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  introduction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stripeUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  cards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Card']>>>, ParentType, ContextType>,
  clubs?: Resolver<Maybe<Array<Maybe<ResolversTypes['MClub']>>>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>,
  club?: Resolver<Maybe<ResolversTypes['MClub']>, ParentType, ContextType, RequireFields<QueryClubArgs, 'id'>>,
  clubs?: Resolver<Maybe<Array<ResolversTypes['MClub']>>, ParentType, ContextType>,
  me?: Resolver<ResolversTypes['MUser'], ParentType, ContextType>,
  search?: Resolver<Maybe<Array<ResolversTypes['MClub']>>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'keyword'>>,
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>,
  ClubAttendanceResult?: ClubAttendanceResultResolvers<ContextType>,
  EnrollOutput?: EnrollOutputResolvers<ContextType>,
  Fee?: FeeResolvers<ContextType>,
  MClub?: MClubResolvers<ContextType>,
  MLocation?: MLocationResolvers<ContextType>,
  MTime?: MTimeResolvers<ContextType>,
  MUser?: MUserResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Profile?: ProfileResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
