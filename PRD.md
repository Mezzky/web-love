# Product Requirements Document (PRD)

# Romantic Love Story Website

## Project Overview

Website ini adalah sebuah website romantis interaktif yang dibuat sebagai hadiah digital untuk pasangan atau orang tersayang. Website berfungsi sebagai media untuk menyampaikan perasaan, mengenang perjalanan hubungan, menampilkan foto-foto kenangan, memutar lagu romantis, serta memberikan pengalaman emosional melalui animasi dan interaksi yang menarik.

Website akan dibuat dalam bentuk Single Page Application (SPA) dengan desain modern, elegan, dan penuh nuansa romantis.

Website tidak memerlukan database karena seluruh konten bersifat statis dan akan disimpan dalam file JSON, assets lokal, atau layanan file hosting eksternal.

---

# Project Goals

## Primary Goal

Menciptakan pengalaman digital yang romantis, personal, dan berkesan bagi pasangan yang menerima website tersebut.

## Secondary Goals

* Menampilkan perjalanan cinta secara visual dan interaktif.
* Menampilkan foto-foto kenangan dengan tampilan yang menarik.
* Menyampaikan pesan dan ucapan romantis secara emosional.
* Memainkan lagu romantis sebagai background music.
* Menjadi hadiah digital yang dapat diakses kapan saja.

---

# Scope

## In Scope

* Single page website
* Responsive design
* Romantic animations
* Photo gallery
* Love story timeline
* Romantic quotes
* Love letter section
* Relationship counter
* Background music
* Mobile & desktop support
* Deployment menggunakan Vercel

## Out of Scope

* Login system
* Authentication
* User accounts
* Admin dashboard
* Database
* CMS
* Payment system
* Comment system

---

# Technology Stack

## Frontend

* ReactJS
* Vite
* TailwindCSS

## Animation

* Framer Motion
* GSAP (Optional)

## Audio

* HTML5 Audio API

## Hosting

* Vercel

## Repository

* GitHub

## File Storage

Uploadthing atau layanan public file hosting lainnya untuk:

* Images
* Audio Files

---

# User Flow

## Step 1

User membuka website.

## Step 2

Muncul halaman pembuka dengan animasi romantis.

### Content

Judul:

> Untuk seseorang yang sangat spesial

Subtitle:

> Ada sesuatu yang ingin aku sampaikan...

Button:

> Buka Cerita Kita

---

## Step 3

Setelah tombol ditekan:

* Musik mulai diputar
* Transisi animasi berjalan
* User diarahkan ke konten utama

---

## Step 4

User melakukan scroll dan menikmati seluruh cerita yang ditampilkan.

---

## Step 5

User mencapai bagian akhir berupa surat cinta dan pesan penutup.

---

# Website Sections

## 1. Hero Section

### Purpose

Memberikan kesan pertama yang emosional.

### Content

* Romantic Background
* Main Heading
* Sub Heading
* Start Button

### Animation

* Fade In
* Floating Hearts
* Background Glow

---

## 2. Our Story Timeline

### Purpose

Menampilkan perjalanan hubungan dari awal hingga saat ini.

### Components

* Timeline Cards
* Date
* Photo
* Description

### Example

#### Pertemuan Pertama

"Aku tidak pernah menyangka bahwa hari itu akan mengubah hidupku."

#### First Date

"Hari pertama kita menghabiskan waktu bersama."

#### Special Moments

"Momen yang akan selalu aku kenang."

---

## 3. Photo Memories Gallery

### Purpose

Menampilkan kumpulan foto kenangan.

### Components

* Responsive Grid
* Lightbox Preview
* Hover Animation

### Features

* Click to Zoom
* Smooth Transition

---

## 4. Why I Love You

### Purpose

Menampilkan alasan-alasan mengapa pasangan begitu spesial.

### Components

Interactive Cards

### Example

* Karena senyummu
* Karena kesabaranmu
* Karena perhatianmu
* Karena kamu selalu ada
* Karena kamu adalah rumah bagiku

---

## 5. Romantic Quotes

### Purpose

Menampilkan kumpulan quote romantis.

### Components

* Quote Slider
* Typewriter Effect

### Example

> Jika aku harus memilih lagi, aku akan tetap memilihmu.

> Bersamamu, aku menemukan arti pulang.

---

## 6. Relationship Counter

### Purpose

Menghitung lama hubungan.

### Display

* Days
* Hours
* Minutes
* Seconds

### Example

Kita telah bersama selama:

* 521 Hari
* 12 Jam
* 15 Menit
* 20 Detik

---

## 7. Music Player

### Purpose

Memberikan suasana emosional selama menjelajahi website.

### Features

* Play
* Pause
* Volume Control
* Floating Button

### Position

Bottom Right

---

## 8. Love Letter Section

### Purpose

Sebagai puncak emosional dari website.

### Content

Surat cinta panjang yang ditulis khusus untuk pasangan.

### Animation

* Typewriter Effect
* Fade In

---

## 9. Ending Section

### Purpose

Menjadi penutup website.

### Content

Pesan akhir:

> Terima kasih telah menjadi bagian terindah dalam hidupku.

Button:

> I Love You ❤️

### Animation

* Floating Hearts
* Confetti Effect

---

# Design Requirements

## Design Style

* Romantic
* Elegant
* Soft
* Emotional
* Modern

## Color Palette

### Primary

#FF6B81

### Secondary

#FFD6E0

### Accent

#FFF0F5

### Text

#2D2D2D

### Background

#FFF8FA

---

# Typography

## Headings

Playfair Display

## Body

Poppins

---

# Animations

## Global Animations

* Fade In
* Fade Up
* Scale In
* Slide In

## Special Effects

### Floating Hearts

Hati kecil melayang secara acak di layar.

### Typewriter

Animasi mengetik untuk quote dan surat cinta.

### Parallax Scroll

Memberikan kedalaman visual saat scrolling.

### Sparkle Effect

Efek bintang kecil muncul saat user scroll.

---

# Responsive Requirements

## Mobile

Priority: High

### Requirements

* Fully Responsive
* Touch Friendly
* Fast Loading

---

## Tablet

* Responsive Layout
* Optimized Gallery

---

## Desktop

* Full Experience
* Larger Visual Effects

---

# Performance Requirements

## Lighthouse Target

Performance: 90+

Accessibility: 90+

Best Practices: 90+

SEO: 90+

---

## Optimization

* Lazy Loading Images
* Image Compression
* WebP Format
* Code Splitting
* Asset Optimization

---

# File Structure

```bash
src/
├── assets/
│   ├── images/
│   ├── music/
│
├── components/
│   ├── Hero
│   ├── Timeline
│   ├── Gallery
│   ├── LoveReasons
│   ├── Quotes
│   ├── Counter
│   ├── MusicPlayer
│   ├── LoveLetter
│   └── Footer
│
├── data/
│   ├── timeline.js
│   ├── quotes.js
│   └── memories.js
│
├── pages/
│   └── Home.jsx
│
├── App.jsx
└── main.jsx
```

# Development Phases

## Phase 1

Reference Analysis

### Deliverables

* Website structure
* Component planning
* Animation planning

---

## Phase 2

Core Development

### Deliverables

* React setup
* Tailwind setup
* Layout implementation

---

## Phase 3

Interactive Features

### Deliverables

* Timeline
* Gallery
* Quotes
* Counter
* Music Player

---

## Phase 4

Animations & Polish

### Deliverables

* Framer Motion
* Floating Hearts
* Typewriter
* Confetti
* Final Styling

---

## Phase 5

Deployment

### Deliverables

* GitHub Repository
* Vercel Deployment
* Production Testing

---

# Acceptance Criteria

* Website dapat diakses melalui Vercel.
* Seluruh section tampil dengan baik di mobile dan desktop.
* Musik dapat dimainkan dan dihentikan.
* Semua foto dapat ditampilkan dengan benar.
* Animasi berjalan dengan smooth.
* Tidak memerlukan database.
* Loading website kurang dari 3 detik pada koneksi normal.
* Website memberikan pengalaman emosional dan romantis dari awal hingga akhir.

# Final Vision

Website harus terasa seperti sebuah surat cinta digital yang hidup, dimana pengguna tidak hanya membaca kata-kata, tetapi juga merasakan perjalanan hubungan melalui foto, cerita, musik, dan animasi yang membangun emosi dari awal hingga akhir.
