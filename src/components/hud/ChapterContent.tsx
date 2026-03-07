import { motion } from "framer-motion";
import {
  profile,
  metrics,
  experience,
  projects,
  skills,
  education,
  achievements,
} from "@/lib/data";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface Props {
  chapterIndex: number;
}

/* -- Chapter 0: Identity / Hero -- */
function HeroContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">
        {profile.name}
      </motion.h2>
      <motion.p variants={fadeUp} className="text-base text-cyan-300">
        {profile.headline}
      </motion.p>
      <motion.p variants={fadeUp} className="text-base text-white/50">
        {profile.subheadline}
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2 text-sm">
        <a href={`mailto:${profile.email}`} className="text-white/50 hover:text-white transition-colors">
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}

/* -- Chapter 1: Impact Metrics -- */
function ImpactContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {"> SYS_REPORT :: Impact Metrics"}
      </motion.h3>
      {metrics.map((m) => (
        <motion.div key={m.label} variants={fadeUp} className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-cyan-300">
            {m.prefix}{m.value}{m.suffix}
          </span>
          <span className="text-base text-white/50">{m.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -- Chapters 2-4: Experience Stations -- */
function StationContent({ index }: { index: number }) {
  const exp = experience[index];
  if (!exp) return null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {`> ${exp.station} :: ${exp.company}`}
      </motion.h3>
      <motion.div variants={fadeUp} className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xl font-semibold text-white">{exp.company}</h4>
          <p className="text-sm text-cyan-300">{exp.role}</p>
        </div>
        <span className="shrink-0 text-xs text-white/30">{exp.dates}</span>
      </motion.div>
      <motion.div variants={fadeUp} className="text-xs text-white/25">
        {exp.location}
      </motion.div>
      <ul className="space-y-2">
        {exp.bullets.map((b, i) => (
          <motion.li key={i} variants={fadeUp} className="flex gap-2 text-sm text-white/60">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
            {b}
          </motion.li>
        ))}
      </ul>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 pt-1">
        {exp.tags.map((t) => (
          <span key={t} className="rounded-full border border-cyan-500/15 bg-cyan-500/5 px-2.5 py-0.5 text-xs text-cyan-300/60">
            {t}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -- Chapter 5: Projects -- */
function ProjectsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {"> DATA_ARCHIVE :: Projects"}
      </motion.h3>
      {projects.map((p) => (
        <motion.div key={p.name} variants={fadeUp} className="space-y-2">
          <h4 className="text-lg font-medium text-white">{p.name}</h4>
          <p className="text-sm text-white/50">{p.description}</p>
          <ul className="space-y-1">
            {p.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/60">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-cyan-500/15 bg-cyan-500/5 px-2.5 py-0.5 text-xs text-cyan-300/60">
                {t}
              </span>
            ))}
          </div>
          <div className="h-px bg-white/5" />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -- Chapter 6: Skills -- */
function SkillsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {"> SYS_CONFIG :: Skill Matrix"}
      </motion.h3>
      {skills.groups.map((g) => (
        <motion.div key={g.title} variants={fadeUp} className="space-y-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
            {g.title}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span key={item} className="rounded-full border border-cyan-500/10 bg-cyan-500/5 px-2.5 py-0.5 text-sm text-white/60 transition-colors hover:border-fuchsia-500/30 hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -- Chapter 7: Education + Achievements -- */
function EducationContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {"> CREW_FILE :: Education & Honors"}
      </motion.h3>
      {education.map((ed) => (
        <motion.div key={ed.school} variants={fadeUp} className="space-y-1">
          <h4 className="text-lg font-medium text-white">{ed.degree}</h4>
          <p className="text-sm text-cyan-300">{ed.school}</p>
          <p className="text-xs text-white/30">
            {ed.dates} &middot; GPA {ed.gpa}
          </p>
        </motion.div>
      ))}
      <motion.div variants={fadeUp} className="h-px bg-white/5" />
      <motion.h4 variants={fadeUp} className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
        Achievements
      </motion.h4>
      <ul className="space-y-2">
        {achievements.map((a, i) => (
          <motion.li key={i} variants={fadeUp} className="flex gap-2 text-sm text-white/60">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
            {a}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -- Chapter 8: Contact -- */
function ContactContent() {
  const copy = (text: string) => navigator.clipboard.writeText(text);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.h3 variants={fadeUp} className="hud-text text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-1">
        {"> COMMS_LINK :: Contact"}
      </motion.h3>
      <motion.p variants={fadeUp} className="text-base text-white/50">
        Open to full-time opportunities, consulting, and interesting collaborations.
      </motion.p>
      <motion.div variants={fadeUp} className="space-y-3">
        <div className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} className="text-base text-white/70 hover:text-white transition-colors">
            {profile.email}
          </a>
          <button onClick={() => copy(profile.email)} className="rounded border border-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400/40 transition-colors hover:text-white cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${profile.phone}`} className="text-base text-white/70 hover:text-white transition-colors">
            {profile.phone}
          </a>
          <button onClick={() => copy(profile.phone)} className="rounded border border-cyan-500/20 px-2 py-0.5 text-xs text-cyan-400/40 transition-colors hover:text-white cursor-pointer">
            Copy
          </button>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300/70 transition-colors hover:bg-cyan-500/10 hover:text-white">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-300/70 transition-colors hover:bg-cyan-500/10 hover:text-white">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`} className="rounded-lg border border-fuchsia-500/15 bg-fuchsia-500/5 px-4 py-2 text-sm text-fuchsia-300/70 transition-colors hover:bg-fuchsia-500/10 hover:text-white">
          Email Me
        </a>
      </motion.div>
    </motion.div>
  );
}

/* -- Main router -- */
const chapters = [
  HeroContent,                          // 0
  ImpactContent,                        // 1
  () => <StationContent index={0} />,   // 2 - Leah
  () => <StationContent index={1} />,   // 3 - Flow Global
  () => <StationContent index={2} />,   // 4 - AnywhereWorks
  ProjectsContent,                      // 5
  SkillsContent,                        // 6
  EducationContent,                     // 7
  ContactContent,                       // 8
];

export default function ChapterContent({ chapterIndex }: Props) {
  const Content = chapters[chapterIndex] ?? HeroContent;
  return <Content />;
}
