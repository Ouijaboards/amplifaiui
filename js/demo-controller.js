/**
 * Demo Controller for AMPLIFAI
 * This file handles the interactive demonstrations of AMPLIFAI capabilities
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo tabs
    initDemoTabs();
    
    // Initialize demo interactions
    initDemoInteractions();
});

/**
 * Initialize the demo tabs
 */
function initDemoTabs() {
    const demoTabs = document.querySelectorAll('.demo-tab');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            demoTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding demo panel
            const demoId = this.getAttribute('data-demo');
            showDemoPanel(demoId);
        });
    });
}

/**
 * Show a specific demo panel
 * @param {string} demoId - ID of the demo to show
 */
function showDemoPanel(demoId) {
    // Hide all demo panels
    const demoPanels = document.querySelectorAll('.demo-panel');
    demoPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Show selected demo panel
    const selectedPanel = document.getElementById(`demo-${demoId}`);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
}

/**
 * Initialize interactions for the demo sections
 */
function initDemoInteractions() {
    // Critical Thinking Demo
    const analyzeBtn = document.getElementById('analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const topic = document.getElementById('critical-topic').value.trim();
            if (topic) {
                simulateCriticalThinking(topic);
            }
        });
    }
    
    // Code Generation Demo
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const requirements = document.getElementById('code-requirements').value.trim();
            const language = document.getElementById('code-language').value;
            if (requirements) {
                simulateCodeGeneration(requirements, language);
            }
        });
    }
    
    // Collective Intelligence Demo
    const solveBtn = document.getElementById('solve-btn');
    if (solveBtn) {
        solveBtn.addEventListener('click', function() {
            const problem = document.getElementById('problem-description').value.trim();
            if (problem) {
                simulateCollectiveIntelligence(problem);
            }
        });
    }
    
    // Self-Modification Demo
    const improveBtn = document.getElementById('improve-btn');
    if (improveBtn) {
        improveBtn.addEventListener('click', function() {
            const area = document.getElementById('improvement-area').value;
            simulateSelfModification(area);
        });
    }
}

/**
 * Simulate critical thinking analysis
 * @param {string} topic - Topic to analyze
 */
function simulateCriticalThinking(topic) {
    const output = document.getElementById('critical-output');
    if (!output) return;
    
    // Show loading state
    output.innerHTML = '<div class="loading-indicator"><div class="spinner"></div>Analyzing topic...</div>';
    
    // Simulate analysis time
    setTimeout(() => {
        const analysis = generateCriticalAnalysis(topic);
        output.innerHTML = analysis;
    }, 3000);
}

/**
 * Generate a critical thinking analysis for a topic
 * @param {string} topic - Topic to analyze
 * @returns {string} - HTML content for the analysis
 */
function generateCriticalAnalysis(topic) {
    return `
        <h4>Critical Analysis: ${topic}</h4>
        <div class="analysis-section">
            <h5>Initial Assessment</h5>
            <p>The topic "${topic}" requires a multi-perspective analysis to fully understand its implications and potential solutions.</p>
        </div>
        <div class="analysis-section">
            <h5>Multiple Perspectives</h5>
            <ul>
                <li><strong>Perspective 1:</strong> Initial viewpoint considering conventional wisdom and established approaches.</li>
                <li><strong>Perspective 2:</strong> Alternative consideration challenging assumptions and exploring unconventional angles.</li>
                <li><strong>Perspective 3:</strong> Synthesis of viewpoints integrating the strengths of different approaches.</li>
            </ul>
        </div>
        <div class="analysis-section">
            <h5>Evidence Evaluation</h5>
            <p>Available evidence suggests a nuanced understanding is required, with careful consideration of context and limitations.</p>
        </div>
        <div class="analysis-section">
            <h5>Conclusion</h5>
            <p>Based on critical analysis, the most balanced approach to "${topic}" involves recognizing the complexity of the issue and adopting a flexible, context-sensitive strategy that incorporates multiple perspectives.</p>
        </div>
    `;
}

/**
 * Simulate code generation
 * @param {string} requirements - Code requirements
 * @param {string} language - Programming language
 */
function simulateCodeGeneration(requirements, language) {
    const output = document.getElementById('code-output');
    if (!output) return;
    
    // Show loading state
    output.innerHTML = '<div class="loading-indicator"><div class="spinner"></div>Generating code...</div>';
    
    // Simulate generation time
    setTimeout(() => {
        const code = generateCode(requirements, language);
        output.innerHTML = `<pre><code>${code}</code></pre>`;
    }, 2500);
}

/**
 * Generate code based on requirements and language
 * @param {string} requirements - Code requirements
 * @param {string} language - Programming language
 * @returns {string} - Generated code
 */
function generateCode(requirements, language) {
    let code = '';
    
    switch (language) {
        case 'javascript':
            code = `/**
 * ${requirements}
 * Generated by AMPLIFAI Code Agent
 */
function ${requirements.toLowerCase().replace(/[^a-z0-9]/g, '_')}() {
    // Implementation based on requirements
    console.log("Implementing: ${requirements}");
    
    // Core functionality
    const result = processInput(data);
    
    // Return the result
    return result;
}

// Helper functions
function processInput(data) {
    // Process the input data
    return transformedData;
}

// Example usage
const output = ${requirements.toLowerCase().replace(/[^a-z0-9]/g, '_')}();
console.log(output);`;
            break;
            
        case 'python':
            code = `"""
${requirements}
Generated by AMPLIFAI Code Agent
"""

def ${requirements.toLowerCase().replace(/[^a-z0-9]/g, '_')}():
    # Implementation based on requirements
    print(f"Implementing: ${requirements}")
    
    # Core functionality
    result = process_input(data)
    
    # Return the result
    return result

# Helper functions
def process_input(data):
    # Process the input data
    return transformed_data

# Example usage
output = ${requirements.toLowerCase().replace(/[^a-z0-9]/g, '_')}()
print(output)`;
            break;
            
        default:
            code = `// Code generation for ${language}\n// Implementing: ${requirements}`;
    }
    
    return code;
}

/**
 * Simulate collective intelligence problem solving
 * @param {string} problem - Problem description
 */
function simulateCollectiveIntelligence(problem) {
    const output = document.getElementById('collective-output');
    if (!output) return;
    
    // Show loading state
    output.innerHTML = '<div class="loading-indicator"><div class="spinner"></div>Analyzing problem...</div>';
    
    // Simulate initial analysis time
    setTimeout(() => {
        output.innerHTML = `
            <div class="ci-step">
                <div class="ci-agent">MCP</div>
                <div class="ci-message">Analyzing problem: "${problem}"</div>
            </div>
            <div class="ci-step">
                <div class="ci-agent">Planning</div>
                <div class="ci-message">Creating solution approach...</div>
            </div>
        `;
        
        // Simulate research and reasoning time
        setTimeout(() => {
            output.innerHTML += `
                <div class="ci-step">
                    <div class="ci-agent">Research</div>
                    <div class="ci-message">Gathering relevant information and case studies...</div>
                </div>
                <div class="ci-step">
                    <div class="ci-agent">Reasoning</div>
                    <div class="ci-message">Evaluating potential approaches and trade-offs...</div>
                </div>
            `;
            
            // Simulate final solution time
            setTimeout(() => {
                output.innerHTML += `
                    <div class="ci-step">
                        <div class="ci-agent">Code</div>
                        <div class="ci-message">Implementing technical components of the solution...</div>
                    </div>
                    <div class="ci-step">
                        <div class="ci-agent">MCP</div>
                        <div class="ci-message">Synthesizing collective solution...</div>
                    </div>
                    <div class="ci-solution">
                        <h4>Collective Solution for: ${problem}</h4>
                        <p>Through collaborative analysis and integration of multiple perspectives, the agent collective has developed a comprehensive approach:</p>
                        <ol>
                            <li><strong>Initial Assessment:</strong> The problem has been analyzed from multiple angles to identify key challenges and opportunities.</li>
                            <li><strong>Research Findings:</strong> Relevant case studies and best practices have been identified and evaluated for applicability.</li>
                            <li><strong>Strategic Approach:</strong> A multi-phase implementation strategy has been developed, balancing short-term gains with long-term sustainability.</li>
                            <li><strong>Technical Implementation:</strong> Specific technical components have been designed to address the unique aspects of the problem.</li>
                            <li><strong>Evaluation Framework:</strong> Metrics and monitoring approaches have been defined to track success and enable continuous improvement.</li>
                        </ol>
                    </div>
                `;
            }, 2000);
        }, 2000);
    }, 1500);
}

/**
 * Simulate self-modification process
 * @param {string} area - Area to improve
 */
function simulateSelfModification(area) {
    const output = document.getElementById('self-output');
    if (!output) return;
    
    // Show loading state
    output.innerHTML = '<div class="loading-indicator"><div class="spinner"></div>Analyzing current implementation...</div>';
    
    // Simulate analysis time
    setTimeout(() => {
        output.innerHTML = `
            <div class="self-mod-step">
                <h4>Self-Modification Process: ${getAreaName(area)}</h4>
                <div class="self-mod-phase">
                    <div class="phase-name">Phase 1: Analysis</div>
                    <div class="phase-status completed">Completed</div>
                    <div class="phase-details">
                        <p>Analyzed current implementation to identify improvement opportunities in ${getAreaName(area)}.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Simulate design time
        setTimeout(() => {
            output.innerHTML += `
                <div class="self-mod-phase">
                    <div class="phase-name">Phase 2: Design</div>
                    <div class="phase-status completed">Completed</div>
                    <div class="phase-details">
                        <p>Designed improved implementation approach for ${getAreaName(area)}.</p>
                        <pre><code>${generateSelfModCode(area)}</code></pre>
                    </div>
                </div>
            `;
            
            // Simulate implementation time
            setTimeout(() => {
                output.innerHTML += `
                    <div class="self-mod-phase">
                        <div class="phase-name">Phase 3: Implementation</div>
                        <div class="phase-status completed">Completed</div>
                        <div class="phase-details">
                            <p>Successfully implemented improvements to ${getAreaName(area)}.</p>
                        </div>
                    </div>
                `;
                
                // Simulate testing time
                setTimeout(() => {
                    output.innerHTML += `
                        <div class="self-mod-phase">
                            <div class="phase-name">Phase 4: Testing</div>
                            <div class="phase-status completed">Completed</div>
                            <div class="phase-details">
                                <p>Verified improvements with comprehensive testing.</p>
                                <div class="test-results">
                                    <div class="test-metric">
                                        <div class="metric-name">Performance</div>
                                        <div class="metric-value improved">+42%</div>
                                    </div>
                                    <div class="test-metric">
                                        <div class="metric-name">Reliability</div>
                                        <div class="metric-value improved">+28%</div>
                                    </div>
                                    <div class="test-metric">
                                        <div class="metric-name">User Satisfaction</div>
                                        <div class="metric-value improved">+35%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="self-mod-summary">
                            <p>Self-modification complete. ${getAreaName(area)} has been successfully improved.</p>
                        </div>
                    `;
                }, 1500);
            }, 1500);
        }, 1500);
    }, 1500);
}

/**
 * Get the display name for an improvement area
 * @param {string} area - Area code
 * @returns {string} - Display name
 */
function getAreaName(area) {
    const areas = {
        'performance': 'Performance Optimization',
        'features': 'Feature Enhancement',
        'security': 'Security Hardening',
        'ui': 'UI Improvement'
    };
    
    return areas[area] || area;
}

/**
 * Generate sample code for self-modification
 * @param {string} area - Area to improve
 * @returns {string} - Generated code
 */
function generateSelfModCode(area) {
    switch (area) {
        case 'performance':
            return `// Performance optimization
function optimizePerformance() {
  // Implement memoization for expensive operations
  const cache = new Map();
  
  return function(operation, ...args) {
    const key = operation + JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = operation(...args);
    cache.set(key, result);
    return result;
  };
}

// Apply optimization to critical functions
criticalFunction = optimizePerformance()(criticalFunction);`;

        case 'features':
            return `// Feature enhancement
class FeatureManager {
  constructor() {
    this.features = new Map();
  }
  
  register(name, implementation) {
    this.features.set(name, implementation);
  }
  
  execute(name, ...args) {
    if (!this.features.has(name)) {
      throw new Error(\`Feature \${name} not found\`);
    }
    
    return this.features.get(name)(...args);
  }
}

// Register new enhanced feature
featureManager.register('advancedAnalysis', function(data) {
  // Implementation of new advanced analysis feature
  return analyzedResults;
});`;

        case 'security':
            return `// Security hardening
function securityEnhancement() {
  // Input validation
  function validateInput(input, schema) {
    // Validate input against schema
    if (!isValid(input, schema)) {
      throw new Error('Invalid input');
    }
    return input;
  }
  
  // Output sanitization
  function sanitizeOutput(output) {
    // Sanitize output to prevent data leakage
    return sanitized;
  }
  
  // Apply security enhancements to API
  const originalAPI = { ...API };
  
  for (const method in originalAPI) {
    API[method] = function(...args) {
      const validatedArgs = validateInput(args, schemas[method]);
      const result = originalAPI[method](...validatedArgs);
      return sanitizeOutput(result);
    };
  }
}`;

        case 'ui':
            return `// UI improvement
function enhanceUI() {
  // Add responsive design improvements
  const mediaQueries = {
    mobile: '(max-width: 768px)',
    tablet: '(min-width: 769px) and (max-width: 1024px)',
    desktop: '(min-width: 1025px)'
  };
  
  // Apply device-specific optimizations
  for (const [device, query] of Object.entries(mediaQueries)) {
    if (window.matchMedia(query).matches) {
      document.body.classList.add(\`device-\${device}\`);
      applyDeviceOptimizations(device);
    }
  }
  
  // Enhance accessibility
  improveAccessibility();
  
  // Add animations and transitions
  addSmoothTransitions();
}`;

        default:
            return `// Self-modification code for ${area}`;
    }
}
