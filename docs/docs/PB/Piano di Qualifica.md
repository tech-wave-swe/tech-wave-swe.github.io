---
id: piano_di_qualifica
title: "Piano di Qualifica - v1.7.4"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.7.4
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di Qualifica

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                              | Autore                | Data Verifica | Verificatore          |
| ---------- | -------- | ---------------------------------------- | --------------------- | ------------- | --------------------- |
| 30/03/2025 | 1.7.4    | Controllo consistenza maiuscile          | Dal Bianco Riccardo   | 30/03/2025    | Vasquez Manuel Felipe |
| 07/03/2025 | 1.7.3    | Aggiunta interpretazione dei grafici     | Monetti Luca          | 07/03/2025    | Pistori Gaia          |
| 06/03/2025 | 1.7.2    | miglioramento metriche                   | Piola Andrea          | 07/03/2025    | Luca Monetti          |
| 24/02/2025 | 1.7.1    | fix indici tabelle                       | Piola Andrea          | 25/02/2025    | Gaia Pistori          |
| 09/02/2025 | 1.7.0    | Note di auto-miglioramento               | Manuel Felipe Vasquez | 12/02/2025    | Luca Monetti          |
| 31/01/2025 | 1.6.0    | Inserimento cruscotto                    | Gaia Pistori          | 05/02/2025    | Manuel Felipe Vasquez |
| 24/01/2025 | 1.5.0    | Aggiunti test                            | Giulia Marcon         | 26/01/2025    | Gaia Pistori          |
| 16/01/2025 | 1.4.0    | Aggiunte misure                          | Luca Monetti          | 17/01/2025    | Manuel Felipe Vasquez |
| 03/01/2025 | 1.3.0    | Modifica descrizione e riferimenti       | Manuel Felipe Vasquez | 06/01/2025    | Luca Monetti          |
| 22/12/2024 | 1.2.0    | Aggiunte metriche di qualità di Prodotto | Gaia Pistori          | 24/12/2024    | Manuel Felipe Vasquez |
| 16/12/2024 | 1.1.0    | aggiunta qualità di processo             | Giulia Marcon         | 17/12/2024    | Agnese Carraro        |
| 08/12/2024 | 1.0.0    | Prima stesura del documento              | Manuel Felipe Vasquez | 10/12/2024    | Luca Monetti          |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del documento

Questo documento delinea le strategie di verifica, validazione e quality assurance adottate durante lo sviluppo del progetto, definendo gli obiettivi qualitativi e le relative metriche di misurazione. Include la documentazione dettagliata delle procedure di verifica, dei processi di controllo qualità, e delle metodologie di test implementate nelle varie fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team.
Si concentra su:

- La qualità dei processi, in termini di aderenza agli standard e alle pratiche di gestione del ciclo di vita del software.
- La qualità del prodotto, attraverso la definizione di metriche misurabili e verificabili.
- L'adozione di un modello a V per la pianificazione e l'esecuzione delle attività di test e validazione.

### Glossario

Per una definizione dei termini tecnici utilizzati in questo documento, consultare il [Glossario - v2.2.0](./Glossario.md).

### Riferimenti

#### Riferimenti normativi

- **Norme di Progetto**: [Norme di Progetto - v1.8.1](./Norme%20di%20Progetto.md)
- **Capitolato d'Appalto C8: Requirement Tracker- Plug-in VS Code**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti informativi

- T2 - I processi di ciclo di vita del software [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)
- T7 - Qualità del software [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf)
- T8 - Qualità di processo [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf)
- T9 - Verifica e Validazione [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T09.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T09.pdf)
- T10 - Analisi Statica [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T10.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T10.pdf)
- T11 - Analisi Dinamica [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T11.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T11.pdf)

- **ISO/IEC 9126**: "Software engineering - Product quality - Part 1: Quality model"
- **ISO/IEC 12207**: "Information technology - Software life cycle processes"
- **ISO/IEC 14598**: "Information technology - Software product evaluation"
- **ISO/IEC 25010**: "Systems and software engineering - Systems and software Quality Requirements and Evaluation (SQuaRE) - System and software quality models"

## Qualità di processo

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le attività di supporto necessarie per lo sviluppo di un prodotto software.

### Processi primari

| Metrica | Nome                           | Descrizione                                                | Obiettivo                                           | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------- | ------------------ | ------------------- |
| MPCR01  | **Planned Value**              | Valore del lavoro pianificato fino a una data specifica    | Comparare il progresso pianificato con quello reale | ≤ Budget previsto  | < Budget previsto   |
| MPCR02  | **Actual Cost**                | Costo effettivo sostenuto per il lavoro svolto             | Controllare le spese del progetto                   | ≤ Budget previsto  | < Budget previsto   |
| MPCR03  | **Earned Value**               | Valore del lavoro effettivamente svolto                    | Monitorare l'avanzamento economico del progetto     | ≥ Actual Cost      | -                   |
| MPCR04  | **Schedule Variance**          | Differenza tra il valore acquisito e il valore pianificato | Valutare l'aderenza ai tempi di progetto            | ≥ -5%              | ≥ 0%                |
| MPCR05  | **Cost Variance**              | Differenza tra il valore acquisito e il costo effettivo    | Valutare l'efficienza economica del progetto        | ≥ -5%              | ≥ 0%                |
| MPCR06  | **Schedule Performance Index** | Rapporto tra il valore acquisito e il valore pianificato   | Misurare l'efficienza temporale                     | ≥ 0.95             | ≥ 1.0               |
| MPCR07  | **Cost Performance Index**     | Rapporto tra il valore acquisito e il costo effettivo      | Misurare l'efficienza dei costi                     | ≥ 0.95             | ≥ 1.0               |

Table: Metriche per i processi primari

#### Planned value

**Metrica**: MPCR01

**Formula**: $\text{Planned Value} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Budget preventivo}_i)$

- Rappresenta il budget autorizzato assegnato al lavoro pianificato.
- Indica quanto lavoro dovrebbe essere stato completato ad una determinata data.

---

#### Actual cost

**Metrica**: MPCR02

**Formula:**: $\text{Actual Cost} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Budget Consuntivo}_i)$

- Somma di tutti i costi realmente sostenuti per il lavoro completato fino ad oggi.
- Indica l'effettivo costo per lo svolgimento delle attività.

---

#### Earned value

**Metrica**: MPCR03

**Formula:** $\text{Earned Value} = \text{Planned Value} \times \frac{\text{Actual Story Points}}{\text{Planned Story Points}}$

- Il valore del lavoro effettivamente completato, calcolato moltiplicando la percentuale di completamento (data dalla divisione dei Story Points effettivi e quelli preventivati) per il suo budget pianificato.
- Rappresenta quanto valore è stato prodotto in base al lavoro effettivamente svolto.

---

#### Schedule variance

**Metrica**: MPCR04

**Formula**: $\text{Schedule Variance} = \text{Earned Value} - \text{Planned Value}$

- Misura la differenza tra il lavoro completato e quello pianificato.
- Un valore positivo indica che il progetto è in anticipo sulla schedulazione.

---

#### Cost variance

**Metrica**: MPR05

**Formula**: $\text{Cost Variance} = \text{Earned Value} - \text{Actual Cost}$

- Misura la differenza tra il valore del lavoro completato e il suo costo effettivo.
- Un valore positivo indica che il progetto sta spendendo meno del previsto.

---

#### Schedule performance index

**Metrica**: MPCR06

**Formula**: $\text{Schedule Performance Index} = \dfrac{\text{Earned Value}}{\text{Planned Value}}$

- Indica l'efficienza nel rispetto dei tempi pianificati.
- Un valore maggiore di 1 indica che il progetto sta procedendo più velocemente del previsto.

---

#### Cost performance index

**Metrica**: MPCR07

**Formula**: $\text{Cost Performance Index} = \dfrac{\text{Earned Value}}{\text{Actual Cost}}$

- Indica l'efficienza nell'utilizzo delle risorse.
- Un valore maggiore di 1 indica che si sta spendendo meno del previsto per il lavoro completato.

### Processi di supporto

| Metrica | Nome                       | Descrizione                                        | Obiettivo                                                       | Valore Accettabile         | Valore Desiderabile          |
| ------- | -------------------------- | -------------------------------------------------- | --------------------------------------------------------------- | -------------------------- | ---------------------------- |
| MPCS01  | **Budget At Completion**   | Totale del budget allocato per il progetto         | Gestire e controllare le risorse finanziarie complessive        | ≤ +10% del budget iniziale | Corrispondente al preventivo |
| MPCS02  | **Estimate At Completion** | Stima dei costi per il completamento del progetto  | Prevedere i costi rimanenti e pianificare le risorse necessarie | ≤ Budget At Completion     | Corrispondente al preventivo |
| MPCS03  | **Estimate To Complete**   | Costo stimato per completare le attività rimanenti | Supportare la pianificazione finanziaria e delle risorse        | ≤ Budget At Completion     | ≤ Estimate At Completion     |
| MPCS04  | **Indice Gulpease**        | Indice di leggibilità dei documenti                | Garantire la comprensibilità della documentazione               | ≥ 40                       | ≥ 60                         |

Table: Metriche per i processi di supporto

#### Budget ct completion

**Metrica**: MPCS01

**Formula**: $\text{Budget At Completion} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Planned Cost}_i)$

- Rappresenta il budget totale autorizzato per il progetto
- Serve come baseline per valutare le performance di costo
- Include tutte le riserve di contingenza allocate

---

#### Estimate to complete

**Metrica**: MPCS02

**Formula**: $\text{Estimate To Complete} = \dfrac{\text{Budget At Completion} - \text{Actual Cost}}{\text{Schedule Performance Index}}$

- Stima dei costi necessari per terminare il progetto
- Tiene conto dell'efficienza attuale del progetto attraverso il SPI
- Permette di pianificare le risorse necessarie per il completamento

---

#### Estimate at completion

**Metrica**: MPCS03

**Formula**: $\text{Estimate At Completion} = \text{Actual Cost } + \text{Estimate To Complete}$

- Stima del costo totale del progetto
- Combina i costi già sostenuti (AC) con la stima dei costi rimanenti (ETC)
- Utile per prevedere il budget finale e identificare potenziali sforamenti

---

#### Indice gulpease

**Metrica**: MPCS04

**Formula**: $\text{Indice Gulpease} = 89 + \dfrac{300 \times \text{numero frasi} - 10 \times \text{numero lettere}}{\text{numero parole}}$

- Misura la leggibilità dei documenti in italiano
- Scala da 0 (minima leggibilità) a 100 (massima leggibilità)
- Valori ottimali variano in base al livello di istruzione del target:
  - 40-50 per testi tecnici
  - \>60 per documenti destinati a un pubblico generale

### Processi Organizzativi

| Metrica | Nome                        | Descrizione                                                   | Obiettivo                                                  | Valore Accettabile | Valore Desiderabile |
| ------- | --------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ------------------ | ------------------- |
| MPCO01  | **Rischi non preventivati** | Numero di rischi emersi non pianificati inizialmente          | Identificare e gestire tempestivamente nuovi rischi        | ≤ 3                | 0                   |
| MPCO02  | **Errori ortografici**      | Numero di errori ortografici individuati in ciascun documento | Garantire la qualità e l'affidabilità della documentazione | ≤20                | 0                   |

Table: Metriche per i processi organizzativi

#### Rischi non preventivati

**Metrica**: MPCO01

**Formula**: $\text{Rischi non preventivati} = \text{Numero totale rischi emersi} - \text{Numero rischi previsti}$

- Monitora l'efficacia del processo di risk management
- Aiuta a valutare la completezza dell'analisi dei rischi iniziale
- Un numero elevato può indicare la necessità di migliorare il processo di identificazione dei rischi

---

#### Errori ortografici

**Metrica**: MPCO02

**Formula**: $\text{Errori ortografici} =  \sum {\text{Errori individuati in ciascun documento}}$

- Misura la qualità complessiva della documentazione prodotta
- Include errori di forma, contenuto e conformità agli standard
- Importante per garantire la comunicazione efficace e la manutenibilità del progetto
- Gli errori vengono identificati durante le revisioni e le verifiche formali per poi essere corretti

## Qualità di prodotto

Per garantire la qualità del prodotto, il team adotta il modello di riferimento ISO/IEC 9126, che definisce un modello di qualità del software basato su sei caratteristiche fondamentali: funzionalità, affidabilità, usabilità, efficienza, manutenibilità e portabilità.

### Funzionalità

| Metrica | Nome                   | Descrizione                                      | Obiettivo                         | Valore Accettabile | Valore Desiderabile |
| ------- | ---------------------- | ------------------------------------------------ | --------------------------------- | ------------------ | ------------------- |
| MPRF01  | Requisiti Obbligatori  | Percentuale soddisfazione requisiti obbligatori  | Garantire funzionalità essenziali | 100%               | 100%                |
| MPRF02  | Requisiti Desiderabili | Percentuale soddisfazione requisiti desiderabili | Fornire funzionalità aggiuntive   | ≥ 0%               | ≥ 80%               |
| MPRF03  | Requisiti Opzionali    | Percentuale soddisfazione requisiti opzionali    | Implementare funzionalità extra   | ≥ 0%               | ≥ 50%               |

Table: Metriche di funzionalità per la qualità di prodotto

### Affidabilità

| Metrica | Nome               | Descrizione                                 | Obiettivo                   | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------ | ------------------------------------------- | --------------------------- | ------------------ | ------------------- |
| MPRA01  | Statement Coverage | Copertura dei test per gli statement        | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA02  | Branch Coverage    | Copertura dei test per i branch del codice  | Garantire test completi     | ≥ 80%              | ≥ 90%               |
| MPRA03  | Condition Coverage | Copertura dei test le condition             | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA04  | Gestione Errori    | Percentuale di errori gestiti correttamente | Garantire robustezza        | ≥ 80%              | ≥ 90%               |

Table: Metriche di affidabilità per la qualità di prodotto

### Usabilità

| Metrica | Nome               | Descrizione                                   | Obiettivo            | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------ | --------------------------------------------- | -------------------- | ------------------ | ------------------- |
| MPRU01  | Tempo di Risposta  | Tempo medio di risposta del modello           | Garantire reattività | ≤ 10s              | ≤ 5s                |
| MPRU02  | Errori Utente      | Tasso di errori utente per operazione         | Minimizzare errori   | ≤ 10%              | ≤ 5%                |
| MPRU03  | Prevenzione Errori | Percentuale di azioni utente errate prevenute | Proteggere da errori | ≥ 80%              | ≥ 90%               |

Table: Metriche di usabilità per la qualità di prodotto

### Efficienza

| Metrica | Nome                 | Descrizione                           | Obiettivo             | Valore Accettabile | Valore Desiderabile |
| ------- | -------------------- | ------------------------------------- | --------------------- | ------------------ | ------------------- |
| MPRE01  | Profondità Gerarchie | Livelli di profondità delle gerarchie | Ottimizzare struttura | ≤ 7                | ≤ 5                 |
| MPRE02  | Utilizzo Risorse     | Consumo medio CPU/memoria             | Minimizzare risorse   | ≤ 30%              | ≤ 20%               |
| MPRE03  | Capacità             | Numero massimo di requisiti gestibili | Garantire scalabilità | ≥ 50               | ≥ 100               |

Table: Metriche di efficienza per la qualità di prodotto

### Manutenibilità

| Metrica | Nome        | Descrizione                              | Obiettivo            | Valore Accettabile | Valore Desiderabile |
| ------- | ----------- | ---------------------------------------- | -------------------- | ------------------ | ------------------- |
| MPRM01  | Modularità  | Grado di accoppiamento tra moduli        | Ridurre dipendenze   | ≤ 0.5              | ≤ 0.3               |
| MPRM02  | Riusabilità | Percentuale di componenti riutilizzabili | Promuovere riuso     | ≥ 50%              | ≥ 70%               |
| MPRM03  | Complessità | Complessità ciclomatica media per modulo | Mantenere semplicità | ≤ 10               | ≤ 7                 |
| MPRM04  | Testabilità | Percentuale di codice coperto da test    | Facilitare testing   | ≥ 70%              | ≥ 85%               |

Table: Metriche di manutenibilità per la qualità di prodotto

### Portabilità

| Metrica | Nome           | Descrizione                        | Obiettivo              | Valore Accettabile | Valore Desiderabile |
| ------- | -------------- | ---------------------------------- | ---------------------- | ------------------ | ------------------- |
| MPRP01  | Adattabilità   | Effort per cambio ambiente (ore)   | Facilitare portabilità | ≤ 2h               | ≤ 1h                |
| MPRP02  | Installabilità | Tempo medio di installazione       | Semplificare setup     | ≤ 15min            | ≤ 5min              |
| MPRP03  | Sostituibilità | Effort per sostituire impostazioni | Facilitare modifiche   | ≤ 10m              | ≤ 5min              |

Table: Metriche di portabilità per la qualità di prodotto

## Specifica dei test

I test di verifica e validazione vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.

### Test di sistema

| ID   | Descrizione                                                                                                              | ID Requisito        | Stato        |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------------ |
| TS01 | Verifica che l'utente possa scegliere il modello %%LLM|llm%% per generare il codice                                              | RFO_1              | Superato |
| TS02 | Verifica che l'utente possa scegliere il modello %%LLM|llm%% per l'embedding                                                     | RFO_2              | Superato |
| TS03 | Verifica che l'utente possa scegliere un modello custom per generare codice anche indicando il nome di uno già installato nel suo dispositivo | RFD_3              | Superato |
| TS04 | Verifica che l'utente possa scegliere un modello custom per l'embedding anche indicando il nome di uno già installato nel suo dispositivo | RFD_4              | Superato |
| TS05 | Verifica che l'utente possa scegliere uno dei modelli proposti per generare codice                                       | RFO_5              | Superato |
| TS06 | Verifica che l'utente possa scegliere uno dei modelli proposti per l'embedding                                           | RFO_6              | Superato |
| TS07 | Verifica che l'utente possa impostare la temperature del modello per generare codice inserendo un valore decimale compreso tra 0 e 1 | RFD_7              | Superato |
| TS08 | Verifica che l'utente possa inserire un Bearer Token per usare %%Ollama|ollama%% in un server esterno                               | RFP_8              | Superato |
| TS09 | Verifica che l'utente possa inserire un endpoint specifico a cui indirizzare le richieste di %%Ollama|ollama%%                      | RFP_9              | Superato |
| TS10 | Verifica che l'utente possa impostare il numero massimo di risultati da ottenere per ogni ricerca                        | RFP_10             | Superato |
| TS11 | Verifica che l'utente possa specificare il %%prompt|prompting%% per la richiesta al modello di generazione del codice                  | RFP_11             | Superato |
| TS12 | Verifica che l'%%Applicativo|applicativo%% restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se %%Ollama|ollama%% non risulta installato all'endpoint indicato | RFO_12             | Superato |
| TS13 | Verifica che l'%%Applicativo|applicativo%% restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se l'endpoint indicato non è raggiungibile | RFO_13             | Superato |
| TS14 | Verifica che l'%%Applicativo|applicativo%% restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il modello, scelto tra quelli proposti o custom, non è installato nel dispositivo | RFO_14             | Superato |
| TS15 | Verifica che l'%%Applicativo|applicativo%% restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il modello custom indicato non esiste | RFO_15             | Superato |
| TS16 | Verifica che l'%%Applicativo|applicativo%% restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il bearer token indicato fallisce l'autenticazione e non viene autorizzato al collegamento con il server esterno | RFP_16             | Superato |
| TS17 | Verifica che l'utente, tramite l'interfaccia grafica, possa indicare la cartella del progetto software                   | RFO_17             | Superato |
| TS18 | Verifica che l'utente, tramite l'interfaccia grafica, possa indicare il file con presente la lista dei %%requisiti|requisito_software%%         | RFO_18             | Superato |
| TS19 | Verifica che l'utente, tramite l'interfaccia grafica, possa effettuare una selezione dei %%requisiti|requisito_software%% da analizzare         | RFD_19             | Superato |
| TS20 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per selezionare quali %%requisiti|requisito_software%% ricercare nel codice e quali ignorare | RFD_20             | Superato |
| TS21 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali cartelle includere o escludere nella ricerca del codice | RFD_21             | Superato |
| TS22 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali file includere o escludere nella ricerca del codice | RFD_22             | Superato |
| TS23 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali estensioni di file includere o escludere nella ricerca del codice | RFD_23             | Superato |
| TS24 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare un file nel quale ricercare l'implementazione di un preciso %%requisito|requisito_software%% | RFD_24             | Superato |
| TS25 | Verifica che l'utente, tramite l'interfaccia grafica, possa selezionare una porzione di codice sulla quale eseguire nuovamente la ricerca | RFD_25             | Superato |
| TS26 | Verifica che l'utente, tramite l'interfaccia grafica, possa effettuare una nuova ricerca su tutto il codice              | RFO_26             | Superato |

Table: Test di sistema parte 1

| ID   | Descrizione                                                                                                              | ID Requisito        | Stato        |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- | ------------ |
| TS27 | Verifica che l'utente, tramite l'interfaccia grafica, possa visualizzare la porzione di codice che implementa un %%requisito|requisito_software%% tramite il puntatore indicato nella tabella che lo riporta al file | RFO_27             | Superato |
| TS28 | Verifica che l'%%Applicativo|applicativo%% effettui il parsing del documento dei %%requisiti|requisito_software%%                                               | RFO_28             | Superato |
| TS29 | Verifica che l'%%Applicativo|applicativo%% generi una struttura dati a partire dal parsing del documento dei %%requisiti|requisito_software%%                   | RFO_29             | Superato |
| TS30 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se il parsing non è andato a buon fine a causa del formato file scorretto | RFO_30             | Superato |
| TS31 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se il parsing non è andato a buon fine a causa del formato non supportato | RFO_31             | Superato |
| TS32 | Verifica che la struttura dati memorizzi per ogni %%requisito|requisito_software%%: codice identificativo, testo del %%requisito|requisito_software%%, stato di implementazione (implementato o non implementato) e il puntatore al frammento di codice (funzione o parte di essa) dove presume sia implementato | RFO_32             | Superato |
| TS33 | Verifica che l'%%Applicativo|applicativo%% per ogni %%requisito|requisito_software%% applichi il filtro corrispondente, se presente                              | RFD_33             | Superato |
| TS34 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se i filtri indicati dall'utente non sono applicabili           | RFD_34             | Non implementato |
| TS35 | Verifica che l'%%Applicativo|applicativo%%, per ogni %%requisito|requisito_software%% selezionato, produca il codice corrispondente interrogando il modello selezionato per la generazione del codice | RFO_35             | Superato |
| TS36 | Verifica che l'%%Applicativo|applicativo%% effettui, per ogni %%requisito|requisito_software%% selezionato, il pattern matching tra il codice generato e il codice del progetto utilizzando il modello selezionato | RFO_36             | Superato |
| TS37 | Verifica che l'%%Applicativo|applicativo%% invalidi i %%requisiti|requisito_software%% associati a un file che ha subito modifiche in seguito alla ricerca      | RFD_37             | Non implementato |
| TS38 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se una o più richieste ai modelli sono fallite                  | RFO_38             | Superato |
| TS39 | Verifica che l'%%Applicativo|applicativo%%, alla fine dell'esecuzione, aggiorni la struttura dati, modificando lo stato di implementazione e il puntatore al codice | RFO_39             | Superato |
| TS40 | Verifica che l'%%Applicativo|applicativo%% fornisca un chatbot per porre domande al modello di generazione del codice                    | RFP_40             | Superato |
| TS41 | Verifica che l'%%Applicativo|applicativo%% fornisca un'interfaccia grafica per la visualizzazione della struttura dati in forma tabellare e che per ogni %%requisito|requisito_software%% vengano mostrati: sigla identificativa, descrizione testuale, puntatore alla porzione di codice, stato di implementazione e stato di approvazione | RFO_41             | Superato |
| TS42 | Verifica che l'interfaccia grafica per la visualizzazione della struttura dati permetta di selezionare o escludere un %%requisito|requisito_software%% | RFD_42             | Superato |
| TS43 | Verifica che la struttura dati sia esportabile in formato .csv e memorizzi l'hash code della commit per il %%versionamento|versionamento%% | RFP_43             | Non implementato |
| TS44 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se la struttura dati non è leggibile se il file risulta cancellato | RFO_44             | Superato |
| TS45 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se la struttura dati non è leggibile se il file risulta corrotto | RFO_45             | Superato |
| TS46 | Verifica che l'%%Applicativo|applicativo%% richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa approvare la proposta | RFP_46             | Superato |
| TS47 | Verifica che l'%%Applicativo|applicativo%% richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa scartare la proposta | RFP_47             | Superato |
| TS48 | Verifica che l'%%Applicativo|applicativo%% richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa modificare il puntatore alla porzione di codice | RFP_48             | Superato |
| TS49 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se la porzione di codice che implementa un %%requisito|requisito_software%% non è raggiungibile se il puntatore è scorretto | RFO_49             | Superato |
| TS50 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se la porzione di codice che implementa un %%requisito|requisito_software%% non è raggiungibile se il file è stato cancellato | RFO_50             | Superato |
| TS51 | Verifica che l'%%Applicativo|applicativo%% generi una notifica di errore se la porzione di codice che implementa un %%requisito|requisito_software%% non è raggiungibile se il file è corrotto | RFO_51             | Superato |
| TS52 | Verifica che l'%%Applicativo|applicativo%% possa eseguire un controllo di implementazione specifico su un %%requisito|requisito_software%% interrogando %%Ollama|ollama%%  | RFO_52             | Superato |

Table: Test di sistema parte 2

### Test di accettazione

| ID   | Descrizione                                      | ID Requisito | Stato            |
| ---- | ------------------------------------------------ | ------------ | ---------------- |
| TA01 | Verifica funzionalità come estensione in VS Code | RTO_1        | Non Implementato |
| TA02 | Verifica esecuzione locale dell'applicativo      | RTO_2        | Non Implementato |
| TA03 | Verifica integrazione con Ollama                 | RTO_3,4      | Non Implementato |
| TA04 | Verifica analisi di codice in linguaggio C/C++   | RTO_5        | Non Implementato |
| TA05 | Verifica analisi di codice in linguaggio Rust    | RTP_6        | Non Implementato |
| TA06 | Verifica supporto formato file requisiti .csv    | RTO_7        | Non Implementato |
| TA07 | Verifica supporto formato file requisiti .reqif  | RTP_8        | Non Implementato |
| TA08 | Verifica usabilità interfaccia grafica           | RFO_14,15    | Non Implementato |

Table: Test di accettazione

## Cruscotto di valutazione

### Indice gulpease

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1654995613&amp;format=interactive" data-image="ig.png" data-title="Indice Gulpease"></iframe>

#### RTB

Possiamo osservare che i valori riportati sono rimasti stabili durante questa prima fase di sviluppo. Tutti i documenti risultano, infatti, comprensibili ad utenti con una licenza media. Durante la prossima fase cercheremo di migliorare la leggibilità dei documenti per superare il valore ottimo.

### Errori ortografici

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1466111038&amp;format=interactive" data-image="eo.png" data-title="Errori Ortografici"></iframe>

#### RTB

Possiamo osservare che il numero di errori è stato minimizzato tramite l'utilizzo di "SpellCheck": un'estensione che permette di individuare gli errori ortografici all'interno dei documenti.

### Earned calue, planned value & actual cost

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1002546531&amp;format=interactive" data-image="ev-pv-ac.png" data-title="Earned Value, Planned Value e Actual Cost"></iframe>

#### RTB

Possiamo osservare che, nonostatnte un iniziale sovrastima del carico di lavoro completabile, il progetto risulta al passo con la pianificazione iniziale. Questo è stato possibile attraverso uno %%sprint|sprint%% di recupero durante il quale il gruppo si è concentrato sul completamento delle attività rimaste in arretrato.

### Estimate to complete & estimate at completion

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=840721179&amp;format=interactive" data-image="etc-eac.png" data-title="Estimate to Complete e Estimate at Completion"></iframe>

#### RTB

Possiamo osservare che, nonostante una iniziale crescita delle stime di completamento, il grafico risulta stabile ed in linea con la pianificazione. La crescita iniziale è dovuta ad un rallentamento nel processo di sviluppo osservabile nel grafico [Schedule Variance](#schedule-variance--cost-variance).

### Schedule variance & cost variance

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1247587591&amp;format=interactive" data-image="sv-cv.png" data-title="Schedule Variance e Cost Variance"></iframe>

#### RTB

Possiamo osservare che durante gli %%sprint|sprint%% 2, 3 e 4 il gruppo ha sovrastimato la quantità di lavoro completabile vista la presenza della pausa invernale e della sessione d'esami. Il lavoro è stato recuperato negli sprint successivi riportando lo stato di avanzamento del progetto in linea con la pianificazione iniziale.

### Schedule performance index & cost performance index

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=467291162&amp;format=interactive" data-image="spi-cpi.png" data-title="Schedule Performance Index e Cost Performance Index"></iframe>

#### RTB

Possiamo osservare che durante gli %%sprint|sprint%% 2, 3 e 4 il valore del SPI non rispettava la soglia minima. Questo è dovuto ad un rallentamento nel processo di sviluppo causato dalla presenza della pausa invernale e della sessione d'esami. Grazie ad uno %%sprint|sprint di recupero il valore di questa metrica ha superato la soglia di accettazione.

### Rischi non preventivati

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=13872230&amp;format=interactive" data-image="rnp.png" data-title="Rischi non preventivati"></iframe>

#### RTB

Possiamo osservare che, allo stato attuale del progetto, non sono stati individuati rischi non previsti. Il gruppo è stato quindi in grado di gestire il progetto in maniera efficiace mitigando la comparse di nuovi rischi non preventivati.

### Requisiti obbligatori

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=550686990&amp;format=interactive" data-image="ro.png" data-title="Requisiti Obbligatori"></iframe>

### Requisiti desiderabili

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=99639478&amp;format=interactive" data-image="rd.png" data-title="Requisiti Desiderabili"></iframe>

### Requisiti opzionali

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1136804738&amp;format=interactive" data-image="rop.png" data-title="Requisiti Opzionali"></iframe>

### Branch coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1042212840&amp;format=interactive" data-image="bc.png" data-title="Branch Coverage"></iframe>

### Statement coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=959844727&amp;format=interactive" data-image="sc.png" data-title="Statement Coverage"></iframe>

### Condition coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1162915206&amp;format=interactive" data-image="cc.png" data-title="Condition Coverage"></iframe>

## Valutazione di miglioramento

L'adozione di un processo di valutazione di miglioramento continuo permette di monitorare sistematicamente l'efficacia e l'efficienza dei processi organizzativi e di sviluppo. Questo approccio favorisce l'identificazione tempestiva di criticità e opportunità di ottimizzazione, contribuendo a:

- Incrementare la qualità dei processi e del prodotto finale.
- Ridurre i costi attraverso azioni correttive mirate.
- Promuovere un ambiente di lavoro orientato alla crescita costante.
- Supportare il processo decisionale con dati oggettivi e misurabili.

### Valutazione sull'organizzazione

| Problema                | Descrizione                                                                                                         | Gravità | Soluzione                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Rotazione dei ruoli     | Difficoltà nel mantenere una rotazione efficace dei ruoli tra i membri del team, con squilibri nel carico di lavoro | Media   | Adottare un sistema di rotazione per ricoprire ruoli differenti ad ogni sprint, permettendo così l'acquisizione di competenze trasversali |
| Coordinamento asincrono | Sfide nella comunicazione e nel coordinamento quando i membri lavorano in momenti diversi                           | Alta    | Adottare strumenti di collaborazione asincrona e stabilire procedure chiare per la documentazione delle attività                          |

Table: Valutazione organizzazione

### Valutazione sui ruoli

| Problema     | Descrizione                                                                                                      | Gravità | Soluzione                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| Analista     | Difficoltà nell'identificazione e documentazione corretta dei requisiti di sistema                               | Media   | Si è deciso di porre maggiore attenzione alla fase di analisi attraverso revisioni più frequenti |
| Verificatore | Criticità nell'esecuzione delle verifiche formali, con conseguente necessità di multiple iterazioni di revisione | Bassa   | Implementato un processo di verifica più approfondito in sviluppo e rilascio                     |

Table: Valutazione sui ruoli

### Valutazione sugli strumenti e le tecnologie utilizzate

| Problema    | Descrizione                                                                                            | Gravità | Soluzione                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------- |
| Typescript  | La maggior parte dei membri del gruppo non è ancora familiare con questo linguaggio di programmazione. | Bassa   | Ogni membro ha seguito autonomamente un breve tutorial per acquisire le nozioni di base.       |
| API VS Code | La maggior parte dei membri del gruppo non conosce a fondo l'integrazione delle API in VS Code.        | Media   | Fornire documentazione dedicata e workshop per supportare l’integrazione delle API in VS Code. |

Table: Valutazione delle tecnologie

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
