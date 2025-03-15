# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New template option (`-t` or `--template`) for the CLI init command
  - Support for custom GitHub templates with `-t username/repo`
  - Special template option `-t next` to use the experimental template from starter-next repository
  - Support for named templates from the Viber3D templates directory
- Interactive template selection prompt when no template is specified
  - Choose between `starter` (recommended, stable) or `next` (experimental)

## [0.1.0] - YYYY-MM-DD

### Added
- Initial release of Viber3D
- CLI tool with init command to create new projects
- Default starter template
