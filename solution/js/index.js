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
            </div>
        `
    })
    document.querySelector('.tweets-list').innerHTML = twitterContent;
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