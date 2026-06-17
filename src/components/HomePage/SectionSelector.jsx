import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext.jsx";
import "./SectionSelector.css";

const SECTIONS = [
  {
    id: "kitchen",
    route: "/kitchen",
    background: "/images/section-kitche.png",
    labelKey: "nav.kitchen",
    descKey: "sections.kitchen",
  },
  {
    id: "history",
    route: "/history",
    background: "/images/section-history.jpg",
    labelKey: "nav.history",
    descKey: "sections.history",
  },
  {
    id: "routes",
    route: "/routes",
    background: "/images/section-route.jpg",
    labelKey: "nav.routes",
    descKey: "sections.routes",
  },
];

const TAB_ORDER = ["kitchen", "history", "routes"];

export default function SectionSelector() {
  const navigate = useNavigate();
  const { t } = useLang();
  const [activeId, setActiveId] = useState("routes");
  const bgRef = useRef(null);

  useEffect(() => {
    SECTIONS.forEach((s) => {
      const img = new Image();
      img.src = s.background;
    });
  }, []);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      if (!bgRef.current) {
        rafId = requestAnimationFrame(update);
        return;
      }
      const rect = bgRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(
        -1,
        Math.min(1, (vh / 2 - (rect.top + rect.height / 2)) / vh),
      );
      const layers = bgRef.current.querySelectorAll(".section-selector__layer");
      layers.forEach((layer) => {
        layer.style.transform = `translate3d(0, ${progress * -40}px, 0) scale(${1.04 + Math.abs(progress) * 0.04})`;
      });
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const active = SECTIONS.find((s) => s.id === activeId);

  return (
    <section className="section-selector">
      <div className="section-selector__bgs" ref={bgRef}>
        {SECTIONS.map((s) => (
          <div
            key={s.id}
            className={
              "section-selector__layer" +
              (s.id === activeId ? " is-active" : "")
            }
            style={{ backgroundImage: `url(${s.background})` }}
            aria-hidden="true"
          />
        ))}
        <div className="section-selector__tint" aria-hidden="true" />
      </div>

      <div className="section-selector__panel">
        <article className="section-selector__card section-selector__card--description">
          <h2 className="section-selector__title">{t("sections.choose")}</h2>
          <div
            className="section-selector__text section-selector__text-animated"
            key={activeId}
          >
            {t(active.descKey).map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </article>

        <div
          className="section-selector__card section-selector__card--tabs"
          role="tablist"
        >
          {TAB_ORDER.map((id) => {
            const s = SECTIONS.find((x) => x.id === id);
            const isActive = id === activeId;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={
                  "section-selector__tab" + (isActive ? " is-active" : "")
                }
                onClick={() => setActiveId(id)}
              >
                <span className="section-selector__tab-pill">
                  {t(s.labelKey)}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="section-selector__cta"
          onClick={() => navigate(active.route)}
        >
          <span className="section-selector__cta-text">{t("sections.go")}</span>
          <span className="section-selector__cta-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
