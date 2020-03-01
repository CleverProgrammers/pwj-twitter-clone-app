const URL = "http://localhost:3000/tweets";
const nextPageData = {
    loading: false,
    url: null
}

const onEnter = (e) => {
    if(e.key == "Enter") {
        getTwitterData();
    }
}

const onNextPage = () => {
    if(nextPageData.url){
        getTwitterData(true);
    }
}

const getTwitterData = (nextPage=false) => {
    const query = document.getElementById("user-search-input").value;
    if(!query) return;
    const encodedQuery = encodeURIComponent(query);
    const params = `q=${encodedQuery}&result_type=mixed`;
    let fullUrl = `${URL}?${params}`;
    if(nextPage){
        fullUrl = nextPageData.url;
        nextPageData.loading = true;
    }
    fetch(fullUrl, {
        method: 'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        saveNextPage(data.search_metadata)
        buildTweets(data.statuses, nextPage);
        nextPageButtonVisibility(data.search_metadata);
    });
}

const saveNextPage = (metadata) => {
    nextPageData.url = `${URL}${metadata.next_results}`
    nextPageData.loading = false;
}

const selectTrend = (e) => {
    const trendText = e.innerText;
    document.getElementById("user-search-input").value = trendText;
    getTwitterData();
}

const nextPageButtonVisibility = (metadata) => {
    let visibility = 'hidden';
    if(metadata.next_results){
        visibility = 'visible';
    }
    document.getElementById('next-page').style.visibility = visibility;
}

const buildTweets = (tweets, nextPage) => {
    let twitterContent = "";
    tweets.map((tweet)=>{
        const createdDate = moment(tweet.created_at).fromNow();
        twitterContent += `
            <div class="tweet-container">
                <div class="tweet-user-info">
                    <div class="tweet-user-profile" style="background-image: url(${tweet.user.profile_image_url_https})"></div>
                    <div class="tweet-user-name-container">
                        <div class="tweet-user-fullname">${tweet.user.name}</div>
                        <div class="tweet-user-username">@${tweet.user.screen_name}</div>
                    </div>
                </div>
        `
        if(tweet.extended_entities 
            && tweet.extended_entities.media
            && tweet.extended_entities.media.length > 0){
            twitterContent += buildImages(tweet.extended_entities.media);
            twitterContent += buildVideo(tweet.extended_entities.media);
        }
        twitterContent += `
                <div class="tweet-text-container">
                    <span class="tweet-text">
                    ${tweet.full_text}
                    </span>
                </div>
                <div class="tweet-date">
                    ${createdDate}
                </div>
            </div>
        `
    })
    if(nextPage){
        document.querySelector('.tweets-list').insertAdjacentHTML('beforeend', twitterContent)
    } else {
        document.querySelector('.tweets-list').innerHTML = twitterContent;
    }
}

const buildImages = (mediaList) => {
    let imagesContent = `<div class="tweet-images-container">`;
    let imagesExist = false;
    mediaList.map((media)=>{
        if(media.type == "photo"){
            imagesExist = true;
            imagesContent += `
                <div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>
            `
        }
    })
    imagesContent += `</div>`;
    return (imagesExist ? imagesContent : '');
}

const buildVideo = (mediaList) => {
    let videoContent = `<div class="tweet-video-container">`;
    let videoExists = false;
    mediaList.map((media)=>{
        if(media.type == "video" || media.type == 'animated_gif'){
            videoExists = true;
            const video = media.video_info.variants.find((video)=>video.content_type == 'video/mp4');
            const videoOptions = getVideoOptions(media.type);
            videoContent += `
            <video ${videoOptions}>
                <source src="${video.url}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            `
        }
    })
    videoContent += `</div>`;
    return (videoExists ? videoContent : '');
}

const getVideoOptions = (mediaType) => {
    if(mediaType == 'animated_gif'){
        return "loop autoplay";
    } else {
        return "controls";
    }
}