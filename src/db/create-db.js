require('dotenv').config();
const { exec } = require('child_process');

// Parse the DATABASE_URL
const dbUrl = process.env.DATABASE_URL;

// Extract the necessary parts from the DATABASE_URL
const dbName = dbUrl.split('/').pop(); // Get the database name from the URL
const [user, passwordHost] = dbUrl.split('@')[0].split('//')[1].split(':'); // Extract user and password
const [password] = passwordHost.split(':'); // Extract password
const port = 5432; // Default PostgreSQL port
const host = 'localhost'; // Default host

// Command to check if the database exists
const checkDbCommand = `psql -U ${user} -h ${host} -p ${port} -c "SELECT 1 FROM pg_database WHERE datname='${dbName}';"`;

// Execute the check command
exec(checkDbCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error checking database existence: ${stderr}`);
    process.exit(1);
  }

  // Check if the database exists
  if (stdout.includes('1')) {
    console.log(`Database ${dbName} already exists.`);
    process.exit(0);
  } else {
    // Command to create the database
    const createDbCommand = `SET PGPASSWORD=${password} && psql -U ${user} -h ${host} -p ${port} -c "CREATE DATABASE ${dbName};"`;

    // Execute the command to create the database
    exec(createDbCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error creating database: ${stderr}`);
        process.exit(1);
      } else {
        console.log(`Database ${dbName} created successfully.`);
        process.exit(0);
      }
    });
  }
});
