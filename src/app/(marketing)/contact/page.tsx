import type { Metadata } from 'next'
import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ContactForm } from '@/components/contact/contact-form'
import { Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact — Postly',
  description:
    'Get in touch with the Postly team. We are here to help with any questions about our platform.',
}

const contactInfo = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email us',
    value: 'hello@postly.app',
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Office',
    value: 'Ottawa, ON, Canada',
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Support hours',
    value: 'Mon-Fri 9am-6pm EST',
  },
]

export default function ContactPage() {
  return (
    <Section>
      <Heading
        eyebrow="Contact"
        title="Let's talk"
        description="Have a question or want to learn more? We would love to hear from you."
      />
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2">
          <div className="space-y-6 rounded-xl border border-border bg-primary-50/30 p-6 dark:bg-primary-950/10">
            {contactInfo.map((info) => (
              <div key={info.id} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {info.label}
                  </p>
                  <p className="text-sm text-muted">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
