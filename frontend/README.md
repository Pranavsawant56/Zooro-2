# ZOORO frontend

The website is a Next.js static export. Its source is in `src/`, and public
assets are in `public/`.

## Local development

```bash
npm install
npm run dev
```

During development, `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is set in
`.env.development.local` to use the local API at `http://localhost:8000/enquiry`.
Start the API separately by following [`../backend/README.md`](../backend/README.md).

## Build and deploy

```bash
npm run build
```

The static website is generated in `out/`. Upload that folder's contents to the
web root.

The enquiry forms find the backend through `public/enquiry-config.json`, which
ships as `out/enquiry-config.json`:

```json
{
  "endpoint": "https://your-backend.example.com/enquiry"
}
```

Edit that file on the server and the change applies immediately — no rebuild.
If `endpoint` is empty, the build-time `NEXT_PUBLIC_ENQUIRY_ENDPOINT` is used
instead:

```bash
NEXT_PUBLIC_ENQUIRY_ENDPOINT=https://your-backend.example.com/enquiry npm run build
```

`NEXT_PUBLIC_*` values are embedded during the build, so changing that one
requires a rebuild. The JSON file is the easier option after deployment.
