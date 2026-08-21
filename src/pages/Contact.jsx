import { useState } from "react";
import { Mail, MapPin, Send, AlertCircle, ArrowUpRight } from "lucide-react";
import { Instagram, Linkedin, Tiktok } from "../components/ui/SocialIcons";
import Container from "../components/ui/Container";
import Reveal, { RevealGroup, RevealItem } from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import GradientBlob from "../components/ui/GradientBlob";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import { useToast } from "../components/ui/Toast";
import TextReveal from "../components/ui/TextReveal";
import SignatureMotif from "../components/ui/SignatureMotif";
import { cn } from "../lib/cn";

const reasons = ["General Inquiry", "Membership", "Sponsorship", "Event Proposal"];

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "eclub@apiit.lk",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "No. 388 Union Pl, Colombo 00200",
  },
];

const mapAddress = "No. 388 Union Pl, Colombo 00200";

const socials = [
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@apiit_eclub",
    accent: "text-[#C13584]",
    bar: "bg-[#C13584]",
    href: "https://www.instagram.com/apiit_eclub/",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "APIIT Entrepreneurship Club",
    accent: "text-[#0A66C2]",
    bar: "bg-[#0A66C2]",
    href: "https://www.linkedin.com/company/apiit-eclub/posts/?feedView=all",
  },
  {
    icon: Tiktok,
    name: "TikTok",
    handle: "@apiit_eclub",
    accent: "text-ink",
    bar: "bg-ink",
    href: "https://www.tiktok.com/@apiit_eclub",
  },
];

const faqs = [
  {
    question: "Does the Entrepreneurship Club collaborate with other clubs or organizations for events?",
    answer:
      "Yes, the Entrepreneurship Club frequently collaborates with other clubs and organizations to host events. By partnering with different groups, they can create more diverse and impactful gatherings, bringing together a broader range of expertise and interests to enrich the overall experience for participants.",
  },
  {
    question: "Does the Entrepreneurship Club offer any mentorship or guidance for aspiring entrepreneurs beyond events?",
    answer:
      "Entrepreneurship Club provides mentorship and guidance for aspiring entrepreneurs beyond events. Through one-on-one mentoring sessions, workshops, and networking opportunities, club members can receive valuable advice, support, and resources to help them develop their entrepreneurial ideas and ventures. This ongoing support aims to foster and nurture the growth of future entrepreneurs within the club community.",
  },
  {
    question: "Are the events geared towards students from specific academic backgrounds or open to all majors?",
    answer:
      "The events organized by the Entrepreneurship Club are typically open to students from all academic backgrounds and majors. The club aims to foster a diverse and inclusive entrepreneurial community, welcoming individuals from various disciplines who share an interest in entrepreneurship and innovation. This inclusive approach encourages cross-disciplinary collaboration and creative thinking among attendees.",
  },
];

const initialForm = { name: "", email: "", reason: reasons[0], message: "" };

export default function Contact() {
  const { notify } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const subject = encodeURIComponent(`[${form.reason}] Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
    window.location.href = `mailto:eclub@apiit.lk?subject=${subject}&body=${body}`;

    notify({
      title: "Opening your email app...",
      description: "We've pre-filled a message to eclub@apiit.lk - just hit send from there.",
      tone: "success",
    });
    setForm(initialForm);
    setErrors({});
  };

  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
        <GradientBlob tone="teal" size={440} className="-top-32 -left-24 opacity-60" />
        <GradientBlob tone="gold" size={340} className="-bottom-16 -right-16 opacity-50" />
        <SignatureMotif
          tone="dark"
          className="pointer-events-none absolute right-0 top-20 hidden h-auto w-[420px] max-w-none opacity-40 lg:block"
        />
        <Container className="relative">
          <Reveal direction="up">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-gold-dark" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-dark">Get in Touch</span>
            </div>
          </Reveal>
          <TextReveal
            as="h1"
            segments={[{ text: "Let's Start a" }, { text: "Conversation", className: "text-gradient-brand" }]}
            delay={0.08}
            className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl"
          />
          <Reveal direction="up" delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Whether you're a student curious about membership, a partner exploring
              sponsorship, or just want to say hello - we'd love to hear from you.
              Reach out and a member of our committee will get back to you soon.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-5">
            <Reveal direction="up" className="lg:col-span-3">
              <Card glow={false} className="relative overflow-hidden p-8 sm:p-10">
                <GradientBlob tone="teal" size={260} className="-top-20 -right-20 opacity-20" />
                <h2 className="relative text-2xl font-semibold text-ink sm:text-3xl">
                  Send Us a Message
                </h2>
                <p className="relative mt-2 text-ink-soft">
                  Fill out the form below and we'll respond as soon as we can.
                </p>

                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="relative mt-8 space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-ink">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={updateField("name")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className="mt-2 w-full rounded-xl border border-black/10 bg-bg px-4 py-3 text-ink outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/25"
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-ink">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className="mt-2 w-full rounded-xl border border-black/10 bg-bg px-4 py-3 text-ink outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/25"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <fieldset>
                    <legend className="block text-sm font-medium text-ink">Reason for Contact</legend>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {reasons.map((reason) => {
                        const active = form.reason === reason;
                        return (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, reason }))}
                            aria-pressed={active}
                            className={
                              active
                                ? "rounded-full bg-dark-green px-4 py-2 text-sm font-semibold text-white transition-all duration-300"
                                : "rounded-full border border-black/10 bg-bg px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-300 hover:border-teal/40 hover:text-teal-dark"
                            }
                          >
                            {reason}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-ink">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={updateField("message")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-bg px-4 py-3 text-ink outline-none transition-all duration-300 focus:border-teal focus:ring-2 focus:ring-teal/25"
                      placeholder="I'd love to learn more about joining the club and this semester's events..."
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" icon={false} className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>

                </form>
              </Card>
            </Reveal>

            <Reveal direction="up" delay={0.1} className="lg:col-span-2">
              <div className="flex h-full flex-col gap-6">
                <Card glow={false} className="p-8">
                  <h3 className="text-lg font-semibold text-ink">Contact Information</h3>
                  <ul className="mt-6 space-y-5">
                    {contactInfo.map((item) => (
                      <li key={item.label} className="flex items-start gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-dark">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-ink">{item.value}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card glow={false} className="overflow-hidden p-0">
                  <iframe
                    title="APIIT Entrepreneurship Club location"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`}
                    className="h-56 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <p className="px-6 py-4 text-sm text-ink-soft">{mapAddress}</p>
                </Card>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Stay Connected"
            title="Follow Our Journey"
            description="Find us on Instagram, LinkedIn, and TikTok."
          />
          <RevealGroup className="mx-auto mt-16 max-w-2xl" stagger={0.1}>
            {socials.map((social) => (
              <RevealItem key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-5 border-t border-black/8 py-6 last:border-b"
                >
                  <social.icon className={cn("h-6 w-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110", social.accent)} />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{social.name}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{social.handle}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                      social.bar
                    )}
                  />
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-bg py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Questions?"
            title="Frequently Asked Questions"
            description="Quick answers about how the club collaborates, mentors, and welcomes members."
          />
          <Reveal direction="up" className="mx-auto mt-16 max-w-3xl">
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
