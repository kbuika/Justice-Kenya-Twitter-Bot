const config = require("./config");
const twit = require("twit");

const T = new twit(config);

function retweet(searchText) {
  // params for the endpoint
  let params = {
    q: searchText + "",
    result_type: "mixed",
    count: 25,
  };

  T.get(
    "search/tweets",
    params,
    function (err_search, data_search, response_search) {
      let tweets = data_search.statuses;
      if (!err_search) {
        let tweetIDList = [];
        for (let tweet of tweets) {
          tweetIDList.push(tweet.id_str);
          // more code here...
        }
        for (let tweetID of tweetIDList) {
          T.post(
            "statuses/retweet/:id",
            { id: tweetID },
            function (err_rt, data_rt, response_rt) {
              if (!err_rt) {
                console.log("\n\nRetweeted! ID :" + tweetID);
              } else {
                console.log("\nError... Something weird" + tweetID);
                console.log("Error = " + err_rt);
              }
            }
          );
        }
      } else {
        console.log("Error while searching: " + err_search);
        process.exit(1);
      }
    }
  );
}

// run every 30 minutes
setInterval(function () {
  retweet("#JusticeForKianjokomaBrothers OR #JusticeforEmmanuelandBenson");
}, 1800000);
