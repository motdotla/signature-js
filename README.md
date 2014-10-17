# IN DEVELOPMENT

+ start with API call to mark document as signed - using an event coming from siganture-chrome, passed into signature-js.
+ get API integration with Signature.io. Use evented system so you can easily hook into your own API.
++ signature_elements/create.json?x,y,page_number,signing_id

# signature-js

The JavaScript that powers the front-end signing interface for Signature.io.

```html
<script src='/path/to/signature-js.js' data-signature-document-url='http://url.com/document.json' data-signature-signing-url='http://url.com/signature/url.json'></script>
```

<img src="https://raw.githubusercontent.com/motdotla/signature-js/master/signature-js.gif" alt="signature-js" />

## Development Setup

Edit only files under `/src` directory. Then run the following to generate the `/build` directory.

```
npm install
grunt
```

Visit <http://localhost:3001> to test out your changes.
