---
id: piano_di_progetto
title: "Piano di progetto - v2.5.0"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
toc-depth: 4
version: 2.5.0
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del piano di progetto

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                               | Autore                | Data Verifica | Verificatore          |
| ---------- | -------- | ----------------------------------------- | --------------------- | ------------- | --------------------- |
| 24/04/2025 | 2.5.0    | Report finali                             | Monetti Luca          | 24/04/2025    | Carraro Agnese        |
| 24/04/2025 | 2.4.11   | Aggiunta consuntivo sprint 10             | Monetti Luca          | 24/04/2025    | Carraro Agnese        |
| 22/04/2025 | 2.4.10   | Aggiunta preventivo sprint 10             | Monetti Luca          | 23/04/2025    | Carraro Agnese        |
| 22/04/2025 | 2.4.9    | Aggiunta consuntivo sprint 9              | Pistori Gaia          | 22/04/2025    | Monetti Luca          |
| 12/04/2025 | 2.4.8    | Aggiunta preventivo sprint 9              | Pistori Gaia          | 13/04/2025    | Monetti Luca          |
| 10/04/2025 | 2.4.7    | Aggiornamento sezioni rischi negli sprint | Dal Bianco Riccardo   | 11/04/2025    | Pistori Gaia          |
| 31/03/2025 | 2.4.6    | Aggiunta consuntivo sprint 8              | Carraro Agnese        | 31/03/2025    | Marcon Giulia         |
| 30/03/2025 | 2.4.5    | Controllo consistenza maiuscole           | Dal Bianco Riccardo   | 30/03/2025    | Vasquez Manuel Felipe |
| 17/03/2025 | 2.4.4    | Aggiunta preventivo sprint 8              | Carraro Agnese        | 18/03/2025    | Marcon Giulia         |
| 17/03/2025 | 2.4.3    | Aggiunta consuntivo sprint 7              | Vasquez Manuel Felipe | 14/03/2025    | Pistori Gaia          |
| 10/03/2025 | 2.4.2    | Aggiunta preventivo sprint 7              | Vasquez Manuel Felipe | 14/03/2025    | Monetti Luca          |
| 07/03/2025 | 2.4.1    | Aggiunta consuntivo sprint 6              | Marcon Giulia         | 07/03/2025    | Monetti Luca          |

Table: Changelog prima parte

| Data       | Versione | Descrizione                                                                            | Autore              | Data Verifica | Verificatore        |
| ---------- | -------- | -------------------------------------------------------------------------------------- | ------------------- | ------------- | ------------------- |
| 28/02/2025 | 2.4.0    | Aggiunta diagrammi Gantt                                                               | Piola Andrea        | 28/02/2025    | Marcon Giulia       |
| 28/02/2025 | 2.3.1    | Correzioni grammaticali e sintattiche                                                  | Marcon Giulia       | 28/02/2025    | Piola Andrea        |
| 23/02/2025 | 2.3.0    | Aggiunta preventivo sprint 6                                                           | Marcon Giulia       | 24/02/2025    | Carraro Agnese      |
| 22/02/2025 | 2.2.1    | Aggiunta rendicontazione sprint 5                                                      | Pistori Gaia        | 23/02/2025    | Monetti Luca        |
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

### Scopo del documento

Il Piano di %%Progetto|progetto%% è un documento il cui scopo è quello di pianificare in modo preciso lo svolgimento del progetto, cercando di normare tempi e modalità. Più precisamente, nel Piano di %%Progetto|progetto%% ci sono sezioni dedicate all'analisi generale dei rischi ed all\'individuazione delle possibili mitigazioni; e sezioni dedicate alla pianificazione dei periodi, individuati come %%sprint|sprint%%, in cui sono indicati i preventivi riguardanti ore/costi ed i consuntivi di ciò che effettivamente è stato svolto. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del %%progetto|progetto%% andrà aggiornato per seguire l'andamento degli %%sprint|sprint%%.

### Scopo del prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto Colorato.
- **PDF**: Corsivo con pendice \[G\].

### Riferimenti

Riferimenti normativi:

- %%Capitolato|capitolato%% d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Norme di %%progetto|progetto%%

> [Norme di Progetto](./Norme%20di%20Progetto.md)

Riferimenti informativi:

- Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

- Corso di Ingegneria del software - Gestione di %%progetto|progetto%%

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T04.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T04.pdf)

## Analisi dei rischi

Questa sezione del Piano di %%Progetto|progetto%% si occupa di analizzare le difficoltà che potrebbero presentarsi, al fine di prevenire problemi nell'avanzamento o rallentamenti che potrebbero ostacolare le %%attività|attività%%. Consapevoli di queste possibilità, si decide di analizzare ciascun %%rischio|rischio%%, fornendo una descrizione, un grado di %%rischio|rischio%% sull'avvenire dello stesso (da 1 a 5 dove 1 indica molto basso e 5 molto alto), e la pericolosità in modo tabellare, in modo tale da aiutare l’identificazione di ognuno con un monitoraggio facile e continuo. Per facilitare l’identificazione e l’analisi, le categorie indicate sono principalmente due: le difficoltà interpersonali ed organizzative e le difficoltà tecnologiche.
Le %%mitigazione|mitigazione%% di questi rischi si trovano alla fine della sezione.

### Rischi organizzativi ed interpersonali

Di seguito viene riportata la tabella contenente i rischi relativi all'organizzazione e ai rapporti tra i vari membri del gruppo e verso l'esterno.

| Codice  | Rischio                                                                            | Descrizione                                                                                                                                                                                                                | Grado di rischio | Pericolosità |
| ------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **RO1** | **Avanzamento lento per mancanza di esperienza**                                   | Soprattutto durante il primo periodo, i membri del gruppo non sono abituati alla parte organizzativa del progetto; ciò può ovviamente portare a un rallentamento dell'avanzamento dei lavori, che con il tempo si ridurrà. | 5                | Media/Alta   |
| **RO2** | **Ritardi dovuti a problemi individuali**                                          | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause di qualsiasi natura, creando rallentamenti nel flusso di lavoro.                        | 2                | Media        |
| **RO3** | **Problemi personali tra membri del gruppo**                                       | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause legate a problemi personali con un altro membro, creando rallentamenti nel flusso.      | 1                | Alta         |
| **RO4** | **Ritardi dovuti a problemi di comunicazione con l'azienda**                       | Il gruppo potrebbe ritrovarsi a dover rallentare il ritmo delle attività a causa della necessità di attendere un feedback dall'azienda, che non viene fornito in tempi brevi.                                              | 2                | Alta         |
| **RO5** | **Rischio derivato dalla sottostima delle attività**                               | Lo svolgimento di un'attività da parte di uno o più componenti nel gruppo potrebbe richiedere più tempo del previsto.                                                                                                      | 4                | Alta         |
| **RO6** | **Rischio derivato dalla difficoltà nella scrittura della documentazione tecnica** | Difficoltà iniziale nella scrittura di documenti tecnici, in quanto può risultare difficile redigere un documento completo e chiaro.                                                                                       | 2                | Bassa        |

Table: Rischi organizzativi e interpersonali

### Rischi tecnologici

| Codice  | Rischio                                                | Descrizione                                                                                                                                                                                                                                           | Grado di rischio | Pericolosità |
| ------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **RT1** | **Mancanza di conoscenze tecniche**                    | Alcuni membri del gruppo potrebbero non aver familiarità con tutte le tecnologie utilizzate durante lo sviluppo o la gestione del progetto.                                                                                                           | 4                | Bassa        |
| **RT2** | **Apprendimento e utilizzo di nuove tecnologie**       | L’apprendimento e l’applicazione delle tecnologie individuate possono costituire un rischio significativo per l’avanzamento del progetto, poiché è possibile che l’approfondimento necessario richieda tempi superiori a quelli inizialmente stimati. | 3                | Media        |
| **RT3** | **Mancanza di esperienza con Jest per i test unitari** | Alcuni membri del team non hanno mai utilizzato il framework Jest per scrivere test unitari in ambiente TypeScript, il che può portare a ritardi o test poco efficaci.                                                                                | 3                | Media        |

Table: Rischi tecnologici

### Mitigazione dei rischi organizzativi ed interpersonali

| Codice  | Rischio                                                                            | Mitigazione                                                                                                                                                                                                                                                                                                                                                           |
| ------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RO1** | **Avanzamento lento per mancanza di esperienza**                                   | Questo rischio può essere mitigato attraverso la pianificazione di incontri frequenti con l'azienda BlueWind che si è resa disponibile a fornire formazione e supporto. Inoltre, vogliamo scegliere un modello di sviluppo incrementale che si integri con il modello Agile Scrum dell'azienda.                                                                       |
| **RO2** | **Ritardi dovuti a problemi individuali**                                          | Questo rischio può essere mitigato attraverso la comunicazione costante tra i vari membri del gruppo. Questo ci permetterà di individuare difficoltà o ritardi prima che essi possano trasformarsi in problemi.                                                                                                                                                       |
| **RO3** | **Problemi personali tra membri del gruppo**                                       | Questo rischio può essere mitigato creando un tavolo di confronto tra i membri coinvolti, al fine di risolvere le problematiche emerse. Ci si affida anche al buonsenso dei membri nella cooperazione, per il bene del gruppo.                                                                                                                                        |
| **RO4** | **Ritardi dovuti a problemi di comunicazione con l'azienda**                       | Questo rischio può essere mitigato accordandosi sulla data dell'incontro successivo con l'azienda prima dell'inizio dell'incontro presente.                                                                                                                                                                                                                           |
| **RO5** | **Rischio derivato dalla sottostima delle attività**                               | Per mitigare questo rischio, il progetto prevede una pianificazione flessibile con margini temporali per le attività più incerte. Inoltre, si favorisce una distribuzione bilanciata dei compiti e un monitoraggio costante dell’avanzamento, in modo da poter intervenire tempestivamente con eventuali riassegnazioni o supporto da parte di altri membri del team. |
| **RO6** | **Rischio derivato dalla difficoltà nella scrittura della documentazione tecnica** | Per mitigare questo rischio, la documentazione è stata redatta progressivamente durante lo sviluppo da più membri del team. Questo approccio collaborativo ha permesso un confronto continuo, facilitando la stesura di un documento più chiaro, coerente e comprensibile.                                                                                            |

Table: Mitigazione rischi organizzativi ed interpersonali

### Mitigazione dei rischi tecnologici

| Codice  | Rischio                                                | Mitigazione                                                                                                                                                                                                                                                                                                                                             |
| ------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RT1** | **Mancanza di conoscenze tecniche**                    | Questo rischio può essere mitigato attraverso una stretta collaborazione tra i membri del team e l'azienda proponente, mirando alla creazione di un ambiente di collaborazione e condivisione delle conoscenze acquisite.                                                                                                                               |
| **RT2** | **Apprendimento ed utilizzo di nuove tecnologie**      | Per mitigare questo rischio, si prevede una fase iniziale di studio strutturato delle tecnologie. Inoltre, verranno utilizzate risorse già disponibili come documentazione ufficiale, tutorial e casi d’uso, e sarà favorito il confronto continuo all’interno del team per condividere conoscenze e risolvere eventuali difficoltà in modo tempestivo. |
| **RT3** | **Mancanza di esperienza con Jest per i test unitari** | Per mitigare questo rischio, i membri più esperti hanno spiegato nel dettaglio il funzionamento di Jest agli altri componenti del team. Sono state svolte sessioni di test in gruppo, durante le quali chi aveva dubbi poteva ricevere supporto diretto, favorendo un apprendimento pratico e collaborativo.                                            |

Table: Mitigazione rischi tecnologici

## Modello di sviluppo e pianificazione

### Modello di sviluppo

Il gruppo utilizza un modello Agile basato sul framework %%Scrum|scrum%% adottato in maniera semplificata. I macro periodi sono divisi in %%sprint|sprint%% più piccoli, da due settimane, che permettono rilasci continui così da portare ad un incremento continuo del prodotto. In ogni %%sprint|sprint%% sono ben chiare le task che i membri dovranno portare a termine contenute nel %%backlog|backlog%%; ciò porta ad una facile individuazione dei %%requisiti|requisito_software%% già sviluppati e di quelli ancora da sviluppare da parte del team.

I punti di forza di questo modello di sviluppo sono:

- Dare priorità allo sviluppo di funzionalità principali, garantendone la verifica costante anche da parte del proponente.

- Ottima risposta ai cambiamenti, con la possibilità di definizione di categorie che avanzano durante tutta la durata del progetto in maniera collaborativa e adattabile.

- I test e la verifica sono più semplici, in quanto fanno riferimento alle attività svolte durante lo specifico %%sprint|sprint%%.

Le documentazioni prodotte nelle fasi di sviluppo saranno aggiornate procedendo con lo sviluppo stesso, in modo da inserire e/o modificare le informazioni presenti.

### Pianificazione

Per definire al meglio la pianificazione degli eventi, vengono individuate tre fasi ciascuna con una specifica revisione al completamento:

- %%RTB|rtb%% (Requirements and Technology Baseline)

- PB (Product Baseline)

- CA (Customer Acceptance)

### Sprint

In questa sezione sono elencati gli sprint appartenenti ai vari periodi di lavori suddivisi per le milestone del progetto didattico. Ogni milestone è divisa in più sprint seguendo le norme legate alla metodologia di lavoro Agile, con riferimento al modello Scrum. Sono inoltre analizzate le variazione delle ore e dei costi preventivati rispetto a quelli effettivamente impiegati al completamento delle varie attività svolte, per capirne l'andamento e valutare se le previsioni fatte siano poi congruenti con la realtà.

#### Preventivo candidatura

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

In questo %%sprint|sprint%% l'obiettivo principale è quello di organizzare e configurare al meglio gli strumenti di lavoro, come %%Jira|jira%% e %%GitHub|github%%, che saranno utilizzati dal team durante l'intero ciclo di sviluppo del progetto. Parallelamente è stata avviata la redazione della documentazione quale: Norme di progetto, Piano di Progetto, Glossario e Piano di Qualifica.

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

A seguito si riporta la tabella del preventivo per il primo %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del primo %%sprint|sprint%%

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

Il primo %%sprint|sprint%% ha evidenziato una complessità inferiore rispetto alle aspettative iniziali. Tuttavia, tali variazioni sono in linea con i principi di %%Scrum|scrum%%, dove gli aggiustamenti iniziali sono necessari e rappresentano un'opportunità per affinare la capacità di stima nei prossimi %%sprint|sprint%%.

La principale variazione si è registrata sui ruoli di Programmatore (-6,66 ore) dove sono state inizialmente sovrastimate rispetto alle effettive necessità operative.
Anche gli altri ruoli hanno registrato una diminuzione, sebbene più contenuta.

###### Conclusione

In conclusione, il primo %%sprint|sprint%% ha permesso di identificare aree critiche nella pianificazione iniziale, evidenziando l'importanza di una maggiore attenzione alle attività di analisi e coordinamento in queste fasi iniziali. Queste osservazioni costituiscono un'importante base di apprendimento per ottimizzare la stima iniziale nei prossimi %%sprint|sprint%%, garantendo una gestione più efficiente delle risorse e una migliore aderenza al piano progettuale.

###### Gantt

<img src="/img/Gantt/Sprint1.png" alt="Diagramma Gantt sprint 1" data-width="70%" />

##### Sprint 2

- Periodo 06/12/2024 - 19/12/2024

###### Pianificazione

In questo periodo, il gruppo si concentrerà su attività fondamentali per proseguire lo sviluppo e l'avvicinamento al %%PoC|poc%%. In primo luogo, verrà dato seguito alla scrittura della documentazione avviata in precedenza, con particolare attenzione all'aggiornamento e al completamento delle Norme di Progetto, del Piano di Progetto, del Glossario e del Piano di Qualifica.

Parallelamente, si continuerà l'analisi delle tecnologie già avviata nel periodo precedente. A questa analisi saranno integrate nuove tecnologie emerse durante le recenti riunioni, con l'obiettivo di valutarne l'efficacia e l'applicabilità alle esigenze del progetto. Il gruppo, inoltre procederà nella stesura del diagramma use case.
Una parte del tempo sarà dedicata ad attività di ricerca focalizzate su questioni architetturali, con l'obiettivo di individuare soluzioni tecniche preliminari che garantiscano un'architettura modulare e scalabile. Questo lavoro iniziale consentirà di orientare le decisioni progettuali, valutando le possibili alternative e ponendo le basi per lo sviluppo del sistema.

Infine, verrà avviata la prima fase di sviluppo del %%PoC|poc%%, con l'obiettivo di creare una struttura di base per lo sviluppo dell'estensione.

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

A seguito si riporta la tabella del preventivo per il secondo %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del secondo %%sprint|sprint%%

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

Il secondo %%sprint|sprint%% ha evidenziato un peggioramento significativo nella gestione delle risorse e una minore aderenza al piano progettuale, in particolare per quanto riguarda il numero di task completate rispetto a quelle previste.

Il ruolo del Programmatore è stato sottostimato, infatti ha richiesto più tempo (+4 ore).
Tutti gli altri ruoli hanno dei valori effettivi inferiori a quelli previsti non per l'ottimizzazione dei tempi ma a causa di ritardi e task non concluse. La principale variazione si è registrata sui ruoli di Analista (-10 ore).

###### Conclusione

In conclusione, il secondo %%sprint|sprint%% ha mostrato un peggioramento nella gestione delle attività e un minor allineamento rispetto al preventivo iniziale.

###### Gantt

<img src="/img/Gantt/Sprint2.png" alt="Diagramma Gantt sprint 2" data-width="70%" />

##### Sprint 3

- Periodo 20/12/2024 - 12/01/2025

###### Pianificazione

In questo periodo, caratterizzato dalla presenza di festività e da una conseguente riduzione del tempo operativo disponibile, il team si dedicherà principalmente alle attività di documentazione concentrandosi su: Norme di Progetto e Analisi dei Requisiti.
Questo permetterà di implementare i consigli forniti dall'azienda proponente e dal Prof. Cardin nei rispettivi incontri, migliorando così la qualità della documentazione.

In parallelo, il team continuerà lo sviluppo di alcune funzionalità richieste dall'azienda per il %%PoC|poc%%, con l'obiettivo di garantire il rispetto delle tempistiche e dei %%requisiti|requisito_software%% concordati.

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

A seguito si riporta la tabella del preventivo per il terzo %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del terzo %%sprint|sprint%%

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

Il terzo %%sprint|sprint%%, svolto durante il periodo delle vacanze natalizie, ha risentito della disponibilità limitata delle risorse, ma ha comunque permesso di registrare progressi verso gli obiettivi prefissati.

La principale variazione si è osservata nel ruolo di Amministratore (+2 ore), a causa di una sottostima del tempo necessario per implementare le modifiche . Al contrario, il ruolo di Analista (-0,5 ore) e di Programmatore (-6 ore) hanno registrato un impiego inferiore rispetto alle previsioni.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha evidenziato alcune variazioni rispetto ai tempi stimati, ma ha comunque permesso un avanzamento significativo nelle attività prioritarie.

###### Gantt

<img src="/img/Gantt/Sprint3.png" alt="Diagramma Gantt sprint 3" data-width="70%" />

##### Sprint 4

- Periodo 13/01/2025 - 30/01/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento quasi definitivo della documentazione, con particolare attenzione all'analisi dei requisiti e al piano di qualifica.
Parallelamente, apporteremo gli ultimi ritocchi al %%PoC|poc%%, integrando i feedback ricevuti dall'azienda durante la riunione.

L'obiettivo principale è avvicinarsi in modo significativo alla conclusione della %%RTB|rtb%%, garantendo un avanzamento concreto del lavoro.

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

A seguito si riporta la tabella del preventivo per il quarto %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del quarto %%sprint|sprint%%

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

Il quarto %%sprint|sprint%%, svolto durante il periodo della sessione, ha risentito della disponibilità limitata delle risorse, ma ha comunque permesso di registrare progressi verso gli obiettivi prefissati e di recuperare alcune task tralasciate precedentemente.

La principale variazione si è osservata nel ruolo di Programmatore (+2 ore), a causa di una sottostima del tempo necessario per implementare le modifiche utili alla consegna della %%RTB|rtb%%. Al contrario, il ruolo di Amministratore (-7 ore) ha registrato un impiego inferiore rispetto alle previsioni.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha evidenziato alcune variazioni nei tempi stimati, ma ha consentito un avanzamento concreto nelle attività prioritarie.

###### Gantt

<img src="/img/Gantt/Sprint4.png" alt="Diagramma Gantt sprint 4" data-width="70%" />

##### Sprint 5

- Periodo 31/01/2025 - 14/02/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento della documentazione e sul recuperare tutte le task ancora incomplete.
Parallelamente, apporteremo gli ultimi ritocchi alle metriche.

L'obiettivo principale è richiedere la revisione della %%RTB|rtb%%.

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

A seguito si riporta la tabella del preventivo per il quinto %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del quinto %%sprint|sprint%%

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

Il quinto %%sprint|sprint%%, nonostante sia stato svolto durante il periodo della sessione, ha registrato forti progressi e ha permesso di riallinearsi con quanto stabilito. Infatti la maggioranza delle task svolte erano rimaste incomplete degli %%sprint|sprint%% precedenti.

Tutti i ruoli hanno rispettato le tempistiche preventivate.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha evidenziato alcune variazioni rispetto ai tempi stimati, ma ha comunque permesso di raggiungere tutti gli obiettivi prefissati, recuperando anche quanto lasciato nel backlog.

###### Gantt

<img src="/img/Gantt/Sprint5.png" alt="Diagramma Gantt sprint 5" data-width="70%" />

##### Sprint 6

- Periodo 10/02/2025 - 02/03/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sulla preparazione finale per la %%RTB|rtb%%, con particolare attenzione alla presentazione del Proof of Concept (%%PoC|poc%%) e al completamento della documentazione. Saranno svolte %%attività|attività%% di %%verifica|verifica%% della documentazione, con l'obiettivo di garantire che tutti i materiali siano pronti per la revisione.

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

A seguito si riporta la tabella del preventivo per il sesto %%sprint|sprint%%

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

Di seguito vengono indicate le spese effettive del sesto %%sprint|sprint%%

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

Il sesto %%sprint|sprint%% ha visto un avanzamento significativo verso la preparazione della %%RTB|rtb%%, con particolare attenzione alla presentazione del %%PoC|poc%% e al completamento della documentazione. Tuttavia, alcune %%attività|attività%% pianificate per il ruolo di Analista non sono state completate a causa di priorità riassegnate e sono state rimesse nel %%backlog|backlog%% per lo %%sprint|sprint%% successivo. Questo ha portato a una riduzione delle ore effettive rispetto al %%preventivo|preventivo%% per quel ruolo.

La principale variazione si è osservata nel ruolo di Analista (-9,75 ore), dove alcuni ticket non sono stati affrontati e sono stati riprogrammati per lo %%sprint|sprint%% successivo. Al contrario, il ruolo di Progettista (+1,42 ore) ha registrato un leggero aumento delle ore, dovuto alla necessità di ulteriori rifiniture tecniche.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha permesso di raggiungere gli obiettivi principali, con un buon livello di aderenza al %%preventivo|preventivo%% iniziale. Le variazioni osservate sono state gestite in modo efficace, garantendo il rispetto delle tempistiche e la %%qualità|qualità%% del lavoro svolto. I ticket non completati dal ruolo di Analista sono stati riassegnati al %%backlog|backlog%% per essere affrontati nello %%sprint|sprint%% successivo, mantenendo così una gestione flessibile e adattabile delle %%attività|attività%%.

###### Gantt

<img src="/img/Gantt/Sprint6.png" alt="Diagramma Gantt sprint 6" data-width="70%" />

##### Sprint 7

- Periodo 03/03/2025 - 16/03/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento della documentazione e sul recupero delle task ancora incomplete.

###### Gestione dei rischi

**Rischi attesi**

- _RO1_: Avanzamento lento per mancanza di esperienza.
- _RO2_: Ritardi dovuti a problemi individuali.

**Rischi occorsi**

Durante lo %%sprint|sprint%% 7, il gruppo ha incontrato diversi rischi previsti in fase di pianificazione. In particolare, il rischio RO1 "avanzamento lento per mancanza di esperienza" si è concretizzato nella difficoltà di conciliare le attività di progetto con la preparazione della presentazione RTB e la finalizzazione dei documenti. Questo ha rallentato l’avanzamento generale dei lavori, ma il gruppo è riuscito a recuperare nei giorni successivi grazie a una riorganizzazione delle attività.
Si è manifestato anche il rischio RO5, legato alla sottostima delle attività. I compiti di completamento e revisione della documentazione hanno richiesto più tempo del previsto, rendendo necessario uno sforzo aggiuntivo nelle fasi finali dello %%sprint|sprint%%.
Infine, si è verificato anche il rischio RO2, relativo a problemi individuali, in forma di discontinuità nella partecipazione alle riunioni. Non tutti i membri sono riusciti a essere presenti agli incontri di gruppo. Il problema è stato mitigato aggiornando singolarmente i membri assenti con brevi resoconti di quanto discusso.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                  |
| ------------------------- | ------------------------------------------- |
| Responsabile di progetto  | Manuel Felipe Vasquez                       |
| Analista                  | Dal Bianco Riccardo                         |
| Progettista               |                                             |
| Amministratore di sistema | Pistori Gaia, Monetti Luca                  |
| Programmatore             |                                             |
| Verificatore              | Carraro Agnese, Marcon Giulia, Piola Andrea |

Table: Suddivisione ruoli Sprint 7

###### Preventivo

A seguito si riporta la tabella del preventivo per il settimo %%sprint|sprint%%

| Ruolo                     | Ore svolte (h) | Costo (€)  |
| ------------------------- | -------------- | ---------- |
| Responsabile di progetto  | 3,25           | 97,5       |
| Analista                  | 4,5            | 112,5      |
| Progettista               | 0              | 0          |
| Amministratore di sistema | 15             | 300        |
| Programmatore             | 0              | 0          |
| Verificatore              | 1,66           | 24,9       |
| _Totale_                  | _24,4_         | _534,9_    |
| _Bilancio_                |                | _8.304,70_ |

Table: Preventivo Sprint 7

###### Consuntivo

Di seguito vengono indicate le spese effettive del settimo %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 4,25                 | +1            | 30               | 127,5     | +30             |
| Analista                  | 6,5                  | +2            | 25               | 162,5     | +50             |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 15                   | 0             | 20               | 300       | 0               |
| Programmatore             | 0                    | 0             | 15               | 0         | 0               |
| Verificatore              | 3,16                 | +1,5          | 15               | 47,4      | +22,5           |
| _Totale consuntivo_       | _28,91_              | _+4,5_        |                  | _637.4_   | _+102,5_        |

Table: Consuntivo Sprint 7

Considerando il costo di **637,4** il residuo disponibile ammonta a **8202,2€**.

###### Retrospettiva

Il settimo %%sprint|sprint%% ha visto un avanzamento significativo nel recupero delle task rimaste incomplete e nella preparazione della documentazione finale.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha evidenziato alcune variazioni rispetto ai tempi stimati, ma ha comunque permesso di raggiungere tutti gli obiettivi prefissati, recuperando anche quanto lasciato nel backlog.

###### Gantt

<img src="/img/Gantt/Sprint7.png" alt="Diagramma Gantt sprint 7" data-width="70%" />

#### Verso la PB

##### Sprint 8

- Periodo 17/03/2025 - 30/03/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sulla progettazione e sul miglioramento della documentazione.

###### Gestione dei rischi

**Rischi attesi**

- _RT2_: Apprendimento e utilizzo di nuove tecnologie.
- _RT3_: Mancanza di esperienza con Jest per i test unitari.
- _RO6_: Difficoltà nella scrittura della documentazione tecnica.

**Rischi occorsi**

Durante lo %%sprint|sprint%% 8, il team ha affrontato il rischio RO6, relativo alla difficoltà nella stesura della documentazione tecnica, in particolare nella redazione del documento delle specifiche tecniche. La complessità e la quantità di dettagli richiesti hanno rallentato il lavoro inizialmente. Per velocizzare la redazione e aumentare l'efficienza nella risoluzione dei dubbi, il gruppo incaricato ha suddiviso il documento in sezioni, distribuendo il lavoro e agevolando il confronto tra i membri.
Si sono verificati anche i rischi RT2 e RT3, entrambi legati all’uso di tecnologie, in particolare Jest per i test unitari. La difficoltà iniziale è stata superata grazie al supporto dei membri con maggiore esperienza, sono stati organizzati test di gruppo, durante i quali i dubbi sono stati chiariti in tempo reale. Questo approccio ha permesso un rapido apprendimento e una maggiore sicurezza nell’utilizzo dello strumento.
Infine, si è manifestato anche il rischio RO2, relativo agli impegni personali. Alcuni membri del team hanno avuto difficoltà a garantire la piena disponibilità durante lo %%sprint|sprint%%.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                 |
| ------------------------- | -------------------------- |
| Responsabile di progetto  | Carraro Agnese             |
| Analista                  | Pistori Gaia, Piola Andrea |
| Progettista               | Monetti Luca               |
| Amministratore di sistema | Dal Bianco Riccardo        |
| Programmatore             | Manuel Felipe Vasquez      |
| Verificatore              | Marcon Giulia              |

Table: Suddivisione ruoli Sprint 8

###### Preventivo

A seguito si riporta la tabella del preventivo per l'ottavo %%sprint|sprint%%:

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 8              | 240       |
| Analista                  | 24             | 600       |
| Progettista               | 42,5           | 1062,50   |
| Amministratore di sistema | 34             | 680       |
| Programmatore             | 33             | 495       |
| Verificatore              | 23,34          | 350,1     |
| _Totale_                  | _164,84_       | _3427,6_  |
| _Bilancio_                |                | _4775,2_  |

Table: Preventivo Sprint 8

###### Consuntivo

Di seguito vengono indicate le spese effettive dell'ottavo %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 8,5                  | +0,5          | 30               | 255       | +15             |
| Analista                  | 26                   | +2            | 25               | 650       | +50             |
| Progettista               | 42,5                 | 0             | 25               | 1062,5    | 0               |
| Amministratore di sistema | 37,17                | +3,17         | 20               | 743,4     | +63,4           |
| Programmatore             | 33                   | 0             | 15               | 495       | 0               |
| Verificatore              | 24,25                | +0,91         | 15               | 363,75    | +13,65          |
| _Totale consuntivo_       | _171,42_             | _+6,58_       |                  | _3569,65_ | _+142,05_       |

Table: Consuntivo Sprint 8

Considerando il costo di **3569,65€** il residuo disponibile ammonta a **4632,55€**.

###### Retrospettiva

L'ottavo %%sprint|sprint%% ha visto un considerevole avanzamento, principalmente nell'%%attività|attività%% di progettazione, ma anche nel miglioramento della documentazione e nell'%%attività|attività%% di codifica. Sono state completate tutte le %%attività|attività%% previste, incluse quelle arretrate del settimo %%sprint|sprint%%.

###### Conclusione

In conclusione, l'ottavo %%sprint|sprint%% ha segnato un grande avanzamento. Infatti, il costo finale di 3569,65€ mostra un notevole aumento della produttività. Il tempo richiesto per il completamento delle %%attività|attività%% ha leggermente superato quello previsto (+6,58 ore), ma tutti gli obiettivi prefissati sono stati raggiunti.

###### Gantt

<img src="/img/Gantt/Sprint8.png" alt="Diagramma Gantt sprint 8" data-width="70%" />

##### Sprint 9

- Periodo 31/03/2025 - 20/04/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà nel completare i test e sul completamento del progetto. Verrà richiesta anche la revisione da parte dell'azienda proponente.

###### Gestione dei rischi

**Rischi attesi**

- _RO4_: Ritardi dovuti a problemi di comunicazione con l'azienda.
- _RT3_: Mancanza di esperienza con Jest per i test unitari.
- _RO6_: Difficoltà nella scrittura della documentazione tecnica.

**Rischi occorsi**

Durante lo %%sprint|sprint%% 9, il team ha affrontato il rischio RO6, relativo alla difficoltà nella stesura della documentazione tecnica, in particolare nella scrittura del documento del piano di qualifica. Il numero elevato di test presenti e il livello di dettaglio molto alto hanno rallentato il lavoro. Per ottimizzare la scrittura il gruppo incaricato ha suddiviso il documento in sezioni.
Si è verificato il rischio RT3, legato all'uso di Jest per i test. La difficoltà iniziale è stata superata grazie al supporto dei membri con maggiore esperienza e allo studio della tecnologia.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                   |
| ------------------------- | ---------------------------- |
| Responsabile di progetto  | Pistori Gaia                 |
| Analista                  |                              |
| Progettista               | Piola Andrea, Carraro Agnese |
| Amministratore di sistema | Dal Bianco Riccardo          |
| Programmatore             | Monetti Luca, Marcon Giulia  |
| Verificatore              | Manuel Felipe Vasquez        |

Table: Suddivisione ruoli Sprint 9

###### Preventivo

A seguito si riporta la tabella del preventivo per il nono %%sprint|sprint%%:

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 16,5           | 495       |
| Analista                  | 0              | 0         |
| Progettista               | 25             | 625       |
| Amministratore di sistema | 10,83          | 216,6     |
| Programmatore             | 13             | 195       |
| Verificatore              | 62,42          | 936,3     |
| _Totale_                  | _127,75_       | _2467,9_  |
| _Bilancio_                |                | _2164,65_ |

Table: Preventivo Sprint 9

###### Consuntivo

Di seguito vengono indicate le spese effettive del nono %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 9                    | -7,5          | 30               | 270       | -225            |
| Analista                  | 5,5                  | +5,5          | 25               | 137,5     | +137,5          |
| Progettista               | 36,5                 | +11,5         | 25               | 912,5     | +287,5          |
| Amministratore di sistema | 30,75                | +19,92        | 20               | 615       | +398,4          |
| Programmatore             | 25,5                 | +12,5         | 15               | 382,5     | +187,5          |
| Verificatore              | 79,66                | +17,24        | 15               | 1194,9    | +258,6          |
| _Totale consuntivo_       | _186,91_             | _+59,16_      |                  | _3512,4_  | _+1044,5_       |

Table: Consuntivo Sprint 9

Considerando il costo di **3512,40€** il residuo disponibile ammonta a **1120,15€**.

###### Retrospettiva

Il nono %%sprint|sprint%% ha visto un considerevole avanzamento, principalmente nell'%%attività|attività%% di testing e nella relativa documentazione del piano di qualifica. Sono state completate tutte le %%attività|attività%% previste anche se le ore necessarie sono state sottostimate.

###### Conclusione

In conclusione, il nono %%sprint|sprint%% ha la conclusione dell'attività di testing e di produzione del manuale utente. Infatti, il gruppo nel prossimo sprint effettuerà il controllo dei documenti e sarà pronto alla revisione PB.

###### Gantt

<img src="/img/Gantt/Sprint9.png" alt="Diagramma Gantt sprint 9" data-width="70%" />

##### Sprint 10

- Periodo 21/03/2025 - 25/04/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento del progetto e di tutta la documentazione necessaria per la revisione finale.

###### Gestione dei rischi

**Rischi attesi**

- _RO6_: Difficoltà nella scrittura della documentazione tecnica.
- _RO2_: Ritardi dovuti a problemi individuali.

**Rischi occorsi**

Durante lo %%sprint|sprint%% 10, il team ha affrontato il rischio RO2, relativo a ritardi dovuti ad impegni personali di alcuni membri del gruppo. Sono stati mitigati tramite la suddivisione asincrona del lavoro da svolgere.

###### Ruoli

A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                           |
| ------------------------- | ------------------------------------ |
| Responsabile di progetto  | Monetti Luca                         |
| Analista                  |                                      |
| Progettista               |                                      |
| Amministratore di sistema | Pistori Gaia                         |
| Programmatore             | Manuel Felipe Vasquez, Marcon Giulia |
| Verificatore              | Dal Bianco Riccardo, Carraro Agnese  |

Table: Suddivisione ruoli Sprint 10

###### Preventivo

A seguito si riporta la tabella del preventivo per il nono %%sprint|sprint%%:

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 5,5            | 165       |
| Analista                  | 0              | 0         |
| Progettista               | 0              | 0         |
| Amministratore di sistema | 10,17          | 203,4     |
| Programmatore             | 5              | 75        |
| Verificatore              | 7,17           | 107,55    |
| _Totale_                  | _27,84_        | _550,95_  |
| _Bilancio_                |                | _569,2_   |

Table: Preventivo Sprint 10

###### Consuntivo

Di seguito vengono indicate le spese effettive del nono %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 6,5                  | +1            | 30               | 195       | +30             |
| Analista                  | 0                    | 0             | 25               | 0         | 0               |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Amministratore di sistema | 11,75                | +1,58         | 20               | 235       | +31,6           |
| Programmatore             | 3,08                 | -1,92         | 15               | 46,2      | -28,8           |
| Verificatore              | 2,92                 | -4,25         | 15               | 43,8      | -63,75          |
| _Totale consuntivo_       | _24,25_              | _-3,59_       |                  | _520_     | _-30,95_        |

Table: Consuntivo Sprint 10

Considerando il costo di **520€** il residuo disponibile ammonta a **600,15€**.

###### Retrospettiva

Il decimo %%sprint|sprint%% ha visto il completamento delle attività previste in un tempo minore rispetto a quanto stimato. Infatti, il tempo necessario per il completamento delle attività è stato sovrastimato (-3,59 ore), ma tutti gli obiettivi prefissati sono stati raggiunti.

###### Conclusione

In conclusione, durante il decimo %%sprint|sprint%% il gruppo è riuscito a terminare tutte le attività previste e a completare la documentazione necessaria per la revisione finale.

###### Gantt

<img src="/img/Gantt/Sprint10.png" alt="Diagramma Gantt sprint 10" data-width="70%" />

## Bilancio conclusivo

Il bilancio finale del progetto è stato calcolato considerando il totale delle ore svolte da ciascun membro del gruppo durante i vari %%sprint|sprint%%.

### Report Ore-Ruolo

#### Tabella Ore-Ruolo

| Ruolo                     | Totale ore ruolo (h) | Costo orario (€) | Costo (€) |
| ------------------------- | -------------------- | ---------------- | --------- |
| Amministratore di Sistema | 155,42               | 20               | 3108,4    |
| Programmatore             | 78,92                | 15               | 1183,8    |
| Progettista               | 83,92                | 25               | 2098      |
| Analista                  | 104,08               | 25               | 2602      |
| Responsabile              | 46                   | 30               | 1380      |
| Verificatore              | 132,75               | 15               | 1991,25   |

Table: Tabella Ore - Ruolo

#### Grafico Ore-Ruolo

<img src="/img/Report/report-ore-ruolo.png" alt="Report ore-ruolo svolte durante il progetto" data-width="70%" />

### Report Ore Individuali

#### Tabella Ore Individuali

| Membro                | Ore Svolte (h) |
| --------------------- | -------------- |
| Carraro Agnese        | 80,75          |
| Piola Andrea          | 88             |
| Pistori Gaia          | 90,5           |
| Marcon Giulia         | 83,33          |
| Monetti Luca          | 89             |
| Vasquez Manuel Felipe | 87,67          |
| Dal Bianco Riccardo   | 81,83          |

Table: Tabella Ore Individuali

#### Grafico Ore Individuali

<img src="/img/Report/report-ore-individuali.png" alt="Report ore individuali svolte durante il progetto" data-width="70%" />

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
