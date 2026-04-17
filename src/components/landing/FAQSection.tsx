import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is Webzeo?", a: "Webzeo is an AI-powered platform that lets you build, deploy, and manage full-stack web applications by simply describing what you want in plain English." },
  { q: "How does the AI build my app?", a: "Our proprietary engine translates your natural language prompts into production-ready React frontend code, Node.js backend logic, and database schemas, then wires them all together instantly." },
  { q: "Do I need to know how to code?", a: "Not at all! You can build fully functional apps without writing a single line of code. However, if you are a developer, you have full access to the underlying code to customize it further." },
  { q: "Can I export my code?", a: "Yes, Pro and Team plan users can export their entire codebase (Frontend, Backend, and DB schema) to a GitHub repository or download it as a ZIP file." },
  { q: "What databases are supported?", a: "Currently, we support Firebase/Firestore out of the box. We are actively working on adding support for Supabase (PostgreSQL) and MongoDB." },
  { q: "How is billing handled?", a: "We use Stripe for secure payment processing. You can upgrade, downgrade, or cancel your subscription at any time from your dashboard settings." },
];

export default function FAQSection() {
  return (
    <section className="py-32 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Frequently Asked Questions</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
            <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-6">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-text-muted text-base leading-relaxed pb-6">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
