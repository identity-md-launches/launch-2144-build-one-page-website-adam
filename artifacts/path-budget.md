# Submission path budget

The submission limit is **8,388,608 bytes**. These are explicit ceilings, not measured sizes; final measured sizes are recorded in `validation.md`.

| Paths | Maximum bytes |
| --- | ---: |
| `src/**`, `scripts/**`, root package/configuration files and lockfile | 1,048,576 |
| `public/**` (complete local runtime artwork, fonts and favicon) | 2,097,152 |
| `dist/**` (complete production export, including copies of runtime assets) | 3,145,728 |
| `README.md`, `DESIGN.md`, `artifacts/**` | 1,048,576 |
| `.gitignore` | 1,024 |
| Unallocated reserve | 1,047,552 |
| **Total** | **8,388,608** |

The new `.gitignore` has an explicit 1,024-byte budget. It excludes dependency, generated cache, coverage, and scratch directories at every depth, while keeping `dist/` included. No dependency directory, package archive, registry mirror, browser binary or submodule is delivered. Tool installations and package-manager caches used by the worker are outside the repository. No ignore file is used to hide required source or runtime assets.
