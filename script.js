function hideSubreddits() {
  try {
    chrome.storage.sync.get(['subreddits'], (result) => {
      const subs = result.subreddits;

      if (!subs || !subs.length) return;

      subs.forEach(sub => {
        const els = document.querySelectorAll(`a[href='/r/${sub}/']`);
        els.forEach(el => {
          el.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        })
      })
    });
  } catch (e) {
    console.log(e);
  }

}

// Hide subreddits on initial load
hideSubreddits();

// Continue hiding new subreddits that get loaded in while scrolling
const hideInterval = setInterval(() => hideSubreddits(), 2000);
