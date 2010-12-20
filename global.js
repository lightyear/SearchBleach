var domains = safari.extension.settings.domains.toLowerCase().split(/\s*,\s*/);

function settings_changed(event)
{
  if (event.key == 'domains')
  {
    domains = event.newValue.toLowerCase().split(/\s*,\s*/);
  }
}

safari.extension.settings.addEventListener('change', settings_changed, false);

function message(event)
{
  if (event.name == 'get_domains')
  {
    event.target.page.dispatchMessage('get_domains', domains);
  }
}

safari.application.addEventListener('message', message, false);
