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
| TU01 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _resetDatabase_ resetti il database rimuovendo e ricreando la directory                                                   | Superato |
| TU02 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _resetDatabase_ gestisca correttamente i casi di errore                                                                   | Superato |
| TU03 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni true se il file esiste                                                                               | Superato |
| TU04 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni true se il file esiste con una checksum corrispondente                                               | Superato |
| TU05 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni false se il file esiste con una checksum non corrispondente                                          | Superato |
| TU06 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ gestisca correttamente errori nel database                                                                   | Superato |
| TU07 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ gestisca correttamente il caso in cui viene chiamata senza files                                               | Superato |
| TU08 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ aggiunga i files al database                                                                                   | Superato |
| TU09 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ non aggiunga il file al database se è già presente                                                             | Superato |
| TU10 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ elimini un file già esistente se la checksum non è corrispondente                                              | Superato |
| TU11 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ gestisca correttamente i casi di errore durante l'aggiunta dei files                                           | Superato |
| TU12 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ gestisca correttamente il caso in cui viene chiamata senza requisiti                                    | Superato |
| TU13 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ aggiunga i requisiti al database                                                                        | Superato |
| TU14 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ gestisca correttamente i casi di errore durante l'aggiunta dei requisiti                                | Superato |
| TU15 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ gestisca correttamente il caso in cui viene chiamata senza chunks                                             | Superato |
| TU16 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ aggiunga i chunk al database                                                                                  | Superato |
| TU17 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ gestisca correttamente i casi di errore durante l'aggiunta dei chunk                                          | Superato |  
| TU18 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForFiles_ interroghi i files in base a un termine di ricerca                                                        | Superato |
| TU19 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForFiles_ gestisca correttamente i casi di errore durante l'interrogazione dei files                                | Superato |
| TU20 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForRequirements_ interroghi i requisiti in base a un termine di ricerca                                             | Superato |
| TU21 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForRequirements_ gestisca correttamente i casi di errore durante l'interrogazione dei requisiti                     | Superato |
| TU22 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForChunks_ interroghi i chunks in base a un termine di ricerca                                                      | Superato |
| TU23 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForChunks_ gestisca correttamente i casi di errore durante l'interrogazione dei chunks                              | Superato |
| TU24 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _getEmbeddings_ ritorni gli embeddings correttamente                                                                      | Superato |
| TU25 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ gestisca correttamente il caso in cui viene chiamata senza files da rimuovere                               | Superato |
| TU26 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ rimuova i files al database                                                                                 | Superato |
| TU27 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ gestisca correttamente i casi di errore durante la rimozione dei files                                      | Superato |
| TU28 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _refreshEmbeddings_ re-inizializzi gli embeddings correttamente                                                           | Superato |
| TU29 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ inizializzi la connessione al database e la tabella                                                        | Superato |
| TU30 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ gestisca il caso in cui il bearer token sia indefinito                                                     | Superato |
| TU31 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ gestisca i casi di errore durante l'inizializzazione                                                       | Superato |
| TU32 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_determineEmbeddingDimension_ determini la dimensione degli embeddings correttamente                                    | Superato |
| TU33 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_determineEmbeddingDimension_ ritorni il valore di default se non riesce a incorporare la query                         | Superato |
| TU34 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getDB_ ritorni la connessione al database                                                                              | Superato |
| TU35 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getDB_ crei la connessione al database se questa non esiste                                                            | Superato |
| TU36 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ ritorni true se la tabella esiste                                                                         | Superato |
| TU37 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ ritorni false se la tabella non esiste                                                                    | Superato |
| TU38 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ gestisca correttamente i casi di errore durante il controllo dell'esistenza della tabella                 | Superato |
| TU39 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ ritorni la tabella se esiste                                                                                 | Superato |
| TU40 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ ritorni un errore se viene fornito un tipo sconnosciuto                                                      | Superato |
| TU41 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ crei una tabella se non esiste                                                                               | Superato |
| TU42 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ gestisca correttamente i casi di errore durante il recupero della tabella                                    | Superato |
| TU43 | Verifica, sulla classe _LangChainOllamaAdapter_, che Ollama e gli embedding siano inizializzati con i parametri corretti                                                           | Superato |
| TU44 | Verifica, sulla classe _LangChainOllamaAdapter_, che Ollama e gli embedding siano inizializzati senza il bearer token                                                              | Superato |
| TU45 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generate_ generi la risposta correttamente                                                                       | Superato |
| TU46 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generate_ gestisca correttamente i casi di errore                                                                | Superato |
| TU47 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateEmbeddings_ generi l'array di embeddings correttamente                                                   | Superato |
| TU48 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateEmbeddings_ gestisca correttamente i casi di errore                                                      | Superato |
| TU49 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _getEmbeddings_ inizializzi correttamente gli embeddings e Ollama                                                 | Superato |
| TU50 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _refreshModels_ re-inizializzi Ollama e gli embedding correttamente                                               | Superato |
| TU51 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                                   | Superato |
| TU52 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ chiami la funzione _clearMessages_ della classe _ChatService_                                          | Superato |
| TU53 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ mostri all'utente un messaggio di conferma per la cancellazione la cronologia della chat               | Superato |
| TU54 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ mostri il messeggio di conferma solo dopo che è stata cancellata la cronologia della chat              | Superato |
| TU55 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ gestisca correttamente i casi di errore provenienti dalla classe _ChatService_                         | Superato |
| TU56 | Verifica, sulla classe _ClearRequirementsHistoryCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                           | Superato |
| TU57 | Verifica, sulla classe _ClearRequirementsHistoryCommand_, che la funzione _execute_ esegua il comando e apra la sidebar                                                            | Superato |
| TU58 | Verifica, sulla classe _CommandRegistry_, che la funzione _registerCommand_ registri un comando e lo aggiunga all'array _subscriptions_                                            | Superato |
| TU59 | Verifica, sulla classe _CommandRegistry_, che la funzione _registerCommands_ registri più comandi e gli aggiunga all'array _subscriptions_                                         | Superato |
| TU60 | Verifica, sulla classe _CommandRegistry_, che la funzione _getCommand_ ritorni il comando se esiste                                                                                | Superato |
| TU61 | Verifica, sulla classe _CommandRegistry_, che la funzione _getCommand_ ritorni errore se il comando non esiste                                                                     | Superato |
| TU62 | Verifica, sulla classe _CommandRegistry_, che, dopo che un comando è stato registrato, venga chiamata la funzione _execute_ quando quel comando viene attivato                     | Superato |
| TU62 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                                | Superato |
| TU63 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato                     | Superato |
| TU64 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo                         | Superato |
| TU65 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo                      | Superato |
| TU66 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e invii un messaggio alla chat view                                               | Superato |
| TU67 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                               | Superato |
| TU68 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato                    | Superato |
| TU69 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo                        | Superato |
| TU70 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo                     | Superato |
| TU71 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e invii un messaggio alla chat view                                              | Superato |
| TU72 | Verifica, sulla classe _OpenSettingsCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                                       | Superato |
| TU73 | Verifica, sulla classe _OpenSettingsCommand_, che la funzione _execute_ esegua il comando e apra la sidebar                                                                        | Superato |
| TU74 | Verifica, sulla classe _OpenSidebarCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                                        | Superato |
| TU75 | Verifica, sulla classe _OpenSidebarCommand_, che la funzione _execute_ esegua il comando e apra la sidebar                                                                         | Superato |
| TU76 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                                      | Superato |
| TU77 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ esegua il comando e resetti il database                                                                   | Superato |
| TU78 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ non resetti il database se l'utente sceglie l'opzione "No"                                                | Superato |
| TU79 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ gestisca correttamente i casi di errore mentre resetta il database                                        | Superato |
| TU80 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _GetInstance_ ritorni un errore se l'istanza non è inizializzata                                                     | Superato |
| TU81 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _Init_ ritorni un errore per ogni chiave quando il valore di configurazione è indefinito                             | Superato |
| TU82 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _Init_ abbia inizializzato una configServiceFacade                                                                   | Superato |
| TU83 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _GetInstance_ ritorni un'istanza di configServiceFacade                                                              | Superato |
| TU84 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _sync_ sincronizzi la configurazione del ConfigService con la configurazione del ConfigServiceFacade                 | Superato |
| TU85 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getOllamaModel_ ritorni il nome corretto del modello di Ollama                                                      | Superato |
| TU86 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getEmbeddingModel_ ritorni il nome corretto del modello di embedding                                                | Superato |
| TU87 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getMaxResults_ ritorni il valore del risultato massimo                                                              | Superato |
| TU88 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getTemperature_ ritorni il valore della temperatura                                                                 | Superato |
| TU89 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getEndpoint_ ritorni il valore di endpoint                                                                          | Superato |
| TU90 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getBearerToken_ ritorni il valore del bearer token                                                                  | Superato |
| TU91 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getFilters_ ritorni la configurazione dei filtri                                                                    | Superato |
| TU92 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ salti files già indicizzati                                                                         | Superato |
| TU93 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ elabori un file valido                                                                              | Superato |
| TU94 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ salti files più grandi di 20MB                                                                      | Superato |
| TU95 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ gestisca correttamente i casi di errore durante l'elaborazione dei files                            | Superato |
| TU96 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ ritorni un errore se nessuna cartella di workspace è aperta                                | Superato |
| TU97 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ ritorni un warning se non vengono trovati files corrispondenti                             | Superato |
| TU98 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ elabori i files del workspace correttamente                                                | Superato |
| TU43 | Verifica, sulla classe _RequirementsServiceFacade_, che il costruttore inizializzi l'oggetto con i servizi forniti                                                                 | Implementato |
| TU44 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ ritorni un errore se il file dei requisiti non è supportato                               | Implementato |
| TU45 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti csv con un delimitatore indefinito            | Implementato |
| TU46 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti csv con un delimitatore personalizzato        | Implementato |
| TU47 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti requif                                        | Implementato |
| TU48 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ ritorni un messaggio di warning se non sono presenti requisiti nel file                   | Implementato |
| TU49 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni il risultato del tracciamento dei requisiti selezionati                            | Implementato |
| TU50 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni il risultato del tracciamento di tutti i requisiti                                 | Implementato | 
| TU51 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni un errore se è stato trovato nessun requisito da tracciare                         | Implementato |
| TU52 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getUnimplementedRequirements_ ritorni i requisiti non implementati                                            | Implementato |
| TU53 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getUnimplementedRequirements_ ritorni un errore se non sono stati trovati requisiti non implementati          | Implementato |
| TU54 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getRequirement_ ritorni il requisito cercato tramite id                                                       | Implementato |
| TU55 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getRequirement_ ritorni undefined se un requisito non è stato caricato                                        | Implementato |
| TU56 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getAllRequirements_ ritorni tutti i requisiti caricati                                                        | Implementato |
| TU57 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _deleteRequirement_ rimuova il requisito specificato                                                           | Implementato |
| TU58 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _clearRequirements_ rimuova tutti i requisiti                                                                  | Implementato |
| TU59 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _clearRequirements_ ritorni un errore se nessun requisito è presente                                           | Implementato |
| TU60 | Verifica che l'enumerazione _COLLECTION\_TYPE_ abbia i valori corretti                                                                                                             | Superato |
| TU61 | Verifica, sulla classe _ChatWebviewProvider_, che il costruttore inizializzi l'oggetto con il servizio e il URI forniti                                                            | Superato |
| TU62 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _resolveWebviewView_ configuri la webview e carichi la cronologia della chat                                         | Superato |
| TU63 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _resolveWebviewView_ gestisca correttamente il caso in cui la cronologia della chat sia vuota                        | Superato | 
| TU64 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ invii il messaggio dell'utente e riceva la risposta del modello                                    | Superato |
| TU65 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ gestisca gli errori del servizio di inferenza                                                      | Superato |
| TU66 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ gestisca gli errori sconosciuti                                                                    | Superato |
| TU67 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onClearHistory_ cancelli la cronologia della chat                                                                 | Superato |
| TU68 | Verifica, sulla classe _ChatWebviewProvider_, che, quando viene chiamata la funzione _\_onDidReceiveMessage_ gestisca correttamente il messagio ricevuto                           | Superato |
| TU69 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _resolveWebviewView_ configuri la webview e aggiorni la visualizzazione dei requisiti                             | Implementato |
| TU70 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _resolveWebviewView_ non invii un messaggio di aggiornamento quando non esistono requisiti                        | Implementato |
| TU71 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di caricamento di un requisito                   | Implementato |
| TU72 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di caricamento di un requisito con opzioni di default | Implementato |
| TU73 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore in messaggi di caricamento di un requisito   | Implementato |
| TU74 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di tracciamento dei requisiti                    | Implementato |
| TU75 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di tipo "showUnimplemented"                      | Implementato |
| TU76 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi in cui il messaggio ha un tipo sconosciuto             | Implementato |
| TU77 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di apertura file                                 | Implementato |
| TU78 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore in messaggi di apertura file                 | Implementato |
| TU79 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di cancellazione dei requisiti                   | Implementato |
| TU80 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore in messaggi di cancellazione dei requisiti   | Implementato |
| TU81 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di modifica dei requisiti                        | Implementato |
| TU82 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente il messaggio di cancellazione di un requisito                 | Implementato |
| TU83 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore in messaggi di cancellazione di un requisito | Implementato |
| TU84 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore                                              | Implementato |
| TU85 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi di errore sconosciuti                                  | Implementato |
| TU86 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i casi in cui gli oggetti vengono lanciati come errori        | Implementato |
| TU87 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ venga chiamata correttamente quando viene ricevuto un messaggio                      | Implementato |
| TU88 | Verifica, sulla classe _ChatService_, che la funzione _addMessage_ aggiunga correttamente un nuovo messaggio                                                                       | Superato |
| TU89 | Verifica, sulla classe _ChatService_, che la funzione _clearMessages_ rimuova tutti i messaggi                                                                                     | Superato |
| TU90 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ ritorni un valore di tipo Config                                                                               | Superato |
| TU91 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ carichi e unisca i valori locali di configurazione                                                             | Superato |
| TU92 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ carichi da una configurazione globale se non è stata trovata una locale                                        | Superato |
| TU93 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente valori non validi di configurazione locale                                              | Superato |
| TU94 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente file di configurazione locale vuoti o malformati                                        | Superato |
| TU95 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente il caso in cui il percorso di ricerca sia mancante nei filtri dei requisiti             | Superato |
| TU96 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ formatti correttamente il codice sorgente in C o C++                                         | Superato |
| TU97 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ formatti correttamente il codice sorgente in Rust                                            | Superato |
| TU98 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca le linee vuote correttamente                                                        | Superato |
| TU99 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca estensioni di file sconosciute come testo                                           | Superato |
| TU100 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca i header files correttamente                                                       | Superato |
| TU101 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ legga il file correttamente                                                                                    | Superato |
| TU102 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ ritorni un errore se la lettura del file fallisce                                                              | Superato |
| TU103 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ ritorni correttamente un checksum per un dato contenuto del file                                               | Superato |
| TU104 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ ritorni un errore se il calcolo del chacksum fallisce                                                          | Superato |
| TU105 | Verifica, sulla classe _FilterService_, che il costruttore recuperi i filtri dal servizio di configurazione                                                                       | Superato |
| TU106 | Verifica, sulla classe _FilterService_, che la funzione _getPathFilter_ ritorni il path filter correttamente                                                                      | Superato |
| TU107 | Verifica, sulla classe _FilterService_, che la funzione _getFileExtensionFilter_ ritorni il filtro dell'estensione correttamente                                                  | Superato |
| TU108 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementsFilters_ ritorni il filtro dei requisiti correttamente                                                    | Superato |
| TU109 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementsFilters_ ritorni il filtro dei requisiti correttamente                                                    | Superato |
| TU110 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementsFilters_ ritorni il un oggetto vuoto nel caso in cui il filtro dei requisiti non esista                   | Superato |
| TU111 | Verifica, sulla classe _GlobalStateService_, che la funzione _updateState_ aggiorni lo stato tramite i messaggi della chat                                                        | Superato |
| TU112 | Verifica, sulla classe _GlobalStateService_, che la funzione _updateState_ aggiorni lo stato tramite i requisiti                                                                  | Superato |
| TU113 | Verifica, sulla classe _GlobalStateService_, che la funzione _getState_ ritorni i messaggi della chat dallo stato globale                                                         | Superato |
| TU114 | Verifica, sulla classe _GlobalStateService_, che la funzione _getState_ ritorni un array vuoto se non esiste uno stato                                                            | Superato |
| TU115 | Verifica, sulla classe _GlobalStateService_, che la funzione _clearState_ cancelli lo stato rendendolo un array vuoto per default                                                 | Superato |
| TU116 | Verifica, sulla classe _GlobalStateService_, che la funzione _clearState_ cancelli lo stato con un valore di reset personalizzato                                                 | Superato |
| TU117 | Verifica, sulla classe _InferenceService_, che la funzione _query_ recuperi i files rilevanti e generi una risposta                                                               | Superato |
| TU118 | Verifica, sulla classe _InferenceService_, che la funzione _query_ gestisca i casi di errore durante la query correttamente                                                       | Superato |
| TU119 | Verifica, sulla classe _InferenceService_, che la funzione _query_ gestisca i casi di errore sconosciuti correttamente                                                            | Superato |
| TU120 | Verifica, sulla classe _InferenceService_, che la funzione _checkSystemRequirements_ controlli la connessione al modello di Ollama                                                | Superato |
| TU121 | Verifica, sulla classe _InferenceService_, che la funzione _checkSystemRequirements_ gestisca correttamente il caso di errore di connessione                                      | Superato |
| TU121 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con tutti i dati e attributi di nome diverso                 | Superato |
| TU122 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con dati mancanti                                            | Superato |
| TU123 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con id mancante                                              | Superato |
| TU124 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array vuoto se la stringa è vuota                                                                  | Superato |
| TU125 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se il delimitatore è sbagliato                                                              | Superato |
| TU126 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se mancano dati                                                                             | Superato |
| TU127 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con tutti i dati e con un delimitatore predefinito           | Superato |
| TU128 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se la lunghezza delle linee è minnore di due                                                | Superato |
| TU129 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un array di requisiti da una stringa reqif con tutti i dati e attributi di nome diverso             | Superato |
| TU130 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un array di requisiti da una stringa reqif con dati mancanti                                        | Superato |
| TU131 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un errore se la stringa è vuota                                                                     | Superato |
| TU132 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia un singolo SPEC_OBJECT che un array di SPEC_OBJECTS                    | Superato |
| TU133 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente variazioni di nomi di attributo in csv                                     | Superato |
| TU134 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia singoli attributi che array di essi                                    | Superato |
| TU135 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia un singolo valore che più valori negli attributi                       | Superato |
| TU136 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente variazioni di identificativo                                               | Superato |
| TU137 | Verifica, sulla classe _RequirementsService_, che il costruttore inizializzi correttamente i requisiti dallo stato globale                                                        | Implementato |
| TU138 | Verifica, sulla classe _RequirementsService_, che il costruttore gestisca correttamente il caso in cui lo stato globale è vuoto                                                   | Implementato |
| TU139 | Verifica, sulla classe _RequirementsService_, che la funzione _addRequirement_ aggiunga il requisito e aggiorni lo stato globale                                                  | Implementato |
| TU140 | Verifica, sulla classe _RequirementsService_, che la funzione _addRequirement_ aggiunga una lista di requisiti e aggiorni lo stato globale                                        | Implementato |
| TU141 | Verifica, sulla classe _RequirementsService_, che la funzione _saveRequirements_ aggiorni la lista dei requisiti nello stato globale                                              | Implementato |
| TU142 | Verifica, sulla classe _RequirementsService_, che la funzione _getRequirements_ recuperi la lista dei requisiti dallo stato globale                                               | Implementato |
| TU143 | Verifica, sulla classe _RequirementsService_, che la funzione _deleteRequirement_ rimuova un requisito e aggiorni lo stato globale                                                | Implementato |
| TU144 | Verifica, sulla classe _RequirementsService_, che la funzione _clearRequirements_ rimuova tutti i requisiti dalla lista nello stato globale                                       | Implementato |
| TU145 | Verifica, sulla classe _RequirementsService_, che la funzione _getById_ recuperi un requisito in base al suo id                                                                   | Implementato |
| TU146 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackRequirementImplementation_ gestisca correttamente gli errori durante il tracciamento dei requisiti     | Implementato |
| TU147 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ gestisca correttamente gli errori durante l'elaborazione dei files                   | Implementato |
| TU148 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _findRelatedCode_ ritorni pezzi di codice correlati al requisito                                             | Implementato |
| TU149 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _addRequirement_ gestisca correttamente gli errori durante la ricerca di codice correlato                    | Implementato |
| TU150 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "unlikely-match" nel caso di riferimenti vuoti                     | Implementato |
| TU151 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "confirmed-match" nel caso di punteggi alti                        | Implementato |
| TU152 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "possible-match" nel caso di punteggi medi                         | Implementato |
| TU153 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "unlikely-match" nel caso di punteggi bassi                        | Implementato |
| TU154 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ gestisca correttamente gli errori durante il tracciamento                             | Implementato |
| TU155 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ tracci i requisiti e ritorni un riassunto                                             | Implementato |
| TU156 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ copra il caso "possible-match"                                                        | Implementato |
| TU157 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ copra il caso "unlikely-match"                                                        | Implementato |
| TU158 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ elabori tutti i files del workspace                                                  | Implementato |
| TU159 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ gestisca il caso in cui il workspace non abbia cartelle                              | Implementato |
| TU160 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findWorkspaceCodeFiles_ ritorni un warning se non sono state trovate cartelle nel workspace               | Implementato |
| TU161 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateImplementationScore_ calcoli correttamente il punteggio di implementazione                       | Implementato |
| TU162 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateImplementationScore_ ritorni zero se i riferimenti sono vuoti                                    | Implementato |
| TU163 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateAverageScore_ ritorni zero se il punteggio medio è indefinito                                    | Implementato |
| TU164 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_convertToCodeReferences_ ordini al contrario                                                              | Implementato |
| TU165 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview senza CSS o JavaScript                                         | Superato |
| TU166 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview con CSS o JavaScript                                           | Superato |
| TU167 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ gestica correttamente i casi di errore durante la lettura del file HTML                                 | Superato |
| TU168 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ ritorni una stringa di lunghezza 32                                                                              | Superato |
| TU169 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ ritorni una stringa di soli caratteri alfanumerici                                                               | Superato |
| TU170 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ generi nonces diversi se viene chiamata più volte                                                                | Superato |
| TU171 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview senza CSS o JavaScript                                      | Superato |
| TU172 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview con CSS o JavaScript                                        | Superato |
| TU173 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ gestica correttamente i casi di errore durante la lettura del file HTML                              | Superato |
| TU174 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ ritorni una stringa di lunghezza 32                                                                           | Superato |
| TU175 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ ritorni una stringa di soli caratteri alfanumerici                                                            | Superato |
| TU176 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ generi nonces diversi se viene chiamata più volte                                                             | Superato |



             


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
