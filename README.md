# devvy (demo)


# 💻 Devvy

> A project-based tech challenge platform for real-world engineering prep.

---

##  Overview

Devvy replaces algorithmic puzzle platforms with realistic project challenges. Students build full-stack solutions, and recruiters assess candidates based on how they think — not just what they solve.

---

## Features

-  Solve real-world tasks in full-stack environments
-  Build public, peer-reviewed portfolios
-  Get challenges sourced from actual GitHub repositories
-  AI-generated prompts based on real project code
-  Recruiter dashboard (planned): view candidate submissions & feedback

---

##  Architecture
Architecture:

[ GitHub Scraper ] ➡️ [ AI Prompt Generator (ChatGPT/Gemini) ] ➡️ [ Devvy Challenge Builder ]  
⬇️  
[ Supabase DB ]  
⬇️  
[ FastAPI Backend ] ⬅️➡️ [ React Frontend (Axios) ]


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

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-repo/devvy.git
   cd devvy

