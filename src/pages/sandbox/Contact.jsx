import React from 'react';
import ContactForm from '../../components/sandbox/contact/ContactForm';
import RocketField from '../../components/sandbox/ui/RocketField';

export default function ContactPage() {
  return (
    <main className="relative isolate w-full">
      <RocketField sparse dropRight={2} topRocket />
      <ContactForm />
    </main>
  );
}
