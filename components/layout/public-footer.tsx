"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";

export function PublicFooter() {
  const { branding } = useBranding();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {branding.logos.footer ? (
              <div className="mb-6">
                <div className="relative h-48 w-80">
                  <Image
                    src={branding.logos.footer}
                    alt="LGU Monkayo"
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${branding.colors.primary}, ${branding.colors.primary})`,
                  }}
                >
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">
                    LGU Monkayo
                  </h3>
                  <p className="text-xs text-stone-400">Davao de Oro</p>
                </div>
              </div>
            )}
            <p className="text-sm text-stone-400 leading-relaxed">
              Serving the people of Monkayo with transparency, efficiency, and
              dedication to progress.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about/history"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  About Monkayo
                </Link>
              </li>
              <li>
                <Link
                  href="/directory/departments"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/e-services/new-business"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  e-Services
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency/annual-budget"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Transparency
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Information
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/news"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  News & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/tourism"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Tourism
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin
                  className="h-4 w-4 mt-0.5 shrink-0"
                  style={{ color: branding.colors.accent }}
                />
                <span className="text-stone-400">
                  Municipal Hall, Monkayo, Davao de Oro
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone
                  className="h-4 w-4 shrink-0"
                  style={{ color: branding.colors.accent }}
                />
                <span className="text-stone-400">(084) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail
                  className="h-4 w-4 shrink-0"
                  style={{ color: branding.colors.accent }}
                />
                <span className="text-stone-400">info@monkayo.gov.ph</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Facebook
                  className="h-4 w-4 shrink-0"
                  style={{ color: branding.colors.accent }}
                />
                <a
                  href="https://facebook.com/LGUMonkayo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 transition-colors"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = branding.colors.accent)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  @LGUMonkayo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500 text-center sm:text-left">
            © {new Date().getFullYear()} Local Government Unit of Monkayo. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link
              href="/privacy-policy"
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = branding.colors.accent)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = branding.colors.accent)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
