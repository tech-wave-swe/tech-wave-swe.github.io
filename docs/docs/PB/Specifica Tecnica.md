---
id: specifica_tecnica
title: "Specifica Tecnica"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 0.3.0
classification: Esterno
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Specifica Tecnica

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                    | Autore                | Data Verifica | Verificatore  |
|------------|----------|--------------------------------|-----------------------|---------------|---------------|
| 07/04/2025 | 0.3.0    |                                |                       |               |               |
| 19/03/2025 | 0.2.0    | Prima stesura delle tecnologie | Marcon Giulia         |               |               |
| 18/03/2025 | 0.1.0    | Prima stesura del documento    | Vasquez Manuel Felipe | 19/03/2025    | Marcon Giulia |

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>



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
- **Capitolato d'appalto C8: Requirement Tracker- Plug-in VS Code**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti informativi

- **Glossario**: [Glossario](../RTB/Glossario.md)

- **Analisi dei requisiti**: [Analisi dei requisiti](../RTB/Analisi_dei_requisiti.md)

- **Documentazione dell'Extension API di Visual Studio Code**: [https://code.visualstudio.com/api](https://code.visualstudio.com/api)

- **Documentazione di Ollama**: [https://github.com/ollama/ollama/tree/main/docs](https://github.com/ollama/ollama/tree/main/docs)

- **Documentazione di TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)




## Tecnologie

In questa sezione vengono descritti gli strumenti e le tecnologie utilizzati per lo sviluppo e l"implementazione del Requirement Tracker, un’estensione per Visual Studio Code (%%VSCode|vscode%%) che permette di tracciare e verificare i requisiti software. Le tecnologie sono state selezionate per garantire un’%%architettura|architettura%% modulare, scalabile e di facile manutenzione, con un focus particolare sull’integrazione con modelli di linguaggio avanzati (%%LLM|llm%%) e sulla gestione efficiente dei requisiti.

### Linguaggio di programmazione

#### TypeScript

TypeScript è un linguaggio di programmazione open-source sviluppato da Microsoft, che estende JavaScript aggiungendo il supporto per il tipaggio statico. Questo permette di identificare errori comuni durante la fase di sviluppo, migliorando la %%qualità|qualità%% del codice e facilitando il debugging. TypeScript è particolarmente adatto per progetti di medie e grandi dimensioni, dove la manutenibilità del codice è fondamentale.
È stato scelto per la sua integrazione nativa con %%VSCode|vscode%%, che semplifica lo sviluppo di estensioni, per la sua capacità di prevenire errori attraverso la tipizzazione statica e perché offre una vasta gamma di strumenti e librerie.

Utilizzo nel progetto:
- Sviluppo dell’estensione per %%VSCode|vscode%%: TypeScript è utilizzato per implementare le %%funzionalità|funzionalità%% principali dell’estensione, come il caricamento dei requisiti, l’analisi del codice e l’interazione con l’utente.
- Gestione delle %%funzionalità|funzionalità%% principali: Il linguaggio è impiegato per gestire la logica di business, come il parsing dei file di requisiti, l’interazione con i modelli %%LLM|llm%% e la gestione della struttura dati interna.
- Integrazione con le API di %%VSCode|vscode%%: TypeScript è utilizzato per interfacciarsi con le API di %%VSCode|vscode%%, permettendo la creazione di comandi personalizzati, la visualizzazione dei risultati e l’integrazione con l’editor di codice

Versione: 4.9.5

Documentazione: [TypeScript documentation](https://www.typescriptlang.org/docs/)

### Frameworks

#### VSCode Extension API

Le API di estensione di Visual Studio Code forniscono strumenti per la creazione di comandi, la gestione dei file, l’integrazione con l’editor di codice e la visualizzazione dei risultati. Queste API sono progettate specificamente per estendere le %%funzionalità|funzionalità%% di %%VSCode|vscode%%, permettendo agli sviluppatori di creare strumenti personalizzati che si integrano perfettamente con l’ambiente di sviluppo.
Sono state scelte per la loro integrazione nativa con %%VSCode|vscode%%, che semplifica lo sviluppo di estensioni e garantisce una perfetta compatibilità con l’ambiente di sviluppo.

Utilizzo nel progetto:
- Sviluppo dell’interfaccia utente dell’estensione: Le API di %%VSCode|vscode%% sono utilizzate per creare l’interfaccia utente dell’estensione, inclusa la visualizzazione della tabella dei requisiti, i bottoni di interazione e la gestione delle configurazioni.
- Integrazione con l’editor di %%VSCode|vscode%%: Le API permettono di interagire con l’editor di codice, ad esempio per evidenziare porzioni di codice che implementano specifici requisiti o per navigare tra i file del %%progetto|progetto%%.
- Gestione degli eventi: Le API di estensione sono utilizzate per gestire eventi come il caricamento di un file di requisiti, l’avvio di un’analisi o la modifica delle configurazioni.

Versione:

Documentazione: [VSCode API documentation](https://code.visualstudio.com/api)

### Strumenti per l’integrazione con modelli di intelligenza artificiale

#### Ollama

%%Ollama|ollama%% è uno strumento open-source che permette di eseguire localmente modelli di linguaggio avanzati (%%LLM|llm%%) come LLaMA ed è progettato per essere leggero e facile da configurare, permettendo agli sviluppatori di eseguire modelli %%LLM|llm%% direttamente sulla propria macchina senza la necessità di infrastrutture cloud complesse.
Uno dei principali vantaggi di %%Ollama|ollama%% è la sua capacità di eseguire modelli %%LLM|llm%% in locale, garantendo la privacy dei dati e riducendo la dipendenza da servizi esterni. Inoltre, %%Ollama|ollama%% supporta una vasta gamma di modelli, permettendo di scegliere quello più adatto alle esigenze del %%progetto|progetto%%.

Utilizzo nel progetto:
- Analisi del codice sorgente: %%Ollama|ollama%% è utilizzato per analizzare il codice sorgente e verificare l’implementazione dei requisiti. Il modello %%LLM|llm%% viene interrogato per generare risposte basate sul codice e sui requisiti specificati.
- Generazione di risposte basate sui modelli %%LLM|llm%%: %%Ollama|ollama%% è utilizzato per generare risposte che supportano lo sviluppatore nel controllo dei requisiti, ad esempio identificando porzioni di codice che implementano specifici requisiti.

Versione: 0.6.2

Documentazione: [Ollama documentation](https://github.com/ollama/ollama/tree/main/docs)

#### Vector Embeddings

I Vector Embeddings sono rappresentazioni numeriche di dati testuali, utilizzati per trasformare requisiti e codice in vettori. Questa tecnica permette di confrontare rapidamente i requisiti con il codice sorgente, migliorando l’%%efficienza|efficienza%% dell’analisi e la precisione dei risultati. I Vector Embeddings sono particolarmente utili in contesti dove è necessario confrontare grandi quantità di dati testuali, come nel caso dei requisiti software.
I Vector Embeddings funzionano mappando parole, frasi o interi documenti in uno spazio vettoriale multidimensionale, dove la similarità semantica tra i testi può essere misurata attraverso la distanza tra i vettori. Questo approccio permette di identificare rapidamente le corrispondenze tra i requisiti e il codice sorgente, riducendo i tempi di elaborazione e migliorando l’accuratezza dell’analisi.

Utilizzo nel progetto:
- Confronto rapido tra i requisiti e il codice sorgente: I Vector Embeddings sono utilizzati per trasformare i requisiti e il codice sorgente in vettori, permettendo di confrontarli rapidamente e identificare le corrispondenze.
- Miglioramento dell’%%efficienza|efficienza%% e della precisione dell’analisi: L’uso di Vector Embeddings permette di ridurre i tempi di elaborazione e migliorare l’accuratezza delle risposte fornite dai modelli %%LLM|llm%%.

Documentazione: Vector Embeddings (provvisorio)

#### LanceDB

LanceDB è un database vettoriale open-source progettato per offrire elevate prestazioni nella gestione e nella ricerca di Vector Embeddings. È particolarmente indicato per applicazioni che fanno uso intensivo di modelli di linguaggio (%%LLM|llm%%) e analisi semantica di dati testuali. LanceDB combina un motore di ricerca vettoriale efficiente con un formato di storage ottimizzato (Lance), permettendo interrogazioni rapide anche su dataset di grandi dimensioni. 

Utilizzo nel progetto:
- Indicizzazione e ricerca vettoriale: LanceDB viene utilizzato per indicizzare i requisiti e il codice sorgente rappresentati come embeddings vettoriali, permettendo un confronto efficiente basato sulla similarità semantica.
- Persistenza locale dei dati: Il database permette di salvare localmente i dati elaborati, garantendo prestazioni elevate senza dover dipendere da servizi cloud.
- Ottimizzazione delle risposte %%LLM|llm%%: Utilizzando LanceDB è possibile migliorare la qualità delle risposte generate dai modelli %%LLM|llm%%, restringendo il contesto ai risultati più rilevanti trovati tramite la ricerca vettoriale.

Versione: 0.3.3

Documentazione: [LanceDB documentation](https://lancedb.github.io/lancedb/)

### Strumenti per i test

#### Jest

Jest è un framework di testing JavaScript open-source sviluppato da Facebook. È utilizzato per scrivere e eseguire %%test|test%% automatizzati, garantendo che il codice funzioni come previsto. Jest è particolarmente apprezzato per la sua configurazione minima e per le sue capacità avanzate come il mock delle funzioni e la gestione dei %%test|test%% paralleli. È compatibile con progetti che utilizzano TypeScript e offre un'ottima integrazione con altri strumenti di sviluppo, come i framework di build e i bundler.

Utilizzo nel progetto:
-Testing unitario: Jest è utilizzato per scrivere %%test|test%% unitari che verificano il corretto funzionamento delle singole funzioni e componenti dell'estensione.
- Testing di integrazione: I %%test|test%% di integrazione sono stati scritti per garantire che diverse parti dell'estensione interagiscano correttamente, ad esempio, tra la logica di business e l'integrazione con le API di %%VSCode|vscode%%.
- Mocking di funzioni esterne: Jest consente di simulare comportamenti di funzioni esterne come la comunicazione con i modelli di linguaggio, facilitando i %%test|test%% senza dipendenze esterne.
- %%Verifica|verifica%% dei flussi di lavoro: Vengono testati i flussi di lavoro principali dell'estensione, come il caricamento dei requisiti, l'analisi del codice e l'interazione dell'utente.

Versione: 28.0.0

Documentazione: [Jest documentation](https://jestjs.io/docs/getting-started)

### Formati di file per la gestione dei requisiti

#### CSV

Il formato CSV (Comma-Separated Values) è un formato di file semplice e leggero, ampiamente utilizzato per la gestione di dati strutturati. Consente di importare ed esportare i requisiti software in modo rapido e intuitivo. CSV è particolarmente adatto per progetti che richiedono una gestione semplice e veloce dei dati, senza la necessità di strutture complesse.

Utilizzo nel progetto:
- Importazione ed esportazione dei requisiti software: CSV è utilizzato per importare ed esportare i requisiti software, permettendo una facile integrazione con strumenti esterni per la gestione dei dati.

Documentazione: [CSV Format specification](https://datatracker.ietf.org/doc/html/rfc4180)

#### ReqIF

ReqIF (Requirements Interchange Format) è uno standard per lo scambio di requisiti tra diversi strumenti di gestione. Offre un formato strutturato e flessibile, adatto a progetti complessi che richiedono una gestione avanzata dei requisiti. ReqIF è progettato per supportare la gestione di grandi quantità di requisiti, garantendo la compatibilità tra diversi strumenti e piattaforme.

Utilizzo nel progetto:
- Gestione di progetti complessi: ReqIF è utilizzato per gestire progetti che richiedono un formato strutturato, garantendo una migliore organizzazione dei dati e una maggiore flessibilità.

Documentazione: [ReqIF specification](https://www.omg.org/spec/ReqIF/About-ReqIF/)




## Architettura

### Architettura logica

L’architettura implementata si basa sugli eventi (EDA) generati dall’utente tramite l’applicativo VS Code. Per questo motivo, è stato scelto di usare l’architettura Model View Presenter (MVP).

#### Event driven architecture (EDA)

Un’architettura guidata dagli eventi (EDA) è un’architettura software e un modello per la progettazione di applicazioni. Molti progetti di applicazioni moderne sono event-driven, come ad esempio il framework di Visual Studio Code. Le applicazioni event-driven possono essere create in qualsiasi linguaggio di programmazione, perché l’event-driven è un approccio di programmazione, non un linguaggio. Un’EDA è generalmente loosely coupled, perché i produttori di eventi non sanno quali consumatori sono in ascolto per un evento e l’evento non sa quali sono le conseguenze del suo “arrivo”. L’architettura event-driven offre infatti il grande vantaggio del disaccoppiamento, in cui produttori e consumatori di dati o servizi non devono comunicare direttamente, ma la loro attività è gestita centralmente da un componente terzo, consentendo un sistema più flessibile e scalabile. Questo a sua volta semplifica l’integrazione di nuovi componenti, promuove la tolleranza ai guasti e migliora l’efficienza complessiva del sistema.

#### Model View Presenter (MVP)

Il Model-View-Presenter (MVP) è una derivazione dello schema Model-View-Controller (MVC). Entrambi sono ampiamente utilizzati per la creazione di applicazioni con interfaccia utente.
I principali vantaggi del modello MVP sono:
- Separation of Concerns: dividere il codice in parti separate, ciascuna con la propria responsabilità. Ciò rende il codice più semplice, più riutilizzabile e più facile da gestire.
- Unit Testing: poiché la logica (il presenter) dell'interfaccia utente è separata dal livello visivo (la view), è molto più facile testare queste parti in modo isolato.

In MVP le tre componenti sono suddivise come segue:
- Il model è un interfaccia che definisce i dati da visualizzare o su cui agire dall’'interfaccia utente.
- La view è un interfaccia passiva che visualizza i dati (dal modello) e indirizza i comandi dell'utente (eventi) al presenter affinché agisca su tali dati.
- Il presenter agisce sul model e sulla view. Recupera i dati dai repository (il modello) e li formatta per la visualizzazione nella vista.

### Architettura di deployment

#### Monolite

Un'architettura monolitica è un modello tradizionale di un programma software, che è costruito come un'unità unificata, autosufficiente e indipendente da altre applicazioni. Un'architettura monolitica è una rete di elaborazione singolare e di grandi dimensioni con una codebase che unisce insieme tutti i business concerns. Per apportare una modifica a questo tipo di applicazione è necessario aggiornare l'intero stack accedendo alla codebase e creando e distribuendo una versione aggiornata dell'interfaccia lato servizio. Ciò rende gli aggiornamenti restrittivi, dispendiosi in termini di tempo e consente di rilasciare tutto il monolite in una volta.

I vantaggi di un'architettura monolitica includono: 
- Facile distribuzione : un file eseguibile o una directory semplificano la distribuzione.
- Sviluppo: quando un'applicazione viene creata con una singola codebase, è più facile svilupparla.
- Prestazioni: in una codebase e un repository centralizzati, un'API può spesso eseguire la stessa funzione che numerose API eseguono con i microservizi.
- Test semplificati: poiché un'applicazione monolitica è un'unità singola e centralizzata, i test end-to-end possono essere eseguiti più velocemente rispetto ad un'applicazione distribuita. 
- Debug semplice: con tutto il codice in un unico posto, è più facile seguire una richiesta e trovare un problema.

Gli svantaggi di un monolite includono: 
- Velocità di sviluppo più lenta: un'applicazione monolitica e di grandi dimensioni rende lo sviluppo più complesso e lento.
- Scalabilità: non è possibile scalare i singoli componenti.
- Affidabilità: se si verifica un errore in un modulo, ciò potrebbe influire sulla disponibilità dell'intera applicazione.
- Barriera all'adozione della tecnologia: qualsiasi modifica al framework o al linguaggio influisce sull'intera applicazione, rendendo spesso le modifiche costose e dispendiose in termini di tempo.
- Mancanza di flessibilità: un monolite è vincolato dalle tecnologie già utilizzate al suo interno.
- Distribuzione: una piccola modifica a un'applicazione monolitica richiede la ridistribuzione dell'intero monolite.

### Design pattern

####  Dependency Injection 

È un *pattern architetturale* che consiste nel fornire le dipendenze di un oggetto dall’esterno, tramite il passaggio di parametri nel costruttore, invece di crearle internamente. Questo facilita l’implementazione di test di unità che utilizzano mock e garantisce di avere oggetti validi sin dall’istanziazione dell’oggetto della classe.

#### MVP

È un *pattern architetturale* con lo scopo di separare le responsabilità dei componenti di un’applicazione. Come già indicato nella sezione _/Architettura Logica/_ è stato utilizzato per l’implementazione dell’intero applicativo in quanto era necessario coordinare le componenti di dati e logica e interfaccia utente. 
Il *model* è implementata dalle classi _TrackingResultService_, _ChatService_ e _InferenceService_.
La *view*, ovvero l’interfaccia grafica, è implementata dalla classe _TrackerWebView_, che rappresenta il pannello di visualizzazione dello stato di implementazione dei requisiti, e dalla classe _ChatWebView_ che rappresenta la chat tra l’utente e il modello.
Il * presenter* è implementato dalle rispettive classi _ChatWebviewProvider_ e _TrackerWebviewProvider_ e rappresenta la gestione tra la business logic e l’interfaccia utente.

#### Singleton

È un *pattern creazionale* che garantisce l’esistenza di un’unica istanza di una classe e permette di avere un punto di accesso globale a questa. 
È stato utilizzato nella classe _GlobalStateService_ la quale rappresenta lo stato nell’applicativo. All’interno sono memorizzati la chat e la lista dei requisiti con le relative informazioni. È necessario garantire l’unicità in quanto, per ogni scheda di VS Code aperta, è possibile avere una sola istanza dell’estensione.
Allo stesso modo, la classe _ConfigServiceFacade_ rappresenta le configurazioni scelte dall’utente sia nel contesto globale che nel singolo progetto ed è necessario quindi siano memorizzate in un’unica istanza per non generare conflitti.
In entrambi i casi risulta molto utile l’uso del Singleton per avere un punto di accesso globale alle informazioni.

#### Adapter

È un *pattern strutturale* che permette di convertire un’interfaccia di una classe in un’altra. Questo si implementa definendo una classe adapter che adatti le interfacce.
È stato utilizzato nella classe _LanceDBAdapter_ per permettere all’applicativo di interfacciarsi con il database vettoriale per memorizzare il parsing dei requisiti e il loro stato.
È stato utilizzato anche nella _LangChainOllamaAdapter_ che permette l’interfaccia con l’applicativo Ollama che gestisce l’interrogazione e il funzionamento dei modelli LLM.

#### Facade

È un *pattern strutturale* che permette di fornire un’interfaccia unica semplice per un sottosistema complesso. Questo permette di diminuire la complessità del sistema.
È stato usato nella classe _DocumentServiceFacade_ la quale fornisce una serie di metodi per la formattazione e la trasformazione in formato vettoriale dei documenti da analizzare da LLM. Infatti, la classe si interfaccia con l'estensione e il contesto dell’utente per analizzare i file selezionati e per permetterne l’elaborazione e la memorizzazione nel database.
In modo simile, è stato usato nella classe _RequirementsServiceFacade_ la quale implementa al suo interno i metodi per la gestione dell’importazione e il tracciamento dei requisiti.
È stato usato anche nella classe _ConfigServiceFacade_ la quale mette a disposizione i metodi per la modifica delle configurazioni dell’utente e dialoga con la classe _ConfigService_.
Queste scelte hanno permesso di diminuire la complessità del sistema unificando funzionalità articolate all’interno di metodi di utilità.

#### Command

È un *pattern comportamentale* che permette di incapsulare una richiesta in un oggetto con lo scopo di rendere i client indipendenti dalle richieste. Una Classe astratta, Command, definisce l’interfaccia per eseguire la richiesta.
È stata creata un’interfaccia _ICommand_, contenente una _Promise_ la quale viene implementata dalle classi: _ClearChatHistoryCommand_, _ClearRequirementsHistoryCommand_, _InterrogateDocumentCommand_, _InterrogateSelectionCommand_,  _OpenSettingsCommand_, 
_OpenSidebarCommand_ e _ResetDatabaseCommand_. Queste corrispondono ai comandi che l’utente può richiedere all’estensione. È stato scelto questo pattern per garantire una facile estensione delle funzionalità, rendendo semplice l’aggiunta di nuovi comandi, e per garantire il rispetto del _principio di separazione delle responsabilità_.

#### Memento
È un *pattern comportamentale* che permette di salvare e recuperare lo stato di un oggetto senza rivelare dettagli della sua implementazione.
Questa scelta architetturale è imposta da VS Code Extension API che richiede di utilizzarlo per la gestione del _workspaceState_ e del _globalState_, da noi utilizzate nella classe _GlobalStateService_.

[Documentazione Memento](https://code.visualstudio.com/api/references/vscode-api#Memento) 

#### Strategy

È un *pattern comportamentale* che definisce una famiglia di algoritmi, rendendoli interscambiabili e indipendenti dal client.
Usato nella classe _ParsingService_ in quanto si ha l’esigenza di avere due differenti varianti dello stesso algoritmo. Infatti l’estrapolazione di requisiti può essere svolta prendendo le informazioni da un file in formato csv o in requif. Questo permette il riuso del contesto ed una gestione separata dei due algoritmi. Rende facile anche l’implementazione di nuovi algoritmi per la gestione di formati diversi.

### Diagramma delle classi = servizi implementati [generale + singola classe]

Il diagramma delle classi fornisce una panoramica generale della struttura interna dell'estensione, evidenziando i principali componenti software, le loro responsabilità e le relazioni tra essi. L'architettura è progettata per essere modulare e estendibile seguendo un approccio event-driven nelle interazioni con VS Code e basato sul pattern MVP per l'organizzazione interna.

I componenti sono suddivisi in diversi blocchi funzionali:

- **Comandi**: Rappresentano le azioni attivabili dall'utente. Sono centralizzati nel CommandRegistry e implementano un'interfaccia comune che definisce il comportamento standard dei comandi.
- **Interfaccia VS Code**: Contiene le componenti fornite da VS Code e gestisce la creazione e la visualizzazione delle WebView.
- **Provider**: Agiscono come intermediari tra la WebView e i servizi applicativi. Ricevono eventi dalla UI e instradano le richieste verso i servizi appropriati.
- **WebView**: Sono i componenti grafici visualizzati all'interno dell'estensione. Si interfacciano con i rispettivi provider per ricevere dati o inviare comandi.
- **Servizi centrali**: Contengono la logica principale per la gestione delle interazioni in chat e l'esecuzione di inferenze su modelli linguistici. Interagiscono direttamente con adattatori e il database vettoriale.
- **Gestione dello stato**: Implementato come singleton, mantiene lo stato persistente dell'estensione e fornisce metodi di lettura/scrittura accessibili a più componenti.
- **Adapter e interfacce esterne**: Permettono di astrarre e integrare tecnologie esterne per il database vettoriale e i modelli LLM.
- **Servizi di tracciamento e gestione requisiti**: Coordinano le attività legate alla gestione, analisi e tracciamento dei requisiti software.
- **Servizi documentali**: Gestiscono l'elaborazione dei file sorgente in frammenti per l'analisi semantica.
- **Configurazione e file system**: Si occupano rispettivamente della lettura e validazione delle configurazioni e dell'accesso al file system del progetto.

Il  modello di comunicazione ibrido permette di sfruttare la flessibilità dell'architettura event-driven nelle interazioni con VS Code, mantenendo al contempo un flusso di controllo chiaro e prevedibile all'interno dell'estensione stessa.

[INSERIRE QUI IMMAGINE DEL DIAGRAMMA DELLE CLASSI]


#### Architettura di dettaglio

#### Model

##### ChatMessage

L’interfaccia *ChatMessage* ha lo scopo di modellare un messaggio di una chat.
Definisce la struttura di ogni messaggio indicando il mittente (_sender_) che può essere l’utente (_user_) o il modello LLM (_model_), il contenuto del messaggio in forma di stringa (_text_) e un timestamp che indica quando il messaggio è stato inviato.

##### File

L’interfaccia *File* ha lo scopo di modellare un file all’interno del progetto. Memorizza all’interno di campi testuali: il contenuto originale del file (_originalContent_), il percorso (_filepath_), il checksum per la verifica dell’integrità (_checksum_) e come campo numerico opzionale, un punteggio usato per valutare la rilevanza (_score_).

##### Requirement

L’interfaccia *Requirement* ha lo scopo di modellare un requisito software. Memorizza, all'interno di campi testuali: l’identificativo univoco (_id_), il nome (_name_), la descrizione (_description_), la tipologia (_type_) e la versione (_version_). Inoltre vengono memorizzati: lo stato tramite un oggetto del tipo _RequirementStatus_ (_status_) e come campi opzionali il punteggio (_score_) e la porzione di codice dove è stato implementato (_codereference_).
_RequirementStatus_ è un enum definito all’interno che rappresenta lo stato di implementazione di un requisito: tracciato (_TRACKED_), non tracciato (_NOT/_TRACKED_), pendente (_PENDING_) e sconosciuto (_UNKNOW_).

##### Chunk

L’interfaccia *Chunk* ha lo scopo di modellare un frammento di codice o testo a partire da un file. Memorizza in campi testuali il contenuto (_content_), il percorso del file di partenza (_filePath_) e la tipologia di file (_fileType_), mentre in campi numerici memorizza la lunghezza in linee (_lineNumber_) e, come opzionale, un punteggio usato per valutare la rilevanza (_score_).

##### CollectionType

L’enum *CollectionType* ha lo scopo di modellare di categorizzare i tipi di collezioni disponibili nel sistema: file (_file_), requisiti (_requirements_) e frammenti di codice (_chunks_).

##### Config

Il modulo *Config* ha lo scopo di modellare la configurazione del sistema.
Contiene un enum (_ConfigKey_) e la rispettiva interfaccia (_Config_) la quale rappresenta l’insieme delle configurazioni. In campi testuali vengono rappresenti: endpoint dell’applicativo Ollama (_endpoint_), il token di autenticazione (_bearerToken_), il nome del modello per la generazione di codice (_model_), il nome del modello per l’embedding (_embeddingModel_). In campi numerici vengono rappresentati la temperature dei modelli (_temperature_) e il numero massimo di risultati (_maxResults_). Inoltre è presente un campo per l’interfaccia _ConfigFilters_ anch’essa definita all’interno del modulo e che rappresenta i filtri applicabili nella ricerca: basati su percorsi dei file (_path_), sulle estensioni dei file (_file/_extension_) e sui requisiti selezionati (_requirement_).

##### Filter

L’interfaccia *Filter* ha lo scopo di modellare un filtro. L’interfaccia è estesa dalle interfacce: _PathFilter_ che rappresenta un filtro per percorso file, _FileExtensionFilter_ che rappresenta un filtro per tipologia di estensione del file e _RequirementFilter_ che rappresenta un filtro per requisito.

##### TrackingModel

Il modulo *TrackingModel* ha lo scopo di modellare il tracciamento dell’implementazione dei requisiti all’interno dei file selezionati.
Definisce l’interfaccia _CodeReference_ che rappresenta il riferimento ad una porzione di codice. Contiene, come valore testuale, il percorso del file (_filePath_), il frammento effettivo del codice (_snippet_) e come opzionale il motivo della scelta dell’accoppiamento (_snippet_). In forma numerica, specifica le linee di codice (_lineNumber_) e il punteggio (_score_).
Definisce l’interfaccia _TrackingResult_ che associa un requisito (_requirementId_) con una porzione di codice (_codeReference_), il punteggio (_score_) e lo stato di implementazione.
Definisce l’interfaccia _TrackingResultDetails_ che rappresenta lo stato globale del tracciamento dei requisiti. Contiene, come valori numerici, il totale dei requisiti (_totalRequirements_), il numero dei requisiti confermati (_confirmedMatches_), il numero di possibili match codice-requisito (_possibleMatches_) e match improbabili (_unlikelyMatches_).
Definisce l’interfaccia _TrackingResultSummary_ che estende _TrackingResultDetails_ aggiungendo una mappa con oggetti del tipo _TrackingResult_ e il requisito.

#### View

##### ChatWebView

La classe *ChatWebView* è responsabile della generazione e della gestione dell’interfaccia grafica della chat dell’estensione. Infatti si occupa della gestione del codice HTML, CSS e si interfaccia con il _FileSystemService_.

##### TrackerWebView
La classe *ChatWebView* è responsabile della generazione e della gestione dell’interfaccia grafica del tracker dei requisiti. Infatti si occupa della gestione del codice HTML, CSS e si interfaccia con il _FileSystemService_.

#### Presenter (Providers)

##### ChatWebViewProvider

La classe *ChatWebViewProvider* è responsabile della creazione e della gestione della _ChatWebView_ che rappresenta la chat.
Mette a disposizione i metodi:
- resolveWebviewView il quale permette di configurare e inizializzare la vista webview quando viene creata, caricando la cronologia delle chat.
- /_webviewViewConfigure il quale permette di configurare le opzioni della webview e imposta l'HTML iniziale.
- /_webviewViewHandleEvents il quale permette di registrare i gestori degli eventi per i messaggi ricevuti dalla webview.
- /_handleMessageFromWebview il quale permette di elaborare i messaggi ricevuti dalla webview e indirizza ai metodi specifici in base al tipo.
- /_onSendMessage il quale permette di gestire l'invio di un messaggio dell'utente, ottenendo e mostrando una risposta dal modello.
- /_onClearHistory  il quale permette di cancellare la cronologia dei messaggi della chat.
- /_sendMessageToWebview il quale permette di inviare un messaggio alla webview per aggiornare l'interfaccia utente.

##### TrackerWebViewProvider

La classe *TrackerWebViewProvider* è responsabile della creazione e della gestione della _TrackerWebView_ che rappresenta il tracciamento dei requisiti. 
Mette a disposizione i metodi:
- resolveWebviewView il quale permette di configurare e inizializzare la vista webview quando viene creata.
- onChangeTextEditorSelection il quale permette di gestire gli eventi di selezione del testo nell'editor quando in modalità di modifica.
- /_onAnalyzeImplementation il quale permette di analizzare l'implementazione di un requisito rispetto ai riferimenti di codice.
- /_webviewViewConfiguration il quale permette di configurare le opzioni della webview e imposta l'HTML iniziale.
- /_webviewViewHandleEvents  il quale permette di registrare i gestori degli eventi per i messaggi ricevuti dalla webview.
- /_sendMessageToWebview  il quale permette di inviare un messaggio alla webview per aggiornare l'interfaccia utente.
- /_handleMessageFromWebview  il quale permette di elaborare i messaggi ricevuti dalla webview e indirizza ai metodi specifici.
- /_onTabToImport il quale permette di attivare la scheda di importazione dei requisiti.
- /_onTabToTrack il quale permette di attivare la scheda di tracciamento dei requisiti.
- /_onTabToResults il quale permette attivare la scheda dei risultati del tracciamento.
- /_onCancelEditImplementation il quale permette di annullare la modifica dell'implementazione di un requisito.
- /_onConfirmEditImplementation il quale permette di confermare la modifica dell'implementazione di un requisito.
- /_onStartEditMode il quale permette di avviare la modalità di modifica per un riferimento di codice di un requisito.
- /_startEditMode il quale permette di implementare la logica di avvio della modalità di modifica.
- /_onEndEditMode il quale permette di terminare la modalità di modifica.
- /_onRejectRequirementImplementation il quale permette di rifiutare un'implementazione di requisito specifica.
- /_onConfirmRequirementImplementation il quale permette di confermare un'implementazione di requisito specifica.
- /_onImportRequirements il quale permette di importare requisiti da un file con formato specifico.
- /_onTrackRequirements il quale permette di avviare il tracciamento dei requisiti specificati nel codice.
- /_onOpenFile il quale permette di aprire un file specifico nell'editor e si posiziona alla riga indicata.
- /_onClearRequirements il quale permette di cancellare tutti i requisiti attualmente tracciati.
- /_updateRequirementsDisplay il quale permette di aggiornare la visualizzazione dei requisiti nella webview.
- /_updateTrackingResultsDisplay il quale permette di aggiornare la visualizzazione dei risultati di tracciamento nella webview.
- /_onEditRequirement il quale permette di avviare la modifica di un requisito specifico.
- /_onDeleteRequirement il quale permette di eliminare un requisito specifico.
- /_stopEditMode il quale permette di arrestare la modalità di modifica attuale e ripristina lo stato normale.

#### Command

##### CommandsRegistry

La classe *CommandsRegistry* si occupa di gestire la registrazione e l’esecuzione dei comandi dell’estensione (_ICommand_). Infatti è responsabile della gestione tra l’itnerfaccia utente e la business logic.
Mette a disposizione i metodi:
- registerCommand il quale registra un singolo comando nell'estensione e lo aggiunge al registro interno. Il comando viene collegato alla sua funzione di esecuzione e la sottoscrizione viene aggiunta al contesto dell'estensione.
- registerCommands il quale registra più comandi contemporaneamente, utilizzando il metodo registerCommand per ciascuno.
- getCommand il quale restituisce un comando specifico dal registro in base al nome. 

I comandi implementati nell’estensione sono classi che estendono _ICommands_. Tutti mettono a disposizione i metodi getName, che restituisce il nome del comando, e execute contenente l’effettivo comportamento. Le classi sono:
- *ClearChatHistoryCommand* permette la cancellazione della cronologia delle conversazioni della chat. È accessibile con il nome "requirementsTracker.clearChatHistory".
- *ClearRequirementsHistoryCommand* permette la cancellazione di tutti i requisiti caricati nel sistema. È accessibile con il nome "requirementsTracker.clearRequirementsHistory".
- *InterrogateDocumentCommand* permette di analizzare l'intero contenuto del documento attivo nel contesto dei requisiti caricati. È accessibile con il nome "requirementsTracker.interrogateDocument".
- *InterrogateSelectionCommand* permette di analizzare solo il testo selezionato nell'editor attivo nel contesto dei requisiti caricati. È accessibile con il nome "requirementsTracker.interrogateSelection".
- *OpenSettingsCommand* permette di aprire direttamente la pagina delle impostazioni dell'estensione Requirements Tracker nell'interfaccia delle impostazioni di VSCode. È accessibile con il nome "requirementsTracker.openSettings".
- *OpenSidebarCommand* permette di aprire la barra laterale dell'estensione Requirements Tracker all'interno di VSCode. È accessibile con il nome "requirementsTracker.openSidebar".
- *ResetDatabaseCommand* permette di reimpostare il database vettoriale utilizzato per l'indicizzazione di codice e requisiti. È accessibile con il nome "requirementsTracker.resetDatabase".

#### Interfaces

##### ICommand

L’interfaccia *ICommand* ha lo scopo di modellare un comando dell’applicazione. Modella i metodi:
- execute il quale permette l’esecuzione del comando e restiuisce un _Promise_.
- getName il quale permette la restituzione del nome del comando.

##### ILanguageModel

L’interfaccia *ILanguageModel* ha lo scopo di modellare l’interazione con i modelli LLM. Modella i metodi:
- generate il quale genera una risposta testuale a partire da un prompt.
- generateEmbeddings il quale esegue l’embedding di una stringa.
- refreshModels il quale aggiorna i modelli in seguito a cambiamenti nella configurazione.

##### IVectorDatabase

L’interfaccia *IVectorDatabase* ha lo scopo di modellare l’interazione con il databse vettoriale. Modella i metodi:
- addFiles il quale permette l’aggiunta di un file nel database vettoriale.
- addRequirements il quale permette l’aggiunta di un requisiti nel database vettoriale.
- addChunks il quale permette l’aggiunta di frammenti di codice nel database vettoriale.
- fileExists il quale verifica se un file con un dato percorso e checksum esiste già nel database.
- queryForFiles il quale cerca file simili semanticamente alla domanda fornita.
- queryForRequirements il quale cerca requisiti simili semanticamente alla domanda fornita.
- queryForChunks il quale cerca frammenti di codice simili semanticamente alla domanda fornita.
- resetDatabase il quale permette di reimpostare il database, eliminando tutti i dati memorizzati.
- refreshEmbeddings il quale permette di aggiornare il modello di embedding o la connessione.

####Adapter

#### LangChainOllamaAdapter

La classe *LangChainOllamaAdapter* implementa l’interfaccia _ILanguageModel_ e si occupa di fornire un’implementazione per l’interazione dei modelli usando Ollama.
Oltre a fornire l’implementazione dei metodi dell’interfaccia, mette a disposizione:
- /_initialize il quale permette di configurare le istanze di Ollama e OllamaEmbeddings con i parametri di configurazione.
- getEmbeddings il quale permette di restituire l'istanza di OllamaEmbeddings utilizzata per generare gli embedding.

#### LanceDBAdapter

La classe *LanceDbAdapter* implementa l’interfaccia _IVectorDatabase_ e si occupa di fornire un’implementazione per la gestione dei file e dei requisiti usanto LanceDB come database vettoriale.
Oltre a fornire l’implementazione dei metodi dell’interfaccia, mette a disposizione:
- deleteFiles il quale permette di eliminare file dal database.
- getEmbedding il quale restituisce l'istanza di _OllamaEmbeddings_ utilizzata per generare gli embedding.
- /_initialize il quale permette di inizializzare la connessione al database e configura il servizio di embedding.
- /_determineEmbeddingDimension il quale permette di determinare la dimensione degli embedding generando un embedding di prova.
- /_getDB  il quale permette di ottienere o creare una connessione al database.
- /_tableExists il quale permette di verificare se una tabella esiste nel database.
- /_getTable il quale permette di ottienere o creare una tabella nel database in base al tipo di collezione.


#### Servizi / Facade

##### FileSystemService

La classe *FileSystemService* si occupa delle interazioni con il il file system per la gestione dei file.
Mette a disposizione i metodi:
- read il quale permette la lettura di un file a partire dal suo percorso.
- getChucksum il quale calcola il checksum di un file a partire dal suo percorso.

##### GlobalStateService

La classe *GlobalStateService* si occupa della gestione dello stato globale dell’estensione usando l’API di stato globale di VS Code.
Mette a disposizione i metodi:
- updateState il quale permette di aggiornare lo stato dell’applicazione riguardo i requisiti o la chat.
- getState il quale permette di ottenere lo stato dell’applicazione riguardo i requisiti o la chat.
- clearState il quale permette di cancellare lo stato dell’applicazione riguardo i requisiti o la chat.

##### ConfigService

La classe *ConfigService* si occupa di gestire la configurazione dell’estensione combinando le impostazioni globali provenienti da VS Code con le configurazioni globali del progetto.
Al suo interno contiene un'istanza del servizio _FileSystemService_ per l’aggiornamento delle configurazioni dell’applicativo.
Mette a disposizione i metodi:
- GetConfig il quale ritorna un array di oggetti contenenti lo stato di tutte le configurazioni
- /_getLocalConfig il quale ritorna lo stato delle configurazioni locali.
- /_validatePathFilters il quale controlla la validità dei percorsi indicati nei filtri.
- /_validateFileExtensionFilters il quale controlla la validità delle estensioni indicate nei filtri.
- /_validateRequirementFilters il quale controlla la validità dei requisiti indicati nei filtri.

##### ConfigServiceFacade

La classe *ConfigServiceFacade* fornisce un accesso semplificato alla configurazione del sistema. Implementa il pattern facade e utilizza un singleton per garantire un’unica istanza dell'applicazione.
Mette a disposizione i metodi:
- Init il quale inizializza l'istanza singleton e la restituisce.
- GetInstance il quale restituisce l'istanza singleton esistente.
- sync il quale sincronizza la cache interna con le configurazioni più recenti.
- _getConfigValue il quale restituisce un valore di configurazione specifico, sincronizzando se necessario.
- getOllamaModel il quale restituisce il nome del modello per la generazione del codice scelto.
- getEmbeddingModel il quale restituisce il modello di embedding scelto.
- getMaxResults il quale restituisce il numero massimo di risultati configurato.
- getTemperature il quale restituisce la temperatura configurata per il modello.
- getEndpoint il quale restituisce l'endpoint di Ollama configurato.
- getBearerToken il quale restituisce il token di autenticazione configurato.
- getFilters il quale restituisce i filtri scelti.

##### RequirementsService

La classe *RequirementsService* si occupa della gestione dei requisiti mappati con identificativo e oggetto _Requirement_ e interagisce con il _GlobalStateService_. 
Mette a disposizione i metodi:
- addRequirement i quali permettono l’aggiunta di un singolo requisito o di un array di requisiti
- updateRequirementCodeReference il quale si occupa di aggiornare la posizione del codice che implementa ciascun requisito
- saveRequirements il quale memorizza i requisiti
- getRequirements il quale restituisce la lista dei requisiti
- clearRequirements il quale cancella la lista dei requisiti
- getById il quale restituisce un requisito a partire dal suo id
- deleteRequirement il quale cancella un requisito a partire dal suo id
- _saveRequirements il quale salva nel _GlobalStateService_ i requisiti
- _loadRequirements il quale aggiorna nel _GlobalStateService_ i requisiti

##### RequirementsServiceFacade

La classe *RequirementsServiceFacade* fornisce un accesso semplificato al servizio di tracciamento dei requisiti (_RequirementsTrackerService_, _ParsingService_ e _RequirementsService_).
Mette a disposizione i metodi:
- importRequirements il quale importa requisiti da file csv o reqif, li salva e crea embeddings.
- trackRequirements il quale traccia l'implementazione dei requisiti specificati.
- analyzeImplementation il quale analizza se un riferimento al codice implementa un requisito specifico.
- getRequirement il quale restituisce un requisito specifico per id.
- deleteRequirement il quale elimina un requisito specifico per id.
- getAllRequirements il quale restituisce tutti i requisiti.
- clearRequirements il quale elimina tutti i requisiti.
- updateRequirementCodeReference(reqId, codeReference): Aggiorna il riferimento al codice per un requisito specifico.

##### RequirementsTrackerService

La classe *RequirementsTrackerService* si occupa della gestione del tracciamento dell’implementazione dei requisiti nel codice sorgente. Interagisce con  il database vettoriale (_IVectorDatabase_), il servizio di gestione dei documenti (_DocumentServiceFacade_), i filtri (_FilterService_) e il modello LLM (_ILanguageModel_).
Mette a disposizione i metodi:
- analyzeImplementation il quale analizza se il codice fornito implementa effettivamente il requisito creando il prompt con il quale interrogare il modello.
- trackRequirementImplementation il quale traccia l'implementazione di un singolo requisito, trovando codice correlato, convertendolo in riferimenti e determinando lo stato di implementazione e il punteggio.
- processWorkspaceFiles il quale elabora tutti i file del workspace applicando filtri, tramite il _DocumentServiceFacade_ e restituendo l'elenco dei file elaborati.
- findRelatedCode il quale cerca nel database vettoriale porzioni di codice correlate al requisito specificato a partire dalla descrizione del requisito.
- /_convertToCodeReferences il quale converte i frammenti di codice (chunks) in riferimenti al codice strutturati, ordinati per punteggio di rilevanza.
- trackAllRequirements il quale traccia tutti i requisiti forniti e restituisce un riepilogo complessivo.
- /_determineImplementationStatus il quale determina lo stato di implementazione  in base al punteggio medio dei riferimenti al codice.
- /_calculateImplementationScore il quale calcola un punteggio complessivo per l'implementazione basato sui singoli riferimenti al codice trovati.
- /_calculateAverageScore il quale calcola il punteggio medio del punteggio dell'implementazione.
- /_findWorkspaceCodeFiles il quale trova tutti i file di codice nel workspace VS Code applicando i filtri di inclusione ed esclusione configurati.
- /_getFilters il quale restituisce i filtri per file e percorsi.

##### TrackingResultService

La classe *TrackingResultService* si occupa della gestione della persistenza e della manipolazione dei risultati del tracciamento dei requisiti.
Mette a disposizione i metodi:
- saveTrackingResult il quale salva i risultati del tracciamento, convertendoli nel formato di archiviazione interno e memorizzandoli nello stato globale.
- getTrakingResult il quale restituisce tutti i risultati di tracciamento come un array di oggetti TrackingResult.
- getTrackingDetails il quale restituisce i dettagli di riepilogo del tracciamento.
- getTrakingResultSummary il quale converte i dati in un oggetto TrackingResultSummary e lo restituisce. 
- clearRequirements il quale elimina tutti i dati di tracciamento sia dalla memoria che dallo stato globale.
- removeCodeReference il quale rimuove uno specifico riferimento al codice dal requisito tracciato, aggiornando i contatori e persistendo le modifiche.
- getById il quale restituisce un singolo risultato di tracciamento in base all'id del requisito.
- confirmResult il quale marca un risultato di tracciamento come confermato, aggiornando i contatori e rimuovendolo da quelli in stato pending.
- /_saveTrackingResult il quale memorizza i dati di tracciamento nello stato globale.
- /_loadTrackingResult il quale aggiorna i dati di tracciamento nello stato globale.
- /_TRStoDS il quale converte un oggetto TrackingResultSummary nelle strutture dati interne del servizio.
- /_DStoTRS il quale converte le strutture dati interne in un oggetto TrackingResultSummary.
- /_DStoGS il quale converte le strutture dati interne nel formato richiesto per la persistenza nello stato globale.
- /_GStoDS il quale converte i dati provenienti dallo stato globale nelle strutture dati interne del servizio.

##### DocumentFormatterService

La classe *DocumentFormatterService* si occupa della formattazione del codice sorgente in frammenti (_chunks_) a seconda del linguaggio rilevato dal path  (_language_). 
Mette a disposizione il metodo:
- /_getLanguageFromPath il quale restituisce il linguaggio a partire dall’estensione del file.

##### DocumentServiceFacade

La classe *DocumentServiceFacade* fornisce un accesso semplificato al servizio di gestione dei documenti (_DocumentFormatterService_).
Mette a disposizione i metodi:
- processFiles il quale elabora un elenco di file, formattandoli e aggiungedoli al database vettoriale. Gestisce controlli di dimensione, calcolo di checksum e verifica dell'esistenza.
- processWorkspaceFiles il quale trova e processa tutti i file presenti nella cartella del progetto.

##### ParsingService

La classe *ParsingService* si occupa dell’analisi e della conversione di file in
formato csv o reqif in una struttura dati contenente i requisiti memorizzati al loro interno.
Mette a disposizione i metodi:
- parseCSV il quale gestisce la conversione dei file in formato csv che utilizzano separatori differenti.
- parseREQIF il quale gestisce la conversione dei file in formato reqif
- /_mapToRequirement il quale restituisce un oggetto del tipo _Requirement_ a partire dai singoli record ottenuti dal file CSV.
- /_parseReqIFObject il quale restituisce un oggetto del tipo _Requirement_ a partire dai singoli record ottenuti dal file reqif.

##### InferenceService

La classe *InferenceService* si occupa della gestione delle inference basate sui modelli LLM a partire da query eseguite sul database vettoriale.
Mette a disposizione i metodi:
- query il quale permette di effettuare una chiamata a LLM tramite Ollama.
- checkSystemRequirement il quale permettedi effettuare un controllo sulla connessione al servizio Ollama.

##### FilterService
La classe *FilterService* si occupa della gestione dei filtri ottenuti tramite _ConfigServicefacade_ e memorizzati in un oggetto _ConfigFilters_.
Mette a disposizione i metodi:
- getPathFilter il quale restituisce i filtri per path memorizzati all’interno dell'istanza di _ConfigFilters_.
- getFileExtensionFilter il quale restituisce i filtri per estensione del file memorizzati all’interno dell'istanza di _ConfigFilters_.
- getPathFilter il quale restituisce i filtri per requisiti memorizzati all’interno dell'istanza di _ConfigFilters_.

##### ChatService
La classe *ChatService* rappresenta il servizio di chat fornito dall’estensione.
Al suo interno contiene un'istanza del servizio _GlobalStateService_ per l’aggiornamento dello stato dell’applicativo.
Mette a disposizione i metodi asincroni:
- addMessage il quale permette l’aggiunta di nuovi messaggi.
- saveMessage il quale permette il salvataggio della cronologia della chat.
- getMessage il quale permette di recuperare un particolare messaggio in arrivo.
- clearMessage il quale permette di cancellare la cronologia della chat.

### Progettazione grafica

[spiegazione generale: dove si apre il pannello, che icona ha ecc ecc]

Il pannello *Import* permette di caricare dei requisiti in due modalità:
- caricando un file.
- incollando i requisiti direttamente sulla sezione apposita (sotto “Or Paste Content”).

Per caricare i requisiti bisogna inoltre selezionare il tipo di file (CSV o  reqIF) sul pulsante di selezione sotto la sezione “Format”. Esiste anche l’opzione di scegliere un delimitatore csv personalizzato sotto la sezione “CSV Delimiter”. Una volta scelto il file o dopo aver incollato a mano i requisiti, questi possono essere caricati tramite il pulsante “Import Requirements”.  
- il pannello *Track* permette di tracciare o specifici requisiti, scegliendoli dalla lista di requisiti caricati, oppure tutti i requisiti, selezionando l’opzione “Track all requirements”. Tramite il pulsante “Start Tracking” si può avviare il tracciamento dei requisiti. Il pulsante “Show Unimplemented” permette di trovare facilmente i requisiti che non sono stati ancora implementati nel codice e il pulsante “Clear Requirements” permette di rimuovere tutti i requisiti per poter caricarne di nuovi.
- il pannello *Results* permette di visualizzare i risultati del tracciamento.
- il pannello *Chat* permette all’utente di fare domande più specifiche sui requisiti e sulla loro implementazione utilizzando modelli di intelligenza artificiale forniti da Ollama.

<!-- ::: {.no-export} -->
</NumberedWrapper>
<!-- ::: -->
