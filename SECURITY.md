# Security Policy

## Supported versions

| Version | Supported           |
| ------- | ------------------- |
| 0.x     | Latest release only |

The project is pre-1.0. Security fixes ship as patch releases on the latest
minor line.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Use GitHub's private vulnerability reporting:

1. Open the repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Include a description, reproduction, affected versions and impact.

If private reporting is unavailable, contact [@malikrajat](https://github.com/malikrajat)
privately.

## Response targets

- Acknowledge within 3 business days.
- Provide an initial assessment within 7 business days.
- Coordinate a fix and advisory before public disclosure.

## Scope

In scope:

- XSS or DOM-injection issues in the player UI.
- Cross-origin or postMessage handling in embed engines.
- Unsafe URL or MIME detection leading to unexpected resource loading.
- Dependency or supply-chain issues in the published package.

Out of scope:

- Vulnerabilities in third-party media files or streams.
- Issues requiring a compromised browser extension or host page.
- Social engineering.

## Practices

- The core has zero runtime dependencies.
- `hls.js`, `dashjs`, `rxjs` and framework packages are optional peers.
- Release publishing uses npm provenance via GitHub Actions.
- CodeQL runs on every push and pull request.
- Dependabot keeps dependencies current.
