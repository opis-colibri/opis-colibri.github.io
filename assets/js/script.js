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
