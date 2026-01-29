# Salesforce Test Automation with GitHub Actions

This project provides an automated test suite for Salesforce that runs on a schedule via GitHub Actions. It generates comprehensive test reports including test results, failing classes, code coverage information, and last committer details.

## Features

- ✅ **Scheduled Test Runs**: Automatically runs tests daily (configurable)
- ✅ **Comprehensive Reports**: Generates JSON, Markdown, and HTML reports
- ✅ **Test Result Summary**: Total tests, passed, failed, skipped, and duration
- ✅ **Failing Classes**: Identifies classes with failing tests and their last committers
- ✅ **Coverage Analysis**: Finds classes with coverage less than 95%
- ✅ **Committer Tracking**: Shows who last modified each class
- ✅ **PR Integration**: Automatically comments on pull requests with test results
- ✅ **Failure Notifications**: Creates GitHub issues when tests fail

## Prerequisites

1. **Salesforce CLI (sf CLI)**: Must be installed and configured
   ```bash
   npm install -g @salesforce/cli
   ```

2. **GitHub Secrets**: Configure the following secrets in your GitHub repository:
   - `SF_USERNAME`: Salesforce username
   - `SF_PASSWORD`: Salesforce password
   - `SF_SECURITY_TOKEN`: Salesforce security token
   - `SF_LOGIN_URL`: (Optional) Salesforce login URL (defaults to `https://test.salesforce.com`)

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure GitHub Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add the required secrets listed above

3. **Customize Schedule** (Optional):
   - Edit `.github/workflows/salesforce-tests.yml`
   - Modify the cron schedule in the `on.schedule` section
   - Use [crontab.guru](https://crontab.guru/) to create custom schedules

## Usage

### Manual Execution

Run tests locally:
```bash
npm run run-tests
```

Generate report from existing test results:
```bash
npm run generate-report
```

### Automated Execution

The workflow runs automatically:
- **On Schedule**: Daily at 2 AM UTC (configurable)
- **On Push**: To `main` or `develop` branches
- **Manual**: Via GitHub Actions UI (workflow_dispatch)

### Viewing Reports

After a workflow run:
1. Go to the Actions tab in GitHub
2. Click on the workflow run
3. Download the `salesforce-test-report` artifact
4. Extract and view `test-report.html` in a browser

## Report Structure

### Test Summary
- Total tests executed
- Number of passed/failed/skipped tests
- Total execution time
- Overall code coverage percentage

### Failing Classes
- Class names with failing tests
- Last committer name and email
- Last modification date

### Low Coverage Classes (<95%)
- Class names with coverage below threshold
- Coverage percentage
- Lines covered vs total lines
- Last committer information

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Configuration

### Adjust Coverage Threshold

Edit `scripts/generate-test-report.js` and change the coverage threshold:
```javascript
const coveragePercent = numLocations > 0 
  ? ((numLocations - numLocationsNotCovered) / numLocations) * 100 
  : 100;
return coveragePercent < 95; // Change 95 to your desired threshold
```

### Customize Test Level

Edit `.github/workflows/salesforce-tests.yml`:
```yaml
sf apex run test --test-level RunLocalTests
```

Available test levels:
- `RunLocalTests`: Run all tests in your org
- `RunSpecifiedTests`: Run specific test classes
- `RunAllTestsInOrg`: Run all tests (including managed packages)

### Modify Schedule

Edit the cron expression in `.github/workflows/salesforce-tests.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

Examples:
- `'0 */6 * * *'` - Every 6 hours
- `'0 9 * * 1-5'` - Weekdays at 9 AM UTC
- `'0 0 * * 0'` - Weekly on Sunday at midnight

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── salesforce-tests.yml    # GitHub Actions workflow
├── scripts/
│   ├── run-salesforce-tests.js     # Test execution script
│   ├── generate-test-report.js     # Report generation script
│   └── __tests__/                  # Test files
│       ├── run-salesforce-tests.test.js
│       └── generate-test-report.test.js
├── reports/                        # Generated reports (gitignored)
├── package.json
├── jest.config.js
└── README.md
```

## Troubleshooting

### Authentication Issues

If you encounter authentication errors:
1. Verify your Salesforce credentials in GitHub Secrets
2. Ensure your security token is correct
3. Check if your IP is whitelisted in Salesforce

### Test Execution Failures

If tests fail to run:
1. Verify Salesforce CLI is installed: `sf --version`
2. Check test class names and ensure they exist
3. Review Salesforce org permissions

### Missing Committer Information

If committer info is missing:
1. Ensure git history is available (use `fetch-depth: 0` in checkout)
2. Verify class files exist in the repository
3. Check file paths match Salesforce project structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT
