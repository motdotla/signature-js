# IN DEVELOPMENT

+ API call to mark document signed
+ Loading screen for the share url - when it is not been converted and ready for sharing

# signature-js

The JavaScript that powers the front-end signing interface for Signature.io.

```html
<script src='/path/to/signature-js.js' data-signature-document-url='http://url.com/document.json' data-signature-signing-url='http://url.com/signature/url.json' data-siganture-signing-id='id-inside-the-signing-url'></script>
```

<img src="https://raw.githubusercontent.com/motdotla/signature-js/master/signature-js.gif" alt="signature-js" />

## Development Setup

Edit only files under `/src` directory. Then run the following to generate the `/build` directory.

```
npm install
grunt
```

Visit <http://localhost:3001> to test out your changes.
