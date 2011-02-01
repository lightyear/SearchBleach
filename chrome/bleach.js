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

function got_domains(response)
{
  var url = window.location + '';
  if (url.match(/^https?:\/\/www\.google\.[.a-z]+\/search/))
  {
    check_google_results(response.domains);
  }
}

chrome.extension.sendRequest({ 'request': 'get_domains' }, got_domains);
