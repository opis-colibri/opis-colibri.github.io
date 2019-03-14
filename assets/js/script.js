function toggleShow(id) {
    let target = document.getElementById(id);
    let overlay = document.getElementById('drawer-overlay');
    target.classList.toggle("show");
    overlay.classList.toggle("show");
    if (overlay.classList.contains('show')) {
        overlay.onclick = function () {
            toggleShow(id);
        }
    } else {
        overlay.onclick = null;
    }
}

function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function focusOn(id) {
    document.getElementById(id).focus();
}

function scrollSpy(selector) {
    let element = document.querySelector(selector);
    if (!element) {
        return;
    }

    let entries = [];
    let links = element.querySelectorAll('a[href^="#"]');


    for (let i = 0, l = links.length; i < l; i++) {
        let currLink = links[i];
        let refElement = document.querySelector(currLink.getAttribute('href'));
        entries.push({
            e: currLink,
            r: refElement
        });
    }

    let entriesLength = entries.length;
    let currentElement = null;

    let callback = function (event) {
        let scrollPos = window.scrollY;
        let hasActive = false;

        for (let i = 0; i < entriesLength; i++) {
            let entry = entries[i];
            let currLink = entry.e;
            let refElement = entry.r;

            if (!refElement || !currLink) {
                continue;
            }

            if (refElement.offsetTop <= scrollPos) {
                if (currentElement !== currLink) {
                    if (currentElement !== null) {
                        currentElement.classList.remove('active');
                    }
                    currentElement = currLink;
                    currentElement.classList.add('active');
                }
                hasActive = true;
            }
        }

        if (!hasActive && currentElement !== null) {
            currentElement.classList.remove('active');
            currentElement = null;
        }
    };

    document.addEventListener('scroll', callback);
}

window.addEventListener('load', function () {
    scrollSpy('#on-this-page-section');

    document.querySelectorAll('h2[id],h3[id],h4[id],h5[id],h6[id]').forEach(function (element) {
        // append a hash tag
    })
});

function algoliaNavigate(prefix, url, anchor) {
    url = prefix + url;
    if (anchor) {
        url += '#' + anchor;
    }
    toggleShow('search-drawer');
    window.location = url;
}

const searchClient = algoliasearch('NMQ2IFNV6E', 'f8653941bd9a6d355cc22fb710a143fe');

const search = instantsearch({
    indexName: 'opiscolibri',
    searchClient,
    searchFunction: function(helper) {
        if (helper.state.query === '') {
            return;
        }

        helper.search();
    }
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#algolia-search-box',
        placeholder: 'Search',
        searchAsYouType: true,
        showReset: false,
        showSubmit: false,
        showLoadingIndicator: false
    })
);

let urlPrefix = '/framework';//document.getElementById('search').getAttribute('data-prefix');

search.addWidget(
    instantsearch.widgets.hits({
        container: '#algolia-hits',
        templates: {
            item: `
        <div onclick="algoliaNavigate('${urlPrefix}','{{url}}','{{anchor}}')">
            <h5>
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
            </h5>
            <p>{{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}</p>
        </div>
    `,
        },
    })
);

search.start();