import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// List of packages to publish
const packages = ['create-viber3d'];

// List of all packages that need version bumping (including those not published)
const allPackages = ['create-viber3d', 'viber3d-starter'];

function run(command: string, cwd: string) {
  console.log(`Executing: ${command} in ${cwd}`);
  execSync(command, { stdio: 'inherit', cwd });
}

/**
 * Bump version in package.json
 * @param pkgPath Path to the package directory
 * @param type Version bump type: 'major', 'minor', 'patch', or specific version
 * @returns The new version
 */
function bumpVersion(pkgPath: string, type: 'major' | 'minor' | 'patch' | string): string {
  const pkgJsonPath = path.join(pkgPath, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const currentVersion = pkgJson.version;
  let newVersion: string;

  if (type === 'major' || type === 'minor' || type === 'patch') {
    // Parse current version
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    
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

  // Update package.json
  pkgJson.version = newVersion;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
  
  console.log(`Bumped version from ${currentVersion} to ${newVersion} in ${pkgJsonPath}`);
  return newVersion;
}

/**
 * Bump version in all package.json files
 * @param versionBump Version bump type or specific version
 * @returns The new version
 */
function bumpAllVersions(versionBump: 'major' | 'minor' | 'patch' | string = 'patch'): string {
  // First bump the root package.json
  const rootPath = path.resolve('.');
  const newVersion = bumpVersion(rootPath, versionBump);
  
  // Then bump all package.json files in the packages directory
  for (const pkg of allPackages) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    if (fs.existsSync(path.join(pkgPath, 'package.json'))) {
      // Use the same version for all packages
      bumpVersion(pkgPath, newVersion);
    }
  }
  
  return newVersion;
}

/**
 * Create a git commit and tag for the release
 * @param version The version to tag
 */
function createGitCommitAndTag(version: string) {
  console.log('Creating git commit and tag...');
  
  try {
    // Stage all changes
    run('git add .', '.');
    
    // Create commit with version message
    run(`git commit -m "chore: release v${version}"`, '.');
    
    // Create tag
    run(`git tag -a v${version} -m "Release v${version}"`, '.');
    
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

async function publishPackages(versionBump: 'major' | 'minor' | 'patch' | string = 'patch') {
  // Bump all versions first
  const newVersion = bumpAllVersions(versionBump);
  
  // Create git commit and tag
  createGitCommitAndTag(newVersion);
  
  // Then publish the packages that need to be published
  for (const pkg of packages) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    
    console.log(`Publishing ${pkg}@${newVersion}...`);
    run('pnpm publish --no-git-checks', pkgPath);
  }
}

// Get version bump type from command line arguments
const args = process.argv.slice(2);
const versionBumpArg = args[0] || 'patch'; // Default to patch

publishPackages(versionBumpArg).catch(console.error);