import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="footer w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="footer-logo">
              <span className="text-white">&lt;42Events/&gt;</span>
            </div>
            <p className="text-white/80 max-w-md">
              Discover, attend, and organize events at our university. Stay connected with the campus community.
            </p>
          </div>

          {/* Empty column for spacing */}
          <div></div>

          {/* Social media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">STAY CONNECTED</h3>
            <div className="footer-social">
              <Link href="#https://www.facebook.com/42abudhabi/" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#https://x.com/42AbuDhabi" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#https://www.instagram.com/42abudhabi/" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#https://www.linkedin.com/school/42abudhabi/" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
