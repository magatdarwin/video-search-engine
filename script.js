const myInitCallback = function() {
  if (document.readyState == 'complete') {
    google.search.cse.element.render(
        {
          div: "search-results",
          tag: 'searchresults-only',
          gname: 'video-search'
         });
  } else {
    google.setOnLoadCallback(function() {
        google.search.cse.element.render(
            {
              div: "search-results",
              tag: 'searchresults-only',
              gname: 'video-search'
            });
    }, true);
  }
};

const addResultItem = result => {
  const thumbnail = result['thumbnailImage']['url'];
  const title = result['titleNoFormatting'];
  const itemUrl = result['url'];
  const channelName = result['richSnippet']['person']['name'];
  const channelUrl = result['richSnippet']['person']['url'];
  const sourceWebsite = result['visibleUrl'];
  const viewCount = result['richSnippet']['videoobject']['interactioncount'];
  const duration = result['richSnippet']['videoobject']['duration'];

  const resultItem = document.createElement('div');
  resultItem.classList.add('result-item');

  const thumbnailContainer = document.createElement('div');
  thumbnailContainer.classList.add('thumbnail');
  const thumbnailImage = document.createElement('img');
  thumbnailImage.src = thumbnail;
  thumbnailImage.alt = `Video Thumbnail of ${title}`;
  thumbnailContainer.appendChild(thumbnailImage);

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title');
  const titleAnchor = document.createElement('a');
  titleAnchor.href = itemUrl;
  titleAnchor.innerText = title;
  titleContainer.appendChild(titleAnchor);

  const channelContainer = document.createElement('div');
  channelContainer.classList.add('channel');
  const channelAnchor = document.createElement('a');
  channelAnchor.href = channelUrl;
  channelAnchor.innerText = channelName;
  channelContainer.appendChild(channelAnchor);

  const otherDetailsContainer = document.createElement('div');
  otherDetailsContainer.classList.add('other-details')
  const sourceContainer = document.createElement('div');
  sourceContainer.classList.add('source');
  const sourceAnchor = document.createElement('a');
  sourceAnchor.href = sourceWebsite;
  sourceAnchor.innerText = sourceWebsite;
  sourceContainer.appendChild(sourceAnchor);
  const viewsContainer = document.createElement('div');
  viewsContainer.classList.add('views');
  viewsContainer.innerText = viewCount;
  otherDetailsContainer.appendChild(sourceContainer);
  otherDetailsContainer.appendChild(viewsContainer);

  resultItem.appendChild(thumbnailContainer);
  resultItem.appendChild(titleContainer);
  resultItem.appendChild(channelContainer);
  resultItem.appendChild(otherDetailsContainer)

  return resultItem;
};

const customizeResults = (name, q, promos, results, resultsDiv) => {
  for (let result of results) {
    // Display only video results
    if (result['richSnippet']['videoobject'] !== undefined && result['richSnippet']['videoobject']['genre'] === 'Music') {
      console.log(result);  // TEMP
      resultsDiv.appendChild(addResultItem(result));
    }
  }
  return true;
};


window.__gcse = {
  parsetags: 'explicit',
  initializationCallback: myInitCallback,
  searchCallbacks: {
    web: {
      ready: customizeResults
    },
  }
};