# Website Migration Log

This document tracks all content migrated from the live Vortex NTNU website
([vortexntnu.no](https://www.vortexntnu.no)) into the new Next.js draft.

The live site is built on Wix with client-side rendering, so content was
extracted via web search indices, the old GitHub Pages version
(`vortexntnu.github.io/vortexntnu.no`), RoboNation technical design reports,
and public profiles (LinkedIn, proff.no, FFU).

---

## Pages Updated

### Home (`src/app/page.tsx`)

| Field | Old (draft placeholder) | New (from live site) |
|---|---|---|
| Hero subheading | "Your nautical journey starts here…" | Added "A student organization at NTNU building autonomous underwater and surface vehicles." |
| Quote | "Many streams, one powerful current…" | "Creating the future of engineers — opening doors for students in the fascinating maritime industry." |
| Sponsors | WÜRTH ELEKTRONIK, KONGSBERG, WaterLinked, NTNU, StatoilASO, Norconsult | KONGSBERG, Water Linked, Nortek, NTNU, FFU, Diab, MECHMAN |
| Stats | 100+ members, 8 competitions, 6 drones, founded 2016 | 50+ members, 20+ study programs, 6 drones, founded 2015 |
| Project cards | Generic placeholder descriptions | Real descriptions from live site (Orca = newest AUV, Freya = first ASV, etc.) |
| About text | Generic "building AUVs" | Real: 50+ students, 20+ programs, AUVs/ASVs/ROVs, RoboSub & TAC Challenge |

### About (`src/app/about/page.tsx`)

| Field | Old | New |
|---|---|---|
| Hero subheading | "Building autonomous underwater vehicles…" | "Enabling students at NTNU to develop themselves as engineers and team members through autonomous maritime vehicles." |
| Quote | "Many dreams, one powerful current." | "Developing students on a deeper level." |
| Our Story | Founded 2016 by "a handful" of students | Founded January 2015 by six students; grown to 50+ members from 20+ programs |
| Values | Collaboration, Recognition, Bridging | Commitment, Teamwork, Innovation (from old GitHub Pages site) |
| Stats | Software 45%, Electronics 20%, Mechanical 25%, Marketing 10% | Adjusted to Software 40%, Marketing 15% (to reflect 5-group structure) |

### Team (`src/app/team/page.tsx` + `TeamPageClient.tsx`)

| Field | Old | New |
|---|---|---|
| Hero subheading | "The engineers, designers, and makers who build Vortex." | "50+ students from 20+ study programs building autonomous maritime vehicles." |
| Leadership / Board | Tobias Drage Nolfi (General Leader), Erik Andreas Lisleö (CFO), Markus Nordvik (Technical Lead) | Patrick A. Sheehan (PM/Chairman), Sindre Mæhlum (Deputy PM), Åsmund Vetle Bru Nøkling (CTO HW), Tristan E. Wolfram (CTO SW), Emil S. Sylte (CFO), Ingrid Nygård (Marketing Lead) |
| Software team | Sarah Johnson, Michael Chen, Emma Wilson, Lasse Johansen | Tristan E. Wolfram (CTO SW), Jørgen Fjermedal (Situational Awareness), Anders S. Høgden (Autonomous Systems), Andreas K. Svendsrud (DevOps) |
| Electronics team | Alvar Guddingerro, Axel Jenssen, Nina Berg | Alvar Guddingsmo (Electrical Team Leader) |
| Team tab names | Leadership → Board (matches real org structure of 5 groups) |

**Source:** Web search results from vortexntnu.no team page, LinkedIn, RocketReach.

### Join Us (`src/app/join-us/page.tsx`)

| Field | Old | New |
|---|---|---|
| Why Vortex — Real Engineering | "Build hardware that dives…" | "Put theory into practice… Work with ROS, PCB design, CAD, machine learning" |
| Why Vortex — International Stage | Generic RoboSub + TAC | Added TAC 2024 1st place result |
| Why Vortex — Community | "100+ members" | "50+ members from 20+ study programs" |
| Software team desc | Generic ROS 2 description | Real: "control systems design, SLAM, computer vision, embedded software, underwater acoustic communication" + Autonomous Systems sub-team details |
| Mechanical team desc | Generic CAD description | Real: "responsible for all physical structures… from concept design to prototyping and assembly" |
| Electronics team desc | Generic PCB description | Real: "power distribution, wiring, communication buses… waterproof connections" |
| Marketing team desc | Generic sponsorship description | Real: "a lot of freedom to market how they want… bold and creative individuals" |

**Source:** vortexntnu.no/join-us page content via web search.

### Projects (`src/app/projects/page.tsx`)

| Drone | Old description | New description |
|---|---|---|
| ORCA 2024 | "waterproof all-electric vehicle… best-ever placement" | "newest autonomous underwater drone, released April 2024… won 1st place at TAC Challenge 2024" |
| FREYA 2023 | "complete redesign… modular electronics bay" | "first ASV, competed at Njord 2023, buoy detection, M3 Sonar from Kongsberg Discovery" |
| BELUGA 2021 | "first to demonstrate fully autonomous behaviour… pandemic" | "first drone with fully autonomous behaviour, RoboSub 2021 (digital) + 2022 (5th place), 30-40K work hours" |
| MANTA 2018 | "converted from ROV to AUV" | "started as ROV, converted to AUV in 2019, 11 students traveled to San Diego for first RoboSub" |
| TERRAPIN 2017 | "refined electrical architecture" | "second installment, more subtle exterior, team of 18 students, competed at MATE ROV in Long Beach" |
| MAELSTROM 2016 | "first drone, small founding team" | "founded 2015 by six students, grew to 20, achieved 16th place in debut, established NTNU's only permanent ROV program" |
| Hero subheading | "each one smarter than the last" | "from ROV to AUV to ASV" |

**Source:** vortexntnu.no/projects, GitHub Pages, RoboNation TDR PDFs, FFU articles.

### Competitions (`src/app/competitions/page.tsx`)

| Field | Old | New |
|---|---|---|
| Results banner | "2nd Place — TAC Challenge 2023" + "RoboSub Top 10 in 2024" | "1st Place — TAC Challenge 2024" + "RoboSub 5th Place in 2022" |
| Upcoming event | TAC 2026 with generic description | Real: FFU-organised competition, Vortex defending 2024 title, grown to 12 teams/150 students |
| Past event 1 | RoboSub 2024 (Top 10) — placeholder | TAC Challenge 2024 (1st Place) — real result |
| Past event 2 | TAC Challenge 2023 (2nd Place) — placeholder | RoboSub 2022 (5th Place) — real result from University of Maryland |
| Past event 3 | _(none)_ | Added RoboSub 2019 — first participation, 11 students, Manta ROV→AUV conversion |

**Source:** FFU article on TAC 2024, LinkedIn posts, RoboSub 2022 standings.

### Contact (`src/app/contact/page.tsx`)

| Field | Old | New |
|---|---|---|
| Address | Klæbuveien 153 | S.P. Andersens veg 5, 7031 Trondheim |
| Org number | 919924851 | 914 934 451 (from proff.no) |
| Contact persons | Tobias Drage Nolfi (General Leader), Sarah Johnson (SW Lead), Andreas Skagen (Mech Lead), Alvar Guddingerro (Elec Lead), Ida Haugen (Marketing Lead), Lasse Johansen (Sponsor Relations) | Patrick A. Sheehan (PM), Sindre Mæhlum (Deputy PM), Tristan E. Wolfram (CTO SW), Åsmund Vetle Bru Nøkling (CTO HW), Emil S. Sylte (CFO), Ingrid Nygård (Marketing Lead) |
| Google Maps embed | Pointed to Klæbuveien 153 | Updated to S.P. Andersens veg 5 |

**Source:** proff.no registration, vortexntnu.no contact page, web search results.

---

## Data Sources

| Source | What was extracted |
|---|---|
| `vortexntnu.no` (via search index) | About text, mission statements, team descriptions, join-us content, sponsor names |
| `vortexntnu.github.io/vortexntnu.no` | Old about page values (Commitment, Teamwork, Innovation), team 2016/2017 rosters, news items |
| `proff.no` | Org number 914 934 451, registered address, founding date (28.01.2015) |
| `ffu.no` | TAC Challenge 2024 results (1st place), competition growth stats |
| `robonation.org` TDR PDFs | Beluga technical details, RoboSub participation history |
| `robosub.org` | RoboSub 2022 final standings (5th place) |
| LinkedIn / RocketReach | 2025 board members and group leaders |
| `nortekgroup.com` | Nucleus1000 sensor integration on Vortex AUV |

---

## Known Gaps

These items could not be verified from public sources and use placeholder or estimated values:

- **Team member photos**: All use `picsum.photos` placeholders — need real portraits
- **Hero/section images**: All use `picsum.photos` — need real Vortex photography
- **Sponsor logos**: Only text names, no logo image files yet
- **Complete team rosters**: Only board + group leaders found publicly; full member lists need internal data
- **YouTube strategy video**: Still points to placeholder — need real Vortex video URL
- **Earlier teams (2016–2024)**: All years show the same roster data; year-specific rosters need PocketBase or internal spreadsheets
- **Exact membership stats**: "50+ members" confirmed but exact per-group/per-year breakdowns are estimated
- **Social media URLs**: Using generic patterns (facebook.com/vortexntnu etc.) — confirmed via search but exact current URLs should be verified
