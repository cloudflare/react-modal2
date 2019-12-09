# Changelog

## v5.0.2
- Fixing regression introduced in v5.0.1 that affected event propagation [#33](https://github.com/cloudflare/react-modal2/pull/33)

## v5.0.1
- Prevent modal from closing when backdrop is partial target of click [#30](https://github.com/cloudflare/react-modal2/pull/30)

## v5.0.0
- Version bump. No changes from v3.2.0.

## v4.0.0
DEPRECATED. Do not use.

## v3.2.0
- Replace string refs with callback refs [#19](https://github.com/cloudflare/react-modal2/pull/19)
- Use `prop-types` package instead of `React.PropTypes` (React 15.5.0 compatibility)

## v3.1.0
- Replace `React.createClass` with ES6 Class (React 15.0.0 compatibility)

## v3.0.2
- Remove unnecessary `bind` on `keydown` handler [#10](https://github.com/cloudflare/react-modal2/pull/10)

## v3.0.1
- Docs update only

## v3.0.0
- Universal/Isomorphic modals

### BREAKING CHANGES
- Removed `ReactModal2.setApplicationElement()`. You must now [override](https://github.com/cloudflare/react-modal2/blob/v3.0.1/README.md#accessibility) `React.getApplicationElement()` in your application.

## v2.0.0
- Remove `ReactGateway` from automatically being included. This is an implementation detail that should be in your modal component.
  - Allows for alternatives other than `ReactGateway`
  - Allows wrapping `ReactModal` inside `ReactGateway`

## v1.0.2
- Fix `styles` => `style`

## v1.0.1
- Fix references

## v1.0.0
- Initial version
