---
id: analisi_dei_requisiti
title: "Analisi dei Requisiti"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 2.5.0
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Analisi dei requisiti

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                             | Autore                | Data Verifica | Verificatore          |
| ---------- | -------- | --------------------------------------- | --------------------- | ------------- | --------------------- |
| 17/02/2025 | 2.5.0    | Miglioramento granularità requisiti     | Piola Andrea          | 21/02/2025    | Pistori Gaia          |
| 14/02/2025 | 2.4.0    | Correzioni documento                    | Vasquez Manuel Felipe | 15/02/2025    | Monetti Luca          |
| 09/02/2025 | 2.3.0    | Aggiunta Use Cases                      | Monetti Luca          | 14/02/2025    | Vasquez Manuel Felipe |
| 05/02/2025 | 2.2.0    | Aggiunta Use Cases                      | Monetti Luca          | 14/02/2025    | Vasquez Manuel Felipe |
| 04/02/2025 | 2.1.0    | Corretta la formattazione del documento | Monetti Luca          | 14/02/2025    | Vasquez Manuel Felipe |
| 10/01/2025 | 2.0.0    | Riscrittura del documento               | Pistori Gaia          | 10/01/2025    | Monetti Luca          |
| 03/01/2025 | 1.1.0    | Aggiunta termini glossario              | Pistori Gaia          | 04/01/2025    | Monetti Luca          |
| 13/12/2024 | 1.0.0    | Prima stesura del documento             | Pistori Gaia          | 13/12/2024    | Monetti Luca          |

Table: Changelog

<!-- ::: {.no-export} -->
</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del Documento

Lo scopo del documento è quello di descrivere i casi d'uso ed i requisiti del %%progetto|progetto%% **Requirement Tracker - Plug-in VSCode** individuati dal gruppo Techwave tramite l'analisi del %%capitolato|capitolato%% ed il confronto con l'azienda Bluewind.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti tramite:

- **Sito Web**: Grassetto Colorato.
- **PDF**: Corsivo con pendice \[G\].

### Riferimenti

Riferimenti normativi:

- Capitolato d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Corso di Ingegneria del software - Regolamento di Progetto

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/PD1.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/PD1.pdf)

## Descrizione del prodotto

### Scopo del prodotto

Nello sviluppo di software per sistemi embedded il controllo e il tracciamento dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso sono azioni costose e ripetitive per lo sviluppatore. Possono inoltre risultare non esaustive a causa di distrazioni o dimenticanze. Il %%Capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di una estensione per %%VSCode|vscode%% che permetta di organizzare i requisiti derivati da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

Il %%capitolato|capitolato%% prevede la realizzazione di un supporto agli sviluppattori che permetta loro di controllare e tracciare l'implementazione di requisiti software all'interno di un progetto. Tramite questa estensione lo sviluppatore potrà caricare un file, in formato _.csv_ o _.reqif_, contenente i requisiti individuati e visualizzare lo stato implementativo di ognuno. Utilizzando l'Intellegenza Artificiale, nello specifico un modello %%LLM|llm%%, l'estensione analizzerà l'intero codice sorgente del progetto e restituirà lo stato di implementazione di ogni requisito segnalando, se presente, la porzione di codice che lo implementa.

### Funzionalità del prodotto

L'estensione **Requirements Tracker** permetterà agli sviluppatori di controllare e tracciare l'implementazione dei requisiti di un progetto. Le principali funzionalità includono:

- **Personalizzazione**: L'%%Applicativo|applicativo%% è configurabile in moltissimi aspetti. Le configurazioni possono essere globali o limitate al singolo progetto, permettendo così allo stesso sviluppatore di lavorare contemporaneamente a progetti che richiedono configurazioni diverse.
- **Parsing dei dati**: L'%%Applicativo|applicativo%% permette il caricamento di un file, in formato _.csv_ o _.reqif_, contenente una serie di requisiti necessari al progetto. Questo file, univoco per progetto, deve essere letto e trasformato in una struttura dati comprensibile ed utilizzabile.
- **Visualizzazione grafica**: In ogni momento lo sviluppatore è in grado di visualizzare lo stato di implementazione corrente di tutti i requisiti tramite una vista grafica della struttura data interna.
- **Dialogo con LLM**: L'%%Applicativo|applicativo%% utilizza %%Ollama|ollama%% per interfacciarsi con i modelli %%LLM|llm%% necessari al suo funzionamento. Il funzionamento base prevede l'utilizzo di due modelli:
  - Un modello di **embedding** utilizzato per tradurre il codice sorgente ed i requisiti in forma vettoriale.
  - Un modello di **generazione del codice** utilizzato per il controllo di implementazione.
- **Interattività con lo sviluppatore**: Lo sviluppatore potrà interagire con l'%%applicativo|applicativo%% richiedendo un nuovo controllo di implementazione dei requisiti su tutto il codice o su una sua porzione. Lo sviluppatore può inoltre selezionare i requisiti da verificare al fine di rendere la ricerca più precisa. Per ogni requisito è possibile visualizzare, se presente, la porzione di codice che lo implementa.
- **Richiesta di feedback**: L'%%Applicativo|applicativo%% utilizza un sistema di feedback grazie al quale lo sviluppatore può verificare la presenza di una implementazione effettiva dei requisiti.

### Tecnologie utilizzate

- **TypeScript**: Linguaggio di programmazione scelto per lo sviluppo dell'estensione.
- **Ollama**: Software gratuito e open source che consente di eseguire in locale diversi modelli %%LLM|llm%%.
- **CSV e Reqif**: Tipologia di formati per i file dei requisiti.
- **Vector Embeddings**: Rappresentazione numerica, sotto forma di array, di dati non matematici, come parole o immagini, che possono essere interpretati dai modelli %%LLM|llm%%.
- **VS Code Extension API**: Set di strumenti e interfacce che consente agli sviluppatori di creare estensioni per Visual Studio Code.

## Casi d'uso

### Introduzione

Questa sezione illustra i casi d’uso delineati dopo l’analisi del %%capitolato|capitolato%%, il confronto con il %%proponente|proponente%% e le discussioni svolte durante le riunioni interne.

### Attori

L'%%Applicativo|applicativo%% si interfaccia con un singolo attore primario:

- **Utente programmatore**: Utente principale dell'%%applicativo|applicativo%%. Ha accesso a tutte le funzionalità previste e utilizza l'%%applicativo|applicativo%% durante il flusso di lavoro.

L'%%Applicativo|applicativo%% si intefaccia con un singolo attore secondario:

- **%%Ollama|ollama%%**: Software gratuito e open source che consente di eseguire in locale diversi modelli %%LLM|llm%%.

### Elenco casi d'uso

<img src="/img/UseCases/UC1.png" alt="Configurazione dell'estensione" data-width="70%" />

#### UC1 - Configurazione dell'estensione

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L'Utente programmatore si trova nella scheda dedicata alle configurazioni

**Postcondizioni:**

- L’%%Applicativo|applicativo%% è stato configurato

**Scenario principale:**

1. L’Utente programmatore visualizza tutte le impostazioni modificabili.
2. L’Utente programmatore inserisce l’endpoint di %%Ollama|ollama%% (UC1.1)
3. L’Utente programmatore seleziona il modello per la generazione del codice (UC1.2)
4. L’Utente programmatore seleziona il modello di embedding (UC1.3)
5. L’Utente programmatore seleziona la "temperature’ del modello (UC1.4)
6. L’Utente programmatore inserisce il bearer token (UC1.5)
7. La modifica viene applicata.

**User story:**

Come Utente programmatore devo poter configurare l’estensione modificando le impostazioni disponibili tramite valori predefiniti o personalizzati per adattarne il funzionamento al sistema utilizzato.

---

<img src="/img/UseCases/UC1.1.png" alt="Inserimento endpoint Ollama" data-width="70%" />

#### UC1.1 - Inserimento endpoint Ollama

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- L’endpoint di %%Ollama|ollama%% è stato configurato

**Scenario principale:**

1. L’Utente programmatore seleziona la voce per modificare l’endpoint
2. L’Utente programmatore indica l’endpoint in cui è installato %%Ollama|ollama%%

**Estensioni:**

- UC2 - Visualizzazione errore %%Ollama|ollama%% non installato
- UC3 - Visualizzazione errore endpoint non raggiungibile

**User story:**

Come Utente programmatore devo poter indicare l’endpoint in cui è installato %%Ollama|ollama%% per l’interrogazione dei modelli durante l’esecuzione dell’estensione.

---

#### UC2 - Visualizzazione errore di Ollama non installato

**Estende:**

- UC1.1 - Inserimento endpoint %%Ollama|ollama%%

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L'Utente programmatore sta configurando l'endpoint di %%Ollama|ollama%% (UC1.1)
- %%Ollama|ollama%% non è installato nell’endpoint indicato

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se %%Ollama|ollama%% non è installato nell’endpoint indicato.

---

#### UC3 - Visualizzazione errore endpoint non raggiungibile

**Estende:**

- UC1.1 - Inserimento endpoint %%Ollama|ollama%%

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L'Utente programmatore sta configurando l'endpoint di %%Ollama|ollama%% (UC1.1)
- L’endpoint indicato non è raggiungibile

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’endpoint indicato non fa riferimento ad una destinazione raggiungibile.

---

<img src="/img/UseCases/UC1.2.png" alt="Selezione di un modello di generazione del codice" data-width="70%" />

#### UC1.2 - Selezione di un modello di generazione del codice

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il modello di generazione del codice è stato configurato

**Scenario principale:**

1. L’Utente programmatore seleziona la voce per modificare il modello di generazione del codice
2. L’Utente programmatore sceglie il modello da utilizzare

**User story:**

Come Utente programmatore devo poter scegliere il modello che verrà utilizzato per generare il codice a partire dai requisiti che verranno inseriti.

---

#### UC4 - Selezione di un modello di default per la generazione del codice

**Generalizza:**

- UC1.2 - Selezione modello di generazione codice

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente programmatore sta scegliendo il modello per la generazione del codice (UC1.2)

**Postcondizioni:**

- Il modello è stato configurato con un modello di default

**Scenario principale:**

1. L’Utente programmatore visualizza una lista di modelli proposti
2. L’Utente programmatore sceglie un modello tra quelli proposti

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato

**User story:**

Come Utente programmatore devo poter selezionare un modello da una lista proposta per la generazione delle risposte.

---

#### UC5 - Selezione di un modello custom per la generazione del codice

**Generalizza:**

- UC1.2 - Selezione modello di generazione codice

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente programmatore sta scegliendo il modello per la generazione del codice (UC1.2)

**Postcondizioni:**

- Il modello è stato configurato con un modello custom

**Scenario principale:**

1. L’Utente programmatore inserisce il nome di un modello custom

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato
- UC9 - Visualizzazione errore modello custom non esistente

**User story:**

Come Utente programmatore devo poter inserire il nome di un modello custom per modificare il modello utilizzato per la generazione delle risposte.

---

#### UC8 - Visualizzazione errore di modello non installato

**Estende:**

- UC4 - Selezione modello di default per generazione codice
- UC5 - Selezione modello custom per generazione codice
- UC6 - Selezione modello custom di embedding
- UC7 - Selezione modello di default di embedding

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha selezionato un modello
- Il modello non è installato nell’endpoint

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il modello a cui voglio fare la richiesta non è installato nell’endpoint.

---

#### UC9 - Visualizzazione errore di modello custom non esistente

**Estende:**

- UC5 - Selezione modello custom per generazione codice
- UC6 - Selezione modello custom di embedding

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha inserito un modello custom
- Il modello inserito non esiste

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il modello a cui voglio fare la richiesta non esiste.

---

<img src="/img/UseCases/UC1.3.png" alt="Selezione di un modello di embedding" data-width="70%" />

#### UC1.3 - Selezione di un modello di embedding

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il modello di embedding è stato configurato

**Scenario principale:**

1. L’Utente programmatore seleziona la voce per modificare il modello di embedding
2. L’Utente programmatore sceglie il modello da utilizzare

**User story:**

Come Utente programmatore devo poter scegliere il modello che verrà utilizzato per l’embedding dei documenti all'interno dell'estensione.

---

#### UC6 - Selezione di un modello custom di embedding

**Generalizza:**

- UC1.3 - Selezione modello di embedding

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente programmatore sta scegliendo il modello di embedding (UC1.3)

**Postcondizioni:**

- Il modello è stato configurato con un modello custom

**Scenario principale:**

1. L’Utente programmatore inserisce il nome di un modello custom

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato
- UC9 - Visualizzazione errore modello custom non esistente

**User story:**

Come Utente programmatore devo poter inserire il nome di un modello custom per modificare il modello utilizzato per l'embedding dei documenti.

---

#### UC7 - Selezione di un modello di default di embedding

**Generalizza:**

- UC1.3 - Selezione modello di embedding

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente programmatore sta scegliendo il modello di embedding (UC1.3)

**Postcondizioni:**

- Il modello è stato configurato con un modello di default

**Scenario principale:**

1. L’Utente programmatore visualizza una lista di modelli proposti
2. L’Utente programmatore sceglie un modello tra quelli proposti

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato

**User story:**

Come Utente programmatore devo poter selezionare un modello da una lista proposta per l'embedding dei documenti.

---

<img src="/img/UseCases/UC1.4.png" alt="Inserimento 'temperature' modello" data-width="70%" />

#### UC1.4 - Inserimento 'temperature' modello

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- La ‘temperature’ dei modelli è stata configurata

**Scenario principale:**

1. L’Utente programmatore seleziona la voce per modificare la ‘temperature’
2. L’Utente programmatore indica un valore numerico per la ‘temperature’

**User story:**

Come Utente programmatore devo poter indicare la ‘temperature’ dei modelli necessaria per determinare il livello di casualità della risposta.

---

<img src="/img/UseCases/UC1.5.png" alt="Inserimento di bearer token" data-width="70%" />

#### UC1.5 - Inserimento di bearer token

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il bearer token è stato configurato

**Scenario principale:**

1. L’Utente programmatore seleziona la voce per modificare il bearer token
2. L’Utente programmatore indica il bearer token

**Estensioni:**

- UC10 - Visualizzazione errore di autorizzazione

**User story:**

Come Utente programmatore devo poter indicare un bearer token necessario per l’autenticazione per utilizzare server protetti e/o remoti.

---

#### UC10 - Visualizzazione errore di autorizzazione

**Estende:**

- UC1.5 - Inserimento bearer token

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’Utente programmatore ha inserito un bearer token (UC1.5)
- Il token non consente l’autorizzazione

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il bearer token inserito non consente l’autorizzazione.

---

<img src="/img/UseCases/UC11.png" alt="Apertura di un progetto" data-width="70%" />

#### UC11 - Apertura di un progetto

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)

**Postcondizioni:**

- L’Utente programmatore ha aperto un progetto software
- L’%%Applicativo|applicativo%% aggiorna la struttura dati a seguito del controllo dell’implementazione dei requisiti

**Scenario principale:**

1. L’Utente programmatore apre la cartella di progetto software (UC11.1)
2. L’Utente programmatore carica il file dei requisiti (UC11.2)
3. L’Utente programmatore inserisce i filtri per il progetto software corrente (UC11.3)
4. L’%%Applicativo|applicativo%% avvia il controllo dell’implementazione dei requisiti (UC15)

**User story:**

Come Utente programmatore devo poter aprire un progetto software su cui poi verranno effettuati i controlli di implementazione dei requisiti.

---

<img src="/img/UseCases/UC11.1.png" alt="Apertura della cartella del progetto" data-width="70%" />

#### UC11.1 - Apertura della cartella del progetto

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente programmatore ha aperto la cartella contenente i file del progetto software

**Scenario principale:**

1. L’Utente programmatore si reca nell’area dedicata
2. L’Utente programmatore seleziona la cartella contenente i file del progetto software
3. L’Utente programmatore apre la cartella

**User story:**

Come Utente programmatore devo poter aprire una cartella che conterrà i file del progetto software su cui andrò a fare il controllo dell’implementazione dei requisiti

---

<img src="/img/UseCases/UC11.2.png" alt="Caricamento file dei requisiti" data-width="70%" />

#### UC11.2 - Caricamento file dei requisiti

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente programmatore ha caricato il file contenente i requisiti del progetto software

**Scenario principale:**

1. L’Utente programmatore si reca nell’area dedicata
2. L’Utente programmatore seleziona il file contenente i requisiti del progetto software
3. L’Utente programmatore carica il file

**Estensioni:**

- UC12 - Visualizzazione errore di parsing dei dati

**User story:**

Come Utente programmatore devo poter caricare il file che conterrà i requisiti del progetto software, che verranno analizzati durante il controllo della loro implementazione

---

#### UC12 - Visualizzazione errore di parsing dei dati

**Estende:**

- UC11.2 - Caricamento file dei requisiti

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha caricato il file dei requisiti (UC11.2)
- Il file dei requisiti non risulta valido

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il file dei requisiti contiene dati che non si trovano in uno stato consistente.

---

<img src="/img/UseCases/UC11.3.png" alt="Inserimento filtri per il progetto corrente" data-width="70%" />

#### UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente programmatore ha inserito i filtri per facilitare il controllo dell’implementazione dei requisiti

**Scenario principale:**

1. L’Utente programmatore si reca nella scheda dedicata
2. L’Utente programmatore seleziona i filtri da applicare al progetto software corrente

**Estensioni:**

- UC13 - Visualizzazione errore filtro non trovato
- UC14 - Visualizzazione errore di esecuzione del filtro

**User story:**

Come Utente programmatore devo poter selezionare i filtri che applicherò al progetto software. Devo poter: indicare quali cartelle, file, estensioni file includere o escludere dalla ricerca. Devo poter selezionare su quali requisiti effettuare la ricerca. Devo poter indicare un file nel quale ricercare un requisito specifico.

---

#### UC13 - Visualizzazione errore filtro non trovato

**Estende:**

- UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha inserito i filtri per il progetto software corrente (UC11.3)
- Almeno uno dei filtri non viene trovato dall’%%Applicativo|applicativo%%

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il filtro inserito non viene trovato dall’%%Applicativo|applicativo%%.

---

#### UC14 - Visualizzazione errore di esecuzione filtro

**Estende:**

- UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha inserito i filtri per il progetto software corrente (UC11.3)
- L'esecuzione di almeno un filtro non termina correttamente

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se il filtro inserito non viene eseguito in modo corretto scatenando un errore.

---

<img src="/img/UseCases/UC15.png" alt="Controllo implementazione requisiti" data-width="70%" />

#### UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente programmatore

**Attore secondario:**

- %%Ollama|ollama%%

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore si trova nella scheda dedicata

**Postcondizioni:**

- Lo stato di tutti i requisiti caricati (UC11.2) è aggiornato con la situazione effettiva all’interno del codice.

**Scenario principale:**

1. L’Utente programmatore seleziona i requisiti per i quali vuole effettuare il controllo (UC15.1)
2. L’Utente programmatore avvia la procedura di controllo del codice
3. L’Utente programmatore fornisce feedback sui risultati forniti dal sistema (UC15.2)
4. L’%%Applicativo|applicativo%% aggiorna la struttura dati

**Estensioni:**

- UC18 - Visualizzazione errore di richiesta al modello

**User story:**

Come Utente programmatore devo poter avviare un controllo dello stato di implementazione dei requisiti caricati al fine di aggiornare la struttura dati.

---

#### UC16 - Controllo implementazione dei requisiti su una parte del codice

**Generalizza:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore ha un file del progetto software aperto.

**Postcondizioni:**

- L’Utente programmatore ha selezionato la porzione di codice nella quale eseguire il controllo dell’implementazione dei requisiti.

**Scenario principale:**

1. L’Utente programmatore seleziona una parte di codice nel file aperto.
2. L’Utente programmatore avvia il controllo sul codice selezionato (UC15)

**User story:**

Come Utente programmatore devo poter selezionare una porzione di codice in cui eseguire il controllo dell’implementazione dei requisiti al fine di aggiornare la struttura dati.

---

#### UC17 - Controllo implementazione dei requisiti su tutto il codice

**Generalizza:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente programmatore ha selezionato tutto il codice per eseguire il controllo dell’implementazione dei requisiti.

**Scenario principale:**

1. L’Utente programmatore seleziona tutto il codice del progetto software.
2. L’Utente programmatore avvia il controllo sul codice selezionato (UC11)

**User story:**

Come Utente programmatore devo poter selezionare tutto il codice del progetto software per eseguire il controllo dell’implementazione dei requisiti al fine di aggiornare la struttura dati.

---

#### UC18 - Visualizzazione errore di richiesta al modello

**Estende:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’%%Applicativo|applicativo%% ha avviato un Controllo di implementazione dei requisiti (UC15)
- L’attore secondario %%Ollama|ollama%% non è riuscito ad elaborare la richiesta.

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% invia la richiesta ad %%Ollama|ollama%%
2. Se viene restituito un errore viene visualizzato un messaggio contenente l’errore riportato.

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se la richiesta al modello non può essere soddisfatta.

---

<img src="/img/UseCases/UC15.1.png" alt="Selezione dei requisiti da includere nella ricerca" data-width="70%" />

#### UC15.1 - Selezione dei requisiti da includere nella ricerca

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore si trova nella scheda dedicata

**Postcondizioni:**

- L’Utente programmatore ha selezionato i requisiti per i quali vuole verificare lo stato di implementazione

**Scenario principale:**

1. L’Utente programmatore visualizza tutti i requisiti caricati
2. L’Utente programmatore seleziona i requisiti per i quali vuole effettuare il controllo.

**User story:**

Come Utente programmatore devo poter selezionare tutti i requisiti per i quali voglio effettuare il controllo dello stato di implementazione.

---

<img src="/img/UseCases/UC15.2.png" alt="Richiesta di feedback all'utente" data-width="70%" />

#### UC15.2 - Richiesta di feedback all’utente

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore si trova nella scheda dedicata

**Postcondizioni:**

- Tutti i risultati forniti dall’%%Applicativo|applicativo%% sono stati revisionati dall’Utente programmatore

**Scenario principale:**

1. L’Utente programmatore visualizza lo stato di implementazione fornito dal controllo
2. L’Utente programmatore visualizza la porzione di codice proposta (UC19)
3. L’Utente programmatore revisiona la risposta fornita scegliendo di approvarla, di scartarla o di modificare il puntatore alla porzione di codice

**User story:**

Come Utente programmatore devo poter revisionare la risposta fornita dall’%%Applicativo|applicativo%% durante il controllo dell’implementazione.

---

<img src="/img/UseCases/UC19.png" alt="Visualizzazione porzione di codice che implementa un requisito" data-width="70%" />

#### UC19 - Visualizzazione porzione di codice che implementa un requisito

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore ha aperto la scheda dedicata

**Postcondizioni:**

- L’Utente programmatore visualizza, per ogni requisito che risulta implementato, la porzione di codice indicata come implementazione.

**Scenario principale:**

1. L’Utente programmatore seleziona un requisito che risulta implementato.
2. L’Utente programmatore può visualizzare la porzione di codice che lo implementa.

**Estensioni:**

- UC20 - Visualizzazione errore di riferimento alla porzione di codice che implementa il requisito

**User story:**

Come Utente programmatore devo poter visualizzare, per ogni requisito che risulta implementato all’interno dell'%%Applicativo|applicativo%%, il relativo codice sorgente che lo implementa.

---

#### UC20 - Visualizzazione errore di riferimento alla porzione di codice che implementa il requisito

**Estende:**

- UC19 - Visualizzazione porzione di codice che implementa un requisito

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore vuole visualizzare il codice che implementa un requisito (UC19)
- L’%%Applicativo|applicativo%% non è in grado di visualizzare la porzione di codice corrispondente

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% esegue la procedura di visualizzazione della porzione di codice.
2. Se si verifica un errore, viene visualizzato un messaggio che descrive il problema riscontrato.

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’%%Applicativo|applicativo%% non è in grado di visualizzare la porzione di codice che implementa il requisito selezionato.

---

<img src="/img/UseCases/UC21.png" alt="Visualizzazione della struttura dati" data-width="70%" />

#### UC21 - Visualizzazione della struttura dati

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L'Utente programmatore si trova nella scheda dedicata

**Postcondizioni:**

- L’Utente programmatore visualizza, in forma tabellare, tutti i requisiti con il loro stato di implementazione. La tabella ha come campi: sigla identificativa, descrizione testuale, tipologia, puntatore alla porzione di codice e stato di approvazione. Ciascuna riga permette di escludere o includere nella ricerca il requisito.

**Scenario principale:**

1. L’Utente programmatore visualizza, in forma tabellare, tutti i requisiti caricati con il loro stato di implementazione.

**Estensioni:**

- UC22 - Visualizzazione errore nella rappresentazione della struttura dati

**User story:**

Come Utente programmatore devo poter visualizzare in ogni momento una tabella con le informazioni riguardanti ogni requisito al fine di avere una chiara percezione del loro stato di implementazione.

---

#### UC22 - Visualizzazione errore nella rappresentazione della struttura dati

**Estende:**

- UC21 - Visualizzazione della struttura dati

**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore vuole visualizzare la struttura dati (UC21).
- L’%%Applicativo|applicativo%% non è in grado di visualizzare la struttura dati.

**Postcondizioni:**

- L’Utente programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% esegue la procedura di visualizzazione della struttura dati.
2. Se si verifica un errore, viene visualizzato un messaggio che descrive il problema riscontrato.

**User story:**

Come Utente programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’%%Applicativo|applicativo%% non è in grado di visualizzare la struttura dati.

<img src="/img/UseCases/UC23.png" alt="Utilizzo del chatbot" data-width="70%" />

#### UC23 - Utilizzo del chatbot


**Attore primario:**

- Utente programmatore

**Precondizioni:**

- L’Utente programmatore ha configurato l’estensione (UC1)
- L’Utente programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente programmatore vuole dialogare tramite messaggio con il modello di generazione del codice.

**Postcondizioni:**

- L’Utente programmatore visualizza una chat tra lui e il bot.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% mostra un pannello per la conversazione.
2. È possibile visualizzare la cronologia della chat.
3. È possibile inviare un nuovo messaggio per ottenere una risposta dal modello di generazione del codice.

**User story:**

Come Utente programmatore voglio poter avere una conversazione tramire chat con il modello di generazione del codice.

## Analisi dei requisiti

### Scelta dell'identificativo

I requisiti vengono identificati ciascuno da un codice identificativo nel formato **R\[X\]\[Z\]\_\[N\]**:

- **X**: tipologia del requisito
  - **F** = funzionale: indicano %%funzionalità|funzionalità%% che l'%%Applicativo|applicativo%% deve fornire
  - **T** = tecnico: indicano vincoli riguardo le tecnologie che l'%%Applicativo|applicativo%% deve utilizzare
  - **Q** = qualitativo: indicano vincoli riguardo obbiettivi minimi di %%qualità|qualità%%
- **Z**: obbligatorietà del requisito
  - **O** = obbligatorio : requisito irrinunciabile
  - **D** = desiderabili : non strettamente necessario ma con valore aggiunto riconoscibile
  - **P** = opzionali : utile o contrattabile più avanti
- **N**: numero progressivo

### Requisiti funzionali

- L'utente deve poter configurare l'%%Applicativo|applicativo%% da interfaccia grafica, in particolare:

| ID         | Descrizione                                                                                                                                                                                                                                                                                       | Use Cases        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **RFO_1**  | L'utente può scegliere il modello da utilizzare per generare codice.                                                                                                                                                                                                                              | **UC1.2**        |
| **RFO_2**  | L'utente può scegliere il modello da utilizzare per l'embedding.                                                                                                                                                                                                                                  | **UC1.3**        |
| **RFD_3**  | L'utente può scegliere di utilizzare un modello custom. Nella scelta del modello per generare codice o per l'embedding è possibile indicare il nome di un modello personalizzato e installato nel dispositivo dell'utente.                                                                        | **UC5**, **UC6** |
| **RFO_4**  | L'utente può selezionare uno dei modelli proposti. Nella scelta del modello per generare codice o per l'embedding è possibile selezionare uno dei modelli consigliati. dell'utente.                                                                                                               | **UC4**, **UC7** |
| **RFD_5**  | L'utente può impostare la temperature di ogni modello, inserendo un valore decimale compreso tra 0 e 1.                                                                                                                                                                                           | **UC1.4**        |
| **RFP_6**  | L'utente può inserire un Bearer Token per usare Ollama in un server esterno.                                                                                                                                                                                                                      | **UC1.5**        |
| **RFP_7**  | L'utente può inserire un endpoint specifico a cui indirizzare le richieste di Ollama.                                                                                                                                                                                                             | **UC1.1**        |
| **RFO_8**  | L'Applicativo restituisce un messaggio d'errore se Ollama non risulta installato all'endpoint indicato. Il messaggio deve fornire una possibile soluzione al problema e deve indicare chiaramente il campo che ha generato l'errore.                                                              | **UC2**          |
| **RFO_9**  | L'Applicativo restituisce un messaggio d'errore se l'endpoint indicato non è raggiungibile. Il messaggio deve fornire una possibile soluzione al problema e deve indicare chiaramente il campo che ha generato l'errore.                                                                          | **UC3**          |
| **RFO_10** | L'Applicativo restituisce un messaggio d'errore se il modello, scelto tra quelli proposti o custom, non è installato nel dispositivo. Il messaggio deve fornire una possibile soluzione al problema e deve indicare chiaramente il campo che ha generato l'errore.                                | **UC8**          |
| **RFO_11** | L'Applicativo restituisce un messaggio d'errore se il modello custom indicato non esiste. Il messaggio deve fornire una possibile soluzione al problema e deve indicare chiaramente il campo che ha generato l'errore.                                                                            | **UC9**          |
| **RFO_12** | L'Applicativo restituisce un messaggio d'errore se il bearer token indicato fallisce l'autenticazione e non viene autorizzato al collegamento con il server esterno. Il messaggio deve fornire una possibile soluzione al problema e deve indicare chiaramente il campo che ha generato l'errore. | **UC10**         |

Table: Requisiti funzionali per la configurazione dell'estensione

- L'utente per utilizzare l'%%Applicativo|applicativo%% deve indicare da interfaccia grafica le specifiche del progetto software, in particolare:

| ID         | Descrizione                                                                                                                                                                   | Use Cases  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **RFO_13** | L'utente deve indicare la cartella del progetto software.                                                                                                                     | **UC11.1** |
| **RFO_14** | L'utente deve indicare il file con presente la lista dei requisiti.                                                                                                           | **UC11.2** |
| **RFD_15** | L'utente può effettuare una selezione dei requisiti da analizzare.                                                                                                            | **UC15.1** |
| **RFD_16** | L'utente può specificare dei filtri: può selezionare quali requisiti ricercare nel codice e quali ignorare.                                                                   | **UC11.3** |
| **RFD_17** | L'utente può specificare dei filtri: può indicare quali cartelle includere o escludere nella ricerca del codice.                                                              | **UC11.3** |
| **RFD_18** | L'utente può specificare dei filtri: può indicare quali file includere o escludere nella ricerca del codice.                                                                  | **UC11.3** |
| **RFD_19** | L'utente può specificare dei filtri: può indicare quali estensioni di file includere o escludere nella ricerca del codice.                                                    | **UC11.3** |
| **RFD_20** | L'utente può specificare dei filtri: può indicare un file nel quale ricercare l'implementazione di un preciso requisito.                                                      | **UC11.3** |
| **RFD_21** | L'utente può selezionare una porzione di codice sulla quale eseguire nuovamente la ricerca.                                                                                   | **UC16**   |
| **RFO_22** | L'utente può effettuare una nuova ricerca su tutto il codice.                                                                                                                 | **UC17**   |
| **RFO_23** | L'utente può visualizzare, tramite interfaccia grafica, la porzione di codice che implementa un requisito tramite il puntatore indicato nella tabella che lo riporta al file. | **UC19**   |

Table: Requisiti funzionali per le funzionalità di controllo

- L'esecuzione dell'%%Applicativo|applicativo%% deve consistere nel:

| ID         | Descrizione                                                                                                                                                                                                                                            | Use Cases            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| **RFO_24** | L'Applicativo deve effettuare il parsing del documento dei requisiti.                                                                                                                                                                                  | **UC11.2**, **UC12** |
| **RFO_25** | L'Applicativo deve generare una struttura dati a partire dal parsing del documento dei requisiti.                                                                                                                                                      | **UC11.2**, **UC21** |
| **RFO_26** | L'Applicativo deve generare una notifica di errore se il parsing non è andato a buon fine a causa del formato file scorretto.                                                                                                                          | **UC12**             |
| **RFO_27** | L'Applicativo deve generare una notifica di errore se il parsing non è andato a buon fine a causa del formato non supportato.                                                                                                                          | **UC12**             |
| **RFO_28** | La struttura dati memorizza per ogni requisito: codice identificativo, testo del requisito, stato di implementazione (implementato o non implementato) e il puntatore al frammento di codice (funzione o parte di essa) dove presume sia implementato. | **UC21**             |
| **RFD_29** | L'Applicativo per ogni requisito applica il filtro corrispondente, se presente.                                                                                                                                                                        | **UC17**             |
| **RFD_30** | L'Applicativo deve generare una notifica di errore se i filtri indicati dall'utente non sono applicabili.                                                                                                                                              | **UC13**, **UC14**   |
| **RFO_31** | L'Applicativo per ogni requisito selezionato produce il codice corrispondente interrogando il modello selezionato per la generazione del codice.                                                                                                       | **UC15**             |
| **RFO_32** | L'Applicativo deve effettuare, per ogni requisito selezionato, il pattern matching tra il codice generato e il codice del progetto utilizzando il modello selezionato.                                                                                 | **UC15**             |
| **RFD_33** | L'Applicativo deve invalidare i requisiti associati ad un file che ha subito modifiche in seguito alla ricerca.                                                                                                                                        | **UC15**             |
| **RFO_34** | L'Applicativo deve generare una notifica di errore se una o più richieste ai modelli sono fallite.                                                                                                                                                     | **UC18**             |
| **RFO_35** | L'Applicativo, alla fine dell'esecuzione, deve aggiornare la struttura dati, modificando lo stato di implementazione e il puntatore al codice.                                                                                                         | **UC15**, **UC21**   |
| **RFP_36** | L'Applicativo fornisce un chatbot per porre domande al modello di generazione del codice.                                                                                                                                                              | **UC23**             |

Table: Requisiti funzionali per l'esecuzione dell'estensione

- Al termine dell'esecuzione:

| ID         | Descrizione                                                                                                                                                                                                                                                                                   | Use Cases  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **RFO_37** | L'Applicativo deve fornire un'interfaccia grafica per la visualizzazione della struttura dati in forma tabellare. Per ogni requisito devono essere mostrati: sigla identificativa, descrizione testuale, puntatore alla porzione di codice, stato di implementazione e stato di approvazione. | **UC21**   |
| **RFD_38** | L'interfaccia grafica per la visualizzazione della struttura dati deve permettere di selezionare o escludere un requisito dalla ricerca.                                                                                                                                                      | **UC21**   |
| **RFP_39** | La struttura dati deve essere esportabile in formato .csv e deve memorizzare l'hash code della commit per il versionamento.                                                                                                                                                                   | **UC21**   |
| **RFO_40** | L'Applicativo deve generare una notifica di errore se la struttura dati non è leggibile se il file risulta cancellato.                                                                                                                                                                        | **UC22**   |
| **RFO_41** | L'Applicativo deve generare una notifica di errore se la struttura dati non è leggibile se il file risulta corrotto.                                                                                                                                                                          | **UC22**   |
| **RFP_42** | L'Applicativo richiede all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata: può approvare la proposta.                                                                                                            | **UC15.2** |
| **RFP_43** | L'Applicativo richiede all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata: può scartare la proposta.                                                                                                             | **UC15.2** |
| **RFP_44** | L'Applicativo richiede all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata: può modificare il puntatore alla porzione di codice.                                                                                  | **UC15.2** |
| **RFO_45** | L'Applicativo deve generare una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se il puntatore è scorretto.                                                                                                                                      | **UC20**   |
| **RFO_46** | L'Applicativo deve generare una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se file è stato cancellato.                                                                                                                                       | **UC20**   |
| **RFO_47** | L'Applicativo deve generare una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se il file è corrotto.                                                                                                                                            | **UC20**   |

Table: Requisiti funzionali per l'output dei risultati dell'esecuzione

### Requisiti tecnici e di vincolo

| ID        | Descrizione                                                                                                     | Fonte                                  |
| --------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **RTO_1** | L'Applicativo deve essere un'estensione di Visual Studio Code. (versione minima 1.96)                           | Capitolato                             |
| **RTO_2** | L'Applicativo deve essere eseguibile interamente in locale.                                                     | Capitolato, Riunione con il proponente |
| **RTO_3** | L'Applicativo deve utilizzare Ollama come interfaccia per l'interrogazione dei modelli. (versione minima 0.6.2) | Capitolato                             |
| **RTO_4** | I modelli utilizzati sono dei large language model (LLM).                                                       | Capitolato                             |
| **RTO_5** | Il codice analizzato deve essere in linguaggio C o C++.                                                         | Capitolato                             |
| **RTP_6** | Il codice analizzato deve essere in linguaggio Rust.                                                            | Capitolato                             |
| **RTO_7** | Il file con la lista dei requisiti può essere in formato .csv.                                                  | Capitolato                             |
| **RTP_8** | Il file con la lista dei requisiti può essere in formato .reqif.                                                | Capitolato                             |

Table: Requisiti tecnici e di vincolo

### Requisiti qualitativi

| ID        | Descrizione                                                                                                                              | Fonte              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **RQO_1** | L'Applicativo prodotto e tutta la documentazione relativa deve rispettare quanto indicato nel documento _Norme di progetto_.             | Norme di Progetto  |
| **RQO_2** | L'Applicativo prodotto e tutta la documentazione relativa deve rispettare quanto indicato nel _Piano di Qualifica_.                      | Piano di Qualifica |
| **RQO_3** | L'Applicativo prodotto deve essere accompagnato dalla sua documentazione tecnica: documento di _Specifiche tecniche_ e _Manuale Utente_. | Capitolato         |
| **RQO_4** | L'_Analisi dei requisiti_ deve contenere al suo interno i diagrammi dei casi d'uso in linguaggio UML.                                    | Capitolato         |
| **RQO_5** | Il documento di _Specifiche tecniche_ deve contenere al suo interno i diagrammi delle classi in linguaggio UML.                          | Capitolato         |
| **RQO_6** | Il codice deve avere una copertura di test superiore all'80%.                                                                            | Capitolato         |
| **RQO_7** | I test svolti devono essere indicati in dettaglio nel _Piano di Qualifica_.                                                              | Capitolato         |

Table: Requisiti qualitativi

## Tracciamento caso d'uso - requisito

| Caso d'uso | Requisito                                                              |
| ---------- | ---------------------------------------------------------------------- |
| UC1        | RFO_1 ,RFO_2 , RFD_5 , RFP_6 , RFP_7                                   |
| UC1.1      | RFP_7                                                                  |
| UC1.2      | RFO_1                                                                  |
| UC1.3      | RFO_2                                                                  |
| UC1.4      | RFD_5                                                                  |
| UC1.5      | RFP_6                                                                  |
| UC2        | RFO_8                                                                  |
| UC3        | RFO_9                                                                  |
| UC4        | RFO_4                                                                  |
| UC5        | RFD_3                                                                  |
| UC6        | RFD_3                                                                  |
| UC7        | RFO_4                                                                  |
| UC8        | RFO_10                                                                 |
| UC9        | RFO_11                                                                 |
| UC10       | RFO_12                                                                 |
| UC11       | RFO_13, RFO_14, RFD_16, RFD_17, RFD_18, RFD_19 ,RFD_20, RFO_24, RFO_25 |
| UC11.1     | RFO_13                                                                 |
| UC11.2     | RFO_14, RFO_24, RFO_25,                                                |
| UC11.3     | RFD_16, RFD_17, RFD_18, RFD_19 ,RFD_20                                 |
| UC12       | RFO_24, RF0_26 , RF0_27                                                |
| UC13       | RFD_30                                                                 |
| UC14       | RFD_30                                                                 |
| UC15       | RFD_15, RFP_42, RFP_43, RFP_44                                         |
| UC15.1     | RFD_15                                                                 |
| UC15.2     | RFP_42, RFP_43, RFP_44                                                 |
| UC16       | RFD_21                                                                 |
| UC17       | RFO_22, RFD_29                                                         |
| UC18       | RFO_34                                                                 |
| UC19       | RFO_23                                                                 |
| UC20       | RFO_45, RFO_46, RFO_47                                                 |
| UC21       | RFO_25, RFO_28, RF0_35, RFO_37, RFD_38, RFP_39                         |
| UC22       | RFO_40, RFO_41                                                         |
| UC23       | RFP_36                                                         |

Table: Tracciamento caso d'uso e requisito associato

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->