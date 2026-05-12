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
  show: { transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const glow = { textShadow: "0 0 12px rgba(167,139,250,0.4)" };
const glowFuchsia = { textShadow: "0 0 14px rgba(217,70,239,0.35)" };

interface Props {
  chapterIndex: number;
}

/* -- Epoch 0: Origin Point -- */
function OriginContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-extrabold text-white" style={glow}>
        {profile.name}
      </motion.h2>
      <motion.p variants={fadeUp} className="text-base font-semibold text-violet-200" style={glow}>
        {profile.headline}
      </motion.p>
      <motion.p variants={fadeUp} className="text-sm font-medium text-white/60">
        {profile.subheadline}
      </motion.p>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2 text-sm font-medium">
        <a href={`mailto:${profile.email}`} className="text-white/60 hover:text-white transition-colors">
          {profile.email}
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
          GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}

/* -- Epoch 1: Impact Echoes -- */
function ImpactContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> TEMPORAL_ECHO :: Impact Residuals"}
      </motion.h3>
      {metrics.map((m) => (
        <motion.div key={m.label} variants={fadeUp} className="flex items-baseline gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold text-violet-200" style={glowFuchsia}>
            {m.prefix}{m.value}{m.suffix}
          </span>
          <span className="text-base font-medium text-white/60">{m.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -- Epochs 2-4: Era Records -- */
function EraContent({ index }: { index: number }) {
  const exp = experience[index];
  if (!exp) return null;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> ERA_RECORD"} :: {exp.company}
      </motion.h3>
      <motion.div variants={fadeUp} className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xl font-bold text-white" style={glow}>{exp.company}</h4>
          <p className="text-sm font-semibold text-violet-200">{exp.role}</p>
        </div>
        <span className="shrink-0 text-xs font-medium text-white/35 font-mono">{exp.dates}</span>
      </motion.div>
      <motion.div variants={fadeUp} className="text-xs font-medium text-white/30">
        {exp.location}
      </motion.div>
      <ul className="space-y-2.5">
        {exp.bullets.map((b, i) => (
          <motion.li key={i} variants={fadeUp} className="flex gap-2 text-sm font-medium text-white/80">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_4px_#a78bfa]" />
            {b}
          </motion.li>
        ))}
      </ul>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 pt-1">
        {exp.tags.map((t) => (
          <span key={t} className="rounded-full border border-violet-500/20 bg-violet-500/8 px-2.5 py-0.5 text-xs font-medium text-violet-200/60">
            {t}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -- Epoch 5: Data Artifacts -- */
function ArtifactsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> DATA_ARTIFACT :: Projects"}
      </motion.h3>
      {projects.map((p) => (
        <motion.div key={p.name} variants={fadeUp} className="space-y-2">
          <div className="flex items-baseline gap-3">
            <h4 className="text-base font-bold text-white" style={glow}>{p.name}</h4>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-300/80 transition-colors hover:text-fuchsia-200"
              >
                {p.url.includes("github.com") ? "Repo ↗" : "Live ↗"}
              </a>
            )}
          </div>
          <p className="text-sm font-medium text-white/60">{p.description}</p>
          <ul className="space-y-1.5">
            {p.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm font-medium text-white/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_4px_#a78bfa]" />
                {b}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-violet-500/20 bg-violet-500/8 px-2.5 py-0.5 text-xs font-medium text-violet-200/60">
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

/* -- Epoch 6: Skill Genome -- */
function GenomeContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> SKILL_GENOME :: Capability Matrix"}
      </motion.h3>
      {skills.groups.map((g) => (
        <motion.div key={g.title} variants={fadeUp} className="space-y-1.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-violet-200" style={glow}>
            {g.title}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <span key={item} className="rounded-full border border-violet-500/15 bg-violet-500/8 px-2.5 py-1 text-xs font-medium text-white/75 transition-colors hover:border-fuchsia-500/30 hover:text-white">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* -- Epoch 7: Knowledge Origin -- */
function KnowledgeContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> KNOWLEDGE_ORIGIN :: Education & Honors"}
      </motion.h3>
      {education.map((ed) => (
        <motion.div key={ed.school} variants={fadeUp} className="space-y-1">
          <h4 className="text-base font-bold text-white" style={glow}>{ed.degree}</h4>
          <p className="text-sm font-semibold text-violet-200">{ed.school}</p>
          <p className="text-xs font-medium text-white/35">
            {ed.dates} &middot; GPA {ed.gpa}
          </p>
        </motion.div>
      ))}
      <motion.div variants={fadeUp} className="h-px bg-white/5" />
      <motion.h4 variants={fadeUp} className="text-sm font-bold uppercase tracking-wider text-violet-200" style={glow}>
        Achievements
      </motion.h4>
      <ul className="space-y-2.5">
        {achievements.map((a, i) => (
          <motion.li key={i} variants={fadeUp} className="flex gap-2 text-sm font-medium text-white/75">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 shadow-[0_0_4px_#a78bfa]" />
            {a}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* -- Epoch 8: Future Link -- */
function FutureContent() {
  const copy = (text: string) => navigator.clipboard.writeText(text);
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      <motion.h3 variants={fadeUp} className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-300/60">
        {">> FUTURE_LINK :: Establish Contact"}
      </motion.h3>
      <motion.p variants={fadeUp} className="text-base font-medium text-white/60">
        Open to full-time opportunities, consulting, and interesting collaborations.
      </motion.p>
      <motion.div variants={fadeUp} className="space-y-3">
        <div className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} className="text-base font-semibold text-white/80 hover:text-white transition-colors">
            {profile.email}
          </a>
          <button onClick={() => copy(profile.email)} className="rounded border border-violet-500/25 px-2 py-0.5 text-xs font-medium text-violet-300/50 transition-colors hover:text-white cursor-pointer">
            Copy
          </button>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${profile.phone}`} className="text-base font-semibold text-white/80 hover:text-white transition-colors">
            {profile.phone}
          </a>
          <button onClick={() => copy(profile.phone)} className="rounded border border-violet-500/25 px-2 py-0.5 text-xs font-medium text-violet-300/50 transition-colors hover:text-white cursor-pointer">
            Copy
          </button>
        </div>
      </motion.div>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-violet-500/20 bg-violet-500/8 px-4 py-2 text-sm font-semibold text-violet-200/70 transition-colors hover:bg-violet-500/15 hover:text-white">
          LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-violet-500/20 bg-violet-500/8 px-4 py-2 text-sm font-semibold text-violet-200/70 transition-colors hover:bg-violet-500/15 hover:text-white">
          GitHub
        </a>
        <a href={`mailto:${profile.email}`} className="rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/8 px-4 py-2 text-sm font-semibold text-fuchsia-200/70 transition-colors hover:bg-fuchsia-500/15 hover:text-white">
          Email Me
        </a>
      </motion.div>
    </motion.div>
  );
}

/* -- Router -- */
const chapters = [
  OriginContent,
  ImpactContent,
  () => <EraContent index={0} />,
  () => <EraContent index={1} />,
  () => <EraContent index={2} />,
  ArtifactsContent,
  GenomeContent,
  KnowledgeContent,
  FutureContent,
];

export default function ChronoChapterContent({ chapterIndex }: Props) {
  const Content = chapters[chapterIndex] ?? OriginContent;
  return <Content />;
}
