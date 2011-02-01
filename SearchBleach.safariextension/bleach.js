function check_google_results(domains)
{
  if (domains.length == 0)
    return;
  
  var results = document.querySelectorAll('#ires ol li');
  var i, length = results.length;
  
  for (i = 0; i < length; i++)
  {
    var url = results[i].querySelector('a').getAttribute('href');
    var found = url.match(/^https?:\/\/([^\/]+)\//);
    if (found != null)
    {
      var domain = found[1];
      var dlength = domains.length;
      var d;
      for (d = 0; d < dlength; d++)
      {
        if (domain.indexOf(domains[d]) >= 0)
        {
          results[i].style.display = "none";
          break;
        }
      }
    }
  }
}

function response(event)
{
  if (event.name == 'get_domains')
  {
    var domains = event.message;
    
    var url = window.location + '';
    if (url.match(/^https?:\/\/www\.google\.[.a-z]+\/search/))
    {
      check_google_results(domains);
    }
  }
}

safari.self.addEventListener('message', response, false);
safari.self.tab.dispatchMessage('get_domains', null);
