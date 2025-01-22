---
id: analisi_dei_requisiti
title: "Analisi dei Requisiti"
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Analisi dei requisiti

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                 | Autore       | Data Verifica | Verificatore |
| ---------- | -------- | --------------------------- | ------------ | ------------- | ------------ |
| 10/01/2025 | 2.0.0    | Riscrittura del documento   | Pistori Gaia | 10/01/2025    | Luca Monetti |
| 03/01/2025 | 1.1.0    | Aggiunta termini glossario  | Pistori Gaia | 04/01/2025    | Luca Monetti |
| 13/12/2024 | 1.0.0    | Prima stesura del documento | Pistori Gaia | 13/12/2024    | Luca Monetti |

</details>

<TOCInlineWrapper toc={toc} />
<NumberedWrapper toc={toc}>


## Introduzione

### Scopo del Documento

Lo scopo del documento è quello di definire i requisiti che il gruppo di sviluppo TechWave dovrà rispettare per consegnare il prodotto **_Requirement Tracker - Plug-in VSCode_** rispettando le aspettative dell'azienda Bluewind.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il %%Capitolato|capitolato%% **_Requirement Tracker - Plug-in VSCode_** propone lo sviluppo di un %%Plugin|plugin%% per %%VS Code|vs_code%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

## Analisi dei requisiti

### Scelta dell'identificativo

I requisiti vengono identificati ciascuno da un codice identificativo nel formato Rxz_n:

- tipologia del requisito 
  - F = funzionale: indicano funzionalità che l'%%Applicativo|applicativo%% deve fornire
  - T = tecnico: indicano vincoli riguardo le tecnologie che l'%%Applicativo|applicativo%% deve utilizzare
  - Q = qualitativo: indicano vincoli riguardo obbiettivi minimi di qualità
- obbligatorietà del requisito
  - O = obbligatorio : irrinunciabile per qualcuno degli stakeholder
  - D = desiderabili : non strettamente necessario ma con valore aggiunto riconoscibile
  - P = opzionali : utile o contrattabile più avanti
- n: numero progressivo

### Requisiti funzionali
- L'utente deve poter configurare l'%%Applicativo|applicativo%% da interfaccia grafica, in particolare:
  - RFO_1: L'utente può scegliere il modello da utilizzare per generare codice.
  - RFO_2: L'utente può scegliere il modello da utilizzare per ricercare keyword.
  - RFO_3: L'utente può scegliere il modello da utilizzare per fare pattern matching.
  - RFD_4: L'utente può scegliere di utilizzare un modello custom.
  - RFO_5: L'utente può selezionare uno dei modelli proposti.
  - RFD_6: L'utente può impostare la temperature di ogni modello.
  - RFP_7: L'utente può inserire un Bearer Token per usare Ollama in un server esterno.
  - RFO_8: L'%%Applicativo|applicativo%%, in caso di errori dati da input scorretti da parte dell'utente, deve generare una notifica d'errore e permettere il reinserimento del dato.
- L'utente per utilizzare l'%%Applicativo|applicativo%% deve indicare da interfaccia grafica le specifiche del progetto, in particolare:
  - RFO_9: L'utente deve indicare la cartella del progetto.
  - RFO_10: L'utente deve indicare il file con presente la lista dei requisiti.
  - RFD_11: L'utente può effettuare una selezione dei requisiti da analizzare.
  - RFD_12: L'utente può specificare dei filtri per selezionare i file sui quali effettuare la ricerca.
  - RFD_13: L'utente può selezionare una porzione di codice sulla quale eseguire nuovamente la ricerca.
  - RFO_14: L'utente può effettuare una nuova ricerca su tutto il codice.
  - RFO_15: L'utente può visualizzare, tramite interfaccia grafica, la porzione di codice che implementa un requisito.
- L'esecuzione dell'%%Applicativo|applicativo%% deve consistere nel:
  - RFO_16: L'%%Applicativo|applicativo%% deve effettuare il parsing del documento dei requisiti.
  - RFO_17: L'%%Applicativo|applicativo%% deve generare una struttura dati a partire dal parsing del documento dei requisiti.
  - RFO_18: L'%%Applicativo|applicativo%% deve generare una notifica di errore se il parsing non è andato a buon fine (es. formato file scorretto o non supportato).
  - RFO_19: La struttura dati memorizza per ogni requisito: codice identificativo, testo del requisito, stato di implementazione (implementato o non implementato) e il puntatore al frammento di codice (funzione o parte di essa) dove presume sia implementato.
  - RFD_20: L'%%Applicativo|applicativo%% per ogni requisito applica il filtro corrispondente, se presente.
  - RFD_21: L'%%Applicativo|applicativo%% deve generare una notifica di errore se i filtri indicati dall'utente non sono applicabili.
  - RFO_22: L'%%Applicativo|applicativo%% per ogni requisito selezionato produce il codice corrispondente interrogando il modello selezionato per la generazione del codice.
  - RFO_23: L'%%Applicativo|applicativo%% deve effettuare, per ogni requisito selezionato, il pattern matching utilizzando il modello selezionato tra il codice generato (modello) e il codice del progetto (programmatore) dei file filtrati.
  - RFO_24: L'%%Applicativo|applicativo%% deve generare una notifica di errore se una o più richieste ai modelli sono fallite.
  - RFO_25: L'%%Applicativo|applicativo%%, alla fine dell'esecuzione, deve aggiornare la struttura dati, modificando lo stato di implementazione e il puntatore al codice.
- Al termine dell'esecuzione:
  - RFO_26: L'%%Applicativo|applicativo%% deve fornire un'interfaccia grafica per la visualizzazione della struttura dati.
  - RFO_27: L'%%Applicativo|applicativo%% deve generare una notifica di errore se la struttura dati non è leggibile (es. file cancellato o corrotto).
  - RFP_28: L'%%Applicativo|applicativo%% richiede all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata.
  - RFO_29: L'%%Applicativo|applicativo%% deve generare una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile (es. puntatore scorretto, file cancellato o corrotto).
  - RFP_30: L'%%Applicativo|applicativo%% può fornire delle statistiche di correttezza per il confronto dei modelli messi a disposizione tra le opzioni.

### Requisiti tecnici e di vincolo
- RTO_1: L'%%Applicativo|applicativo%% deve essere un'estensione di Visual Studio Code.
- RTO_2: L'%%Applicativo|applicativo%% deve essere eseguibile interamente in locale.
- RTO_3: L'%%Applicativo|applicativo%% deve utilizzare %%Ollama|ollama%% come interfaccia per l'interrogazione dei modelli.
- RTO_4: I modelli utilizzati sono dei large language model (%%LLM|llm%%).
- RTO_5: Il codice analizzato deve essere in linguaggio C o C++.
- RTP_6: Il codice analizzato deve essere in linguaggio Rust.
- RTO_7: Il file con la lista dei requisiti può essere in formato _.csv_.
- RTP_8: Il file con la lista dei requisiti può essere in formato _.reqif_.

### Requisiti qualitativi
- RQO_1: L'%%Applicativo|applicativo%% prodotto e tutta la documentazione relativa deve rispettare quanto indicato in Norme di Progetto.
- RQO_2: L'%%Applicativo|applicativo%% prodotto e tutta la documentazione relativa deve rispettare quanto indicato in Piano di Qualifica.
- RQO_3: L'%%Applicativo|applicativo%% prodotto deve essere accompagnato dalla sua documentazione tecnica.

 </NumberedWrapper>
