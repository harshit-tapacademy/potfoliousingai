document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
  } else {
    document.body.classList.add('light-mode');
    themeToggle.checked = false;
  }
  
  // Toggle theme when the switch is clicked
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Active navigation link handling
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Also update active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
  
  // Initialize skill progress bars
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Function to animate skill bars when they come into view
  const animateSkillBars = () => {
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.skill-progress');
      const level = item.getAttribute('data-level');
      
      // Set the width based on the data-level attribute
      progressBar.style.width = `${level}%`;
    });
  };
  
  // Use Intersection Observer to trigger animation when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          animateSkillBars();
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe the skills section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Timeline animation
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
  });
  
  // Project modal functionality
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-project-content');
  const closeModal = document.querySelector('.close-modal');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Project details data - would typically come from a database or JSON file
  const projectDetails = {
    project1: {
      title: "E-Commerce Platform",
      description: "A comprehensive online shopping solution built with React and Node.js. This platform includes user authentication, product catalog, shopping cart, checkout process with payment integration, and order management.",
      features: [
        "Responsive design for mobile and desktop users",
        "Secure payment processing with Stripe",
        "Admin dashboard for inventory management",
        "User account management and order history"
      ],
      challenges: "Implementing a secure and efficient payment processing system while ensuring data consistency across the platform.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API"],
      image: "https://images.pexels.com/photos/6956892/pexels-photo-6956892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    },
    project2: {
      title: "Weather Dashboard",
      description: "Real-time weather tracking application that provides current conditions and forecasts for any location worldwide. Uses multiple weather APIs to ensure accuracy.",
      features: [
        "Location search with autocomplete",
        "5-day weather forecast",
        "Interactive weather maps",
        "Saved locations for quick access"
      ],
      challenges: "Integrating multiple weather data sources and optimizing API calls to reduce loading times.",
      technologies: ["JavaScript", "HTML5", "CSS3", "OpenWeather API", "Mapbox API"],
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    },
    // Add details for other projects similarly
    project3: {
      title: "Task Management System",
      description: "Collaborative project tracking tool designed for teams to organize and prioritize tasks. Features real-time updates and notifications to keep team members in sync.",
      features: [
        "Kanban board view for visual task management",
        "Task assignments and due dates",
        "Comment system for task discussions",
        "File attachments and sharing"
      ],
      challenges: "Implementing real-time updates across multiple clients while maintaining data integrity.",
      technologies: ["Vue.js", "Firebase", "Vuex", "Cloud Functions"],
      image: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    },
    project4: {
      title: "AI Image Generator",
      description: "Web application that leverages machine learning to create unique images based on text prompts. Utilizes advanced AI models for image generation.",
      features: [
        "Text-to-image generation",
        "Style transfer options",
        "Gallery of generated images",
        "Download in multiple formats"
      ],
      challenges: "Optimizing the machine learning model to run efficiently in a web environment and managing server resources.",
      technologies: ["Python", "TensorFlow", "Flask", "React", "WebSockets"],
      image: "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    },
    project5: {
      title: "Crypto Dashboard",
      description: "Real-time cryptocurrency tracking dashboard with portfolio management features. Provides detailed analytics and market trends.",
      features: [
        "Live price updates for major cryptocurrencies",
        "Portfolio tracking and performance metrics",
        "Price alerts and notifications",
        "Historical data visualization"
      ],
      challenges: "Managing real-time data streams and creating efficient data visualization components.",
      technologies: ["Angular", "Node.js", "Chart.js", "CoinGecko API", "Socket.io"],
      image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    },
    project6: {
      title: "Social Media App",
      description: "Mobile-first social platform designed for content creators and their communities. Features rich media sharing and direct messaging.",
      features: [
        "User profiles and content feeds",
        "Direct messaging with read receipts",
        "Content creation tools for photos and videos",
        "Notification system"
      ],
      challenges: "Building a performant and feature-rich mobile application while maintaining a smooth user experience.",
      technologies: ["React Native", "Firebase", "Redux", "Cloud Storage", "Push Notifications"],
      image: "https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      liveLink: "#",
      githubLink: "#"
    }
  };
  
  // Function to open modal with project details
  function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;
    
    // Create modal content HTML
    let modalHTML = `
      <div class="modal-project">
        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-description">${project.description}</p>
        
        <div class="modal-project-section">
          <h3>Key Features</h3>
          <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="modal-project-section">
          <h3>Technical Challenge</h3>
          <p>${project.challenges}</p>
        </div>
        
        <div class="modal-project-section">
          <h3>Technologies Used</h3>
          <div class="modal-project-tags">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
        </div>
        
        <div class="modal-project-links">
          <a href="${project.liveLink}" class="pixel-btn" target="_blank">View Live</a>
          <a href="${project.githubLink}" class="pixel-btn" target="_blank">GitHub Repo</a>
        </div>
      </div>
    `;
    
    // Set modal content and display it
    modalContent.innerHTML = modalHTML;
    modal.style.display = 'flex';
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Attach click event to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't open modal if clicking on direct links
      if (e.target.closest('.project-link') || e.target.closest('.project-github')) {
        return;
      }
      
      const projectId = this.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
  
  // Close modal when clicking the close button
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside the content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Close modal with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Add this CSS for the modal project details
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .modal-project {
        padding: 20px;
      }
      
      .modal-project-image {
        width: 100%;
        max-height: 400px;
        object-fit: cover;
        border: var(--pixel-size) solid var(--accent-color);
        margin-bottom: 20px;
      }
      
      .modal-project-title {
        font-size: 1.8rem;
        color: var(--accent-color);
        margin-bottom: 15px;
      }
      
      .modal-project-description {
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 25px;
      }
      
      .modal-project-section {
        margin-bottom: 25px;
      }
      
      .modal-project-section h3 {
        font-size: 1.2rem;
        color: var(--accent-color);
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: var(--pixel-size) solid var(--accent-color);
        display: inline-block;
      }
      
      .modal-project-section ul {
        list-style-type: none;
        padding-left: 5px;
      }
      
      .modal-project-section ul li {
        font-size: 0.8rem;
        line-height: 1.6;
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;
      }
      
      .modal-project-section ul li::before {
        content: ">";
        position: absolute;
        left: 0;
        color: var(--accent-color);
      }
      
      .modal-project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .modal-project-tags span {
        padding: 5px 10px;
        background-color: rgba(var(--accent-color-rgb), 0.1);
        font-size: 0.7rem;
        border: 2px solid var(--accent-color);
      }
      
      .modal-project-links {
        display: flex;
        gap: 15px;
        margin-top: 30px;
      }
    </style>
  `);
  
  // Chat functionality
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  // Predefined responses for the AI assistant
  // In a real implementation, this would be replaced with an API call
  const aiResponses = {
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! Feel free to ask me anything about my work or experience.",
    "tell me about your experience": "I have 5+ years of experience in full-stack development, focusing on JavaScript frameworks like React and Node.js. I've worked on e-commerce platforms, real-time applications, and cloud-based solutions.",
    "what technologies do you work with?": "I primarily work with JavaScript/TypeScript, React, Node.js, Python, and various cloud services like AWS. I'm also experienced with database technologies including MongoDB and SQL.",
    "are you available for freelance work?": "Yes, I'm currently available for freelance projects! Feel free to contact me through the form in the Contact section with details about your project.",
    "what's your favorite programming language?": "I enjoy working with JavaScript and TypeScript for their versatility, but Python holds a special place for its elegance and simplicity!",
    "how can i contact you": "You can reach me through the contact form at the bottom of this page, or via email at myemail@example.com.",
    "default": "Thank you for your message! I'll get back to you on this shortly. Feel free to ask something else or check out my projects section."
  };
  
  // Function to add a message to the chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    const now = new Date();
    const timeString = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
      </div>
      <span class="message-time">${timeString}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
  }
  
  // Function to show typing indicator
  function showTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('message', 'bot-message', 'typing-indicator-container');
    indicatorDiv.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    indicatorDiv.id = 'typing-indicator';
    chatMessages.appendChild(indicatorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicatorDiv;
  }
  
  // Function to remove typing indicator
  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
  
  // Function to process message and get AI response
  function processMessage(message) {
    // Convert to lowercase for easier matching
    const lowerMessage = message.toLowerCase();
    
    // Show typing indicator for a more realistic feel
    const indicator = showTypingIndicator();
    
    // Simulate API call delay
    setTimeout(() => {
      removeTypingIndicator();
      
      // Look for a matching response
      let response = aiResponses.default;
      
      // Check for exact matches first
      if (aiResponses[lowerMessage]) {
        response = aiResponses[lowerMessage];
      } else {
        // Check for partial matches - very basic implementation
        for (const key in aiResponses) {
          if (key !== 'default' && lowerMessage.includes(key)) {
            response = aiResponses[key];
            break;
          }
        }
      }
      
      // Add the AI response
      addMessage(response, false);
      
      /* 
      // In a real implementation, you would replace the above with an API call:
      
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {role: 'system', content: 'You are an AI assistant for a software engineer portfolio website.'},
            {role: 'user', content: message}
          ]
        })
      })
      .then(response => response.json())
      .then(data => {
        addMessage(data.choices[0].message.content, false);
      })
      .catch(error => {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error processing your request.', false);
      });
      */
      
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }
  
  // Send message when clicking the send button
  chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, true);
      chatInput.value = '';
      processMessage(message);
    }
  });
  
  // Send message when pressing Enter in the input field
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const message = chatInput.value.trim();
      if (message) {
        addMessage(message, true);
        chatInput.value = '';
        processMessage(message);
      }
    }
  });
  
  // Handle suggestion buttons
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      addMessage(question, true);
      processMessage(question);
    });
  });
  
  // Auto-focus the chat input when scrolling to chat section
  const chatSection = document.getElementById('chat');
  const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chatInput.focus();
      }
    });
  }, { threshold: 0.5 });
  
  if (chatSection) {
    chatObserver.observe(chatSection);
  }
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formDataObj = Object.fromEntries(formData);
      
      try {
        // Show "sending" state by disabling the submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // INTEGRATION POINT: Send data to email service
        // Here's where you would integrate with an email-sending service like Resend API
        
        /* 
        Example implementation with a hypothetical API service:
        
        const response = await fetch('https://api.your-email-service.com/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
          },
          body: JSON.stringify({
            from: 'your-portfolio@example.com',
            to: 'your-email@example.com',
            subject: `New contact from ${formDataObj.name}`,
            html: `
              <p><strong>Name:</strong> ${formDataObj.name}</p>
              <p><strong>Email:</strong> ${formDataObj.email}</p>
              <p><strong>Message:</strong></p>
              <p>${formDataObj.message.replace(/\n/g, '<br>')}</p>
            `
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        */
        
        // For demonstration, simulate a successful API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        contactForm.reset();
        formSuccess.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Show error message
        formError.classList.add('show');
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          formError.classList.remove('show');
        }, 5000);
      } finally {
        // Reset button state
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
}); 