---
id: specifica_tecnica
title: "Specifica Tecnica"
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

| Data       | Versione | Descrizione                 | Autore                | Data Verifica | Verificatore |
|------------|----------|-----------------------------|-----------------------|---------------|--------------|
| 18/03/2025 | 1.0.0    | Prima stesura del documento | Manuel Felipe Vasquez |               |              |

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

## Introduzione

### Scopo del Documento

Il presente documento ha lo scopo di fornire una descrizione dettagliata del sistema, delle sue funzionalità e dei requisiti tecnici necessari per la sua realizzazione.


### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto Colorato.
- **PDF**: Corsivo con pendice \[G\].


### Riferimenti

#### Riferimenti Normativi

- **Norme di Progetto**: [Norme di Progetto - v1.8.1](../RTB/Norme%20di%20Progetto.md)
- **Capitolato d'Appalto C8: Requirement Tracker- Plug-in VS Code**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti Informativi

- **Glossario**: [Glossario](../RTB/Glossario.md)

- **Analisi dei Requisiti**: [Analisi dei Requisiti](../RTB/Analisi_dei_requisiti.md)

- **Documentazione dell'Extension API Di Visual Studio Code**: [https://code.visualstudio.com/api](https://code.visualstudio.com/api)

- **Documentazione di Ollama**: [https://github.com/ollama/ollama/tree/main/docs](https://github.com/ollama/ollama/tree/main/docs)

- **Documentazione di TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)


## Tecnologie

### Linguaggio di Programmazione

- **TypeScript**: TypeScript è un linguaggio di programmazione open-source sviluppato da Microsoft. È un superset di JavaScript che aggiunge tipizzazione statica e funzionalità orientate agli oggetti. TypeScript è progettato per migliorare la produttività degli sviluppatori e la qualità del codice, consentendo una scrittura più sicura e mantenibile.

### Frameworks

- **Extension API di Visual Studio Code**: L'Extension API di Visual Studio Code è un insieme di strumenti e librerie che consente agli sviluppatori di creare estensioni per l'editor di codice. 

### Servizi 

- **Ollama**: Ollama è un servizio che consente di eseguire modelli di linguaggio (LLM) in locale. Fornisce un'interfaccia semplice per l'installazione e l'esecuzione di modelli, consentendo agli sviluppatori di eseguire LLM senza dover dipendere da servizi cloud esterni.

## Architettura

### Architettura Logica

### Architettura di Deployment

### Design Pattern Utilizzati