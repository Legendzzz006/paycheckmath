interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
            <span className="text-blue-600 text-xl flex-shrink-0">Q.</span>
            <span>{faq.question}</span>
          </h3>
          <p className="text-gray-700 leading-relaxed pl-8">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
