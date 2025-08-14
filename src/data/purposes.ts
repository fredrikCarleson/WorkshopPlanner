export interface Purpose {
  id: string;
  name: string;
  description: string;
  recommendedStructures: string[]; // IDs of recommended liberating structures
}

export const purposes: Purpose[] = [
  {
    id: 'articulate-challenge',
    name: 'Artikulera utmaningen',
    description: 'Hjälp gruppen att tydligt definiera och förstå den utmaning ni står inför',
    recommendedStructures: ['wicked-questions', 'what-debrief', '9-whys', 'triz', 'critical-uncertainties']
  },
  {
    id: 'reveal-assumptions',
    name: 'Avslöja antaganden',
    description: 'Synliggör dolda antaganden och mentala modeller som påverkar ert arbete',
    recommendedStructures: ['wicked-questions', 'triz', 'what-debrief', 'critical-uncertainties', 'agreement-certainty']
  },
  {
    id: 'spark-innovation',
    name: 'Väcka innovation',
    description: 'Stimulera kreativt tänkande och utveckla nya innovativa lösningar',
    recommendedStructures: ['improv-prototyping', 'drawing-together', '25-10-crowdsourcing', 'design-storyboards', 'discovery-action']
  },
  {
    id: 'generate-ideas',
    name: 'Generera idéer',
    description: 'Skapa många nya idéer och lösningsförslag från hela gruppen',
    recommendedStructures: ['1-2-4-all', '25-10-crowdsourcing', 'open-space', 'improv-prototyping', 'wise-crowds']
  },
  {
    id: 'build-understanding',
    name: 'Bygga förståelse',
    description: 'Utveckla djupare förståelse för komplexa frågor och sammanhang',
    recommendedStructures: ['appreciative-interviews', 'conversation-cafe', 'user-experience', 'simple-ethnography', 'celebrity-interview']
  },
  {
    id: 'share-knowledge',
    name: 'Dela kunskap',
    description: 'Sprida kunskap, erfarenheter och bästa praxis inom gruppen',
    recommendedStructures: ['shift-share', 'celebrity-interview', 'user-experience', 'troika-consulting', 'social-network']
  },
  {
    id: 'make-decisions',
    name: 'Fatta beslut',
    description: 'Komma fram till konkreta beslut och handlingsplaner',
    recommendedStructures: ['15-solutions', 'min-specs', '25-10-crowdsourcing', 'design-storyboards', 'purpose-to-practice']
  },
  {
    id: 'develop-strategies',
    name: 'Utveckla strategier',
    description: 'Skapa långsiktiga strategier och planer för framtiden',
    recommendedStructures: ['critical-uncertainties', 'ecocycle', 'purpose-to-practice', 'panarchy', 'generative-relationships']
  },
  {
    id: 'build-connections',
    name: 'Bygga relationer',
    description: 'Stärka relationer och förbättra samarbetet inom gruppen',
    recommendedStructures: ['impromptu-networking', 'heard-seen-respected', 'what-i-need', 'conversation-cafe', 'social-network']
  },
  {
    id: 'learn-from-experience',
    name: 'Lära av erfarenhet',
    description: 'Reflektera över och lära av tidigare erfarenheter och projekt',
    recommendedStructures: ['what-debrief', 'appreciative-interviews', 'discovery-action', 'shift-share', 'troika-consulting']
  },
  {
    id: 'plan-implementation',
    name: 'Planera genomförande',
    description: 'Utveckla konkreta planer för hur idéer ska implementeras',
    recommendedStructures: ['15-solutions', 'design-storyboards', 'purpose-to-practice', 'min-specs', 'helping-heuristics']
  },
  {
    id: 'engage-stakeholders',
    name: 'Engagera intressenter',
    description: 'Involvera och engagera viktiga intressenter i processen',
    recommendedStructures: ['open-space', 'conversation-cafe', 'celebrity-interview', 'what-i-need', 'integrated-autonomy']
  },
  {
    id: 'foster-inclusion',
    name: 'Främja inkludering',
    description: 'Säkerställa att alla röster hörs och att mångfald värdesätts',
    recommendedStructures: ['1-2-4-all', 'heard-seen-respected', 'impromptu-networking', 'conversation-cafe', 'integrated-autonomy']
  },
  {
    id: 'adapt-change',
    name: 'Anpassa till förändring',
    description: 'Utveckla förmågan att hantera och anpassa sig till förändring',
    recommendedStructures: ['ecocycle', 'critical-uncertainties', 'panarchy', 'integrated-autonomy', 'generative-relationships']
  },
  {
    id: 'evaluate-options',
    name: 'Utvärdera alternativ',
    description: 'Systematiskt utvärdera och jämföra olika alternativ och lösningar',
    recommendedStructures: ['agreement-certainty', '25-10-crowdsourcing', 'min-specs', 'critical-uncertainties', 'design-elements']
  }
];