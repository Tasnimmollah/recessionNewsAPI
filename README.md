# Global recession news API

The Global Recession News Live API is a RESTful API showing the latest news about global recession from The New York Times, The Guardian, World Economic Forum, The Economist, AP News, Reuters, and Politico.

## Endpoints

Returns the latest articles from 7 publications on the topic of Global Recession.

```bash
GET https://globalrecession-news-live.onrender.com/news
```

Returns the latest articles from a specific publication based on the newspaperId parameter.

```bash
GET https://globalrecession-news-live.onrender.com/news/:newspaperId
```
