import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";
import FocusLockLogo from "@/components/FocusLockLogo";
import { redirect, useNavigate } from "react-router";

const LINKS = [
  {
    group: "Socials",
    items: [
      { name: "Instagram", link: "https://instagram.com/boukhris_amine_" },
      { name: "Twitter", link: "https://x.com/AminBoukhris1" },
      { name: "Github", link: "https://github.com/amine-boukhris" },
    ],
  },
  {
    group: "Inspiration",
    items: [
      { name: "Haptic", link: "https://haptic.studio/" },
      { name: "Flow Party", link: "https://www.joinflowparty.com/" },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scroll({
      top: 1500 + window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="p-24 text-gray-100 flex justify-between">
      <div className="space-y-16">
        <div className="flex items-start gap-10">
          <a target="_blank" href="https://github.com/amine-boukhris">
            <img
              src="https://github.com/amine-boukhris.png"
              alt="github profile picutre"
              className="size-64 rounded-full"
            />
          </a>
          <a target="_blank" href="https://github.com/amine-boukhris">
            <div className="space-y-1">
              <p className="text-4xl">amine-boukhris</p>
              <p className="text-xl">boukhrisamine210@gmail.com</p>
            </div>
          </a>
        </div>
        <div className="flex gap-24">
          {LINKS.map((l) => (
            <div key={l.group}>
              <p className="font-bold mb-4">{l.group}</p>
              <div className="flex flex-col gap-2">
                {l.items.map((item) => (
                  <a key={item.name} href={item.link} target="_blank">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between items-center">
        <FocusLockLogo />
        <Button
          onClick={scrollToTop}
          className="rounded-full size-16 cursor-pointer"
        >
          <ChevronsUp className="size-6" />
        </Button>
      </div>
    </section>
  );
}
