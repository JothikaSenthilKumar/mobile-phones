import { useState } from "react";
import { Link } from "react-router-dom";
import "./chatbot.css";

const quickQuestions = [
  "Help me find a phone",
  "How does the cart work?",
  "Contact support",
];

function getReply(message) {
  const question = message.toLowerCase();

  if (/phone|model|brand|price|search|find|recommend/.test(question)) {
    return (
      <>
        Browse the phone catalog to search by model or filter by brand. The
        prices and inventory shown here are sample demo data.{" "}
        <Link to="/products">View phones</Link>
      </>
    );
  }

  if (/cart|bag|checkout|order|buy|purchase|delivery|shipping/.test(question)) {
    return (
      <>
        Add a phone to your cart and adjust its quantity there. This demo does
        not process orders or payments.{" "}
        <Link to="/cart">Open your cart</Link>
      </>
    );
  }

  if (/contact|support|help|message|email/.test(question)) {
    return (
      <>
        The contact form is available, but it is not connected to a live support
        service.{" "}
        <Link to="/contact">Open the contact page</Link>
      </>
    );
  }

  if (/login|account|register|password/.test(question)) {
    return "Login and registration are demo screens only; no account or password is stored or verified.";
  }

  return "I can help you browse phones, use the cart, or find the contact page. This is a demo assistant, not a live support agent.";
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "assistant",
      text: "Hi! I’m the MobiZone demo assistant. What can I help you find?",
    },
  ]);

  function sendMessage(text) {
    const trimmedMessage = text.trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: currentMessages.length, sender: "user", text: trimmedMessage },
      {
        id: currentMessages.length + 1,
        sender: "assistant",
        text: getReply(trimmedMessage),
      },
    ]);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(message);
  }

  return (
    <aside className="chatbot">
      {isOpen && (
        <section className="chatbot-panel" aria-label="MobiZone demo assistant">
          <header className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true">M</div>
            <div className="chatbot-heading">
              <strong>MobiZone assistant</strong>
              <span>Demo help · not live support</span>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item) => (
              <div
                className={`chatbot-message chatbot-message-${item.sender}`}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="chatbot-quick-questions" aria-label="Suggested questions">
              {quickQuestions.map((question) => (
                <button
                  type="button"
                  key={question}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <label className="chatbot-visually-hidden" htmlFor="chatbot-message">
              Type a message
            </label>
            <input
              id="chatbot-message"
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask a question..."
              autoComplete="off"
            />
            <button type="submit" disabled={!message.trim()} aria-label="Send message">
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close MobiZone assistant" : "Open MobiZone assistant"}
      >
        <span aria-hidden="true">{isOpen ? "×" : "💬"}</span>
        {!isOpen && <span>Chat with us</span>}
      </button>
    </aside>
  );
}

export default Chatbot;
