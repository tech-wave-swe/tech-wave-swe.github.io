---
id: specifica_tecnica
title: "Specifica Tecnica"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 0.2.0
classification: Esterno
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Specifica Tecnica

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                    | Autore                | Data Verifica | Verificatore  |
|------------|----------|--------------------------------|-----------------------|---------------|---------------|
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

In questa sezione vengono descritti gli strumenti e le tecnologie utilizzati per lo sviluppo e l"implementazione del Requirement Tracker, un’estensione per Visual Studio Code (VS Code) che permette di tracciare e verificare i requisiti software. Le tecnologie sono state selezionate per garantire un’%%architettura|architettura%% modulare, scalabile e di facile manutenzione, con un focus particolare sull’integrazione con modelli di linguaggio avanzati (%%LLM|llm%%) e sulla gestione efficiente dei requisiti.

### Linguaggio di programmazione

#### TypeScript

TypeScript è un linguaggio di programmazione open-source sviluppato da Microsoft, che estende JavaScript aggiungendo il supporto per il tipaggio statico. Questo permette di identificare errori comuni durante la fase di sviluppo, migliorando la %%qualità|qualità%% del codice e facilitando il debugging. TypeScript è particolarmente adatto per progetti di medie e grandi dimensioni, dove la manutenibilità del codice è fondamentale.
È stato scelto per la sua integrazione nativa con VS Code, che semplifica lo sviluppo di estensioni, per la sua capacità di prevenire errori attraverso la tipizzazione statica e perché offre una vasta gamma di strumenti e librerie.

Utilizzo nel progetto:
- Sviluppo dell’estensione per VS Code: TypeScript è utilizzato per implementare le %%funzionalità|funzionalità%% principali dell’estensione, come il caricamento dei requisiti, l’analisi del codice e l’interazione con l’utente.
- Gestione delle %%funzionalità|funzionalità%% principali: Il linguaggio è impiegato per gestire la logica di business, come il parsing dei file di requisiti, l’interazione con i modelli %%LLM|llm%% e la gestione della struttura dati interna.
- Integrazione con le API di VS Code: TypeScript è utilizzato per interfacciarsi con le API di VS Code, permettendo la creazione di comandi personalizzati, la visualizzazione dei risultati e l’integrazione con l’editor di codice

Versione:
Documentazione: [TypeScript documentation] (https://www.typescriptlang.org/docs/)

### Frameworks

#### VS Code Extension API

Le API di estensione di Visual Studio Code forniscono strumenti per la creazione di comandi, la gestione dei file, l’integrazione con l’editor di codice e la visualizzazione dei risultati. Queste API sono progettate specificamente per estendere le %%funzionalità|funzionalità%% di VS Code, permettendo agli sviluppatori di creare strumenti personalizzati che si integrano perfettamente con l’ambiente di sviluppo.
Sono state scelte per la loro integrazione nativa con VS Code, che semplifica lo sviluppo di estensioni e garantisce una perfetta compatibilità con l’ambiente di sviluppo.

Utilizzo nel progetto:
- Sviluppo dell’interfaccia utente dell’estensione: Le API di VS Code sono utilizzate per creare l’interfaccia utente dell’estensione, inclusa la visualizzazione della tabella dei requisiti, i bottoni di interazione e la gestione delle configurazioni.
- Integrazione con l’editor di VS Code: Le API permettono di interagire con l’editor di codice, ad esempio per evidenziare porzioni di codice che implementano specifici requisiti o per navigare tra i file del %%progetto|progetto%%.
- Gestione degli eventi: Le API di estensione sono utilizzate per gestire eventi come il caricamento di un file di requisiti, l’avvio di un’analisi o la modifica delle configurazioni.

Documentazione: [VS Code API documentation](https://code.visualstudio.com/api)

### Strumenti per l’integrazione con modelli di intelligenza artificiale

#### Ollama

%%Ollama|ollama%% è uno strumento open-source che permette di eseguire localmente modelli di linguaggio avanzati (%%LLM|llm%%) come LLaMA ed è progettato per essere leggero e facile da configurare, permettendo agli sviluppatori di eseguire modelli %%LLM|llm%% direttamente sulla propria macchina senza la necessità di infrastrutture cloud complesse.
Uno dei principali vantaggi di %%Ollama|ollama%% è la sua capacità di eseguire modelli %%LLM|llm%% in locale, garantendo la privacy dei dati e riducendo la dipendenza da servizi esterni. Inoltre, %%Ollama|ollama%% supporta una vasta gamma di modelli, permettendo di scegliere quello più adatto alle esigenze del %%progetto|progetto%%.

Utilizzo nel progetto:
- Analisi del codice sorgente: %%Ollama|ollama%% è utilizzato per analizzare il codice sorgente e verificare l’implementazione dei requisiti. Il modello %%LLM|llm%% viene interrogato per generare risposte basate sul codice e sui requisiti specificati.
- Generazione di risposte basate sui modelli %%LLM|llm%%: %%Ollama|ollama%% è utilizzato per generare risposte che supportano lo sviluppatore nel controllo dei requisiti, ad esempio identificando porzioni di codice che implementano specifici requisiti.

Versione:
Documentazione: [Ollama documentation](https://github.com/ollama/ollama/tree/main/docs)

#### Vector Embeddings

I Vector Embeddings sono rappresentazioni numeriche di dati testuali, utilizzati per trasformare requisiti e codice in vettori. Questa tecnica permette di confrontare rapidamente i requisiti con il codice sorgente, migliorando l’%%efficienza|efficienza%% dell’analisi e la precisione dei risultati. I Vector Embeddings sono particolarmente utili in contesti dove è necessario confrontare grandi quantità di dati testuali, come nel caso dei requisiti software.
I Vector Embeddings funzionano mappando parole, frasi o interi documenti in uno spazio vettoriale multidimensionale, dove la similarità semantica tra i testi può essere misurata attraverso la distanza tra i vettori. Questo approccio permette di identificare rapidamente le corrispondenze tra i requisiti e il codice sorgente, riducendo i tempi di elaborazione e migliorando l’accuratezza dell’analisi.

Utilizzo nel progetto:
- Confronto rapido tra i requisiti e il codice sorgente: I Vector Embeddings sono utilizzati per trasformare i requisiti e il codice sorgente in vettori, permettendo di confrontarli rapidamente e identificare le corrispondenze.
- Miglioramento dell’%%efficienza|efficienza%% e della precisione dell’analisi: L’uso di Vector Embeddings permette di ridurre i tempi di elaborazione e migliorare l’accuratezza delle risposte fornite dai modelli %%LLM|llm%%.

Documentazione: [Vector Embeddings] ()

### Formati di file per la gestione dei requisiti

#### CSV

Il formato CSV (Comma-Separated Values) è un formato di file semplice e leggero, ampiamente utilizzato per la gestione di dati strutturati. Consente di importare ed esportare i requisiti software in modo rapido e intuitivo. CSV è particolarmente adatto per progetti che richiedono una gestione semplice e veloce dei dati, senza la necessità di strutture complesse.

Utilizzo nel progetto:
- Importazione ed esportazione dei requisiti software: CSV è utilizzato per importare ed esportare i requisiti software, permettendo una facile integrazione con strumenti esterni per la gestione dei dati.

Documentazione: [CSV Format specification]()

#### ReqIF

ReqIF (Requirements Interchange Format) è uno standard per lo scambio di requisiti tra diversi strumenti di gestione. Offre un formato strutturato e flessibile, adatto a progetti complessi che richiedono una gestione avanzata dei requisiti. ReqIF è progettato per supportare la gestione di grandi quantità di requisiti, garantendo la compatibilità tra diversi strumenti e piattaforme.

Utilizzo nel progetto:
- Gestione di progetti complessi: ReqIF è utilizzato per gestire progetti che richiedono un formato strutturato, garantendo una migliore organizzazione dei dati e una maggiore flessibilità.

Documentazione: [ReqIF specification]()

## Architettura

### Architettura logica

### Architettura di deployment

### Design pattern utilizzati