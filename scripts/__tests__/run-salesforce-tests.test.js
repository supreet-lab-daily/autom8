const { execSync } = require('child_process');
const fs = require('fs');

jest.mock('child_process');
jest.mock('fs');

describe('Salesforce Test Runner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    fs.writeFileSync.mockImplementation(() => {});
  });
  
  afterEach(() => {
    jest.resetModules();
  });
  
  test('should run Salesforce tests successfully', () => {
    const mockTestOutput = JSON.stringify({
      summary: {
        totalTests: 10,
        passed: 10,
        failures: 0
      }
    });
    
    execSync.mockReturnValue(mockTestOutput);
    
    // Mock process.exit to prevent actual exit
    const originalExit = process.exit;
    process.exit = jest.fn();
    
    try {
      require('../run-salesforce-tests');
      
      expect(execSync).toHaveBeenCalledWith(
        expect.stringContaining('sf apex run test'),
        expect.any(Object)
      );
      
      expect(fs.writeFileSync).toHaveBeenCalled();
      
      // Should not exit with error code on success
      expect(process.exit).not.toHaveBeenCalled();
    } finally {
      process.exit = originalExit;
    }
  });
  
  test('should exit with error code when tests fail', () => {
    const mockTestOutput = JSON.stringify({
      summary: {
        totalTests: 10,
        passed: 8,
        failures: 2
      }
    });
    
    execSync.mockReturnValue(mockTestOutput);
    
    const originalExit = process.exit;
    process.exit = jest.fn();
    
    try {
      require('../run-salesforce-tests');
      
      expect(process.exit).toHaveBeenCalledWith(1);
    } finally {
      process.exit = originalExit;
    }
  });
  
  test('should handle execution errors', () => {
    execSync.mockImplementation(() => {
      throw new Error('Command failed');
    });
    
    const originalExit = process.exit;
    process.exit = jest.fn();
    
    try {
      require('../run-salesforce-tests');
      
      expect(process.exit).toHaveBeenCalledWith(1);
      expect(fs.writeFileSync).toHaveBeenCalled();
    } finally {
      process.exit = originalExit;
    }
  });
  
  test('should create reports directory if it does not exist', () => {
    fs.existsSync.mockReturnValue(false);
    
    execSync.mockReturnValue(JSON.stringify({ summary: { totalTests: 0 } }));
    
    const originalExit = process.exit;
    process.exit = jest.fn();
    
    try {
      require('../run-salesforce-tests');
      
      expect(fs.mkdirSync).toHaveBeenCalledWith(
        expect.stringContaining('reports'),
        { recursive: true }
      );
    } finally {
      process.exit = originalExit;
    }
  });
});
