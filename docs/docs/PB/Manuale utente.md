---
id: manuale_utente
title: "Manuale utente - v1.0.0"
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

# Manuale Utente

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                 | Autore         | Data Verifica | Verificatore   |
| ---------- | -------- | --------------------------- | -------------- | ------------- | -------------- |
| 14/04/2025 | 1.0.0    | Prima stesura del documento | Cognome? Nome? | ??/04/2025    | Cognome? Nome? |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->


## Introduzione

### Scopo del documento

Il presente documento ha lo scopo di fornire una guida dettagliata all'utilizzo dell'estensione di VS Code creata.

### Scopo del prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto colorato.
- **PDF**: Corsivo con pendice \[G\].

## Manuale utente

### Prerequisiti
Per poter utilizzare l'estensione Requirement Tracker - Plug-in per VS Code, è necessario che sul sistema siano presenti alcuni strumenti software di base. Di seguito sono elencati i requisiti minimi e i riferimenti per l'installazione.

### Software richiesto

| Software           | Versione consigliata | Descrizione | Link installazione |
| -------------------|----------------------|-------------|--------------------|
| Visual Studio Code | 1.95 | Editor di codice sorgente utilizzato per l'esecuzione dell'estensione | [Download VS Code](https://code.visualstudio.com) |
| Node.js            | ? | Ambiente di esecuzione JavaScript necessario per il backend dell'estensione | [Download Node.js](https://nodejs.org/en) |
| Ollama             | 0.6.2 | Sistema locale per l’esecuzione di modelli LLM, utile per la funzionalità Chat | [Download Ollama](https://ollama.com) |


### Avvio
[ NO comandi per l'avvio "in modalità sviluppo"]

#### Apertura di un progetto e configurazione
[screen VS Code area progetto -> "Esplora risorse"]
[descrizione procedura]

#### Configurazioni globali
[screen impostazioni globali VS Code]
[descrizione procedura]

#### Configurazioni del progetto
[screen impostazioni del progetto VS Code]
[descrizione procedura]

#### Configurazione filtri
[screen file per filtri]
[descrizione procedura e spiegazione funzionamento]


### Utilizzo

#### Importare requisiti
[screen tab "import" dell'estensione]

Per iniziare a utilizzare il Requirement Tracker, è necessario importare dei requisiti. L'estensione supporta i formati CSV e ReqIF, che possono essere caricati da file o incollati direttamente.

##### Accesso alla sezione Import
Apri l’estensione dal pannello laterale di VS Code e seleziona il tab "Import" nella parte superiore dell’interfaccia.

##### Scelta del formato
Nel menu a tendina "Format", selezionare il tipo di file da importare:
- CSV: file delimitati da virgola (o altro separatore personalizzabile)
- ReqIF: formato standard utilizzato per documenti di requisiti

##### Opzioni per l’importazione
È possibile importare i requisiti in due modi:
- Caricando un file: cliccare su "Choose File" e selezionare il file dal proprio sistema
- Incollando il contenuto: incollare direttamente i dati nel campo "Or Paste Content"

Se si seleziona il formato CSV, è possibile specificare un delimitatore personalizzato (es. , o $) tramite il campo "CSV Delimiter".

##### Confermare l’importazione
Una volta inseriti i dati, cliccare sul pulsante "Import Requirements" per completare l’operazione. I requisiti verranno salvati e resi disponibili nella sezione Track per la successiva analisi.

#### Tracciamento
[screen tab "track" dell'estensione]
[descrizione procedura: visualizzazione, selezione, eliminazione, visione porzione di codice]

#### Report e aggiornamento
[screen tab "results" dell'estensione]
[descrizione procedura: spiegazione risultati, modifica codice, modifica riferimento]

#### Chat
[screen area chat]
[descrizione procedura: scrittura messaggi, uso messaggi preimpostati, cancellazione cronologia]


### Gestione errori
[Screen e/o lista degli errori]

<!-- ::: {.no-export} -->
</NumberedWrapper>
<!-- ::: -->
