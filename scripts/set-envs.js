// Creates env file base don env.template
const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

// Create the dir
mkdirSync('./src/environments', { recursive: true });
let targetPath = './src/environments/environments{ENV}.ts';

// Create the environment.ts file
writeFileSync( targetPath.replace('{ENV}', ''), '');

// Create the environment.{env}.ts file
const envFileContent = `
  export const environments = {
    isProduction: "${process.env['ENVIRONMENT'] === 'prod'}",
    baseUrl: 'http://localhost:3000',
    mapbox_key: "${process.env['MAPBOX_KEY']}"
  };
`;

if (process.env['ENVIRONMENT'] === 'prod') {
  targetPath = targetPath.replace('{ENV}', '');
} else {
  targetPath = targetPath.replace('{ENV}', '.' + process.env['ENVIRONMENT']);
}

writeFileSync( targetPath, envFileContent );
