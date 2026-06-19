import HeaderClient from '@/components/header-client'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Terms of Service - ritmeLab',
  description: 'Our terms of service for ritmeLab website',
}

export default function TermsPage() {
  return (
    <main className="w-full">
      <HeaderClient />

      <div className="pt-32 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: June 2026</p>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on
                ritmeLab's website for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <p className="text-foreground leading-relaxed">
                The materials on ritmeLab's website are provided on an 'as is' basis. ritmeLab makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
              <p className="text-foreground leading-relaxed">
                In no event shall ritmeLab or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or
                inability to use the materials on ritmeLab's website, even if ritmeLab or an authorized representative
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Accuracy of Materials</h2>
              <p className="text-foreground leading-relaxed">
                The materials appearing on ritmeLab's website could include technical, typographical, or photographic
                errors. ritmeLab does not warrant that any of the materials on its website are accurate, complete, or
                current. ritmeLab may make changes to the materials contained on its website at any time without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Links</h2>
              <p className="text-foreground leading-relaxed">
                ritmeLab has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by ritmeLab of
                the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
              <p className="text-foreground leading-relaxed">
                ritmeLab may revise these terms of service for its website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
              <p className="text-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, and software,
                is the property of ritmeLab or its content suppliers and is protected by international copyright laws.
                The compilation of all content on this website is the exclusive property of ritmeLab, with copyright
                authorship credit noted where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p className="text-foreground leading-relaxed">
                These terms and conditions of use are governed by and construed in accordance with the laws of the
                Republic of Indonesia, and you irrevocably submit to the exclusive jurisdiction of the courts in
                Indonesia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-foreground mt-2">
                <strong>Email:</strong> hello@ritmelab.io
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
