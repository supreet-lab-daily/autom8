#!/usr/bin/env node

/**
 * Integration test script to test report generation with sample data
 * This can be run locally without Salesforce connection
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const SAMPLE_DATA = path.join(__dirname, '__tests__', 'sample-test-results.json');
const TEST_RESULTS_FILE = path.join(REPORTS_DIR, 'test-results.json');

console.log('🧪 Testing report generation with sample data...\n');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

// Copy sample data to test-results.json
if (fs.existsSync(SAMPLE_DATA)) {
  const sampleData = fs.readFileSync(SAMPLE_DATA, 'utf-8');
  fs.writeFileSync(TEST_RESULTS_FILE, sampleData);
  console.log('✅ Sample test data loaded\n');
  
  // Run report generation
  console.log('📊 Generating report...\n');
  require('./generate-test-report');
  
  // Verify reports were created
  const reportFiles = [
    path.join(REPORTS_DIR, 'test-report.json'),
    path.join(REPORTS_DIR, 'test-report.md'),
    path.join(REPORTS_DIR, 'test-report.html')
  ];
  
  let allCreated = true;
  reportFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      console.log(`✅ ${path.basename(file)} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`❌ ${path.basename(file)} - NOT FOUND`);
      allCreated = false;
    }
  });
  
  if (allCreated) {
    console.log('\n🎉 All reports generated successfully!');
    console.log(`\n📁 Reports location: ${REPORTS_DIR}`);
    console.log(`\n💡 Open test-report.html in your browser to view the report.`);
  } else {
    console.log('\n❌ Some reports failed to generate');
    process.exit(1);
  }
} else {
  console.error(`❌ Sample data file not found: ${SAMPLE_DATA}`);
  process.exit(1);
}
