| Qualifier | Example |
| --------- | ------- |

| ` type:pr ` | [**cat type:pr**](https://github.com/search?q=cat+type%3Apr&type=Issues)
matches pull requests with the word "cat." |
| ` type:issue ` | [**github commenter:defunkt type:issue**](https://github.com/search?q=github+commenter%3Adefunkt+type%3Aissue&type=Issues)
matches issues that contain the word "github," and have a comment by @defunkt. |
| ` is:pr ` | [**event is:pr**](https://github.com/search?utf8=%E2%9C%93&q=event+is%3Apr&type=)
matches pull requests with the word "event." |
| ` is:issue ` | [**is:issue label:bug is:closed**](https://github.com/search?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug+is%3Aclosed&type=)
matches closed issues with the label "bug." |

| Qualifier | Example |
| --------- | ------- |

| ` in:title ` | [**warning in:title**](https://github.com/search?q=warning+in%3Atitle&type=Issues)
matches issues with "warning" in their title. |
| ` in:body ` | [**error in:title,body**](https://github.com/search?q=error+in%3Atitle%2Cbody&type=Issues)
matches issues with "error" in their title or body. |
| ` in:comments ` | [**shipit in:comments**](https://github.com/search?q=shipit+in%3Acomment&type=Issues)
matches issues mentioning "shipit" in their comments. |


| Qualifier | Example |
| --------- | ------- |

| ` draft:true ` | [**draft:true**](https://github.com/search?q=draft%3Atrue)
matches draft pull requests. |
| ` draft:false ` | [**draft:false**](https://github.com/search?q=draft%3Afalse)
matches pull requests that are ready for review. |


| Qualifier | Example |
| --------- | ------- |

| ` is:merged ` | [**bugfix is:pr is:merged**](https://github.com/search?utf8=%E2%9C%93&q=bugfix+is%3Apr+is%3Amerged&type=)
matches merged pull requests with the word "bugfix." |
| ` is:unmerged ` | [**error is:unmerged**](https://github.com/search?utf8=%E2%9C%93&q=error+is%3Aunmerged&type=)
matches closed issues and pull requests with the word "error." |

| Qualifier | Example |
| --------- | ------- |

| ` archived:true ` | [**archived:true GNOME**](https://github.com/search?q=archived%3Atrue+GNOME&type=)
matches issues and pull requests that contain the word "GNOME" in archived repositories you have access to. |
| ` archived:false ` | [**archived:false GNOME**](https://github.com/search?q=archived%3Afalse+GNOME&type=)
matches issues and pull requests that contain the word "GNOME" in unarchived repositories you have access to. |

| Qualifier | Example |
| --------- | ------- |

| ` is:locked ` | [**code of conduct is:locked is:issue archived:false**](https://github.com/search?q=code+of+conduct+is%3Alocked+is%3Aissue+archived%3Afalse)
matches issues or pull requests with the words "code of conduct" that have a locked conversation in a repository that is not archived. |
| ` is:unlocked ` | [**code of conduct is:unlocked is:issue archived:false**](https://github.com/search?q=code+of+conduct+is%3Aunlocked+archived%3Afalse)
matches issues or pull requests with the words "code of conduct" that have an unlocked conversation in a repository that is not archived. |

| Qualifier | Example |
| --------- | ------- |

| ` no:label ` | [**priority no:label**](https://github.com/search?q=priority+no%3Alabel&type=Issues)
matches issues and pull requests with the word "priority" that also don't have any labels. |
| ` no:milestone ` | [**sprint no:milestone type:issue**](https://github.com/search?q=sprint+no%3Amilestone+type%3Aissue&type=Issues)
matches issues not associated with a milestone containing the word "sprint." |
| ` no:assignee ` | [**important no:assignee language:java type:issue**](https://github.com/search?q=important+no%3Aassignee+language%3Ajava+type%3Aissue&type=Issues)
matches issues not associated with an assignee, containing the word "important," and in Java repositories. |
| ` no:project ` | [**build no:project**](https://github.com/search?utf8=%E2%9C%93&q=build+no%3Aproject&type=Issues)
matches issues not associated with a project board, containing the word "build." |


| クエリ | 説明 |
| --- | --- |
| is:open | 状態が open であること。既にクローズされているものは必死に追う必要はないので見ない |
| is:issue | Pull Request は除外して Issue だけに絞り込む。Pull Request は全く別の条件で一覧化したいので除外する |
| involves:yuya-takeyama | 自信を巻き込んでる Issue だけに絞り込む |
| user:hogehoge-co | User または Organization が hogehoge-co のリポジトリの Issue だけに絞り込む |
| -repo:hogehoge-co/nippoh | 日報を書くのに使っているリポジトリの Issue は除外する |
| sort:updated-desc | 更新日時で降順にソートする |

| クエリ | 説明 |
| --- | --- |
| assignee:yuya-takeyama | 自分が assign されているものだけに絞り込む |

