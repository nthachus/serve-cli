# Serve CLI

[![Node.js Package](https://github.com/nthachus/serve-cli/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/nthachus/serve-cli/actions/workflows/npm-publish.yml)

Bundled package of [vercel/serve](https://github.com/vercel/serve) CLI with some patches;
To serve a static site, single page application or directory listing.

## Patches

- Bundle `vercel/serve` CLI with `webpack` and `babel` for Node 6 compatibility
- Now we can serve static files with `--virtual-path` option to specify virtual directory for the server

## Usage

Run this command to see a list of all available options:

```bash
serve --help
```

## License

MIT licensed, see [LICENSE](LICENSE) file for more details.
