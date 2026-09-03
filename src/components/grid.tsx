import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const SOCIALS = [
  {
    social: "/images/insta.webp",
    href: "https://instagram.com/roycejwilliams",
    alt: "instagram",
  },
  {
    social: "/images/google.png",
    href: "mailto:roycewilliamsj@gmail.com",
    alt: "email",
  },
  {
    social: "/images/github.png",
    href: "https://github.com/roycejwilliams",
    alt: "github",
  },
  {
    social: "/images/linkedin.png",
    href: "https://www.linkedin.com/in/royce-williams-9bb2021a1/",
    alt: "linkedin",
  },
];

const SKILLS = [
  "UX / UI",
  "Branding",
  "Product Design",
  "Interface Design",
  "Design Consulting",
  "App & Web Development",
];

function SocialLinks({ iconSize, gap }: { iconSize: string; gap: string }) {
  return (
    <div className={`flex items-center ${gap}`}>
      {SOCIALS.map((logo) => (
        <Link
          href={logo.href}
          key={logo.alt}
          target={logo.href.startsWith("http") ? "_blank" : undefined}
          rel={logo.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={`relative ${iconSize} rounded-full overflow-hidden opacity-40 hover:opacity-90 transition-opacity duration-300`}
        >
          <Image
            src={logo.social}
            alt={logo.alt}
            fill
            sizes="32px"
            className="object-cover saturate-0"
          />
        </Link>
      ))}
    </div>
  );
}

function PanelLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-4 h-px bg-black/20" />
      <span className="font-anonymous uppercase text-[7px] tracking-[0.35em] text-black/30">
        {text}
      </span>
    </div>
  );
}

const cardCls =
  "reveal flex flex-col gap-4 border border-black/8 rounded-2xl p-6 xl:p-8 bg-[#f0ebe5]/80 backdrop-blur-sm";

const Grid = () => {
  return (
    <div className="w-full xl:px-24 px-6 py-16 xl:py-24">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
        <div className={cardCls}>
          <PanelLabel text="About" />
          <p className="font-anonymous text-xs xl:text-sm leading-[2.3] tracking-[0.06em] uppercase text-black/65">
            <span className="font-cylburn text-[4rem] xl:text-[4.5rem] leading-[0.75] text-black/85 float-left mr-2 mt-1">
              I
            </span>
            &apos;m a full-stack engineer and founder who thinks like a
            designer. I build products end-to-end, from database to interface,
            and care deeply about what the thing actually feels like to use.
          </p>
        </div>

        <div className={cardCls} style={{ transitionDelay: "0.1s" }}>
          <PanelLabel text="What I do" />
          <ul className="font-anonymous flex flex-col gap-3 tracking-[0.18em] uppercase text-xs xl:text-sm">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="text-black/55 flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className={cardCls} style={{ transitionDelay: "0.2s" }}>
          <PanelLabel text="Find me" />
          <SocialLinks iconSize="w-9 h-9" gap="gap-4" />
        </div>

        <div className={cardCls} style={{ transitionDelay: "0.3s" }}>
          <PanelLabel text="Work together" />
          <div className="flex items-end justify-between gap-6">
            <p className="font-anonymous uppercase text-xs xl:text-sm leading-[2.2] tracking-[0.06em] text-black/65">
              <span className="font-cylburn text-[3.5rem] xl:text-[4rem] leading-[0.75] text-black/85 float-left mr-1 mt-0.5">
                G
              </span>
              ot something worth building? I want to hear it.
            </p>
            <Link
              href="mailto:roycewilliamsj@gmail.com"
              className="font-anonymous uppercase text-[8px] tracking-[0.2em] px-4 py-2.5 border border-black/15 rounded-full text-black/50 hover:text-black/85 hover:border-black/35 transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
            >
              Get in touch <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
