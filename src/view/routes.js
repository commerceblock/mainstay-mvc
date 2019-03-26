import pathToRegexp from 'path-to-regexp';

export const getRoute = (route, params) => pathToRegexp.compile(route)(params);

export const routes = {
    app: '/',
    home: '/home',
    search: '/search',
    position: '/position/:value',
    block: '/block/:value',
    commitment: '/commitment/:value',
    transation: '/tx/:value',
    merkle: '/merkle_root/:value',
    attestation: '/attestation/:value?',
    client: '/client',
    privacy: '/privacy',
    terms: '/terms',
    pricing: '/pricing'
};
