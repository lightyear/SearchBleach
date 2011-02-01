var domains;

function load_options()
{
  if (localStorage["domains"] != null)
  {
    domains = localStorage["domains"].toLowerCase().split(/\s*,\s*/);
  }
  else
  {
    domains = [ 'efreedom.com', 'comanswer.com', 'developerit.com', 'questionhub.com', 'devcomments.com' ];
    localStorage["domains"] = domains.join(", ");
  }
}

load_options();

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.request == 'get_domains')
  {
    sendResponse({ 'domains': domains });
  }
  else if (request.request == 'reload_options')
  {
    load_options();
    sendResponse({});
  }
  else
  {
    sendResponse({});
  }
});
