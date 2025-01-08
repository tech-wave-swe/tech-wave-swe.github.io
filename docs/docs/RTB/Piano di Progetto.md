---
id: piano_di_progetto
title: "Piano di Progetto"
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di Progetto

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                                        | Autore              | Data Verifica | Verificatore   |
| ---------- | -------- | -------------------------------------------------- | ------------------- | ------------- | -------------- |
| 03/12/2024 | 2.0.0    | Aggiunta TOC automatica                            | Luca Monetti        |               |                |
| 21/12/2024 | 1.3.0    | Integrazione sezione 3, 4, 5 con secondo sprint    | Dal Bianco Riccardo | 22/12/2024    | Carraro Agnese |
| 02/12/2024 | 1.2.0    | Aggiunta sezione 2                                 | Piola Andrea        | 04/12/2024    | Pistori Gaia   |
| 27/11/2024 | 1.1.0    | Aggiunta sezione 3 e 4 con primo sprint            | Piola Andrea        | 28/11/2024    | Pistori Gaia   |
| 24/11/2024 | 1.0.0    | Prima stesura del documento con indice e sezione 1 | Piola Andrea        | 25/11/2024    | Pistori Gaia   |

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>

<NumberedWrapper toc={toc}>

## Introduzione

### Scopo del Documento

Il Piano di Progetto è un documento il cui scopo è quello di pianificare in modo preciso lo svolgimento dello stesso cercando di normare i tempi ed i modi. Più precisamente, nel Piano di Progetto ci sono sezioni dedicate all'analisi generale dei rischi ed all\'individuazione delle possibili mitigazioni; e sezioni dedicate alla pianificazione dei periodi, individuati come sprint, in cui sono indicati i preventivi riguardanti ore/costi ed i consuntivi di ciò che effettivamente è stato svolto. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del progetto andrà aggiornato per seguire l'andamento degli sprint.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il capitolato **_Requirement Tracker - Plug-in VSCode_** propone lo sviluppo di un plugin per VSCode che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia
un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti tramite _("Come?")_.

### Riferimenti

Riferimenti normativi:

- Capitolato d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Norme di progetto

> _"Inserire link al file norme di progetto"_

Riferimenti informativi:

- Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

- Corso di Ingegneria del software - Gestione di progetto

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T04.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

## Analisi dei rischi

Questa sezione del Piano di Progetto si occupa di analizzare le difficoltà che si possono incontrare per evitare che si pongano problemi nell’avanzamento o rallentamenti che possono ostacolare le attività. Consapevoli di queste possibilità, si decide di analizzare ciascun rischio, fornendo una descrizione, un grado di rischio sull'avvenire dello stesso (da 1 a 5 dove 1 indica molto basso e 5 molto alto), e la pericolosità in modo tabellare, in modo tale da aiutare l’identificazione di ognuno con un monitoraggio facile e continuo. Per facilitare l’identificazione e l’analisi, le categorie indicate sono principalmente due: le difficoltà interpersonali ed organizzative e le difficoltà tecnologiche.  
Le mitigazione di questi rischi si trovano alla fine della sezione.

### Rischi organizzativi ed interpersonali

A seguito viene riportata la tabella contenente i rischi relativi all'organizzazione ed ai rapporti tra i vari membri del gruppo e verso l'esterno.

| Rischio                                                      | Descrizione                                                                                                                                                                                                          | Grado di rischio | Pericolosità |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| **Avanzamento lento per mancanza di esperienza**             | Soprattutto durante il primo periodo i membri del gruppo non sono avvezzi alla parte di organizzazione del progetto; ciò può ovviamente portare un rallentamento all'avanzamento dei lavori che con il tempo ridurrà | 5                | Media/Alta   |
| **Ritardi dovuti a problemi individuali**                    | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause di qualsiasi natura, creando rallentamenti nel flusso di lavoro                   | 2                | Media        |
| **Problemi personali tra membri del gruppo**                 | Uno o più elementi del gruppo potrebbero non essere in grado di completare il lavoro pianificato entro la data prevista, per cause legati a problemi personali con un altro membro, creando rallentamenti nel flusso | 1                | Alta         |
| **Ritardi dovuti a problemi di comunicazione con l'azienda** | Il gruppo può ritrovarsi a dover rallentare il ritmo delle attività a causa della necessità di attendere un feedback dall'azienda che non lo fornisce nel breve periodo                                              | 2                | Alta         |

### Rischi tecnologici

| Rischio                             | Descrizione                                                                                                                                | Grado di rischio | Pericolosità |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------------ |
| **Mancanza di conoscenze tecniche** | Alcuni membri del gruppo potrebbero non aver familiarità con tutte le tecnologie utilizzate durante lo sviluppo o la gestione del progetto | 4                | Bassa        |

### Mitigazione dei rischi organizzativi ed interpersonali

| Rischio                                                      | Mitigazione                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Avanzamento lento per mancanza di esperienza**             | Questo rischio può essere mitigato attraverso la pianificazione di incontri frequenti con l'azienda BlueWind che si è resa disponibile a fornire formazione e supporto. Inoltre, vogliamo scegliere un modello di sviluppo incrementale che si integri con il modello AGILE scrum dell'azienda |
| **Ritardi dovuti a problemi individuali**                    | Questo rischio può essere mitigato attraverso la comunicazione costante tra i vari membri del gruppo. Questo ci permetterà di individuare difficoltà o ritardi prima che essi possano trasformarsi in problemi                                                                                 |
| **Problemi personali tra membri del gruppo**                 | Questo rischio può essere mitigato creando un tavolo di confronto tra i membri coinvolti per cercare di dissipare tutte le problematiche nate tra loro; ci si affida anche al buonsenso delle stesse nella cooperazione, per il bene di tutto il gruppo                                        |
| **Ritardi dovuti a problemi di comunicazione con l'azienda** | Questo rischio può essere mitigato accordandosi sulla data dell'incontro successivo con l'azienda prima dell'inizio dell'incontro presente                                                                                                                                                     |

### Mitigazione dei rischi tecnologici

| Rischio                             | Mitigazione                                                                                                                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mancanza di conoscenze tecniche** | Questo rischio può essere mitigato attraverso una stretta collaborazione tra i membri del team e l'azienda proponente mirando alla creazione di un ambiente di collaborazione e condivisione delle conoscenze acquisite |

## Modello di sviluppo e Pianificazione

### Modello di sviluppo

Il gruppo utilizza un modello Agile basato sul framework SCRUM utilizzato in maniera semplificata. I macroperiodi sono divisi in sprint più piccoli, da due settimane, che permettono rilasci continui così da portare ad un incremento continuo del prodotto. In ogni sprint sono ben chiare le task che i membri dovranno portare a termine contenute nel backlog; ciò porta ad una facile individuazione dei requisiti già sviluppati e di quelli ancora da sviluppare da parte del team.

I punti di forza di questo modello di sviluppo sono:

- Dare priorità allo sviluppo di funzionalità principali, garantendone la verifica costante anche da parte del proponente.

- Ottima risposta ai cambiamenti, con la possibilità di definizione di categorie che avanzano durante tutta la durata del progetto in maniera collaborativa e adattabile.

- I test e la verifica sono più semplici, in quanto fanno riferimento alle attività svolte durante lo specifico sprint.

Le documentazioni prodotte nelle fasi di sviluppo saranno aggiornate procedendo con lo sviluppo stesso, in modo da inserire e/o modificare le informazioni presenti.

### Pianificazione

Per definire al meglio la pianificazione degli eventi, vengono individuate tre fasi ciascuna con una specifica revisione al completamento:

- RTB (Requirements and Technology Baseline)

- PB (Product Baseline)

- CA (Customer Acceptance)

### Sprint

#### Verso la RTB

##### Sprint 1

Periodo: 18/11/2024 - 06/12/2024

Iniziato a seguito dell'aggiudicazione del capitolato d'appalto; in questo sprint l'obiettivo principale è quello di organizzare al meglio tutti gli strumenti da utilizzare durante tutto il progetto es. Jira, GitHub... . Inoltre si vuole anche cominciare a produrre la documentazione quale: Norme di progetto, Piano di Progetto, Glossario e Piano di Qualifica. A seguito della prima riunione con l'azienda proponente, buona parte del tempo che i membri utilizzeranno sarà destinato allo studio delle tecnologie concordate con l'azienda. Inizialmente lo sprint doveva avere durata di due settimane ma si è deciso di allungarlo a seguito di un prolungamento dovuto allo spostamento della riunione con l'azienda alla settimana successiva. Durante questa settimana si è deciso di cominciare con l'analisi dei requisiti attraverso gli use case.

##### Sprint 2

Periodo 06/12/2024 - 22/12/2024

In questo periodo, il gruppo si concentrerà su attività fondamentali per proseguire lo sviluppo e l'avvicinamento al Proof of Concept. In primo luogo, verrà dato seguito alla scrittura della documentazione avviata in precedenza, con particolare attenzione all'aggiornamento e al completamento delle Norme di Progetto, del Piano di Progetto, del Glossario e del Piano di Qualifica.
Parallelamente, si continuerà l'analisi delle tecnologie già avviata nel periodo precedente. A questa analisi saranno integrate nuove tecnologie emerse durante le recenti riunioni, con l'obiettivo di valutarne l'efficacia e l'applicabilità alle esigenze del progetto. Il gruppo, inoltre procederà nella stesura del diagramma use case.
Infine, una parte del tempo sarà dedicata ad attività di ricerca focalizzate su questioni architetturali cruciali, con l'obiettivo di individuare soluzioni tecniche preliminari che garantiscano un'architettura modulare e scalabile. Questo lavoro iniziale consentirà di orientare le decisioni progettuali, valutando le possibili alternative e ponendo le basi per lo sviluppo del sistema.

## Preventivo

### Verso la RTB

#### Sprint 1

A seguito si riporta la tabella del preventivo per il primo sprint

| Ruolo                     | Ore svolte | Costo  |
| ------------------------- | ---------- | ------ |
| Responsabile di progetto  | 4          | 120    |
| Amministratore di sistema | 4          | 80     |
| Analista                  | 4          | 100    |
| Progettista               | 0          | 0      |
| Programmatore             | 1          | 15     |
| Verificatore              | 5          | 75     |
| Totale                    |            | 390    |
| Bilancio                  |            | 12 410 |

#### Sprint 2

A seguito si riporta la tabella del preventivo per il secondo sprint

| Ruolo                     | Ore svolte | Costo  |
| ------------------------- | ---------- | ------ |
| Responsabile di progetto  | 4          | 120    |
| Amministratore di sistema | 4          | 80     |
| Analista                  | 5          | 125    |
| Progettista               | 2          | 50     |
| Programmatore             | 1          | 15     |
| Verificatore              | 2          | 30     |
| Totale                    |            | 420    |
| Bilancio                  |            | 12 020 |

### Consuntivo

### Verso la RTB

#### Consultivo sprint 1

Di seguito vengono indicate le spese effettive del primo sprint

| Ruolo                     | Totale ore ruolo | Diff. ore | Costo orario | Costo | Diff. costo |
| ------------------------- | ---------------- | --------- | ------------ | ----- | ----------- |
| Responsabile di progetto  | 3                | -1        | 30           | 90    | -30         |
| Amministratore di sistema | 2                | -2        | 20           | 40    | -40         |
| Analista                  | 1                | -3        | 25           | 25    | -75         |
| Progettista               | 7                | +7        | 25           | 175   | +175        |
| Programmatore             | 0                | -1        | 15           | 0     | -15         |
| Verificatore              | 2                | -3        | 15           | 30    | -45         |
| Totale consuntivo         |                  | -3        |              | 360   | -30         |

**Resoconto**

Essendo il primo sprint, abbiamo riscontrato alcune discrepanze tra preventivo e consuntivo, evidenzia una riduzione complessiva di 3 ore rispetto alle stime iniziali, accompagnata da una diminuzione dei costi totali di 30 €. Il Progettista è l’unico ruolo con un incremento significativo di ore (+7), comportando un aumento di 175 € nei costi. In contrasto, tutte le altre figure hanno lavorato meno del previsto, con il Verificatore (-3 ore) e l’Analista (-3 ore) che mostrano le variazioni più significative in termini di impegno.
Queste differenze sono tipiche del primo ciclo e rappresentano un'opportunità per affinare la capacità di stima nei prossimi sprint.

</NumberedWrapper>
