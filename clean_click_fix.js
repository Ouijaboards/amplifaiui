(function() {
  function initAmplifaiClickFix() {
    console.log("Amplifai Click Fix: Initializing");
    
    function findAmplifaiElements() {
      const textSelectors = [
        'open manus', 'openmanus', 'amplifai', 
        'chat', 'assistant', 'ai assistant'
      ];
      
      const allElements = document.querySelectorAll('a, button, div, span, p, h1, h2, h3, h4, h5, h6, li');
      const matchedElements = [];
      
      allElements.forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        if (textSelectors.some(selector => text.includes(selector))) {
          matchedElements.push(el);
        }
      });
      
      const classIdSelectors = [
        '.amplifai', '.openmanus', '.chat-button', '.ai-button',
        '#amplifai', '#openmanus', '#chat-button', '#ai-button',
        '[data-amplifai]', '[data-openmanus]', '[data-chat]'
      ];
      
      classIdSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (!matchedElements.includes(el)) {
              matchedElements.push(el);
            }
          });
        } catch (e) {}
      });
      
      return matchedElements;
    }
    
    function createChatInterface() {
      if (document.getElementById('amplifai-chat-interface')) {
        return document.getElementById('amplifai-chat-interface');
      }
      
      const chatInterface = document.createElement('div');
      chatInterface.id = 'amplifai-chat-interface';
      chatInterface.className = 'amplifai-chat';
      
      const chatHeader = document.createElement('div');
      chatHeader.className = 'chat-header';
      chatHeader.innerHTML = `
        <h3>Amplifai</h3>
        <button class="close-btn">&times;</button>
      `;
      
      const chatBody = document.createElement('div');
      chatBody.className = 'chat-body';
      chatBody.id = 'chat-output';
      
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'message response';
      welcomeMsg.innerHTML = `
        <div class="message-header">
          <span class="agent-tag">Amplifai</span>
          <span class="timestamp">Just now</span>
        </div>
        <div class="message-content">Hello! I'm Amplifai, your AI assistant. How can I help you today?</div>
      `;
      chatBody.appendChild(welcomeMsg);
      
      const chatFooter = document.createElement('div');
      chatFooter.className = 'chat-footer';
      chatFooter.innerHTML = `
        <form id="chat-form">
          <input type="text" id="user-input" placeholder="Type your message here..." />
          <button type="submit" id="send-button">Send</button>
        </form>
      `;
      
      chatInterface.appendChild(chatHeader);
      chatInterface.appendChild(chatBody);
      chatInterface.appendChild(chatFooter);
      
      const styles = document.createElement('style');
      styles.textContent = `
        .amplifai-chat {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          height: 500px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 25px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        
        .amplifai-chat.active {
          display: flex !important;
        }
        
        .chat-header {
          padding: 15px;
          background: #222;
          color: white;
          border-radius: 10px 10px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .chat-header h3 {
          margin: 0;
          font-size: 16px;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        
        .chat-body {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f9f9f9;
        }
        
        .message {
          margin-bottom: 15px;
          max-width: 80%;
        }
        
        .message.response {
          margin-left: 0;
        }
        
        .message.user-message {
          margin-left: auto;
          background: #f0f0f0;
          padding: 10px;
          border-radius: 10px;
        }
        
        .message-header {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 5px;
          color: #666;
        }
        
        .message-content {
          background: #f0f0f0;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .chat-footer {
          padding: 15px;
          border-top: 1px solid #eee;
          background: white;
          border-radius: 0 0 10px 10px;
        }
        
        #chat-form {
          display: flex;
        }
        
        #user-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-right: 10px;
          font-size: 14px;
        }
        
        #send-button {
          background: #222;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        }
      `;
      
      document.head.appendChild(styles);
      document.body.appendChild(chatInterface);
      
      const closeBtn = chatInterface.querySelector('.close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          chatInterface.classList.remove('active');
        });
      }
      
      const chatForm = document.getElementById('chat-form');
      if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const input = document.getElementById('user-input');
          const message = input.value.trim();
          
          if (message) {
            const userMessageEl = document.createElement('div');
            userMessageEl.className = 'message user-message';
            userMessageEl.innerHTML = `
              <div class="message-content">${escapeHTML(message)}</div>
            `;
            chatBody.appendChild(userMessageEl);
            
            input.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            
            setTimeout(() => {
              const responseEl = document.createElement('div');
              responseEl.className = 'message response';
              responseEl.innerHTML = `
                <div class="message-header">
                  <span class="agent-tag">Amplifai</span>
                  <span class="timestamp">Just now</span>
                </div>
                <div class="message-content">I'm Amplifai, your AI assistant powered by a multi-agent system. I'm still in development, but I'm learning to help with various tasks.</div>
              `;
              chatBody.appendChild(responseEl);
              chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
          }
        });
      }
      
      return chatInterface;
    }
    
    function escapeHTML(str) {
      return (str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
    
    function addClickHandlers() {
      const elements = findAmplifaiElements();
      
      elements.forEach((element, index) => {
        const clone = element.cloneNode(true);
        
        clone.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const chatInterface = createChatInterface();
          
          chatInterface.style.display = 'flex';
          chatInterface.classList.add('active');
          
          return false;
        }, true);
        
        if (element.parentNode) {
          element.parentNode.replaceChild(clone, element);
        }
      });
    }
    
    addClickHandlers();
    
    document.addEventListener('click', function(e) {
      const target = e.target;
      const text = (target.textContent || '').toLowerCase();
      
      if (text.includes('open manus') || 
          text.includes('openmanus') || 
          text.includes('amplifai')) {
        e.preventDefault();
        e.stopPropagation();
        
        const chatInterface = createChatInterface();
        
        chatInterface.style.display = 'flex';
        chatInterface.classList.add('active');
        
        return false;
      }
    }, true);
    
    const observer = new MutationObserver(function(mutations) {
      let shouldReapply = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldReapply = true;
        }
      });
      
      if (shouldReapply) {
        addClickHandlers();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    window.addEventListener('popstate', function() {
      setTimeout(addClickHandlers, 500);
    });
    
    window.amplifaiClickFix = {
      reapply: addClickHandlers,
      createChat: createChatInterface,
      version: '2.0'
    };
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAmplifaiClickFix);
  } else {
    initAmplifaiClickFix();
  }
  
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (window.amplifaiClickFix) {
        window.amplifaiClickFix.reapply();
      } else {
        initAmplifaiClickFix();
      }
    }, 1000);
  });
})();
