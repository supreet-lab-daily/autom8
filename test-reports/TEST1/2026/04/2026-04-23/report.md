# 🔴 Apex Test Report — TEST1

**Sandbox:** TEST1  
**Date:** 2026-04-23T22:49:23.650Z  
**Test Run ID:** 707Ox0000GRhuvU

## Summary

| Metric | Value |
|--------|-------|
| Tests Run | 2782 |
| Passing | ✅ 2766 |
| Failing | ❌ 16 |
| Pass Rate | 99% |
| Org Coverage | 93% |

## ❌ Failing Tests

### `Q2OFeatureManagementTest`
- `testIsPartnerUserException`: System.QueryException: List has no rows for assignment to SObject
- `testIsPartnerUserSuccess`: System.QueryException: List has no rows for assignment to SObject

### `AccountAUTriggerHandlerTest`
- `testHandleAfterUpdate`: System.DmlException: Update failed. First exception on row 0 with id 001Ox00001XT1TnIAL; first error

### `AccountApprovalBatchTest`
- `testHandleAfterUpdate_Success`: System.DmlException: Update failed. First exception on row 0 with id 001Ox00001XTI69IAH; first error

### `LeadSLAAutomationBatchTest`
- `testBatchScheduler`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testInvalidUsersQueue`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testInvalidUsersSDR`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testLeadOneDaySLA`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testLeadThreeDaySLADirector`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testLeadThreeDaySLAIntelligenceTeam`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K
- `testLeadThreeDaySLAManager`: System.DmlException: Insert failed. First exception on row 0; first error: INVALID_CROSS_REFERENCE_K

### `CalculateCustomPricingImplTest`
- `testCalculateCustomPricingExpressionAngleBracketNotEqualsCoverage`: System.AssertException: Assertion Failed: Recurring charge mismatch.: Expected: 120, Actual: 150.00
- `testCalculateCustomPricingExpressionBlankAndClauseCoverage`: System.AssertException: Assertion Failed: Recurring charge mismatch.: Expected: 130, Actual: 150.00
- `testCalculateCustomPricingExpressionEqualsAndNotEqualsCoverage`: System.AssertException: Assertion Failed: Recurring charge mismatch.: Expected: 140, Actual: 150.00
- `testCalculateCustomPricingExpressionEvaluatorLineCoverage`: System.AssertException: Assertion Failed: One-time charge mismatch.: Expected: 300, Actual: 100.00

## 📉 Low Coverage (< 95%)

| Class | Coverage | Lines |
|-------|----------|-------|
| `Q2OFeatureManagement` | 9.1% | 1/11 |
| `ContractBITriggerHandler` | 37.1% | 13/35 |
| `AccountApprovalBatch` | 69.6% | 16/23 |
| `lmtovaOrderValidationUtil` | 75.0% | 159/212 |
| `RestrictESMCatalogAndProduct` | 75.8% | 72/95 |
| `CommunitiesSelfRegController` | 76.2% | 32/42 |
| `lmtovaValidateOrderAction` | 76.5% | 367/480 |
| `LeadCadenceAssignHelper` | 79.0% | 45/57 |
| `MicrobatchSelfRegController` | 80.0% | 32/40 |
| `LogBatchPurger` | 80.6% | 108/134 |
| `BillingAccountPartnersCallout` | 80.7% | 25/31 |
| `EmailMessageHandler` | 81.0% | 51/63 |
| `PricingPlanHelper` | 81.3% | 988/1216 |
| `SiteRegisterController` | 81.5% | 22/27 |
| `AccountApprovalPlatformEventService` | 82.4% | 61/74 |
