---
id: norme_di_progetto
title: "Norme di Progetto - v1.8.1"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.8.1
classification: Interno
---

import Term from "@lunaticmuch/docusaurus-terminology/components/tooltip.js";


<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento delle Norme di Progetto

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                        | Autore         | Data Verifica | Verificatore          |
| ---------- | -------- | -------------------------------------------------- | -------------- | ------------- | --------------------- |
| 07/03/2025 | 1.8.1    | Aggiunta sezione PoC                               | Monetti Luca   | 07/03/2025    | Marcon Giulia         |
| 27/02/2025 | 1.8.0    | Revisione del documento                            | Carraro Agnese | 28/02/2025    | Monetti Luca          |
| 23/02/2025 | 1.7.1    | Procedure per la rendicontazione delle ore         | Pistori Gaia   | 25/02/2025    | Carraro Agnese        |
| 20/02/2025 | 1.7.0    | Aggiunto tracciamento e rendicontazione delle ore  | Marcon Giulia  | 25/02/2025    | Carraro Agnese        |
| 06/02/2025 | 1.6.0    | Aggiunta processi di Supporto                      | Monetti Luca   | 08/02/2025    | Carraro Agnese        |
| 20/01/2025 | 1.5.0    | Aggiunta processi Primari                          | Pistori Gaia   | 21/01/2025    | Monetti Luca          |
| 30/12/2024 | 1.4.0    | Completamento processi Organizzativi               | Carraro Agnese | 30/12/2024    | Pistori Gaia          |
| 27/12/2024 | 1.3.0    | Corretta la formattazione del documento            | Monetti Luca   | 28/12/2025    | Pistori Gaia          |
| 19/12/2024 | 1.2.0    | Revisione struttura + Aggiunta sezione GitHub      | Monetti Luca   | 22/12/2024    | Vasquez Manuel Felipe |
| 20/11/2024 | 1.1.0    | Aggiunta sezione 4                                 | Piola Andrea   | 03/12/2024    | Pistori Gaia          |
| 14/11/2024 | 1.0.0    | Prima stesura del documento con indice e sezione 1 | Piola Andrea   | 19/11/2024    | Pistori Gaia          |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>

<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del Documento

Lo scopo del documento è quello di definire le norme che ogni componente del gruppo TechWave dovrà rispettare per ottenere un <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> finale fatto a regola d'arte. In questo documento, inoltre, vengono descritte le convenzioni da rispettare nell'utilizzo degli strumenti e vengono esposti i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> che saranno adottati dal gruppo. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> possono cambiare oppure si possono aggiungere/rimuovere le norme a seconda delle necessità.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">capitolato</Term> \*\*\_Requirement Tracker - Plug-in VSCode\*\*\* propone lo sviluppo di un <Term popup="Componente software aggiuntivo che estende le funzionalità di un'applicazione principale." reference="/docs/RTB/Termini/Plugin">plugin</Term> per <Term popup="Visual Studio Code. Editor di codice sorgente sviluppato da Microsoft, gratuito, open-source, leggero e con una ampia gamma di estensioni." reference="/docs/RTB/Termini/VSCode">VSCode</Term> che permetta di tracciare i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti in blu.

### Riferimenti

Riferimenti normativi:

- <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">Capitolato</Term> d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Corso di Ingegneria del software - Regolamento di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/PD1.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/PD1.pdf)

Riferimenti informativi:

- Corso di Ingegneria del software - <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">Processi</Term> di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

## 2 Processi Primari

### 2.1 Fornitura

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di fornitura definisce un insieme di metodi, pratiche e procedure finalizzati a garantire la consegna del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software richiesto dal <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>.
Questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> si occupa del monitoraggio e del coordinamento delle <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> svolte dal gruppo durante l'intero ciclo di vita del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>, assicurando che il risultato finale sia conforme alle aspettative del <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>.

### Attività

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term>, durante il ciclo di vita del software affronta varie fasi:

1. **Avvio del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>**:
   Le prime <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> da svolgere riguardano l'individuazione delle necessità e dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> del cliente. Queste informazioni si ottengono inizialmente dal <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">Capitolato</Term> per poi essere definite con maggiore dettaglio tramite colloqui o email.
2. **Preparazione della risposta alle richieste**:
   In seguito, vengono create delle proposte che rispondano alle richieste del cliente. In esse verranno definiti i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> e le condizioni contrattuali. Questa fase è particolarmente utile per stabilire quali punti sono di maggiore interesse per il cliente e quali sono più facilmente implementabili dal team.
3. **Contrattazione**:
   In questa <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> avviene la negoziazione dei termini contrattuali e viene stabilito un accordo sui <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> e sulle condizioni di consegna.
4. **Pianificazione**:
   Una volta definite le aspettative del cliente si avvia la pianificazione. Questa è un'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> cruciale che porta alla creazione del documento di Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> nel quale vengono definiti i tempi, le risorse e i costi come specificato nel paragrafo [3.1.5.1.8](#documento-di-piano-di-progetto).
5. **Esecuzione e controllo**:
   In questa fase viene attuato quanto definito dal documento del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>. Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> svolte richiedono una supervisione, sia per controllare il rispetto delle tempistiche, sia per accertarsi dell'effettivo rispetto del Piano di Qualifica.
6. **Revisione e valutazione**:
   Durante il ciclo di vita del software saranno necessarie revisioni periodiche per valutare lo stato del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>, sia in termini di obiettivi conclusi sia per individuare il prima possibile eventuali problemi o <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> e attuare strategie risolutive.
7. **Consegna e completamento**:
   Il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software e la sua documentazione, una volta completata la validazione, verranno consegnate al cliente.

### Comunicazione con l'azienda

L'intero <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> è accompagnato da una forte e costante comunicazione con l'azienda. Questo è necessario sia per avere una definizione chiara delle esigenze, sia per ottenere feedback di quanto <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> nelle varie fasi per accertarsi che siano allineate con le aspettative.

All'azienda viene fornito un puntatore contenente tutta la documentazione di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> prodotta. In particolare, hanno maggiore interesse:

- I **<Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> esterni** che riassumono quanto definito durante il meeting e che necessitano la firma dell'azienda in quanto fonte per la definizione dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term>;
- Il documento di **Analisi dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">Requisiti</Term>**;
- Il documento di **Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>**.

### Strumenti

Lo scambio di informazioni avviene tramite l'uso di molteplici piattaforme:

- **<Term popup="Programma software per la videotelefonia." reference="/docs/RTB/Termini/Zoom">Zoom</Term>** meeting per fare videochiamate, sia conoscitive, che di avanzamento solitamente svolte alla fine di ogni <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>;
- Servizio interno dell'azienda per la prenotazione dei meeting;
- **Google Gmail** per l'invio di <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> e documenti e principale piattaforma per la comunicazione asincrona;
- **Git** per la consegna del <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term> e del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> finito;
- **<Term popup="Piattaforma di collaborazione digitale progettata per facilitare la comunicazione e la gestione remota dei progetti." reference="/docs/RTB/Termini/Miro">Miro</Term>**, una board virtuale utilizzata per lo scambio rapido di informazioni e risorse;
- **Google slides** per la creazione di presentazioni in supporto alle videochiamate.

### Sviluppo

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di sviluppo riguarda l'effettiva realizzazione del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software. Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> fondamentali sono:

- **<Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">Analisi dei Requisiti</Term>**:
  in seguito ad un brainstorming interno al team, avviene la definizione delle aspettative del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software. Viene redatto il documento di Analisi dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> come specificato nel paragrafo [3.1.5.1.7](#documento-di-analisi-dei-requisitianalisi_dei_requisiti).

#### Strumenti

Per la creazione dei diagrammi UML è stato utilizzato **StarUML**.

## Processi di Supporto

### Documentazione

#### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di documentazione mira a raccogliere, organizzare e rappresentare in forma scritta tutte le informazioni prodotte da un <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> o da un'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> durante il ciclo di vita di un <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software. La documentazione prodotta ha lo scopo di fornire una comprensione del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> a sviluppatori, distributori ed utenti senza la necessità di supporto umano.
Le norme definite all'interno di questo documento saranno applicate da tutti i membri del gruppo per la redazione e la modifica di tutta la documentazione prodotta.
Si intende adottare un approccio **Documentazione come Codice** per la redazione della documentazione. Questo consiste nel trattare la documentazione di un <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> software alla stregua del codice sorgente del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> tramite l'utilizzo di pratiche e strumenti tipici dello sviluppo software.
L'approccio **Documentazione come Codice** permette di ottenere una migliore tracciabilità delle modifiche, maggiore coerenza e una facile manutenzione tramite l'utilizzo di:

- <Term popup="Processo di gestione delle diverse versioni delle componenti di un progetto software, per tenere traccia delle modifiche e consentire la collaborazione." reference="/docs/RTB/Termini/Versionamento">Versionamento</Term>
- Automazioni
- Integrazione Continua

#### Sorgente Documenti

La documentazione sarà redatta utilizzando il linguaggio **MarkDown** la cui semplicità consente di velocizzare il processo di scrittura garantendo, al contempo, la portabilità e la facilità di conversione in formati diversi.

La documentazione prodotta, archiviata nello stesso <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>, è pensata per essere visualizzata tramite un sito web generato a partire dai file sorgenti tramite l'utilizzo di **<Term popup="Framework open-source che permette di creare, distribuire e mantenere siti web di documentazione." reference="/docs/RTB/Termini/Docusaurus">Docusaurus</Term>**. Ogni documento è formato da un singolo file sorgente a partire da un template predefinito.

#### Ciclo di vita dei Documenti

Il ciclo di vita dei documenti può essere rappresentato come una sequenza di <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>. Adattando un approccio incrementale alla redazione della documentazione queste fasi vengono ripetute in modo ciclico:

1. **Redazione**: Ogni documento viene redatto osservando la sua struttura, specificata nella sezione corrispondente, e le norme definite.
2. **<Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">Verifica</Term>**: Al termine della fase precedente il documento viene revisionato dai verificatori che assicurano il rispetto delle norme e degli standard di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> definiti.
3. **Approvazione**: Al termine della fase precedente il Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> approva il documento che verrà quindi inserito nel branch di rilascio del <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> dove verrà compilato, tramite automazione, e distribuito nelle varie forme definite.

#### Procedure correlate alla redazione dei documenti

##### Redattore

Il redattore è responsabile della redazione o modifica di un documento o di una sua sezione. Adottando un approccio **Documentazione come Codice** si utilizza il workflow **GitFlow** definito nella sezione [4.3](#tracciamento-e-rendicontazione-delle-ore).

###### Redazione di un nuovo documento o modifica di un documento esistente

Partendo dal branch develop del <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> il redattore crea un nuovo branch seguendo la procedura definita nella sezione [3.2.6.1](#creazione-di-un-nuovo-branch-di-sviluppo).
Dopo aver creato o modificato il documento è necessario portare le modifiche in remoto:

```bash
git add .
git commit -m "[xxx] Esempio di commit"
git push origin  TWD-xx-Esempio-di-branch
```

##### Modifica ad un documento in stato di redazione

Se più redattori lavorano allo stesso ticket dovranno apportare le modifiche all'interno dello stesso branch:

```bash
git fetch
git checkout  TWD-xx-Esempio-di-branch
git pull
```

Se più redattori lavorano nello stesso documento su ticket differenti lavoreranno su due branch distinti utilizzando la metodologia descritta nella sezione [3.1.4.1.1](#redazione-di-un-nuovo-documento-o-modifica-di-un-documento-esistente).

##### Completamento attività di redazione

Al termine dell'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> richiesta dal ticket il documento deve essere versionato e sottoposto a <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> da parte di un revisore.
Il redattore:

1. Aggiorna il registro modifiche, sezione [3.1.5.1.5](#registro-delle-modifiche), inserendo i dati richiesti in una nuova riga.
2. Incrementa la versione del documento sia nel registro modifiche sia nei metadati utilizzando la convenzione definita in [3.2.5.2](#sistema-di-versionamento).
3. Porta le modifiche nella <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> remota utilizzando la metodologia descritta in [3.1.4.1.1](#redazione-di-un-nuovo-documento-o-modifica-di-un-documento-esistente).
4. Crea una Pull Request verso develop seguendo la procedura definita nella sezione [3.2.6.2](#creazione-di-una-nuova-pull-request).

Se il documento viene approvato lo stato del ticket diventa "ToDeploy" ed il codice sorgente viene unito a develop. In caso contrario il redattore deve modificare il documento seguendo le indicazioni dei revisori e ripetere la procedura precedente.

#### Struttura del documento

Ogni documento <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> possiede una struttura prefissata che ne garantisce la coerenza ed il rispetto delle norme definite.

##### Metadati

Ogni file sorgente contiene una sezione dedicata alla definizione dei metadati del documento. Questa sezione fornisce una serie di informazioni aggiuntive e strutturate utilizzate per gestire dettagli relativi al ciclo di vita di un documento. Questi metadati possono essere utilizzati per generare automaticamente la documentazione in formato pdf e le pagine web accessibili attraverso il sito dedicato.

Di seguito vengono elencati tutti i metadati utilizzabili all'interno dei documenti divisi in due categorie:

- **Obbligatori**: Necessario inserire questi metadati all'interno dei documenti per eseguire correttamente il processo di build.
- **Opzionali**: Metadati che modificano lo stile di documento generato o alcune sue <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term>.

**Obbligatori**:

- **id**: Questo campo definisce l'id associato al documento. Viene visualizzato nel URL della pagina corrispondente. Per convenzione viene scritto utilizzando solo caratteri minuscoli sostituendo gli spazi con il carattere "\_".
- **title**: Rappresenta il titolo del documento. Visualizzato come nome del documento all'interno della sidebar del sito web.
- **documentclass**: Questo campo definisce la classe del documento utilizzata per la generazione del pdf. L'unica classe disponibile al momento è **TWDocumentFull**.
- **version**: Rappresenta la versione del documento e deve corrispondere alla versione indicata nella prima riga della tabella changelog.
- **classification**: Rappresenta la classificazione del documento. Un documento può essere **Interno** o **Esterno**.

**Opzionali**:

- **toc**: Se impostato al valore true indica che il documento pdf generato deve contenere una Tabella dei contenuti.
- **lof**: Se impostato al valore true indica che il documento pdf generato deve contenere una Tabella delle figure.
- **numbersections**: Se impostato al valore true indica che il documento pdf generato deve avere la titolazione numerata.
- **show-partecipants**: Se impostato al valore true indica che il documento pdf generato deve mostrare una lista dei partecipanti.
- **participants**: Metadato presente solo all'interno dei <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> interni ed esterni. Rappresenta i membri del gruppo presenti durante il meeting. Deve essere scritto utilizzando il seguente formato:

```markdown
partecipants:

- name: Cognome Nome
  status: present | absent
```

- **duration**: Metadato presente solo all'interno dei <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> interni ed esterni. Rappresenta la durata della riunione scritta nel formato **\[numero ore\]h**.

###### Intestazione

In ogni pagina del documento, fatta eccezione per il frontespizio, è presente un'Intestazione che presenta il logo del gruppo sul lato sinistro.

###### Piè di pagina

In ogni pagina del documento, fatta eccezione per il frontespizio, è presente un Piè di Pagina che presenta:

- La dicitura: Nome del gruppo - Titolo del documento / versione del documento sul lato sinistro.
- Il numero di pagina sul lato destro.

###### Frontespizio

Il Frontespizio, la prima pagina del documento, presenta:

- Il **logo di Unipd** nella parte sinistra della prima sezione.
- Il **logo** del gruppo **TechWave** sulla parte destra della prima sezione.
- La **email** del gruppo **TechWave**.
- Il **titolo** del **documento**.
- La sezione **dettagli documento**.

La sezione dettaglio documento contiene le informazioni principali del documento:

- **Redatto da:** rappresenta il redattore principale del documento. In caso di omissione il documento è da intendere come redatto da diversi membri del gruppo.
- **Revisionato da**: rappresenta i verificatori che hanno revisionato il documento. In caso di omissione il documento è da intendere come revisionato da diversi membri del gruppo.
- **Durata riunione**: rappresenta la durata effettiva della riunione descritta nel documento. Presente solamente all'interno dei verbali interni ed esterni.
- **Classificazione**: rappresenta la classificazione del documento. Può assumere i valori Interno ed Esterno.
- **Versione**: Rappresenta la versione del documento corrente. Corrisponde alla versione presente nella prima riga del registro delle modifiche.

###### Toc e Lof

Il TOC (Tabella dei contenuti) rappresenta l'indice della pagina. La sua presenza agevola la navigazione all'interno del documento e ne fornisce una visione d'insieme. Deve essere presente in tutti i documenti fatta eccezione per:

- <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">Verbali</Term> Interni
- <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">Verbali</Term> Esterni
- Valutazione dei <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">capitolati</Term>
- Lettere di presentazione

La LOF (Elenco delle figure) rappresenta tutte le immagini presenti all'interno del documento riportandone il titolo e la pagina in cui si trova. Deve essere presente in tutti i documenti fatta eccezione per:

- <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">Verbali</Term> Interni
- <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">Verbali</Term> Esterni
- Valutazione dei <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">capitolati</Term>
- Lettere di presentazione

Sia il TOC sia la LOF sono generate, tramite automazione, a seguito dell'approvazione del documento e del suo passaggio al branch principale. La loro presenza deve essere dichiarata nei metadati del documento (vedi paragrafo Opzionali sulla sezione [3.1.5.1](#metadati)).

###### Registro delle modifiche

Il Registro delle modifiche, indicato con Changelog all'interno dei documenti, rappresenta la storia del documento. Viene rappresentato sotto forma di tabella nella quale ogni riga contiene:

- **Data Modifica**: Data in cui il documento è stato modificato.
- **Versione**: Versione del documento a seguito della modifica.
- **Descrizione**: Descrizione della modifica apportata.
- **Autore modifica**: Redattore della modifica.
- **Data <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">Verifica</Term>**: Data in cui il documento è stato verificato.
- **Autore <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">Verifica</Term>**: Revisione della modifica.

Il Registro delle modifiche è presente in ogni documento fatta eccezione per:

- Valutazione dei <Term popup="Documento che descrive in modo dettagliato i requisiti, le specifiche e le aspettative di un progetto." reference="/docs/RTB/Termini/Capitolato">capitolati</Term>
- Lettere di presentazione

###### Verbali

I <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> sono documento redatti a seguito di riunioni interne o esterne e ne riportano le discussioni e le decisioni prese. Sono composti da:

- **Tabella dei partecipanti**: Indica le presenze / assenze dei membri del gruppo alla riunione.
- **Ordine del giorno**: Indica i temi principali trattati durante la riunione.
- **Resoconto**: Descrive sinteticamente la riunione.
- **Conclusioni Raggiunte**: Rappresenta in forma schematica e riferibile le conclusioni raggiunte al termine della riunione.
- **Firma**: Presente solo nei <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> Esterni.

  Il nome del file deve rispettare la seguente struttura: AAAA-MM-GG_ID.md dove

  - **AAAA-MM-GG**: Data della riunione
  - **ID**: Indice progressivo che rappresenta il <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbale</Term>.

###### Documento di Analisi dei Requisiti

Il documento dell'Analisi dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">Requisiti</Term> è il risultato di quanto svolto nell'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> omologa. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>**.
- la **lista dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term>**, ciascuno associato ad un identificativo univoco e classificati per:
  - **tipologia**:
    - **Funzionali**: <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> che l'<Term popup="Estensione di VSCode con lo scopo di individuare e tracciare l'implementazione dei requisiti all'interno di un progetto software." reference="/docs/RTB/Termini/Applicativo">Applicativo</Term> deve fornire.
    - **Tecnici**: vincoli riguardo le tecnologie che l'<Term popup="Estensione di VSCode con lo scopo di individuare e tracciare l'implementazione dei requisiti all'interno di un progetto software." reference="/docs/RTB/Termini/Applicativo">Applicativo</Term> deve utilizzare.
    - **Qualitativi**: vincoli riguardo obiettivi minimi di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term>.
  - **obbligatorietà**:
    - **Obbligatori**: irrinunciabile per qualcuno degli stakeholder.
    - **Desiderabili**: non strettamente necessario ma con valore aggiunto riconoscibile.
    - **Opzionali**: utile o contrattabile più avanti.
- la **lista degli <Term popup="Tecnica per individuare i requisiti funzionali di un prodotto software analizzando il modo in cui gli attori interagiscono con il sistema." reference="/docs/RTB/Termini/Use_Case">Use Case</Term>**, ciascuno descritto tramite il rispettivo <Term popup="Tecnica per individuare i requisiti funzionali di un prodotto software analizzando il modo in cui gli attori interagiscono con il sistema." reference="/docs/RTB/Termini/Use_Case">use case</Term> diagram (UML) e accompagnato dalla sua descrizione testuale dove vengono specificati:
  - **Attori primari**: utente principale.
  - **Attori secondari** \[se presenti\]: utente secondario.
  - **Precondizioni**
  - **Postcondizioni**
  - **Scenario principale**
  - **User story**
  - **Generalizza** \[se presente\]: <Term popup="Tecnica per individuare i requisiti funzionali di un prodotto software analizzando il modo in cui gli attori interagiscono con il sistema." reference="/docs/RTB/Termini/Use_Case">use case</Term> genitore.
  - **Estensioni** \[se presenti\]: <Term popup="Tecnica per individuare i requisiti funzionali di un prodotto software analizzando il modo in cui gli attori interagiscono con il sistema." reference="/docs/RTB/Termini/Use_Case">use case</Term> che arrivano dal costrutto extend.

###### Documento di Piano di Progetto

Il documento di Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> rappresenta tutta la parte di pianificazione e di analisi del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> prodotta dal responsabile. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>**.
- una sezione contenente l'**analisi dei <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term>**: in essa è presente la lista dei <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> raggruppati per tipologia: organizzativi ed interpersonali, tecnologici. Per ciascun <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term> viene specificata la descrizione, il grado di <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term>, la sua pericolosità e una <Term popup="Procedura di riduzione dell'impatto negativo di un problema." reference="/docs/RTB/Termini/Mitigazione">mitigazione</Term>.
- una sezione dedicata al **modello di sviluppo scelto**, ovvero <Term popup="Framework agile per la gestione di progetti complessi, suddivisi in iterazioni chiamate sprint per favorire lo sviluppo incrementale." reference="/docs/RTB/Termini/Scrum">SCRUM</Term>, e la **lista degli <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>** svolti.
- una sezione contenente il **<Term popup="Documento in cui si trovano le stime del costo di determinate attività." reference="/docs/RTB/Termini/Preventivo">preventivo</Term> dei costi e delle ore** di ciascun ruolo definite al momento della pianificazione dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.
- una sezione contenente il **<Term popup="Rendiconto dei risultati di un determinato periodo di attività." reference="/docs/RTB/Termini/Consuntivo">consuntivo</Term> dei costi e delle ore** effettivamente svolte da ciascun ruolo, calcolate durante la <Term popup="Tecnica Agile messa in atto alla fine di uno sprint per capire cosa è andato bene durante esso e cosa si può migliorare in quelli successivi." reference="/docs/RTB/Termini/Retrospettiva">retrospettiva</Term>.

##### Piano di Qualifica

Il Piano di Qualifica contiene tutte le strategie di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> e validazione utilizzate all'interno del ciclo di vita del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> al fine di garantire la conformità del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> alle aspettative del <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>.

##### Glossario

Il Glossario contiene tutte le definizioni dei termini utilizzati all'interno della documentazione del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> al fine di evitare ambiguità e chiarire l'utilizzo di una terminologia specifica.

#### Regole tipografiche

##### Stile del testo

L'utilizzo della formattazione all'interno della documentazione assume significati differenti a seconda del tipo di visualizzazione.

Per la visualizzazione all'interno del sito web:

- Grassetto:
  - Parole o frasi di rilievo
  - Titoli delle sezioni
- Corsivo:
  - Parole o frasi enfatizzate
- Grassetto colorato:
  - Parola appartenente al glossario
- Corsivo colorato:
  - Link

Per i documenti in versione pdf:

- Grassetto:
  - Parole o frasi di rilievo
  - Titoli delle sezioni
- Corsivo:
  - Parole o frasi da enfatizzare
- Corsivo seguito da pendice \[G\]:
  - Parola appartenente al glossario

#### Strumenti

Gli strumenti utilizzati per le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di redazione dei documenti sono i seguenti:

- **<Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>**: Utilizzato per il <Term popup="Processo di gestione delle diverse versioni delle componenti di un progetto software, per tenere traccia delle modifiche e consentire la collaborazione." reference="/docs/RTB/Termini/Versionamento">versionamento</Term>, la distribuzione e la compilazione dei documenti.
- **Markdown**: Utilizzato per la redazione dei documenti.
- **<Term popup="Visual Studio Code. Editor di codice sorgente sviluppato da Microsoft, gratuito, open-source, leggero e con una ampia gamma di estensioni." reference="/docs/RTB/Termini/VSCode">VSCode</Term>**: Editor di testo utilizzato per la scrittura dei documenti.
- **Pandoc**: Utilizzato per la conversione da Markdown a PDF.
- **<Term popup="Framework open-source che permette di creare, distribuire e mantenere siti web di documentazione." reference="/docs/RTB/Termini/Docusaurus">Docusaurus</Term>**: Utilizzato per la generazione di un sito statico a partire da file Markdown.

### <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">Verifica</Term>

#### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> si pone l'obiettivo di garantire che ogni <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> o servizio di un <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> o di un <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> sia conforme ai <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> specificati. Questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> accompagna l'intero ciclo di vita di un <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software fino alla fase di manutenzione.

La <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> viene eseguita su tutti i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> in esecuzione al raggiungimento di un sufficiente grado di maturità. Seguendo le linee guida, definite all'interno del Piano di Qualifica, viene analizzata la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> dei <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotti</Term> e dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> al fine di garantire la conformità agli standard di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> definiti.

Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> sono svolte dai verificatori seguendo l'ordine indicato dal **Modello a V** ed i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> definiti all'interno del Piano di Qualifica.

#### Verifica dei documenti

Il verificatore ha il compito di effettuare la revisione dei documenti al termine della loro redazione al fine di garantire la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> e la conformità alle norme del loro contenuto.

Quando il redattore termina la sua <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> e crea una Pull Request (vedi sezione [3.1.4.3](#completamento-attività-di-redazione)) il verificatore assegnato riceve una e-mail. Il verificatore può visualizzare le modifiche apportate all'interno della scheda "Pull Request" presente nella pagina <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>.

Per verificare un documento è necessario revisionare:

- **Correttezza Tecnica**: Verificare che la Pull Request rispetti gli standard di nomenclatura, sia richiesta l'unione con il branch develop, non siano presenti conflitti con l'attuale stato del branch e tutti i <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> automatici siano stati eseguiti con successo.
- **Conformità alle norme**: Verificare che il documento segua le linee guida definite dagli standard per la formattazione, la struttura e lo stile.
- **Consistenza**: Verificare che il contenuto del documento sia consistente con tutti gli altri documenti presenti.
- **Comprensibilità**: Verificare che il documento sia chiaro, comprensibile e non ambiguo. Il documento non deve contenere errori grammaticali e/o ortografici.

Al termine, se questi criteri sono soddisfatti, il verificatore deve approvare la Pull Request ed effettuare l'unione sul branch develop. In caso contrario il verificatore ha il compito di inserire commenti e suggerimenti sulle modifiche da apportare.

Questo processo si ripete fino alla soddisfazione dei criteri di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term>.

#### Analisi

##### Analisi Statica

L'Analisi Statica è un'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di controllo condotta sul <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> senza la necessità di eseguirlo. Si basa sull'utilizzo di metodo di lettura, manuali o automatici, che permettono di individuare errori formali, difetti o proprietà indesiderate all'interno dei documenti. Il successo di questa <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> dipende dalla competenza e dall'attenzione dei verificatori coinvolti.

##### Analisi Dinamica

L'Analisi Dinamica è un'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di controllo condotta sul <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> durante la sua esecuzione effettiva al fine di verificarne il corretto funzionamento.

Questa <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> consiste nell'esecuzione di una serie di <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> al fine di individuare eventuali discrepanze tra risultati previsti e risultati effettivi.

Ogni <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> deve essere ben definito, deterministico e automatizzato al fine di rendere l'Analisi Dinamica ripetibile ed oggettiva. La definizione di un <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> corrisponde a:

- Descrizione dell'input
- Descrizione dell'output
- Condizioni di Esecuzione

###### Test di unità

I <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">Test</Term> di Unità sono progettati per verificare una singola <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term>, in modo isolato dal sistema, al fine di garantire il corretto funzionamento e l'aderenza alle specifiche. Questi <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> vengono pianificati durante la **Progettazione di Dettaglio**, sono completamente automatizzabili e devono essere eseguiti per primi in quanto verificano il corretto funzionamento della singola unità.

###### Test di integrazione

I <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">Test</Term> di Integrazione sono progettati per verificare il corretto funzionamento delle diverse <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> quando sono integrate tra loro. Questi <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> vengono pianificati durante la fase di Progettazione Architetturale tramite approccio:

- **Top-Down**: Si inizia integrando le componenti di maggior valore esterno effettuando <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> prolungati sulle <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> principali. Necessita della simulazione di tutte le parti non ancora implementate tramite l'utilizzo di Mock.
- **Bottom-Up**: Si inizia integrando le componenti di basso livello, più lontane dell'utente. Questo riduce la necessità di Mock ma ritarda la <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> sulle <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> principali.

###### Test di sistema

I <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">Test</Term> di Sistema sono progettati per verificare il sistema nella sua interezza rispetto ai <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> software individuati durante l'<Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">Analisi dei Requisiti</Term>. Questi <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> hanno lo scopo di garantire che il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> esegua le funzioni previste in modo <Term popup="Capacità di raggiungere un obiettivo prefissato." reference="/docs/RTB/Termini/Efficacia">efficace</Term> e affidabile in un ambiente realistico.

###### Test di Accettazione

I <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">Test</Term> di Accettazione sono progettati per dimostrare che i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> individuati sono stati soddisfatti e garantire che il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> sia conforme alle aspettative degli stakeholder. Questi <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> vengono eseguiti coinvolgendo gli utenti finali e determinano se il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> può essere rilasciato.

###### Codici identificativi

Ad ogni <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> viene associato un codice identificativo al fine di permettere il riferimento univoco ad un <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term>. Questo codice rispetta la seguente struttura: **T\[ Tipologia \]\[ ID \]**

Dove:

- \[ Tipologia \]: Rappresenta il tipo di <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term>:
  - U: Unità
  - I: Integrazione
  - S: Sistema
  - A: Accettazione
- \[ ID \]: Numero progressivo associato al t<Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term>est all'interno del suo tipo.

###### Stato dei test

Ad ogni <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> viene associato uno stato che ne riflette il risultato di esecuzione all'interno del Piano di Qualifica. Ogni può essere associato con uno di questi stati:

- **NI**: Non implementato
- **S**: Superato
- **NS**: Non Superato

#### Validazione

##### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Validazione conferma, tramite una dimostrazione oggettiva, che i requisiti specificati sono stati soddisfatti e che il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software risponde alle esigenze degli utenti finali.

##### Procedura di Validazione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di validazione prende come input i <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> effettuati sul <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> e valuta:

- Il grado di soddisfacimento dei Casi D'Uso.
- Il grado di soddisfacimento dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> obbligatori.
- Il grado di soddisfacimento dei <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> concordati con il <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>.

Se il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> ha esito positivo il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> risponde in modo adeguato a tutte le esigenze degli utenti inizialmente identificate.

#### Gestione della configurazione

##### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Gestione della configurazione si occupa di identificare, organizzare e controllare le modifiche apportate a tutti gli artefatti coinvolti nel ciclo di vita del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>.

##### Sistema di Versionamento

Il sistema di <Term popup="Processo di gestione delle diverse versioni delle componenti di un progetto software, per tenere traccia delle modifiche e consentire la collaborazione." reference="/docs/RTB/Termini/Versionamento">versionamento</Term> rappresenta le convenzioni utilizzate per la gestione delle versione di tutti i vari artefatti. La struttura utilizzata è rappresentata da: **X.Y.Z**.

- **X (Major)**: Indica una modifica significativa, spesso incompatibile con le versioni precedenti. Introduce nuove <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> o cambiamenti radicali.
- **Y (Minor)**: Indica l'aggiunta o la modifica di una <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> compatibile con le versioni precedenti. Non altera il comportamento esistente.
- **Z (Patch)**: Indica la correzione di un bug o un miglioramento minore che non introduce nuove <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> e non modifica il comportamento esistente.

L'incremento di valori più significativi azzera quelli meno significativi. Tutte le modifiche devono essere riportate all'interno del registro delle modifiche. Ogni documento entra nella <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> con una versione 1.0.0 o superiore.

##### Repository

Ogni <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> sarà interamente contenuto all'interno di un unico <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> al fine di raggruppare tutti i sorgenti necessari all'interno dello stesso archivio. Verrà inoltre utilizzato un <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> diverso per il <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">PoC</Term> in quanto rappresenta un prodotto usa e getta.
Di seguito sono elencati tutti i <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> attualmente presenti:

- tech-wave-swe.github.io: <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">Repository</Term> principale che raccoglie tutto il codice sorgente prodotto durante il ciclo di vita del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>. La separazione tra documentazione e software è garantita da una struttura organizzata in cartelle dedicate, mentre l'utilizzo delle <Term popup="Piattaforma di integrazione continua e consegna continua (CI/CD) che consente di automatizzare il processo di build, test e distribuzione." reference="/docs/RTB/Termini/GitHub_Action">GitHub Action</Term> consente di gestire le diverse automazioni in modo autonomo ed <Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficiente</Term>.
  Riferimento: [https://github.com/tech-wave-swe/tech-wave-swe.github.io](https://github.com/tech-wave-swe/tech-wave-swe.github.io).
- poc: Contiene tutto il codice sorgente necessario al <Term popup="Proof of Concept. Dimostrazione preliminare che ha lo scopo di verificare la fattibilità di un concetto o di un'idea." reference="/docs/RTB/Termini/POC">Poc</Term>.
  Riferimento: [https://github.com/tech-wave-swe/tech-wave-swe.github.io](https://github.com/tech-wave-swe/poc).
- DocumentStyle: Contiene le classi utilizzate per la generazione dei PDF.
  Riferimento: [https://github.com/tech-wave-swe/DocumentStyle](https://github.com/tech-wave-swe/DocumentStyle).

#### Sincronizzazione e Branching

##### Creazione di un nuovo branch di sviluppo

Partendo dal branch develop del <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> il redattore crea un nuovo branch utilizzando l'interfaccia di <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> o la CLI di <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>.

Tramite <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> sarà necessario aprire il ticket corrispondente, selezionare "Create Branch" nella sezione Details >> Development. Nella nuova pagina selezionare la <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> corrente e il branch develop mantenendo il nome assegnato. Selezionare infine "Create Branch".
Tramite CLI di <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> sarà necessario spostarsi sul branch develop:

```bash
git checkout develop
```

Portare, se presenti, le ultime modifiche in locale:

```bash
git pull origin develop
```

Spostarsi sul nuovo branch utilizzando il seguente formato:

```bash
git checkout -B TWD-xx-Esempio-di-branch
```

##### Creazione di una nuova Pull Request

Le Pull Requests sono un meccanismo che consente di notificare il completamento di una <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> e richiederne la revisione. Un Pull Requesto fornisce un ambiente dedicato per discutere della <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> proposta, fornendo riscontri e apportando le modifiche necessarie.
Per creare una nuova Pull Request:

1. Accedere al <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> e selezionare la scheda "Pull Request".
2. Selezionare "New Pull Request".
3. Selezionare il branch di partenza ed il branch target, solitamente develop.
4. Cliccare il pulsante "Create Pull Request".
5. Aggiungere un titolo alla Pull Request. Assicurarsi che contenga il codice identificativo di tutti i ticket associati.
6. Aggiungere una descrizione.
7. Selezionare i verificatori.
8. Clicca il pulsante "Create Pull Request".
9. Nel caso siano presenti conflitti seguire le istruzioni in <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> per rimuovere tali conflitti.

##### Convenzioni sulla nomenclatura dei branch

All'interno di un <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> esistono diverse tipologie di branch:

- **main**: Rappresenta il branch principale. Contiene l'ultima versione approvata del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> e della documentazione annessa.
- **develop**: Rappresenta il branch principale di sviluppo. Contiene tutti i file sorgente che hanno passato il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term>. Il branch develop è l'unico branch che può richiedere una Pull Request al branch main.
- **feature**: Ogni branch feature rappresenta una <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> alla quale stanno lavorando uno o più membri del gruppo. Ogni branche feature è legato ad un ticket su <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> e deve possedere la seguente nomenclatura: **\[CODICE-TICKET\]-\[BREVE-DESCRIZIONE\]**.
  - \[CODICE-TICKET\]: Indica il codice del ticket su <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> corrispondente.
  - \[BREVE-DESCRIZIONE\]: Indica una breve descrizione del compito.

##### Flusso generale di sviluppo

Per ogni ticket assegnato all'interno di <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>:

1. Viene creato un nuovo branch seguendo le indicazioni fornite nella sezione [3.2.6.1](#creazione-di-un-nuovo-branch-di-sviluppo).
2. Si effettuano tutte le modifiche necessarie.
3. Si effettua una Pull Request verso develop quando il compito è completato per richiedere la revisione.
4. Se la revisione viene approvata il codice viene unito al branch develop. In caso contrario è necessario ripartire dal punto 2 ed effettuare le modifiche proposte.
5. Al termine dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> il Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> tutto ciò che è stato prodotto. In caso di approvazione le modifiche vengono inserite all'interno del branch main.

Durante questo processo la dashboard di <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> è costantemente aggiornata tramite automazioni. Il ciclo di vita di un ticket viene descritto nella sezione [4.2.2.4](#ciclo-di-vita-di-un-task).

### Risoluzione dei problemi

#### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Risoluzione dei Problemi si pone come obiettivo fornire un approccio tempestivo e documentato per analizzare e risolvere i problemi, di qualsiasi natura o fonte, che vengono rilevati durante l'esecuzione degli altri <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>.

Questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> non si limita alla sola risoluzione dei problemi ma si propone di identificare le cause e adottare misure preventive per evitarne la ripetizione in futuro promuovendo un ambiente di miglioramento continuo.

#### Gestione dei rischi

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Gestione dei <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">Rischi</Term> ha l'obiettivo di identificare, analizzare, trattare e monitorare tutti i potenziali <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> associandoli a delle specifiche misure di <Term popup="Procedura di riduzione dell'impatto negativo di un problema." reference="/docs/RTB/Termini/Mitigazione">mitigazione</Term>.

I <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> individuati all'interno del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> sono specificati all'interno del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> nella sezione dedicata.

##### Codifica dei Rischi

Per identificare univocamente ogni <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term> esso viene associato ad un codice identificativo basato sulla seguente convenzione: **R [ Tipologia ] [ Indice ] - [ Nome Associato ]**, dove:

- \[ Tipologia \] : Rappresenta il tipo di <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term> descritto.
  - T: <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">Rischio</Term> Tecnico
  - O: <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">Rischio</Term> Organizzativo
- \[ Indice \] : Numero progressivo interno alla Tipologia.
- \[ Nome Associato \] : Nome che descrive brevemente il <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischio</Term>.

#### Identificazione dei problemi

Ogni problema identificato durante lo svolgimento del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> da un membro del gruppo deve essere segnalato tramite apertura di un Ticket su <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> di tipo Bug.

#### Strumenti

- **<Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>**: ITS utilizzato all'interno del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> per il tracciamento delle azioni da svolgere e delle problematiche individuate.

### Gestione della qualità

#### Introduzione

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Gestione della <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">Qualità</Term> ha l'obiettivo di garantire la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del flusso operativo al fine di soddisfare i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> specificati. Questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> racchiude quindi tutte le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di definizione degli obiettivi di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term>, delle metriche e dei criteri di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term>, la pianificazione e l'esecuzione del controllo di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> e la <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> della <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term>.

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di Gestione della <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">Qualità</Term> interessa tutto il ciclo di vita del software.

#### Piano di Qualifica

Tutte le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di definizione, pianificazione, controllo e revisione di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> sono trattate all'interno del documento Piano di Qualifica. All'interno di questo documento sono definite in dettaglio le specifiche di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> associate alle azioni di controllo necessarie.

#### PDCA

L'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di miglioramento continuo e correzione adotta il ciclo PDCA: una metodologia che consente il controllo ed il miglioramento continuo dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> e dei <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotti</Term> basato sulle seguenti 4 fasi:

- **Plan**: Pianificazione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> da avviare per raggiungere obiettivi specifici.
- **Do**: Effettiva esecuzione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> pianificati, raccogliendo dati durante lo svolgimento dell'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>.
- **Check**: Analisi ed interpretazione dei dati raccolti durante l'esecuzione. I dati vengono valutati utilizzando metriche prestabilite e confrontati con gli obiettivi previsti.
- **Act**: Consolidazione delle modifiche risultate positive e implementazione di strategie migliorative per correggere gli aspetti che non hanno funzionato.

#### Strumenti

#### Struttura e identificazione delle metriche

Ogni metrica definita all'interno del Piano di Qualifica è identificata da un codice che rispetta la seguente convenzione: **M \[ Tipologia \] \[ Codice \] \[P|S|Q\] \[ Abbreviazione \]**, dove:

- \[ Tipologia \]: Rappresenta la tipologia di metrica considerata
  - PC
  - PR
- \[ Codice \]: Codice numerico progressivo interno alla Tipologia.
- \[ Abbreviazione \]: Iniziali del nome della metrica.

Ad ogni metrica è inoltre associato:

- **Nome**: Specifica il nome della metrica.
- **Descrizione**: Descrive brevemente la metrica adottata.
- **Formula**: Specifica come viene calcolata la metrica.
- **Valore Accettabile**: Valore che la metrica deve raggiungere per essere considerata conforme agli standard.
- **Valore Preferibile**: Valore ideale che la metrica dovrebbe assumere.

## 4 <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">Processi</Term> Organizzativi

### Introduzione

I <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> organizzativi sono trasversali rispetto al <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> e vengono applicati in modo tale da stabilire, controllare e migliorare i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> del ciclo di vita del software, ai quali, quindi, forniscono il supporto necessario. Questa sezione del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> definisce i seguenti <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> organizzativi: gestione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, infrastruttura, miglioramento dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> e formazione.

### Gestione dei processi

#### Introduzione

La gestione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> comprende le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> che definiscono il modo in cui bisogna implementare i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> primari del ciclo di vita del software. Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> che lo costituiscono sono la definizione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, la loro pianificazione, la loro esecuzione e controllo, la revisione e la valutazione dei <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotti</Term>, e la chiusura dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>.

La definizione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> è la prima <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> della gestione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>. Tramite questa <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> vengono stabiliti i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> necessari allo svolgimento del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> e vengono identificati i loro <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term>, controllandone la fattibilità.

La pianificazione consiste nella preparazione di un piano per l'esecuzione dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> nel quale vengono definite le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> e i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> che li costituiscono.

Con l'esecuzione viene avviata l'implementazione del <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, affiancata a un suo controllo continuo tramite l'identificazione, l'analisi e la risoluzione degli errori che sorgono man mano.

La revisione e la valutazione dei <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotti</Term> è necessaria per assicurarsi che essi soddisfino i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term>.

Quando tutti i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> e tutte le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> vengono conclusi e si ha un <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> completo, è possibile completare e chiudere il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term>.

#### Pianificazione

##### Introduzione

L'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di pianificazione è essenziale per poter svolgere al meglio le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> del ciclo di vita del software. Infatti, durante questa <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> il responsabile è incaricato di definire le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> e i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> a loro associati effettuando delle stime dei tempi necessari al loro completamento e un'<Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">analisi dei requisiti</Term> e delle risorse necessarie per completare i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>, e stabilendo i <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> a loro associati.
La pianificazione viene documentata nel Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>, aggiornato di volta in volta dal responsabile corrente.

##### Ruoli di progetto

I ruoli che ogni membro dovrà assumere almeno una volta durante tutta la durata del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>, rispettando quanto preventivato nella candidatura, sono:

**Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>**: figura di riferimento per il gruppo, <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term> e <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term> con lo scopo di mediare durante tutte le tipologie di comunicazioni. Ha il ruolo di guidare il <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> a livello macroscopico gestendo i vari <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, in particolare:

- Pianificare e coordinare le <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>;
- Gestire le interazioni tra membri e con l'esterno;
- Studiare e amministrare i <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term>;
- Approvare qualsiasi <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> completata e verificata.

**Amministratore (sysAdmin)**: figura professionale incaricata di amministrare l'ambiente di lavoro e garantire il rispetto delle norme del <Term popup="Way of Working. Insieme di pratiche e metodologie adottate dal team per organizzare il proprio lavoro e ottimizzare i processi collaborativi." reference="/docs/RTB/Termini/WoW">way of working</Term> per assicurare l'<Term popup="Capacità di raggiungere un obiettivo prefissato." reference="/docs/RTB/Termini/Efficacia">efficacia</Term> e l'<Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficienza</Term> dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, e in particolare di:

- Studiare ed implementare risorse per il miglioramento dell'ambiente di lavoro cercando di automatizzare i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> dove è possibile;
- Controllare il <Term popup="Processo di gestione delle diverse versioni delle componenti di un progetto software, per tenere traccia delle modifiche e consentire la collaborazione." reference="/docs/RTB/Termini/Versionamento">versionamento</Term> della documentazione e le configurazioni del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software;
- Controllare la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>;
- Far rispettare il <Term popup="Way of Working. Insieme di pratiche e metodologie adottate dal team per organizzare il proprio lavoro e ottimizzare i processi collaborativi." reference="/docs/RTB/Termini/WoW">way of working</Term> ai vari membri.

**Progettista**: figura professionale incaricata di gestire la progettazione del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software. I suoi incarichi sono:

- Produrre un'<Term popup="Design. Consiste nell'individuazione e nella definizione del funzionamento delle parti di un prodotto software." reference="/docs/RTB/Termini/Architettura">architettura</Term> che rispetti e soddisfi l'<Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">analisi dei requisiti</Term>;
- Prendere scelte riguardanti gli aspetti tecnici e tecnologici per ottenere <Term popup="Capacità di raggiungere un obiettivo prefissato." reference="/docs/RTB/Termini/Efficacia">efficacia</Term> ed <Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficienza</Term> massima;
- Redigere i documenti di specifica tecnica del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software.

**Analista**: figura professionale incaricata di svolgere l'omonima <Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">analisi dei requisiti</Term> comprendendo le necessità dell'azienda <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term>. I suoi incarichi sono:

- Redigere i documenti riguardanti l'<Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">analisi dei requisiti</Term>;
- Studiare il dominio d'interesse;
- Definire la complessità del problema e suddividerlo da un livello macroscopico a un livello microscopico, individuando i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> richiesti.

**Programmatore**: figura professionale incaricata di implementare tramite codice l'<Term popup="Design. Consiste nell'individuazione e nella definizione del funzionamento delle parti di un prodotto software." reference="/docs/RTB/Termini/Architettura">architettura</Term> definita in fase di design. I suoi incarichi sono:

- Produrre codice che soddisfi i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> analizzati;
- Scrivere codice pulito e facile da mantenere versionandolo;
- Realizzare strumenti per la <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> del software <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>.

**Verificatore**: figura professionale incaricata di verificare che le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>, la documentazione e il software prodotti seguano le regole e rispettino il livello di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> atteso; ovviamente il verificatore non può verificare materiale prodotto da lui stesso. I suoi incarichi sono:

- Esaminare il materiale in fase di revisione utilizzando tecniche e strumenti specificati nelle norme di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>;
- Segnalare errori con consigli di miglioramento.

##### Gestione ticketing

Per la gestione dei <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>/ticket si utilizza come software <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>. Questo software permette di visualizzare un <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> generale in cui il responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> andrà, via via, ad inserire tutti i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> che saranno svolti durante tutta la durata del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>. <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> permette anche di creare degli <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, di lunghezze anche diverse tra loro, in cui è presente lo <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">Sprint Backlog</Term> contenente tutti i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> da svolgere durante lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>. Ogni <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> può ricevere un assegnatario al momento della creazione oppure il singolo membro può assegnarsi autonomamente un <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>.
Ogni <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> presenta:

- una **chiave** per identificarlo;
- una breve **descrizione**;
- uno **stato**, che può essere:
  - "<Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term>" se è stato appena creato;
  - "in corso" se è stato iniziato;
  - "revisione" se è stato completato e deve essere revisionato;
  - "to deploy" se è stato revisionato ed è stato fatto il merge con il branch develop su <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>;
  - "completato" se è stato fatto il merge con il branch main su <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>.
- lo **<Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>** a cui appartengono;
- l'**assegnatario**;
- la **stima originale** del tempo per completarlo;
- il punteggio **<Term popup="Unità di misura usata per indicare il valore dell'attività." reference="/docs/RTB/Termini/Story_Points">story points</Term>** con una valore da 1 a 5 per indicare il valore del <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>;
- la **priorità**.

Una volta che viene completato un <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>, la persona o le persone che hanno contribuito al suo completamento segnalano il tempo produttivo che hanno speso e il ruolo che hanno ricoperto durante il suo svolgimento, usando un'applicazione di <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> chiamata Timetracker. Su Timetracker, le ore di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> svolte sono facilmente consultabili anche in base alla persona o al ruolo. Inoltre, i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> sono organizzati in epic (liste di <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>) a seconda della loro tipologia, che può essere, ad esempio, "documentazione di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>, "gestione repo", ecc.

##### Ciclo di vita di un task

Ogni <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> ha un ciclo di vita, che ha inizio nel momento in cui viene creato, e fine nel momento in cui viene completato e quindi rimosso dal <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term>.

In primo luogo, il responsabile crea un <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>, che viene aggiunto al <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> corrente. Quando l'assegnatario inizia a lavorare su quel <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>, crea un branch su <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> dedicato a esso e aggiorna lo stato a "in corso". Una volta che il <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> è stato completato, l'assegnatario crea una pull request su <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> verso il branch "develop" e sposta il <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> sullo stato "revisione". Successivamente, un verificatore revisiona il lavoro fatto, approva la pull request e sposta il <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> sullo stato "to deploy". Per concludere il ciclo di vita di un <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>, il responsabile approva il lavoro effettuato facendo merge sul branch "main" e segnando il <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> come "completato".

##### Gestione della repository

La <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> di riferimento del gruppo si trova su <Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term> ed è fruibile dall'esterno tramite <Term popup="Servizio di hosting che prende file HTML, CSS e JavaScript direttamente da un repository su GitHub e pubblica un sito web." reference="/docs/RTB/Termini/GitHub_Pages">GitHub Pages</Term> organizzate tramite <Term popup="Framework open-source che permette di creare, distribuire e mantenere siti web di documentazione." reference="/docs/RTB/Termini/Docusaurus">Docusaurus</Term>. La repo è suddivisa in tre sezioni principali: Candidatura, <Term popup="Requirements and Technology Baseline. Documentazione che definisce i requisiti e le tecnologie di base necessarie per un progetto, utilizzata come riferimento per monitorare lo sviluppo." reference="/docs/RTB/Termini/RTB">RTB</Term> e <Term popup="Product Baseline. Fase successiva al RTB che consiste nella verifica e nell'approvazione del prodotto realizzato e che segna un punto avanzamento in un progetto." reference="/docs/RTB/Termini/PB">PB</Term>; al cui interno è presente la corrispondente documentazione.

##### Metodo di lavoro

Per mantenere organizzato al meglio il lavoro, il gruppo ha scelto di adottare la tecnica degli <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> tipica del framework <Term popup="Framework agile per la gestione di progetti complessi, suddivisi in iterazioni chiamate sprint per favorire lo sviluppo incrementale." reference="/docs/RTB/Termini/Scrum">SCRUM</Term>; che permette di suddividere il totale dei <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> contenuti nel Product <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">Backlog</Term> in parti più piccole, che potranno poi essere prese in carico da ogni membro del gruppo, contenute nello <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">Sprint Backlog</Term>.

Ogni <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> avrà durata di due settimane che poi potrà essere modificata a seconda delle esigenze; sarà suddiviso nelle seguenti fasi:

- **<Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">Sprint</Term> Planning**: a seguito di ogni riunione di "allineamento" avvenuta con l'azienda verrà effettuata una pianificazione dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> successivo. Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> che compongono questa fase sono:
  brainstorming di gruppo in cui ogni membro esprime le proprie opinioni.
  rintracciare tutte le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> da svolgere da inserire nel <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.
  suddividere le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> tra i vari componenti del gruppo.

- **<Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">Sprint</Term> Review**: revisione di ciò che è avvenuto durante l'ultimo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, in presenza di tutto il gruppo. Le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> che compongono questa fase sono:
  obiettivi raggiunti: tutte le <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> e gli obiettivi portati a compimento nello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>.
  obiettivi non raggiunti: tutte le <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> e gli obiettivi programmati che non sono stati portati a compimento durante lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, con analisi sulle cause.
  produttività individuale: ogni membro dichiara ciò che ha svolto per poter ottenere un <Term popup="Rendiconto dei risultati di un determinato periodo di attività." reference="/docs/RTB/Termini/Consuntivo">consuntivo</Term> delle ore e dei costi.

- **<Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">Sprint</Term> <Term popup="Tecnica Agile messa in atto alla fine di uno sprint per capire cosa è andato bene durante esso e cosa si può migliorare in quelli successivi." reference="/docs/RTB/Termini/Retrospettiva">Retrospective</Term>**: <Term popup="Tecnica Agile messa in atto alla fine di uno sprint per capire cosa è andato bene durante esso e cosa si può migliorare in quelli successivi." reference="/docs/RTB/Termini/Retrospettiva">retrospettiva</Term> dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> per poterlo concludere definitivamente e valutarne l'andamento. In questa fase verrà valutato ciò che è andato positivamente per poter continuare su questa strada, e ciò che è andato in maniera negativa proponendo soluzioni e miglioramenti per risolvere le questioni problematiche e migliorare il proprio metodo di lavoro.

#### Coordinamento

##### Introduzione

L'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di coordinamento corrisponde all'organizzazione della comunicazione all'interno del gruppo e tra il gruppo e l'azienda o il <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>. La comunicazione può avvenire in formato testuale o tramite riunioni.

##### Comunicazioni

Le comunicazioni si dividono in 2 tipi: Interne, Esterne.

Le comunicazioni interne avvengono tra i vari membri del gruppo su canali appositamente predisposti attraverso riunioni comunitarie e scambi di messaggi tra singoli individui, ovviamente verrà utilizzato un registro adeguato e saranno seguite alcune convenzioni (decise nella sezione [4.2.3.3](#riunioni)):

- **<Term popup="Piattaforma di messaggistica istantanea, di distribuzione digitale e di voice over IP progettata e utilizzata per la comunicazione tra persone." reference="/docs/RTB/Termini/Discord">Discord</Term>** (a seconda del canale utilizzato):

  - testuale: scambio di messaggi formali volti all'organizzazione di decisioni e reminder derivate da riunioni.
  - vocale: comunicazioni formali durante meeting interni al gruppo; comunicazioni semi-formali/informali durante "scambi" tra colleghi.

- **<Term popup="Servizio di social media e messaggistica istantanea basato su cloud e multipiattaforma." reference="/docs/RTB/Termini/Telegram">Telegram</Term>** (a seconda della chat utilizzata):
  - gruppo: scambio di messaggi semi-formali strettamente inerenti al <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>.
  - singola: scambio di messaggi informali tra membri.

Le comunicazioni esterne avvengono tra il gruppo ed il <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term> e <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>. Queste hanno, generalmente, un valore importante e vengono adeguatamente preparate tramite riunioni di gruppo. Gli strumenti utilizzati per queste comunicazioni sono: **<Term popup="Programma software per la videotelefonia." reference="/docs/RTB/Termini/Zoom">Zoom</Term>** e **Google Mail** (tramite l'indirizzo [techwave.unipd@gmail.com](techwave.unipd@gmail.com)). Il registro è sempre formale e il mediatore predisposto per questo tipo di comunicazioni è il Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>.

##### Riunioni

Le **riunioni interne** avvengono tra i membri del gruppo. Per quanto riguarda la frequenza non è definita ma avviene a seconda delle necessità, solitamente ne avviene almeno una a settimana. Questo tipo di riunioni sono concordate sul gruppo <Term popup="Servizio di social media e messaggistica istantanea basato su cloud e multipiattaforma." reference="/docs/RTB/Termini/Telegram">Telegram</Term> e si cerca di svolgere in giorni in cui tutti i membri siano disponibili, in caso ciò non fosse possibile i membri assenti potranno comunque sapere tutto quello che è accaduto e che è stato deciso tramite i <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> prodotti, se necessario il Responsabile si renderà disponibile a chiarire qualsiasi dubbio.

Per sfruttare efficacemente il tempo di lavoro sincrono delle riunioni interne, si adottano queste accortezze:

- Scaletta: questa rappresenta l'ordine del giorno ed indica gli argomenti da trattare.
  organizzazione: il Responsabile sarà tenuto a mantenere l'ordine durante la riunione e verrà designato uno scriba con il compito di tenere traccia di ciò che avviene durante la riunione e redigere il <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbale</Term>.
- Preparazione: ogni membro del gruppo si impegna ad arrivare sufficientemente preparato sugli argomenti, soprattutto di carattere tecnico, che sono discussi durante la riunione con domande e spiegazioni, inoltre si mantiene un impegno attivo e produttivo durante tutta la sua durata.

Gli argomenti in scaletta saranno tratti dal <Term popup="Elenco di requisiti che il team di sviluppo deve completare durante il progetto." reference="/docs/RTB/Termini/Backlog">backlog</Term> dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> e verrà riservato un momento finale dove poter parlare di argomenti non in scaletta, ovviamente comunque inerenti al <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>.

Le **riunioni esterne** avvengono tra gruppo e <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term> o <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term>. Queste servono soprattutto per valutare il lavoro svolto fino a quel momento e pianificare gli step successivi da seguire per poter continuare a lavorare nel modo più <Term popup="Capacità di raggiungere un obiettivo prefissato." reference="/docs/RTB/Termini/Efficacia">efficace</Term> ed <Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficiente</Term> possibile. Anche in questo caso i membri del gruppo si impegnano ad essere preparati a sufficienza per poter discutere con "personale esperto" di argomenti solitamente di non facile comprensione inerenti al <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>. Verranno ovviamente stilati <Term popup="Documento che riassume i punti discussi e le decisioni prese durante una riunione." reference="/docs/RTB/Termini/Verbale">verbali</Term> esterni per fissare il punto su ciò di cui si è trattato e a cui si avrà approvazione dalla parte "esterna" al gruppo coinvolta nella discussione.

##### Disponibilità

Il lavoro personale è organizzato individualmente da ogni componente del gruppo per poter lasciare libertà in quanto impegnati con questioni accademiche, personali e seguendo quanto dichiarato nella candidatura nella sezione di dichiarazione impegni. Ovviamente l'organizzazione dovrà essere consona agli impegni totali del gruppo per evitare ritardi dovuti ad un singolo elemento. In caso di problematiche di indisponibilità che porteranno al non compimento degli impegni di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> presi in carico dal singolo membro, questo si impegna ad avvisare prontamente il Responsabile che cercherà di ridistribuire il lavoro contattando singolarmente i membri oppure indicendo una riunione di gruppo.

### Tracciamento e rendicontazione delle ore

#### Introduzione

La gestione delle ore è un aspetto cruciale per il successo del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>, poiché consente di monitorare l'avanzamento delle <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>, garantire il rispetto delle tempistiche e ottimizzare l'utilizzo delle risorse. Questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> si basa su una corretta pianificazione, tracciamento e rendicontazione delle ore lavorative da parte di tutti i membri del team.

#### Pianificazione delle ore

Durante la fase di <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">Sprint</Term> Planning, il Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>, in collaborazione con il team, definisce le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> da svolgere e stima le ore necessarie per ciascuna di esse e lo <Term popup="Unità di misura usata per indicare il valore dell'attività." reference="/docs/RTB/Termini/Story_Points">story points</Term>. Le ore preventivate vengono registrate nel Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term> e suddivise in base ai ruoli e alle competenze dei membri del team.

#### Tracciamento delle ore su Jira

Ogni ticket su <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> rappresenta una specifica <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> o <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term>. Per tracciare le ore lavorative, i membri del team devono seguire questi passaggi:

- **Aprire il ticket**: accedere al ticket su <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> a cui si sta lavorando.
- **Registrare le ore**:
  - Utilizzare la <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> Log Work di Timetracker per inserire le ore lavorative.
  - Specificare:
    - **Tempo impiegato**: ore e minuti dedicati all'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>.
    - **Ruolo ricoperto**: selezionare il ruolo svolto durante l'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term>.
    - **Data e orario**: indicare la data e l'orario in cui è stato svolto il lavoro.

#### Assegnazione dei ruoli

Ogni ora lavorativa deve essere associata a un ruolo specifico:

- **Analista**: per <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di <Term popup="Attività di un processo di sviluppo che consiste nell'analizzare e individuare le funzionalità che il prodotto software dovrà soddisfare." reference="/docs/RTB/Termini/Analisi_Dei_Requisiti">analisi dei requisiti</Term> e studio del dominio.
- **Progettista**: per <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di progettazione architetturale e di dettaglio.
- **Programmatore**: per <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di codifica e sviluppo del software.
- **Verificatore**: per <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> e testing.
- **Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>**: per <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di coordinamento e gestione del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>.

#### Rendicontazione delle ore nel cruscotto

Tramite un documento Google Sheets _cruscotto-avanzamento_, presente nella cartella Google Drive condivisa, il team è in grado di ottenere informazioni riguardo lo stato di avanzamento del progetto. Questo è di particolare importanza per il ruolo del Responsabile durante la compilazione del Piano di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>.

##### Inserimento ore svolte

Per inserire la rendicontazione delle ore effettivamente svolte all'interno dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> bisogna:

- **Scaricare il report da Timetracker (<Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>)**:
  - Dalla dashboard di <Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term> selezionare, dal menu in alto, le voci _"App"_, poi _"Timetracker"_
  - Dal menu laterale selezionare la voce _"Saved Reports"_, poi _"Shared with me"_ e aprire il report denominato "visualizzazione ore registrate (totali)"
  - Qui modificare il range delle date con quelle corrispettive dello <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, eseguire e scaricare (_Excell_) il report
- **Inserire i dati nel documento Google Sheets _cruscotto-avanzamento_**
  - Nella pagina _"parser-jira"_ incollare le ultime righe prese dal report scaricato. In automatico verranno usate per aggiornare i grafici di andamento e statistiche.

#### Inserimento ore preventivate

- **Inserire i dati nel documento Google Sheets _cruscotto-avanzamento_**
  - Nella pagina _"inserimento-preventivo-ruoli"_ specificare per ogni <Term popup="Azione da svolgere definita per poter pianificare e monitorare lo svolgimento di un progetto (ticket)." reference="/docs/RTB/Termini/Issue">_issue_</Term> le ore preventivate per ciascun ruolo.

#### Strumenti utilizzati

- **<Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>**: per la gestione dei ticket e il tracciamento delle ore.
- **Timetracker**: per la registrazione delle ore lavorative.
- **Google Sheets**: per la creazione di report e il monitoraggio delle ore preventivate vs effettive.

#### Ruoli e responsabilità

- **Responsabile di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">Progetto</Term>**: supervisiona il tracciamento delle ore, <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> il rispetto delle tempistiche e approva la rendicontazione.
- **Amministratore**: garantisce che gli strumenti di tracciamento siano configurati correttamente e accessibili a tutti i membri del team.
- **Membri del Team**: sono responsabili di registrare le ore lavorative in modo accurato e tempestivo, associando il ruolo ricoperto.

### Infrastruttura

Fanno parte dell'infrastruttura organizzativa tutti gli strumenti che permettono al gruppo di attuare in modo <Term popup="Capacità di raggiungere un obiettivo prefissato." reference="/docs/RTB/Termini/Efficacia">efficace</Term> ed <Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficiente</Term> i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> organizzativi. In particolare strumenti che permettono la comunicazione, il coordinamento e la pianificazione del lavoro.

- **<Term popup="Piattaforma di messaggistica istantanea, di distribuzione digitale e di voice over IP progettata e utilizzata per la comunicazione tra persone." reference="/docs/RTB/Termini/Discord">Discord</Term>**:
  Strumento di comunicazione interna sincrona. Vengono usati due canali principali:
  - **Canale testuale**: comunicazioni sincrone per reminder di argomenti discussi e da discutere durante la riunione.
  - **Canale vocale**: canale di comunicazione utilizzato per le riunioni di gruppo con la possibilità di condivisione dello schermo.

Ogni categoria di canale può avere un numero variabile di sottocanali utilizzati a seconda delle necessità.

- <Term popup="Servizio di social media e messaggistica istantanea basato su cloud e multipiattaforma." reference="/docs/RTB/Termini/Telegram">Telegram</Term>:
  Strumento di comunicazione interna testuale asincrona. Viene utilizzato in due modalità:

  - gruppo: chat condivisa tra tutti i membri del gruppo utilizzata per la maggior parte delle comunicazioni riguardanti il <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term>.
  - individuale: chat utilizzata per contattare singolarmente un membro del gruppo per evitare "disturbi" a tutti gli altri membri.

- **Google Drive**:
  Strumento utilizzato come directory condivisa dai membri del gruppo per archiviazione di file temporanei o non ufficiali. In questa directory si ha accesso alla suite Google con Docs, Sheets, Slides.

- **Google Mail**:
  Strumento per lo scambio di email mediante l'indirizzo di posta condiviso [techwave.unipd@gmail.com](techwave.unipd@gmail.com) utilizzato per comunicazioni esterne con <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term> e <Term popup="Figura che dà l'incarico di eseguire un lavoro." reference="/docs/RTB/Termini/Committente">committente</Term>.

- **<Term popup="Programma software per la videotelefonia." reference="/docs/RTB/Termini/Zoom">Zoom</Term>**:
  Strumento di comunicazione video sincrona con il <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term>.

- **<Term popup="Piattaforma di collaborazione digitale progettata per facilitare la comunicazione e la gestione remota dei progetti." reference="/docs/RTB/Termini/Miro">Miro</Term>**:
  Strumento di collaborazione digitale utilizzato durante le riunioni con il <Term popup="Figura che avanza una proposta o un progetto." reference="/docs/RTB/Termini/Proponente">proponente</Term> per facilitare la comunicazione e fissare gli argomenti trattati nell'incontro.

- **<Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>**:
  Strumento utilizzato per il ticketing e la gestione dei <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> con cui si programmano i vari <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term>, ci si divide i <Term popup="Azioni da svolgere per realizzare le attività di un processo." reference="/docs/RTB/Termini/Task">task</Term> e si rendicontano le ore produttive dei membri.

- **<Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>**:
  Strumento di controllo di versione dove è situata la <Term popup="Archivio digitale in cui il codice sorgente e altri file di progetto vengono conservati e gestiti." reference="/docs/RTB/Termini/Repository">repository</Term> ufficiale contenente tutta la documentazione di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> ed il codice prodotto.

- **GitFlow**:
  Modello di branching Git alternativo che prevede l'uso di feature branch e di più branch primari per il controllo di versione.

### Miglioramento dei processi

Il <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di miglioramento consiste di due <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> principali, una di valutazione e una di miglioramento dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>.

#### Valutazione

Per effettuare l'<Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di valutazione in modo regolare, a fine <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> viene effettuata la <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> <Term popup="Tecnica Agile messa in atto alla fine di uno sprint per capire cosa è andato bene durante esso e cosa si può migliorare in quelli successivi." reference="/docs/RTB/Termini/Retrospettiva">retrospective</Term>, che mira ad analizzare le cose fatte durante lo <Term popup="Periodo di tempo definito, tra 1 e 2 settimane, durante il quale il team lavora su un set specifico di obiettivi." reference="/docs/RTB/Termini/Sprint">sprint</Term> cercando di capire cosa è andato bene e cosa è andato male, e, nel secondo caso, cosa si può cambiare nel modo in cui si stanno facendo le cose per poter avere un miglioramento.

#### Miglioramento

Durante lo svolgimento del <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> soprattutto nella fase stesura dei documenti e del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software il gruppo cercherà di portare un miglioramento continuo del lavoro, per evitare di ripetere errori già fatti, fornendo delle soluzioni alle problematiche riscontrate durante il tragitto. Per svolgere al meglio questo <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processo</Term> di miglioramento usufruiremo della sezione Valutazione di miglioramento posta nel Piano di Qualifica. In questa sezione del documento è possibile trovare i problemi principali riscontrati dal gruppo, con descrizioni e soluzioni opportune.

### Formazione

Per garantire che tutti i membri del gruppo possano lavorare alla stessa velocità, allo stesso livello e seguendo le stesse convenzioni, i membri studiano in autonomia tutti gli strumenti di lavoro utilizzati per la documentazione, la gestione di <Term popup="Insieme di attività che devono raggiungere determinati obiettivi a partire da determinate specifiche, che hanno una data d’inizio e una data di fine prefissate, che dispongono di risorse limitate e che consumano risorse nel loro svolgersi." reference="/docs/RTB/Termini/Progetto">progetto</Term> e lo sviluppo software. Verranno anche riservati dei momenti durante le varie riunioni di gruppo in cui i membri più esperti in alcuni campi faranno una breve "spiegazione" per facilitare la comprensione degli strumenti agli altri membri.

Vengono riportati, di seguito, riferimenti alla documentazione dei vari strumenti/framework utilizzati:

LaTeX: [https://www.overleaf.com/learn](https://www.overleaf.com/learn).

<Term popup="Piattaforma per il controllo di versione e la collaborazione che consente di archiviare codice, tracciare modifiche e collaborare su progetti software." reference="/docs/RTB/Termini/GitHub">GitHub</Term>: [https://docs.github.com](https://docs.github.com).

<Term popup="Strumento software utilizzato per la gestione dei progetti e il monitoraggio dei problemi, spesso utilizzato nello sviluppo agile." reference="/docs/RTB/Termini/Jira">Jira</Term>: [https://www.atlassian.com/software/jira/guides/getting-started/introduction](https://www.atlassian.com/software/jira/guides/getting-started/introduction).

Framework <Term popup="Framework agile per la gestione di progetti complessi, suddivisi in iterazioni chiamate sprint per favorire lo sviluppo incrementale." reference="/docs/RTB/Termini/Scrum">SCRUM</Term>: [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html).

## Standard per la qualità

### <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">Qualità</Term> dei processi

Per garantire la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term>, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> di ciclo di vita del software e le <Term popup="Azioni da compiere per attuare un processo." reference="/docs/RTB/Termini/Attività">attività</Term> di supporto necessarie per lo sviluppo di un <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> software.

In particolare è necessario individuare delle metriche che indicano l'avanzamento dei <Term popup="Insieme di attività correlate e coese che trasformano bisogni in prodotti, secondo regole definite e consumando risorse." reference="/docs/RTB/Termini/Processo">processi</Term> in relazione al budget, al valore pianificato e quello svolto, ai <Term popup="Eventualità di subire un danno connessa a circostanze più o meno prevedibili." reference="/docs/RTB/Termini/Rischio">rischi</Term> emersi e agli errori individuati.

### <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">Qualità</Term> di prodotto

Per garantire la <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term>, il team adotta il modello di riferimento ISO/IEC 25010 (unione di ISO/IEC 9126 e ISO/IEC 14598) che definisce un modello di <Term popup="Insieme delle caratteristiche di un'entità che ne determinano la capacità di soddisfare esigenze esplicite o implicite." reference="/docs/RTB/Termini/Qualità">qualità</Term> del software basato su sei caratteristiche fondamentali: <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term>, affidabilità, usabilità, <Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficienza</Term>, manutenibilità e portabilità.

In particolare è necessario individuare delle metriche rappresentanti:

- la **funzionalità**: grado in cui il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> fornisce <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term> complete, corrette e adeguate.
- l'**affidabilità**: grado in cui il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> svolge specifiche funzioni in termini di assenza di guasti, disponibilità, tolleranza ai guasti e riparabilità.
- l'**usabilità**: grado di interazione con il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> da parte degli utenti in termini di appropriatezza, apprendibilità, operabilità, protezione da errori, _user experience_ e accessibilità.
- l'**<Term popup="Abilità di raggiungere un obiettivo prefissato utilizzando la minima quantità di risorse possibile." reference="/docs/RTB/Termini/Efficienza">efficienza</Term>**: grado in cui il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> esegue le sue funzioni in termini di risorse di tempo, di memoria, ecc.
- la **manutenibilità**: costo della correzione dei difetti e dell'aggiunta di <Term popup="Caratteristica funzionale propria di un prodotto software." reference="/docs/RTB/Termini/Funzionalità">funzionalità</Term>.
- la **portabilità**: grado in cui il <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> è legato all'ambiente di esecuzione in termini di installabilità e sostituibilità.

I **<Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> di <Term popup="Operazione di controllo che agisce sui singoli segmenti di sviluppo, accertando che l’esecuzione in essi non abbia introdotto errori." reference="/docs/RTB/Termini/Verifica">verifica</Term> e validazione** vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del <Term popup="Insieme di artefatti raccolti ed esposti in modo organizzato che permettono l'utilizzo di un programma da parte di un utente." reference="/docs/RTB/Termini/Prodotto">prodotto</Term> con i <Term popup="Una specifica funzionale o non funzionale che il software deve soddisfare." reference="/docs/RTB/Termini/Requisito_Software">requisiti</Term> specificati e gli standard qualitativi prestabiliti dal team. I <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> vengono classificati in quattro categorie principali: <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> di unità, <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> di integrazione, <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> di sistema e <Term popup="Prove effettuate per controllare il funzionamento di un prodotto software con l'obiettivo di trovare possibili anomalie." reference="/docs/RTB/Termini/Test">test</Term> di accettazione.

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
