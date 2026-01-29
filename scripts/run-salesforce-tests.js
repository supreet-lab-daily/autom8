#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const TEST_RESULTS_FILE = path.join(REPORTS_DIR, 'test-results.json');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('Running Salesforce tests...');

try {
  // Run all tests and get results in JSON format
  const testOutput = execSync(
    'sf apex run test --test-level RunLocalTests --result-format json --wait 10 --code-coverage',
    { encoding: 'utf-8', stdio: 'pipe' }
  );

  // Parse the test results
  const testResults = JSON.parse(testOutput);
  
  // Save raw test results
  fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(testResults, null, 2));
  
  console.log(`Tests completed. Results saved to ${TEST_RESULTS_FILE}`);
  
  // Exit with error code if tests failed
  if (testResults.summary && testResults.summary.failures > 0) {
    process.exit(1);
  }
  
} catch (error) {
  console.error('Error running Salesforce tests:', error.message);
  
  // Try to parse error output if available
  try {
    const errorOutput = error.stdout || error.stderr || error.message;
    fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify({
      error: errorOutput,
      timestamp: new Date().toISOString()
    }, null, 2));
  } catch (e) {
    // Ignore write errors
  }
  
  process.exit(1);
}
