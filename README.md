## IN DEVELOPMENT 

+ Need a way to download the signed document copy. Use signature-signing and signature-document together to render. Then generate a PDF and store that somewhere.

```
payload = {success: true, document: {id: short_id}} 
Faraday.post "https://signature-clerk.herokuapp.com/api/v0/documents/generate_signed_url.json", {payload: payload}
```

Option: use prawn to generate the signed copy - like previous.
Option: use Phantomjs to generate the signed copy - afterall, it's just taking signature-document, and signature-signing and rendering those on top of each other. Then you should be able to make a call to convert to PDF from the headless browser.

Ok, how am I going to do the conversion. What will kick it off. Likely a webhook? But could be Iron.io. It's always running the background as a worker.  

Just like there is a library called carve that takes a url and carves it into pngs, there should be a library called:
  combine, mend, uncarve, stamp, multistamp, imprint, seal, signature-seal, sealant, sealer

It should take the input of a document_url and a signing_url. Given that it can get the original pdf url. It can get the pages. It can get the signing elements and the text elements.

USing those 3, it can then use both prawn and pdftk to generate the PDF. I suppose that would work. It worked previously.

So then there needs to be a multistamp-worker in the background actually making things work. 

Finally, there will be a multistamp-api that takes a call with document_url and signing_url as the arguments. That will call out to the worker. The worker will pop of the queue and do it's job. Then there needs to be a webhook to catch and produce the signed copy, correct? And this should live in a 'signing' object.

This could go into signatature-catcher. So it would also be in charge of catching signed signings coming from the multistamp-worker.


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
