const queryString = require('query-string');

class URIGenerator {
  constructor(routesCollection) {
    this.controllers = routesCollection;
  }

  getURI(routeData, params, id) {
    return new Promise((resolve) => {
      const uri = params ? this._bindParams(routeData.uri, params) : routeData.uri;
      resolve({ id: id || routeData.action, method: routeData.method, uri });
    });
  }

  _bindParams(uri, params) {
    let match;
    let replacement;
    let uriParam = uri;
    const replacedParams = [];

    while (match = /:([\w_]+)\??/ig.exec(uriParam)) {
      replacement = params[match[1]].toString() || '';
      if (replacement === '') {
        uriParam = uriParam.replace(`/${match[0]}`, '');
      } else {
        uriParam = uriParam.replace(match[0], replacement);
        replacedParams.push(match[1]);
      }
    }

    const paramsForQueryString = {};
    Object.keys(params).forEach((p) => {
      if (!replacedParams.includes(p)) {
        paramsForQueryString[p] = params[p];
      }
    });

    if (Object.keys(paramsForQueryString).length > 0) {
      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;
    }

    return uriParam;
  }
}

module.exports = URIGenerator;
