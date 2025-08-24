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
    instructions: '**Syfte:** Skapa trygghet och tydlighet för alla deltagare.\n\n**1) Välkomsthälsning (2 min):**\n- Välkomna alla och presentera er själva\n- Exempel: "Välkomna till workshoppen! Jag heter [namn] och kommer att leda oss idag."\n\n**2) Syfte och mål (5 min):**\n- Förklara tydligt varför ni samlas och vad ni vill uppnå\n- Exempel: "Vi samlas för att lösa utmaningen med [problem]. I slutet av dagen ska vi ha [konkret resultat]."\n\n**3) Agenda och struktur (5 min):**\n- Gå igenom dagens program steg för steg\n- Exempel: "Vi börjar med att förstå problemet, sedan genererar vi idéer, och avslutar med att skapa en handlingsplan."\n\n**4) Praktisk information (3 min):**\n- Var finns toaletter, kaffe, lunch?\n- När är pauser?\n- Hur fungerar tekniken?\n\n**Tips:** Var tydlig, kortfattad och inkluderande. Kontrollera att alla förstår innan ni går vidare.',
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
    instructions: '**Syfte:** Säkerställa att alla vet vad som händer härnäst och känner sig engagerade.\n\n**1) Reflektion över dagen (5 min):**\n- Fråga: "Vad har vi lärt oss idag?"\n- Låt 3-4 personer dela sina viktigaste insikter\n- Exempel: "Jag insåg att vi behöver tänka annorlunda om..."\n\n**2) Konkreta nästa steg (7 min):**\n- Sammanfatta vad som ska hända härnäst\n- Exempel: "Anna tar ansvar för att sammanställa rapporten senast fredag. Erik bokar uppföljningsmöte nästa vecka."\n- Skriv upp åtaganden på whiteboard\n\n**3) Tack och avslutning (3 min):**\n- Tacka alla för deras engagemang\n- Exempel: "Tack för er energi och engagemang idag. Jag ser fram emot att se vad ni åstadkommer!"\n\n**Tips:** Var konkret med åtaganden. Sätt datum och ansvariga personer.',
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
    instructions: '**Syfte:** Ge deltagarna tid att smälta intryck och ladda om.\n\n**1) Ange tydlig tid (1 min):**\n- "Vi tar en 10-minuters paus nu. Vi börjar igen kl [tid]."\n\n**2) Uppmuntrande aktivitet (valfritt):**\n- "Under pausen, tänk på vad som har varit mest intressant hittills."\n- Eller: "Prata med någon ni inte känner så väl."\n\n**3) Återkalla tillbaka (1 min):**\n- "Välkomna tillbaka! Vi fortsätter med..."\n\n**Tips:** Håll koll på tiden och återkalla alla när pausen är slut.',
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
    instructions: '**Syfte:** Ge tid för reflektion och informella samtal som fördjupar förståelsen.\n\n**1) Ange tydlig tid (1 min):**\n- "Vi tar en 15-minuters paus nu. Vi börjar igen kl [tid]."\n\n**2) Reflektionsuppgift (valfritt):**\n- "Under pausen, reflektera över: Vad har förvånat er mest hittills?"\n- Eller: "Diskutera med andra: Vilka idéer vill ni utforska mer?"\n\n**3) Återkalla tillbaka (2 min):**\n- "Välkomna tillbaka! Låt oss börja med en snabb check-in: Vad har ni reflekterat över under pausen?"\n\n**Tips:** Längre pauser är bra för att låta idéer sjunka in och för att bygga relationer.',
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
    instructions: '**Syfte:** Identifiera och utforska verkliga dilemman som inte har enkla lösningar.\n\n**1) Individuellt (5 min):**\n- **Vad:** Tänk på en utmaning som innehåller motsägelser\n- **Exempel:** "Hur kan vi både vara snabba OCH noggranna?"\n- **Tips:** Leta efter "både... och..." eller "antingen... eller..."\n- **Skriv ner:** 2-3 frågor som fångar verkliga dilemman\n\n**2) I par (10 min):**\n- **Vad:** Dela era frågor och hjälp varandra att skärpa dem\n- **Exempel:** "Din fråga är bra, men kan vi göra den mer specifik?"\n- **Tips:** Fråga "Vad händer om vi inte löser detta?"\n\n**3) Grupper om fyra (8 min):**\n- **Vad:** Kombinera era bästa frågor\n- **Exempel:** "Låt oss kombinera Anna och Eriks idéer..."\n- **Välj:** Den mest kraftfulla frågan som fångar gruppens dilemma\n\n**4) Helgrupp (7 min):**\n- **Vad:** Varje grupp presenterar sin fråga\n- **Exempel:** "Vår wicked question är: Hur kan vi både..."\n- **Diskutera:** Vilka frågor beskriver era gemensamma utmaningar?\n\n**Tips:** Wicked questions har inga enkla svar - det är okej!',
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
    instructions: '**Syfte:** Dra lärdomar från konkreta händelser genom strukturerad reflektion.\n\n**Genomförande:**\n\n**1) Välj händelse (2 min):**\n- **Vad:** Välj en specifik händelse, projekt eller aktivitet\n- **Exempel:** "Låt oss reflektera över lanseringen av vårt nya system förra månaden."\n- **Tips:** Välj något som alla känner till\n\n**2) Individuellt - Vad hände (5 min):**\n- **Vad:** Skriv ner bara fakta, inga tolkningar\n- **Exempel:** "Vi lanserade systemet den 15:e. 50% av användarna loggade in första dagen."\n- **Tips:** Undvik "vi borde ha..." eller "det var bra/dåligt"\n\n**3) Par - Så vad? (8 min):**\n- **Vad:** Diskutera "Så vad betyder det?"\n- **Exempel:** "50% loggade in - det betyder att hälften inte gjorde det. Vad kan det bero på?"\n- **Tips:** Leta efter mönster och trender\n\n**4) Grupper om fyra - Nu vad? (10 min):**\n- **Vad:** Diskutera "Nu vad ska vi göra?"\n- **Exempel:** "Baserat på detta, ska vi förbättra onboarding-processen."\n- **Tips:** Fokusera på konkreta åtgärder\n\n**5) Helgrupp (7 min):**\n- **Vad:** Dela viktigaste insikter och handlingsplaner\n- **Exempel:** "Vår huvudlärdom är att vi behöver..."\n\n**Tips:** Håll dig till fakta i början, tolka sedan.',
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
    instructions: '**Syfte:** Fokusera på det som verkligen är kritiskt och eliminera onödiga krav.\n\n**Genomförande:**\n\n**1) Individuellt - Brainstorma (5 min):**\n- **Vad:** Lista alla möjliga specifikationer och krav\n- **Exempel:** "Måste fungera på mobil, ska vara snabbt, ska vara säkert..."\n- **Tips:** Skriv ner allt, även det som verkar självklart\n\n**2) Par - Börja eliminera (8 min):**\n- **Vad:** Dela era listor och börja ta bort det som inte är kritiskt\n- **Exempel:** "Är det verkligen kritiskt att det fungerar på alla webbläsare?"\n- **Tips:** Fråga "Vad händer om vi inte har detta?"\n\n**3) Grupper om fyra - Skapa kolumner (15 min):**\n- **Vad:** Skapa två kolumner: "MÅSTE göra" och "FÅR INTE göra"\n- **Exempel:** "MÅSTE: Säker inloggning. FÅR INTE: Låta användare dela lösenord."\n- **Tips:** Var mycket selektiva - endast det absolut nödvändiga\n\n**4) Helgrupp - Testa (7 min):**\n- **Vad:** Testa varje punkt med "Vad händer om vi inte gör detta?"\n- **Exempel:** "Vad händer om vi inte har säker inloggning? Kunde bli hackade."\n- **Tips:** Om svaret är "inget allvarligt", ta bort det\n\n**Tips:** Mindre är mer. Fokusera på kvalitet över kvantitet.',
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
    instructions: '**Syfte:** Öva aktivt lyssnande och skapa djupare förståelse mellan människor.\n\n**Genomförande:**\n\n**1) Första runda - Person A berättar (15 min):**\n- **Vad:** Person A berättar om en utmaning där de kände sig missförstådda\n- **Exempel:** "Jag försökte förklara vårt behov för IT-avdelningen, men de verkade inte förstå..."\n- **Tips för lyssnaren:** Ställ frågor som "Vad kände du då?" eller "Berätta mer om det"\n- **Undvik:** Att ge råd eller försvara andra\n\n**2) Andra runda - Person B berättar (15 min):**\n- **Vad:** Byt roller - nu berättar Person B\n- **Tips:** Använd samma teknik som i första rundan\n\n**3) Reflektion tillsammans (10 min):**\n- **Vad:** Diskutera hur det kändes att bli lyssnad på\n- **Exempel:** "Jag kände mig verkligen förstådd när du frågade om mina känslor."\n- **Tips:** Identifiera konkreta beteenden som hjälpte\n\n**Tips:** Fokusera på att förstå, inte att lösa problemet.',
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
    instructions: '**Syfte:** Klargöra vad olika grupper behöver från varandra för att lyckas.\n\n**Genomförande:**\n\n**1) Organisera grupper (2 min):**\n- **Vad:** Se till att olika funktioner/avdelningar är representerade\n- **Exempel:** Blanda IT, HR, ekonomi, verksamhet i varje grupp\n- **Tips:** Undvik att ha bara en avdelning per grupp\n\n**2) Individuell förberedelse (5 min):**\n- **Vad:** Tänk på vad du behöver från andra för att lyckas\n- **Exempel:** "Jag behöver snabbare svar från IT när systemet krånglar."\n- **Tips:** Var specifik och konkret\n\n**3) Runda 1 - Vad jag behöver (10 min):**\n- **Vad:** I par, använd formatet "Vad jag behöver från dig/er är..."\n- **Exempel:** "Vad jag behöver från dig är att du svarar på mina mail inom 24 timmar."\n- **Tips:** Undvik att försvara eller förklara - bara säg vad du behöver\n\n**4) Runda 2 - Vad jag kan erbjuda (10 min):**\n- **Vad:** Samma par, använd formatet "Vad jag kan erbjuda dig/er är..."\n- **Exempel:** "Vad jag kan erbjuda dig är att jag alltid prioriterar dina förfrågningar."\n\n**5) Dokumentation och helgrupp (8 min):**\n- **Vad:** Skriv upp viktigaste behov och erbjudanden på post-it-lappar\n- **Exempel:** Sätt upp lapparna på väggen och identifiera möjliga matchningar\n\n**Tips:** Fokusera på vad som är möjligt att förändra.',
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
    instructions: '**Syfte:** Hitta balansen mellan självständighet och samarbete.\n\n**Genomförande:**\n\n**1) Individuellt - Kartlägg beroenden (8 min):**\n- **Vad:** Lista vad ni behöver tillstånd för eller väntar på från andra\n- **Exempel:** "Jag behöver chefens godkännande för alla utgifter över 1000 kr."\n- **Tips:** Var ärlig - vad hindrar er från att agera?\n\n**2) Par - Kategorisera (10 min):**\n- **Vad:** Diskutera vilka beroenden som är nödvändiga vs onödiga\n- **Exempel:** "Chefens godkännande för stora utgifter är nödvändigt, men för små inköp är det onödigt."\n- **Tips:** Nödvändiga = skapar värde, Onödiga = skapar bara byråkrati\n\n**3) Grupper om fyra - Identifiera möjligheter (15 min):**\n- **Vad:** Hitta sätt att öka autonomi utan att förlora viktiga kopplingar\n- **Exempel:** "Vi kan ge teamet autonomi för utgifter under 500 kr, men behålla godkännande för större belopp."\n- **Tips:** Tänk "börja/sluta/fortsätta göra"\n\n**4) Helgrupp - Dela idéer (12 min):**\n- **Vad:** Dela era bästa idéer för att balansera självständighet med samarbete\n- **Exempel:** "Vår idé är att..."\n- **Tips:** Vilka experiment kan ni testa?\n\n**Tips:** Autonomi handlar inte om att vara ensam, utan om att kunna agera självständigt när det är lämpligt.',
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
    instructions: '**Syfte:** Designa era egna aktiviteter eller förbättra befintliga möten.\n\n**Genomförande:**\n\n**1) Strukturell inbjudan (5 min):**\n- **Vad:** Skriv ner exakt vad ni säger när ni introducerar aktiviteten\n- **Exempel:** "Vi ska nu dela upp oss i grupper om 3-4 personer. Varje grupp får 10 minuter att diskutera frågan: \'Vilka är de största utmaningarna med vårt nuvarande arbetssätt?\'"\n- **Tips:** Var specifik med vad deltagarna ska göra, inte bara varför\n\n**2) Utrymme och material (5 min):**\n- **Vad:** Beskriv hur rummet ska se ut och vilka material som behövs\n- **Exempel:** "Deltagarna sitter runt bord i grupper om 4. Varje grupp har en flipchart, markeringar och post-it-lappar. I mitten av rummet finns en gemensam whiteboard."\n- **Tips:** Tänk på vad som behövs för att alla ska kunna delta aktivt\n\n**3) Deltagande (5 min):**\n- **Vad:** Beskriv vem som pratar när och hur länge\n- **Exempel:** "Först presenterar facilitatören frågan (2 min). Sedan arbetar grupperna parallellt (10 min). Slutligen presenterar varje grupp sina idéer (3 min per grupp)."\n- **Tips:** Var tydlig med tidsfördelning och vem som har ordet\n\n**4) Gruppkonfiguration (5 min):**\n- **Vad:** Beskriv hur grupperna bildas och vilken storlek de har\n- **Exempel:** "Deltagarna räknar 1-2-3-4 runt rummet. Alla ettor bildar en grupp, alla tvåor en annan, osv. Varje grupp har 4-5 personer."\n- **Tips:** Tänk på hur ni vill blanda deltagarna eller behålla befintliga grupper\n\n**5) Sekvens och tid (5 min):**\n- **Vad:** Gå igenom hela aktiviteten steg för steg med tider\n- **Exempel:** "1. Introduktion (2 min), 2. Grupparbete (10 min), 3. Presentationer (12 min), 4. Sammanfattning (3 min). Total tid: 27 minuter."\n- **Tips:** Testa att gå igenom varje steg mentalt för att se om tiderna stämmer\n\n**Tips:** En bra design säkerställer att alla deltar och att tiden används effektivt.',
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
    instructions: '**Syfte:** Identifiera vad som fungerar bra och bygg vidare på framgångsfaktorer.\n\n**1) Förberedelse (3 min):**\n- **Vad:** Tänk på en situation när ni var stolta över ert arbete\n- **Exempel:** "När vi lyckades leverera projektet i tid trots svårigheter."\n- **Tips:** Välj något som verkligen fungerade bra\n\n**2) Första intervjun - Person A intervjuar B (12 min):**\n- **Vad:** Person A ställer frågor till Person B\n- **Frågor att använda:**\n  * "Berätta om situationen - vad hände?"\n  * "Vad var din roll? Vad gjorde du?"\n  * "Vad gjorde det möjligt? Vad var nyckeln till framgång?"\n  * "Vilka styrkor använde du?"\n  * "Vad värderade du mest i situationen?"\n- **Tips:** Fokusera på det positiva och vad som fungerade\n\n**3) Andra intervjun - Person B intervjuar A (12 min):**\n- **Vad:** Byt roller och använd samma frågor\n- **Tips:** Låt berättaren få tid att tänka och utveckla sina svar\n\n**4) Reflektion tillsammans (8 min):**\n- **Vad:** Diskutera gemensamma mönster och styrkor\n- **Exempel:** "Jag märker att vi båda nämnde samarbete som viktigt."\n- **Tips:** Vad kan ni bygga vidare på?\n\n**Tips:** Fokusera på att förstå vad som skapade framgång, inte bara vad som hände.',
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
    instructions: '**Syfte:** Identifiera vad som redan fungerar bra och bygg vidare på det.\n\n**Genomförande:**\n\n**1) Upptäck - Samla berättelser (30 min):**\n- **Vad:** I grupper om 6-8, samla berättelser om framgångar\n- **Frågor att använda:**\n  * "När har vi lyckats trots svårigheter?"\n  * "Vad gjorde vi då som vi kunde göra mer av?"\n  * "Vad fungerar redan bra i vår organisation?"\n- **Tips:** Fokusera på konkreta exempel, inte teorier\n\n**2) Mönster - Identifiera framgångsfaktorer (20 min):**\n- **Vad:** Hitta gemensamma mönster i berättelserna\n- **Exempel:** "Jag märker att många berättelser handlar om samarbete mellan avdelningar."\n- **Tips:** Vad återkommer i flera berättelser?\n\n**3) Uppfinn - Bygg vidare (25 min):**\n- **Vad:** Brainstorma sätt att göra mer av det som fungerar\n- **Exempel:** "Om samarbete fungerar, hur kan vi skapa fler möjligheter till det?"\n- **Tips:** Vad skulle hända om ni gjorde mer av det som fungerar?\n\n**4) Handlingsplan - Konkreta åtgärder (15 min):**\n- **Vad:** Välj 2-3 åtgärder som kan testas direkt\n- **Exempel:** "Vi testar att ha gemensamma lunchmöten varje tisdag."\n- **Tips:** Vem gör vad och när?\n\n**Tips:** Bygg på styrkor, inte bara lös problem.',
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
    instructions: '**Syfte:** Utveckla och testa lösningar genom snabb prototyping.\n\n**Genomförande:**\n\n**1) Uppvärmning - Öva "Ja, och..." (10 min):**\n- **Vad:** I par, öva att bygga vidare på varandras idéer\n- **Exempel:** A: "Vi ska bygga en app." B: "Ja, och den ska ha en chatbot!"\n- **Tips:** Undvik "Nej, men..." - bygg alltid vidare\n\n**2) Problemformulering (5 min):**\n- **Vad:** Definiera tydligt vilken utmaning ni vill utforska\n- **Exempel:** "Hur kan vi förbättra kundupplevelsen?"\n- **Tips:** Var specifik och konkret\n\n**3) Första prototyp - Skapa scen (15 min):**\n- **Vad:** I grupper om 4-5, skapa en kort scen (2-3 min)\n- **Exempel:** Visa hur lösningen skulle fungera i praktiken\n- **Tips:** Använd enkla rekvisita och roller\n\n**4) Presentation och feedback (15 min):**\n- **Vad:** Varje grupp visar sin scen\n- **Exempel:** Publiken ger feedback med "Ja, och..."-principen\n- **Tips:** Fokusera på vad som fungerade\n\n**5) Iteration - Förbättra (15 min):**\n- **Vad:** Förbättra scenerna baserat på feedback\n- **Tips:** Visa igen och se vad som förbättrats\n\n**Tips:** Var lekfull och experimentell - det handlar om att lära, inte att vara perfekt.',
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
    instructions: '**Syfte:** Utforska problem och lösningar genom visuell representation.\n\n**Genomförande:**\n\n**1) Förberedelse (2 min):**\n- **Vad:** Ge alla papper och pennor\n- **Tips:** Betona att konstnärlig skicklighet inte krävs\n- **Exempel:** "Använd enkla symboler, streckgubbar och former."\n\n**2) Individuellt - Rita problemet (10 min):**\n- **Vad:** Rita er syn på problemet eller utmaningen\n- **Exempel:** "Vad ser det ut som? Vilka delar ingår?"\n- **Tips:** Fokusera på vad problemet ser ut som, inte lösningar\n\n**3) Par - Dela och förklara (10 min):**\n- **Vad:** Visa era teckningar för varandra och förklara\n- **Exempel:** "Vad ser ni som är lika/olika?"\n- **Tips:** Låt varje person förklara sin bild\n\n**4) Gemensam bild - Kombinera perspektiv (15 min):**\n- **Vad:** Skapa tillsammans en ny teckning\n- **Exempel:** Kombinera era olika perspektiv\n- **Tips:** Kompromissa och bygg vidare på varandras idéer\n\n**5) Grupper om fyra - Dela insikter (8 min):**\n- **Vad:** Visa era gemensamma bilder och diskutera\n- **Exempel:** "Vilka nya insikter har framkommit genom att rita?"\n- **Tips:** Vad har ni lärt er genom processen?\n\n**Tips:** Rita hjälper oss att se saker på nya sätt och uttrycka vad som är svårt att säga med ord.',
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
    instructions: '**Syfte:** Frigöra gruppens kollektiva visdom genom självorganiserad dialog.\n\n**Genomförande:**\n\n**1) Öppning (15 min):**\n- **Vad:** Presentera den centrala frågan/temat\n- **Exempel:** "Vi samlas för att utforska hur vi kan förbättra vårt samarbete..."\n- **Tips:** Förklara principerna: "Vem som än kommer är rätt personer", "Vad som än händer är det enda som kunde hända", "När det börjar är det rätt tid", "När det är över är det över"\n\n**2) Marknadsplats (30 min):**\n- **Vad:** Alla som vill kan föreslå diskussionsämnen relaterade till temat\n- **Exempel:** Skriv på stora papper och sätt upp på väggen\n- **Tips:** Uppmuntra många olika perspektiv och frågor\n\n**3) Självorganisering (10 min):**\n- **Vad:** Deltagarna väljer vilka sessioner de vill delta i och organiserar sig själva\n- **Exempel:** "Jag går till sessionen om kommunikation..."\n- **Tips:** Låt folk röra sig fritt och följa sin passion\n\n**4) Sessioner (60-90 min):**\n- **Vad:** Parallella diskussioner i olika rum/hörn\n- **Exempel:** Folk kan röra sig fritt mellan grupper\n- **Tips:** Varje session dokumenterar sina viktigaste insikter\n\n**5) Avslutning (30 min):**\n- **Vad:** Samla alla och låt grupper dela sina viktigaste insikter\n- **Exempel:** "Från vår session om kommunikation..."\n- **Tips:** Fokusera på konkreta åtgärder och nästa steg',
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
    instructions: '**Syfte:** Utveckla strategier som fungerar oavsett hur framtiden utvecklas.\n\n**Genomförande:**\n\n**1) Brainstorma osäkerheter (10 min):**\n- **Vad:** Lista alla viktiga osäkerheter ni står inför\n- **Exempel:** "Kommer marknaden att växa eller krympa? Kommer tekniken att förändras drastiskt?"\n- **Tips:** Var bred och inkludera både interna och externa faktorer\n\n**2) Välj två kritiska (10 min):**\n- **Vad:** Identifiera de två mest kritiska osäkerheterna som verkligen påverkar er framtid\n- **Exempel:** Formulera som "antingen X eller Y"\n- **Tips:** Välj osäkerheter som är både viktiga och osäkra\n\n**3) Skapa matris (5 min):**\n- **Vad:** Rita en 2x2-matris med osäkerheterna som axlar\n- **Exempel:** Skapa fyra kvadranter som representerar olika framtidsscenarier\n- **Tips:** Använd stora papper och tydliga etiketter\n\n**4) Utveckla scenarier (20 min):**\n- **Vad:** I grupper om 3-4, utveckla ett detaljerat scenario för varje kvadrant\n- **Exempel:** Vad händer om både X och Y inträffar? Vad händer om X men inte Y?\n- **Tips:** Var konkret och beskriv vad som händer i varje scenario\n\n**5) Robusta strategier (20 min):**\n- **Vad:** Identifiera strategier och åtgärder som fungerar bra oavsett vilket scenario som blir verklighet\n- **Exempel:** "Vi investerar i flexibilitet och lärande..."\n- **Tips:** Fokusera på strategier som skapar värde i flera scenarier\n\n**6) Helgrupp (10 min):**\n- **Vad:** Dela era mest robusta strategier\n- **Exempel:** "Vår mest robusta strategi är..."\n- **Tips:** Välj 2-3 strategier att fokusera på',
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
    instructions: '**Syfte:** Säkerställa att alla deltar aktivt och att de bästa idéerna bubblar upp.\n\n**Genomförande:**\n\n**1) Ställ en tydlig fråga (1 min):**\n- **Vad:** Formulera en konkret fråga som gruppen ska besvara\n- **Exempel:** "Vilka är de största utmaningarna med vårt nuvarande arbetssätt?"\n- **Tips:** Var specifik och tydlig\n\n**2) Tyst reflektion (1 min):**\n- **Vad:** Alla tänker själva på frågan\n- **Exempel:** Skriv ner era tankar\n- **Tips:** Ingen pratar - bara tyst reflektion\n\n**3) Par (2 min):**\n- **Vad:** Diskutera med personen bredvid dig\n- **Exempel:** "Vad tänkte du? Kan vi bygga vidare på det?"\n- **Tips:** Bygg vidare på varandras idéer\n\n**4) Grupper om fyra (4 min):**\n- **Vad:** Två par slås samman\n- **Exempel:** Dela era bästa idéer och utveckla dem\n- **Tips:** Välj ut de mest lovande idéerna\n\n**5) Helgrupp (5-10 min):**\n- **Vad:** Varje grupp delar sin viktigaste insikt\n- **Exempel:** Skriv upp nyckelord på whiteboard\n- **Tips:** Identifiera gemensamma teman\n\n**Tips:** Denna struktur säkerställer att alla deltar och att idéerna förbättras genom varje steg.',
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
    instructions: '**Syfte:** Identifiera och stoppa beteenden som sabotear framgång.\n\n**Genomförande:**\n\n**1) Omvänd brainstorming (15 min):**\n- **Vad:** Fråga "Vad kan vi göra för att garantera det sämsta möjliga resultatet?"\n- **Exempel:** "Vi kan ignorera kundfeedback, fördröja alla beslut, och kommunicera otydligt."\n- **Tips:** Var kreativa och överdriva - ju värre desto bättre!\n\n**2) Kategorisera (10 min):**\n- **Vad:** Gruppera de destruktiva beteendena i teman\n- **Exempel:** Kommunikation, beslutsfattande, samarbete\n- **Tips:** Hitta gemensamma mönster\n\n**3) Verklighetscheck (15 min):**\n- **Vad:** För varje kategori, fråga "Vad av detta gör vi redan idag?"\n- **Exempel:** "Vi ignorerar faktiskt kundfeedback ibland..."\n- **Tips:** Var modiga och erkänn sanningen\n\n**4) Stoppa-lista (10 min):**\n- **Vad:** Identifiera konkreta beteenden ni kan sluta med\n- **Exempel:** "Vi slutar med att fördröja beslut utan anledning."\n- **Tips:** Välj det som är lättast att förändra först\n\n**Tips:** Det är lättare att sluta med något dåligt än att börja med något bra.',
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
    instructions: '**Syfte:** Sprida goda metoder och bygg nya kopplingar mellan team.\n\n**Genomförande:**\n\n**1) Förberedelse (10 min):**\n- **Vad:** Varje team förbereder en 5-minuters presentation av sin bästa metod/framgång\n- **Exempel:** "Vi vill dela vår metod för snabb beslutsfattning..."\n- **Tips:** Fokusera på konkreta tips som andra kan använda\n\n**2) Stationsrundor (3x10 min):**\n- **Vad:** Dela upp i grupper och rotera mellan stationer\n- **Exempel:** Vid varje station presenterar ett team sin metod och svarar på frågor\n- **Tips:** Håll presentationerna korta och interaktiva\n\n**3) Paus och reflektion (5 min):**\n- **Vad:** Kort paus för att smälta intryck\n- **Exempel:** "Vilka metoder känns mest relevanta för oss?"\n- **Tips:** Låt folk reflektera individuellt\n\n**4) Andra stationsrundor (3x10 min):**\n- **Vad:** Fortsätt rotationen så alla hör alla presentationer\n- **Exempel:** "Nu när vi har hört alla, vad vill vi utforska mer?"\n- **Tips:** Fokusera på djupare förståelse\n\n**5) Helgrupp (10 min):**\n- **Vad:** Vilka metoder vill ni testa? Vilka nya kopplingar har skapats?\n- **Exempel:** "Vi vill testa deras beslutsmetod..."\n- **Tips:** Planera konkreta nästa steg och uppföljning',
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
    instructions: '**Syfte:** Öva progressiva metoder för att hjälpa andra på ett respektfullt sätt.\n\n**Genomförande:**\n\n**1) Introduktion (5 min):**\n- **Vad:** Förklara de fyra nivåerna av hjälp\n- **Exempel:** Lyssna/bekräfta → Ställa frågor → Erbjuda observationer → Ge råd (endast om efterfrågat)\n- **Tips:** Börja alltid med lägre nivåer och gå uppåt endast om efterfrågat\n\n**2) Första övning (10 min):**\n- **Vad:** Person som behöver hjälp beskriver en verklig utmaning\n- **Exempel:** Hjälparen övar nivå 1-2 (lyssna och ställa öppna frågor)\n- **Tips:** Observatören antecknar vad som fungerar bra\n\n**3) Feedback (5 min):**\n- **Vad:** Vad fungerade bra? Vad kunde förbättras?\n- **Exempel:** "Din fråga var bra eftersom den var öppen..."\n- **Tips:** Fokusera på konkreta beteenden\n\n**4) Andra övning (10 min):**\n- **Vad:** Samma trio, ny utmaning\n- **Exempel:** Hjälparen övar nivå 3-4 (observationer och råd om efterfrågat)\n- **Tips:** Jämför med första övningen\n\n**5) Reflektion (5 min):**\n- **Vad:** Diskutera skillnaden mellan nivåerna\n- **Exempel:** "När är varje nivå mest hjälpsam?"\n- **Tips:** Vilken nivå kändes mest respektfull?',
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
    instructions: '**Syfte:** Visualisera och förbättra processer genom steg-för-steg-berättelser.\n\n**Genomförande:**\n\n**1) Välj fokus (5 min):**\n- **Vad:** Bestäm vilken idé/lösning/process ni vill visualisera\n- **Exempel:** "Vi vill visualisera vår kundresan från första kontakt till leverans"\n- **Tips:** Välj något som är tillräckligt komplext för att behöva visualisering\n\n**2) Identifiera steg (10 min):**\n- **Vad:** I grupper om 4-5, lista alla viktiga steg från början till slut\n- **Exempel:** Vad händer först? Sedan? Vad är slutresultatet?\n- **Tips:** Fokusera på användarens perspektiv\n\n**3) Skapa storyboard (25 min):**\n- **Vad:** Rita enkla bilder (streckgubbar räcker) som visar varje steg\n- **Exempel:** Inkludera: Vem gör vad? Var händer det? Vilka verktyg/resurser behövs?\n- **Tips:** Vad är kritiska beslutspunkter?\n\n**4) Testa berättelsen (15 min):**\n- **Vad:** "Läs" er storyboard för en annan grupp\n- **Exempel:** "Här är vad som händer när en kund..."\n- **Tips:** Är det logiskt? Saknas något?\n\n**5) Förbättra (10 min):**\n- **Vad:** Justera baserat på feedback\n- **Exempel:** "Vi behöver lägga till ett steg för..."\n- **Tips:** Fokusera på användarupplevelsen och praktiska detaljer',
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
    instructions: '**Syfte:** Avslöja relationsmönster som skapar framsteg och värde.\n\n**Genomförande:**\n\n**1) Kartlägg relationer (15 min):**\n- **Vad:** Rita individuellt era viktigaste arbetsrelationer\n- **Exempel:** Använd cirklar för personer och linjer för relationer\n- **Tips:** Tjocka linjer = starka relationer, tunna = svaga\n\n**2) Analysera värde (10 min):**\n- **Vad:** Markera vilka relationer som genererar mest värde/energi (grönt) och vilka som dränerar energi (rött)\n- **Exempel:** "Min relation med Anna ger mig energi eftersom..."\n- **Tips:** Var ärlig om vad som skapar eller dränerar energi\n\n**3) Par-diskussion (15 min):**\n- **Vad:** Dela era kartor\n- **Exempel:** Vad kännetecknar era mest generativa relationer?\n- **Tips:** Vad gör dem så värdefulla?\n\n**4) Grupper om fyra (15 min):**\n- **Vad:** Identifiera gemensamma mönster\n- **Exempel:** Vad skapar ömsesidigt värde?\n- **Tips:** Hur kan ni bygga fler sådana relationer?\n\n**5) Handlingsplan (10 min):**\n- **Vad:** Välj 2-3 konkreta sätt att stärka befintliga relationer eller skapa nya generativa kopplingar\n- **Exempel:** "Jag ska boka regelbundna 1:1-möten med..."\n- **Tips:** Fokusera på små, konkreta åtgärder',
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
    instructions: '**Syfte:** Skapa snabb kontakt och förstå gruppens kollektiva utmaningar.\n\n**Genomförande:**\n\n**1) Förberedelse (1 min):**\n- **Vad:** Alla står upp och rör sig fritt i rummet\n- **Tips:** Skapa öppet utrymme för rörelse\n\n**2) Första runda (5 min):**\n- **Vad:** Hitta någon du inte känner så väl\n- **Exempel:** Presentera er kort och dela: "Vilken utmaning arbetar du med just nu?"\n- **Tips:** Lyssna aktivt på varandra\n\n**3) Andra runda (5 min):**\n- **Vad:** Hitta en ny person\n- **Exempel:** Dela: "Vad hoppas du få ut av dagens session?"\n- **Tips:** Undvik att prata med samma person igen\n\n**4) Tredje runda (5 min):**\n- **Vad:** Hitta en tredje person\n- **Exempel:** Dela: "Vad skulle göra denna session till en framgång för dig?"\n- **Tips:** Var konkret och specifik\n\n**5) Reflektion (4 min):**\n- **Vad:** Sätt er ner och reflektera\n- **Exempel:** "Vad hörde ni för gemensamma teman?"\n- **Tips:** Vilka intressanta kopplingar upptäckte ni?\n\n**Tips:** Detta ger snabbt en känsla för gruppens kollektiva utmaningar och förväntningar.',
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
    instructions: '**Syfte:** Identifiera vad varje person kan göra direkt utan att behöva tillstånd.\n\n**Genomförande:**\n\n**1) Individuell brainstorming (10 min):**\n- **Vad:** Tänk på er utmaning\n- **Exempel:** "Vilka små steg kan jag ta direkt utan att behöva fråga om tillstånd?"\n- **Tips:** Vad ligger inom din direkta kontroll?\n- **Skriv ner:** Alla idéer, även små\n\n**2) Par (8 min):**\n- **Vad:** Dela era listor\n- **Exempel:** Hjälp varandra att identifiera fler 15%-lösningar\n- **Tips:** Utmana varandra: "Vad hindrar dig från att göra det här imorgon?"\n\n**3) Grupper om fyra (12 min):**\n- **Vad:** Kombinera era bästa idéer\n- **Exempel:** Välj de 3-5 mest kraftfulla lösningarna\n- **Tips:** Fokusera på det som kan göra störst skillnad\n\n**4) Helgrupp (10 min):**\n- **Vad:** Varje grupp delar sina bästa lösningar\n- **Exempel:** "Vilka vill ni börja med denna vecka?"\n- **Tips:** Skapa konkreta åtaganden\n\n**Tips:** 15%-lösningar handlar om att agera inom det område du har kontroll över.',
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
    instructions: '**Syfte:** Skapa djupa, meningsfulla samtal genom strukturerad dialog.\n\n**Genomförande:**\n\n**1) Välkommen och check-in (10 min):**\n- **Vad:** Varje person delar kort hur de mår och vad de har med sig in i samtalet\n- **Exempel:** "Jag känner mig lite stressad men nyfiken på vad vi ska diskutera..."\n- **Tips:** Skapa en trygg atmosfär för att alla ska känna sig bekväma\n\n**2) Första samtalsrunda (20 min):**\n- **Vad:** Diskutera den centrala frågan vid era bord\n- **Exempel:** Använd "talking stick" eller liknande - bara den som håller föremålet pratar\n- **Tips:** Lyssna djupt och bygg vidare på varandras tankar\n\n**3) Byt bord (5 min):**\n- **Vad:** Alla utom en "värd" per bord byter till nya bord\n- **Exempel:** Värden stannar och sammanfattar för de nya\n- **Tips:** Se till att alla får nya perspektiv\n\n**4) Andra samtalsrunda (20 min):**\n- **Vad:** Fortsätt samtalet med nya konstellationer\n- **Exempel:** "Nu när vi har nya perspektiv, vad tänker ni om..."\n- **Tips:** Bygg vidare på vad som framkom i första rundan\n\n**5) Avslutning (5 min):**\n- **Vad:** Sammanfatta vad som framkommit och vilka nya insikter ni fått\n- **Exempel:** "Jag tar med mig att..."\n- **Tips:** Fokusera på konkreta lärdomar och nästa steg',
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
    instructions: '**Syfte:** Humanisera ledare och göra deras kunskap mer tillgänglig och relevant.\n\n**Genomförande:**\n\n**1) Förberedelse (10 min):**\n- **Vad:** Gruppen förbereder frågor som avslöjar personliga erfarenheter, misslyckanden, lärdomar och värderingar\n- **Exempel:** "Berätta om en gång när du misslyckades och vad du lärde dig av det?"\n- **Tips:** Undvik ja/nej-frågor - fokusera på berättelser och konkreta exempel\n\n**2) Intervju del 1 (15 min):**\n- **Vad:** En moderator intervjuar "kändisen" med förberedda frågor\n- **Exempel:** "Jag kommer att ställa några frågor om din resa som ledare..."\n- **Tips:** Fokusera på berättelser och konkreta exempel snarare än teorier\n\n**3) Publikfrågor (15 min):**\n- **Vad:** Publiken får ställa spontana frågor\n- **Exempel:** "Jag undrar hur du hanterar stressiga situationer?"\n- **Tips:** Uppmuntra personliga och ärliga frågor\n\n**4) Reflektion (10 min):**\n- **Vad:** Diskutera vad som överraskade er och vilka lärdomar ni tar med er\n- **Exempel:** "Jag insåg att även erfarna ledare känner osäkerhet ibland..."\n- **Tips:** Hur förändrade detta er syn på ledarskap/expertis?',
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
    instructions: '**Syfte:** Förstå det djupare syftet bakom ert arbete genom att fråga varför upprepade gånger.\n\n**Genomförande:**\n\n**1) Starta med målet (2 min):**\n- **Vad:** Formulera tydligt ert mål, projekt eller problem\n- **Exempel:** Vi vill förbättra kundupplevelsen.\n- **Tips:** Skriv ner det tydligt\n\n**2) Första varför (2 min):**\n- **Vad:** Fråga Varför är detta viktigt?\n- **Exempel:** Varför vill vi förbättra kundupplevelsen?\n- **Tips:** Skriv ner svaret under det ursprungliga målet\n\n**3) Fortsätt fråga (16 min):**\n- **Vad:** Fråga Varför? åtta gånger till\n- **Exempel:** Varje gång baserat på det senaste svaret\n- **Tips:** Gå djupare för varje fråga\n- **Om ni kör fast:** Omformulera eller närma er från en annan vinkel\n\n**4) Reflektion (5 min):**\n- **Vad:** Titta på hela kedjan\n- **Exempel:** Vad överraskar er? Vilket varför känns mest kraftfullt?\n- **Tips:** Har ert ursprungliga mål förändrats?\n\n**Tips:** Detta avslöjar djupare motivationer och hjälper gruppen förstå det verkliga syftet.',
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
    instructions: '**Syfte:** Få nya perspektiv på utmaningar genom strukturerad konsultation.\n\n**Genomförande:**\n\n**1) Bilda grupper (2 min):**\n- **Vad:** Bilda grupper om tre personer (A, B, C)\n- **Tips:** Se till att alla förstår rollerna\n\n**2) Första runda - A är klient (20 min):**\n- **A presenterar (5 min):** Var konkret och specifik om utmaningen\n- **B och C diskuterar (10 min):** Prata OM A som om A inte vore där\n- **A reflekterar (5 min):** Vad var mest värdefullt?\n- **Tips:** A får inte svara eller försvara - bara lyssna\n\n**3) Andra runda - B är klient (20 min):**\n- **Vad:** Samma process med B som klient\n- **Tips:** Använd samma struktur\n\n**4) Tredje runda - C är klient (20 min):**\n- **Vad:** Samma process med C som klient\n- **Tips:** Varje person får vara klient en gång\n\n**Tips:** Konsulterna pratar OM klienten, inte TILL klienten. Detta ger nya perspektiv utan att klienten behöver försvara sina val.',
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