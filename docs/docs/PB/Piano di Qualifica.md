---
id: piano_di_qualifica
title: "Piano di Qualifica - v1.8.0"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.8.0
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
| 10/04/2025 | 1.8.0    | Aggiunta test di unità                   | Carraro Agnese        |
| 30/03/2025 | 1.7.4    | Controllo consistenza maiuscole          | Dal Bianco Riccardo   | 30/03/2025    | Vasquez Manuel Felipe |
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

### Test di unità

| ID   | Descrizione                                                                                                                                                                        | Stato        |
|------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| TU01 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *resetDatabase* resetti il database rimuovendo e ricreando la directory                                                   | Superato |
| TU02 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *resetDatabase* gestisca correttamente i casi di errore                                                                   | Superato |
| TU03 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *fileExists* ritorni true se il file esiste                                                                               | Superato |
| TU04 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *fileExists* ritorni true se il file esiste con una checksum corrispondente                                               | Superato |
| TU05 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *fileExists* ritorni false se il file esiste con una checksum non corrispondente                                          | Superato |
| TU06 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *fileExists* gestisca correttamente errori nel database                                                                   | Superato |
| TU07 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addFiles* gestisca correttamente il caso in cui viene chiamata senza files                                               | Superato |
| TU08 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addFiles* aggiunga i files al database                                                                                   | Superato |
| TU09 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addFiles* non aggiunga il file al database se è già presente                                                             | Superato |
| TU10 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addFiles* elimini un file già esistente se la checksum non è corrispondente                                              | Superato |
| TU11 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addFiles* gestisca correttamente i casi di errore durante l'aggiunta dei files                                           | Superato |
| TU12 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addRequirements* gestisca correttamente il caso in cui viene chiamata senza requisiti                                    | Superato |
| TU13 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addRequirements* aggiunga i requisiti al database                                                                        | Superato |
| TU14 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addRequirements* gestisca correttamente i casi di errore durante l'aggiunta dei requisiti                                | Superato |
| TU15 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addChunks* gestisca correttamente il caso in cui viene chiamata senza chunks                                             | Superato |
| TU16 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addChunks* aggiunga i chunk al database                                                                                  | Superato |
| TU17 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *addChunks* gestisca correttamente i casi di errore durante l'aggiunta dei chunk                                          | Superato |  
| TU18 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForFiles* interroghi i files in base a un termine di ricerca                                                        | Superato |
| TU19 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForFiles* gestisca correttamente i casi di errore durante l'interrogazione dei files                                | Superato |
| TU20 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForRequirements* interroghi i requisiti in base a un termine di ricerca                                             | Superato |
| TU21 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForRequirements* gestisca correttamente i casi di errore durante l'interrogazione dei requisiti                     | Superato |
| TU22 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForChunks* interroghi i chunks in base a un termine di ricerca                                                      | Superato |
| TU23 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *queryForChunks* gestisca correttamente i casi di errore durante l'interrogazione dei chunks                              | Superato |
| TU24 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *getEmbeddings* ritorni gli embeddings correttamente                                                                      | Superato |
| TU25 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *deleteFiles* gestisca correttamente il caso in cui viene chiamata senza files da rimuovere                               | Superato |
| TU26 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *deleteFiles* rimuova i files al database                                                                                 | Superato |
| TU27 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *deleteFiles* gestisca correttamente i casi di errore durante la rimozione dei files                                      | Superato |
| TU28 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *refreshEmbeddings* re-inizializzi gli embeddings correttamente                                                           | Superato |
| TU29 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_initialize* inizializzi la connessione al database e la tabella                                                        | Superato |
| TU30 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_initialize* gestisca il caso in cui il bearer token sia indefinito                                                     | Superato |
| TU31 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_initialize* gestisca i casi di errore durante l'inizializzazione                                                       | Superato |
| TU32 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_determineEmbeddingDimension* determini la dimensione degli embeddings correttamente                                    | Superato |
| TU33 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_determineEmbeddingDimension* ritorni il valore di default se non riesce a incorporare la query                         | Superato |
| TU34 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getDB* ritorni la connessione al database                                                                              | Superato |
| TU35 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getDB* crei la connessione al database se questa non esiste                                                            | Superato |
| TU36 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_tableExists* ritorni true se la tabella esiste                                                                         | Superato |
| TU37 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_tableExists* ritorni false se la tabella non esiste                                                                    | Superato |
| TU38 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_tableExists* gestisca correttamente i casi di errore durante il controllo dell'esistenza della tabella                 | Superato |
| TU39 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getTable* ritorni la tabella se esiste                                                                                 | Superato |
| TU40 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getTable* ritorni un errore se viene fornito un tipo sconnosciuto                                                      | Superato |
| TU41 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getTable* crei una tabella se non esiste                                                                               | Superato |
| TU42 | Verifica, sulla classe *LanceDBAdapter*, che la funzione *_getTable* gestisca correttamente i casi di errore durante il recupero della tabella                                    | Superato |
| TU43 | Verifica, sulla classe *LangChainOllamaAdapter*, che Ollama e gli embedding siano inizializzati con i parametri corretti                                                           | Superato |
| TU44 | Verifica, sulla classe *LangChainOllamaAdapter*, che Ollama e gli embedding siano inizializzati senza il bearer token                                                              | Superato |
| TU45 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *generate* generi la risposta correttamente                                                                       | Superato |
| TU46 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *generate* gestisca correttamente i casi di errore                                                                | Superato |
| TU47 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *generateEmbeddings* generi l'array di embeddings correttamente                                                   | Superato |
| TU48 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *generateEmbeddings* gestisca correttamente i casi di errore                                                      | Superato |
| TU49 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *getEmbeddings* inizializzi correttamente gli embeddings e Ollama                                                 | Superato |
| TU50 | Verifica, sulla classe *LangChainOllamaAdapter*, che la funzione *refreshModels* re-inizializzi Ollama e gli embedding correttamente                                               | Superato |
| TU51 | Verifica, sulla classe *ClearChatHistoryCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                                   | Superato |
| TU52 | Verifica, sulla classe *ClearChatHistoryCommand*, che la funzione *execute* chiami la funzione *clearMessages* della classe *ChatService*                                          | Superato |
| TU53 | Verifica, sulla classe *ClearChatHistoryCommand*, che la funzione *execute* mostri all'utente un messaggio di conferma per la cancellazione la cronologia della chat               | Superato |
| TU54 | Verifica, sulla classe *ClearChatHistoryCommand*, che la funzione *execute* mostri il messeggio di conferma solo dopo che è stata cancellata la cronologia della chat              | Superato |
| TU55 | Verifica, sulla classe *ClearChatHistoryCommand*, che la funzione *execute* gestisca correttamente i casi di errore provenienti dalla classe *ChatService*                         | Superato |
| TU56 | Verifica, sulla classe *ClearRequirementsHistoryCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                           | Superato |
| TU57 | Verifica, sulla classe *ClearRequirementsHistoryCommand*, che la funzione *execute* esegua il comando e apra la sidebar                                                            | Superato |
| TU58 | Verifica, sulla classe *CommandRegistry*, che la funzione *registerCommand* registri un comando e lo aggiunga all'array *subscriptions*                                            | Superato |
| TU59 | Verifica, sulla classe *CommandRegistry*, che la funzione *registerCommands* registri più comandi e gli aggiunga all'array *subscriptions_*                                        | Superato |
| TU60 | Verifica, sulla classe *CommandRegistry*, che la funzione *getCommand* ritorni il comando se esiste                                                                                | Superato |
| TU61 | Verifica, sulla classe *CommandRegistry*, che la funzione *getCommand* ritorni errore se il comando non esiste                                                                     | Superato |
| TU62 | Verifica, sulla classe *CommandRegistry*, che, dopo che un comando è stato registrato, venga chiamata la funzione *execute* quando quel comando viene attivato                     | Superato |
| TU62 | Verifica, sulla classe *InterrogateDocumentCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                                | Superato |
| TU63 | Verifica, sulla classe *InterrogateDocumentCommand*, che la funzione *execute* esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato                     | Superato |
| TU64 | Verifica, sulla classe *InterrogateDocumentCommand*, che la funzione *execute* esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo                         | Superato |
| TU65 | Verifica, sulla classe *InterrogateDocumentCommand*, che la funzione *execute* esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo                      | Superato |
| TU66 | Verifica, sulla classe *InterrogateDocumentCommand*, che la funzione *execute* esegua il comando e invii un messaggio alla chat view                                               | Superato |
| TU67 | Verifica, sulla classe *InterrogateSelectionCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                               | Superato |
| TU68 | Verifica, sulla classe *InterrogateSelectionCommand*, che la funzione *execute* esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato                    | Superato |
| TU69 | Verifica, sulla classe *InterrogateSelectionCommand*, che la funzione *execute esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo                        | Superato |
| TU70 | Verifica, sulla classe *InterrogateSelectionCommand*, che la funzione *execute* esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo                     | Superato |
| TU71 | Verifica, sulla classe *InterrogateSelectionCommand*, che la funzione *execute* esegua il comando e invii un messaggio alla chat view                                              | Superato |
| TU72 | Verifica, sulla classe *OpenSettingsCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                                       | Superato |
| TU73 | Verifica, sulla classe *OpenSettingsCommand*, che la funzione *execute* esegua il comando e apra la sidebar                                                                        | Superato |
| TU74 | Verifica, sulla classe *OpenSidebarCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                                        | Superato |
| TU75 | Verifica, sulla classe *OpenSidebarCommand*, che la funzione *execute* esegua il comando e apra la sidebar                                                                         | Superato |
| TU76 | Verifica, sulla classe *ResetDatabaseCommand*, che la funzione *getName* ritorni il nome corretto del comando                                                                      | Superato |
| TU77 | Verifica, sulla classe *ResetDatabaseCommand*, che la funzione *execute* esegua il comando e resetti il database                                                                   | Superato |
| TU78 | Verifica, sulla classe *ResetDatabaseCommand*, che la funzione *execute* non resetti il database se l'utente sceglie l'opzione "No"                                                | Superato |
| TU79 | Verifica, sulla classe *ResetDatabaseCommand*, che la funzione *execute* gestisca correttamente i casi di errore mentre resetta il database                                        | Superato |
| TU80 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *GetInstance* ritorni un errore se l'istanza non è inizializzata                                                     | Superato |
| TU81 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *Init* ritorni un errore per ogni chiave quando il valore di configurazione è indefinito                             | Superato |
| TU82 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *Init* abbia inizializzato una configServiceFacade                                                                   | Superato |
| TU83 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *GetInstance* ritorni un'istanza di configServiceFacade                                                              | Superato |
| TU84 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *sync* sincronizzi la configurazione del ConfigService con la configurazione del ConfigServiceFacade                 | Superato |
| TU85 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getOllamaModel* ritorni il nome corretto del modello di Ollama                                                      | Superato |
| TU86 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getEmbeddingModel* ritorni il nome corretto del modello di embedding                                                | Superato |
| TU87 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getMaxResults* ritorni il valore del risultato massimo                                                              | Superato |
| TU88 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getTemperature* ritorni il valore della temperatura                                                                 | Superato |
| TU89 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getEndpoint* ritorni il valore di endpoint                                                                          | Superato |
| TU90 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getBearerToken* ritorni il valore del bearer token                                                                  | Superato |
| TU91 | Verifica, sulla classe *ConfigServiceFacade*, che la funzione *getFilters* ritorni la configurazione dei filtri                                                                    | Superato |
| TU92 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processFiles* salti files già indicizzati                                                                         | Superato |
| TU93 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processFiles* elabori un file valido                                                                              | Superato |
| TU94 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processFiles* salti files più grandi di 20MB                                                                      | Superato |
| TU95 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processFiles* gestisca correttamente i casi di errore durante l'elaborazione dei files                            | Superato |
| TU96 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processWorkspaceFiles* ritorni un errore se nessuna cartella di workspace è aperta                                | Superato |
| TU97 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processWorkspaceFiles* ritorni un warning se non vengono trovati files corrispondenti                             | Superato |
| TU98 | Verifica, sulla classe *DocumentServiceFacade*, che la funzione *processWorkspaceFiles* elabori i files del workspace correttamente                                                | Superato |
| TU99 | Verifica, sulla classe *RequirementsServiceFacade*, che il costruttore inizializzi l'oggetto con i servizi forniti                                                                 | Implementato |
| TU100 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *importRequirements* ritorni un errore se il file dei requisiti non è supportato                               | Implementato |
| TU101 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *importRequirements* importi i requisiti da un file di requisiti csv con un delimitatore indefinito            | Implementato |
| TU102 | Verifica, sulla classe *vRequirementsServiceFacade*, che la funzione *importRequirements* importi i requisiti da un file di requisiti csv con un delimitatore personalizzato        | Implementato |
| TU103 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *importRequirements* importi i requisiti da un file di requisiti requif                                        | Implementato |
| TU104 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *importRequirements* ritorni un messaggio di warning se non sono presenti requisiti nel file                   | Implementato |
| TU105 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *trackRequirements* ritorni il risultato del tracciamento dei requisiti selezionati                            | Implementato |
| TU106 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *trackRequirements* ritorni il risultato del tracciamento di tutti i requisiti                                 | Implementato | 
| TU107 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *trackRequirements* ritorni un errore se è stato trovato nessun requisito da tracciare                         | Implementato |
| TU108 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *getUnimplementedRequirements* ritorni i requisiti non implementati                                            | Implementato |
| TU109 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *getUnimplementedRequirements* ritorni un errore se non sono stati trovati requisiti non implementati          | Implementato |
| TU110 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *getRequirement* ritorni il requisito cercato tramite id                                                       | Implementato |
| TU111 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *getRequirement* ritorni undefined se un requisito non è stato caricato                                        | Implementato |
| TU112 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *getAllRequirements* ritorni tutti i requisiti caricati                                                        | Implementato |
| TU113 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *deleteRequirement* rimuova il requisito specificato                                                           | Implementato |
| TU114 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *clearRequirements* rimuova tutti i requisiti                                                                  | Implementato |
| TU115 | Verifica, sulla classe *RequirementsServiceFacade*, che la funzione *clearRequirements* ritorni un errore se nessun requisito è presente                                           | Implementato |
| TU116 | Verifica che l'enumerazione *COLLECTION_TYPE* abbia i valori corretti                                                                                                             | Superato |
| TU117 | Verifica, sulla classe *ChatWebviewProvider*, che il costruttore inizializzi l'oggetto con il servizio e il URI forniti                                                            | Superato |
| TU118 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *resolveWebviewView* configuri la webview e carichi la cronologia della chat                                         | Superato |
| TU119 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *resolveWebviewView* gestisca correttamente il caso in cui la cronologia della chat sia vuota                        | Superato | 
| TU120 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *_onSendMessage* invii il messaggio dell'utente e riceva la risposta del modello                                    | Superato |
| TU121 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *_onSendMessage* gestisca gli errori del servizio di inferenza                                                      | Superato |
| TU122 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *_onSendMessage* gestisca gli errori sconosciuti                                                                    | Superato |
| TU123 | Verifica, sulla classe *ChatWebviewProvider*, che la funzione *_onClearHistory* cancelli la cronologia della chat                                                                 | Superato |
| TU124 | Verifica, sulla classe *ChatWebviewProvider*, che, quando viene chiamata la funzione *_onDidReceiveMessage* gestisca correttamente il messagio ricevuto                           | Superato |
| TU125 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *resolveWebviewView* configuri la webview e aggiorni la visualizzazione dei requisiti                             | Implementato |
| TU126 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *resolveWebviewView* non invii un messaggio di aggiornamento quando non esistono requisiti                        | Implementato |
| TU127 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di caricamento di un requisito                   | Implementato |
| TU128 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di caricamento di un requisito con opzioni di default | Implementato |
| TU129 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore in messaggi di caricamento di un requisito   | Implementato |
| TU130 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di tracciamento dei requisiti                    | Implementato |
| TU131 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di tipo "showUnimplemented"                      | Implementato |
| TU132 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi in cui il messaggio ha un tipo sconosciuto             | Implementato |
| TU133 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di apertura file                                 | Implementato |
| TU134 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore in messaggi di apertura file                 | Implementato |
| TU135 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di cancellazione dei requisiti                   | Implementato |
| TU136 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore in messaggi di cancellazione dei requisiti   | Implementato |
| TU137 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di modifica dei requisiti                        | Implementato |
| TU138 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente il messaggio di cancellazione di un requisito                 | Implementato |
| TU139 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore in messaggi di cancellazione di un requisito | Implementato |
| TU140 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore                                              | Implementato |
| TU141 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi di errore sconosciuti                                  | Implementato |
| TU142 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* gestisca correttamente i casi in cui gli oggetti vengono lanciati come errori        | Implementato |
| TU143 | Verifica, sulla classe *TrackerWebviewProvider*, che la funzione *_handleMessageFromWebview* venga chiamata correttamente quando viene ricevuto un messaggio                      | Implementato |
| TU144 | Verifica, sulla classe *ChatService*, che la funzione *addMessage* aggiunga correttamente un nuovo messaggio                                                                       | Superato |
| TU145 | Verifica, sulla classe *ChatService*, che la funzione *clearMessages* rimuova tutti i messaggi                                                                                     | Superato |
| TU146 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* ritorni un valore di tipo Config                                                                               | Superato |
| TU147 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* carichi e unisca i valori locali di configurazione                                                             | Superato |
| TU148 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* carichi da una configurazione globale se non è stata trovata una locale                                        | Superato |
| TU149 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* gestisca correttamente valori non validi di configurazione locale                                              | Superato |
| TU150 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* gestisca correttamente file di configurazione locale vuoti o malformati                                        | Superato |
| TU151 | Verifica, sulla classe *ConfigService*, che la funzione *GetConfig* gestisca correttamente il caso in cui il percorso di ricerca sia mancante nei filtri dei requisiti             | Superato |
| TU152 | Verifica, sulla classe *DocumentFormatterService*, che la funzione *formatSourceCode* formatti correttamente il codice sorgente in C o C++                                         | Superato |
| TU153 | Verifica, sulla classe *DocumentFormatterService*, che la funzione *formatSourceCode* formatti correttamente il codice sorgente in Rust                                            | Superato |
| TU154 | Verifica, sulla classe *DocumentFormatterService*, che la funzione *formatSourceCode* gestisca le linee vuote correttamente                                                        | Superato |
| TU155 | Verifica, sulla classe *DocumentFormatterService*, che la funzione *formatSourceCode* gestisca estensioni di file sconosciute come testo                                           | Superato |
| TU156 | Verifica, sulla classe *DocumentFormatterService*, che la funzione *formatSourceCode* gestisca i header files correttamente                                                       | Superato |
| TU157 | Verifica, sulla classe *FileSystemService*, che la funzione *read* legga il file correttamente                                                                                    | Superato |
| TU158 | Verifica, sulla classe *FileSystemService*, che la funzione *read* ritorni un errore se la lettura del file fallisce                                                              | Superato |
| TU159 | Verifica, sulla classe *FileSystemService*, che la funzione *read* ritorni correttamente un checksum per un dato contenuto del file                                               | Superato |
| TU160 | Verifica, sulla classe *FileSystemService*, che la funzione *read* ritorni un errore se il calcolo del chacksum fallisce                                                          | Superato |
| TU161 | Verifica, sulla classe *FilterService*, che il costruttore recuperi i filtri dal servizio di configurazione                                                                       | Superato |
| TU162 | Verifica, sulla classe *FilterService*, che la funzione *getPathFilter* ritorni il path filter correttamente                                                                      | Superato |
| TU163 | Verifica, sulla classe *FilterService*, che la funzione *getFileExtensionFilter* ritorni il filtro dell'estensione correttamente                                                  | Superato |
| TU164 | Verifica, sulla classe *FilterService*, che la funzione *getRequirementsFilters* ritorni il filtro dei requisiti correttamente                                                    | Superato |
| TU165 | Verifica, sulla classe *FilterService*, che la funzione *getRequirementsFilters* ritorni il filtro dei requisiti correttamente                                                    | Superato |
| TU166 | Verifica, sulla classe *FilterService*, che la funzione *getRequirementsFilters* ritorni il un oggetto vuoto nel caso in cui il filtro dei requisiti non esista                   | Superato |
| TU167 | Verifica, sulla classe *GlobalStateService*, che la funzione *updateState* aggiorni lo stato tramite i messaggi della chat                                                        | Superato |
| TU168 | Verifica, sulla classe *GlobalStateService*, che la funzione *updateState* aggiorni lo stato tramite i requisiti                                                                  | Superato |
| TU169 | Verifica, sulla classe *GlobalStateService*, che la funzione *getState* ritorni i messaggi della chat dallo stato globale                                                         | Superato |
| TU170 | Verifica, sulla classe *GlobalStateService*, che la funzione *getState* ritorni un array vuoto se non esiste uno stato                                                            | Superato |
| TU171 | Verifica, sulla classe *GlobalStateService*, che la funzione *clearState* cancelli lo stato rendendolo un array vuoto per default                                                 | Superato |
| TU172 | Verifica, sulla classe *GlobalStateService*, che la funzione *clearState* cancelli lo stato con un valore di reset personalizzato                                                 | Superato |
| TU173 | Verifica, sulla classe *InferenceService*, che la funzione *query* recuperi i files rilevanti e generi una risposta                                                               | Superato |
| TU174 | Verifica, sulla classe *InferenceService*, che la funzione *query* gestisca i casi di errore durante la query correttamente                                                       | Superato |
| TU175 | Verifica, sulla classe *InferenceService*, che la funzione *query* gestisca i casi di errore sconosciuti correttamente                                                            | Superato |
| TU176 | Verifica, sulla classe *InferenceService*, che la funzione *checkSystemRequirements* controlli la connessione al modello di Ollama                                                | Superato |
| TU177 | Verifica, sulla classe *InferenceService*, che la funzione *checkSystemRequirements* gestisca correttamente il caso di errore di connessione                                      | Superato |
| TU178 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un array di requisiti da una stringa csv con tutti i dati e attributi di nome diverso                 | Superato |
| TU179 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un array di requisiti da una stringa csv con dati mancanti                                            | Superato |
| TU180 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un array di requisiti da una stringa csv con id mancante                                              | Superato |
| TU181 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un array vuoto se la stringa è vuota                                                                  | Superato |
| TU182 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un errore se il delimitatore è sbagliato                                                              | Superato |
| TU183 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un errore se mancano dati                                                                             | Superato |
| TU184 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un array di requisiti da una stringa csv con tutti i dati e con un delimitatore predefinito           | Superato |
| TU185 | Verifica, sulla classe *ParsingService*, che la funzione *parseCSV* ritorni un errore se la lunghezza delle linee è minnore di due                                                | Superato |
| TU186 | Verifica, sulla classe *ParsingService*, che la funzione *parseREQIF* ritorni un array di requisiti da una stringa reqif con tutti i dati e attributi di nome diverso             | Superato |
| TU187 | Verifica, sulla classe *ParsingService*, che la funzione *parseREQIF* ritorni un array di requisiti da una stringa reqif con dati mancanti                                        | Superato |
| TU188 | Verifica, sulla classe *ParsingService*, che la funzione *parseREQIF* ritorni un errore se la stringa è vuota                                                                     | Superato |
| TU189 | Verifica, sulla classe *ParsingService*, che la funzione *parseReqIFSpecObject* gestisca correttamente sia un singolo SPEC_OBJECT che un array di SPEC_OBJECTS                    | Superato |
| TU190 | Verifica, sulla classe *ParsingService*, che la funzione *parseReqIFSpecObject* gestisca correttamente variazioni di nomi di attributo in csv                                     | Superato |
| TU191 | Verifica, sulla classe *ParsingService*, che la funzione *parseReqIFSpecObject* gestisca correttamente sia singoli attributi che array di essi                                    | Superato |
| TU192 | Verifica, sulla classe *ParsingService*, che la funzione *parseReqIFSpecObject* gestisca correttamente sia un singolo valore che più valori negli attributi                       | Superato |
| TU193 | Verifica, sulla classe *ParsingService*, che la funzione *parseReqIFSpecObject* gestisca correttamente variazioni di identificativo                                               | Superato |
| TU194 | Verifica, sulla classe *RequirementsService*, che il costruttore inizializzi correttamente i requisiti dallo stato globale                                                        | Implementato |
| TU195 | Verifica, sulla classe *RequirementsService*, che il costruttore gestisca correttamente il caso in cui lo stato globale è vuoto                                                   | Implementato |
| TU196 | Verifica, sulla classe *RequirementsService*, che la funzione *addRequirement* aggiunga il requisito e aggiorni lo stato globale                                                  | Implementato |
| TU197 | Verifica, sulla classe *RequirementsService*, che la funzione *addRequirement* aggiunga una lista di requisiti e aggiorni lo stato globale                                        | Implementato |
| TU198 | Verifica, sulla classe *RequirementsService*, che la funzione *saveRequirements* aggiorni la lista dei requisiti nello stato globale                                              | Implementato |
| TU199 | Verifica, sulla classe *RequirementsService*, che la funzione *getRequirements* recuperi la lista dei requisiti dallo stato globale                                               | Implementato |
| TU200 | Verifica, sulla classe *RequirementsService*, che la funzione *deleteRequirement* rimuova un requisito e aggiorni lo stato globale                                                | Implementato |
| TU201 | Verifica, sulla classe *RequirementsService*, che la funzione *clearRequirements* rimuova tutti i requisiti dalla lista nello stato globale                                       | Implementato |
| TU202 | Verifica, sulla classe *RequirementsService*, che la funzione *getById* recuperi un requisito in base al suo id                                                                   | Implementato |
| TU203 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *trackRequirementImplementation* gestisca correttamente gli errori durante il tracciamento dei requisiti     | Implementato |
| TU204 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *processWorkspaceFiles* gestisca correttamente gli errori durante l'elaborazione dei files                   | Implementato |
| TU205 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *findRelatedCode* ritorni pezzi di codice correlati al requisito                                             | Implementato |
| TU206 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *addRequirement* gestisca correttamente gli errori durante la ricerca di codice correlato                    | Implementato |
| TU207 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_determineImplementationStatus* ritorni "unlikely-match" nel caso di riferimenti vuoti                     | Implementato |
| TU208 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_determineImplementationStatus* ritorni "confirmed-match" nel caso di punteggi alti                        | Implementato |
| TU209 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_determineImplementationStatus* ritorni "possible-match" nel caso di punteggi medi                         | Implementato |
| TU210 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_determineImplementationStatus* ritorni "unlikely-match" nel caso di punteggi bassi                        | Implementato |
| TU211 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *trackAllRequirements* gestisca correttamente gli errori durante il tracciamento                             | Implementato |
| TU212 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *trackAllRequirements* tracci i requisiti e ritorni un riassunto                                             | Implementato |
| TU213 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *trackAllRequirements* copra il caso "possible-match"                                                        | Implementato |
| TU214 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *trackAllRequirements* copra il caso "unlikely-match"                                                        | Implementato |
| TU215 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *processWorkspaceFiles* elabori tutti i files del workspace                                                  | Implementato |
| TU216 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *processWorkspaceFiles* gestisca il caso in cui il workspace non abbia cartelle                              | Implementato |
| TU217 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_findWorkspaceCodeFiles* ritorni un warning se non sono state trovate cartelle nel workspace               | Implementato |
| TU218 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_calculateImplementationScore* calcoli correttamente il punteggio di implementazione                       | Implementato |
| TU219 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_calculateImplementationScore* ritorni zero se i riferimenti sono vuoti                                    | Implementato |
| TU220 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_calculateAverageScore* ritorni zero se il punteggio medio è indefinito                                    | Implementato |
| TU220 | Verifica, sulla classe *RequirementsTrackerService*, che la funzione *_convertToCodeReferences* ordini al contrario                                                              | Implementato |
| TU221 | Verifica, sulla classe *ChatWebView*, che la funzione *getHtmlForWebview* ritorni contenuto in HTML per la webview senza CSS o JavaScript                                         | Superato |
| TU222 | Verifica, sulla classe *ChatWebView*, che la funzione *getHtmlForWebview* ritorni contenuto in HTML per la webview con CSS o JavaScript                                           | Superato |
| TU223 | Verifica, sulla classe *ChatWebView*, che la funzione *getHtmlForWebview* gestica correttamente i casi di errore durante la lettura del file HTML                                 | Superato |
| TU224 | Verifica, sulla classe *ChatWebView*, che la funzione *getNonce* ritorni una stringa di lunghezza 32                                                                              | Superato |
| TU225 | Verifica, sulla classe *ChatWebView*, che la funzione *getNonce* ritorni una stringa di soli caratteri alfanumerici                                                               | Superato |
| TU226 | Verifica, sulla classe *ChatWebView*, che la funzione *getNonce* generi nonces diversi se viene chiamata più volte                                                                | Superato |
| TU227 | Verifica, sulla classe *TrackerWebView*, che la funzione *getHtmlForWebview* ritorni contenuto in HTML per la webview senza CSS o JavaScript                                      | Superato |
| TU228 | Verifica, sulla classe *TrackerWebView*, che la funzione *getHtmlForWebview* ritorni contenuto in HTML per la webview con CSS o JavaScript                                        | Superato |
| TU229 | Verifica, sulla classe *TrackerWebView*, che la funzione *getHtmlForWebview* gestica correttamente i casi di errore durante la lettura del file HTML                              | Superato |
| TU230 | Verifica, sulla classe *TrackerWebView*, che la funzione *getNonce* ritorni una stringa di lunghezza 32                                                                           | Superato |
| TU231 | Verifica, sulla classe *TrackerWebView*, che la funzione *getNonce* ritorni una stringa di soli caratteri alfanumerici                                                            | Superato |
| TU232 | Verifica, sulla classe *TrackerWebView*, che la funzione *getNonce* generi nonces diversi se viene chiamata più volte                                                             | Superato |



             


### Test di sistema

| ID   | Descrizione                                                            | ID Requisito        | Stato            |
| ---- | ---------------------------------------------------------------------- | ------------------- | ---------------- |
| TS01 | Verifica selezione e configurazione dei modelli LLM                    | RFO_1,2,4           | Non Implementato |
| TS02 | Verifica configurazione modelli custom                                 | RFD_3               | Non Implementato |
| TS03 | Verifica configurazione temperature                                    | RFD_5               | Non Implementato |
| TS04 | Verifica gestione Bearer Token per server Ollama esterno               | RFP_6               | Non Implementato |
| TS05 | Verifica gestione errori input utente                                  | RFO_7               | Non Implementato |
| TS06 | Verifica selezione cartella progetto e file requisiti                  | RFO_8,9             | Non Implementato |
| TS07 | Verifica funzionalità di selezione e filtro                            | RFD_10,11,12,RFO_13 | Non Implementato |
| TS08 | Verifica visualizzazione porzione di codice per requisito implementato | RFO_14              | Non Implementato |
| TS09 | Verifica parsing documento requisiti                                   | RFO_15              | Non Implementato |
| TS10 | Verifica embedding dei documenti                                       | RFO_16              | Non Implementato |
| TS11 | Verifica gestione errori parsing                                       | RFO_17              | Non Implementato |
| TS12 | Verifica generazione struttura dati sui requisiti                      | RFO_18              | Non Implementato |
| TS13 | Verifica applicazione filtro sui requisiti                             | RFO_19              | Non Implementato |
| TS14 | Verifica gestione errori sull'applicazione dei filtri sui requisiti    | RFO_20              | Non Implementato |
| TS15 | Verifica generazione codice e analisi da parte del modello LLM         | RFO_21,22           | Non Implementato |
| TS16 | Verifica gestione errori modelli LLM                                   | RFO_23              | Non Implementato |
| TS17 | Verifica aggiornamento dello stato dei requisiti e struttura dati      | RFO_24              | Non Implementato |
| TS18 | Verifica interfaccia visualizzazione risultati                         | RFO_25              | Non Implementato |
| TS19 | Verifica gestione errori generazione codice e analisi                  | RFO_26,28           | Non Implementato |
| TS20 | Verifica funzionalità di feedback sulla certezza della risposta        | RFP_27,29           | Non Implementato |

Table: Test di sistema

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
