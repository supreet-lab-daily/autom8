# Salesforce Test Automation with GitHub Actions

A comprehensive, scalable Salesforce test automation solution using GitHub Actions composite actions. This solution runs tests against a remote Salesforce org, generates detailed reports, and sends notifications to Slack, MS Teams, or Email.

## Features

- ✅ **Pure GitHub Actions Solution**: All logic implemented as reusable composite actions
- ✅ **Scheduled Test Runs**: Automatically runs tests daily (configurable)
- ✅ **RunAllTestsInOrg**: Executes all tests including managed packages
- ✅ **Comprehensive Reports**: JSON format (ready for Slack/MS Teams/Confluence ingestion)
- ✅ **Coverage Analysis**: Flags classes with coverage < 95%
- ✅ **Committer Tracking**: Shows last committer for failing classes
- ✅ **Report Storage**: Stores reports in repository with timestamped directories
- ✅ **Notifications**: Supports Slack, MS Teams, and Email notifications
- ✅ **Non-Blocking**: Workflow never fails, only captures and reports issues
- ✅ **Scalable Architecture**: Modular composite actions following best practices

## Architecture

The solution uses composite actions for modularity and reusability:

```
.github/
├── workflows/
│   └── salesforce-tests.yml          # Main workflow
└── actions/
    ├── salesforce-auth/              # Authentication composite action
    ├── run-salesforce-tests/         # Test execution composite action
    ├── generate-report/              # Report generation composite action
    └── send-notification/            # Notification composite action
```

## Prerequisites

1. **Salesforce Org**: Access to a Salesforce sandbox or production org
2. **GitHub Secrets**: Configure the following secrets in your repository:
   - `SF_USERNAME`: Salesforce username (full email)
   - `SF_PASSWORD`: Salesforce password
   - `SF_SECURITY_TOKEN`: Salesforce security token
   - `SF_LOGIN_URL`: (Optional) Salesforce login URL (defaults to `https://test.salesforce.com`)
   - `SLACK_WEBHOOK_URL`: (Optional) Slack webhook URL for notifications
   - `TEAMS_WEBHOOK_URL`: (Optional) MS Teams webhook URL for notifications
   - `EMAIL_TO`: (Optional) Email address for notifications

## Setup

### 1. Configure GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the required secrets listed above.

### 2. Customize Schedule (Optional)

Edit `.github/workflows/salesforce-tests.yml`:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

Use [crontab.guru](https://crontab.guru/) to create custom schedules.

### 3. Configure Notifications (Optional)

Add webhook URLs or email addresses to GitHub Secrets:
- **Slack**: Create an incoming webhook at https://api.slack.com/messaging/webhooks
- **MS Teams**: Create an incoming webhook connector in Teams
- **Email**: Uses system mail service (may require additional configuration)

## Usage

### Manual Execution

1. Go to **Actions** tab in GitHub
2. Select **Salesforce Test Suite** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

### Automatic Execution

The workflow runs automatically:
- **On Schedule**: Daily at 2 AM UTC (configurable)
- **On Push**: To `main` or `develop` branches
- **Manual**: Via GitHub Actions UI (workflow_dispatch)

## Report Structure

Reports are generated in JSON format (ready for ingestion) and stored in:

- **Artifacts**: Downloadable from workflow runs (30-day retention)
- **Repository**: `test-reports/TIMESTAMP/` directory (timestamped for historical tracking)

### Report Format (JSON)

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "summary": {
    "totalTests": 150,
    "passed": 145,
    "failed": 5,
    "skipped": 0,
    "totalDuration": 8500,
    "overallCoverage": "92.5%"
  },
  "failingClasses": [
    {
      "className": "AccountServiceTest",
      "lastCommitter": {
        "name": "John Doe",
        "email": "john@example.com",
        "date": "2024-01-10T14:20:00-05:00"
      }
    }
  ],
  "lowCoverageClasses": [
    {
      "className": "UtilityClass",
      "coveragePercent": "87.5",
      "linesCovered": 70,
      "linesTotal": 80
    }
  ],
  "metadata": {
    "coverageThreshold": 95,
    "testLevel": "RunAllTestsInOrg"
  }
}
```

## Report Formats

### JSON (Default)
- Ready for Slack/MS Teams/Confluence ingestion
- Stored in `test-reports/TIMESTAMP/test-report.json`

### Markdown (Optional)
- Human-readable format
- Stored in `test-reports/TIMESTAMP/test-report.md`

## Integration Examples

### Slack Integration

The JSON report can be easily ingested by Slack:

```javascript
// Example: Parse and send to Slack
const report = require('./test-reports/20240115-020000/test-report.json');
// Use Slack Block Kit or webhook to format and send
```

### MS Teams Integration

MS Teams accepts JSON format for Adaptive Cards:

```json
{
  "type": "message",
  "attachments": [{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      // Use report data to build Adaptive Card
    }
  }]
}
```

### Confluence Integration

Upload JSON reports to Confluence using the Confluence API or import as structured data.

## Configuration

### Adjust Coverage Threshold

Edit `.github/workflows/salesforce-tests.yml`:

```yaml
- name: Generate Test Report
  uses: ./.github/actions/generate-report
  with:
    coverage_threshold: '95'  # Change to desired threshold
```

### Change Test Level

Edit `.github/actions/run-salesforce-tests/action.yml`:

```yaml
inputs:
  test_level:
    default: 'RunAllTestsInOrg'  # Options: RunLocalTests, RunSpecifiedTests, RunAllTestsInOrg
```

### Modify Notification Settings

Edit `.github/workflows/salesforce-tests.yml`:

```yaml
- name: Send Notifications
  uses: ./.github/actions/send-notification
  with:
    slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
    teams_webhook_url: ${{ secrets.TEAMS_WEBHOOK_URL }}
    email_to: ${{ secrets.EMAIL_TO }}
```

## Troubleshooting

### Authentication Issues

- Verify Salesforce credentials in GitHub Secrets
- Ensure security token is correct (reset if needed)
- Check if IP is whitelisted in Salesforce

### Test Execution Failures

- Verify Salesforce CLI is working (automatically installed)
- Check test classes exist in your org
- Review Salesforce org permissions

### Missing Committer Information

- Ensure `fetch-depth: 0` is set (already configured)
- Verify class files exist in the repository
- Check git history is available

### Notification Issues

- Verify webhook URLs are correct
- Check webhook permissions
- For email, ensure mail service is configured in runner

## Best Practices

1. **Regular Monitoring**: Check reports regularly to catch issues early
2. **Coverage Goals**: Maintain coverage above threshold
3. **Historical Tracking**: Review reports in `test-reports/` directory
4. **Notification Setup**: Configure at least one notification channel
5. **Secret Management**: Rotate Salesforce credentials regularly

## Project Structure

```
.
├── .github/
│   ├── workflows/
│   │   └── salesforce-tests.yml
│   └── actions/
│       ├── salesforce-auth/
│       │   └── action.yml
│       ├── run-salesforce-tests/
│       │   └── action.yml
│       ├── generate-report/
│       │   └── action.yml
│       └── send-notification/
│           └── action.yml
├── test-reports/              # Historical reports (tracked)
├── reports/                   # Temporary reports (gitignored)
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with workflow_dispatch
5. Submit a pull request

## License

MIT
