const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute commands and log output
function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    const output = execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Create uploads directories if they don't exist
const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
};

// Create necessary directories
const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
const recipesDir = path.join(uploadsDir, 'recipes');

createDir(uploadsDir);
createDir(avatarsDir);
createDir(recipesDir);

// Main setup function
async function setup() {
  console.log('\n=== RecSpicy Setup Script ===');
  console.log('This script will install dependencies and start the server.');
  
  console.log('\n=== Installing dependencies ===');
  if (!runCommand('npm install')) {
    console.error('Failed to install dependencies. Please try again.');
    process.exit(1);
  }
  
  console.log('\n=== Setup completed successfully! ===');
  console.log('\nTo start the server in development mode, run:');
  console.log('npm run dev');
  console.log('\nTo start the server in production mode, run:');
  console.log('npm start');
  
  console.log('\n=== Starting server in development mode ===');
  runCommand('npm run dev');
}

// Run setup
setup().catch(error => {
  console.error('Setup failed:', error);
});