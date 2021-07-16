### Mute<!--{{{-->

" https://twitter.com/settings/muted_keywords

ActivityTweet
generic_activity_highlights
generic_activity_momentsbreaking
RankedOrganicTweet
suggest_activity
suggest_activity_feed
suggest_activity_highlights
suggest_activity_tweet
suggest_grouped_tweet_hashtag
suggest_pyle_tweet
suggest_ranked_organic_tweet
suggest_ranked_timeline_tweet
suggest_recap
suggest_recycled_tweet
suggest_recycled_tweet_inline
suggest_sc_tweet
suggest_timeline_tweet
suggest_who_to_follow
suggestactivitytweet
suggestpyletweet
suggestrecycledtweet_inline

```js
const delayMs = 500; // change this if you feel like its running too fast

const keywords = `ActivityTweet
generic_activity_highlights
generic_activity_momentsbreaking
RankedOrganicTweet
suggest_activity
suggest_activity_feed
suggest_activity_highlights
suggest_activity_tweet
suggest_grouped_tweet_hashtag
suggest_pyle_tweet
suggest_ranked_organic_tweet
suggest_ranked_timeline_tweet
suggest_recap
suggest_recycled_tweet
suggest_recycled_tweet_inline
suggest_sc_tweet
suggest_timeline_tweet
suggest_who_to_follow
suggestactivitytweet
suggestpyletweet
suggestrecycledtweet_inline`.split(/\W+/);

const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  "value"
).set;

const addMutedKeyword = (keyword) => {
  const input = document.querySelector("[name='keyword']");
  nativeInputValueSetter.call(input, keyword);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  document.querySelector("[data-testid='settingsDetailSave']").click();
};

const delay = () => {
  return new Promise((res) => setTimeout(res, delayMs));
};

keywords.reduce(async (prev, keyword) => {
  await prev;
  document.querySelector("a[href='/settings/add_muted_keyword']").click();
  await delay();
  addMutedKeyword(keyword);
  return delay();
}, Promise.resolve());
```

<!--}}}-->
