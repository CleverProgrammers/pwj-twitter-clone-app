const URL = "http://localhost:3000/tweets";

const getTwitterData = () => {
    const query = document.getElementById("user-search-input").value;
    const encodedQuery = encodeURIComponent(query);
    const params = `q=${encodedQuery}&result_type=popular`;
    const fullUrl = `${URL}?${params}`;
    fetch(fullUrl, {
        method: 'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        
        buildTweets(data.statuses);
    })
}

const buildTweets = (tweets) => {
    let twitterContent = "";
    tweets.map((tweet)=>{
        twitterContent += `
            <div class="tweet-container">
                <div class="tweet-user-info">
                    <div class="tweet-user-profile" style="background-image: url(${tweet.user.profile_image_url_https})"></div>
                    <div class="tweet-user-name-container">
                        <div class="tweet-user-fullname">${tweet.user.name}</div>
                        <div class="tweet-user-username">@${tweet.user.screen_name}</div>
                    </div>
                </div>
                <div class="tweet-images-container">
                    <div class="tweet-image"></div>
                    <div class="tweet-image"></div>
                    <div class="tweet-image"></div>
                    <div class="tweet-image"></div>
                </div>
                <div class="tweet-text-container">
                    <span class="tweet-text">
                    ${tweet.full_text}
                    </span>
                </div>
            </div>
        `
    })
    document.querySelector('.tweets-list').innerHTML = twitterContent;
}