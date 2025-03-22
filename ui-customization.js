// AMPLIFAI UI Customization Code
// This code enables UI customization through natural language prompts

// Main UI customization handler
class AmplifaiUICustomizer {
  constructor() {
    this.versionHistory = [];
    this.currentVersion = 0;
    this.userPreferences = {};
    this.initialized = false;
  }

  // Initialize the customizer
  init() {
    if (this.initialized) return;
    
    this.createCustomizationInterface();
    this.setupEventListeners();
    this.loadUserPreferences();
    this.initialized = true;
    
    console.log('AMPLIFAI UI Customizer initialized');
  }

  // Create the UI for customization
  createCustomizationInterface() {
    const customizationBar = document.createElement('div');
    customizationBar.id = 'amplifai-customization-bar';
    customizationBar.innerHTML = `
      <div class="customization-container">
        <div class="customization-header">
          <h3>AMPLIFAI UI Customization</h3>
          <button id="toggle-customization">▼</button>
        </div>
        <div class="customization-content">
          <p>Describe how you'd like to customize the interface:</p>
          <textarea id="customization-prompt" placeholder="e.g., Make the background darker and increase font size"></textarea>
          <div class="customization-actions">
            <button id="apply-customization">Apply Changes</button>
            <button id="reset-customization">Reset</button>
          </div>
          <div class="customization-history">
            <h4>History</h4>
            <ul id="customization-history-list"></ul>
          </div>
        </div>
      </div>
    `;
    
    document.body.prepend(customizationBar);
  }

  // Set up event listeners for the customization interface
  setupEventListeners() {
    document.getElementById('toggle-customization').addEventListener('click', this.toggleCustomizationPanel.bind(this));
    document.getElementById('apply-customization').addEventListener('click', this.processCustomizationRequest.bind(this));
    document.getElementById('reset-customization').addEventListener('click', this.resetCustomization.bind(this));
  }

  // Toggle the customization panel visibility
  toggleCustomizationPanel() {
    const content = document.querySelector('.customization-content');
    const toggle = document.getElementById('toggle-customization');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      toggle.textContent = '▼';
    } else {
      content.style.display = 'none';
      toggle.textContent = '▲';
    }
  }

  // Process the user's customization request
  processCustomizationRequest() {
    const promptText = document.getElementById('customization-prompt').value.trim();
    if (!promptText) return;
    
    // Save current state to history
    this.saveToHistory();
    
    // Parse the natural language request
    const customizationChanges = this.parseCustomizationRequest(promptText);
    
    // Apply the changes
    this.applyCustomizationChanges(customizationChanges);
    
    // Update history UI
    this.updateHistoryUI(promptText);
    
    // Clear the prompt
    document.getElementById('customization-prompt').value = '';
  }

  // Parse the natural language customization request
  parseCustomizationRequest(promptText) {
    // This is a simplified implementation
    // In a real implementation, this would use NLP to understand the request
    const changes = {
      styles: {},
      layout: {},
      functionality: {}
    };
    
    // Simple keyword matching for demonstration
    if (promptText.includes('dark') || promptText.includes('darker')) {
      changes.styles.backgroundColor = '#222';
      changes.styles.color = '#fff';
    }
    
    if (promptText.includes('light') || promptText.includes('lighter')) {
      changes.styles.backgroundColor = '#f8f8f8';
      changes.styles.color = '#333';
    }
    
    if (promptText.includes('font size') || promptText.includes('larger text')) {
      changes.styles.fontSize = '1.2em';
    }
    
    if (promptText.includes('compact') || promptText.includes('smaller')) {
      changes.layout.compact = true;
    }
    
    return changes;
  }

  // Apply the customization changes
  applyCustomizationChanges(changes) {
    // Apply style changes
    if (Object.keys(changes.styles).length > 0) {
      let styleElement = document.getElementById('amplifai-custom-styles');
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'amplifai-custom-styles';
        document.head.appendChild(styleElement);
      }
      
      let cssText = 'body {';
      for (const [property, value] of Object.entries(changes.styles)) {
        cssText += `${this.camelToDash(property)}: ${value}; `;
      }
      cssText += '}';
      
      styleElement.textContent = cssText;
    }
    
    // Apply layout changes
    if (changes.layout.compact) {
      document.body.classList.add('amplifai-compact-layout');
    } else {
      document.body.classList.remove('amplifai-compact-layout');
    }
    
    // Store user preferences
    this.userPreferences = {
      ...this.userPreferences,
      styles: { ...this.userPreferences.styles, ...changes.styles },
      layout: { ...this.userPreferences.layout, ...changes.layout }
    };
    
    this.saveUserPreferences();
  }

  // Convert camelCase to dash-case for CSS properties
  camelToDash(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  // Save current state to history
  saveToHistory() {
    const currentState = {
      styles: document.getElementById('amplifai-custom-styles')?.textContent || '',
      bodyClasses: [...document.body.classList],
      timestamp: new Date().toISOString()
    };
    
    this.versionHistory.push(currentState);
    this.currentVersion = this.versionHistory.length - 1;
  }

  // Update the history UI
  updateHistoryUI(promptText) {
    const historyList = document.getElementById('customization-history-list');
    const historyItem = document.createElement('li');
    historyItem.textContent = promptText;
    historyItem.dataset.version = this.currentVersion;
    historyItem.addEventListener('click', () => this.restoreVersion(this.currentVersion));
    
    historyList.appendChild(historyItem);
  }

  // Restore a previous version
  restoreVersion(versionIndex) {
    if (versionIndex < 0 || versionIndex >= this.versionHistory.length) return;
    
    const version = this.versionHistory[versionIndex];
    
    // Restore styles
    let styleElement = document.getElementById('amplifai-custom-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'amplifai-custom-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = version.styles;
    
    // Restore body classes
    document.body.className = '';
    version.bodyClasses.forEach(cls => document.body.classList.add(cls));
    
    this.currentVersion = versionIndex;
  }

  // Reset all customizations
  resetCustomization() {
    // Remove custom styles
    const styleElement = document.getElementById('amplifai-custom-styles');
    if (styleElement) {
      styleElement.textContent = '';
    }
    
    // Remove layout classes
    document.body.classList.remove('amplifai-compact-layout');
    
    // Clear history UI
    document.getElementById('customization-history-list').innerHTML = '';
    
    // Reset user preferences
    this.userPreferences = {};
    this.saveUserPreferences();
    
    // Reset history
    this.versionHistory = [];
    this.currentVersion = 0;
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    try {
      const savedPreferences = localStorage.getItem('amplifai-ui-preferences');
      if (savedPreferences) {
        this.userPreferences = JSON.parse(savedPreferences);
        
        // Apply saved preferences
        this.applyCustomizationChanges({
          styles: this.userPreferences.styles || {},
          layout: this.userPreferences.layout || {}
        });
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  }

  // Save user preferences to localStorage
  saveUserPreferences() {
    try {
      localStorage.setItem('amplifai-ui-preferences', JSON.stringify(this.userPreferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }
}

// Initialize the customizer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.amplifaiUICustomizer = new AmplifaiUICustomizer();
  window.amplifaiUICustomizer.init();
});
