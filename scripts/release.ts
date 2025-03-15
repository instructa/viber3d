#!/usr/bin/env tsx
/**
 * Release Script
 * 
 * This script automates the process of creating and publishing releases
 * for packages in the Viber3D monorepo.
 * 
 * Usage:
 *   pnpm tsx scripts/release.ts [version-type] [--alpha] [--package=name]
 * 
 * version-type: 'major', 'minor', 'patch', or specific version (default: 'patch')
 * --alpha: Create an alpha release
 * --package: Specify a package to release (default: all publishable packages)
 * --no-git: Skip git commit and tag
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// List of packages to publish by default (ONLY viber3d gets published to npm)
const PUBLISHABLE_PACKAGES = ['viber3d'];

// List of all packages that need version bumping (including those not published)
const ALL_PACKAGES = ['viber3d'];

// Parse command line arguments
const args = process.argv.slice(2);
const versionBumpArg = args.find(arg => !arg.startsWith('--')) || 'patch';
const isAlpha = args.includes('--alpha');
const skipGit = args.includes('--no-git');
const packageArg = args.find(arg => arg.startsWith('--package='));
const specificPackage = packageArg ? packageArg.split('=')[1] : null;

// Determine which packages to publish
const packagesToPublish = specificPackage 
  ? [specificPackage] 
  : PUBLISHABLE_PACKAGES;

function run(command: string, cwd: string) {
  console.log(`Executing: ${command} in ${cwd}`);
  execSync(command, { stdio: 'inherit', cwd });
}

/**
 * Bump version in package.json
 * @param pkgPath Path to the package directory
 * @param type Version bump type: 'major', 'minor', 'patch', or specific version
 * @param isAlpha Whether to create an alpha version
 * @returns The new version
 */
function bumpVersion(pkgPath: string, type: 'major' | 'minor' | 'patch' | string, isAlpha: boolean = false): string {
  const pkgJsonPath = path.join(pkgPath, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const currentVersion = pkgJson.version;
  let newVersion: string;

  // Handle alpha versioning
  if (isAlpha) {
    // Parse current version to check if it's already an alpha version
    const versionRegex = /^(\d+\.\d+\.\d+)(?:-alpha\.(\d+))?$/;
    const match = currentVersion.match(versionRegex);
    
    if (!match) {
      throw new Error(`Invalid version format for alpha: ${currentVersion}`);
    }
    
    let baseVersion = match[1];
    
    // If we're bumping the version type, we need to calculate a new base version first
    if (type !== 'alpha') {
      const [major, minor, patch] = baseVersion.split('.').map(Number);
      
      if (type === 'major') {
        baseVersion = `${major + 1}.0.0`;
      } else if (type === 'minor') {
        baseVersion = `${major}.${minor + 1}.0`;
      } else if (type === 'patch') {
        baseVersion = `${major}.${minor}.${patch + 1}`;
      } else if (type.match(/^\d+\.\d+\.\d+$/)) {
        // If a specific version is provided, use it as the base
        baseVersion = type;
      }
    }
    
    // Get the current alpha version or start at 0
    const alphaVersion = match[2] ? parseInt(match[2], 10) : -1;
    newVersion = `${baseVersion}-alpha.${alphaVersion + 1}`;
  } else {
    // Regular version bumping (non-alpha)
    if (type === 'major' || type === 'minor' || type === 'patch') {
      // Parse current version, removing any alpha suffix
      const baseVersion = currentVersion.split('-')[0];
      const [major, minor, patch] = baseVersion.split('.').map(Number);
      
      // Bump version according to type
      if (type === 'major') {
        newVersion = `${major + 1}.0.0`;
      } else if (type === 'minor') {
        newVersion = `${major}.${minor + 1}.0`;
      } else { // patch
        newVersion = `${major}.${minor}.${patch + 1}`;
      }
    } else {
      // Use the provided version string directly
      newVersion = type;
    }
  }

  // Update package.json
  pkgJson.version = newVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  
  console.log(`Bumped version from ${currentVersion} to ${newVersion} in ${pkgJsonPath}`);
  return newVersion;
}

/**
 * Bump version in all package.json files
 * @param versionBump Version bump type or specific version
 * @param isAlpha Whether to create an alpha version
 * @returns The new version
 */
function bumpAllVersions(versionBump: 'major' | 'minor' | 'patch' | string = 'patch', isAlpha: boolean = false): string {
  // First bump the root package.json (only for non-alpha releases)
  const rootPath = path.resolve('.');
  let newVersion: string;
  
  if (!isAlpha) {
    newVersion = bumpVersion(rootPath, versionBump, false);
  } else {
    // For alpha releases, we only bump the specific package versions
    // Get the first package to determine the version
    const firstPkg = specificPackage || packagesToPublish[0];
    const pkgPath = path.resolve(`packages/${firstPkg}`);
    newVersion = bumpVersion(pkgPath, versionBump, true);
  }
  
  // Then bump all package.json files in the packages directory
  const packagesToUpdate = specificPackage 
    ? [specificPackage] 
    : ALL_PACKAGES;
  
  for (const pkg of packagesToUpdate) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    if (fs.existsSync(path.join(pkgPath, 'package.json'))) {
      // Skip the first package if it was already bumped
      if (isAlpha && pkg === (specificPackage || packagesToPublish[0])) {
        continue;
      }
      // Use the same version for all packages
      bumpVersion(pkgPath, newVersion, false);
    }
  }

  return newVersion;
}

/**
 * Create a git commit and tag for the release
 * @param version The version to tag
 * @param isAlpha Whether this is an alpha release
 */
function createGitCommitAndTag(version: string, isAlpha: boolean = false) {
  console.log('Creating git commit and tag...');
  
  try {
    // Stage all changes
    run('git add .', '.');
    
    // Create commit with version message
    const commitMsg = isAlpha 
      ? `chore: alpha release v${version}` 
      : `chore: release v${version}`;
    run(`git commit -m "${commitMsg}"`, '.');
    
    // Create tag
    const tagMsg = isAlpha 
      ? `Alpha Release v${version}` 
      : `Release v${version}`;
    run(`git tag -a v${version} -m "${tagMsg}"`, '.');
    
    // Push commit and tag to remote
    console.log('Pushing commit and tag to remote...');
    run('git push', '.');
    run('git push --tags', '.');
    
    console.log(`Successfully created and pushed git tag v${version}`);
  } catch (error) {
    console.error('Failed to create git commit and tag:', error);
    throw error;
  }
}

async function publishPackages() {
  console.log(`🚀 Starting ${isAlpha ? 'alpha' : ''} release process...`);
  
  if (packagesToPublish.length > 0) {
    console.log(`📦 Packages to publish to npm: ${packagesToPublish.join(', ')}`);
  } else {
    console.log('📦 No packages will be published to npm');
  }
  
  console.log(`📝 Version bump: ${versionBumpArg}`);
  console.log(`🔄 All packages to update versions: ${ALL_PACKAGES.join(', ')}`);
  
  // Build packages first
  console.log('🔨 Building packages...');
  run('pnpm build:packages', '.');
  
  // Bump all versions
  const newVersion = bumpAllVersions(versionBumpArg, isAlpha);
  
  // Create git commit and tag if not skipped
  if (!skipGit) {
    createGitCommitAndTag(newVersion, isAlpha);
  }
  
  // Then publish the packages that need to be published
  for (const pkg of packagesToPublish) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    
    if (!fs.existsSync(path.join(pkgPath, 'package.json'))) {
      console.warn(`⚠️ Package ${pkg} not found, skipping...`);
      continue;
    }
    
    console.log(`📤 Publishing ${pkg}@${newVersion} to npm...`);
    
    const publishCmd = isAlpha
      ? 'pnpm publish --tag alpha --no-git-checks'
      : 'pnpm publish --no-git-checks';
    
    run(publishCmd, pkgPath);
  }
  
  console.log(`✅ Successfully completed ${isAlpha ? 'alpha' : ''} release v${newVersion}!`);
}

// Run the publish process
publishPackages().catch(error => {
  console.error('❌ Error during release process:', error);
  process.exit(1);
});