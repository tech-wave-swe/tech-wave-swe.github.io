---
id: specifica_tecnica
title: "Specifica tecnica - v1.0.0"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.0.0
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Specifica tecnica

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                       | Autore                | Data Verifica | Verificatore        |
| ---------- | -------- | ------------------------------------------------- | --------------------- | ------------- | ------------------- |
| 12/04/2025 | 1.0.0    | Sezione Progettazione grafica                     | Carraro Agnese        | 14/04/2025    | Marcon Giulia       |
| 08/04/2025 | 0.6.0    | Aggiunta classi View e Command                    | Piola Andrea          | 09/04/2025    | Dal Bianco Riccardo |
| 08/04/2025 | 0.5.1    | Correzione sezione Tecnologie                     | Marcon Giulia         | 08/04/2025    | Pistori Gaia        |
| 02/04/2025 | 0.5.0    | Sezione Diagramma delle classi                    | Dal Bianco Riccardo   | 06/04/2025    | Monetti Luca        |
| 28/03/2025 | 0.4.0    | Sezione Design pattern                            | Piola Andrea          | 30/03/2025    | Monetti Luca        |
| 25/03/2025 | 0.3.0    | Sezione Architettura logica                       | Pistori Gaia          | 25/03/2025    | Piola Andrea        |
| 19/03/2025 | 0.2.0    | Sezione Tecnologie                                | Marcon Giulia         | 21/03/2025    | Monetti Luca        |
| 18/03/2025 | 0.1.0    | Prima stesura del documento. Sezione Introduzione | Vasquez Manuel Felipe | 19/03/2025    | Marcon Giulia       |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del documento

Il presente documento ha lo scopo di fornire una descrizione dettagliata del sistema, delle sue %%funzionalità|funzionalità%% e dei requisiti tecnici necessari per la sua realizzazione.

### Scopo del prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto colorato.
- **PDF**: Corsivo con pendice \[G\].

### Riferimenti

#### Riferimenti normativi

- **Norme di Progetto**: [Norme di Progetto - v1.8.1](../RTB/Norme%20di%20Progetto.md)
- **Capitolato d'appalto C8: Requirement Tracker- Plug-in VSCode**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti informativi

- **Glossario**: [Glossario](../RTB/Glossario.md)

- **Analisi dei requisiti**: [Analisi dei requisiti](../RTB/Analisi_dei_requisiti.md)

- **Documentazione dell'Extension API di Visual Studio Code**: [https://code.visualstudio.com/api](https://code.visualstudio.com/api)

- **Documentazione di Ollama**: [https://github.com/ollama/ollama/tree/main/docs](https://github.com/ollama/ollama/tree/main/docs)

- **Documentazione di TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

- **Documentazione di LanceDB**: [https://docs.lancedb.com/enterprise/introduction](https://docs.lancedb.com/enterprise/introduction)

## Tecnologie

In questa sezione vengono descritti gli strumenti e le tecnologie utilizzati per lo sviluppo e l'implementazione del Requirement Tracker, un'estensione per Visual Studio Code (%%VSCode|vscode%%) che permette di tracciare e verificare i requisiti software. Le tecnologie sono state selezionate per garantire un'%%architettura|architettura%% modulare, scalabile e di facile manutenzione, con un focus particolare sull'integrazione con modelli di linguaggio avanzati (%%LLM|llm%%) e sulla gestione efficiente dei requisiti.

### Linguaggio di programmazione

#### TypeScript

TypeScript è un linguaggio di programmazione open-source sviluppato da Microsoft, che estende JavaScript aggiungendo il supporto per la tipizzazione statica. Questo permette di identificare errori comuni durante la fase di sviluppo, migliorando la %%qualità|qualità%% del codice e facilitando il debugging. TypeScript è particolarmente adatto per progetti di medie e grandi dimensioni, dove la manutenibilità del codice è fondamentale.
È stato scelto per la sua capacità di prevenire errori attraverso la tipizzazione statica, la vasta gamma di strumenti e librerie disponibili e la facilità di integrazione con le API di %%VSCode|vscode%%.

Utilizzo nel progetto:

- Sviluppo dell'estensione per %%VSCode|vscode%%: TypeScript è utilizzato per implementare le %%funzionalità|funzionalità%% principali dell'estensione, come il caricamento dei requisiti, l'analisi del codice e l'interazione con l'utente.
- Gestione delle %%funzionalità|funzionalità%% principali: Il linguaggio è impiegato per gestire la logica di business, come il parsing dei file di requisiti, l'interazione con i modelli %%LLM|llm%% e la gestione della struttura dati interna.
- Integrazione con le API di %%VSCode|vscode%%: TypeScript è utilizzato per interfacciarsi con le API di %%VSCode|vscode%%, permettendo la creazione di comandi personalizzati, la visualizzazione dei risultati e l'integrazione con l'editor di codice.

Versione: 4.9.5

Documentazione: [TypeScript documentation](https://www.typescriptlang.org/docs/)

### Frameworks

#### VSCode Extension API

Le API di estensione di Visual Studio Code forniscono strumenti per la creazione di comandi, la gestione dei file, l'integrazione con l'editor di codice e la visualizzazione dei risultati. Queste API sono progettate specificamente per estendere le %%funzionalità|funzionalità%% di %%VSCode|vscode%%, permettendo agli sviluppatori di creare strumenti personalizzati che si integrano perfettamente con l'ambiente di sviluppo.
Sono state scelte per la loro integrazione nativa con %%VSCode|vscode%%, che semplifica lo sviluppo di estensioni e garantisce una perfetta compatibilità con l'ambiente di sviluppo.

Utilizzo nel progetto:

- Presentazione dell'interfaccia utente dell'estensione: Le API di %%VSCode|vscode%% sono utilizzate per selezionare il provider dell'interfaccia utente dell'estensione che si occuperà della gestione degli eventi e del render del codice HTML.
- Integrazione con l'editor di %%VSCode|vscode%%: Le API permettono di interagire con l'editor di codice, ad esempio per evidenziare porzioni di codice che implementano specifici requisiti o per navigare tra i file del %%progetto|progetto%%.
- Gestione degli eventi: Le API di estensione sono utilizzate per gestire eventi come il caricamento di un file di requisiti, l'avvio di un'analisi o la modifica delle configurazioni.

Versione: 1.95.0

Documentazione: [VSCode API documentation](https://code.visualstudio.com/api)

### Strumenti per l'integrazione con modelli di intelligenza artificiale

#### Ollama

%%Ollama|ollama%% è uno strumento open-source che permette di eseguire localmente modelli di linguaggio avanzati (%%LLM|llm%%) come %%Llama|llama%% ed è progettato per essere leggero e facile da configurare, permettendo agli sviluppatori di eseguire modelli %%LLM|llm%% direttamente sulla propria macchina senza la necessità di infrastrutture cloud complesse.
Uno dei principali vantaggi di %%Ollama|ollama%% è la sua capacità di eseguire modelli %%LLM|llm%% in locale, garantendo la privacy dei dati e riducendo la dipendenza da servizi esterni. Inoltre, %%Ollama|ollama%% supporta una vasta gamma di modelli, permettendo di scegliere quello più adatto alle esigenze del %%progetto|progetto%%.

Utilizzo nel progetto:

- Analisi del codice sorgente: %%Ollama|ollama%% è utilizzato per analizzare il codice sorgente e verificare l'implementazione dei requisiti. Il modello %%LLM|llm%% viene interrogato per generare risposte basate sul codice e sui requisiti specificati.
- Generazione di risposte basate sui modelli %%LLM|llm%%: %%Ollama|ollama%% è utilizzato per generare risposte che supportano lo sviluppatore nel controllo dei requisiti, ad esempio identificando porzioni di codice che implementano specifici requisiti.
- Generazione degli embeddings: %%Ollama|ollama%% è utilizzato per generare gli embeddings vettoriali del codice sorgente e dei requisiti.

Versione: 0.6.2

Documentazione: [Ollama documentation](https://github.com/ollama/ollama/tree/main/docs)

#### Vector Embeddings

I Vector Embeddings sono rappresentazioni numeriche di dati testuali, utilizzati per trasformare requisiti e codice in vettori. Questa tecnica permette di confrontare rapidamente i requisiti con il codice sorgente, migliorando l'%%efficienza|efficienza%% dell'analisi e la precisione dei risultati. I Vector Embeddings sono particolarmente utili in contesti dove è necessario confrontare grandi quantità di dati testuali, come nel caso dei requisiti software.
I Vector Embeddings funzionano mappando parole, frasi o interi documenti in uno spazio vettoriale multidimensionale, dove la similarità semantica tra i testi può essere misurata attraverso la distanza tra i vettori. Questo approccio permette di identificare rapidamente le corrispondenze tra i requisiti e il codice sorgente, riducendo i tempi di elaborazione e migliorando l'accuratezza dell'analisi.

Utilizzo nel progetto:

- Confronto rapido tra i requisiti e il codice sorgente: I Vector Embeddings sono utilizzati per trasformare i requisiti e il codice sorgente in vettori, permettendo di confrontarli rapidamente e identificare le corrispondenze.
- Miglioramento dell'%%efficienza|efficienza%% e della precisione dell'analisi: L'uso di Vector Embeddings permette di ridurre i tempi di elaborazione e migliorare l'accuratezza delle risposte fornite dai modelli %%LLM|llm%%.

Documentazione: [Vector Embeddings](https://lancedb.github.io/lancedb/embeddings/understanding_embeddings/#what-are-vector-embeddings)

#### LanceDB

%%LanceDB|lancedb%% è un database vettoriale open-source progettato per offrire elevate prestazioni nella gestione e nella ricerca di Vector Embeddings. È particolarmente indicato per applicazioni che fanno uso intensivo di modelli di linguaggio (%%LLM|llm%%) e analisi semantica di dati testuali. LanceDB combina un motore di ricerca vettoriale efficiente con un formato di storage ottimizzato (Lance), permettendo interrogazioni rapide anche su dataset di grandi dimensioni.

Utilizzo nel progetto:

- Indicizzazione e ricerca vettoriale: %%LanceDB|lancedb%% viene utilizzato per indicizzare i requisiti e il codice sorgente rappresentati come embeddings vettoriali, permettendo un confronto efficiente basato sulla similarità semantica.
- Persistenza locale dei dati: Il database permette di salvare localmente i dati elaborati, garantendo prestazioni elevate senza dover dipendere da servizi cloud.
- Ottimizzazione delle risposte %%LLM|llm%%: Utilizzando %%LanceDB|lancedb%% è possibile migliorare la qualità delle risposte generate dai modelli %%LLM|llm%%, restringendo il contesto ai risultati più rilevanti trovati tramite la ricerca vettoriale.

Versione: 0.18

Documentazione: [LanceDB documentation](https://lancedb.github.io/lancedb/)

### Strumenti per i test

#### Jest

Jest è un framework di testing JavaScript open-source sviluppato da Facebook. È utilizzato per scrivere e eseguire %%test|test%% automatizzati, garantendo che il codice funzioni come previsto. Jest è particolarmente apprezzato per la sua configurazione minima e per le sue capacità avanzate come il mock delle funzioni e la gestione dei %%test|test%% paralleli. È compatibile con progetti che utilizzano TypeScript e offre un'ottima integrazione con altri strumenti di sviluppo, come i framework di build e i bundler.

Utilizzo nel progetto:

- Testing unitario: Jest è utilizzato per sviluppare %%test|test%% unitari che verificano il corretto funzionamento delle singole funzioni e componenti dell'estensione.
- Testing di integrazione: I %%test|test%% di integrazione sono stati implementati per garantire che diverse parti dell'estensione interagiscano correttamente, ad esempio, tra la logica di business e l'integrazione con le API di %%VSCode|vscode%%.
- Mocking di funzioni esterne: Jest consente di simulare comportamenti di funzioni esterne come la comunicazione con i modelli di linguaggio, facilitando i %%test|test%% senza dipendenze esterne.

Versione: 29.7.0

Documentazione: [Jest documentation](https://jestjs.io/docs/getting-started)

### Formati di file per la gestione dei requisiti

#### CSV

Il formato CSV (Comma-Separated Values) è un formato di file semplice e leggero, ampiamente utilizzato per la gestione di dati strutturati. Consente di importare ed esportare i requisiti software in modo rapido e intuitivo. CSV è particolarmente adatto per progetti che richiedono una gestione semplice e veloce dei dati, senza la necessità di strutture complesse.

Utilizzo nel progetto:

- Importazione dei requisiti software: CSV è utilizzato per importare i requisiti software, permettendo una facile integrazione con strumenti esterni per la gestione dei dati.

Documentazione: [CSV Format specification](https://datatracker.ietf.org/doc/html/rfc4180)

#### ReqIF

ReqIF (Requirements Interchange Format) è uno standard per lo scambio di requisiti tra diversi strumenti di gestione. Offre un formato strutturato e flessibile, adatto a progetti complessi che richiedono una gestione avanzata dei requisiti. ReqIF è progettato per supportare la gestione di grandi quantità di requisiti, garantendo la compatibilità tra diversi strumenti e piattaforme.

Utilizzo nel progetto:

- Importazione dei requisiti software: ReqIF è utilizzato per importare i requisiti software, permettendo una facile integrazione con strumenti esterni per la gestione dei dati.

Documentazione: [ReqIF specification](https://www.omg.org/spec/ReqIF/About-ReqIF/)

## Architettura

### Architettura logica

L'%%architettura|architettura%% implementata utilizza il pattern Model View Presenter per gestire l'interazione con l'utente. L'interazione tra presenter e view avviene tramite gli eventi di %%VSCode|vscode%% mentre l'interazione tra presenter e model avviene per chiamata diretta.

#### Eventi VSCode

L'estensione si attiva tramite l'evento nativo fornito dall'API.
La comunicazione tra un provider e la sua view avviene tramite l'ascolto e la gestione di eventi personalizzati e specificati negli handler.

#### Model View Presenter (MVP)

Il Model-View-Presente è una derivazione dello schema Model-View-Controller (MVC). Entrambi sono ampiamente utilizzati per la creazione di applicazioni con interfaccia utente.
I principali vantaggi del modello MVP sono:

- Separation of Concerns: dividere il codice in parti separate, ciascuna con la propria responsabilità. Ciò rende il codice più semplice, più riutilizzabile e più facile da gestire.
- Unit Testing: poiché la logica (il presenter) dell'interfaccia utente è separata dal livello visivo (la view), è molto più facile testare queste parti in modo isolato.

In MVP le tre componenti sono suddivise come segue:

- Model: Livello per la gestione dei dati. È responsabile dell'implementazione della business logic e della comunicazione con il database.
- View: Livello per visualizzazione dell'interfaccia utente. Visualizza i dati (dal model) e indirizza i comandi dell'utente (eventi) al presenter affinché agisca su tali dati.
- Presenter: Livello che permette l'interazione tra Model e View. Recupera i dati dal model e decide cosa visualizzare. Gestisce lo stato della vista e intraprende azioni in base alle notifiche di input dell'utente dalla vista.

### Architettura di deployment

#### Monolite

Un'%%architettura|architettura%% monolitica è un modello tradizionale di un programma software, che è costruito come un'unità unificata, autosufficiente e indipendente da altre applicazioni. Un'%%architettura|architettura%% monolitica è una rete di elaborazione singolare e di grandi dimensioni con una codebase che unisce insieme tutti i business concerns. Per apportare una modifica a questo tipo di applicazione è necessario aggiornare l'intero stack accedendo alla codebase e creando e distribuendo una versione aggiornata dell'interfaccia lato servizio. Ciò rende gli aggiornamenti restrittivi, dispendiosi in termini di tempo e consente di rilasciare tutto il monolite in una volta.

I vantaggi di un'%%architettura|architettura%% monolitica includono:

- Facile distribuzione : un file eseguibile o una directory semplificano la distribuzione.
- Sviluppo: l'utilizzo di una singola codebase rende più lineare lo sviluppo dell'applicativo.
- Prestazioni: in una codebase e un %%repository|repository%% centralizzati, un'API può spesso eseguire la stessa funzione che numerose API eseguono con i microservizi.
- %%Test|test%% semplificati: poiché un'applicazione monolitica è un'unità singola e centralizzata, i %%test|test%% end-to-end possono essere eseguiti più velocemente rispetto ad un'applicazione distribuita.
- Debug semplice: con tutto il codice in un unico posto, è più facile seguire una richiesta e trovare un problema.

Gli svantaggi di un monolite includono:

- Velocità di sviluppo più lenta: un'applicazione monolitica e di grandi dimensioni rende lo sviluppo più complesso e lento.
- Scalabilità: non è possibile scalare i singoli componenti.
- Affidabilità: se si verifica un errore in un modulo, ciò potrebbe influire sulla disponibilità dell'intera applicazione.
- Barriera all'adozione della tecnologia: qualsiasi modifica al framework o al linguaggio influisce sull'intera applicazione, rendendo spesso le modifiche costose e dispendiose in termini di tempo.
- Mancanza di flessibilità: un monolite è vincolato dalle tecnologie già utilizzate al suo interno.
- Distribuzione: una piccola modifica a un'applicazione monolitica richiede la ridistribuzione dell'intero monolite.

### Design pattern

#### Dependency Injection

È un _pattern architetturale_ che consiste nel fornire le dipendenze di un oggetto dall'esterno, tramite il passaggio di parametri nel costruttore, invece di crearle internamente. Questo facilita l'implementazione di %%test|test%% di unità che utilizzano mock e garantisce di avere oggetti validi sin dall'istanziazione dell'oggetto della classe.

#### MVP

È un _pattern architetturale_ con lo scopo di separare le responsabilità dei componenti di un'applicazione. Come già indicato nella sezione _Architettura Logica_ è stato utilizzato per l'implementazione dell'intero %%applicativo|applicativo%% in quanto era necessario coordinare le componenti di dati e logica e interfaccia utente.
Il _model_ è implementata dalle classi _Facade_ e _Service_.
La _view_, ovvero l'interfaccia grafica, è implementata dalla classe _TrackerWebView_, che rappresenta il pannello di visualizzazione dello stato di implementazione dei requisiti, e dalla classe _ChatWebView_ che rappresenta la chat tra l'utente e il modello.
Il _presenter_ è implementato dalle rispettive classi _ChatWebviewProvider_ e _TrackerWebviewProvider_ e rappresenta la comunicazione tra la business logic e l'interfaccia utente.

#### Singleton

È un _pattern creazionale_ che garantisce l'esistenza di un'unica istanza di una classe e permette di avere un punto di accesso globale a quest'ultima.
È utilizzato nella classe _ConfigServiceFacade_ rappresenta le configurazioni scelte dall'utente sia nel contesto globale che nel singolo progetto ed è necessario quindi siano memorizzate in un'unica istanza per non generare conflitti.
È utilizzato anche nella classe _LanceDBAdapter_ che si occupa dell'interazione con il database vettoriale.
In entrambi i casi risulta molto utile l'uso del Singleton per avere un punto di accesso globale alle informazioni.

#### Adapter

È un _pattern strutturale_ che permette di convertire un'interfaccia di una classe in un'altra. Questo si implementa definendo una classe adapter che adatti le interfacce.
È stato utilizzato nella classe _LanceDBAdapter_ per permettere all'%%applicativo|applicativo%% di interfacciarsi con il database vettoriale per memorizzare il parsing dei requisiti e il loro stato.
È stato utilizzato anche nella _LangChainOllamaAdapter_ che permette all'%%applicativo|applicativo%% di interfacciarsi con %%Ollama|ollama%% per gestire l'interrogazione e il funzionamento dei modelli %%LLM|llm%%.

#### Facade

È un _pattern strutturale_ che permette di fornire un'interfaccia unica semplice per un sottosistema complesso. Questo permette di diminuire la complessità del sistema.
È stato usato nella classe _DocumentServiceFacade_ la quale fornisce una serie di metodi per la formattazione e la trasformazione in formato vettoriale dei documenti da analizzare da %%LLM|llm%%. La classe richiede il contesto dell'estensione per analizzare i file selezionati e per permetterne l'elaborazione e la memorizzazione nel database.
In modo simile, è stato usato nella classe _RequirementsServiceFacade_ la quale implementa al suo interno i metodi per la gestione dell'importazione e il tracciamento dei requisiti.
È stato usato anche nella classe _ConfigServiceFacade_ la quale mette a disposizione i metodi per interagire con le configurazioni dell'utente.
Queste scelte hanno permesso di diminuire la complessità del sistema unificando funzionalità articolate all'interno di metodi di utilità.

#### Command

È un _pattern comportamentale_ che permette di incapsulare una richiesta in un oggetto con lo scopo di rendere i client indipendenti dalle richieste. Una classe astratta, _Command_, definisce l'interfaccia per eseguire la richiesta.
È stata creata un'interfaccia _ICommand_, contenente una _Promise_ la quale viene implementata dalle classi: _ClearChatHistoryCommand_, _ClearRequirementsHistoryCommand_, _InterrogateDocumentCommand_, _InterrogateSelectionCommand_, _OpenSettingsCommand_, _OpenSidebarCommand_ e _ResetDatabaseCommand_. Queste corrispondono ai comandi che l'utente può richiedere all'estensione. È stato scelto questo pattern per garantire una facile estensione delle funzionalità, rendendo semplice l'aggiunta di nuovi comandi, e per garantire il rispetto del _principio di separazione delle responsabilità_.

#### Memento

È un _pattern comportamentale_ che permette di salvare e recuperare lo stato di un oggetto senza rivelare dettagli della sua implementazione.
Questa scelta architetturale è imposta da %%VSCode|vscode%% Extension API che richiede di utilizzarlo per la gestione del _workspaceState_ e del _globalState_, da noi utilizzate nella classe _GlobalStateService_.

[Documentazione Memento](https://code.visualstudio.com/api/references/vscode-api#Memento)

### Diagramma delle classi

Il diagramma delle classi fornisce una panoramica generale della struttura interna dell'estensione, evidenziando i principali componenti software, le loro responsabilità e le relazioni tra essi. L'%%architettura|architettura%% è progettata per essere modulare ed estendibile usando il pattern MVP.

I componenti sono suddivisi in diversi blocchi funzionali:

- **Command**: Rappresentano le azioni attivabili dall'utente. Sono centralizzati nel CommandRegistry e implementano un'interfaccia comune che definisce il comportamento standard dei comandi.
- **Interfaccia VSCode**: Contiene le componenti fornite da %%VSCode|vscode%% e gestisce la creazione e la visualizzazione delle WebView.
- **Provider**: Agiscono come intermediari tra la WebView e i servizi applicativi. Ricevono eventi dalla UI e instradano le richieste verso i servizi appropriati.
- **WebView**: Sono i componenti grafici visualizzati all'interno dell'estensione. Si interfacciano con i rispettivi provider per ricevere dati o inviare eventi tramite %%VSCode|vscode%%.
- **Interazioni con servizi esterni**: Contengono la logica principale per la gestione delle interazioni con %%Ollama|ollama%% e %%LanceDB|lancedb%%. Interagiscono direttamente con gli adapter.
- **Gestione dello stato**: Mantiene lo stato persistente dell'estensione e fornisce metodi di lettura e scrittura.
- **Adapter**: Permettono di astrarre e integrare tecnologie esterne per il database vettoriale e i modelli %%LLM|llm%%.
- **Servizi di tracciamento e gestione requisiti**: Coordinano le attività legate alla gestione, analisi e tracciamento dei requisiti software.
- **Servizi per il codice sorgente**: Gestiscono l'elaborazione e la formattazione dei file sorgente.
- **Configurazione e file system**: Si occupano rispettivamente della lettura e validazione delle configurazioni e dell'accesso al file system.

Il modello di comunicazione ibrido permette di sfruttare la flessibilità degli eventi di %%VSCode|vscode%% nella comunicazione tra presenter e view mantenendo al contempo un flusso di controllo chiaro e prevedibile all'interno del model.

<img src="/img/Diagrams/diagram.png" alt="UML Diagram" data-width="70%" />

#### Architettura di dettaglio

#### Model

<img src="/img/Diagrams/models.png" alt="Models UML Diagram" data-width="70%" />

##### ChatMessage

L'interfaccia _ChatMessage_ ha lo scopo di modellare un messaggio di una chat.
Definisce la struttura di ogni messaggio indicando il mittente (_sender_) che può essere l'utente (_user_) o il modello %%LLM|llm%% (_model_), il contenuto del messaggio in forma di stringa (_text_) e un timestamp che indica quando il messaggio è stato inviato.

##### File

L'interfaccia _File_ ha lo scopo di modellare un file all'interno del progetto. Memorizza all'interno di campi testuali: il contenuto originale del file (_originalContent_), il percorso (_filepath_), il checksum per la verifica dell'integrità (_checksum_) e come campo numerico opzionale, un punteggio usato per valutare la rilevanza (_score_).

##### Requirement

L'interfaccia _Requirement_ ha lo scopo di modellare un %%requisito software|requisito*software%%. Memorizza, all'interno di campi testuali: l'identificativo univoco (\_id*), il nome (_name_), la descrizione (_description_), la tipologia (_type_) e la versione (_version_). Inoltre vengono memorizzati: lo stato tramite un oggetto del tipo _RequirementStatus_ (_status_) e come campi opzionali il punteggio (_score_) e la porzione di codice dove è stato implementato (_codereference_).
_RequirementStatus_ è un enum definito all'interno che rappresenta lo stato di implementazione di un requisito: tracciato (_TRACKED_), non tracciato (_NOT_TRACKED_), pendente (_PENDING_) e sconosciuto (_UNKNOW_).

##### Chunk

L'interfaccia _Chunk_ ha lo scopo di modellare un frammento di codice o testo a partire da un file. Memorizza in campi testuali il contesto (_content_), il contenuti della linea (_lineContent_), il percorso del file di partenza (_filePath_) e la tipologia di file (_fileType_), mentre in campi numerici memorizza la lunghezza in linee (_lineNumber_) e, come opzionale, un punteggio usato per valutare la rilevanza (_score_).

##### CollectionType

L'enum _CollectionType_ ha lo scopo di modellare di categorizzare i tipi di collezioni disponibili nel sistema: file (_file_), requisiti (_requirements_) e frammenti di codice (_chunks_).

##### Config

Il modulo _Config_ ha lo scopo di modellare la configurazione del sistema.
Contiene un enum (_ConfigKey_) e la rispettiva interfaccia (_Config_) la quale rappresenta l'insieme delle configurazioni. In campi testuali vengono rappresenti: endpoint dell'applicativo %%Ollama|ollama%% (_endpoint_), il token di autenticazione (_bearerToken_), il nome del modello per la generazione di codice (_model_), il nome del modello per l'embedding (_embeddingModel_) e il prompt personalizzato (_promptRequirementAnalysis_). Come opzionali, sono disponibili: un campo la selezione di un modello di embedding personalizzato (_customEmbeddingModel_) e un campo per la selezione di un modello per la generazione di codice personalizzato (_customModel_). In campi numerici vengono rappresentati la temperature dei modelli (_temperature_) e il numero massimo di risultati (_maxResults_). Inoltre è presente un campo per l'interfaccia _ConfigFilters_ anch'essa definita all'interno del modulo e che rappresenta i filtri applicabili nella ricerca: basati su percorsi dei file (_path_), sulle estensioni dei file (_file_extension_) e sui requisiti selezionati (_requirement_).

##### Filter

L'interfaccia _Filter_ ha lo scopo di modellare un filtro. L'interfaccia è estesa dalle interfacce: _PathFilter_ che rappresenta un filtro per percorso file, _FileExtensionFilter_ che rappresenta un filtro per tipologia di estensione del file e _RequirementFilter_ che rappresenta un filtro per requisito.

##### TrackingModel

Il modulo _TrackingModel_ ha lo scopo di modellare il tracciamento dell'implementazione dei requisiti all'interno dei file selezionati.
Definisce l'interfaccia _CodeReference_ che rappresenta il riferimento ad una porzione di codice. Contiene, come valore testuale, il percorso del file (_filePath_), il frammento effettivo del codice (_snippet_) e come opzionale il motivo della scelta dell'accoppiamento (_relevanceExplanation_). In forma numerica, specifica le linee di codice (_lineNumber_) e il punteggio (_score_).
Definisce l'interfaccia _TrackingResult_ che associa un requisito (_requirementId_) con una porzione di codice (_codeReference_), il punteggio (_score_) e lo stato di implementazione. Contiene, inoltre, un oggetto del tipo _ContextRange_ che contiene la linea iniziale e la linea finale dello _snippet_.
Definisce l'interfaccia _TrackingResultDetails_ che rappresenta lo stato globale del tracciamento dei requisiti. Contiene, come valori numerici, il totale dei requisiti (_totalRequirements_), il numero dei requisiti confermati (_confirmedMatches_), il numero di possibili match codice-requisito (_possibleMatches_) e match improbabili (_unlikelyMatches_).
Definisce l'interfaccia _TrackingResultSummary_ che estende _TrackingResultDetails_ aggiungendo una mappa con oggetti del tipo _TrackingResult_ e il requisito.

#### View

<img src="/img/Diagrams/views.png" alt="Views UML Diagram" data-width="70%" />

##### ChatWebView

La classe _ChatWebView_ è responsabile della generazione e della gestione dell'interfaccia grafica della chat dell'estensione. Infatti si occupa della gestione del codice HTML, CSS e si interfaccia con il _FileSystemService_.

##### TrackerWebView

La classe _ChatWebView_ è responsabile della generazione e della gestione dell'interfaccia grafica del tracker dei requisiti. Infatti si occupa della gestione del codice HTML, CSS e si interfaccia con il _FileSystemService_.

#### Presenter

<img src="/img/Diagrams/providers.png" alt="Providers UML Diagram" data-width="70%" />

##### ChatWebViewProvider

La classe _ChatWebViewProvider_ è responsabile della gestione della _ChatWebView_ che rappresenta la chat.
Mette a disposizione i metodi:

- **resolveWebviewView** il quale permette di configurare e inizializzare la vista webview quando viene creata, caricando la cronologia delle chat.
- **webviewViewConfigure** (_privato_) il quale permette di configurare le opzioni della webview e imposta l'HTML iniziale.
- **webviewViewHandleEvents** (_privato_) il quale permette di registrare i gestori degli eventi per i messaggi ricevuti dalla webview.
- **handleMessageFromWebview** il quale permette di elaborare i messaggi ricevuti dalla webview e indirizza ai metodi specifici in base al tipo.
- **onSendMessage** (_privato_) il quale permette di gestire l'invio di un messaggio dell'utente, ottenendo e mostrando una risposta dal modello.
- **onClearHistory** (_privato_) il quale permette di cancellare la cronologia dei messaggi della chat.
- **sendMessageToWebview** (_privato_) il quale permette di inviare un messaggio alla webview per aggiornare l'interfaccia utente.

##### TrackerWebViewProvider

La classe _TrackerWebViewProvider_ è responsabile della gestione della _TrackerWebView_ che rappresenta il tracciamento dei requisiti.
Mette a disposizione i metodi:

- **resolveWebviewView** il quale permette di configurare e inizializzare la vista webview quando viene creata.
- **onChangeTextEditorSelection** il quale permette di gestire gli eventi di selezione del testo nell'editor quando in modalità di modifica.
- **onAnalyzeImplementation** (_privato_) il quale permette di analizzare l'implementazione di un requisito rispetto ai riferimenti di codice.
- **webviewViewConfiguration** (_privato_) il quale permette di configurare le opzioni della webview e imposta l'HTML iniziale.
- **webviewViewHandleEvents** (_privato_) il quale permette di registrare i gestori degli eventi per i messaggi ricevuti dalla webview.
- **sendMessageToWebview** (_privato_) il quale permette di inviare un messaggio alla webview per aggiornare l'interfaccia utente.
- **handleMessageFromWebview** (_privato_) il quale permette di elaborare i messaggi ricevuti dalla webview e indirizza ai metodi specifici.
- **onTabToImport** (_privato_) il quale permette di attivare la scheda di importazione dei requisiti.
- **onTabToTrack** (_privato_) il quale permette di attivare la scheda di tracciamento dei requisiti.
- **onTabToResults** (_privato_) il quale permette attivare la scheda dei risultati del tracciamento.
- **onCancelEditImplementation** (_privato_) il quale permette di annullare la modifica dell'implementazione di un requisito.
- **onConfirmEditImplementation** (_privato_) il quale permette di confermare la modifica dell'implementazione di un requisito.
- **onStartEditMode** (_privato_) il quale permette di avviare la modalità di modifica per un riferimento di codice di un requisito.
- **startEditMode** (_privato_) il quale permette di implementare la logica di avvio della modalità di modifica.
- **onEndEditMode** (_privato_) il quale permette di terminare la modalità di modifica.
- **onRejectRequirementImplementation** (_privato_) il quale permette di rifiutare un'implementazione di requisito specifica.
- **onConfirmRequirementImplementation** (_privato_) il quale permette di confermare un'implementazione di requisito specifica.
- **onImportRequirements** (_privato_) il quale permette di importare requisiti da un file con formato specifico.
- **onTrackRequirements** (_privato_) il quale permette di avviare il tracciamento dei requisiti specificati nel codice.
- **onOpenFile** (_privato_) il quale permette di aprire un file specifico nell'editor e si posiziona alla riga indicata.
- **onClearRequirements** (_privato_) il quale permette di cancellare tutti i requisiti attualmente tracciati.
- **updateRequirementsDisplay** (_privato_) il quale permette di aggiornare la visualizzazione dei requisiti nella webview.
- **updateTrackingResultsDisplay** (_privato_) il quale permette di aggiornare la visualizzazione dei risultati di tracciamento nella webview.
- **onEditRequirement** (_privato_) il quale permette di avviare la modifica di un requisito specifico.
- **onDeleteRequirement** (_privato_) il quale permette di eliminare un requisito specifico.
- **stopEditMode** (_privato_) il quale permette di arrestare la modalità di modifica attuale e ripristina lo stato normale.
- **serializeTrackingResults** (_privato_) il quale converte in formato leggibile dalla view un oggetto del tipo _TrackingResultSummary_.

#### Command

<img src="/img/Diagrams/commands.png" alt="Commands UML Diagram" data-width="70%" />

##### CommandsRegistry

La classe _CommandsRegistry_ si occupa di gestire la registrazione e l'esecuzione dei comandi dell'estensione (_ICommand_). Infatti è responsabile della gestione tra l'interfaccia utente e la business logic.
Mette a disposizione i metodi:

- **registerCommand** il quale registra un singolo comando nell'estensione e lo aggiunge al registro interno. Il comando viene collegato alla sua funzione di esecuzione e la sottoscrizione viene aggiunta al contesto dell'estensione.
- **registerCommands** il quale registra più comandi contemporaneamente, utilizzando il metodo registerCommand per ciascuno.
- **getCommand** il quale restituisce un comando specifico dal registro in base al nome.

I comandi implementati nell'estensione sono classi che estendono _ICommand_. Tutti mettono a disposizione i metodi getName, che restituisce il nome del comando, e execute contenente l'effettivo comportamento. Le classi sono:

- **ClearChatHistoryCommand** permette la cancellazione della cronologia delle conversazioni della chat. È accessibile con il nome "requirementsTracker.clearChatHistory".
- **ClearRequirementsHistoryCommand** permette la cancellazione di tutti i requisiti caricati nel sistema. È accessibile con il nome "requirementsTracker.clearRequirementsHistory".
- **InterrogateDocumentCommand** permette di analizzare l'intero contenuto del documento attivo nel contesto dei requisiti caricati. È accessibile con il nome "requirementsTracker.interrogateDocument".
- **InterrogateSelectionCommand** permette di analizzare solo il testo selezionato nell'editor attivo nel contesto dei requisiti caricati. È accessibile con il nome "requirementsTracker.interrogateSelection".
- **OpenSettingsCommand** permette di aprire direttamente la pagina delle impostazioni dell'estensione Requirements Tracker nell'interfaccia delle impostazioni di %%VSCode|vscode%%. È accessibile con il nome "requirementsTracker.openSettings".
- **OpenSidebarCommand** permette di aprire la barra laterale dell'estensione Requirements Tracker all'interno di %%VSCode|vscode%%. È accessibile con il nome "requirementsTracker.openSidebar".
- **ResetDatabaseCommand** permette di reimpostare il database vettoriale utilizzato per l'indicizzazione di codice e requisiti. È accessibile con il nome "requirementsTracker.resetDatabase".

##### ICommand

L'interfaccia _ICommand_ ha lo scopo di modellare un comando dell'applicazione. Modella i metodi:

- **execute** il quale permette l'esecuzione del comando e restituisce un _Promise_.
- **getName** il quale permette la restituzione del nome del comando.

#### Servizi e facade

##### FileSystemService

<img src="/img/Diagrams/fileSystem.png" alt="FileSystem Service UML Diagram" data-width="70%" />

La classe _FileSystemService_ si occupa delle interazioni con il file system per la gestione dei file.
Mette a disposizione i metodi:

- **read** il quale permette la lettura di un file a partire dal suo percorso.
- **setRootFolder** il quale permette di indicare la cartella di root.
- **getChucksum** il quale calcola il checksum di un file a partire dal suo percorso.

##### GlobalStateService

<img src="/img/Diagrams/globalState.png" alt="GlobalState Service UML Diagram" data-width="70%" />

La classe _GlobalStateService_ si occupa della gestione dello stato globale dell'estensione usando l'API di stato globale di %%VSCode|vscode%%.
Mette a disposizione i metodi:

- **updateState** il quale permette di aggiornare lo stato dell'applicazione riguardo i requisiti o la chat.
- **getState** il quale permette di ottenere lo stato dell'applicazione riguardo i requisiti o la chat.
- **clearState** il quale permette di cancellare lo stato dell'applicazione riguardo i requisiti o la chat.

##### Config

<img src="/img/Diagrams/config.png" alt="Config Service UML Diagram" data-width="70%" />

###### ConfigService

La classe _ConfigService_ si occupa di gestire la configurazione dell'estensione combinando le impostazioni globali provenienti da %%VSCode|vscode%% con le configurazioni del progetto.
Al suo interno contiene un'istanza del servizio _FileSystemService_ per l'aggiornamento delle configurazioni dell'%%applicativo|applicativo%%.
Mette a disposizione i metodi:

- **GetConfig** il quale ritorna un array di oggetti contenenti lo stato di tutte le configurazioni.
- **setWorkspaceFolder** il quale imposta la root folder del filesystem.
- **getLocalConfig** (_privato_) il quale ritorna lo stato delle configurazioni locali.
- **validatePathFilters** (_privato_) il quale controlla la validità dei percorsi indicati nei filtri.
- **validateFileExtensionFilters** (_privato_) il quale controlla la validità delle estensioni indicate nei filtri.
- **validateRequirementFilters** (_privato_) il quale controlla la validità dei requisiti indicati nei filtri.

###### ConfigServiceFacade

La classe _ConfigServiceFacade_ fornisce un accesso semplificato alla configurazione del sistema. Implementa il pattern facade e utilizza un singleton per garantire un'unica istanza dell'applicazione.
Mette a disposizione i metodi:

- **Init** (_statico_) il quale inizializza l'istanza singleton e la restituisce.
- **GetInstance** (_statico_) il quale restituisce l'istanza singleton esistente.
- **sync** il quale sincronizza la cache interna con le configurazioni più recenti.
- **getConfigValue** (_privato_) il quale restituisce un valore di configurazione specifico, sincronizzando se necessario.
- **getOllamaModel** il quale restituisce il nome del modello per la generazione del codice scelto.
- **getEmbeddingModel** il quale restituisce il modello di embedding scelto.
- **getMaxResults** il quale restituisce il numero massimo di risultati configurato.
- **getTemperature** il quale restituisce la temperatura configurata per il modello.
- **getEndpoint** il quale restituisce l'endpoint di %%Ollama|ollama%% configurato.
- **getBearerToken** il quale restituisce il token di autenticazione configurato.
- **getFilters** il quale restituisce i filtri scelti.
- **getPrompt** il quale restituisce il prompt scelti.
- **setWorkspaceFolder** il quale imposta la root folder del filesystem.

##### Requirement

<img src="/img/Diagrams/requirement.png" alt="Requirement Service UML Diagram" data-width="70%" />

###### RequirementsService

La classe _RequirementsService_ si occupa della gestione dei requisiti mappati con identificativo e oggetto _Requirement_ e interagisce con il _GlobalStateService_.
Mette a disposizione i metodi:

- **addRequirement** i quali permettono l'aggiunta di un singolo requisito.
- **addRequirements** i quali permettono l'aggiunta di più requisiti.
- **updateRequirementCodeReference** il quale si occupa di aggiornare la posizione del codice che implementa ciascun requisito.
- **updateRequirementStatus** il quale si occupa di aggiornare lo status di ciascun requisito.
- **saveRequirements** il quale memorizza i requisiti.
- **getRequirements** il quale restituisce la lista dei requisiti.
- **clearRequirements** il quale cancella la lista dei requisiti.
- **getById** il quale restituisce un requisito a partire dal suo id.
- **deleteRequirement** il quale cancella un requisito a partire dal suo id.
- **saveRequirements** (_privato_) il quale salva nel _GlobalStateService_ i requisiti.
- **loadRequirements** (_privato_) il quale aggiorna nel _GlobalStateService_ i requisiti.

###### RequirementsServiceFacade

La classe _RequirementsServiceFacade_ fornisce un accesso semplificato al servizio di tracciamento dei requisiti (_RequirementsTrackerService_, _ParsingService_ e _RequirementsService_).
Mette a disposizione i metodi:

- **importRequirements** il quale importa requisiti da file csv o reqif, li salva e crea embeddings.
- **trackRequirements** il quale traccia l'implementazione dei requisiti specificati.
- **analyzeImplementation** il quale analizza se un riferimento al codice implementa un requisito specifico.
- **getRequirement** il quale restituisce un requisito specifico per id.
- **deleteRequirement** il quale elimina un requisito specifico per id.
- **getAllRequirements** il quale restituisce tutti i requisiti.
- **clearRequirements** il quale elimina tutti i requisiti.
- **updateRequirementCodeReference** il quale si occupa di aggiornare la posizione del codice che implementa ciascun requisito.
- **updateRequirementStatus** il quale si occupa di aggiornare lo status di ciascun requisito.

###### ParsingService

La classe _ParsingService_ si occupa dell'analisi e della conversione di file in
formato csv o reqif in una struttura dati contenente i requisiti memorizzati al loro interno.
Mette a disposizione i metodi:

- **parseCSV** il quale gestisce la conversione dei file in formato csv che utilizzano separatori differenti.
- **parseREQIF** il quale gestisce la conversione dei file in formato reqif.
- **mapToRequirement** (_privato_) il quale restituisce un oggetto del tipo _Requirement_ a partire dai singoli record ottenuti dal file CSV.
- **parseReqIFObject** (_privato_) il quale restituisce un oggetto del tipo _Requirement_ a partire dai singoli record ottenuti dal file reqif.

###### FilterService

La classe _FilterService_ si occupa della gestione dei filtri ottenuti tramite _ConfigServiceFacade_ e memorizzati in un oggetto _ConfigFilters_.
Mette a disposizione i metodi:

- **getPathFilter** il quale restituisce i filtri per path memorizzati all'interno dell'istanza di _ConfigFilters_.
- **getFileExtensionFilter** il quale restituisce i filtri per estensione del file memorizzati all'interno dell'istanza di _ConfigFilters_.
- **getRequirementsFilter** il quale restituisce i filtri per tutti i requisiti memorizzati all'interno dell'istanza di _ConfigFilters_.
- **getRequirementFilter** il quale restituisce il filtro per il requisito specificato memorizzato all'interno dell'istanza di _ConfigFilters_.
- **hasRequirementsFilter** il quale restituisce se è presente un filtro, per il requisito specificato, memorizzato all'interno dell'istanza di _ConfigFilters_.

###### RequirementsTrackerService

La classe _RequirementsTrackerService_ si occupa della gestione del tracciamento dell'implementazione dei requisiti nel codice sorgente. Interagisce con il database vettoriale (_IVectorDatabase_), il servizio di gestione dei documenti (_DocumentServiceFacade_), i filtri (_FilterService_) e il modello %%LLM|llm%% (_ILanguageModel_).
Mette a disposizione i metodi:

- **analyzeImplementation** il quale analizza se il codice fornito implementa effettivamente il requisito creando il prompt con il quale interrogare il modello.
- **trackRequirementImplementation** il quale traccia l'implementazione di un singolo requisito, trovando codice correlato, convertendolo in riferimenti e determinando lo stato di implementazione e il punteggio.
- **processWorkspaceFiles** il quale elabora tutti i file del workspace applicando filtri, tramite il _DocumentServiceFacade_ e restituendo l'elenco dei file elaborati.
- **findRelatedCode** il quale cerca nel database vettoriale porzioni di codice correlate al requisito specificato a partire dalla descrizione del requisito.
- **convertToCodeReferences** (_privato_) il quale converte i frammenti di codice (chunks) in riferimenti al codice strutturati, ordinati per punteggio di rilevanza.
- **trackAllRequirements** il quale traccia tutti i requisiti forniti e restituisce un riepilogo complessivo.
- **determineImplementationStatus** (_privato_) il quale determina lo stato di implementazione in base al punteggio medio dei riferimenti al codice.
- **calculateImplementationScore** (_privato_) il quale calcola un punteggio complessivo per l'implementazione basato sui singoli riferimenti al codice trovati.
- **calculateAverageScore** (_privato_) il quale calcola il punteggio medio del punteggio dell'implementazione.
- **findWorkspaceCodeFiles** (_privato_) il quale trova tutti i file di codice nel workspace %%VSCode|vscode%% applicando i filtri di inclusione ed esclusione configurati.
- **getFilters** (_privato_) il quale restituisce i filtri per file e percorsi.
- **processRequirementFile** (_privato_) il quale elabora i file associati al requisito applicando filtri.
- **findSingleRequirementCodeFiles** (_privato_) il quale trova i file associati al requisito applicando i filtri di inclusione ed esclusione configurati.

##### TrackingResultService

<img src="/img/Diagrams/trackingResult.png" alt="Tracking Result Service UML Diagram" data-width="70%" />

La classe _TrackingResultService_ si occupa della gestione della persistenza e della manipolazione dei risultati del tracciamento dei requisiti.
Mette a disposizione i metodi:

- **saveTrackingResult** il quale salva i risultati del tracciamento, convertendoli nel formato di archiviazione interno e memorizzandoli nello stato globale.
- **getTrakingResult** il quale restituisce tutti i risultati di tracciamento come un array di oggetti TrackingResult.
- **getTrackingDetails** il quale restituisce i dettagli di riepilogo del tracciamento.
- **getTrakingResultSummary** il quale converte i dati in un oggetto TrackingResultSummary e lo restituisce.
- **clearRequirements** il quale elimina tutti i dati di tracciamento sia dalla memoria che dallo stato globale.
- **deleteRequirement** il quale elimina i dati di tracciamento di un singolo requisito sia dalla memoria che dallo stato globale.
- **removeCodeReference** il quale rimuove uno specifico riferimento al codice dal requisito tracciato, aggiornando i contatori e persistendo le modifiche.
- **getById** il quale restituisce un singolo risultato di tracciamento in base all'id del requisito.
- **confirmResult** il quale marca un risultato di tracciamento come confermato, aggiornando i contatori e rimuovendolo da quelli in stato pending.
- **deleteRequirement** (_privato_) il quale elimina i dati di tracciamento di un singolo requisito sia dalla memoria che dallo stato globale.
- **saveTrackingResult** (_privato_) il quale memorizza i dati di tracciamento nello stato globale.
- **loadTrackingResult** (_privato_) il quale aggiorna i dati di tracciamento nello stato globale.
- **TRStoDS** (_privato_) il quale converte un oggetto TrackingResultSummary nelle strutture dati interne del servizio.
- **DStoTRS** (_privato_) il quale converte le strutture dati interne in un oggetto TrackingResultSummary.
- **DStoGS** (_privato_) il quale converte le strutture dati interne nel formato richiesto per la persistenza nello stato globale.
- **GStoDS** (_privato_) il quale converte i dati provenienti dallo stato globale nelle strutture dati interne del servizio.

##### Document

<img src="/img/Diagrams/document.png" alt="Document Service UML Diagram" data-width="70%" />

###### DocumentFormatterService

La classe _DocumentFormatterService_ si occupa della formattazione del codice sorgente in frammenti (_chunks_) a seconda del linguaggio rilevato dal path (_language_).
Mette a disposizione il metodo:

- **getLanguageFromPath** (_privato_) il quale restituisce il linguaggio a partire dall'estensione del file.
- **formatSourceCode** il quale suddivide il file in chunks.

###### DocumentServiceFacade

La classe _DocumentServiceFacade_ fornisce un accesso semplificato al servizio di gestione dei documenti (_DocumentFormatterService_).
Mette a disposizione i metodi:

- **processFiles** il quale elabora un elenco di file, formattandoli e aggiungendoli al database vettoriale. Gestisce controlli di dimensione, calcolo di checksum e verifica dell'esistenza.
- **processWorkspaceFiles** il quale trova e processa tutti i file presenti nella cartella del progetto.

##### Inference

<img src="/img/Diagrams/inference.png" alt="Inference Service UML Diagram" data-width="70%" />

###### InferenceService

La classe _InferenceService_ si occupa della gestione delle inference basate sui modelli %%LLM|llm%% a partire da query eseguite sul database vettoriale.
Mette a disposizione i metodi:

- **query** il quale permette di effettuare una chiamata a %%LLM|llm%% tramite %%Ollama|ollama%%.
- **checkSystemRequirement** il quale permette di effettuare un controllo sulla connessione al servizio %%Ollama|ollama%%.
- **queryStream** il quale permette di effettuare una chiamata a %%LLM|llm%% tramite %%Ollama|ollama%% fornendo il risultato come stream.
- **getContextEndPrompt** (_privato_) il quale genera il prompt per l'interrogazione al modello a partire dal contesto.

###### ILanguageModel

L'interfaccia _ILanguageModel_ ha lo scopo di modellare l'interazione con i modelli %%LLM|llm%%. Modella i metodi:

- **generate** il quale genera una risposta testuale a partire da un prompt.
- **generateEmbeddings** il quale esegue l'embedding di una stringa.
- **refreshModels** il quale aggiorna i modelli in seguito a cambiamenti nella configurazione.
- **generateStream** il quale genera una risposta sotto forma di stream a partire da un prompt.
- **checkModelAvailability** il quale controlla se il modello è disponibile nell'endpoint indicato.
- **pullModel** il quale scarica il modello nell'endpoint indicato.

###### IVectorDatabase

L'interfaccia _IVectorDatabase_ ha lo scopo di modellare l'interazione con il database vettoriale. Modella i metodi:

- **addFiles** il quale permette l'aggiunta di un file nel database vettoriale.
- **addRequirements** il quale permette l'aggiunta di un requisiti nel database vettoriale.
- **addChunks** il quale permette l'aggiunta di frammenti di codice nel database vettoriale.
- **fileExists** il quale verifica se un file con un dato percorso e checksum esiste già nel database.
- **queryForFiles** il quale cerca file simili semanticamente alla domanda fornita.
- **queryForRequirements** il quale cerca requisiti simili semanticamente alla domanda fornita.
- **queryForChunks** il quale cerca frammenti di codice simili semanticamente alla domanda fornita.
- **resetDatabase** il quale permette di reimpostare il database, eliminando tutti i dati memorizzati.

###### LangChainOllamaAdapter

La classe _LangChainOllamaAdapter_ implementa l'interfaccia _ILanguageModel_ e si occupa di fornire un'implementazione per l'interazione dei modelli usando %%Ollama|ollama%%.
Oltre a fornire l'implementazione dei metodi dell'interfaccia, mette a disposizione:

- **Init** (_statico_) il quale inizializza l'istanza singleton e la restituisce.
- **GetInstance** (_statico_) il quale restituisce l'istanza singleton esistente.
- **initialize** (_privato_) il quale permette di configurare le istanze di %%Ollama|ollama%% e OllamaEmbeddings con i parametri di configurazione.
- **getEmbeddings** il quale permette di restituire l'istanza di OllamaEmbeddings utilizzata per generare gli embedding.
- **generate** il quale genera una risposta testuale a partire da un prompt.
- **generateEmbeddings** il quale esegue l'embedding di una stringa.
- **refreshModels** il quale aggiorna i modelli in seguito a cambiamenti nella configurazione.
- **generateStream** il quale genera una risposta sotto forma di stream a partire da un prompt.
- **checkModelAvailability** il quale controlla se il modello è disponibile nell'endpoint indicato.
- **pullModel** il quale scarica il modello nell'endpoint indicato.

###### LanceDBAdapter

La classe _LanceDbAdapter_ implementa l'interfaccia _IVectorDatabase_ e si occupa di fornire un'implementazione per la gestione dei file e dei requisiti usando LanceDB come database vettoriale.
Oltre a fornire l'implementazione dei metodi dell'interfaccia, mette a disposizione:

- **Init** (_statico_) il quale inizializza l'istanza singleton e la restituisce.
- **GetInstance** (_statico_) il quale restituisce l'istanza singleton esistente.
- **deleteFiles** il quale permette di eliminare file dal database.
- **getEmbeddings** il quale restituisce l'istanza di _OllamaEmbeddings_ utilizzata per generare gli embedding.
- **addFiles** il quale permette l'aggiunta di un file nel database vettoriale.
- **addRequirements** il quale permette l'aggiunta di un requisiti nel database vettoriale.
- **addChunks** il quale permette l'aggiunta di frammenti di codice nel database vettoriale.
- **fileExists** il quale verifica se un file con un dato percorso e checksum esiste già nel database.
- **queryForFiles** il quale cerca file simili semanticamente alla domanda fornita.
- **queryForRequirements** il quale cerca requisiti simili semanticamente alla domanda fornita.
- **queryForChunks** il quale cerca frammenti di codice simili semanticamente alla domanda fornita.
- **resetDatabase** il quale permette di reimpostare il database, eliminando tutti i dati memorizzati.
- **initialize** (_privato_) il quale permette di inizializzare la connessione al database e configura il servizio di embedding.
- **determineEmbeddingDimension** (_privato_) il quale permette di determinare la dimensione degli embedding generando un embedding di prova.
- **getDB** (_privato_) il quale permette di ottenere o creare una connessione al database.
- **tableExists** (_privato_) il quale permette di verificare se una tabella esiste nel database.
- **getTable** (_privato_) il quale permette di ottenere o creare una tabella nel database in base al tipo di collezione.

##### ChatService

<img src="/img/Diagrams/chat.png" alt="Chat Service UML Diagram" data-width="70%" />

La classe _ChatService_ rappresenta il servizio di chat fornito dall'estensione.
Al suo interno contiene un'istanza del servizio _GlobalStateService_ per l'aggiornamento dello stato dell'%%applicativo|applicativo%%.
Mette a disposizione i metodi asincroni:

- **addMessage** il quale permette l'aggiunta di nuovi messaggi.
- **saveMessage** il quale permette il salvataggio della cronologia della chat.
- **getMessage** il quale permette di recuperare un particolare messaggio in arrivo.
- **clearMessage** il quale permette di cancellare la cronologia della chat.

### Progettazione grafica

L'estensione si integra direttamente nell'interfaccia di %%VSCode|vscode%%, aggiungendo un nuovo pannello laterale identificato dal nome "REQUIREMENTS TRACKER". L'icona del pannello, rappresentata dal logo di %%Ollama|ollama%%, è visibile nella barra laterale ("barra attività") solitamente posizionata a sinistra.

L'estensione implementa due pannelli:

- **Requirements** che a sua volta contiene i pannelli **Import**, **Tracker** e **Results**
- **Chat**

#### Import

<img src="/img/GraphicDesign/Import.png" alt="Pannello Import" data-width="70%" />

Il pannello _Import_ permette di caricare dei requisiti in due modalità:

- Caricamento di un file locale (es. .csv o .reqIF), selezionabile tramite il pulsante "Choose File".
- Incollando i requisiti direttamente sulla sezione apposita (sotto "Or Paste Content").

Per caricare i requisiti bisogna inoltre selezionare il tipo di file (CSV o reqIF) sul pulsante di selezione sotto la sezione "Format". Esiste anche l'opzione di scegliere un delimitatore CSV personalizzato sotto la sezione "CSV Delimiter". Una volta scelto il file o dopo aver incollato a mano i requisiti, questi possono essere caricati tramite il pulsante "Import Requirements".

#### Track

<img src="/img/GraphicDesign/Track.png" alt="Pannello Track" data-width="70%" />

Nel pannello Track l'utente può:

- Tracciare requisiti specifici selezionandoli dalla lista caricata.
- Tracciare tutti i requisiti contemporaneamente selezionando l'opzione "Track all requirements".

Il tracciamento si avvia con il pulsante "Start Tracking".

È inoltre disponibile la funzionalità "Clear Requirements" che rimuove tutti i requisiti attualmente caricati.

#### Results

<img src="/img/GraphicDesign/Results.png" alt="Pannello Results" data-width="70%" />

Nel pannello Results vengono mostrati i risultati dell'analisi:

- Una sezione "Code Match Summary" presenta un riepilogo dei requisiti suddivisi in Confirmed match, Possible match e Unlikely match.
- L'utente può visualizzare i dettagli di ciascun requisito tracciato e cliccare su un riferimento per confermare o modificare l'implementazione proposta.

#### Chat

Il pannello Chat consente all'utente di porre domande sui requisiti e sulla loro implementazione.
L'assistenza è fornita tramite modelli di intelligenza artificiale integrati con %%Ollama|ollama%%, e può essere utilizzata per approfondimenti, verifiche o spiegazioni specifiche relative al contenuto e allo stato dei requisiti.

<!-- ::: {.no-export} -->
</NumberedWrapper>
<!-- ::: -->
