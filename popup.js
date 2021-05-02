document.addEventListener('DOMContentLoaded', documentEvents, false);

function updatePopUpList(items) {
  // Remove old list
  const listItems = document.querySelectorAll('.subreddit-list-item');
  listItems.forEach(item => item.remove());

  // Add current list items to pop up
  items.forEach(item => {
    var node = document.createElement("li");
    node.className = "subreddit-list-item";
    node.title = "Click to remove";
    var textnode = document.createTextNode(item);
    node.appendChild(textnode);
    document.getElementById("subreddit-remover-list").appendChild(node);
  });

  addListEventListeners();
}

function addSubreddit(input) {
  // Ignore empty strings
  if (!input.value) return;

  // Get current subreddit list and add the new value to it
  chrome.storage.sync.get(['subreddits'], function(result) {
    const subs = result.subreddits || [];
    subs.push(input.value);

    chrome.storage.sync.set({ subreddits: subs }, function() {
      updatePopUpList(subs);
    });
  });
}

function removeSubreddit(value) {
  // Ignore empty strings
  if (!value) return;

  // Get current subreddit list and remove the new value to it
  chrome.storage.sync.get(['subreddits'], function(result) {
    const subs = result.subreddits || [];
    const filteredSubs = subs.filter(sub => value && sub !== value);

    chrome.storage.sync.set({ subreddits: filteredSubs }, function() {
      updatePopUpList(filteredSubs);
    });
  });
}

function addListEventListeners() {
  const currentList = document.querySelectorAll('.subreddit-list-item');

  // Remove current listeners first
  currentList.forEach(item => {
    item.removeEventListener('click', handleListItemClick);
  });

  currentList.forEach(item => {
    item.addEventListener('click', handleListItemClick);
  });
}

function handleListItemClick(e) {
  const value = e.target.innerHTML;
  removeSubreddit(value);
}

function documentEvents() {
  document.getElementById('add_btn').addEventListener('click',
    function() { addSubreddit(document.getElementById('name_textbox'));
  });

  // Load curent subreddit list onto popup
  chrome.storage.sync.get(['subreddits'], function(result) {
    updatePopUpList(result.subreddits);
  });
}
