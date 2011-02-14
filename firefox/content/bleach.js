if (!com) var com = {};
if (!com.lightyearsoftware) com.lightyearsoftware = {};

com.lightyearsoftware.searchBleach = {
  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),
  run: function() {
    var url = window.content.location + '';
    if (!url.match(/^https?:\/\/www\.google\.[.a-z]+\/search/))
      return;
    
    var domains = this.prefs.getCharPref("extensions.searchbleach.domains").toLowerCase().split(/\s*,\s*/);
    if (domains.length == 0)
      return;
    
    var results = window.content.document.querySelectorAll('#ires ol li');
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
};

window.addEventListener("load", function() {
  gBrowser.addEventListener("load", function() {
    com.lightyearsoftware.searchBleach.run();
  }, false);
}, false);
