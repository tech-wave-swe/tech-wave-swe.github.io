---
id: analisi_dei_requisiti
title: "Analisi dei Requisiti"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 2.4.0
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

Lo scopo del documento è quello di definire i requisiti che il gruppo di sviluppo TechWave dovrà rispettare per consegnare il %%prodotto|prodotto%% **Requirement Tracker - Plug-in VSCode** rispettando le aspettative dell'azienda Bluewind.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded il controllo e tracciamento dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore. Può inoltre risultare non esaustiva a causa di distrazioni o dimenticanze. Il %%Capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di una estensione per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

Il %%capitolato|capitolato%% prevede la realizzazione di un supporto agli sviluppattori che permetta loro di controllare e tracciare l'implementazione di requisiti software all'interno di un progetto. Tramite questa estensione lo sviluppatore potrà caricare un file, in formato _.csv_ o _.reqif_, contenente i requisiti individuati e visualizzare lo stato implementativo di ognuno. Utilizzando l'Intellegenza Artificiale, nello specifico un modello %%LLM|llm%%, l'estensione analizzerà l'intero codice sorgente del progetto e restituirà lo stato di implementazione di ogni requisito segnalando, se presente, la porzione di codice che lo implementa.

## Casi d'uso

### Introduzione

Questa sezione illustra i casi d’uso delineati dopo l’analisi del Capitolato, il confronto con il %%proponente|proponente%% e le discussioni svolte durante le riunioni interne.

### Attori

L'%%Applicativo|applicativo%% si interfaccia con un singolo attore primario:

- **Utente Programmatore**: Utente principale dell'%%applicativo|applicativo%%. Ha accesso a tutte le funzionalità previste e utilizza l'%%applicativo|applicativo%% durante il flusso di lavoro.

L'%%Applicativo|applicativo%% si intefaccia con un singolo attore secondario:

- **%%Ollama|ollama%%**: Software gratuito e open source che consente di eseguire in locale diversi modelli %%LLM|llm%%.

### Elenco casi d'uso

<img src="/img/UseCases/UC1.png" alt="Configurazione dell'estensione" data-width="70%" />

#### UC1 - Configurazione dell'estensione

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L'Utente Programmatore si trova nella scheda dedicata alle configurazioni

**Postcondizioni:**

- L’%%Applicativo|applicativo%% è stato configurato

**Scenario principale:**

1. L’Utente Programmatore visualizza tutte le impostazioni modificabili.
2. L’Utente Programmatore inserisce l’endpoint di %%Ollama|ollama%% (UC1.1)
3. L’Utente Programmatore seleziona il modello per la generazione del codice (UC1.2)
4. L’Utente Programmatore seleziona il modello di embedding (UC1.3)
5. L’Utente Programmatore seleziona la "temperature’ del modello (UC1.4)
6. L’Utente Programmatore inserisce il bearer token (UC1.5)
7. La modifica viene applicata.

**User Story:**

Come Utente Programmatore devo poter configurare l’estensione modificando le impostazioni disponibili tramite valori predefiniti o personalizzati per adattarne il funzionamento al sistema utilizzato.

---

<img src="/img/UseCases/UC1.1.png" alt="Inserimento endpoint Ollama" data-width="70%" />

#### UC1.1 - Inserimento endpoint Ollama

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- L’endpoint di %%Ollama|ollama%% è stato configurato

**Scenario principale:**

1. L’Utente Programmatore seleziona la voce per modificare l’endpoint
2. L’Utente Programmatore indica l’endpoint in cui è installato %%Ollama|ollama%%

**Estensioni:**

- UC2 - Visualizzazione errore %%Ollama|ollama%% non installato
- UC3 - Visualizzazione errore endpoint non raggiungibile

**User Story:**

Come Utente Programmatore devo poter indicare l’endpoint in cui è installato %%Ollama|ollama%% per l’interrogazione dei modelli durante l’esecuzione dell’estensione.

---

#### UC2 - Visualizzazione errore di Ollama non installato

**Estende:**

- UC1.1 - Inserimento endpoint %%Ollama|ollama%%

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L'Utente Programmatore sta configurando l'endpoint di %%Ollama|ollama%% (UC1.1)
- %%Ollama|ollama%% non è installato nell’endpoint indicato

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se %%Ollama|ollama%% non è installato nell’endpoint indicato.

---

#### UC3 - Visualizzazione errore endpoint non raggiungibile

**Estende:**

- UC1.1 - Inserimento endpoint %%Ollama|ollama%%

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L'Utente Programmatore sta configurando l'endpoint di %%Ollama|ollama%% (UC1.1)
- L’endpoint indicato non è raggiungibile

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’endpoint indicato non fa riferimento ad una destinazione raggiungibile.

---

<img src="/img/UseCases/UC1.2.png" alt="Selezione di un modello di generazione del codice" data-width="70%" />

#### UC1.2 - Selezione di un modello di generazione del codice

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il modello di generazione del codice è stato configurato

**Scenario principale:**

1. L’Utente Programmatore seleziona la voce per modificare il modello di generazione del codice
2. L’Utente Programmatore sceglie il modello da utilizzare

**User Story:**

Come Utente Programmatore devo poter scegliere il modello che verrà utilizzato per generare il codice a partire dai requisiti che verranno inseriti.

---

#### UC4 - Selezione di un modello di default per la generazione del codice

**Generalizza:**

- UC1.2 - Selezione modello di generazione codice

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente Programmatore sta scegliendo il modello per la generazione del codice (UC1.2)

**Postcondizioni:**

- Il modello è stato configurato con un modello di default

**Scenario principale:**

1. L’Utente Programmatore visualizza una lista di modelli proposti
2. L’Utente Programmatore sceglie un modello tra quelli proposti

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato

**User Story:**

Come Utente Programmatore devo poter selezionare un modello da una lista proposta per la generazione delle risposte.

---

#### UC5 - Selezione di un modello custom per la generazione del codice

**Generalizza:**

- UC1.2 - Selezione modello di generazione codice

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente Programmatore sta scegliendo il modello per la generazione del codice (UC1.2)

**Postcondizioni:**

- Il modello è stato configurato con un modello custom

**Scenario principale:**

1. L’Utente Programmatore inserisce il nome di un modello custom

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato
- UC9 - Visualizzazione errore modello custom non esistente

**User Story:**

Come Utente Programmatore devo poter inserire il nome di un modello custom per modificare il modello utilizzato per la generazione delle risposte.

---

#### UC8 - Visualizzazione errore di modello non installato

**Estende:**

- UC4 - Selezione modello di default per generazione codice
- UC5 - Selezione modello custom per generazione codice
- UC6 - Selezione modello custom di embedding
- UC7 - Selezione modello di default di embedding

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha selezionato un modello
- Il modello non è installato nell’endpoint

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il modello a cui voglio fare la richiesta non è installato nell’endpoint.

---

#### UC9 - Visualizzazione errore di modello custom non esistente

**Estende:**

- UC5 - Selezione modello custom per generazione codice
- UC6 - Selezione modello custom di embedding

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha inserito un modello custom
- Il modello inserito non esiste

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il modello a cui voglio fare la richiesta non esiste.

---

<img src="/img/UseCases/UC1.3.png" alt="Selezione di un modello di embedding" data-width="70%" />

#### UC1.3 - Selezione di un modello di embedding

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il modello di embedding è stato configurato

**Scenario principale:**

1. L’Utente Programmatore seleziona la voce per modificare il modello di embedding
2. L’Utente Programmatore sceglie il modello da utilizzare

**User Story:**

Come Utente Programmatore devo poter scegliere il modello che verrà utilizzato per l’embedding dei documenti all'interno dell'estensione.

---

#### UC6 - Selezione di un modello custom di embedding

**Generalizza:**

- UC1.3 - Selezione modello di embedding

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente Programmatore sta scegliendo il modello di embedding (UC1.3)

**Postcondizioni:**

- Il modello è stato configurato con un modello custom

**Scenario principale:**

1. L’Utente Programmatore inserisce il nome di un modello custom

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato
- UC9 - Visualizzazione errore modello custom non esistente

**User Story:**

Come Utente Programmatore devo poter inserire il nome di un modello custom per modificare il modello utilizzato per l'embedding dei documenti.

---

#### UC7 - Selezione di un modello di default di embedding

**Generalizza:**

- UC1.3 - Selezione modello di embedding

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’utente Programmatore sta scegliendo il modello di embedding (UC1.3)

**Postcondizioni:**

- Il modello è stato configurato con un modello di default

**Scenario principale:**

1. L’Utente Programmatore visualizza una lista di modelli proposti
2. L’Utente Programmatore sceglie un modello tra quelli proposti

**Estensioni:**

- UC8 - Visualizzazione errore modello non installato

**User Story:**

Come Utente Programmatore devo poter selezionare un modello da una lista proposta per l'embedding dei documenti.

---

<img src="/img/UseCases/UC1.4.png" alt="Selezione 'temperature' modello" data-width="70%" />

#### UC1.4 - Selezione ‘temperature’ modello

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- La ‘temperature’ dei modelli è stata configurata

**Scenario principale:**

1. L’Utente Programmatore seleziona la voce per modificare la ‘temperature’
2. L’Utente Programmatore indica un valore numerico per la ‘temperature’

**User Story:**

Come Utente Programmatore devo poter indicare la ‘temperature’ dei modelli necessaria per determinare il livello di casualità della risposta.

---

<img src="/img/UseCases/UC1.5.png" alt="Inserimento di bearer token" data-width="70%" />

#### UC1.5 - Inserimento di bearer token

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)

**Postcondizioni:**

- Il bearer token è stato configurato

**Scenario principale:**

1. L’Utente Programmatore seleziona la voce per modificare il bearer token
2. L’Utente Programmatore indica il bearer token

**Estensioni:**

- UC10 - Visualizzazione errore di autorizzazione

**User Story:**

Come Utente Programmatore devo poter indicare un bearer token necessario per l’autenticazione per utilizzare server protetti e/o remoti.

---

#### UC10 - Visualizzazione errore di autorizzazione

**Estende:**

- UC1.5 - Inserimento bearer token

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta effettuando la configurazione dell’estensione (UC1)
- L’Utente Programmatore ha inserito un bearer token (UC1.5)
- Il token non consente l’autorizzazione

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il bearer token inserito non consente l’autorizzazione.

---

<img src="/img/UseCases/UC11.png" alt="Apertura di un progetto" data-width="70%" />

#### UC11 - Apertura di un progetto

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)

**Postcondizioni:**

- L’Utente Programmatore ha aperto un progetto software
- L’%%Applicativo|applicativo%% aggiorna la struttura dati a seguito del controllo dell’implementazione dei requisiti

**Scenario principale:**

1. L’Utente Programmatore apre la cartella di progetto software (UC11.1)
2. L’Utente Programmatore carica il file dei requisiti (UC11.2)
3. L’Utente Programmatore inserisce i filtri per il progetto software corrente (UC11.3)
4. L’%%Applicativo|applicativo%% avvia il controllo dell’implementazione dei requisiti (UC15)

**User Story:**

Come Utente Programmatore devo poter aprire un progetto software su cui poi verranno effettuati i controlli di implementazione dei requisiti.

---

<img src="/img/UseCases/UC11.1.png" alt="Apertura della cartella del progetto" data-width="70%" />

#### UC11.1 - Apertura della cartella del progetto

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente Programmatore ha aperto la cartella contenente i file del progetto software

**Scenario principale:**

1. L’Utente Programmatore si reca nell’area dedicata
2. L’Utente Programmatore seleziona la cartella contenente i file del progetto software
3. L’Utente Programmatore apre la cartella

**User Story:**

Come Utente Programmatore devo poter aprire una cartella che conterrà i file del progetto software su cui andrò a fare il controllo dell’implementazione dei requisiti

---

<img src="/img/UseCases/UC11.2.png" alt="Caricamento file dei requisiti" data-width="70%" />

#### UC11.2 - Caricamento file dei requisiti

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente Programmatore ha caricato il file contenente i requisiti del progetto software

**Scenario principale:**

1. L’Utente Programmatore si reca nell’area dedicata
2. L’Utente Programmatore seleziona il file contenente i requisiti del progetto software
3. L’Utente Programmatore carica il file

**Estensioni:**

- UC12 - Visualizzazione errore di parsing dei dati

**User Story:**

Come Utente Programmatore devo poter caricare il file che conterrà i requisiti del progetto software, che verranno analizzati durante il controllo della loro implementazione

---

#### UC12 - Visualizzazione errore di parsing dei dati

**Estende:**

- UC11.2 - Caricamento file dei requisiti

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha caricato il file dei requisiti (UC11.2)
- Il file dei requisiti non risulta valido

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il file dei requisiti contiene dati che non si trovano in uno stato consistente.

---

<img src="/img/UseCases/UC11.3.png" alt="Inserimento filtri per il progetto corrente" data-width="70%" />

#### UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore sta aprendo un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente Programmatore ha inserito i filtri per facilitare il controllo dell’implementazione dei requisiti

**Scenario principale:**

1. L’Utente Programmatore si reca nella scheda dedicata
2. L’Utente Programmatore seleziona i filtri da applicare al progetto software corrente

**Estensioni:**

- UC13 - Visualizzazione errore filtro non trovato
- UC14 - Visualizzazione errore di esecuzione del filtro

**User Story:**

Come Utente Programmatore devo poter selezionare i filtri che applicherò al progetto software corrente per ridurre il quantitativo di file su cui andrò a fare il controllo dell’implementazione dei requisiti

---

#### UC13 - Visualizzazione errore filtro non trovato

**Estende:**

- UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha inserito i filtri per il progetto software corrente (UC11.3)
- Almeno uno dei filtri non viene trovato dall’%%Applicativo|applicativo%%

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il filtro inserito non viene trovato dall’%%Applicativo|applicativo%%.

---

#### UC14 - Visualizzazione errore di esecuzione filtro

**Estende:**

- UC11.3 - Inserimento filtri per il progetto corrente

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha inserito i filtri per il progetto software corrente (UC11.3)
- L'esecuzione di almeno un filtro non termina correttamente

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo

**Scenario principale:**

1. L’%%applicativo|applicativo%% visualizza un messaggio contenente l’errore riportato

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se il filtro inserito non viene eseguito in modo corretto scatenando un errore.

---

<img src="/img/UseCases/UC15.png" alt="Controllo implementazione requisiti" data-width="70%" />

#### UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente Programmatore

**Attore secondario:**

- %%Ollama|ollama%%

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore si trova nella scheda dedicata

**Postcondizioni:**

- Lo stato di tutti i requisiti caricati (UC11.2) è aggiornato con la situazione effettiva all’interno del codice.

**Scenario principale:**

1. L’Utente Programmatore seleziona i requisiti per i quali vuole effettuare il controllo (UC15.1)
2. L’Utente Programmatore avvia la procedura di controllo del codice.
3. L’Utente Programmatore fornisce feedback sui risultati forniti dal sistema (UC15.2)
4. L’%%Applicativo|applicativo%% aggiorna la struttura dati

**Estensioni:**

- UC18 - Visualizzazione errore di richiesta al modello

**User Story:**

Come Utente Programmatore devo poter avviare un controllo dello stato di implementazione dei requisiti caricati al fine di aggiornare la struttura dati.

---

#### UC16 - Controllo implementazione dei requisiti su una parte del codice

**Generalizza:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore ha un file del progetto software aperto.

**Postcondizioni:**

- L’Utente Programmatore ha selezionato la porzione di codice nella quale eseguire il controllo dell’implementazione dei requisiti.

**Scenario principale:**

1. L’Utente Programmatore seleziona una parte di codice nel file aperto.
2. L’Utente Programmatore avvia il controllo sul codice selezionato (UC15)

**User Story:**

Come Utente Programmatore devo poter selezionare una porzione di codice in cui eseguire il controllo dell’implementazione dei requisiti al fine di aggiornare la struttura dati.

---

#### UC17 - Controllo implementazione dei requisiti su tutto il codice

**Generalizza:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)

**Postcondizioni:**

- L’Utente Programmatore ha selezionato tutto il codice per eseguire il controllo dell’implementazione dei requisiti.

**Scenario principale:**

1. L’Utente Programmatore seleziona tutto il codice del progetto software.
2. L’Utente Programmatore avvia il controllo sul codice selezionato (UC11)

**User Story:**

Come Utente Programmatore devo poter selezionare tutto il codice del progetto software per eseguire il controllo dell’implementazione dei requisiti al fine di aggiornare la struttura dati.

---

#### UC18 - Visualizzazione errore di richiesta al modello

**Estende:**

- UC15 - Controllo implementazione requisiti

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’%%Applicativo|applicativo%% ha avviato un Controllo di implementazione dei requisiti (UC15)
- L’attore secondario %%Ollama|ollama%% non è riuscito ad elaborare la richiesta.

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% invia la richiesta ad %%Ollama|ollama%%
2. Se viene restituito un errore viene visualizzato un messaggio contenente l’errore riportato.

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se la richiesta al modello non può essere soddisfatta.

---

<img src="/img/UseCases/UC15.1.png" alt="Selezione dei requisiti da includere nella ricerca" data-width="70%" />

#### UC15.1 - Selezione dei requisiti da includere nella ricerca

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore si trova nella scheda dedicata

**Postcondizioni:**

- L’Utente Programmatore ha selezionato i requisiti per i quali vuole verificare lo stato di implementazione

**Scenario principale:**

1. L’Utente Programmatore visualizza tutti i requisiti caricati
2. L’Utente Programmatore seleziona i requisiti per i quali vuole effettuare il controllo.

**User Story:**

Come Utente Programmatore devo poter selezionare tutti i requisiti per i quali voglio effettuare il controllo dello stato di implementazione.

---

<img src="/img/UseCases/UC15.2.png" alt="Richiesta di feedback all'utente" data-width="70%" />

#### UC15.2 - Richiesta di Feedback all’utente

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore si trova nella scheda dedicata

**Postcondizioni:**

- Tutti i risultati forniti dall’%%Applicativo|applicativo%% sono stati revisionati dall’Utente Programmatore

**Scenario principale:**

1. L’Utente Programmatore visualizza lo stato di implementazione fornito dal controllo
2. L’Utente Programmatore visualizza la porzione di codice proposta (UC19)
3. L’Utente Programmatore revisiona la risposta fornita.

**User Story:**

Come Utente Programmatore devo poter revisionare la risposta fornita dall’%%Applicativo|applicativo%% durante il controllo dell’implementazione.

---

<img src="/img/UseCases/UC19.png" alt="Visualizzazione porzione di codice che implementa un requisito" data-width="70%" />

#### UC19 - Visualizzazione porzione di codice che implementa un requisito

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore ha aperto la scheda dedicata

**Postcondizioni:**

- L’Utente Programmatore visualizza, per ogni requisito che risulta implementato, la porzione di codice indicata come implementazione.

**Scenario principale:**

1. L’Utente Programmatore seleziona un requisito che risulta implementato.
2. L’Utente Programmatore può visualizzare la porzione di codice che lo implementa.

**Estensioni:**

- UC20 - Visualizzazione errore di riferimento alla porzione di codice che implementa il requisito

**User Story:**

Come Utente Programmatore devo poter visualizzare, per ogni requisito che risulta implementato all’interno dell'%%Applicativo|applicativo%%, il relativo codice sorgente che lo implementa.

---

#### UC20 - Visualizzazione errore di riferimento alla porzione di codice che implementa il requisito

**Estende:**

- UC19 - Visualizzazione porzione di codice che implementa un requisito

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore vuole visualizzare il codice che implementa un requisito (UC19)
- L’%%Applicativo|applicativo%% non è in grado di visualizzare la porzione di codice corrispondente

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% esegue la procedura di visualizzazione della porzione di codice.
2. Se si verifica un errore, viene visualizzato un messaggio che descrive il problema riscontrato.

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’%%Applicativo|applicativo%% non è in grado di visualizzare la porzione di codice che implementa il requisito selezionato.

---

<img src="/img/UseCases/UC21.png" alt="Visualizzazione della struttura dati" data-width="70%" />

#### UC21 - Visualizzazione della struttura dati

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L'Utente Programmatore si trova nella scheda dedicata

**Postcondizioni:**

- L’Utente Programmatore visualizza, in forma tabellare, tutti i requisiti con il loro stato di implementazione.

**Scenario principale:**

1. L’Utente Programmatore visualizza, in forma tabellare, tutti i requisiti caricati con il loro stato di implementazione.

**Estensioni:**

- UC22 - Visualizzazione errore nella rappresentazione della struttura dati

**User Story:**

Come Utente Programmatore devo poter visualizzare in ogni momento una tabella con lo stato di implementazione di ogni requisito al fine di avere una chiara percezione del loro stato di implementazione.

---

#### UC22 - Visualizzazione errore nella rappresentazione della struttura dati

**Estende:**

- UC21 - Visualizzazione della struttura dati

**Attore primario:**

- Utente Programmatore

**Precondizioni:**

- L’Utente Programmatore ha configurato l’estensione (UC1)
- L’Utente Programmatore ha aperto un nuovo progetto software (UC11)
- L’Utente Programmatore vuole visualizzare la struttura dati (UC21).
- L’%%Applicativo|applicativo%% non è in grado di visualizzare la struttura dati

**Postcondizioni:**

- L’Utente Programmatore visualizza un messaggio di errore significativo.

**Scenario principale:**

1. L’%%Applicativo|applicativo%% esegue la procedura di visualizzazione della struttura dati.
2. Se si verifica un errore, viene visualizzato un messaggio che descrive il problema riscontrato.

**User Story:**

Come Utente Programmatore voglio ricevere un messaggio di errore chiaro e informativo se l’%%Applicativo|applicativo%% non è in grado di visualizzare la struttura dati.

## Analisi dei requisiti

### Scelta dell'identificativo

I requisiti vengono identificati ciascuno da un codice identificativo nel formato **R \[X\]\[Z\]\_\[N\]**:

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
  - **RFO_1**: L'utente può scegliere il modello da utilizzare per generare codice.
  - **RFO_2**: L'utente può scegliere il modello da utilizzare per l'embedding.
  - **RFD_3**: L'utente può scegliere di utilizzare un modello custom.
  - **RFO_4**: L'utente può selezionare uno dei modelli proposti.
  - **RFD_5**: L'utente può impostare la temperature di ogni modello.
  - **RFP_6**: L'utente può inserire un Bearer Token per usare %%Ollama|ollama%% in un server esterno.
  - **RFO_7**: L'%%Applicativo|applicativo%%, in caso di errori dati da input scorretti da parte dell'utente, deve generare una notifica d'errore e permettere il reinserimento del dato.
- L'utente per utilizzare l'%%Applicativo|applicativo%% deve indicare da interfaccia grafica le specifiche del progetto software, in particolare:
  - **RFO_8**: L'utente deve indicare la cartella del progetto software.
  - **RFO_9**: L'utente deve indicare il file con presente la lista dei requisiti.
  - **RFD_10**: L'utente può effettuare una selezione dei requisiti da analizzare.
  - **RFD_11**: L'utente può specificare dei filtri per selezionare i file sui quali effettuare la ricerca.
  - **RFD_12**: L'utente può selezionare una porzione di codice sulla quale eseguire nuovamente la ricerca.
  - **RFO_13**: L'utente può effettuare una nuova ricerca su tutto il codice.
  - **RFO_14**: L'utente può visualizzare, tramite interfaccia grafica, la porzione di codice che implementa un requisito.
- L'esecuzione dell'%%Applicativo|applicativo%% deve consistere nel:
  - **RFO_15**: L'%%Applicativo|applicativo%% deve effettuare il parsing del documento dei requisiti.
  - **RFO_16**: L'%%Applicativo|applicativo%% deve generare una struttura dati a partire dal parsing del documento dei requisiti.
  - **RFO_17**: L'%%Applicativo|applicativo%% deve generare una notifica di errore se il parsing non è andato a buon fine (es. formato file scorretto o non supportato).
  - **RFO_18**: La struttura dati memorizza per ogni requisito: codice identificativo, testo del requisito, stato di implementazione (implementato o non implementato) e il puntatore al frammento di codice (funzione o parte di essa) dove presume sia implementato.
  - **RFD_19**: L'%%Applicativo|applicativo%% per ogni requisito applica il filtro corrispondente, se presente.
  - **RFD_20**: L'%%Applicativo|applicativo%% deve generare una notifica di errore se i filtri indicati dall'utente non sono applicabili.
  - **RFO_21**: L'%%Applicativo|applicativo%% per ogni requisito selezionato produce il codice corrispondente interrogando il modello selezionato per la generazione del codice.
  - **RFO_22**: L'%%Applicativo|applicativo%% deve effettuare, per ogni requisito selezionato, il pattern matching tra il codice generato e il codice del progetto utilizzando il modello selezionato.
  - **RFO_23**: L'%%Applicativo|applicativo%% deve generare una notifica di errore se una o più richieste ai modelli sono fallite.
  - **RFO_24**: L'%%Applicativo|applicativo%%, alla fine dell'esecuzione, deve aggiornare la struttura dati, modificando lo stato di implementazione e il puntatore al codice.
- Al termine dell'esecuzione:
  - **RFO_25**: L'%%Applicativo|applicativo%% deve fornire un'interfaccia grafica per la visualizzazione della struttura dati.
  - **RFO_26**: L'%%Applicativo|applicativo%% deve generare una notifica di errore se la struttura dati non è leggibile (es. file cancellato o corrotto).
  - **RFP_27**: L'%%Applicativo|applicativo%% richiede all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata.
  - **RFO_28**: L'%%Applicativo|applicativo%% deve generare una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile (es. puntatore scorretto, file cancellato o corrotto).
  - **RFP_29**: L'%%Applicativo|applicativo%% può fornire delle statistiche di correttezza per il confronto dei modelli messi a disposizione tra le opzioni.

### Requisiti tecnici e di vincolo

- **RTO_1**: L'%%Applicativo|applicativo%% deve essere un'estensione di Visual Studio Code.
- **RTO_2**: L'%%Applicativo|applicativo%% deve essere eseguibile interamente in locale.
- **RTO_3**: L'%%Applicativo|applicativo%% deve utilizzare %%Ollama|ollama%% come interfaccia per l'interrogazione dei modelli.
- **RTO_4**: I modelli utilizzati sono dei large language model (%%LLM|llm%%).
- **RTO_5**: Il codice analizzato deve essere in linguaggio C o C++.
- **RTP_6**: Il codice analizzato deve essere in linguaggio Rust.
- **RTO_7**: Il file con la lista dei requisiti può essere in formato .csv.
- **RTP_8**: Il file con la lista dei requisiti può essere in formato .reqif.

### Requisiti qualitativi

- **RQO_1**: L'%%Applicativo|applicativo%% prodotto e tutta la documentazione relativa deve rispettare quanto indicato nel documento _Norme di progetto_.
- **RQO_2**: L'%%Applicativo|applicativo%% prodotto e tutta la documentazione relativa deve rispettare quanto indicato nel _Piano di Qualifica_.
- **RQO_3**: L'%%Applicativo|applicativo%% prodotto deve essere accompagnato dalla sua documentazione tecnica.

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
