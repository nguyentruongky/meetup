# meetup 

The small api server when learn GraphQL with TypeScript. 

## Prerequisites 
- PostgreSQL: https://www.postgresql.org/download/macosx/
- Node.js: https://nodejs.org/en/

## Installation
1. Database 
- Setup your database management. You can use TablePlus (https://tableplus.com/)
- Create your a Postgre database. 
- Set database information in `src/db/connection.ts`

2. Npm 
- Run `npm install`
- Run `npm start` to start server. Access to server at http://localhost:3000

## Structure 
1. Root folder
All sources are in `src`.
Every feature is grouped into a folder and has `index.ts` to export to outside. 

2. Database connection
- Root folder: `db`
- Database information is in `connection.ts`. 
- Public functions is in `sql`.

3. Graphql typedefs
- Root folder: `graphqls`
- Connect all `typeDefs` and `resolvers` here. 
- To integrate new features, import and push to `typeDefs` and `resolvers`
```
import user from "../users/index"
typeDefs.push(user.typeDefs)
resolvers.push(user.resolvers)
```

4. Features folder 
- For instance: `users`
- `index.ts` to public to outside. 
- `user.functions.ts`: contain functions need interact with database, logic. 
- `user.graphql.ts`: GraphQL schemas and types for this feature.
- `user.sql.ts`: SQL queries are here. Write query and execute, return result
- `user.ts`: data model

5. Helpers
- Collections for utilities

6. main.js 
- Apollo is setup here, import `typeDefs` and `resolvers` from `graphqls`. 
- We need middleware and authentication here (later). 