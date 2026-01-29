#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const TEST_RESULTS_FILE = path.join(REPORTS_DIR, 'test-results.json');
const REPORT_JSON = path.join(REPORTS_DIR, 'test-report.json');
const REPORT_MD = path.join(REPORTS_DIR, 'test-report.md');
const REPORT_HTML = path.join(REPORTS_DIR, 'test-report.html');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Get the last committer for a file
 */
function getLastCommitter(className) {
  if (!className) return null;
  
  try {
    const repoRoot = path.join(__dirname, '..');
    const altPaths = [
      `force-app/main/default/classes/${className}.cls`,
      `force-app/main/default/classes/${className}.cls-meta.xml`,
      `classes/${className}.cls`,
      `classes/${className}.cls-meta.xml`,
      `src/classes/${className}.cls`,
      `src/classes/${className}.cls-meta.xml`
    ];
    
    // Try each possible path
    for (const altPath of altPaths) {
      try {
        const fullPath = path.join(repoRoot, altPath);
        // Check if file exists first
        if (fs.existsSync(fullPath)) {
          const gitLog = execSync(
            `git log -1 --format="%an|%ae|%ad" --date=iso -- "${altPath}"`,
            { encoding: 'utf-8', cwd: repoRoot, stdio: 'pipe' }
          ).trim();
          
          if (gitLog) {
            const [name, email, date] = gitLog.split('|');
            return { name, email, date };
          }
        }
      } catch (err) {
        // Try next path
        continue;
      }
    }
    
    // If file not found, try searching by class name in git log
    try {
      const gitLog = execSync(
        `git log -1 --all --format="%an|%ae|%ad" --date=iso -- "*${className}*"`,
        { encoding: 'utf-8', cwd: repoRoot, stdio: 'pipe' }
      ).trim();
      
      if (gitLog && gitLog.includes('|')) {
        const [name, email, date] = gitLog.split('|');
        return { name, email, date };
      }
    } catch (err) {
      // Ignore and return null
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Parse test results and generate comprehensive report
 */
function generateReport() {
  if (!fs.existsSync(TEST_RESULTS_FILE)) {
    console.error(`Test results file not found: ${TEST_RESULTS_FILE}`);
    process.exit(1);
  }

  const testResults = JSON.parse(fs.readFileSync(TEST_RESULTS_FILE, 'utf-8'));
  
  if (testResults.error) {
    console.error('Error in test results:', testResults.error);
    process.exit(1);
  }

  const summary = testResults.summary || {};
  const tests = testResults.tests || [];
  const codeCoverage = testResults.codeCoverage || [];
  
  // Extract failing test classes
  const failingClasses = new Set();
  tests.forEach(test => {
    if (test.Outcome === 'Fail') {
      // Extract class name from test method name (format: ClassName.methodName)
      const className = test.ClassName || test.ApexClass?.Name || test.MethodName?.split('.')[0];
      if (className) {
        failingClasses.add(className);
      }
    }
  });
  
  // Find classes with coverage < 95%
  const lowCoverageClasses = codeCoverage
    .filter(coverage => {
      const numLocations = coverage.numLocations || 0;
      const numLocationsNotCovered = coverage.numLocationsNotCovered || 0;
      const coveragePercent = numLocations > 0 
        ? ((numLocations - numLocationsNotCovered) / numLocations) * 100 
        : 100;
      return coveragePercent < 95;
    })
    .map(coverage => {
      const className = coverage.name || coverage.ApexClass?.Name;
      const numLocations = coverage.numLocations || 0;
      const numLocationsNotCovered = coverage.numLocationsNotCovered || 0;
      const coveragePercent = numLocations > 0 
        ? ((numLocations - numLocationsNotCovered) / numLocations) * 100 
        : 100;
      
      const committer = getLastCommitter(className);
      
      return {
        className,
        coveragePercent: coveragePercent.toFixed(2),
        linesCovered: numLocations - numLocationsNotCovered,
        linesTotal: numLocations,
        lastCommitter: committer
      };
    });
  
  // Get committer info for failing classes
  const failingClassesWithCommitters = Array.from(failingClasses).map(className => ({
    className,
    lastCommitter: getLastCommitter(className)
  }));
  
  // Build comprehensive report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: summary.totalTests || 0,
      passed: summary.passed || 0,
      failed: summary.failures || 0,
      skipped: summary.skipped || 0,
      totalDuration: summary.testExecutionTime || 0,
      overallCoverage: summary.totalLines || summary.totalLinesCovered 
        ? ((summary.totalLinesCovered / summary.totalLines) * 100).toFixed(2) + '%'
        : 'N/A'
    },
    failingClasses: failingClassesWithCommitters,
    lowCoverageClasses: lowCoverageClasses,
    allTestResults: tests.map(test => ({
      className: test.ClassName || test.ApexClass?.Name,
      methodName: test.MethodName,
      outcome: test.Outcome,
      message: test.Message,
      stackTrace: test.StackTrace,
      runTime: test.RunTime
    }))
  };
  
  // Save JSON report
  fs.writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2));
  
  // Generate Markdown report
  const mdReport = generateMarkdownReport(report);
  fs.writeFileSync(REPORT_MD, mdReport);
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  fs.writeFileSync(REPORT_HTML, htmlReport);
  
  console.log('Test report generated successfully!');
  console.log(`JSON: ${REPORT_JSON}`);
  console.log(`Markdown: ${REPORT_MD}`);
  console.log(`HTML: ${REPORT_HTML}`);
  
  // Print summary to console
  console.log('\n=== Test Summary ===');
  console.log(`Total Tests: ${report.summary.totalTests}`);
  console.log(`Passed: ${report.summary.passed}`);
  console.log(`Failed: ${report.summary.failed}`);
  console.log(`Overall Coverage: ${report.summary.overallCoverage}`);
  console.log(`Failing Classes: ${report.failingClasses.length}`);
  console.log(`Low Coverage Classes (<95%): ${report.lowCoverageClasses.length}`);
}

function generateMarkdownReport(report) {
  let md = `# Salesforce Test Report\n\n`;
  md += `**Generated:** ${new Date(report.timestamp).toLocaleString()}\n\n`;
  
  md += `## Test Summary\n\n`;
  md += `| Metric | Value |\n`;
  md += `|--------|-------|\n`;
  md += `| Total Tests | ${report.summary.totalTests} |\n`;
  md += `| Passed | ${report.summary.passed} |\n`;
  md += `| Failed | ${report.summary.failed} |\n`;
  md += `| Skipped | ${report.summary.skipped} |\n`;
  md += `| Total Duration | ${report.summary.totalDuration}ms |\n`;
  md += `| Overall Coverage | ${report.summary.overallCoverage} |\n\n`;
  
  if (report.failingClasses.length > 0) {
    md += `## ❌ Failing Test Classes\n\n`;
    md += `| Class Name | Last Committer | Email | Last Modified |\n`;
    md += `|------------|----------------|-------|---------------|\n`;
    report.failingClasses.forEach(fc => {
      const committer = fc.lastCommitter;
      md += `| ${fc.className} | ${committer?.name || 'N/A'} | ${committer?.email || 'N/A'} | ${committer?.date || 'N/A'} |\n`;
    });
    md += `\n`;
  } else {
    md += `## ✅ All Tests Passed\n\n`;
  }
  
  if (report.lowCoverageClasses.length > 0) {
    md += `## ⚠️ Classes with Coverage < 95%\n\n`;
    md += `| Class Name | Coverage % | Lines Covered | Total Lines | Last Committer | Email |\n`;
    md += `|------------|------------|---------------|------------|----------------|-------|\n`;
    report.lowCoverageClasses.forEach(lc => {
      const committer = lc.lastCommitter;
      md += `| ${lc.className} | ${lc.coveragePercent}% | ${lc.linesCovered} | ${lc.linesTotal} | ${committer?.name || 'N/A'} | ${committer?.email || 'N/A'} |\n`;
    });
    md += `\n`;
  } else {
    md += `## ✅ All Classes Meet Coverage Requirements (≥95%)\n\n`;
  }
  
  if (report.allTestResults.length > 0) {
    md += `## Detailed Test Results\n\n`;
    md += `| Class | Method | Outcome | Runtime (ms) |\n`;
    md += `|-------|--------|---------|--------------|\n`;
    report.allTestResults.forEach(test => {
      const icon = test.outcome === 'Pass' ? '✅' : test.outcome === 'Fail' ? '❌' : '⏭️';
      md += `| ${test.className} | ${test.methodName} | ${icon} ${test.outcome} | ${test.runTime || 'N/A'} |\n`;
    });
  }
  
  return md;
}

function generateHTMLReport(report) {
  const statusColor = report.summary.failed > 0 ? '#dc3545' : '#28a745';
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salesforce Test Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .summary-card h3 {
            margin: 0 0 10px 0;
            color: #666;
            font-size: 14px;
            text-transform: uppercase;
        }
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            color: ${statusColor};
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        th {
            background-color: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
        tr:hover {
            background-color: #f9f9f9;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }
        .badge-pass {
            background-color: #28a745;
            color: white;
        }
        .badge-fail {
            background-color: #dc3545;
            color: white;
        }
        .badge-skip {
            background-color: #ffc107;
            color: #000;
        }
        .section-title {
            color: #333;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Salesforce Test Report</h1>
        <p>Generated: ${new Date(report.timestamp).toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <div class="summary-card">
            <h3>Total Tests</h3>
            <div class="value">${report.summary.totalTests}</div>
        </div>
        <div class="summary-card">
            <h3>Passed</h3>
            <div class="value" style="color: #28a745">${report.summary.passed}</div>
        </div>
        <div class="summary-card">
            <h3>Failed</h3>
            <div class="value" style="color: #dc3545">${report.summary.failed}</div>
        </div>
        <div class="summary-card">
            <h3>Coverage</h3>
            <div class="value">${report.summary.overallCoverage}</div>
        </div>
    </div>`;
  
  if (report.failingClasses.length > 0) {
    html += `
    <h2 class="section-title">❌ Failing Test Classes</h2>
    <table>
        <thead>
            <tr>
                <th>Class Name</th>
                <th>Last Committer</th>
                <th>Email</th>
                <th>Last Modified</th>
            </tr>
        </thead>
        <tbody>`;
    report.failingClasses.forEach(fc => {
      const committer = fc.lastCommitter;
      html += `
            <tr>
                <td><strong>${fc.className}</strong></td>
                <td>${committer?.name || 'N/A'}</td>
                <td>${committer?.email || 'N/A'}</td>
                <td>${committer?.date ? new Date(committer.date).toLocaleString() : 'N/A'}</td>
            </tr>`;
    });
    html += `
        </tbody>
    </table>`;
  }
  
  if (report.lowCoverageClasses.length > 0) {
    html += `
    <h2 class="section-title">⚠️ Classes with Coverage < 95%</h2>
    <table>
        <thead>
            <tr>
                <th>Class Name</th>
                <th>Coverage %</th>
                <th>Lines Covered</th>
                <th>Total Lines</th>
                <th>Last Committer</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>`;
    report.lowCoverageClasses.forEach(lc => {
      const committer = lc.lastCommitter;
      const coverageColor = parseFloat(lc.coveragePercent) < 75 ? '#dc3545' : '#ffc107';
      html += `
            <tr>
                <td><strong>${lc.className}</strong></td>
                <td><span style="color: ${coverageColor}; font-weight: bold">${lc.coveragePercent}%</span></td>
                <td>${lc.linesCovered}</td>
                <td>${lc.linesTotal}</td>
                <td>${committer?.name || 'N/A'}</td>
                <td>${committer?.email || 'N/A'}</td>
            </tr>`;
    });
    html += `
        </tbody>
    </table>`;
  }
  
  html += `
</body>
</html>`;
  
  return html;
}

// Run report generation
generateReport();
