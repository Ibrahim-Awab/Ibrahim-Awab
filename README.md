# 👋 Hi, I'm Ibrahim Awab

### Full Stack AI Engineer

<p align="left">
  <a href="https://github.com/Ibrahim-Awab">
    <img src="https://img.shields.io/badge/GitHub-Ibrahim--Awab-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/ibrahim-awab/">
    <img src="https://img.shields.io/badge/LinkedIn-Ibrahim_Awab-0A66C2?style=for-the-badge" alt="LinkedIn" />
  </a>
  <a href="mailto:ibrahimawab50@gmail.com">
    <img src="https://img.shields.io/badge/Email-ibrahimawab50@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

I'm a **Full Stack Developer** with **3+ years of professional experience** building, integrating and maintaining **production web applications**.

My work sits at the intersection of:

**Backend Engineering → Full Stack Development → eCommerce (Shopify) → ERP/CRM (Odoo) → AI/LLM Applications**

I work across the whole stack, from **REST APIs and backend architecture in Node.js, Express.js and Python**, through **Next.js and TypeScript frontends**, to **third-party integrations** and keeping production systems running.

> **My goal:** Build reliable software that solves real business problems, whether that's an API, an online store, an ERP module or an AI-powered feature.

Most of my professional work lives in private client repositories. The projects below are public samples.

---

## 🚀 Featured Projects

### 🔗 LinkedIn Connection Manager

**A full stack dashboard for managing LinkedIn connections and planning engagement, with AI-generated comment suggestions.**

<a href="https://github.com/Ibrahim-Awab/linkedInUsers_Management_System">
  <img src="https://img.shields.io/badge/📂_View_Repository-LinkedIn_Connection_Manager-2563EB?style=for-the-badge" alt="View repository" />
</a>

The application lets users:

- 👥 Store and organize LinkedIn connections in one place
- ⭐ Mark important connections so they appear first
- ⏱️ Set a per-connection engagement interval (how often to engage)
- 🔎 Search connections from the dashboard
- 🤖 Generate AI comment suggestions for posts through the OpenAI API
- 📊 View engagement data in a dashboard UI

#### Architecture

```text
                    👤 User
                       │
                       ▼
          ┌─────────────────────────┐
          │ Next.js 15 + React 19   │
          │ TypeScript + Tailwind   │
          └────────────┬────────────┘
                       │
                       ▼
          ┌─────────────────────────┐
          │ Next.js API Routes      │
          │ /settings  /post  /gpt  │
          └──────┬───────────┬──────┘
                 │           │
                 ▼           ▼
       ┌──────────────┐ ┌──────────────┐
       │ MongoDB      │ │ OpenAI API   │
       │ (Mongoose)   │ │ Comment Gen  │
       └──────────────┘ └──────────────┘
```

`Next.js` · `TypeScript` · `React` · `MongoDB` · `Mongoose` · `OpenAI API` · `REST API Routes` · `Tailwind CSS`

---

### 🛍️ Shopify Horizon Theme: Custom Gift Guide

**A Shopify Horizon theme extended with a Gift Guide page built from scratch in Liquid and vanilla JavaScript.**

<a href="https://github.com/Ibrahim-Awab/shopify-horizon-gift-guide">
  <img src="https://img.shields.io/badge/📂_View_Repository-Shopify_Gift_Guide-7AB55C?style=for-the-badge" alt="View repository" />
</a>

What I built:

- 🎨 A configurable **gift banner** section (top bar, hero, announcement strip)
- 🧱 A **product grid** section with a quick-add popup on each tile
- ⚡ The popup reads product data rendered inline by Liquid, so it **opens with no extra network request**
- 🎛️ Option pickers built dynamically from each product's own options
- 🛒 Add to cart through Shopify's **Cart AJAX API** (`/cart/add.js`)
- 🎁 A **bundle rule** that adds a companion product when specific variants are chosen
- ✏️ All copy editable from the **theme customizer**
- 🔄 Synced with the store through **Shopify's GitHub integration**

#### How the quick-add works

```text
Theme Customizer (merchant picks products)
              ↓
Liquid section renders tiles + JSON product payload
              ↓
Customer clicks "+" on a tile
              ↓
gift-grid.js opens a native <dialog> and builds option pickers
              ↓
Customer selects a variant → Add to cart
              ↓
POST /cart/add.js  (+ bundled product if the variant matches the bundle rule)
```

`Shopify` · `Liquid` · `JavaScript` · `CSS` · `Cart AJAX API` · `Theme Customizer` · `GitHub Integration`

---

### 🕷️ LinkedIn Post Scraper

**A Python automation script that collects recent posts and like status from LinkedIn connections.**

<a href="https://github.com/Ibrahim-Awab/LinkedIn-Post-Scrapper">
  <img src="https://img.shields.io/badge/📂_View_Repository-LinkedIn_Post_Scraper-3776AB?style=for-the-badge" alt="View repository" />
</a>

```text
Login → Connections page → Each profile's recent activity → Extract author, post text, like status
```

`Python` · `Selenium` · `Browser Automation` · `Web Scraping`

---

# 💻 Technical Skills

## ⚙️ Backend Engineering

<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,python,ts,js&perline=5" alt="Backend technologies" />
</p>

**Technologies:** Node.js · Express.js · Python · TypeScript · JavaScript

**Engineering:** `REST APIs` · `Backend Architecture` · `Third-Party API Integrations` · `Blockchain API Integrations` · `LinkedIn Automation` · `Production Maintenance`

---

## 🌐 Frontend Engineering

<p align="left">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,js,tailwind,html,css&perline=7" alt="Frontend technologies" />
</p>

**Technologies:** Next.js · React · TypeScript · JavaScript · Tailwind CSS · HTML5 · CSS3

---

## 🗄️ Databases & Caching

<p align="left">
  <img src="https://skillicons.dev/icons?i=mongodb,mysql,redis&perline=3" alt="Database technologies" />
</p>

**Technologies:** MongoDB · MySQL · Redis

---

## 🤖 AI & LLM Development

![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![RAG](https://img.shields.io/badge/RAG-Retrieval_Augmented_Generation-7C3AED?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

**Focus:** `Local LLMs` · `Ollama` · `RAG` · `LangChain` · `LLM API Integration` · `AI-Powered Applications`

### How I build RAG applications

```text
Documents
   ↓
Loading & Chunking  (LangChain)
   ↓
Embeddings
   ↓
Vector Store
   ↓
User Question
   ↓
Similarity Search
   ↓
Context Building
   ↓
Local LLM  (Ollama)
   ↓
Grounded Answer
```

---

## 🛍️ eCommerce: Shopify

![Shopify](https://img.shields.io/badge/Shopify-7AB55C?style=for-the-badge&logo=shopify&logoColor=white)
![Liquid](https://img.shields.io/badge/Liquid-5E8E3E?style=for-the-badge&logo=shopify&logoColor=white)

- Shopify stores built **from scratch to production**
- Theme development and customization in **Liquid**
- Custom sections, blocks and storefront features
- Third-party API and app integrations

---

## 🏢 ERP & CRM: Odoo

![Odoo](https://img.shields.io/badge/Odoo-714B67?style=for-the-badge&logo=odoo&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Figma](https://img.shields.io/badge/Figma_to_Odoo-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

- **Custom Odoo modules** for specific business workflows
- Customization of existing Odoo business modules
- **Odoo website development** from Figma designs
- ERP/CRM integrations with external systems

---

## 🛠️ Tools

<p align="left">
  <img src="https://skillicons.dev/icons?i=git,github,vscode,selenium&perline=4" alt="Development tools" />
</p>

`Git` · `GitHub` · `VS Code` · `Selenium`

---

# 🏗️ What I Bring

### ⚙️ Backend & Integrations
- REST API design with Node.js, Express.js and Python
- Clean separation of routes, business logic and data access
- Integrating third-party services, blockchain APIs and automation tools
- Maintaining and extending applications already in production

### 🛒 Business Platforms
- Taking Shopify stores from an empty account to a live store
- Building Odoo modules and websites that match real business processes
- Turning Figma designs into working, editable storefronts and websites

### 🤖 Practical AI
- Adding AI features to existing applications, not just demos
- Running LLMs locally with Ollama for privacy and cost control
- Grounding answers in your own data with RAG and LangChain

---

# 🎯 Current Direction

```text
Full Stack Development
        ↓
Backend Engineering
        ↓
eCommerce & ERP Platforms
        ↓
AI / LLM Applications
        ↓
Production AI Systems
```

My strongest interest is the intersection of **backend engineering + business platforms + AI**.

---

# 🌐 Connect With Me

I'm open to **remote and international** full stack and backend roles.

<p align="left">
  <a href="https://www.linkedin.com/in/ibrahim-awab/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge" alt="LinkedIn" />
  </a>
  <a href="mailto:ibrahimawab50@gmail.com">
    <img src="https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://github.com/Ibrahim-Awab">
    <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

---

# 📊 GitHub Statistics

<p align="center">
  <img
    src="https://github-readme-stats.shion.dev/api?username=Ibrahim-Awab&theme=dark&hide_border=false&include_all_commits=false&count_private=false"
    alt="Ibrahim Awab's GitHub statistics"
  />
</p>

<p align="center">
  <img
    src="https://github-readme-stats.shion.dev/api/top-langs/?username=Ibrahim-Awab&theme=dark&hide_border=false&layout=compact"
    alt="Top programming languages"
  />
</p>

---

# 🐍 Contribution Activity

<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://raw.githubusercontent.com/Ibrahim-Awab/Ibrahim-Awab/output/github-contribution-grid-snake-dark.svg"
    />
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://raw.githubusercontent.com/Ibrahim-Awab/Ibrahim-Awab/output/github-contribution-grid-snake.svg"
    />
    <img
      src="https://raw.githubusercontent.com/Ibrahim-Awab/Ibrahim-Awab/output/github-contribution-grid-snake.svg"
      alt="GitHub contribution activity"
    />
  </picture>
</p>

---

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=Ibrahim-Awab&icon=0&color=0" alt="Profile views" />
</p>

<p align="center">
  <i>Building software that works in production, for real businesses.</i>
</p>
