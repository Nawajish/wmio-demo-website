let root = document.documentElement;
let mainNav = $(
  '#main-nav .navbar-nav:not(.navbar-right)>.nav-item:not(#sci-mycloud-menu)'
);
let mainFooter = $('#main-footer');
let home = $('#home');
let body = $('body');
let cookiesconsent = $('#teconsent a');
let logo = $('.navbar-brand > img');
let favicon = $('link[rel=icon]');
let allAnchorlink = $('a[href^="/site"]');
let mycloudlinks = [
  '/site/administration.html',
  '/site/environments.html',
  '/site/dashboard.html',
];

function getDomain(url, subdomain) {
  subdomain = subdomain || false;
  url = url.replace(/(https?:\/\/)?(www.)?/i, '');
  if (!subdomain) {
    url = url.split('.');
    url = url.slice(url.length - 2).join('.');
  }
  if (url.indexOf('/') !== -1) {
    return url.split('/')[0];
  }
  return url;
}
function updateStaticSite() {
  allAnchorlink.each(function () {
    var $this = $(this);
    var _href = $this.attr('href');
    if (!(mycloudlinks && $.inArray(_href, mycloudlinks) != -1)) {
      $this.attr(
        'href',
        'https://www.' + getDomain(window.location.hostname) + _href
      );
      $this.attr('target', '_blank');
    }
  });
}

function showbody() {
  body.css({ opacity: '1', transition: 'opacity .25s ease .25s' });
}
function showDefaultLogo() {
  logo
        .attr('src', logo.attr('data-src'))
        .attr('alt', logo.attr('data-alt'));
      logo.removeAttr('data-src').removeAttr('data-alt');
}
/*
// Commented for next release
var jqxhr = $.getJSON('/api/ui-config')
  .done(function (e) {
    // Colors
    if (e.colors && e.colors.brandPrimary)
      root.style.setProperty('--brand-primary', e.colors.brandPrimary);
    if (e.colors && e.colors.brandDark) {
      root.style.setProperty('--brand-dark', e.colors.brandDark);
    }
    if (e.colors && e.colors.brandLight) {
      root.style.setProperty('--brand-light', e.colors.brandLight);
    }
    if (e.colors && e.colors.brandDarker) {
      root.style.setProperty('--brand-darker', e.colors.brandDarker);
    }
    if (e.colors && e.colors.brandMediumDark) {
      root.style.setProperty('--brand-medium-dark', e.colors.brandMediumDark);
    }
    if (e.colors && e.colors.textMuted) {
      root.style.setProperty('--text-muted', e.colors.textMuted);
    }
    if (e.colors && e.colors.grayText) {
      root.style.setProperty('--gray-text', e.colors.grayText);
    }
    if (e.colors && e.colors.linkColor) {
      root.style.setProperty('--link-color', e.colors.linkColor);
    }
    if (e.colors && e.colors.linkColorHover) {
      root.style.setProperty('--link-color-hover', e.colors.linkColorHover);
    }

    // Type
    if (e.type && e.type.fontFamily) {
      root.style.setProperty('--font-family-base', e.type.fontFamily);
    }
    if (e.type && e.type.fontHeadings) {
      root.style.setProperty('--font-family-headings', e.type.fontHeadings);
    }

    // Logo
    if (e.brand && e.brand.logo) {
      logo.attr('src', e.brand.logo).attr('alt', e.brand.name);
      logo.removeAttr('data-src').removeAttr('data-alt');
    }

    // favicon
    if (e.brand && e.brand.favicon) {
      favicon.attr('href', e.brand.favicon);
    }
    //  Main navigation
    if (e.hideNavigation) {
      mainNav.hide();
    }

    // redirect to host
    if (e.navigateStaticSite) {
      updateStaticSite();
    }
    // Footer
    if (e.hideFooter) {
      mainFooter.hide();
      cookiesconsent.hide();
    }
    // iframe
    if (home.length && e.homepage) {
      home.removeClass('container-fluid').addClass('iframe-container');
      home.html(
        '<iframe id="extHome" src="' + e.homepage + '" frameborder="0"  />'
      );
      // home.find('iframe').height(home.find('iframe').contents().height() + 'px');
      if (e.hideFooter) {
        body.css({ overflow: 'hidden', height: '100vh' });
      }
    }
  })
  .fail(function (e) {
    console.error(e.responseText);
  })

  .always(function (e) {
    if (!e.brand || !e.brand.logo) {
        showDefaultLogo();
    }

    // Title
    if (e.brand && e.brand.name) {
      $(document).attr('title', e.brand.name);
    }

    showbody();
  });

  **/
  showbody();
  showDefaultLogo();