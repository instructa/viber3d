import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packages = ['create-viber3d'];

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
  
  console.log(`Bumped version from ${currentVersion} to ${newVersion}`);
  return newVersion;
}

async function publishPackages(versionBump: 'major' | 'minor' | 'patch' | string = 'patch') {
  for (const pkg of packages) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    
    // Bump version before publishing
    const newVersion = bumpVersion(pkgPath, versionBump);
    
    console.log(`Publishing ${pkg}@${newVersion}...`);
    run('pnpm publish --no-git-checks', pkgPath);
  }
}

// Get version bump type from command line arguments
const args = process.argv.slice(2);
const versionBumpArg = args[0] || 'patch'; // Default to patch

publishPackages(versionBumpArg).catch(console.error);