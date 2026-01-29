# 🧪 Salesforce Apex Test Report

**Generated:** 2026-01-29T18:57:35.998Z
**Test Run ID:** 707O2000029uCd2
**Workflow Run:** [View Details](https://github.com/supreet-lab-daily/autom8/actions/runs/21490888704)

---

## 🔴 Summary

| Metric | Value |
|--------|-------|
| **Tests Run** | 27 |
| **Passing** | ✅ 26 |
| **Failing** | ❌ 1 |
| **Pass Rate** | 96% |
| **Outcome** | Failed |
| **Org-Wide Coverage** | 90% |
| **Test Run Coverage** | 92% |
| **Classes Below 95%** | ⚠️ 9 |

---

## ❌ Failing Test Classes

### `ESMCustomMatrixEligibilityImplTest`

**Failed Methods:**

#### `testcheckEligibility`

**Error Message:**
```
System.NullPointerException: Attempt to de-reference a null object
```

**Stack Trace:**
```
Class.ESMCustomMatrixEligibilityImpl.checkEligibility: line 207, column 1
Class.ESMCustomMatrixEligibilityImpl.invokeMethod: line 36, column 1
Class.ESMCustomMatrixEligibilityImpl.call: line 65, column 1
Class.ESMCustomMatrixEligibilityImplTest.testcheckEligibility: line 63, column 1
```

---

## 📉 Classes Below 95% Coverage

> **Warning:** 9 classes are below the 95% coverage threshold.

| Class | Coverage | Lines Covered/Total | Last Modified By |
|-------|----------|---------------------|------------------|
| `ESMCustomMatrixEligibilityImpl` | ⚠️ 59.9% | 115/192 | Unknown |
| `LoggerCache` | ⚠️ 86.0% | 74/86 | Unknown |
| `LoggerSObjectHandler` | ⚠️ 88.9% | 104/117 | Unknown |
| `Logger` | ⚠️ 91.7% | 988/1077 | Unknown |
| `LogEntryEventBuilder` | ⚠️ 92.3% | 587/636 | Unknown |
| `LoggerEmailSender` | ⚠️ 92.6% | 88/95 | Unknown |
| `LogEntryEventHandler` | ⚠️ 93.1% | 457/491 | Unknown |
| `LoggerPlugin` | ⚠️ 93.8% | 61/65 | Unknown |
| `StateCodes` | ⚠️ 94.0% | 940/1000 | Unknown |

---

_Report generated automatically by Salesforce DevOps Pipeline_
