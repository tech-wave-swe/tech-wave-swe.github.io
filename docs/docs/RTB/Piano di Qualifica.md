---
id: piano_di_qualifica
title: "Piano di Qualifica"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.7.1
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

### Scopo del Documento

Questo documento delinea le strategie di verifica, validazione e quality assurance adottate durante lo sviluppo del progetto, definendo gli obiettivi qualitativi e le relative metriche di misurazione. Include la documentazione dettagliata delle procedure di verifica, dei processi di controllo qualità, e delle metodologie di test implementate nelle varie fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team.
Si concentra su:

- La qualità dei processi, in termini di aderenza agli standard e alle pratiche di gestione del ciclo di vita del software.
- La qualità del prodotto, attraverso la definizione di metriche misurabili e verificabili.
- L'adozione di un modello a V per la pianificazione e l'esecuzione delle attività di test e validazione.

### Glossario

Per una definizione dei termini tecnici utilizzati in questo documento, consultare il [Glossario](./Glossario.md).

### Riferimenti

#### Riferimenti Normativi

- **Norme di Progetto**: [Norme di Progetto](./Norme%20di%20Progetto.md)
- **Capitolato d'Appalto C8: Requirement Tracker- Plug-in VS Code**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti Informativi

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

## Qualità di Processo

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le attività di supporto necessarie per lo sviluppo di un prodotto software.

### Processi Primari

| Metrica | Nome                           | Descrizione                                                        | Obiettivo                                           | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------- | ------------------ | ------------------- |
| MPCR01  | **Budget Variance**            | Differenza tra il budget pianificato e quello effettivamente speso | Monitorare il controllo dei costi del progetto      | ≤ 5%               | ≤ 2%                |
| MPCR02  | **Earned Value**               | Valore del lavoro effettivamente svolto                            | Monitorare l'avanzamento economico del progetto     | ≥ Actual Cost      | -                   |
| MPCR03  | **Actual Cost**                | Costo effettivo sostenuto per il lavoro svolto                     | Controllare le spese del progetto                   | ≤ Budget previsto  | < Budget previsto   |
| MPCR04  | **Planned Value**              | Valore del lavoro pianificato fino a una data specifica            | Comparare il progresso pianificato con quello reale | N/A                | N/A                 |
| MPCR05  | **Cost Variance**              | Differenza tra il valore acquisito e il costo effettivo            | Valutare l'efficienza economica del progetto        | ≥ -5%              | ≥ 0%                |
| MPCR06  | **Schedule Variance**          | Differenza tra il valore acquisito e il valore pianificato         | Valutare l'aderenza ai tempi di progetto            | ≥ -5%              | ≥ 0%                |
| MPCR07  | **Cost Performance Index**     | Rapporto tra il valore acquisito e il costo effettivo              | Misurare l'efficienza dei costi                     | ≥ 0.95             | ≥ 1.0               |
| MPCR08  | **Schedule Performance Index** | Rapporto tra il valore acquisito e il valore pianificato           | Misurare l'efficienza temporale                     | ≥ 0.95             | ≥ 1.0               |

Table: Metriche per i processi primari

#### Budget Variance

**Metrica**: MPCR01

**Formula:** $\text{Budget Variance} = 100 \times \dfrac{\text{Budget Consuntivo} − \text{Budget Pianificato}}{\text{Budget Pianificato}}$

- Questo indice misura la differenza tra il budget pianificato e quello effettivamente speso.
- Un valore positivo indica un risparmio rispetto al budget, mentre un valore negativo indica un costo superiore a quanto preventivato.

---

#### Earned Value

**Metrica**: MPCR02

**Formula:** $\text{Earned Value} = \sum (\text{Percentuale Completamento} \times \text{Budget Pianificato})$

- Il valore del lavoro effettivamente completato, calcolato moltiplicando la percentuale di completamento di ciascuna attività per il suo budget pianificato.
- Rappresenta quanto valore è stato prodotto in base al lavoro effettivamente svolto.

---

#### Actual Cost

**Metrica**: MPCR03

**Formula:** $\text{Actual Cost} = \overset{\text{n° sprint}}{\underset{i=0}{\sum}} (\text{Budget Consuntivo}_i)$

- Somma di tutti i costi realmente sostenuti per il lavoro completato fino ad oggi.
- Include costi diretti e indiretti effettivamente spesi nel progetto.

---

#### Planned Value

**Metrica**: MPR04

**Formula**: $\text{Planned Value} = \text{Actual Cost}_{i-1} + \text{Budget Pianificato}_i$

- $i$ è il numero corrente di sprint.
- Rappresenta il budget autorizzato assegnato al lavoro pianificato.
- Indica quanto lavoro dovrebbe essere stato completato ad una determinata data.

---

#### Cost Variance

**Metrica**: MPR05

**Formula**: $\text{Cost Variance} = \text{Earned Value} - \text{Actual Cost}$

- Misura la differenza tra il valore del lavoro completato e il suo costo effettivo.
- Un valore positivo indica che il progetto sta spendendo meno del previsto.

---

#### Schedule Variance

**Metrica**: MPCR06

**Formula**: $\text{Schedule Variance} = \text{Earned Value} - \text{Planned Value}$

- Misura la differenza tra il lavoro completato e quello pianificato.
- Un valore positivo indica che il progetto è in anticipo sulla schedulazione.

---

#### Cost Performance Index

**Metrica**: MPCR07

**Formula**: $\text{Cost Performance Index} = \dfrac{\text{Earned Value}}{\text{Actual Cost}}$

- Indica l'efficienza nell'utilizzo delle risorse.
- Un valore maggiore di 1 indica che si sta spendendo meno del previsto per il lavoro completato.

---

#### Schedule Performance Index

**Metrica**: MPCR08

**Formula**: $\text{Schedule Performance Index} = \dfrac{\text{Earned Value}}{\text{Planned Value}}$

- Indica l'efficienza nel rispetto dei tempi pianificati.
- Un valore maggiore di 1 indica che il progetto sta procedendo più velocemente del previsto.

### Processi di Supporto

| Metrica | Nome                       | Descrizione                                        | Obiettivo                                                       | Valore Accettabile         | Valore Desiderabile          |
| ------- | -------------------------- | -------------------------------------------------- | --------------------------------------------------------------- | -------------------------- | ---------------------------- |
| MPCS01  | **Estimate At Completion** | Stima dei costi per il completamento del progetto  | Prevedere i costi rimanenti e pianificare le risorse necessarie | ≤ Budget At Completion     | Corrispondente al preventivo |
| MPCS02  | **Estimate To Complete**   | Costo stimato per completare le attività rimanenti | Supportare la pianificazione finanziaria e delle risorse        | ≤ Budget At Completion     | ≤ Estimate At Completion     |
| MPCS03  | **Budget At Completion**   | Totale del budget allocato per il progetto         | Gestire e controllare le risorse finanziarie complessive        | ≤ +10% del budget iniziale | Corrispondente al preventivo |
| MPCS04  | **Indice Gulpease**        | Indice di leggibilità dei documenti                | Garantire la comprensibilità della documentazione               | ≥ 40                       | ≥ 60                         |

Table: Metriche per i processi di supporto

#### Estimate At Completion

**Metrica**: MPCS01

**Formula**: $\text{Estimate At Completion} = \text{Actual Cost} + \text{Estimate To Complete}$

- Stima del costo totale del progetto al suo completamento
- Combina i costi già sostenuti (AC) con la stima dei costi rimanenti (ETC)
- Utile per prevedere il budget finale necessario e identificare potenziali sforamenti

---

#### Estimate To Complete

**Metrica**: MPCS02

**Formula**: $\text{Estimate To Complete} = \dfrac{\text{Budget At Completion} - \text{Earned Value}}{\text{Cost Performance Index}}$

- Stima del costo necessario per completare il lavoro rimanente
- Tiene conto dell'efficienza attuale del progetto attraverso il CPI
- Permette di pianificare le risorse necessarie per il completamento

---

#### Budget At Completion

**Metrica**: MPCS03

**Formula**: $\text{Budget At Completion} = \sum \text{(Budget Pianificato) per ogni attività}$

- Rappresenta il budget totale autorizzato per il progetto
- Serve come baseline per valutare le performance di costo
- Include tutte le riserve di contingenza allocate

---

#### Indice Gulpease

**Metrica**: MPCS04

**Formula**: $\text{Indice Gulpease} = 89 + \dfrac{300 \times \text{numero frasi} - 10 \times \text{numero lettere}}{\text{numero parole}}$

- Misura la leggibilità dei documenti in italiano
- Scala da 0 (minima leggibilità) a 100 (massima leggibilità)
- Valori ottimali variano in base al livello di istruzione del target:
  - 40-50 per testi tecnici
  - \>60 per documenti destinati a un pubblico generale

### Processi Organizzativi

| Metrica | Nome                        | Descrizione                                          | Obiettivo                                                  | Valore Accettabile | Valore Desiderabile |
| ------- | --------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- | ------------------ | ------------------- |
| MPCO01  | **Rischi non preventivati** | Numero di rischi emersi non pianificati inizialmente | Identificare e gestire tempestivamente nuovi rischi        | ≤ 3                | 0                   |
| MPCO02  | **Correttezza documenti**   | Percentuale di documenti privi di errori             | Garantire la qualità e l'affidabilità della documentazione | ≥ 70%              | 100%                |

Table: Metriche per i processi organizzativi

#### Rischi non preventivati

**Metrica**: MPCO01

**Formula**: $\text{Rischi non preventivati} = \text{Numero totale rischi emersi} - \text{Numero rischi previsti}$

- Monitora l'efficacia del processo di risk management
- Aiuta a valutare la completezza dell'analisi dei rischi iniziale
- Un numero elevato può indicare la necessità di migliorare il processo di identificazione dei rischi

---

#### Correttezza documenti

**Metrica**: MPCO02

**Formula**: $\text{Correttezza} = 100 \times \dfrac{\text{Numero documenti senza errori}}{\text{Numero totale documenti}}$

- Misura la qualità complessiva della documentazione prodotta
- Include errori di forma, contenuto e conformità agli standard
- Importante per garantire la comunicazione efficace e la manutenibilità del progetto
- Gli errori vengono identificati durante le revisioni e le verifiche formali

## Qualità di Prodotto

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

## Specifica dei Test

I test di verifica e validazione vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.

### Test Di Sistema

| ID   | Descrizione                                                            | ID Requisito        | Stato            |
|------|------------------------------------------------------------------------|---------------------|------------------|
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

### Test Di Accettazione

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

Table: Test di Accettazione

## Cruscotto di valutazione

### Indice Gulpease

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1654995613&amp;format=interactive" data-image="ig.png" data-title="Indice Gulpease"></iframe>

### Earned Value, Planned Value & Actual Cost

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1002546531&amp;format=interactive" data-image="ev-pv-ac.png" data-title="Earned Value, Planned Value e Actual Cost"></iframe>

### Estimate to Complete & Estimate at Completion

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=840721179&amp;format=interactive" data-image="etc-eac.png" data-title="Estimate to Complete e Estimate at Completion"></iframe>

### Schedule Variance & Cost Variance

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1247587591&amp;format=interactive" data-image="sv-cv.png" data-title="Schedule Variance e Cost Variance"></iframe>

### Schedule Performance Index & Cost Performance Index

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=467291162&amp;format=interactive" data-image="spi-cpi.png" data-title="Schedule Performance Index e Cost Performance Index"></iframe>

### Rischi non preventivati

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=13872230&amp;format=interactive" data-image="rnp.png" data-title="Rischi non preventivati"></iframe>

### Requisiti Obbligatori

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=550686990&amp;format=interactive" data-image="ro.png" data-title="Requisiti Obbligatori"></iframe>

### Requisiti Desiderabili

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=99639478&amp;format=interactive" data-image="rd.png" data-title="Requisiti Desiderabili"></iframe>

### Requisiti Opzionali

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1136804738&amp;format=interactive" data-image="rop.png" data-title="Requisiti Opzionali"></iframe>

### Branch Coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1042212840&amp;format=interactive" data-image="bc.png" data-title="Branch Coverage"></iframe>

### Statement Coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=959844727&amp;format=interactive" data-image="sc.png" data-title="Statement Coverage"></iframe>

### Condition Coverage

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
