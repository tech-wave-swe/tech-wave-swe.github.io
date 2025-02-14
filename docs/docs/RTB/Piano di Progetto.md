---
id: piano_di_progetto
title: "Piano di Progetto"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 2.1.1
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di %%Progetto|progetto%%

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                                                            | Autore              | Data Verifica | Verificatore        |
| ---------- | -------- | -------------------------------------------------------------------------------------- | ------------------- | ------------- | ------------------- |
| 12/02/2025 | 2.2.0    | Refactoring                                                                            | Piola Andrea        |               |                     |
| 05/02/2025 | 2.1.1    | Minor fix                                                                              | Piola Andrea        |               |                     |
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

Il Piano di %%Progetto|progetto%% è un documento il cui scopo è quello di pianificare in modo preciso lo svolgimento dello stesso cercando di normare i tempi ed i modi. Più precisamente, nel Piano di %%Progetto|progetto%% ci sono sezioni dedicate all'analisi generale dei rischi ed all\'individuazione delle possibili mitigazioni; e sezioni dedicate alla pianificazione dei periodi, individuati come %%sprint|sprint%%, in cui sono indicati i preventivi riguardanti ore/costi ed i consuntivi di ciò che effettivamente è stato svolto. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del %%progetto|progetto%% andrà aggiornato per seguire l'andamento degli %%sprint|sprint%%.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti tramite _("Come?")_.

### Riferimenti

Riferimenti normativi:

- %%Capitolato|capitolato%% d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Norme di %%progetto|progetto%%

> _"Inserire link al file norme di progetto"_

Riferimenti informativi:

- Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

- Corso di Ingegneria del software - Gestione di %%progetto|progetto%%

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T04.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

## Analisi dei rischi

Questa sezione del Piano di %%Progetto|progetto%% si occupa di analizzare le difficoltà che si possono incontrare per evitare che si pongano problemi nell"avanzamento o rallentamenti che possono ostacolare le %%attività|attività%%. Consapevoli di queste possibilità, si decide di analizzare ciascun %%rischio|rischio%%, fornendo una descrizione, un grado di %%rischio|rischio%% sull'avvenire dello stesso (da 1 a 5 dove 1 indica molto basso e 5 molto alto), e la pericolosità in modo tabellare, in modo tale da aiutare l’identificazione di ognuno con un monitoraggio facile e continuo. Per facilitare l’identificazione e l’analisi, le categorie indicate sono principalmente due: le difficoltà interpersonali ed organizzative e le difficoltà tecnologiche.  
Le %%mitigazione|mitigazione%% di questi rischi si trovano alla fine della sezione.

### Rischi organizzativi ed interpersonali

A seguito viene riportata la tabella contenente i rischi relativi all'organizzazione ed ai rapporti tra i vari membri del gruppo e verso l'esterno.

| Codice    | Rischio                                                  | Descrizione                                                                                                                                                                                                          | Grado di rischio | Pericolosità |
| --------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **RO1**   |Avanzamento lento per mancanza di esperienza              | Soprattutto durante il primo periodo i membri del gruppo non sono avvezzi alla parte di organizzazione del progetto; ciò può ovviamente portare un rallentamento all'avanzamento dei lavori che con il tempo ridurrà | 5                | Media/Alta   |
| **RO2**   |Ritardi dovuti a problemi individuali                     | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause di qualsiasi natura, creando rallentamenti nel flusso di lavoro                   | 2                | Media        |
| **RO3**   |Problemi personali tra membri del gruppo                  | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause legati a problemi personali con un altro membro, creando rallentamenti nel flusso | 1                | Alta         |
| **RO4**   |Ritardi dovuti a problemi di comunicazione con l'azienda  | Il gruppo può ritrovarsi a dover rallentare il ritmo delle attività a causa della necessità di attendere un feedback dall'azienda che non lo fornisce nel breve periodo                                              | 2                | Alta         |

Table: Rischi Organizzativi e interpersonali

### Rischi tecnologici

| Codice    | Rischio                             | Descrizione                                                                                                                                | Grado di rischio | Pericolosità |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------------ |
| **RT1**   | **Mancanza di conoscenze tecniche** | Alcuni membri del gruppo potrebbero non aver familiarità con tutte le tecnologie utilizzate durante lo sviluppo o la gestione del progetto | 4                | Bassa        |

Table: Rischi Tecnologici

### Mitigazione dei rischi organizzativi ed interpersonali

| Codice    | Rischio                                                      | Mitigazione                                                                                                                                                                                                                                                                                    |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RO1**   | **Avanzamento lento per mancanza di esperienza**             | Questo rischio può essere mitigato attraverso la pianificazione di incontri frequenti con l'azienda BlueWind che si è resa disponibile a fornire formazione e supporto. Inoltre, vogliamo scegliere un modello di sviluppo incrementale che si integri con il modello AGILE scrum dell'azienda |
| **RO2**   | **Ritardi dovuti a problemi individuali**                    | Questo rischio può essere mitigato attraverso la comunicazione costante tra i vari membri del gruppo. Questo ci permetterà di individuare difficoltà o ritardi prima che essi possano trasformarsi in problemi                                                                                 |
| **RO3**   | **Problemi personali tra membri del gruppo**                 | Questo rischio può essere mitigato creando un tavolo di confronto tra i membri coinvolti per cercare di dissipare tutte le problematiche nate tra loro; ci si affida anche al buonsenso delle stesse nella cooperazione, per il bene di tutto il gruppo                                        |
| **RO4**   | **Ritardi dovuti a problemi di comunicazione con l'azienda** | Questo rischio può essere mitigato accordandosi sulla data dell'incontro successivo con l'azienda prima dell'inizio dell'incontro presente                                                                                                                                                     |

Table: Mitigazione rischi organizzativi ed interpersonali

### Mitigazione dei rischi tecnologici

| Codice    | Rischio                             | Mitigazione                                                                                                                                                                                                             |
| --------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RT1**   | **Mancanza di conoscenze tecniche** | Questo rischio può essere mitigato attraverso una stretta collaborazione tra i membri del team e l'azienda proponente mirando alla creazione di un ambiente di collaborazione e condivisione delle conoscenze acquisite |

Table: Mitigazione rischi tecnologici

## Modello di sviluppo e Pianificazione

### Modello di sviluppo

Il gruppo utilizza un modello Agile basato sul framework %%SCRUM|scrum%% utilizzato in maniera semplificata. I macro periodi sono divisi in %%sprint|sprint%% più piccoli, da due settimane, che permettono rilasci continui così da portare ad un incremento continuo del prodotto. In ogni %%sprint|sprint%% sono ben chiare le task che i membri dovranno portare a termine contenute nel %%backlog|backlog%%; ciò porta ad una facile individuazione dei %%requisiti|requisito_software%% già sviluppati e di quelli ancora da sviluppare da parte del team.

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
In questa sezione sono elencati gli sprint appartenenti ai vari periodi di lavori suddivisi per le milestone del progetto didattico. Ogni milestone è divisa in più sprint seguendo le norme legate alla metodologia di lavoro Agile, con riferimento al modello Scrum. Sono inoltre analizzate le variazione delle ore e dei costi preventivati rispetto a quelli effettivamente impiegati al completamento delle varie attività svolte per capirne l'andamento e valutare se le previsioni fatte siano poi congruenti con la realtà.

#### Preventivo Candidatura
Durante la fase di candidatura il seguente preventivo realizzato riporta la ripartizione oraria per i vari ruoli con costi annessi:

| Ruolo         | Costo | Ore previste  | Totale    |
|---------------|-------|---------------|-----------|
| Responsabile  |30€    |75             | 2250€     |
| Amministratore|20€    |85             | 1700€     |
| Analista      |25€    |90             | 2250€     |
| Progettista   |25€    |90             | 2250€     |
| Programmatore |15€    |170            | 2550€     |
| Verificatore  |15€    |120            | 1800€     |
| **Totale**    |       |               | **12800€**|

#### Struttura degli sprint
Nella propria sezione dedicata ogni sprint è descritto seguendo la seguente struttura:

- Periodo: data di inizio e di fine sprint;
- Pianificazione: descrive gli obiettivi dello sprint, le attività da svolgere e le motivazioni a queste;
- Ruoli: definisce i ruoli occupati dai membri durante il periodo;
- Preventivo: tabella che contiene le ore ed i costi preventivati per ciascun ruolo;
- Retrospettiva: analizza le difficoltà incontrate durante lo sprint;
- Conclusione: riassume i risultati ottenuti e le decisioni di miglioramento prese;
- Consuntivo: tabella che contiene le ore ed i costi a consuntivo per ciascun ruolo;

#### Verso la RTB
Alla fine della la fase di candidatura con aggiudicazione del capitolato, il gruppo ha ritenuto opportuno sfruttare il tempo compreso tra l'assegnazione del capitolato e la prima riunione con il proponente per cominciare a prendere dimestichezza con la stesura dei documento di progetto e la familiarizzazione con i diversi ruoli del team per poter poi avviare più rapidamente il primo sprint.

##### Sprint 1

- Periodo: 18/11/2024 - 06/12/2024

###### Pianificazione

In questo %%sprint|sprint%% l'obiettivo principale è quello di organizzare e configurare al meglio gli strumenti di lavoro, come %%Jira|jira%% e %%GitHub|github%%, che saranno utilizzati dal team durante l'intero ciclo di sviluppo del progetto. Parallelamente è stata avviata la redazione della documentazione quale: Norme di progetto, Piano di Progetto, Glossario e Piano di Qualifica.

A seguito della prima riunione svolta con l'azienda proponente, buona parte delle attività del team è stata dedicata allo studio delle tecnologie concordate, al fine di acquisire familiarità con le stesse. La durata dello Sprint, prevista inizialmente di due settimane, è stata estesa a causa del posticipo della riunione con l'azienda.

Durante il tempo aggiuntivo, il team ha deciso di sfruttare l'opportunità per avviare la redazione dell'Analisi dei Requisiti attraverso la definizione degli use case.

###### Ruoli
A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Responsabile di progetto  | Carraro Agnese, Piola Andrea                                                          |
| Amministratore di sistema | Carraro Agnese, Monetti Luca, Dal Bianco Riccardo                                     |
| Analista                  | Piola Andrea, Pistori Gaia, Marcon Giulia, Manuel Felipe Vasquez, Dal Bianco Riccardo |
| Progettista               | Manuel Felipe Vasquez                                                                 |
| Programmatore             | Monetti Luca                                                                          |
| Verificatore              | Carraro Agnese, Pistori Gaia, Marcon Giulia, Monetti Luca                             |

Table: Suddivisione ruoli Sprint 1

###### Preventivo

A seguito si riporta la tabella del preventivo per il primo %%sprint|sprint%%

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 4              | 120       |
| Amministratore di sistema | 4              | 80        |
| Analista                  | 4              | 100       |
| Progettista               | 0              | 0         |
| Programmatore             | 1              | 15        |
| Verificatore              | 5              | 75        |
| Totale                    | 18             | 390       |
| Bilancio                  |                | 12.410,00 |

Table: Preventivo Sprint 1

###### Retrospettiva

Il primo %%sprint|sprint%% ha evidenziato una maggiore complessità rispetto alle aspettative iniziali, soprattutto per quanto riguarda le attività di analisi. Tuttavia, tali variazioni sono in linea con i principi di %%SCRUM|scrum%%, dove gli aggiustamenti iniziali sono necessari e rappresentano un'opportunità per affinare la capacità di stima nei prossimi %%sprint|sprint%%.

La principale variazione si è registrata sui ruoli di Analista (+13 ore) e Progettista (+3,5 ore) in quanto le ore dedicate alle attività di coordinamento e alle riunioni sono state inizialmente sottostimate rispetto alle effettive necessità operative.
Anche il Responsabile di progetto e l’Amministratore di sistema hanno registrato un aumento, sebbene più contenuto (+2 ore ciascuno).

###### Conclusione

In conclusione, il primo %%sprint|sprint%% ha permesso di identificare aree critiche nella pianificazione iniziale, evidenziando l'importanza di una maggiore attenzione alle attività di analisi e coordinamento in queste fasi iniziali. Queste osservazioni costituiscono un'importante base di apprendimento per ottimizzare la stima iniziale nei prossimi %%sprint|sprint%%, garantendo una gestione più efficiente delle risorse e una migliore aderenza al piano progettuale.

###### Consuntivo

Di seguito vengono indicate le spese effettive del primo %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 6                    | +2            | 30               | 180       | +60             |
| Amministratore di sistema | 6                    | +2            | 20               | 120       | +40             |
| Analista                  | 17                   | +13           | 25               | 425       | +325            |
| Progettista               | 3,5                  | +3,5          | 25               | 87,5      | +87,5           |
| Programmatore             | 0,5                  | -0,5          | 15               | 7,5       | -7,5            |
| Verificatore              | 5                    | 0             | 15               | 75        | 0               |
| Totale consuntivo         | 38                   | +20           |                  | 895       | +505            |

Table: Consuntivo Sprint 1

Considerando il costo di **895,00€** il residuo disponibile ammonta a **11.905,00€**.

##### Sprint 2

- Periodo 07/12/2024 - 22/12/2024

###### Pianificazione

In questo periodo, il gruppo si concentrerà su attività fondamentali per proseguire lo sviluppo e l'avvicinamento al %%PoC|poc%%. In primo luogo, verrà dato seguito alla scrittura della documentazione avviata in precedenza, con particolare attenzione all'aggiornamento e al completamento delle Norme di Progetto, del Piano di Progetto, del Glossario e del Piano di Qualifica.

Parallelamente, si continuerà l'analisi delle tecnologie già avviata nel periodo precedente. A questa analisi saranno integrate nuove tecnologie emerse durante le recenti riunioni, con l'obiettivo di valutarne l'efficacia e l'applicabilità alle esigenze del progetto. Il gruppo, inoltre procederà nella stesura del diagramma use case.
Una parte del tempo sarà dedicata ad attività di ricerca focalizzate su questioni architetturali, con l'obiettivo di individuare soluzioni tecniche preliminari che garantiscano un'architettura modulare e scalabile. Questo lavoro iniziale consentirà di orientare le decisioni progettuali, valutando le possibili alternative e ponendo le basi per lo sviluppo del sistema.

Infine, verrà avviata la prima fase di sviluppo del %%PoC|poc%%, con l'obiettivo di creare una struttura di base per lo sviluppo dell'estensione.

###### Ruoli
A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                       |
| ------------------------- | ------------------------------------------------ |
| Responsabile di progetto  | Marcon Giulia                                    |
| Amministratore di sistema | Marcon Giulia, Dal Bianco Riccardo               |
| Analista                  | Piola Andrea, Pistori Gaia, Dal Bianco Riccardo  |
| Progettista               |                                                  |
| Programmatore             | Monetti Luca, Manuel Felipe Vasquez              |
| Verificatore              | Carraro Agnese, Pistori Gaia, Monetti Luca       |

Table: Suddivisione ruoli Sprint 2

###### Preventivo

A seguito si riporta la tabella del preventivo per il secondo %%sprint|sprint%%

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 6              | 180       |
| Amministratore di sistema | 6              | 120       |
| Analista                  | 17             | 425       |
| Progettista               | 0              | 0         |
| Programmatore             | 5              | 75        |
| Verificatore              | 5              | 75        |
| Totale                    | 39             | 875       |
| Bilancio                  |                | 11.030,00 |

Table: Preventivo Sprint 2

###### Retrospettiva

Il secondo %%sprint|sprint%% ha dimostrato un progresso significativo nella gestione delle risorse e una maggiore aderenza al piano progettuale dimostrando che le azioni correttive introdotte dopo il primo %%sprint|sprint%% hanno avuto un impatto positivo.

La principale variazione si è registrata sui ruoli di Programmatore (+4 ore) in quanto è stata sottostimato il tempo necessario allo sviluppo di una base per il %%PoC|poc%%.
Abbiamo invece sovrastimato il ruolo dell'Analista  (-3 ore) e del Responsabile (-4 ore).

###### Conclusione

In conclusione, Il secondo %%sprint|sprint%% ha mostrato un miglioramento nella gestione delle attività e un maggior allineamento rispetto al preventivo iniziale.

###### Consuntivo

Di seguito vengono indicate le spese effettive del secondo %%sprint|sprint%%

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 2                    | -4            | 30               | 60        | -120            |
| Amministratore di sistema | 5                    | -1            | 20               | 100       | -20             |
| Analista                  | 14                   | -3            | 25               | 350       | -75             |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Programmatore             | 9                    | +4            | 15               | 135       | +60             |
| Verificatore              | 3,5                  | -1,5          | 15               | 52,5      | -22,50          |
| Totale consuntivo         | 33.5                 | -5.5          |                  | 697,5     | -177,50         |

Table: Consuntivo Sprint 2

Considerando il costo di **697,50€** il residuo disponibile ammonta a **11.207,50€**.

##### Sprint 3

- Periodo 23/12/2024 - 12/01/2025

###### Pianificazione

In questo periodo, caratterizzato dalla presenza di festività e da una conseguente riduzione del tempo operativo disponibile, il team si dedicherà principalmente alle attività di documentazione concentrandosi su: Norme di Progetto e Analisi dei Requisiti.
Questo permetterà di implementare i consigli forniti dall'azienda proponente e dal Prof. Cardin nei rispettivi incontri, migliorando così la qualità della documentazione.

In parallelo, il team continuerà lo sviluppo di alcune funzionalità richieste dall'azienda per il %%PoC|poc%%, con l'obiettivo di garantire il rispetto delle tempistiche e dei %%requisiti|requisito_software%% concordati.

###### Ruoli
A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                               |
| ------------------------- | ---------------------------------------- |
| Responsabile di progetto  | Dal Bianco Riccardo                      |
| Amministratore di sistema | Carraro Agnese, Monetti Luca             |
| Analista                  | Piola Andrea, Pistori Gaia, Monetti Luca |
| Progettista               |                                          |
| Programmatore             | Marcon Giulia, Manuel Felipe Vasquez     |
| Verificatore              | Pistori Gaia, Monetti Luca               |

Table: Suddivisione ruoli Sprint 3

###### Preventivo

A seguito si riporta la tabella del preventivo per il terzo %%sprint|sprint%%

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 4              | 120       |
| Amministratore di sistema | 4              | 80        |
| Analista                  | 15             | 375       |
| Progettista               | 0              | 0         |
| Programmatore             | 5              | 75        |
| Verificatore              | 5              | 75        |
| Totale                    | 33             | 725       |
| Bilancio                  |                | 10.472,50 |

Table: Preventivo Sprint 3

###### Retrospettiva

Il terzo %%sprint|sprint%%, svolto durante il periodo delle vacanze natalizie, ha risentito della disponibilità limitata delle risorse, ma ha comunque permesso di registrare progressi verso gli obiettivi prefissati.

La principale variazione si è osservata nel ruolo di Programmatore (+2 ore), a causa di una sottostima del tempo necessario per implementare le modifiche al %%PoC|poc%% . Al contrario, il ruolo di Analista (-2 ore) e di Responsabile (-3 ore) hanno registrato un impiego inferiore rispetto alle previsioni.

###### Conclusione

In conclusione, lo %%sprint|sprint%% ha evidenziato alcune variazioni nei tempi stimati, ma ha consentito un avanzamento concreto nelle attività prioritarie.

###### Consuntivo

Di seguito vengono indicate le spese effettive del terzo %%sprint|sprint%% 22/12 12/01

| Ruolo                     | Totale ore ruolo (h) | Diff. ore (h) | Costo orario (€) | Costo (€) | Diff. costo (€) |
| ------------------------- | -------------------- | ------------- | ---------------- | --------- | --------------- |
| Responsabile di progetto  | 1                    | -3            | 30               | 30        | -90             |
| Amministratore di sistema | 5                    | +1            | 20               | 100       | +20             |
| Analista                  | 13                   | -2            | 25               | 325       | -50             |
| Progettista               | 0                    | 0             | 25               | 0         | 0               |
| Programmatore             | 7                    | +2            | 15               | 105       | +30             |
| Verificatore              | 2                    | -3            | 15               | 30        | -45             |
| Totale consuntivo         | 33.5                 | -5            |                  | 590       | -135            |

Table: Consuntivo Sprint 3

Considerando il costo di **590€** il residuo disponibile ammonta a **10.617,50€**.

##### Sprint 4

- Periodo 13/01/2025 - 26/01/2025

###### Pianificazione

In questo periodo, il gruppo si concentrerà sul completamento quasi definitivo della documentazione, con particolare attenzione all'analisi dei requisiti e al piano di qualifica.
Parallelamente, apporteremo gli ultimi ritocchi al %%PoC|poc%%, integrando i feedback ricevuti dall'azienda durante la riunione.

L'obiettivo principale è avvicinarsi in modo significativo alla conclusione dell'RTB, garantendo un avanzamento concreto del lavoro.

###### Ruoli
A seguito si riporta la tabella con la suddivisione dei ruoli:

| **Ruolo**                 | **Membri**                                                     |
| ------------------------- | -------------------------------------------------------------- |
| Responsabile di progetto  | Dal Bianco Riccardo                                            |
| Amministratore di sistema | Marcon Giulia                                                  |
| Analista                  | Carraro Agnese, Piola Andrea, Pistori Gaia, Monetti Luca       |
| Progettista               |                                                                |
| Programmatore             | Manuel Felipe Vasquez                                          |
| Verificatore              | Piola Andrea, Marcon Giulia, Monetti Luca, Dal Bianco Riccardo |

Table: Suddivisione ruoli Sprint 4

###### Preventivo

A seguito si riporta la tabella del preventivo per il quarto %%sprint|sprint%%

| Ruolo                     | Ore svolte (h) | Costo (€) |
| ------------------------- | -------------- | --------- |
| Responsabile di progetto  | 3              | 120       |
| Amministratore di sistema | 10             | 200       |
| Analista                  | 25             | 625       |
| Progettista               | 0              | 0         |
| Programmatore             | 4              | 60        |
| Verificatore              | 6              | 90        |
| Totale                    | 48             | 1095      |
| Bilancio                  |                | 9.522,50  |

Table: Preventivo Sprint 4

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
