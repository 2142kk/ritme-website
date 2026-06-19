import HeaderClient from '@/components/header-client'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy - ritmeLab',
  description: 'Our privacy policy for ritmeLab website',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      <HeaderClient />

      <div className="pt-32 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: June 2026</p>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-foreground leading-relaxed">
                At ritmeLab, we are committed to protecting your privacy. This privacy policy explains how we collect,
                use, disclose, and otherwise handle your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
              <p className="text-foreground leading-relaxed mb-4">
                When you submit our contact form, we collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Name</li>
                <li>Email address</li>
                <li>Company name</li>
                <li>Message content</li>
              </ul>
              <p className="text-foreground leading-relaxed mt-4">
                We only collect this information when you voluntarily submit it through our contact form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-foreground leading-relaxed">
                We use the information you provide solely for responding to your inquiry and communicating with you
                about potential business opportunities. We do not use your information for any other purpose without
                your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="text-foreground leading-relaxed">
                Our website uses only essential cookies for authentication and session management. We do not use
                tracking cookies or analytics cookies. Your session data is stored securely and used only for
                authentication purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-foreground leading-relaxed mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>
                  <strong>Resend</strong> — for email delivery. Your email address is shared with Resend only to
                  send notifications about new leads. See Resend's privacy policy for more information.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant changes
                by posting the new policy here.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-foreground leading-relaxed">
                If you have questions about this privacy policy or how we handle your data, please contact us at:
              </p>
              <p className="text-foreground mt-2">
                <strong>Email:</strong> hello@ritmelab.io
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-foreground leading-relaxed">
                This privacy policy is governed by and construed in accordance with the laws of the Republic of
                Indonesia, and you irrevocably submit to the exclusive jurisdiction of the courts in Indonesia.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
