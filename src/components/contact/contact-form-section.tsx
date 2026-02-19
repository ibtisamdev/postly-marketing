import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { ContactForm } from '@/components/contact/contact-form'
import { getIcon } from '@/lib/icon-map'

type ContactFormSectionProps = {
  eyebrow?: string | null
  title: string | null
  description?: string | null
  contactInfo?: Array<{
    _key: string
    icon?: string | null
    label: string | null
    value: string | null
  }> | null
  formLabels?: {
    nameLabel?: string | null
    namePlaceholder?: string | null
    emailLabel?: string | null
    emailPlaceholder?: string | null
    companyLabel?: string | null
    companyPlaceholder?: string | null
    messageLabel?: string | null
    messagePlaceholder?: string | null
    submitLabel?: string | null
    submittingLabel?: string | null
    successMessage?: string | null
  } | null
}

export function ContactFormSection({
  eyebrow,
  title,
  description,
  contactInfo,
  formLabels,
}: ContactFormSectionProps) {
  return (
    <Section>
      {title && (
        <Heading
          eyebrow={eyebrow ?? undefined}
          title={title}
          description={description ?? undefined}
        />
      )}
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm labels={formLabels ?? undefined} />
        </div>
        {contactInfo && contactInfo.length > 0 && (
          <div className="lg:col-span-2">
            <div className="space-y-6 rounded-xl border border-border bg-primary-50/30 p-6 dark:bg-primary-950/10">
              {contactInfo.map((info) => {
                const Icon = getIcon(info.icon)
                return (
                  <div key={info._key} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/50">
                      {Icon && <Icon className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {info.label}
                      </p>
                      <p className="text-sm text-muted">{info.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
