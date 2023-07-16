/**
 * Handles routing for SPA by updating the browser's history and changing the page content.
 * 
 * @param {Event} [event] - The event object associated with the click (or equivalent) event. Defaults to window.event.
 */
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

/**
 * Routes object, defines the path for each route in the SPA.
 *
 * @type {Object.<string, string>}
 */
const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
    "/lorem": "/pages/lorem.html",
};

/**
 * Asynchronously fetches and loads the appropriate HTML file based on the current URL path.
 * If the path does not match any route in the routes object, it defaults to the 404 page.
 */
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

// Assign handleLocation function to onpopstate event of the window object
window.onpopstate = handleLocation;

// Assign route function to the global scope
window.route = route;

// Call handleLocation function to load the correct content when the page first loads
handleLocation();
