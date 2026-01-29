const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Mock child_process.execSync
jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

// Mock fs module
jest.mock('fs');

describe('Test Report Generation', () => {
  const REPORTS_DIR = path.join(__dirname, '..', '..', 'reports');
  const TEST_RESULTS_FILE = path.join(REPORTS_DIR, 'test-results.json');
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    fs.existsSync.mockReturnValue(true);
    fs.mkdirSync.mockImplementation(() => {});
    fs.writeFileSync.mockImplementation(() => {});
    
    // Mock git log output
    execSync.mockReturnValue('John Doe|john.doe@example.com|2024-01-15T10:30:00-05:00');
  });
  
  afterEach(() => {
    jest.resetModules();
  });
  
  test('should generate report from valid test results', () => {
    const mockTestResults = {
      summary: {
        totalTests: 10,
        passed: 8,
        failures: 2,
        skipped: 0,
        testExecutionTime: 5000,
        totalLines: 1000,
        totalLinesCovered: 950
      },
      tests: [
        {
          ClassName: 'TestClass1',
          MethodName: 'testMethod1',
          Outcome: 'Pass',
          RunTime: 100
        },
        {
          ClassName: 'TestClass2',
          MethodName: 'testMethod2',
          Outcome: 'Fail',
          Message: 'Assertion failed',
          RunTime: 200
        }
      ],
      codeCoverage: [
        {
          name: 'MyClass',
          numLocations: 100,
          numLocationsNotCovered: 10 // 90% coverage
        },
        {
          name: 'AnotherClass',
          numLocations: 50,
          numLocationsNotCovered: 1 // 98% coverage
        }
      ]
    };
    
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTestResults));
    
    // Import and run the script
    require('../generate-test-report');
    
    // Verify reports were generated
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('test-report.json'),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('test-report.md'),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('test-report.html'),
      expect.any(String)
    );
    
    // Verify JSON report content
    const jsonCall = fs.writeFileSync.mock.calls.find(call => 
      call[0].includes('test-report.json')
    );
    expect(jsonCall).toBeDefined();
    const report = JSON.parse(jsonCall[1]);
    
    expect(report.summary.totalTests).toBe(10);
    expect(report.summary.passed).toBe(8);
    expect(report.summary.failed).toBe(2);
    expect(report.failingClasses.length).toBe(1);
    expect(report.failingClasses[0].className).toBe('TestClass2');
    expect(report.lowCoverageClasses.length).toBe(1);
    expect(report.lowCoverageClasses[0].className).toBe('MyClass');
    expect(parseFloat(report.lowCoverageClasses[0].coveragePercent)).toBeLessThan(95);
  });
  
  test('should identify failing classes correctly', () => {
    const mockTestResults = {
      summary: { totalTests: 5, passed: 3, failures: 2 },
      tests: [
        { ClassName: 'ClassA', MethodName: 'test1', Outcome: 'Pass' },
        { ClassName: 'ClassA', MethodName: 'test2', Outcome: 'Fail' },
        { ClassName: 'ClassB', MethodName: 'test1', Outcome: 'Fail' },
        { ClassName: 'ClassC', MethodName: 'test1', Outcome: 'Pass' }
      ],
      codeCoverage: []
    };
    
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTestResults));
    
    require('../generate-test-report');
    
    const jsonCall = fs.writeFileSync.mock.calls.find(call => 
      call[0].includes('test-report.json')
    );
    const report = JSON.parse(jsonCall[1]);
    
    expect(report.failingClasses.length).toBe(2);
    expect(report.failingClasses.map(fc => fc.className)).toContain('ClassA');
    expect(report.failingClasses.map(fc => fc.className)).toContain('ClassB');
  });
  
  test('should identify low coverage classes (<95%)', () => {
    const mockTestResults = {
      summary: { totalTests: 0 },
      tests: [],
      codeCoverage: [
        { name: 'LowCoverageClass', numLocations: 100, numLocationsNotCovered: 10 }, // 90%
        { name: 'GoodCoverageClass', numLocations: 100, numLocationsNotCovered: 4 }, // 96%
        { name: 'PerfectClass', numLocations: 100, numLocationsNotCovered: 0 } // 100%
      ]
    };
    
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTestResults));
    
    require('../generate-test-report');
    
    const jsonCall = fs.writeFileSync.mock.calls.find(call => 
      call[0].includes('test-report.json')
    );
    const report = JSON.parse(jsonCall[1]);
    
    expect(report.lowCoverageClasses.length).toBe(1);
    expect(report.lowCoverageClasses[0].className).toBe('LowCoverageClass');
    expect(parseFloat(report.lowCoverageClasses[0].coveragePercent)).toBe(90);
  });
  
  test('should handle missing committer info gracefully', () => {
    execSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    
    const mockTestResults = {
      summary: { totalTests: 1 },
      tests: [{ ClassName: 'UnknownClass', MethodName: 'test1', Outcome: 'Fail' }],
      codeCoverage: []
    };
    
    fs.readFileSync.mockReturnValue(JSON.stringify(mockTestResults));
    
    require('../generate-test-report');
    
    const jsonCall = fs.writeFileSync.mock.calls.find(call => 
      call[0].includes('test-report.json')
    );
    const report = JSON.parse(jsonCall[1]);
    
    expect(report.failingClasses[0].lastCommitter).toBeNull();
  });
  
  test('should handle missing test results file', () => {
    fs.existsSync.mockReturnValue(false);
    fs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });
    
    const originalExit = process.exit;
    process.exit = jest.fn();
    
    try {
      require('../generate-test-report');
      expect(process.exit).toHaveBeenCalledWith(1);
    } finally {
      process.exit = originalExit;
    }
  });
});
