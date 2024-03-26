const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/screenshot", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(req.body.html);
  const screenshot = await page.screenshot({ encoding: "base64" });
  await browser.close();

  res.send(screenshot);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
