```ts

import Amplify from '@aws-amplify/core';
import PubSub from '@aws-amplify/pubsub';
import API, { graphqlOperation } from '@aws-amplify/api';

import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);
API.configure(awsmobile);
PubSub.configure(awsmobile);

```

```ts
import { createTodo, deleteTodo, updateTodo } from '../graphql/mutations';
import { getTodo, listTodos } from '../graphql/queries';
import { onCreateTodo, onUpdateTodo, onDeleteTodo } from '../graphql/subscriptions';
```

昨日	CRUD	graphql
作成	CREATE	Mutation
取得	READ	Query
更新	UPDATE	Mutation
削除	DELETE	Mutation

加えてgraphqlではSubscription（購読）というものがあります。これは、端的にいうとサーバー側からのPushのようなもの

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    description
    isDone
  }
}
`;

- amplify auth sns
https://qiita.com/takeshi_hirosue/items/1c32e43816ea1d6a204d#step2-3-%E8%AA%8D%E8%A8%BC%E6%83%85%E5%A0%B1%E3%81%AE%E8%A8%AD%E5%AE%9A

- amplify 

AWS Amplify（Cognito）でGoogleソーシャルログインする


【爆速】React+Amplify+AppSyncでリアルタイム掲示板アプリ
https://qiita.com/G-awa/items/a5b2cc7017b1eceeb002

https://aws-amplify.github.io/amplify-js/api/

https://qiita.com/nagym/items/638974a3a5aaa63841c8
GraphQL API開発スピードを爆上げするAWS Amplify Mockingことはじめ

- [How to allow guest users to access web applications?  (Amplify, AWS AppSync, Cognito  IAM) - YouTube](https://www.youtube.com/watch?v=ZRJbosMAWU4&ab_channel=EnlearAcademy)
