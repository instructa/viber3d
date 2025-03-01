import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const packages = ['create-viber3d'];

function run(command: string, cwd: string) {
  console.log(`Executing: ${command} in ${cwd}`);
  execSync(command, { stdio: 'inherit', cwd });
}

async function publishPackages() {
  for (const pkg of packages) {
    const pkgPath = path.resolve(`packages/${pkg}`);
    const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf-8'));

    console.log(`Publishing ${pkg}@${pkgJson.version}...`);
    run('pnpm publish --no-git-checks', pkgPath);
  }
}

publishPackages().catch(console.error);