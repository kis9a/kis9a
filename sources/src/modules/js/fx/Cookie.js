import { assign } from "../utils.js";

var validCookieNameChars =
  "abdefghijklmnqrstuvxyzABDEFGHIJKLMNQRSTUVXYZ0123456789!#$%&'*+-.^_`|~";
var validCookieValueChars = validCookieNameChars + "()/:<>?@[]{}";

function nameEncoder(value) {
  return value
    .toString()
    .split("")
    .map(function (c) {
      return validCookieNameChars.indexOf(c) > -1 ? c : encodeURIComponent(c);
    })
    .join("");
}

function valueEncoder(value) {
  return value
    .toString()
    .split("")
    .map(function (c) {
      return validCookieValueChars.indexOf(c) > -1 ? c : encodeURIComponent(c);
    })
    .join("");
}

function writeCookie(name, value, attributes) {
  var attrs = Object.keys(attributes)
    .map(function (k) {
      return k + "=" + attributes[k];
    })
    .join(";");
  document.cookie = name + "=" + value + (attrs ? ";" + attrs : "");
}

function readCookieEffect(dispatch, props) {
  var cookies = document.cookie.split("; ");
  var cookie = cookies.find(function (c) {
    return c.substr(0, c.indexOf("=")) === props.nameEncoder(props.name);
  });
  if (cookie) {
    var dispatchProps = assign({}, props.props || {});
    dispatchProps[props.prop || "value"] = props.converter(
      props.decoder(cookie.substr(props.nameEncoder(props.name).length + 1))
    );
    dispatch(props.action, dispatchProps);
  }
}

function writeCookieEffect(dispatch, props) {
  var name = (props.nameEncoder || nameEncoder)(props.name);
  var value = (props.encoder || valueEncoder)(props.converter(props.value));
  var attributes = {};
  if (props.ttl)
    props.expires = new Date(new Date().getTime() + props.ttl * 1000);
  if (props.path) attributes.path = props.path;
  if (props.domain) attributes.domain = props.domain;
  if (props.expires) attributes.expires = props.expires.toUTCString();

  writeCookie(name, value, attributes);
}

export function ReadCookie(props) {
  return [
    readCookieEffect,
    assign(
      {
        nameEncoder: nameEncoder,
        converter:
          props.converter || props.json
            ? JSON.parse
            : function (v) {
                return v;
              },
        decoder: props.decoder || decodeURIComponent,
      },
      props
    ),
  ];
}

export function WriteCookie(props) {
  return [
    writeCookieEffect,
    assign(
      {
        converter:
          props.converter || props.json
            ? JSON.stringify
            : function (v) {
                return v;
              },
      },
      props
    ),
  ];
}

export function DeleteCookie(props) {
  return WriteCookie(assign(props, { ttl: -1, value: "" }));
}
