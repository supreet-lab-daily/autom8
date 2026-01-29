# Setup Guide - Pure GitHub Actions Solution

This guide will help you set up the Salesforce test automation using pure GitHub Actions composite actions.

## Step 1: Configure GitHub Secrets

Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

Click **New repository secret** and add:

### Required Secrets

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SF_USERNAME` | Your Salesforce username | `user@example.com` |
| `SF_PASSWORD` | Your Salesforce password | `YourPassword123` |
| `SF_SECURITY_TOKEN` | Salesforce security token | `ABC123XYZ789` |
| `SF_LOGIN_URL` | (Optional) Login URL | `https://test.salesforce.com` |

### Optional Notification Secrets

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `SLACK_WEBHOOK_URL` | Slack incoming webhook | Create at https://api.slack.com/messaging/webhooks |
| `TEAMS_WEBHOOK_URL` | MS Teams webhook | Create connector in Teams |
| `EMAIL_TO` | Email address | Your email address |

### Getting Your Security Token

1. Log in to Salesforce
2. Go to **Setup** → **My Personal Information** → **Reset My Security Token**
3. Click **Reset Security Token**
4. Check your email for the token

## Step 2: Configure Slack Webhook (Optional)

1. Go to https://api.slack.com/apps
2. Create a new app or select existing
3. Go to **Incoming Webhooks**
4. Activate incoming webhooks
5. Add new webhook to workspace
6. Copy webhook URL
7. Add as `SLACK_WEBHOOK_URL` secret

## Step 3: Configure MS Teams Webhook (Optional)

1. Open MS Teams
2. Go to the channel where you want notifications
3. Click **...** (More options) → **Connectors**
4. Search for **Incoming Webhook**
5. Click **Configure**
6. Provide a name and optional image
7. Click **Create**
8. Copy the webhook URL
9. Add as `TEAMS_WEBHOOK_URL` secret

## Step 4: Customize Workflow (Optional)

### Change Schedule

Edit `.github/workflows/salesforce-tests.yml`:

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
```

Common schedules:
- `'0 */6 * * *'` - Every 6 hours
- `'0 9 * * 1-5'` - Weekdays at 9 AM UTC
- `'0 0 * * 0'` - Weekly on Sunday

### Adjust Coverage Threshold

Edit `.github/workflows/salesforce-tests.yml`:

```yaml
- name: Generate Test Report
  uses: ./.github/actions/generate-report
  with:
    coverage_threshold: '95'  # Change to desired percentage
```

## Step 5: Test the Workflow

### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **Salesforce Test Suite** workflow
3. Click **Run workflow** button
4. Select branch: `main`
5. Click **Run workflow**

### Automatic Trigger

The workflow runs automatically:
- On push to `main` or `develop` branches
- On the configured schedule
- On pull requests (creates comments)

## Step 6: View Results

### From Workflow Run

1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll to **Artifacts** section
4. Download `salesforce-test-report-RUN_ID`
5. Extract and view `test-report.json`

### From Repository

1. Navigate to `test-reports/` directory
2. Find timestamped directory (e.g., `20240115-020000/`)
3. View `test-report.json` or `test-report.md`

### From Notifications

- **Slack**: Check the configured channel
- **MS Teams**: Check the configured channel
- **Email**: Check your inbox (if configured)

## Step 7: Integrate Reports

### Slack Integration

The JSON report can be parsed and sent to Slack:

```javascript
const report = require('./test-reports/20240115-020000/test-report.json');

// Format for Slack Block Kit
const slackMessage = {
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `Salesforce Tests: ${report.summary.passed}/${report.summary.totalTests} passed`
      }
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Failed:* ${report.summary.failed}` },
        { type: "mrkdwn", text: `*Coverage:* ${report.summary.overallCoverage}` }
      ]
    }
  ]
};
```

### MS Teams Integration

Use Adaptive Cards format:

```json
{
  "type": "message",
  "attachments": [{
    "contentType": "application/vnd.microsoft.card.adaptive",
    "content": {
      "type": "AdaptiveCard",
      "body": [
        {
          "type": "TextBlock",
          "text": "Salesforce Test Results",
          "size": "Large"
        }
      ]
    }
  }]
}
```

### Confluence Integration

Upload JSON reports using Confluence REST API or import as structured data.

## Troubleshooting

### Workflow Fails at Authentication

- Verify all secrets are set correctly
- Check that `SF_USERNAME` is the full email address
- Ensure `SF_SECURITY_TOKEN` is correct
- Verify Salesforce org is accessible

### Tests Don't Run

- Check Salesforce CLI installation (automatic)
- Verify test classes exist in org
- Review Salesforce org permissions
- Check workflow logs for detailed errors

### Reports Not Generated

- Verify test execution completed
- Check `reports/` directory exists
- Review workflow logs for errors
- Ensure jq is installed (automatic)

### Notifications Not Sent

- Verify webhook URLs are correct
- Check webhook permissions
- Review notification action logs
- Test webhook URLs manually

### Committer Info Missing

- Ensure `fetch-depth: 0` is set (already configured)
- Verify class files exist in repository
- Check git history is available
- Review git log command in generate-report action

## Next Steps

1. ✅ Verify workflow runs successfully
2. ✅ Check reports are generated correctly
3. ✅ Test notification channels
4. ✅ Review historical reports in `test-reports/`
5. Customize schedule and thresholds as needed
6. Set up additional notification channels
7. Integrate reports into your tools (Slack/Teams/Confluence)

## Support

For issues or questions:
1. Check workflow logs in GitHub Actions
2. Review composite action logs
3. Verify all secrets are configured
4. Test individual composite actions if needed
