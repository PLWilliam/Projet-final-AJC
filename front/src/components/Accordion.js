import React, { useState } from 'react';
import './Accordion.css';


const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="accordion-item">
        <div className="accordion-question" onClick={toggleAccordion}>
          {question}
          <span className="accordion-icon">{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && <div className="accordion-answer">{answer}</div>}
      </div>
    );
  };
  
  const Accordion = () => {
    const faqData = [
      {
        question: 'Pourquoi devrais-je utiliser CodeBook ?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Repellendus earum dicta nesciunt...',
      },
      {
        question: 'Puis-je accéder à mon eBook sur mobile ?',
        answer: 'Oui, vous pouvez accéder à vos eBooks sur n’importe quel appareil mobile.',
      },
      {
        question: 'Offrez-vous des remboursements ?',
        answer: 'Nous offrons des remboursements sous certaines conditions. Veuillez consulter notre politique.',
      },
      {
        question: 'Supportez-vous les paiements internationaux ?',
        answer: 'Oui, nous acceptons les paiements internationaux via plusieurs méthodes de paiement.',
      },
    ];
  
    return (
      <div className="accordion">
        <h2>Une question en tête ?</h2>
        {faqData.map((item, index) => (
          <AccordionItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    );
  };
  
  export default Accordion;