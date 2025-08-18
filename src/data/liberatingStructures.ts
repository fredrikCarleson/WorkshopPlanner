import { LiberatingStructure } from '../types/Workshop';

export const liberatingStructures: LiberatingStructure[] = [
  // Special activities
  {
    id: 'welcome',
    name: 'Välkommen',
    category: 'Foundation',
    baseTime: 15,
    scalingFactor: 0,
    minParticipants: 1,
    maxParticipants: 1000,
    description: 'Presentation av syfte, mål och agenda för workshoppen',
    instructions: 'Välkomna deltagarna och presentera:\n• Syftet med workshoppen\n• Vad vi vill uppnå i slutet\n• Dagens agenda och struktur\n• Praktisk information (pauser, faciliteter etc.)\n• Eventuella förväntningar och spelregler',
    icon: '👋'
  },
  {
    id: 'closing',
    name: 'Avslutning',
    category: 'Foundation',
    baseTime: 15,
    scalingFactor: 0,
    minParticipants: 1,
    maxParticipants: 1000,
    description: 'Reflektion över dagen och planering av nästa steg',
    instructions: 'Avsluta workshoppen med:\n• Reflektion över vad vi har lärt oss\n• Vilka insikter tar vi med oss?\n• Konkreta nästa steg och åtaganden\n• Tack och avslutning',
    icon: '🎯'
  },
  {
    id: 'short-break',
    name: 'Kort paus',
    category: 'Foundation',
    baseTime: 10,
    scalingFactor: 0,
    minParticipants: 1,
    maxParticipants: 1000,
    description: 'Kort paus för återhämtning',
    instructions: 'Kort paus för kaffe, reflektion eller informella samtal',
    icon: '☕'
  },
  {
    id: 'long-break',
    name: 'Lång paus',
    category: 'Foundation',
    baseTime: 15,
    scalingFactor: 0,
    minParticipants: 1,
    maxParticipants: 1000,
    description: 'Längre paus för återhämtning',
    instructions: 'Längre paus för kaffe, reflektion eller informella samtal',
    icon: '🍽️'
  },

  // Row 1
  {
    id: 'wicked-questions',
    name: 'Wicked Questions',
    category: 'Foundation',
    baseTime: 25,
    scalingFactor: 1.0,
    minParticipants: 4,
    maxParticipants: 40,
    description: 'Engagera alla i att skärpa paradoxer och utmaningar',
    instructions: '1) Individuellt (5 min): Tänk på en utmaning ni står inför som innehåller motsägelser eller paradoxer. Skriv ner frågor som börjar med "Hur kan vi både... och...?" 2) I par (10 min): Dela era frågor och hjälp varandra att skärpa dem så de fångar verkliga dilemman. 3) Grupper om fyra (8 min): Kombinera era bästa frågor och välj den mest kraftfulla. 4) Helgrupp (7 min): Varje grupp presenterar sin fråga. Diskutera vilka som bäst beskriver era gemensamma utmaningar och paradoxer.',
    icon: '🌪️'
  },
  {
    id: 'what-debrief',
    name: "What's Debrief",
    category: 'Foundation',
    baseTime: 30,
    scalingFactor: 0.8,
    minParticipants: 6,
    maxParticipants: 50,
    description: 'Lär av mönster i framgångar och misslyckanden',
    instructions: 'Välj en specifik händelse, projekt eller aktivitet att reflektera över. 1) Individuellt (5 min): Skriv ner vad som faktiskt hände - bara fakta, inga tolkningar. 2) Par (8 min): Dela era berättelser och diskutera "Så vad?" - vilka mönster ser ni? Vad betyder det? 3) Grupper om fyra (10 min): Diskutera "Nu vad?" - vilka konkreta lärdomar kan ni dra? Vad ska ni göra annorlunda nästa gång? 4) Helgrupp (7 min): Varje grupp delar sina viktigaste insikter och handlingsplaner.',
    icon: '🔍'
  },
  {
    id: 'min-specs',
    name: 'Min Specs',
    category: 'Foundation',
    baseTime: 35,
    scalingFactor: 1.2,
    minParticipants: 5,
    maxParticipants: 30,
    description: 'Specificera endast det absolut nödvändiga att göra och inte göra',
    instructions: '1) Individuellt (5 min): Brainstorma alla möjliga specifikationer och krav för ert projekt/initiativ. 2) Par (8 min): Dela era listor och börja eliminera allt som inte är absolut kritiskt. 3) Grupper om fyra (15 min): Skapa två kolumner: "MÅSTE göra" och "FÅR INTE göra". Var mycket selektiva - endast det som är absolut nödvändigt för framgång eller som garanterat leder till misslyckande. 4) Helgrupp (7 min): Jämför listorna och skapa en gemensam Min Specs. Testa varje punkt: "Vad händer om vi inte gör detta?" eller "Vad händer om vi gör detta?"',
    icon: '🎯'
  },
  {
    id: 'heard-seen-respected',
    name: 'Heard, Seen, Respected',
    category: 'Foundation',
    baseTime: 40,
    scalingFactor: 1.5,
    minParticipants: 8,
    maxParticipants: 25,
    description: 'Öva djupare lyssnande och empati',
    instructions: 'Arbeta i par. 1) Första runda (15 min): Person A berättar om en utmaning eller situation där de kände sig missförstådda. Person B lyssnar aktivt utan att ge råd - fokusera på att förstå och bekräfta. Ställ frågor som "Vad kände du då?" eller "Berätta mer om det". Reflektera tillbaka vad du hör. 2) Andra runda (15 min): Byt roller. 3) Reflektion tillsammans (10 min): Diskutera hur det kändes att bli verkligt lyssnad på och vad som gjorde att ni kände er hörda, sedda och respekterade. Vilka konkreta beteenden hjälpte?',
    icon: '❤️'
  },
  {
    id: 'what-i-need',
    name: 'What I Need From You',
    category: 'Foundation',
    baseTime: 30,
    scalingFactor: 1.0,
    minParticipants: 6,
    maxParticipants: 40,
    description: 'Synliggör viktiga behov mellan funktioner och nivåer',
    instructions: 'Organisera deltagarna så att olika funktioner/avdelningar/nivåer är representerade. 1) Individuell förberedelse (5 min): Tänk på vad du behöver från andra för att lyckas i ditt arbete. 2) Runda 1 (10 min): I par från olika funktioner, använd formatet "Vad jag behöver från dig/er är..." Var specifik och konkret. 3) Runda 2 (10 min): Samma par, använd formatet "Vad jag kan erbjuda dig/er är..." 4) Dokumentation (10 min): Skriv upp de viktigaste behoven och erbjudandena på post-it-lappar. 5) Helgrupp (5 min): Sätt upp lapparna och identifiera möjliga matchningar och åtaganden.',
    icon: '🤝'
  },
  {
    id: 'integrated-autonomy',
    name: 'Integrated Autonomy',
    category: 'Foundation',
    baseTime: 45,
    scalingFactor: 1.8,
    minParticipants: 8,
    maxParticipants: 20,
    description: 'Gå från beroende till ömsesidigt beroende',
    instructions: '1) Individuellt (8 min): Kartlägg era nuvarande beroenden - vad behöver ni tillstånd för? Vad väntar ni på från andra? Vad hindrar er från att agera? 2) Par (10 min): Diskutera vilka beroenden som är nödvändiga (skapar värde) vs onödiga (skapar bara byråkrati). 3) Grupper om fyra (15 min): Identifiera konkreta sätt att öka autonomi utan att förlora viktiga kopplingar. Vad kan ni börja/sluta/fortsätta göra? 4) Helgrupp (12 min): Dela era bästa idéer för att balansera självständighet med samarbete. Vilka experiment kan ni testa?',
    icon: '🔄'
  },

  // Row 2
  {
    id: 'design-elements',
    name: 'Design Elements',
    category: 'Planning',
    baseTime: 20,
    scalingFactor: 0.5,
    minParticipants: 3,
    maxParticipants: 50,
    description: 'Veta vad och varför innan man dyker in i hur',
    instructions: 'Använd denna metod för att designa era egna aktiviteter eller förbättra befintliga möten. 1) Strukturell inbjudan (5 min): Vad säger/gör ni för att bjuda in äkta deltagande? Skriv ner er inbjudan ordagrant. 2) Utrymme och material (5 min): Hur arrangeras rummet? Vilka material behövs? 3) Deltagande (5 min): Hur fördelas deltagandet? Vem pratar när och hur länge? 4) Gruppkonfiguration (5 min): Vilka gruppstorlekar används? Hur bildas grupperna? 5) Sekvens och tid (5 min): Vilka steg ingår och hur lång tid tar varje del? Testa er design genom att gå igenom varje element noggrant.',
    icon: '🎨'
  },
  {
    id: 'appreciative-interviews',
    name: 'Appreciative Interviews',
    category: 'Planning',
    baseTime: 35,
    scalingFactor: 1.5,
    minParticipants: 4,
    maxParticipants: 30,
    description: 'Upptäck och bygg på grundorsakerna till framgång',
    instructions: 'Arbeta i par. 1) Förberedelse (3 min): Tänk på en situation när ni var riktigt stolta över ert arbete eller när något fungerade oväntat bra. 2) Första intervjun (12 min): Person A intervjuar Person B med frågor som: "Berätta om situationen", "Vad var din roll?", "Vad gjorde det möjligt?", "Vilka styrkor använde du?", "Vad värderade du mest?". Fokusera på det positiva och vad som fungerade. 3) Andra intervjun (12 min): Byt roller. 4) Reflektion (8 min): Diskutera gemensamma mönster och styrkor som framkom. Vad kan ni bygga vidare på?',
    icon: '💬'
  },
  {
    id: 'discovery-action',
    name: 'Discovery & Action',
    category: 'Planning',
    baseTime: 90,
    scalingFactor: 2.0,
    minParticipants: 10,
    maxParticipants: 40,
    description: 'Upptäck, uppfinn och släpp loss lokala lösningar',
    instructions: '1) Upptäck (30 min): I grupper om 6-8, samla berättelser om vad som redan fungerar bra i er organisation. Använd frågor som "När har vi lyckats trots svårigheter?" och "Vad gjorde vi då som vi kunde göra mer av?". 2) Mönster (20 min): Identifiera gemensamma framgångsfaktorer från berättelserna. Vad återkommer? 3) Uppfinn (25 min): Brainstorma konkreta sätt att bygga vidare på dessa framgångsfaktorer. Vad skulle hända om ni gjorde mer av det som fungerar? 4) Handlingsplan (15 min): Välj 2-3 konkreta åtgärder som kan testas direkt. Vem gör vad och när?',
    icon: '🚀'
  },
  {
    id: 'improv-prototyping',
    name: 'Improv Prototyping',
    category: 'Planning',
    baseTime: 60,
    scalingFactor: 1.8,
    minParticipants: 8,
    maxParticipants: 25,
    description: 'Utveckla innovativa lösningar genom improvisation',
    instructions: '1) Uppvärmning (10 min): Öva "Ja, och..."-principen i par. Person A föreslår något, Person B svarar "Ja, och..." och bygger vidare. 2) Problemformulering (5 min): Definiera tydligt vilken utmaning ni vill utforska. 3) Första prototyp (15 min): I grupper om 4-5, skapa en kort scen (2-3 min) som visar hur lösningen skulle fungera i praktiken. Använd enkla rekvisita och roller. 4) Presentation och feedback (15 min): Varje grupp visar sin scen. Publiken ger feedback med "Ja, och..."-principen. 5) Iteration (15 min): Förbättra scenerna baserat på feedback och visa igen. Fokusera på vad som fungerade bäst och kan utvecklas vidare.',
    icon: '🛡️'
  },
  {
    id: 'drawing-together',
    name: 'Drawing Together',
    category: 'Planning',
    baseTime: 45,
    scalingFactor: 1.2,
    minParticipants: 6,
    maxParticipants: 30,
    description: 'Avslöja insikter och vägar framåt genom att rita',
    instructions: 'Ge alla papper och pennor. Betona att konstnärlig skicklighet inte krävs - använd enkla symboler, streckgubbar och former. 1) Individuellt (10 min): Rita er syn på problemet eller utmaningen. Vad ser det ut som? Vilka delar ingår? 2) Par (10 min): Visa era teckningar för varandra och förklara. Vad ser ni som är lika/olika? 3) Gemensam bild (15 min): Skapa tillsammans en ny teckning som kombinerar era perspektiv. 4) Grupper om fyra (10 min): Visa era gemensamma bilder och diskutera vad ni upptäckt. Vilka nya insikter har framkommit genom att rita?',
    icon: '✏️'
  },
  {
    id: 'open-space',
    name: 'Open Space',
    category: 'Planning',
    baseTime: 120,
    scalingFactor: 0.5,
    minParticipants: 15,
    maxParticipants: 200,
    description: 'Frigör inneboende handling och ledarskap',
    instructions: 'Kräver minst 2 timmar och öppet utrymme. 1) Öppning (15 min): Presentera den centrala frågan/temat. Förklara principerna: "Vem som än kommer är rätt personer", "Vad som än händer är det enda som kunde hända", "När det börjar är det rätt tid", "När det är över är det över". 2) Marknadsplats (30 min): Alla som vill kan föreslå diskussionsämnen relaterade till temat. Skriv på stora papper och sätt upp på väggen. 3) Självorganisering (10 min): Deltagarna väljer vilka sessioner de vill delta i och organiserar sig själva. 4) Sessioner (60-90 min): Parallella diskussioner i olika rum/hörn. Folk kan röra sig fritt mellan grupper. 5) Avslutning (30 min): Samla alla och låt grupper dela sina viktigaste insikter.',
    icon: '👥'
  },
  {
    id: 'critical-uncertainties',
    name: 'Critical Uncertainties',
    category: 'Planning',
    baseTime: 75,
    scalingFactor: 1.5,
    minParticipants: 8,
    maxParticipants: 25,
    description: 'Utveckla strategier för att verka i osäkerhet',
    instructions: '1) Brainstorma osäkerheter (10 min): Lista alla viktiga osäkerheter ni står inför. 2) Välj två kritiska (10 min): Identifiera de två mest kritiska osäkerheterna som verkligen påverkar er framtid. Formulera som "antingen X eller Y". 3) Skapa matris (5 min): Rita en 2x2-matris med osäkerheterna som axlar. 4) Utveckla scenarier (20 min): I grupper om 3-4, utveckla ett detaljerat scenario för varje kvadrant. Vad händer om både X och Y inträffar? Vad händer om X men inte Y? Osv. 5) Robusta strategier (20 min): Identifiera strategier och åtgärder som fungerar bra oavsett vilket scenario som blir verklighet. 6) Helgrupp (10 min): Dela era mest robusta strategier.',
    icon: '🌊'
  },

  // Row 3
  {
    id: '1-2-4-all',
    name: '1-2-4-All',
    category: 'Deciding',
    baseTime: 20,
    scalingFactor: 0.3,
    minParticipants: 4,
    maxParticipants: 100,
    description: 'Engagera alla samtidigt i att generera frågor',
    instructions: 'Ställ en tydlig fråga till gruppen. 1) Tyst reflektion (1 min): Alla tänker själva på frågan. Ingen pratar. 2) Par (2 min): Diskutera med personen bredvid dig. Bygg vidare på varandras idéer. 3) Grupper om fyra (4 min): Två par slås samman. Dela era bästa idéer och utveckla dem vidare tillsammans. 4) Helgrupp (5-10 min): Varje grupp om fyra delar sin viktigaste insikt eller idé med alla. Skriv upp nyckelord på whiteboard. Denna struktur säkerställer att alla deltar aktivt och att bästa idéerna bubblat upp genom systemet.',
    icon: '🔢'
  },
  {
    id: 'triz',
    name: 'TRIZ',
    category: 'Deciding',
    baseTime: 50,
    scalingFactor: 1.3,
    minParticipants: 6,
    maxParticipants: 30,
    description: 'Stoppa kontraproduktiva aktiviteter och beteenden',
    instructions: '1) Omvänd brainstorming (15 min): Fråga "Vad kan vi göra för att garantera det sämsta möjliga resultatet?" Brainstorma i grupper om 4-6. Var kreativa och överdriva - ju värre desto bättre! 2) Kategorisera (10 min): Gruppera de destruktiva beteendena i teman. 3) Verklighetscheck (15 min): För varje kategori, fråga ärligt "Vad av detta gör vi redan idag?" Var modiga och erkänn sanningen. 4) Stoppa-lista (10 min): Identifiera konkreta beteenden ni kan sluta med omedelbart. 5) Handlingsplan (10 min): Välj 2-3 destruktiva mönster att fokusera på. Vad ska ni göra för att bryta dessa mönster? Vem ansvarar för vad?',
    icon: '🔥'
  },
  {
    id: 'shift-share',
    name: 'Shift & Share',
    category: 'Deciding',
    baseTime: 40,
    scalingFactor: 1.0,
    minParticipants: 8,
    maxParticipants: 40,
    description: 'Sprid goda metoder och bygg nya kopplingar',
    instructions: 'Organisera så att olika team/avdelningar är representerade. 1) Förberedelse (10 min): Varje team förbereder en 5-minuters presentation av sin bästa metod/framgång. Fokusera på konkreta tips som andra kan använda. 2) Stationsrundor (3x10 min): Dela upp i grupper och rotera mellan stationer. Vid varje station presenterar ett team sin metod och svarar på frågor. 3) Paus och reflektion (5 min): Kort paus för att smälta intryck. 4) Andra stationsrundor (3x10 min): Fortsätt rotationen så alla hör alla presentationer. 5) Helgrupp (10 min): Vilka metoder vill ni testa? Vilka nya kopplingar har skapats? Planera uppföljning.',
    icon: '🔄'
  },
  {
    id: 'helping-heuristics',
    name: 'Helping Heuristics',
    category: 'Deciding',
    baseTime: 35,
    scalingFactor: 1.2,
    minParticipants: 6,
    maxParticipants: 25,
    description: 'Öva progressiva metoder för att hjälpa andra',
    instructions: 'Arbeta i grupper om tre (en observatör, en hjälpare, en som behöver hjälp). 1) Introduktion (5 min): Förklara de fyra nivåerna av hjälp: Lyssna/bekräfta → Ställa frågor → Erbjuda observationer → Ge råd (endast om efterfrågat). 2) Första övning (10 min): Person som behöver hjälp beskriver en verklig utmaning. Hjälparen övar nivå 1-2 (lyssna och ställa öppna frågor). Observatören antecknar. 3) Feedback (5 min): Vad fungerade bra? Vad kunde förbättras? 4) Andra övning (10 min): Samma trio, ny utmaning. Hjälparen övar nivå 3-4 (observationer och råd om efterfrågat). 5) Reflektion (5 min): Diskutera skillnaden mellan nivåerna. När är varje nivå mest hjälpsam?',
    icon: '🎭'
  },
  {
    id: 'design-storyboards',
    name: 'Design StoryBoards',
    category: 'Deciding',
    baseTime: 65,
    scalingFactor: 1.8,
    minParticipants: 8,
    maxParticipants: 20,
    description: 'Definiera steg-för-steg-element för att uppnå ett syfte',
    instructions: 'Ge alla stora papper och pennor. 1) Välj fokus (5 min): Bestäm vilken idé/lösning/process ni vill visualisera. 2) Identifiera steg (10 min): I grupper om 4-5, lista alla viktiga steg från början till slut. Vad händer först? Sedan? Vad är slutresultatet? 3) Skapa storyboard (25 min): Rita enkla bilder (streckgubbar räcker) som visar varje steg. Inkludera: Vem gör vad? Var händer det? Vilka verktyg/resurser behövs? Vad är kritiska beslutspunkter? 4) Testa berättelsen (15 min): "Läs" er storyboard för en annan grupp. Är det logiskt? Saknas något? 5) Förbättra (10 min): Justera baserat på feedback. Fokusera på användarupplevelsen och praktiska detaljer.',
    icon: '🎬'
  },
  {
    id: 'generative-relationships',
    name: 'Generative Relationships',
    category: 'Deciding',
    baseTime: 55,
    scalingFactor: 1.5,
    minParticipants: 10,
    maxParticipants: 30,
    description: 'Avslöja relationsmönster som skapar framsteg',
    instructions: '1) Kartlägg relationer (15 min): Rita individuellt era viktigaste arbetsrelationer. Använd cirklar för personer och linjer för relationer. Tjocka linjer = starka relationer, tunna = svaga. 2) Analysera värde (10 min): Markera vilka relationer som genererar mest värde/energi (grönt) och vilka som dränerar energi (rött). 3) Par-diskussion (15 min): Dela era kartor. Vad kännetecknar era mest generativa relationer? Vad gör dem så värdefulla? 4) Grupper om fyra (15 min): Identifiera gemensamma mönster. Vad skapar ömsesidigt värde? Hur kan ni bygga fler sådana relationer? 5) Handlingsplan (10 min): Välj 2-3 konkreta sätt att stärka befintliga relationer eller skapa nya generativa kopplingar.',
    icon: '🌐'
  },
  {
    id: 'ecocycle',
    name: 'Ecocycle',
    category: 'Deciding',
    baseTime: 90,
    scalingFactor: 2.0,
    minParticipants: 8,
    maxParticipants: 25,
    description: 'Analysera hela portföljen av aktiviteter och relationer',
    instructions: 'Rita en stor ecocykel på whiteboard (∞-symbol med fyra faser). 1) Förklara faserna (10 min): Födelse (r) = nya idéer/experiment, Tillväxt (K) = snabb utveckling/skalning, Mognad (Ω) = etablerade processer/effektivitet, Kreativ förstörelse (α) = avveckling/förnyelse. 2) Inventering (15 min): Lista alla era aktiviteter, projekt, processer, relationer. 3) Placering (20 min): I grupper om 4-6, placera varje aktivitet i rätt fas på ecocykeln. Diskutera var ni är osäkra. 4) Analys (25 min): Vad ser ni? Är ni överbelastade i någon fas? Vad behöver mer resurser? Vad bör fasas ut? 5) Åtgärder (20 min): Identifiera konkreta steg för att balansera portföljen. Vad ska ni börja/sluta/fortsätta göra?',
    icon: '♻️'
  },

  // Row 4
  {
    id: 'impromptu-networking',
    name: 'Impromptu Networking',
    category: 'Connecting',
    baseTime: 20,
    scalingFactor: 0.5,
    minParticipants: 6,
    maxParticipants: 100,
    description: 'Dela snabbt utmaningar och förväntningar',
    instructions: 'Alla står upp och rör sig fritt i rummet. 1) Första runda (5 min): Hitta någon du inte känner så väl. Presentera er kort och dela: "Vilken utmaning arbetar du med just nu?" Lyssna aktivt på varandra. 2) Andra runda (5 min): Hitta en ny person. Dela: "Vad hoppas du få ut av dagens session?" 3) Tredje runda (5 min): Hitta en tredje person. Dela: "Vad skulle göra denna session till en framgång för dig?" 4) Reflektion (5 min): Sätt er ner. Vad hörde ni för gemensamma teman? Vilka intressanta kopplingar upptäckte ni? Detta ger snabbt en känsla för gruppens kollektiva utmaningar och förväntningar.',
    icon: '🔗'
  },
  {
    id: '15-solutions',
    name: '15% Solutions',
    category: 'Connecting',
    baseTime: 30,
    scalingFactor: 1.0,
    minParticipants: 4,
    maxParticipants: 50,
    description: 'Upptäck och fokusera på vad varje person kan göra',
    instructions: '1) Individuell brainstorming (10 min): Tänk på er utmaning. Vilka små steg kan du ta direkt utan att behöva fråga om tillstånd eller få extra resurser? Vad ligger inom din direkta kontroll? Skriv ner alla idéer, även små. 2) Par (8 min): Dela era listor. Hjälp varandra att identifiera fler 15%-lösningar. Utmana varandra: "Vad hindrar dig från att göra det här imorgon?" 3) Grupper om fyra (12 min): Kombinera era bästa idéer. Välj de 3-5 mest kraftfulla 15%-lösningarna som kan göra störst skillnad. 4) Helgrupp (10 min): Varje grupp delar sina bästa lösningar. Vilka vill ni börja med denna vecka? Skapa konkreta åtaganden.',
    icon: '⚡'
  },
  {
    id: '25-10-crowdsourcing',
    name: '25:10 Crowdsourcing',
    category: 'Connecting',
    baseTime: 45,
    scalingFactor: 1.5,
    minParticipants: 10,
    maxParticipants: 40,
    description: 'Generera och sålla snabbt gruppens mest kraftfulla genomförbara idéer',
    instructions: 'Ge alla post-it-lappar och pennor. 1) Idégenerering (25 min): Alla skriver sina bästa idéer på post-it-lappar - en idé per lapp. Fokusera på kvalitet och genomförbarhet. Skriv tydligt så andra kan läsa. Sikta på 5-10 idéer per person. 2) Sortering (5 min): Sätt upp alla lappar på väggen och gruppera liknande idéer tillsammans. 3) Röstning (5 min): Alla får 3-5 röster (prickar/kryss) att fördela på de idéer de tycker är mest lovande. Rösta baserat på genomförbarhet OCH påverkan. 4) Diskussion (10 min): Fokusera på de 3-5 idéer som fick flest röster. Vad gör dem så attraktiva? Vilka skulle ni vilja testa först? Vem kan ta ansvar för nästa steg?',
    icon: '📊'
  },
  {
    id: 'conversation-cafe',
    name: 'Conversation Café',
    category: 'Connecting',
    baseTime: 60,
    scalingFactor: 1.2,
    minParticipants: 12,
    maxParticipants: 30,
    description: 'Engagera sig i meningsfulla samtal om utmaningar',
    instructions: 'Arrangera rummet med små bord (4-6 personer per bord) och skapa café-känsla. 1) Välkommen och check-in (10 min): Varje person delar kort hur de mår och vad de har med sig in i samtalet. 2) Första samtalsrunda (20 min): Diskutera den centrala frågan vid era bord. Använd "talking stick" eller liknande - bara den som håller föremålet pratar. Lyssna djupt och bygg vidare på varandras tankar. 3) Byt bord (5 min): Alla utom en "värd" per bord byter till nya bord. Värden stannar och sammanfattar för de nya. 4) Andra samtalsrunda (20 min): Fortsätt samtalet med nya konstellationer. 5) Avslutning (5 min): Vad har framkommit? Vilka nya insikter har ni fått?',
    icon: '☕'
  },
  {
    id: 'celebrity-interview',
    name: 'Celebrity Interview',
    category: 'Connecting',
    baseTime: 40,
    scalingFactor: 0.8,
    minParticipants: 10,
    maxParticipants: 60,
    description: 'Återkoppla ledarnas erfarenheter med människor',
    instructions: 'Välj en ledare/expert som gruppen vill lära mer om. 1) Förberedelse (10 min): Gruppen förbereder frågor som avslöjar personliga erfarenheter, misslyckanden, lärdomar och värderingar. Undvik ja/nej-frågor. 2) Intervju del 1 (15 min): En moderator intervjuar "kändisen" med förberedda frågor. Fokusera på berättelser och konkreta exempel snarare än teorier. 3) Publikfrågor (15 min): Publiken får ställa spontana frågor. Uppmuntra personliga och ärliga frågor. 4) Reflektion (10 min): Vad överraskade er? Vilka lärdomar tar ni med er? Hur förändrade detta er syn på ledarskap/expertis? Detta humaniserar ledare och gör deras kunskap mer tillgänglig och relevant.',
    icon: '🎩'
  },
  {
    id: 'agreement-certainty',
    name: 'Agreement-Certainty Matrix',
    category: 'Connecting',
    baseTime: 50,
    scalingFactor: 1.5,
    minParticipants: 6,
    maxParticipants: 25,
    description: 'Sortera utmaningar i enkla, komplicerade, komplexa och kaotiska',
    instructions: 'Rita en stor matris på whiteboard med "Grad av enighet om vad som ska göras" (Y-axel) och "Grad av säkerhet om orsak-verkan" (X-axel). 1) Förklara kvadranterna (10 min): Enkla (hög enighet, hög säkerhet) = bästa praxis, Komplicerade (hög enighet, låg säkerhet) = god praxis, Komplexa (låg enighet, låg säkerhet) = framväxande praxis, Kaotiska (låg enighet, hög säkerhet) = ny praxis. 2) Lista utmaningar (10 min): Brainstorma alla viktiga utmaningar ni står inför. 3) Placering (20 min): I grupper om 4-6, placera varje utmaning i rätt kvadrant. Diskutera var ni är osäkra. 4) Strategival (15 min): För varje kvadrant, diskutera vilken approach som passar bäst. Enkla: standardlösningar, Komplicerade: expertanalys, Komplexa: experiment, Kaotiska: snabb respons.',
    icon: '🔍'
  },
  {
    id: 'panarchy',
    name: 'Panarchy',
    category: 'Connecting',
    baseTime: 75,
    scalingFactor: 2.0,
    minParticipants: 8,
    maxParticipants: 20,
    description: 'Förstå hur inbäddade system interagerar',
    instructions: 'Rita koncentriska cirklar på whiteboard (individ i mitten, sedan team, organisation, bransch, samhälle). 1) Kartlägg nivåer (15 min): I grupper om 4-6, identifiera vilka system som påverkar er utmaning på varje nivå. Vad händer på individnivå? Teamnivå? Organisationsnivå? Osv. 2) Analysera kopplingar (20 min): Hur påverkar förändringar på en nivå andra nivåer? Rita pilar mellan nivåerna. Var finns de starkaste kopplingarna? 3) Identifiera påverkansmöjligheter (20 min): Var kan ni påverka uppåt (mot högre systemnivåer)? Var kan ni påverka nedåt? Vilka är era bästa ingångar för förändring? 4) Strategier (15 min): Utveckla konkreta strategier för att arbeta på flera systemnivåer samtidigt. Vad kan ni göra på kort vs lång sikt?',
    icon: '🌀'
  },

  // Row 5
  {
    id: '9-whys',
    name: '9 Whys',
    category: 'Learning',
    baseTime: 25,
    scalingFactor: 0.8,
    minParticipants: 4,
    maxParticipants: 20,
    description: 'Gör syftet med ert gemensamma arbete tydligt',
    instructions: 'Arbeta i par eller små grupper. 1) Starta med målet (2 min): Formulera tydligt ert mål, projekt eller problem. Skriv ner det. 2) Första varför (2 min): Fråga "Varför är detta viktigt?" Skriv ner svaret under det ursprungliga målet. 3) Fortsätt fråga (16 min): Fråga "Varför?" åtta gånger till, varje gång baserat på det senaste svaret. Gå djupare för varje fråga. Om ni kör fast, omformulera eller närma er från en annan vinkel. 4) Reflektion (5 min): Titta på hela kedjan. Vad överraskar er? Vilket "varför" känns mest kraftfullt? Har ert ursprungliga mål förändrats? Detta avslöjar djupare motivationer och hjälper gruppen förstå det verkliga syftet.',
    icon: '❓'
  },
  {
    id: 'troika-consulting',
    name: 'Troika Consulting',
    category: 'Learning',
    baseTime: 30,
    scalingFactor: 1.0,
    minParticipants: 6,
    maxParticipants: 30,
    description: 'Få praktisk och fantasifull hjälp från kollegor',
    instructions: 'Bilda grupper om tre personer (A, B, C). 1) Första runda - A är klient (20 min): A presenterar sin utmaning (5 min) - var konkret och specifik. B och C diskuterar lösningar som om A inte vore där (10 min) - A lyssnar bara, antecknar, får inte svara eller försvara. A reflekterar över vad hen hört (5 min) - vad var mest värdefullt? 2) Andra runda - B är klient (20 min): Samma process med B som klient. 3) Tredje runda - C är klient (20 min): Samma process med C som klient. Nyckel: Konsulterna pratar OM klienten, inte TILL klienten. Detta ger nya perspektiv utan att klienten behöver försvara sina val.',
    icon: '⭐'
  },
  {
    id: 'wise-crowds',
    name: 'Wise Crowds',
    category: 'Learning',
    baseTime: 40,
    scalingFactor: 1.3,
    minParticipants: 12,
    maxParticipants: 200,
    description: 'Utnyttja hela gruppens visdom i snabba cykler',
    instructions: 'Förbered en viktig fråga som gruppen behöver besvara. 1) Individuell reflektion (3 min): Alla tänker själva på frågan och skriver ner sina första tankar. 2) Par (5 min): Diskutera med personen bredvid. Vad har ni gemensamt? Vad skiljer sig? 3) Grupper om fyra (8 min): Två par slås samman. Fördjupa diskussionen och börja forma gemensamma svar. 4) Grupper om åtta (10 min): Två grupper om fyra slås samman. Testa era idéer mot en större grupp. 5) Helgrupp (10 min): Varje grupp om åtta presenterar sitt bästa svar. Identifiera gemensamma teman och kraftfulla insikter. Varje runda förfinar och förbättrar svaren genom kollektiv intelligens.',
    icon: '🌊'
  },
  {
    id: 'user-experience',
    name: 'User Experience Fishbowl',
    category: 'Learning',
    baseTime: 55,
    scalingFactor: 1.0,
    minParticipants: 10,
    maxParticipants: 50,
    description: 'Dela know-how från erfarenhet med en större gemenskap',
    instructions: 'Arrangera stolarna i två koncentriska cirklar. 1) Inre cirkel (4-5 stolar): Personer med direkt erfarenhet av ämnet. Lämna en tom stol. 2) Yttre cirkel: Alla andra som lyssnar. 3) Starta diskussionen (5 min): De i inre cirkeln börjar dela sina användarupplevelser. Fokusera på konkreta berättelser och lärdomar. 4) Öppen diskussion (30-40 min): Diskussionen flyter fritt i inre cirkeln. Om någon i yttre cirkeln vill bidra, sätter de sig på den tomma stolen, säger sitt, och lämnar sedan stolen tom igen. Personer i inre cirkeln kan också lämna för att ge plats åt andra. 5) Avslutning (10 min): Sammanfatta viktiga lärdomar och insikter som framkommit.',
    icon: '🐠'
  },
  {
    id: 'social-network',
    name: 'Social Network Webbing',
    category: 'Learning',
    baseTime: 45,
    scalingFactor: 1.5,
    minParticipants: 15,
    maxParticipants: 50,
    description: 'Kartlägg och stärk nätverket av relationer',
    instructions: 'Alla står i en stor cirkel. En person håller i ett garnnystan. 1) Första runda - formella relationer (10 min): Personen med garnet säger sitt namn och kastar garnet till någon de arbetar med formellt. Den personen håller i tråden, säger sitt namn, och kastar vidare. Fortsätt tills alla är inkluderade. 2) Andra runda - informella relationer (10 min): Använd ett annat färgat garn. Kasta till personer ni pratar med informellt, får råd från, eller har roligt med. 3) Tredje runda - önskade relationer (10 min): Använd ett tredje garn. Kasta till personer ni skulle vilja arbeta mer med. 4) Analys (15 min): Titta på nätverket. Vilka är navet? Var finns flaskhalsar? Vilka kopplingar saknas? Vad skulle hända om vissa personer försvann? 5) Åtgärder (5 min): Hur kan ni stärka nätverket?',
    icon: '🕷️'
  },
  {
    id: 'simple-ethnography',
    name: 'Simple Ethnography',
    category: 'Learning',
    baseTime: 120,
    scalingFactor: 1.0,
    minParticipants: 6,
    maxParticipants: 20,
    description: 'Observera och dokumentera faktiska beteenden hos användare i fält',
    instructions: 'Planera för minst 2 timmar fältarbete. 1) Förberedelse (15 min): Definiera vad ni vill lära er. Vem ska ni observera? Var? Förbered observationsmallar med kolumner för "Vad de gör", "Vad de säger", "Känslor/reaktioner", "Frågor som uppstår". 2) Fältarbete (60-90 min): Gå ut i par och observera era användare i deras naturliga miljö. Dokumentera vad de FAKTISKT gör, inte vad de säger att de gör. Leta efter: Workarounds, frustrationspunkter, oanade behov, överraskande beteenden. Stör inte - bara observera. 3) Sammanställning (15 min): Samla era anteckningar och identifiera de mest intressanta observationerna. 4) Delning (30 min): Varje par delar sina viktigaste upptäckter. Vilka mönster ser ni? Vad överraskade er mest?',
    icon: '📝'
  },
  {
    id: 'purpose-to-practice',
    name: 'Purpose to Practice',
    category: 'Learning',
    baseTime: 80,
    scalingFactor: 2.0,
    minParticipants: 8,
    maxParticipants: 25,
    description: 'Definiera de fem väsentliga elementen för ett motståndskraftigt initiativ',
    instructions: 'Arbeta igenom de fem P:na systematiskt. 1) Purpose/Syfte (15 min): Varför existerar detta initiativ? Vad är det djupare syftet? Använd 9 Whys om nödvändigt. 2) Principles/Principer (15 min): Vilka grundläggande principer ska vägleda ert arbete? Vad kommer ni aldrig att kompromissa om? 3) Participants/Deltagare (15 min): Vem behöver vara involverad? Vilka roller behövs? Vem påverkas? Vem har makt att stoppa eller stödja? 4) Structure/Struktur (15 min): Hur organiserar ni er? Vilka möten behövs? Hur fattas beslut? Hur kommunicerar ni? 5) Practices/Praxis (20 min): Vad gör ni konkret? Vilka aktiviteter, rutiner och processer behövs? Testa varje element: Stödjer det syftet? Följer det principerna? Engagerar det rätt deltagare?',
    icon: '🔄'
  }
];

export const getCategoryColor = (category: string): string => {
  const colors = {
    'Foundation': 'bg-blue-100 text-blue-800 border-blue-200',
    'Planning': 'bg-green-100 text-green-800 border-green-200',
    'Deciding': 'bg-purple-100 text-purple-800 border-purple-200',
    'Connecting': 'bg-orange-100 text-orange-800 border-orange-200',
    'Learning': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};