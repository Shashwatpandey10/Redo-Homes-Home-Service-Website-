
    //    addMessage Function 
        function addMessage(text, sender = 'sent') {
            const chatWindow = document.getElementById('chat-window');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;

            const messageText = document.createElement('p');
            messageText.textContent = text;

            const timestamp = document.createElement('span');
            const now = new Date();
            timestamp.className = 'timestamp';
            timestamp.textContent = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
            });

            messageDiv.appendChild(messageText);
            messageDiv.appendChild(timestamp);
            chatWindow.appendChild(messageDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        // getBotResponse Function

        function getBotResponse(userInput) {
            const responses = [
                { 
                    triggers: ['hello', 'hi', 'hey'], 
                    response: 'Hello! How may I assist you today?' 
                },
                { 
                    triggers: ['service', 'support', 'help'], 
                    response: 'Please describe your issue in detail and we will help you resolve it.' 
                },
                { 
                    triggers: ['thank', 'thanks'], 
                    response: 'You\'re welcome! Is there anything else I can help you with?' 
                },
                { 
                    triggers: ['bye', 'goodbye'], 
                    response: 'Thank you for contacting us. Have a great day!' 
                }
            ];

            const lowerInput = userInput.toLowerCase();
            const matchedResponse = responses.find(item => 
                item.triggers.some(trigger => lowerInput.includes(trigger)))
                || { response: "I've noted your message. Our team will get back to you shortly. Thank you for your patience!" };

            return matchedResponse.response;
        }

        // sendMessage Function

        function sendMessage() {
            const userInput = document.getElementById('user-input');
            const message = userInput.value.trim();
            
            if (message) {
                addMessage(message, 'sent');
                userInput.value = '';
                
                // Simulate typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'message received';
                typingIndicator.innerHTML = '<p><i class="fas fa-ellipsis-h"></i></p>';
                const chatWindow = document.getElementById('chat-window');
                chatWindow.appendChild(typingIndicator);
                chatWindow.scrollTop = chatWindow.scrollHeight;
                
                setTimeout(() => {
                    chatWindow.removeChild(typingIndicator);
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse, 'received');
                }, 1000 + Math.random() * 2000);
            }
        }

        // Allow sending message with Enter key
        document.getElementById('user-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
