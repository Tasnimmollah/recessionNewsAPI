const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers = [
  {
    name: "theguardian",
    address: "https://www.theguardian.com/business/globalrecession",
    base: "",
  },
  {
    name: "politico",
    address: "https://www.politico.com/news/recession",
    base: "",
  },
  {
    name: "wef",
    address: "https://www.weforum.org/",
    base: "",
  },
  {
    name: "nytimes",
    address: "https://www.nytimes.com/topic/subject/recession",
    base: "https://www.nytimes.com",
  },
  {
    name: "theeconomist",
    address: "https://www.economist.com/recession",
    base: "https://www.economist.com",
  },
];
const articles = [];

newspapers.forEach(async (newspaper) => {
  const { data } = await axios.get(newspaper.address);
  const $ = cheerio.load(data);

  $(
    'a:contains("recession"), a:contains("inflation"), a:contains("crisis"), a:contains("crises"), a:contains("layoffs"), a:contains("cuts")',
    data
  ).each(function () {
    const title = $(this).text();
    const url = $(this).attr("href");
    articles.push({
      title,
      url: newspaper.base + url,
      source: newspaper.name,
    });
  });
});

app.get("/", (req, res) => {
  res.json("Welcome to my Global Recession News API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:newspaperId", async (req, res) => {
  const newspaperId = req.params.newspaperId;

  const newspaperAddress = newspapers.find(
    (newspaper) => newspaper.name == newspaperId
  ).address;
  const newspaperBase = newspapers.find(
    (newspaper) => newspaper.name == newspaperId
  ).base;

  try {
    const { data } = await axios.get(newspaperAddress);
    const $ = cheerio.load(data);
    const specificArticles = [];

    $(
      'a:contains("recession"), a:contains("inflation"), a:contains("crisis"), a:contains("layoffs"), a:contains("cuts")',
      data
    ).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      specificArticles.push({
        title,
        url: newspaperBase + url,
        source: newspaperId,
      });
    });
    res.json(specificArticles);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
