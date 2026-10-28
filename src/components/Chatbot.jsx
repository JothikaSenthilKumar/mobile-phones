import { useState } from "react";
import { Link } from "react-router-dom";
import phones from "../data/phones.js";
import "./chatbot.css";

const quickQuestions = [
  "Recommend a phone under ₹50,000",
  "What phones do you have?",
  "What's in my cart?",
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function findBudget(message) {
  const match = message.match(
    /(?:under|below|within|less than|max(?:imum)?|budget(?: of)?|₹|rs\.?\s*)(?:₹|rs\.?\s*)?([\d,]+(?:\.\d+)?)\s*(k)?/i
  );
  if (!match) return null;

  const amount = Number(match[1].replaceAll(",", ""));
  return Number.isFinite(amount) ? amount * (match[2] ? 1000 : 1) : null;
}

function getReply(message, cart) {
  const question = message.toLowerCase().trim();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(question)) {
    return "Hi there! Happy to help you find a phone. Do you have a brand or budget in mind?";
  }

  if (/\b(thanks|thank you|thx)\b/.test(question)) {
    return "You’re welcome! If you tell me what you’re looking for, I can help narrow down the phones in our catalog.";
  }

  if (/\b(cart|bag|basket|checkout|order|buy|purchase)\b/.test(question)) {
    if (/\b(checkout|order|buy|purchase)\b/.test(question)) {
      return (
        <>
          This demo doesn’t support checkout or place real orders. You currently
          have {cartCount} {cartCount === 1 ? "item" : "items"} in your cart.
          You can review it on the <Link to="/cart">cart page</Link>.
        </>
      );
    }

    if (cart.length === 0) {
      return (
        <>
          Your cart is empty right now. You can browse the{" "}
          <Link to="/products">phone catalog</Link> and add a model you like.
        </>
      );
    }

    const items = cart
      .map((item) => `${item.quantity} × ${item.name}`)
      .join(", ");
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return (
      <>
        You have {items} in your cart. The current demo subtotal is{" "}
        {currency.format(subtotal)}. You can change quantities or remove items
        on the <Link to="/cart">cart page</Link>.
      </>
    );
  }

  if (/\b(delivery|shipping|arrive|tracking|track|return|refund|warranty)\b/.test(question)) {
    return "I can’t check shipping, delivery dates, returns, refunds, or warranty details because this demo isn’t connected to an order or support system.";
  }

  if (/\b(contact|support|agent|human|person|message)\b/.test(question)) {
    return (
      <>
        I’m an automated demo assistant, not a live support agent. You can leave
        a message on the <Link to="/contact">contact page</Link>, but that form
        is not connected to a support service yet.
      </>
    );
  }

  if (/\b(login|account|register|password|sign in)\b/.test(question)) {
    return "The login and registration screens are demos. They don’t create accounts or verify passwords, so please don’t enter real account credentials.";
  }

  const matchingPhone = phones.find((phone) =>
    question.includes(phone.name.toLowerCase())
  );

  if (matchingPhone) {
    if (/\b(spec|specification|camera|battery|storage|memory|display|screen|processor|chip)\b/.test(question)) {
      return (
        <>
          I don’t have verified specifications for the {matchingPhone.name} in
          this catalog. I can confirm its listed demo price is{" "}
          {currency.format(matchingPhone.price)}. See the{" "}
          <Link to={`/products?brand=${encodeURIComponent(matchingPhone.brand)}`}>
            {matchingPhone.brand} phones
          </Link>{" "}
          in the catalog.
        </>
      );
    }

    return (
      <>
        The {matchingPhone.brand} {matchingPhone.name} is listed at{" "}
        {currency.format(matchingPhone.price)} in this demo catalog. The crossed
        out reference price is {currency.format(matchingPhone.oldPrice)}.{" "}
        <Link to={`/products?brand=${encodeURIComponent(matchingPhone.brand)}`}>
          Browse {matchingPhone.brand} phones
        </Link>
        . Prices are sample data, not a live offer.
      </>
    );
  }

  const budget = findBudget(question);
  if (budget !== null) {
    const affordablePhones = phones
      .filter((phone) => phone.price <= budget)
      .sort((first, second) => second.price - first.price)
      .slice(0, 3);

    if (affordablePhones.length === 0) {
      return (
        <>
          I couldn’t find a phone at or under {currency.format(budget)} in this
          demo catalog. The lowest listed price is{" "}
          {currency.format(Math.min(...phones.map((phone) => phone.price)))}.{" "}
          <Link to="/products">See all phones</Link>.
        </>
      );
    }

    return (
      <>
        Based on the prices shown here, these fit within {currency.format(budget)}:{" "}
        {affordablePhones
          .map((phone) => `${phone.name} (${currency.format(phone.price)})`)
          .join(", ")}.
        {" "}These are sample catalog prices.{" "}
        <Link to="/products">Compare them in the catalog</Link>.
      </>
    );
  }

  const brand = [...new Set(phones.map((phone) => phone.brand))].find((name) =>
    question.includes(name.toLowerCase())
  );

  if (brand) {
    const brandPhones = phones.filter((phone) => phone.brand === brand);
    const models = brandPhones
      .map((phone) => `${phone.name} (${currency.format(phone.price)})`)
      .join(", ");

    return (
      <>
        We currently list {brandPhones.length} {brand}{" "}
        {brandPhones.length === 1 ? "model" : "models"}: {models}.{" "}
        <Link to={`/products?brand=${encodeURIComponent(brand)}`}>
          View {brand} phones
        </Link>
        . The listed prices are demo data.
      </>
    );
  }

  if (/\b(cheapest|lowest price|most affordable)\b/.test(question)) {
    const cheapest = phones.reduce((lowest, phone) =>
      phone.price < lowest.price ? phone : lowest
    );
    return (
      <>
        The lowest-priced phone in this demo catalog is the {cheapest.name} at{" "}
        {currency.format(cheapest.price)}.{" "}
        <Link to="/products">Browse all phones</Link>.
      </>
    );
  }

  if (/\b(expensive|premium|highest price|most expensive)\b/.test(question)) {
    const premium = phones.reduce((highest, phone) =>
      phone.price > highest.price ? phone : highest
    );
    return (
      <>
        The highest-priced phone currently listed is the {premium.name} at{" "}
        {currency.format(premium.price)}. That’s only a price comparison; the
        catalog doesn’t include verified spec comparisons.{" "}
        <Link to="/products">View the catalog</Link>.
      </>
    );
  }

  if (/\b(phone|model|brand|price|search|find|recommend|catalog|available)\b/.test(question)) {
    return (
      <>
        I can help narrow down the models in our catalog. Tell me a brand you
        like or a maximum budget—for example, “Samsung under ₹50,000.”{" "}
        <Link to="/products">Browse all phones</Link>.
      </>
    );
  }

  return "I’m not sure I understood that. I can answer questions about the phones and demo prices listed here, help check your cart, or point you to the contact page. What would you like to know?";
}

function Chatbot({ cart = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      sender: "assistant",
      text: "Hi! I can help you compare the phones in our catalog or check your cart. What are you looking for?",
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
        text: getReply(trimmedMessage, cart),
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
              <span>Catalog assistant · demo</span>
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
              placeholder="Ask about phones or your cart..."
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
