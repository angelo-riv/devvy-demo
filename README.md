# devvy (demo)


# 💻 Devvy

> LeetCode but REAL project-based questions

---

##  Overview

Devvy replaces algorithmic puzzle platforms with realistic project challenges. Students build full-stack solutions using the newest tech stacks, and recruiters assess candidates based on how they think — not just what they solve.

View more here: https://www.canva.com/design/DAGrAHg3C8s/Tyx1jniDV9PjmBJaeBle-w/edit?utm_content=DAGrAHg3C8s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

---

## Features

-  Solve real-world tasks in full-stack environments
-  Build public, peer-reviewed portfolios
-  Get challenges sourced from actual top-rated GitHub repositories
-  Project Repository problems built with multiple AI models & Human Validation 
-  Recruiter dashboard (planned): View candidate submissions & feedback

---

##  Architecture
**Architecture:**

[ Filtered GitHub Scraper ] ➡️ [ OpenAI Problem Repository Generation ] ➡️ [ Supabase DB ] ➡️ 

[ Gemini Problem Components Creation ] ➡️ [ Human Validation ] ➡️ [ Supabase Storage ] ➡️

[ Python Backend (FastAPI) ] ➡️ [ Docker Container ] ⬅️➡️ [ React Frontend (Axios) ]


| Component                | Description                                |
|--------------------------|--------------------------------------------|
| GitHub Scraper           | GitHub scraping for real-world codebases   |
| AI Prompt Generator      | Creates coding challenges from parsed files|
| Devvy Challenge Builder  | Builds the coding challenge                  |
| Supabase DB              | Stores users, challenges, and submissions   |
| FastAPI Backend          | Serves challenge and user data               |
| React Frontend (Axios)   | Fetches data and renders filters, portfolios, and problem views |


---

## Tech Stack

| Frontend      | Backend       | AI Integration | Storage & Infra     |
|---------------|---------------|----------------|----------------------|
| React         | FastAPI       | OpenAI + Gemini| Supabase + PostgreSQL|
| Axios         | Docker        |                | Firebase (testing)   |
|               | Python        |                |                      |


