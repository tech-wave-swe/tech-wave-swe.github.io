---
id: piano_di_progetto
title: "Piano di Progetto - v2.4.1"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 2.4.1
classification: Esterno
---

<!-- ::: {.no-export} -->

import Term from "@lunaticmuch/docusaurus-terminology/components/tooltip.js";

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                                                            | Autore              | Data Verifica | Verificatore        |
| ---------- | -------- | -------------------------------------------------------------------------------------- | ------------------- | ------------- | ------------------- |
| 07/03/2025 | 2.4.1    | Aggiunta consuntivo sprint 6                                                           | Marcon Giulia       | 07/03/2025    | Monetti Luca        |
| 28/02/2025 | 2.4.0    | Aggiunta diagrammi Gantt                                                               | Piola Andrea        | 28/02/2025    | Marcon Giulia       |
| 28/02/2025 | 2.3.1    | Correzioni grammaticali e sintattiche                                                  | Marcon Giulia       | 28/02/2025    | Piola Andrea        |
| 23/02/2025 | 2.3.0    | Aggiunta preventivo sprint 6                                                           | Marcon Giulia       | 24/02/2025    | Carraro Agnese      |
| 22/02/2025 | 2.2.1    | Aggiunta rendicontazione sprint 5                                                      | Pistori Gaia        | 23/02/2025    | Luca Monetti        |
| 12/02/2025 | 2.2.0    | Refactoring                                                                            | Piola Andrea        | 17/02/2025    | Pistori Gaia        |
| 05/02/2025 | 2.1.1    | Minor fix                                                                              | Piola Andrea        | 17/02/2025    | Pistori Gaia        |
| 26/01/2025 | 2.1.0    | Aggiunta consuntivo sprint 3 e preventivo sprint 4                                     | Dal Bianco Riccardo | 26/01/2025    | Piola Andrea        |
| 10/01/2025 | 2.0.1    | Aggiunta termini Glossario                                                             | Monetti Luca        | 16/01/2025    | Dal Bianco Riccardo |
| 09/01/2025 | 2.0.0    | Ristrutturazione documento, sistemazione consuntivi 1° e 2° Sprint, aggiunta 3° Sprint | Monetti Luca        | 16/01/2025    | Dal Bianco Riccardo |
| 21/12/2024 | 1.3.0    | Integrazione sezione 3, 4, 5 con secondo sprint                                        | Dal Bianco Riccardo | 22/12/2024    | Carraro Agnese      |
| 02/12/2024 | 1.2.0    | Aggiunta sezione 2                                                                     | Piola Andrea        | 04/12/2024    | Pistori Gaia        |
| 27/11/2024 | 1.1.0    | Aggiunta sezione 3 e 4 con primo sprint                                                | Piola Andrea        | 28/11/2024    | Pistori Gaia        |
| 24/11/2024 | 1.0.0    | Prima stesura del documento con indice e sezione 1                                     | Piola Andrea        | 25/11/2024    | Pistori Gaia        |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del Documento

Il Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> è un documento il cui scopo è quello di pianificare in modo preciso lo svolgimento del progetto, cercando di normare tempi e modalità. Più precisamente, nel Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> ci sono sezioni dedicate all'analisi generale dei rischi ed all\'individuazione delle possibili mitigazioni; e sezioni dedicate alla pianificazione dei periodi, individuati come <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, in cui sono indicati i preventivi riguardanti ore/costi ed i consuntivi di ciò che effettivamente è stato svolto. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> andrà aggiornato per seguire l'andamento degli <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">capitolato</Term> **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un <Term popup="Componente software aggiuntivo che estende le funzionalità di un'applicazione principale." reference="/docs/RTB/Termini/Plugin">plugin</Term> per <Term popup="Visual Studio Code. Editor di codice sorgente sviluppato da Microsoft, gratuito, open-source, leggero e con una ampia gamma di estensioni." reference="/docs/RTB/Termini/VSCode">VSCode</Term> che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto Colorato.
- **PDF**: Corsivo con pendice \[G\].

### Riferimenti

Riferimenti normativi:

- <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">Capitolato</Term> d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Norme di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>

> [Norme di Progetto](./Norme%20di%20Progetto.md)

Riferimenti informativi:

- Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

- Corso di Ingegneria del software - Gestione di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T04.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T04.pdf)

## Analisi dei rischi

Questa sezione del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> si occupa di analizzare le difficoltà che potrebbero presentarsi, al fine di prevenire problemi nell'avanzamento o rallentamenti che potrebbero ostacolare le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>. Consapevoli di queste possibilità, si decide di analizzare ciascun <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term>, fornendo una descrizione, un grado di <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term> sull'avvenire dello stesso (da 1 a 5 dove 1 indica molto basso e 5 molto alto), e la pericolosità in modo tabellare, in modo tale da aiutare l’identificazione di ognuno con un monitoraggio facile e continuo. Per facilitare l’identificazione e l’analisi, le categorie indicate sono principalmente due: le difficoltà interpersonali ed organizzative e le difficoltà tecnologiche.
Le <Term popup="Procedura di riduzione dell'impatto negativo di un problema." reference="/docs/RTB/Termini/Mitigazione">mitigazione</Term> di questi rischi si trovano alla fine della sezione.

### Rischi organizzativi ed interpersonali

Di seguito viene riportata la tabella contenente i rischi relativi all'organizzazione e ai rapporti tra i vari membri del gruppo e verso l'esterno.

| Codice  | Rischio                                                      | Descrizione                                                                                                                                                                                                                | Grado di rischio | Pericolosità |
| ------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **RO1** | **Avanzamento lento per mancanza di esperienza**             | Soprattutto durante il primo periodo, i membri del gruppo non sono abituati alla parte organizzativa del progetto; ciò può ovviamente portare a un rallentamento dell'avanzamento dei lavori, che con il tempo si ridurrà. | 5                | Media/Alta   |
| **RO2** | **Ritardi dovuti a problemi individuali**                    | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause di qualsiasi natura, creando rallentamenti nel flusso di lavoro.                        | 2                | Media        |
| **RO3** | **Problemi personali tra membri del gruppo**                 | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause legati a problemi personali con un altro membro, creando rallentamenti nel flusso.      | 1                | Alta         |
| **RO4** | **Ritardi dovuti a problemi di comunicazione con l'azienda** | Il gruppo potrebbe ritrovarsi a dover rallentare il ritmo delle attività a causa della necessità di attendere un feedback dall'azienda, che non viene fornito in tempi brevi.                                              | 2                | Alta         |

Table: Rischi Organizzativi e interpersonali

### Rischi tecnologici

| Codice  | Rischio                             | Descrizione                                                                                                                                 | Grado di rischio | Pericolosità |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **RT1** | **Mancanza di conoscenze tecniche** | Alcuni membri del gruppo potrebbero non aver familiarità con tutte le tecnologie utilizzate durante lo sviluppo o la gestione del progetto. | 4                | Bassa        |

Table: Rischi Tecnologici

### Mitigazione dei rischi organizzativi ed interpersonali

| Codice  | Rischio                                                      | Mitigazione                                                                                                                                                                                                                                                                                     |
| ------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RO1** | **Avanzamento lento per mancanza di esperienza**             | Questo rischio può essere mitigato attraverso la pianificazione di incontri frequenti con l'azienda BlueWind che si è resa disponibile a fornire formazione e supporto. Inoltre, vogliamo scegliere un modello di sviluppo incrementale che si integri con il modello Agile Scrum dell'azienda. |
| **RO2** | **Ritardi dovuti a problemi individuali**                    | Questo rischio può essere mitigato attraverso la comunicazione costante tra i vari membri del gruppo. Questo ci permetterà di individuare difficoltà o ritardi prima che essi possano trasformarsi in problemi.                                                                                 |
| **RO3** | **Problemi personali tra membri del gruppo**                 | Questo rischio può essere mitigato creando un tavolo di confronto tra i membri coinvolti, al fine di risolvere le problematiche emerse. Ci si affida anche al buonsenso dei membri nella cooperazione, per il bene del gruppo.                                                                  |
| **RO4** | **Ritardi dovuti a problemi di comunicazione con l'azienda** | Questo rischio può essere mitigato accordandosi sulla data dell'incontro successivo con l'azienda prima dell'inizio dell'incontro presente.                                                                                                                                                     |

Table: Mitigazione rischi organizzativi ed interpersonali

### Mitigazione dei rischi tecnologici

| Codice  | Rischio                             | Mitigazione                                                                                                                                                                                                               |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RT1** | **Mancanza di conoscenze tecniche** | Questo rischio può essere mitigato attraverso una stretta collaborazione tra i membri del team e l'azienda proponente, mirando alla creazione di un ambiente di collaborazione e condivisione delle conoscenze acquisite. |

Table: Mitigazione rischi tecnologici

## Modello di sviluppo e Pianificazione

### Modello di sviluppo

Il gruppo utilizza un modello Agile basato sul framework <Term popup="Framework agile per la gestione di progetti complessi, suddivisi in iterazioni chiamate sprint per favorire lo sviluppo incrementale." reference="/docs/RTB/Termini/Scrum">Scrum</Term> adottato in maniera semplificata. I macro periodi sono divisi in <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> più piccoli, da due settimane, che permettono rilasci continui così da portare ad un incremento continuo del prodotto. In ogni <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> sono ben chiare le task che i membri dovranno portare a termine contenute nel <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term>; ciò porta ad una facile individuazione dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> già sviluppati e di quelli ancora da sviluppare da parte del team.

I punti di forza di questo modello di sviluppo sono:

- Dare priorità allo sviluppo di funzionalità principali, garantendone la verifica costante anche da parte del proponente.

- Ottima risposta ai cambiamenti, con la possibilità di definizione di categorie che avanzano durante tutta la durata del progetto in maniera collaborativa e adattabile.

- I test e la verifica sono più semplici, in quanto fanno riferimento alle attività svolte durante lo specifico <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.

Le documentazioni prodotte nelle fasi di sviluppo saranno aggiornate procedendo con lo sviluppo stesso, in modo da inserire e/o modificare le informazioni presenti.

### Pianificazione

Per definire al meglio la pianificazione degli eventi, vengono individuate tre fasi ciascuna con una specifica revisione al completamento:

- <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term> (Requirements and Technology Baseline)

- PB (Product Baseline)

- CA (Customer Acceptance)

### Sprint

In questa sezione sono elencati gli sprint appartenenti ai vari periodi di lavori suddivisi per le milestone del progetto didattico. Ogni milestone è divisa in più sprint seguendo le norme legate alla metodologia di lavoro Agile, con riferimento al modello Scrum. Sono inoltre analizzate le variazione delle ore e dei costi preventivati rispetto a quelli effettivamente impiegati al completamento delle varie attività svolte, per capirne l'andamento e valutare se le previsioni fatte siano poi congruenti con la realtà.

#### Preventivo Candidatura

Durante la fase di candidatura il seguente preventivo realizzato riporta la ripartizione oraria per i vari ruoli con costi annessi:

| Ruolo          | Costo | Ore previste | Totale     |
| -------------- | ----- | ------------ | ---------- |
| Responsabile   | 30€   | 75           | 2250€      |
| Amministratore | 20€   | 85           | 1700€      |
| Analista       | 25€   | 90           | 2250€      |
| Progettista    | 25€   | 90           | 2250€      |
| Programmatore  | 15€   | 170          | 2550€      |
| Verificatore   | 15€   | 120          | 1800€      |
| **Totale**     |       |              | **12800€** |

#### Struttura degli sprint

Nella propria sezione dedicata ogni sprint è descritto seguendo la seguente struttura:

- Periodo: data di inizio e di fine sprint;
- Pianificazione: descrive gli obiettivi dello sprint, le attività da svolgere e le motivazioni a queste;
- Ruoli: definisce i ruoli occupati dai membri durante il periodo;
- Preventivo: tabella che contiene le ore ed i costi preventivati per ciascun ruolo;
- Retrospettiva: analizza le difficoltà incontrate durante lo sprint;
- Conclusione: riassume i risultati ottenuti e le decisioni di miglioramento prese;
- Consuntivo: tabella che contiene le ore ed i costi a consuntivo per ciascun ruolo;
- Gantt: diagramma che mostra le attività svolte durante lo sprint con i giorni impiegati per lo svolgimento delle stesse;

#### Verso la RTB

Alla fine della la fase di candidatura con aggiudicazione del capitolato, il gruppo ha ritenuto opportuno sfruttare il tempo compreso tra l'assegnazione del capitolato e la prima riunione con il proponente per cominciare a prendere dimestichezza con la stesura dei documento di progetto e la familiarizzazione con i diversi ruoli del team per poter poi avviare più rapidamente il primo sprint.

##### Sprint 1

- Periodo: 18/11/2024 - 05/12/2024

###### Pianificazione

In questo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> l'obiettivo principale è quello di organizzare e configurare al meglio gli strumenti di lavoro, come <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> e <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>, che saranno utilizzati dal team durante l'intero ciclo di sviluppo del progetto. Parallelamente è stata avviata la redazione della documentazione quale: Norme di progetto, Piano di Progetto, Glossario e Piano di Qualifica.

A seguito della prima riunione svolta con l'azienda proponente, buona parte delle attività del team è stata dedicata allo studio delle tecnologie concordate, al fine di acquisire familiarità con le stesse. La durata dello Sprint, prevista inizialmente di due settimane, è stata estesa a causa del posticipo della riunione con l'azienda.

Durante il tempo aggiuntivo, il team ha deciso di sfruttare l'opportunità per avviare la redazione dell'Analisi dei Requisiti attraverso la definizione degli use case.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                        |
| ------------------------- | --------------------------------- |
| Responsabile di progetto  | Piola Andrea                      |
| Analista                  | Pistori Gaia, Dal Bianco Riccardo |
| Progettista               | Manuel Felipe Vasquez             |
| Amministratore di sistema | Carraro Agnese                    |
| Programmatore             | Monetti Luca                      |
| Verificatore              | Marcon Giulia                     |

Table: Suddivisione ruoli Sprint 1

###### Preventivo

A seguito si riporta la tabella del preventivo per il primo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 5,5            | 165       |
| Analista                  | 12,75          | 318,75    |
| Progettista               | 4              | 100       |
| Amministratore di sistema | 5,75           | 115       |
| Programmatore             | 4              | 60        |
| Verificatore              | 4,75           | 71,25     |
| _Totale_                  | _36,75_        | _830_     |
| _Bilancio_                |                | _11.970_  |

Table: Preventivo Sprint 1

###### Consuntivo

Di seguito vengono indicate le spese effettive del primo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 6                    | +0,5          | 30               | 120       | -15             |
| Analista                  | 12                   | -0,75         | 25               | 300       | -78,75          |
| Progettista               | 3,5                  | -0,5          | 25               | 87,5      | -12,5           |
| Amministratore di sistema | 5,41                 | -0,33         | 20               | 108,2     | -6,8            |
| Programmatore             | 0,33                 | -3,66         | 15               | 4,95      | -55,05          |
| Verificatore              | 4                    | -0,75         | 15               | 60        | -11,25          |
| _Totale consuntivo_       | _31,24_              | _-5,5_        |                  | _680,65_  | -149,35         |

Table: Consuntivo Sprint 1

Considerando il costo di **680,65€** il residuo disponibile ammonta a **12.119,35€**.

###### Retrospettiva

Il primo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha evidenziato una complessità inferiore rispetto alle aspettative iniziali. Tuttavia, tali variazioni sono in linea con i principi di <Term popup="Framework agile per la gestione di progetti complessi, suddivisi in iterazioni chiamate sprint per favorire lo sviluppo incrementale." reference="/docs/RTB/Termini/Scrum">Scrum</Term>, dove gli aggiustamenti iniziali sono necessari e rappresentano un'opportunità per affinare la capacità di stima nei prossimi <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.

La principale variazione si è registrata sui ruoli di Programmatore (-6,66 ore) dove sono state inizialmente sovrastimate rispetto alle effettive necessità operative.
Anche gli altri ruoli hanno registrato una diminuzione, sebbene più contenuta.

###### Conclusione

In conclusione, il primo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha permesso di identificare aree critiche nella pianificazione iniziale, evidenziando l'importanza di una maggiore attenzione alle attività di analisi e coordinamento in queste fasi iniziali. Queste osservazioni costituiscono un'importante base di apprendimento per ottimizzare la stima iniziale nei prossimi <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, garantendo una gestione più efficiente delle risorse e una migliore aderenza al piano progettuale.

###### Gantt

<img src="/img/Gantt/Sprint1.png" alt="Diagramma Gantt sprint 1" data-width="70%" />

##### Sprint 2

- Periodo 06/12/2024 - 19/12/2024

###### Pianificazione

In questo periodo, il gruppo si concentrerà su attività fondamentali per proseguire lo sviluppo e l'avvicinamento al <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term>. In primo luogo, verrà dato seguito alla scrittura della documentazione avviata in precedenza, con particolare attenzione all'aggiornamento e al completamento delle Norme di Progetto, del Piano di Progetto, del Glossario e del Piano di Qualifica.

Parallelamente, si continuerà l'analisi delle tecnologie già avviata nel periodo precedente. A questa analisi saranno integrate nuove tecnologie emerse durante le recenti riunioni, con l'obiettivo di valutarne l'efficacia e l'applicabilità alle esigenze del progetto. Il gruppo, inoltre procederà nella stesura del diagramma use case.
Una parte del tempo sarà dedicata ad attività di ricerca focalizzate su questioni architetturali, con l'obiettivo di individuare soluzioni tecniche preliminari che garantiscano un'architettura modulare e scalabile. Questo lavoro iniziale consentirà di orientare le decisioni progettuali, valutando le possibili alternative e ponendo le basi per lo sviluppo del sistema.

Infine, verrà avviata la prima fase di sviluppo del <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term>, con l'obiettivo di creare una struttura di base per lo sviluppo dell'estensione.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                          |
| ------------------------- | ----------------------------------- |
| Responsabile di progetto  | Dal Bianco Riccardo                 |
| Analista                  | Piola Andrea, Pistori Gaia          |
| Progettista               |                                     |
| Amministratore di sistema | Marcon Giulia                       |
| Programmatore             | Monetti Luca, Manuel Felipe Vasquez |
| Verificatore              | Carraro Agnese                      |

Table: Suddivisione ruoli Sprint 2

###### Preventivo

A seguito si riporta la tabella del preventivo per il secondo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€)   |
| ------------------------- | -------------- | ----------- |
| Responsabile di progetto  | 2              | 60          |
| Analista                  | 21             | 525         |
| Progettista               | 0              | 0           |
| Amministratore di sistema | 17,5           | 350         |
| Programmatore             | 5              | 75          |
| Verificatore              | 9,5            | 142,5       |
| _Totale_                  | _55_           | _1.152,5_   |
| _Bilancio_                |                | _10.966,85_ |

Table: Preventivo Sprint 2

###### Consuntivo

Di seguito vengono indicate le spese effettive del secondo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 1                    | -1            | 30               | 30        | -30             |
| Analista                  | 10,83                | -10,17        | 25               | 270,75    | -254,25         |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 11,33                | -6,17         | 20               | 226,6     | -123,4          |
| Programmatore             | 9                    | +4            | 15               | 135       | +60             |
| Verificatore              | 3,5                  | -6            | 15               | 52,5      | -90             |
| _Totale consuntivo_       | _35,66_              | _-19,34_      |                  | _714,85_  | _-437,65_       |

Table: Consuntivo Sprint 2

Considerando il costo di **714,85€** il residuo disponibile ammonta a **11.404,50€**.

###### Retrospettiva

Il secondo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha evidenziato un peggioramento significativo nella gestione delle risorse e una minore aderenza al piano progettuale, in particolare per quanto riguarda il numero di task completate rispetto a quelle previste.

Il ruolo del Programmatore è stato sottostimato, infatti ha richiesto più tempo (+4 ore).
Tutti gli altri ruoli hanno dei valori effettivi inferiori a quelli previsti non per l'ottimizzazione dei tempi ma a causa di ritardi e task non concluse. La principale variazione si è registrata sui ruoli di Analista (-10 ore).

###### Conclusione

In conclusione, il secondo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha mostrato un peggioramento nella gestione delle attività e un minor allineamento rispetto al preventivo iniziale.

###### Gantt

<img src="/img/Gantt/Sprint2.png" alt="Diagramma Gantt sprint 2" data-width="70%" />

##### Sprint 3

- Periodo 20/12/2024 - 12/01/2025

###### Pianificazione

In questo periodo, caratterizzato dalla presenza di festività e da una conseguente riduzione del tempo operativo disponibile, il team si dedicherà principalmente alle attività di documentazione concentrandosi su: Norme di Progetto e Analisi dei Requisiti.
Questo permetterà di implementare i consigli forniti dall'azienda proponente e dal Prof. Cardin nei rispettivi incontri, migliorando così la qualità della documentazione.

In parallelo, il team continuerà lo sviluppo di alcune funzionalità richieste dall'azienda per il <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term>, con l'obiettivo di garantire il rispetto delle tempistiche e dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> concordati.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                           |
| ------------------------- | ------------------------------------ |
| Responsabile di progetto  | Monetti Luca                         |
| Analista                  | Piola Andrea, Dal Bianco Riccardo    |
| Progettista               |                                      |
| Amministratore di sistema | Carraro Agnese                       |
| Programmatore             | Marcon Giulia, Manuel Felipe Vasquez |
| Verificatore              | Pistori Gaia                         |

Table: Suddivisione ruoli Sprint 3

###### Preventivo

A seguito si riporta la tabella del preventivo per il terzo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€)  |
| ------------------------- | -------------- | ---------- |
| Responsabile di progetto  | 2              | 60         |
| Analista                  | 19,5           | 487,5      |
| Progettista               | 0              | 0          |
| Amministratore di sistema | 2              | 40         |
| Programmatore             | 6              | 90         |
| Verificatore              | 3,5            | 52,5       |
| _Totale_                  | _33_           | _730_      |
| _Bilancio_                |                | _10.674,5_ |

Table: Preventivo Sprint 3

###### Consuntivo

Di seguito vengono indicate le spese effettive del terzo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 1                    | -1            | 30               | 30        | -30             |
| Analista                  | 10                   | -9,5          | 25               | 250       | -237,5          |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 3,83                 | +1,83         | 20               | 76,6      | +36,6           |
| Programmatore             | 0                    | -6            | 15               | 0         | -90             |
| Verificatore              | 3,58                 | +0,08         | 15               | 53,7      | +1,2            |
| _Totale consuntivo_       | _18,41_              | _-14,59_      |                  | _410,3_   | _-319,7_        |

Table: Consuntivo Sprint 3

Considerando il costo di **410,3€** il residuo disponibile ammonta a **10.994,2€**.

###### Retrospettiva

Il terzo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, svolto durante il periodo delle vacanze natalizie, ha risentito della disponibilità limitata delle risorse, ma ha comunque permesso di registrare progressi verso gli obiettivi prefissati.

La principale variazione si è osservata nel ruolo di Amministratore (+2 ore), a causa di una sottostima del tempo necessario per implementare le modifiche . Al contrario, il ruolo di Analista (-0,5 ore) e di Programmatore (-6 ore) hanno registrato un impiego inferiore rispetto alle previsioni.

###### Conclusione

In conclusione, lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha evidenziato alcune variazioni rispetto ai tempi stimati, ma ha comunque permesso un avanzamento significativo nelle attività prioritarie.

###### Gantt

<img src="/img/Gantt/Sprint3.png" alt="Diagramma Gantt sprint 3" data-width="70%" />

##### Sprint 4

- Periodo 13/01/2025 - 30/01/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento quasi definitivo della documentazione, con particolare attenzione all'analisi dei requisiti e al piano di qualifica.
Parallelamente, apporteremo gli ultimi ritocchi al <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term>, integrando i feedback ricevuti dall'azienda durante la riunione.

L'obiettivo principale è avvicinarsi in modo significativo alla conclusione della <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term>, garantendo un avanzamento concreto del lavoro.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                 |
| ------------------------- | ------------------------------------------ |
| Responsabile di progetto  | Dal Bianco Riccardo                        |
| Analista                  | Carraro Agnese, Piola Andrea, Pistori Gaia |
| Progettista               |                                            |
| Amministratore di sistema | Marcon Giulia                              |
| Programmatore             | Manuel Felipe Vasquez                      |
| Verificatore              | Piola Andrea, Monetti Luca                 |

Table: Suddivisione ruoli Sprint 4

###### Preventivo

A seguito si riporta la tabella del preventivo per il quarto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€)   |
| ------------------------- | -------------- | ----------- |
| Responsabile di progetto  | 3              | 90          |
| Analista                  | 12             | 300         |
| Progettista               | 0              | 0           |
| Amministratore di sistema | 14,75          | 295         |
| Programmatore             | 0              | 0           |
| Verificatore              | 4,75           | 71,25       |
| _Totale_                  | _34,5_         | _756,25_    |
| _Bilancio_                |                | _10.237,95_ |

Table: Preventivo Sprint 4

###### Consuntivo

Di seguito vengono indicate le spese effettive del quarto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 2,5                  | -0,5          | 30               | 75        | -15             |
| Analista                  | 13                   | +1            | 25               | 325       | +25             |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 7,58                 | -7,17         | 20               | 151,6     | -143,4          |
| Programmatore             | 7                    | +7            | 15               | 105       | +105            |
| Verificatore              | 3,83                 | -0,92         | 15               | 57,45     | -13,8           |
| _Totale consuntivo_       | _33,91_              | _-0,59_       |                  | _714,05_  | _-42,2_         |

Table: Consuntivo Sprint 4

Considerando il costo di **714,05** il residuo disponibile ammonta a **10.280,15€**.

###### Retrospettiva

Il quarto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, svolto durante il periodo della sessione, ha risentito della disponibilità limitata delle risorse, ma ha comunque permesso di registrare progressi verso gli obiettivi prefissati e di recuperare alcune task tralasciate precedentemente.

La principale variazione si è osservata nel ruolo di Programmatore (+2 ore), a causa di una sottostima del tempo necessario per implementare le modifiche utili alla consegna della <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term>. Al contrario, il ruolo di Amministratore (-7 ore) ha registrato un impiego inferiore rispetto alle previsioni.

###### Conclusione

In conclusione, lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha evidenziato alcune variazioni nei tempi stimati, ma ha consentito un avanzamento concreto nelle attività prioritarie.

###### Gantt

<img src="/img/Gantt/Sprint4.png" alt="Diagramma Gantt sprint 4" data-width="70%" />

##### Sprint 5

- Periodo 31/01/2025 - 14/02/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento della documentazione e sul recuperare tutte le task ancora incomplete.
Parallelamente, apporteremo gli ultimi ritocchi alle metriche.

L'obiettivo principale è richiedere la revisione della <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term>.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                 |
| ------------------------- | ------------------------------------------ |
| Responsabile di progetto  | Pistori Gaia                               |
| Analista                  | Marcon Giulia                              |
| Progettista               |                                            |
| Amministratore di sistema | Carraro Agnese, Monetti Luca               |
| Programmatore             | Manuel Felipe Vasquez, Dal Bianco Riccardo |
| Verificatore              | Piola Andrea                               |

Table: Suddivisione ruoli Sprint 5

###### Preventivo

A seguito si riporta la tabella del preventivo per il quinto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€)  |
| ------------------------- | -------------- | ---------- |
| Responsabile di progetto  | 1              | 30         |
| Analista                  | 15             | 375        |
| Progettista               | 0              | 0          |
| Amministratore di sistema | 22             | 440        |
| Programmatore             | 0              | 0          |
| Verificatore              | 4              | 60         |
| _Totale_                  | _42_           | _905_      |
| _Bilancio_                |                | _9.375,15_ |

Table: Preventivo Sprint 5

###### Consuntivo

Di seguito vengono indicate le spese effettive del quinto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 1                    | 0             | 30               | 30        | 0               |
| Analista                  | 16,5                 | +1,5          | 25               | 412,5     | +37,5           |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 23,41                | +1,41         | 20               | 468,2     | +28,2           |
| Programmatore             | 0                    | 0             | 15               | 0         | 0               |
| Verificatore              | 4,4                  | +0,4          | 15               | 66        | +6              |
| _Totale consuntivo_       | _45,31_              | _+3,31_       |                  | _976,7_   | _+71,7_         |

Table: Consuntivo Sprint 5

Considerando il costo di **976,7** il residuo disponibile ammonta a **9.303,45€**.

###### Retrospettiva

Il quinto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, nonostante sia stato svolto durante il periodo della sessione, ha registrato forti progressi e ha permesso di riallinearsi con quanto stabilito. Infatti la maggioranza delle task svolte erano rimaste incomplete degli <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> precedenti.

Tutti i ruoli hanno rispettato le tempistiche preventivate.

###### Conclusione

In conclusione, lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha evidenziato alcune variazioni rispetto ai tempi stimati, ma ha comunque permesso di raggiungere tutti gli obiettivi prefissati, recuperando anche quanto lasciato nel backlog.

###### Gantt

<img src="/img/Gantt/Sprint5.png" alt="Diagramma Gantt sprint 5" data-width="70%" />

##### Sprint 6

- Periodo 10/02/2025 - 02/03/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sulla preparazione finale per la <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term>, con particolare attenzione alla presentazione del Proof of Concept (<Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term>) e al completamento della documentazione. Saranno svolte <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> della documentazione, con l'obiettivo di garantire che tutti i materiali siano pronti per la revisione.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                   |
| ------------------------- | ---------------------------- |
| Responsabile di progetto  | Marcon Giulia                |
| Analista                  | Manuel Felipe Vasquez        |
| Progettista               |                              |
| Amministratore di sistema | Pistori Gaia, Piola Andrea   |
| Programmatore             | Carraro Agnese, Monetti Luca |
| Verificatore              | Dal Bianco Riccardo          |

Table: Suddivisione ruoli Sprint 6

###### Preventivo

A seguito si riporta la tabella del preventivo per il sesto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Ore svolte (h) | Costo (€)  |
| ------------------------- | -------------- | ---------- |
| Responsabile di progetto  | 2,5            | 75         |
| Analista                  | 12,5           | 312,5      |
| Progettista               | 0              | 0          |
| Amministratore di sistema | 11,5           | 230        |
| Programmatore             | 1              | 15         |
| Verificatore              | 6              | 90         |
| _Totale_                  | _33,5_         | _722,5_    |
| _Bilancio_                |                | _8.580,95_ |

Table: Preventivo Sprint 6

###### Consuntivo

Di seguito vengono indicate le spese effettive del sesto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 2,75                 | +0,25         | 30               | 82,5      | 7,5             |
| Analista                  | 2,75                 | -9,75         | 25               | 68,75     | -243,75         |
| Progettista               | 1,42                 | +1,42         | 25               | 35,5      | 35,5            |
| Amministratore di sistema | 10,42                | -1,08         | 20               | 208,4     | -21,6           |
| Programmatore             | 1                    | 0             | 15               | 15        | 0               |
| Verificatore              | 3,58                 | -2,42         | 15               | 53,7      | -36,3           |
| _Totale consuntivo_       | _21,92_              | _-11,58_      |                  | _463,85_  | _-258,65_       |

Table: Consuntivo Sprint 6

Considerando il costo di **463,85** il residuo disponibile ammonta a **8.839,60€**.

###### Retrospettiva

Il sesto <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha visto un avanzamento significativo verso la preparazione della <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term>, con particolare attenzione alla presentazione del <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term> e al completamento della documentazione. Tuttavia, alcune <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> pianificate per il ruolo di Analista non sono state completate a causa di priorità riassegnate e sono state rimesse nel <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> per lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> successivo. Questo ha portato a una riduzione delle ore effettive rispetto al <Term popup="Documento in cui si trovano le stime del costo di determinate attività." reference="/docs/RTB/Termini/Preventivo">preventivo</Term> per quel ruolo.

La principale variazione si è osservata nel ruolo di Analista (-9,75 ore), dove alcuni ticket non sono stati affrontati e sono stati riprogrammati per lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> successivo. Al contrario, il ruolo di Progettista (+1,42 ore) ha registrato un leggero aumento delle ore, dovuto alla necessità di ulteriori rifiniture tecniche.

###### Conclusione

In conclusione, lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> ha permesso di raggiungere gli obiettivi principali, con un buon livello di aderenza al <Term popup="Documento in cui si trovano le stime del costo di determinate attività." reference="/docs/RTB/Termini/Preventivo">preventivo</Term> iniziale. Le variazioni osservate sono state gestite in modo efficace, garantendo il rispetto delle tempistiche e la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del lavoro svolto. I ticket non completati dal ruolo di Analista sono stati riassegnati al <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> per essere affrontati nello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> successivo, mantenendo così una gestione flessibile e adattabile delle <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>.

###### Gantt

<img src="/img/Gantt/Sprint6.png" alt="Diagramma Gantt sprint 6" data-width="70%" />

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
