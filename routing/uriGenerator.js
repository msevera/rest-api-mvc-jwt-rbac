const queryString = require('query-string');
const RoutesCollection = require('./routesCollection');

class URIGenerator {
  getURI(controllerAction, params, id) {
    const caArray = controllerAction.split('_');
    const routeData = RoutesCollection[caArray[0]][caArray[1]];
    const uri = params ? this._bindParams(routeData.uri, params) : routeData.uri;

    return {
      id: id || routeData.action,
      method: routeData.method,
      uri,
    };
  }

  _bindParams(uri, params) {
    let match;
    let replacement;
    const replacedParams = [];

    while (match = /:([\w_]+)\??/ig.exec(uri)) {
      replacement = params[match[1]].toString() || '';
      if (replacement === '') {
        uri = uri.replace(`/${match[0]}`);
      } else {
        uri = uri.replace(match[0], replacement);
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
      uri = `${uri}?${queryString.stringify(paramsForQueryString)}`;
    }

    return uri;
  }
}

module.exports = URIGenerator;
