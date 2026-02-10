import { Section } from '@/components/ui/section'
import { Heading } from '@/components/ui/heading'
import { SanityImage } from '@/components/ui/sanity-image'

type TeamMember = {
  _id: string
  name: string | null
  role: string | null
  bio: string | null
  photo: {
    asset?: {
      _id?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: { width?: number; height?: number }
      }
    }
    alt?: string
    hotspot?: { x?: number; y?: number }
    crop?: {
      top?: number
      bottom?: number
      left?: number
      right?: number
    }
  } | null
  socialLinks:
    | { _key: string; platform: string | null; url: string | null }[]
    | null
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (!members.length) return null

  return (
    <Section>
      <Heading
        eyebrow="Our Team"
        title="The people behind Postly"
        description="A small but mighty team passionate about helping you grow."
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member._id} className="text-center">
            {member.photo && (
              <SanityImage
                value={member.photo}
                width={200}
                height={200}
                className="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
              />
            )}
            <h3 className="text-base font-semibold text-foreground">
              {member.name}
            </h3>
            <p className="text-sm text-primary-600">{member.role}</p>
            {member.bio && (
              <p className="mt-2 text-sm text-muted">{member.bio}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
