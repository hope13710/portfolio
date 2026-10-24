import Image from "next/image";

import { Controls } from "@/components/Controls";
import { Frame, FrameCycle } from "@/components/Frame";
import { GalleryButton } from "@/components/GalleryButton";
import { Lightbox } from "@/components/Lightbox";
import { StageNav } from "@/components/StageNav";
import { T } from "@/components/T";
import { contact, profileIntro, stages } from "@/content";

const stageNo = (i: number) => `STAGE ${String(i).padStart(2, "0")}`;

const navItems = [profileIntro, ...stages, contact].map(({ id, nav }) => ({ id, label: nav }));

export default function Home() {
  const lastNo = stages.length + 1;

  return (
    <>
      <header className="site-header">
        <a className="brand" href={`#${profileIntro.id}`}>
          KANG JU YEONG
        </a>
        <Controls />
      </header>

      <StageNav items={navItems} />

      <main>
        <section id={profileIntro.id} className="stage stage-intro">
          <div className="stage-inner">
            <div className="stage-text">
              <p className="eyebrow" data-reveal>
                <span className="eyebrow-stage">{stageNo(0)}</span>
                <span className="eyebrow-rule" aria-hidden="true" />
                <span>{profileIntro.nav}</span>
              </p>
              <h1 className="intro-name" data-reveal>
                <T t={profileIntro.name} />
              </h1>
              <p className="intro-alias" data-reveal>
                <T t={profileIntro.alias} />
              </p>
              <p className="intro-headline" data-reveal>
                <T t={profileIntro.headline} />
              </p>
              <div className="intro-body" data-reveal>
                {profileIntro.body.map((paragraph) => (
                  <p key={paragraph.en}>
                    <T t={paragraph} />
                  </p>
                ))}
              </div>
              <ul className="chips" data-reveal>
                {profileIntro.interests.map((interest) => (
                  <li key={interest.en}>
                    <T t={interest} />
                  </li>
                ))}
              </ul>
            </div>

            <figure className="stage-media media-intro" data-reveal>
              <Frame picture={profileIntro.photo} variant="tall" sizes="(max-width: 900px) 60vw, 420px" priority />
            </figure>
          </div>

          <a className="start-hint" href={`#${stages[0].id}`}>
            PRESS <span aria-hidden="true">↓</span> TO START
          </a>
        </section>

        {stages.map((stage, i) => {
          const no = i + 1;
          return (
            <section key={stage.id} id={stage.id} className="stage">
              <div className="stage-inner">
                <div className="stage-text">
                  <p className="eyebrow" data-reveal>
                    <span className="eyebrow-stage">{stageNo(no)}</span>
                    <span className="eyebrow-rule" aria-hidden="true" />
                    <span>
                      <T t={stage.period} />
                    </span>
                    <span className="eyebrow-badge">
                      <T t={stage.badge} />
                    </span>
                  </p>
                  <h2 className="stage-title" data-reveal>
                    {stage.titleLogo ? (
                      <>
                        <Image className="stage-title-logo" src={stage.titleLogo} alt="" />
                        <span className="sr-only">
                          <T t={stage.title} />
                        </span>
                      </>
                    ) : (
                      <>
                        {stage.icon && <Image className="stage-icon" src={stage.icon} alt="" />}
                        <T t={stage.title} />
                      </>
                    )}
                  </h2>
                  <p className="stage-role" data-reveal>
                    <T t={stage.role} />
                  </p>
                  <p className="stage-summary" data-reveal>
                    <T t={stage.summary} />
                  </p>

                  <ol className="highlights" data-reveal>
                    {stage.highlights.map((h) => (
                      <li key={h.value.en} className={Array.isArray(h.detail) ? "highlight-wide" : undefined}>
                        <strong className="highlight-value">
                          <T t={h.value} />
                        </strong>
                        {Array.isArray(h.detail) ? (
                          <ul className="highlight-list">
                            {h.detail.map((item) => (
                              <li key={item.en}>
                                <T t={item} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="highlight-detail">
                            <T t={h.detail} />
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>

                  <div className="stage-foot" data-reveal>
                    {stage.tag && (
                      <span className="tag">
                        <span aria-hidden="true">★</span>
                        <T t={stage.tag} />
                      </span>
                    )}
                    {stage.links.map((link) => (
                      <a key={link.href} className="link" href={link.href} target="_blank" rel="noopener noreferrer">
                        <T t={link.label} />
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                    {stage.gallery && <GalleryButton pictures={stage.gallery} />}
                  </div>
                </div>

                <figure className={`stage-media media-pair${stage.media.inset ? "" : " media-solo"}`} data-reveal>
                  <div className="media-main">
                    <Frame picture={stage.media.main} variant="wide" sizes="(max-width: 900px) 90vw, 680px" zoomable />
                  </div>
                  {stage.media.inset && (
                    <div className="media-inset">
                      <FrameCycle pictures={stage.media.inset} variant="tall" sizes="(max-width: 900px) 30vw, 200px" zoomable />
                    </div>
                  )}
                  {stage.sponsors && (
                    <div className="sponsors">
                      <p className="sponsors-label">
                        <T t={stage.sponsors.label} />
                      </p>
                      <ul>
                        {stage.sponsors.logos.map((logo) => (
                          <li key={logo.name}>
                            <Image src={logo.src} alt={logo.name} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </figure>
              </div>
            </section>
          );
        })}

        <section id={contact.id} className="stage stage-contact">
          <div className="stage-inner contact-inner">
            <p className="eyebrow" data-reveal>
              <span className="eyebrow-stage">{stageNo(lastNo)}</span>
              <span className="eyebrow-rule" aria-hidden="true" />
              <span>{contact.nav}</span>
            </p>
            <h2 className="contact-headline" data-reveal>
              <T t={contact.headline} />
            </h2>
            <a className="contact-email" href={`mailto:${contact.email}`} data-reveal>
              {contact.email}
              <span aria-hidden="true"> ↗</span>
            </a>

            <footer className="contact-foot" data-reveal>
              <p className="etc">
                <span className="etc-label">
                  <T t={contact.etc.label} />
                </span>
                <span className="etc-period">
                  <T t={contact.etc.period} />
                </span>
                <span>
                  <T t={contact.etc.text} />
                </span>
              </p>
              <p className="copyright">© {new Date().getFullYear()} Kang Ju Yeong</p>
            </footer>
          </div>
        </section>
      </main>

      <Lightbox />
    </>
  );
}
