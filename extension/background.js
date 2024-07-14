chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.url) {
	  if (tab.url.includes('x.com') || tab.url.includes('twitter.com') || tab.url.includes('github.com')) {
		chrome.scripting.executeScript({
		  target: { tabId: tabId },
		  files: ['content.js']
		});
	  }
	}
  });