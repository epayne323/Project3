var topSubReddits = ['AskReddit',
'Coronavirus',
'worldnews',
'pics',
'funny',
'politics',
'Minecraft',
'videos',
'NoStupidQuestions',
'gaming',
'aww',
'memes',
'movies',
'todayilearned',
'teenagers',
'explainlikeimfive',
'insanepeoplefacebook',
'dataisbeautiful',
'personalfinance',
'relationship_advice'];

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = -Infinity;
    var maxIndex = 0;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return [max, maxIndex];
}

function top10(data, selection) {
    if (!!selection) {
        var subreddit = d3.select(selection).property("value");
    }
    else {
        var topScores = [];
        var topTopics = [];
        // var subreddits = [];
        data.forEach(d => {
            if (topSubReddits.includes(d.subreddit)) {
                let topics = Object.keys(d);
                let maxTopic = indexOfMax(d);
                topScores.push(maxTopic[0]);
                topTopics.push(d.subreddit.concat(": ", topics[maxTopic[1]]));
                // subreddits.push(d.subreddit)
            }
        });
        return {
            x: topTopics,
            y: topScores,
            type: "bar"
        };
    }
}

// console.log("check");
d3.csv("../data/subreddit_topic_scores.csv").then(function(data) {
    subredditSelection = undefined;

    let layout = {
        title: "Most Prevalent Topics for Most Popular Subreddits",
        xaxis: { title: "Prevalance" },
        yaxis: { title: "Subreddit + Top Topic"}
      };
    
    let plotData = top10(data, subredditSelection);

    Plotly.newPlot("bar-plot", plotData, layout);

    d3.select("#sel1").on("change", function() {
        if (d3.select(this).property("value") === "Select State") {
            subredditSelection = undefined;
        }
        else {
            subredditSelection = this;
        }

        if (chartType === "standard") {
            updateStandard(data, stateSelection);
        }
        else if (chartType === "stacked") {
            updateStacked(data, stateSelection);
        }
    });
});