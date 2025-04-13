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

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Specifica Tecnica

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                 | Autore         | Data Verifica | Verificatore   |
| ---------- | -------- | --------------------------- | -------------- | ------------- | -------------- |
| 14/04/2025 | 1.0.0    | Prima stesura del documento | Cognome? Nome? | ??/04/2025    | Cognome? Nome? |

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

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
[riferimenti all'installazione di software esterni:]
[VS Code, node.js, Ollama]


### Avvio
[ comandi per l'avvio]

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
[descrizione procedura]


### Utilizzo

#### Importare requisiti
[screen tab "import" dell'estensione]
[descrizione procedura per requif e csv]

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
